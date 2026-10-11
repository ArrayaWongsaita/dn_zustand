import test from 'node:test'
import assert from 'node:assert/strict'
import { compareResults } from './course-results.mjs'

test('maintainer accepts only the exact registered lab failures', () => {
  assert.deepEqual(compareResults(['new action'], ['new action']), { ok: true, unexpected: [], missing: [] })
  assert.deepEqual(compareResults(['old action', 'new action'], ['new action']), { ok: false, unexpected: ['old action'], missing: [] })
})

test('a solved starter requires baseline review instead of silently passing', () => {
  assert.deepEqual(compareResults([], ['new action']), { ok: false, unexpected: [], missing: ['new action'] })
})

test('solution baseline accepts no failures', () => {
  assert.deepEqual(compareResults(['existing behavior'], []), { ok: false, unexpected: ['existing behavior'], missing: [] })
})

import { readUnitResults, readBrowserResults } from './course-results.mjs'
test('runner refuses empty suites and broken browser startup', () => {
  assert.throws(() => readUnitResults({ testResults: [] }), /No unit tests/)
  assert.throws(() => readBrowserResults({ suites: [], errors: [{ message: 'server startup failed' }] }), /server startup failed/)
})

test('browser suites with no executable tests cannot pass readiness', () => {
  assert.throws(() => readBrowserResults({ suites: [{ specs: [{ title: 'empty', tests: [] }] }] }), /No browser tests/)
})
