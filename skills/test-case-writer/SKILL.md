---
name: test-case-writer
description: Define and write test cases for implemented features, covering unit tests, integration tests, and edge cases. Use when the user asks to "write tests," "add test coverage," "create test cases," "what should we test," or when implementation is complete and tests need to be written or planned.
---

# Test Case Writer

Write comprehensive test cases for a feature, covering happy paths, edge cases, and failure modes.

## Process

1. Read the requirements and implementation
2. Identify testable behaviors (not implementation details)
3. Categorize tests by type (unit, integration, edge case)
4. Write the test code
5. Flag gaps in coverage

## Test Categories

### Unit Tests
- Test individual functions/methods in isolation
- Mock external dependencies
- Cover: valid inputs, invalid inputs, boundary values, return values, error throwing

### Integration Tests
- Test components working together
- Use real dependencies where practical
- Cover: API endpoints, database operations, service interactions

### Edge Cases
- Empty/null/undefined inputs
- Maximum/minimum values
- Concurrent operations
- Timeout scenarios
- Malformed data

## Output Format

```
## Test Plan

### Unit Tests
- [ ] `describe('functionName')` — [what it tests]
  - [ ] returns X when given Y
  - [ ] throws when given invalid input
  - [ ] handles empty input gracefully

### Integration Tests
- [ ] `describe('feature workflow')` — [what it tests]
  - [ ] completes full workflow end-to-end
  - [ ] handles API errors gracefully

### Edge Cases
- [ ] [Scenario]: [expected behavior]

### Coverage Gaps
- [Areas that are hard to test or not covered]
```

## Guidelines

- **Test behavior, not implementation.** Test what the code does, not how it does it. Tests survive refactors when they test outcomes.
- **Match the project's test framework and patterns.** Read existing tests first. Follow the same structure, assertion style, and helper usage.
- **Name tests as specifications.** `it('returns 401 when token is expired')` not `it('test auth')`.
- **One assertion per concept.** Multiple assertions are fine if they verify one logical concept. Split when testing unrelated behaviors.
- **Don't test framework code.** Don't test that Express routes or React renders — test your logic.
- **Flag missing coverage honestly.** It's better to document a gap than to write a meaningless test.
