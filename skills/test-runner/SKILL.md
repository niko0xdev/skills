---
name: test-runner
description: Run test suites, summarize results, diagnose failures, and suggest fixes. Use when the user asks to "run tests," "check if tests pass," "verify the implementation," "run the test suite," or after implementation/test writing when verification is needed.
---

# Test Runner

Run relevant test suites, summarize results, and diagnose failures.

## Process

1. Detect the project's test framework and configuration
2. Determine which tests to run (scoped to changed files when possible)
3. Run the tests
4. Summarize results
5. Diagnose any failures

## Framework Detection

Check in order:
- `package.json` → scripts.test, devDependencies (jest, vitest, mocha, playwright)
- `pytest.ini`, `pyproject.toml`, `setup.cfg` → pytest configuration
- `go.mod` → `go test`
- `Cargo.toml` → `cargo test`

## Running Tests

Prefer scoped runs over full suites:

```bash
# Run tests related to changed files (Jest)
npx jest --findRelatedTests src/auth/login.ts

# Run specific test file
npx jest src/auth/__tests__/login.test.ts

# Run with verbose output for failures
npx jest --verbose --no-coverage

# Python
pytest tests/test_auth.py -v

# Go
go test ./pkg/auth/... -v
```

Fall back to the full suite only when scoped runs pass or when explicitly asked.

## Output Format

```
## Test Results

**Command:** `npx jest --findRelatedTests src/auth/login.ts`
**Result:** 12 passed, 2 failed, 0 skipped

### Failures

#### 1. `login.test.ts` > `returns 401 when token is expired`
**Error:** Expected status 401, received 500
**Likely cause:** Token expiration check throws instead of returning error response
**Suggested fix:** Add try/catch in `validateToken()` or check expiration before verification

#### 2. ...

### Passing Tests
- 12 tests across 3 suites passed ✓

### Recommendation
[Fix the 2 failures before proceeding / All clear to continue]
```

## Guidelines

- **Run scoped tests first.** Full suites are slow and noisy. Start narrow.
- **Show the exact command run.** Makes it reproducible.
- **Diagnose, don't just report.** "Test failed" is useless. "Expected 401 got 500 because the catch block is missing" is actionable.
- **Suggest specific fixes.** Point to the likely file and line, not generic advice.
- **Re-run after fixes.** If failures are fixed, run again to confirm before moving on.
- **Report flaky tests separately.** If a test passes on re-run without code changes, flag it as flaky.
