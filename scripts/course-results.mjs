/** Compare behavior names, including expected failures which disappeared. */
export function compareResults(actual, expected) {
  const unexpected = actual.filter((name) => !expected.includes(name))
  const missing = expected.filter((name) => !actual.includes(name))
  return { ok: unexpected.length === 0 && missing.length === 0, unexpected, missing }
}

export function readUnitResults(report) {
  const tests = report.testResults?.flatMap((suite) => suite.assertionResults ?? []) ?? []
  if (!tests.length) throw new Error('No unit tests reported')
  if (report.numRuntimeErrorTestSuites > 0 || tests.some((test) => !['passed', 'failed'].includes(test.status))) {
    throw new Error('Unit tests did not finish normally')
  }
  return tests.filter((test) => test.status === 'failed').map((test) => test.fullName.trim())
}

export function readBrowserResults(report) {
  if (report.errors?.length) throw new Error(report.errors.map((error) => error.message).join('\n'))
  function specs(suites = []) { return suites.flatMap((suite) => [...(suite.specs ?? []), ...specs(suite.suites)]) }
  const cases = specs(report.suites)
  if (!cases.length || cases.some((spec) => !spec.tests?.length)) throw new Error('No browser tests reported')
  const failed = []
  for (const spec of cases) {
    for (const test of spec.tests) {
      const result = test.results.at(-1)
      if (!result || !['passed', 'failed'].includes(result.status) || test.expectedStatus !== 'passed') {
        throw new Error(`Browser test did not finish normally: ${spec.title}`)
      }
      if (result.status === 'failed') failed.push(spec.title)
    }
  }
  return failed
}
