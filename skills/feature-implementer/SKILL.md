---
name: feature-implementer
description: Execute code changes according to an implementation plan, tracking progress and noting deviations. Use when the user asks to "implement this," "build this feature," "make the changes," "execute the plan," "code this up," or when an implementation plan exists and it's time to write the actual code.
---

# Feature Implementer

Execute an implementation plan step-by-step, tracking progress and documenting deviations.

## Process

1. Read the implementation plan
2. For each step in the plan:
   a. Read the target files to understand current state
   b. Make the changes described
   c. Verify the step (run relevant checks)
   d. Note any deviations from the plan
3. Produce an implementation summary

## Execution Rules

- **Follow the plan order.** Steps are sequenced for a reason (dependencies). Do not skip ahead.
- **Read before writing.** Always read a file before modifying it. Understand context.
- **One step at a time.** Complete and verify each step before moving to the next.
- **Document deviations.** If the plan needs adjustment during implementation, note what changed and why.
- **Don't expand scope.** Implement what the plan says. Don't add improvements, refactors, or "while I'm here" changes.
- **Preserve existing patterns.** Match the codebase's style, naming conventions, and patterns. Don't impose a different style.

## Output Format

After implementation is complete, produce:

```
## Implementation Summary

### Completed Steps
- [x] Step 1: [Description] — done as planned
- [x] Step 2: [Description] — deviated: [reason]
- [x] Step 3: [Description] — done as planned

### Changed Files
| File | Action | Lines Changed |
|------|--------|---------------|
| `src/auth/login.ts` | Modified | +42 -8 |
| `src/auth/types.ts` | Created | +18 |

### Deviations from Plan
- Step 2: [What was planned] → [What was done instead] because [reason]

### Notes
- [Anything the next step (testing, review) should know]
```

## Guidelines

- **If a step fails or can't be done as planned**, stop and explain rather than improvising a workaround.
- **Run quick checks after each step** where possible (type checking, syntax validation).
- **Keep the user informed** at natural milestones, not after every line change.
