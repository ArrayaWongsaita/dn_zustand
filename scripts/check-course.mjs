import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve, join, dirname } from 'node:path'
import { compareResults, readUnitResults, readBrowserResults } from './course-results.mjs'

const root = resolve(import.meta.dirname, '..')
function command(program, args, cwd = root, env = {}) {
  const result = spawnSync(program, args, { cwd, env: { ...process.env, ...env }, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, timeout: 240000 })
  return { status: result.status ?? -1, output: `${result.stdout ?? ''}${result.stderr ?? ''}${result.error?.message ?? ''}` }
}
function git(...args) {
  const result = command('git', args)
  if (result.status !== 0) throw new Error(result.output.trim())
  return result.output.trim()
}
function refFor(branch) {
  for (const ref of [`refs/heads/${branch}`, `refs/remotes/origin/${branch}`]) {
    const result = command('git', ['rev-parse', '--verify', ref])
    if (result.status === 0) return result.output.trim()
  }
  throw new Error(`Branch unavailable: ${branch}; fetch course branches first`)
}
const manifest = JSON.parse(readFileSync(join(root, 'course/branches.json'), 'utf8'))
const args = process.argv.slice(2)
let selectedNames = null
let output = join(root, 'course/readiness')
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--branches') selectedNames = args[++i]?.split(',')
  else if (args[i] === '--output') output = resolve(args[++i])
  else throw new Error(`Unknown option: ${args[i]}`)
}
if (!Array.isArray(manifest) || !manifest.length) throw new Error('Empty course manifest')
const names = new Set()
for (const entry of manifest) {
  if (names.has(entry.branch) || !/^[\w/-]+$/.test(entry.branch) || !['lab', 'solution'].includes(entry.type) || !Number.isInteger(entry.lesson)) throw new Error('Invalid branch registration')
  names.add(entry.branch)
  for (const suite of ['unit', 'e2e']) {
    const baseline = entry.expectedFailures?.[suite]
    if (!Array.isArray(baseline) || baseline.some((name) => typeof name !== 'string') || new Set(baseline).size !== baseline.length) throw new Error(`Invalid ${suite} baseline: ${entry.branch}`)
    if (entry.type === 'solution' && baseline.length) throw new Error(`Solution cannot have expected failures: ${entry.branch}`)
  }
}
if (selectedNames?.some((name) => !names.has(name)) || selectedNames?.length === 0) throw new Error('Unknown or empty branch selection')
const selected = manifest.filter((entry) => !selectedNames || selectedNames.includes(entry.branch))
mkdirSync(output, { recursive: true })
const scratch = mkdtempSync(join(tmpdir(), 'zustand-course-check-'))
const report = { checkedAt: new Date().toISOString(), sourceCommit: git('rev-parse', 'HEAD'), subset: !!selectedNames, results: [], links: { checked: [], deferred: [], errors: [] } }

function checkLinks() {
  const courseMap = join(root, 'COURSE.md')
  if (!existsSync(courseMap)) {
    report.links.errors.push('COURSE.md is missing')
    return
  }
  const markdown = readFileSync(courseMap, 'utf8')
  const targets = [...markdown.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)].map((match) => match[1].replace(/^<|>$/g, ''))
  const linkedBranches = new Set()
  for (const target of targets) {
    if (target.startsWith('#')) continue
    const match = target.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/(?:tree|blob)\/([^/#]+)(?:\/([^#]+))?(?:#.*)?$/)
    if (match) {
      const branch = decodeURIComponent(match[1])
      if (!names.has(branch)) { report.links.errors.push(`Unregistered course branch: ${target}`); continue }
      linkedBranches.add(branch)
      if (!selected.some((entry) => entry.branch === branch)) { report.links.deferred.push(target); continue }
      try {
        const commit = refFor(branch)
        git('cat-file', '-e', `${commit}:${decodeURIComponent(match[2] || 'README.md')}`)
        report.links.checked.push(target)
      } catch (error) { report.links.errors.push(`${target}: ${error.message}`) }
    } else if (!/^https?:/.test(target)) {
      const path = decodeURIComponent(target.split('#')[0])
      if (!existsSync(resolve(root, path))) report.links.errors.push(`Missing course document: ${target}`)
      else report.links.checked.push(target)
    }
  }
  for (const entry of selected) {
    if (!linkedBranches.has(entry.branch)) report.links.errors.push(`COURSE.md has no branch link: ${entry.branch}`)
  }
}
try {
  checkLinks()
  for (const entry of selected) {
    const result = { ...entry, commit: null, ok: false, stages: {}, comparisons: {}, errors: [] }
    report.results.push(result)
    const worktree = join(scratch, entry.branch.replaceAll('/', '-'))
    let added = false
    try {
      result.commit = refFor(entry.branch)
      git('worktree', 'add', '--detach', worktree, result.commit)
      added = true
      function runStage(name, program, stageArgs, env = {}) {
        const stage = command(program, stageArgs, worktree, env)
        result.stages[name] = stage.status
        writeFileSync(join(output, `${entry.branch.replaceAll('/', '-')}-${name}.log`), stage.output)
        return stage.status
      }
      if (runStage('install', 'npm', ['ci']) !== 0) throw new Error('npm ci failed')
      if (runStage('build', 'npm', ['run', 'build']) !== 0) throw new Error('Application build failed')
      const unitPath = join(scratch, `${entry.branch.replaceAll('/', '-')}-unit.json`)
      const browserPath = join(scratch, `${entry.branch.replaceAll('/', '-')}-e2e.json`)
      const unitStatus = runStage('unit', 'npm', ['run', 'test:unit', '--', '--reporter=json', `--outputFile=${unitPath}`])
      const port = Number(process.env.COURSE_TEST_PORT || 4318)
      if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid COURSE_TEST_PORT')
      writeFileSync(join(worktree, '.course-check.playwright.mjs'), `import config from './playwright.config.js';
export default { ...config, use: { ...config.use, baseURL: 'http://127.0.0.1:${port}' }, webServer: { ...config.webServer, command: 'npm run dev -- --host 127.0.0.1 --port ${port} --strictPort', url: 'http://127.0.0.1:${port}', reuseExistingServer: false } };
`)
      const browserStatus = runStage('e2e', 'npm', ['run', 'test:e2e', '--', '--config=.course-check.playwright.mjs', '--reporter=json'], { PLAYWRIGHT_JSON_OUTPUT_NAME: browserPath, COURSE_TEST_PORT: process.env.COURSE_TEST_PORT || '4318' })
      for (const [suite, path, parser, status] of [['unit', unitPath, readUnitResults, unitStatus], ['e2e', browserPath, readBrowserResults, browserStatus]]) {
        try {
          const failures = parser(JSON.parse(readFileSync(path, 'utf8')))
          if (status !== (failures.length ? 1 : 0)) throw new Error(`Unexpected process exit ${status}`)
          result.comparisons[suite] = compareResults(failures, entry.expectedFailures[suite])
        } catch (error) { result.errors.push(`${suite}: ${error.message}`) }
      }
      result.ok = result.errors.length === 0 && ['unit', 'e2e'].every((suite) => result.comparisons[suite]?.ok)
    } catch (error) { result.errors.push(error.message) }
    finally { if (added) git('worktree', 'remove', '--force', worktree) }
    console.log(`${result.ok ? 'PASS' : 'FAIL'} ${entry.branch} ${result.commit || '(unresolved)'}`)
  }
} finally {
  rmSync(scratch, { recursive: true, force: true })
  report.ok = report.links.errors.length === 0 && report.results.length === selected.length && report.results.every((result) => result.ok)
  writeFileSync(join(output, 'latest.json'), JSON.stringify(report, null, 2) + '\n')
  const lines = ['# ผลตรวจอัตโนมัติของคอร์ส', '', `ตรวจเมื่อ ${report.checkedAt} จาก commit \`${report.sourceCommit}\``, '', `ผลรวม: **${report.ok ? 'ผ่าน' : 'ผิดเกณฑ์'}**${report.subset ? ' (ตรวจเฉพาะชุดที่เลือก)' : ''}`, '', '| Branch | Commit | ผล | Expected failures |', '|---|---|---|---|']
  for (const row of report.results) {
    lines.push(`| ${row.branch} | ${row.commit || '-'} | ${row.ok ? 'ผ่าน' : 'ผิดเกณฑ์'} | ${JSON.stringify(row.expectedFailures)} |`)
    for (const [suite, comparison] of Object.entries(row.comparisons)) {
      if (!comparison.ok) lines.push(`\n${row.branch} ${suite}: unexpected=${JSON.stringify(comparison.unexpected)}, missing=${JSON.stringify(comparison.missing)}\n`)
    }
    for (const error of row.errors) lines.push(`\n${row.branch}: ${error}\n`)
  }
  lines.push('', `ลิงก์ตรวจแล้ว ${report.links.checked.length}; รอตรวจในชุดอื่น ${report.links.deferred.length}`, ...report.links.errors.map((error) => `\nลิงก์ผิด: ${error}`), '', 'ผลนี้ยืนยันเครื่องมือและพฤติกรรมตาม baseline เท่านั้น ผู้สอนต้องทบทวนเนื้อหา checklist และการไม่รั่วของเฉลยก่อนประกาศพร้อมสอน', '')
  writeFileSync(join(output, 'latest.md'), lines.join('\n'))
  process.exitCode = report.ok ? 0 : 1
}
