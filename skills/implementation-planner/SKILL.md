---
name: implementation-planner
description: Convert a chosen solution approach into a detailed, step-by-step execution plan with affected files, test strategy, and rollback notes. Use when the user asks to "plan the implementation," "break this into steps," "create an execution plan," "draft an implementation plan," or when a solution has been chosen and needs to be turned into actionable work before coding begins.
---

# Implementation Planner

Convert a chosen approach into an actionable execution plan that can be followed step-by-step.

## Process

1. Review the chosen approach and requirements
2. Identify all files/modules that need changes
3. Determine the optimal order of changes (dependencies first)
4. Define verification points after each step
5. Plan the test strategy
6. Note rollback approach

## Output Format

```
## Plan Summary
[1-2 sentences: what's being built and the chosen approach]

## Steps

### Step 1: [Action verb + what]
- **Files:** `path/to/file.ts`, `path/to/other.ts`
- **Changes:** [Specific description of what changes]
- **Verify:** [How to confirm this step worked]

### Step 2: [Action verb + what]
...

## Affected Files
| File | Action | Description |
|------|--------|-------------|
| `src/auth/login.ts` | Modify | Add JWT validation |
| `src/auth/types.ts` | Create | Token type definitions |

## Test Strategy
- **Unit tests:** [What to test at unit level]
- **Integration tests:** [What to test end-to-end]
- **Manual verification:** [Any manual checks needed]

## Rollback Notes
- [How to undo these changes if something goes wrong]
- [Any data migrations that need reverse scripts]
```

## Guidelines

- **Order by dependency.** Types and interfaces before implementations. Shared utilities before consumers.
- **Each step should be independently verifiable.** After completing a step, there should be a way to confirm it works before moving on.
- **Be specific about files.** Use actual paths from the codebase, not generic descriptions. Read the codebase first.
- **Include the test step in the plan.** Tests are not an afterthought — plan when they get written.
- **Keep steps small.** Each step should be completable in one focused session. If a step feels too large, split it.
- **Flag risky steps.** Mark steps that are hard to reverse or have high blast radius.
