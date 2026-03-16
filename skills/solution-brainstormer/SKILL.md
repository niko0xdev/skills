---
name: solution-brainstormer
description: Generate 2-4 implementation approaches with tradeoffs for a given problem or requirement. Use when the user asks to "brainstorm solutions," "explore approaches," "what are my options," "how could we implement this," or when requirements have been defined and the next step is evaluating implementation strategies before committing to one.
---

# Solution Brainstormer

Given a problem statement or set of requirements, generate 2-4 distinct implementation approaches and evaluate their tradeoffs.

## Process

1. Read the requirements or problem statement fully
2. Identify the key design decisions that create branching approaches
3. Generate 2-4 meaningfully different options (not minor variations)
4. Evaluate each against the stated constraints
5. Recommend a direction with justification

## Output Format

```
## Context
[1-2 sentences recapping the problem and key constraints]

## Options

### Option A: [Name]
**Approach:** [2-3 sentence description]
**Pros:**
- [Concrete advantage tied to requirements]
**Cons:**
- [Concrete disadvantage or risk]
**Effort:** [Low / Medium / High]
**Best when:** [Scenario where this option wins]

### Option B: [Name]
...

## Edge Cases
- [Scenarios that affect which option is best]
- [Boundary conditions or unusual inputs]

## Recommendation
[Which option and why, referencing specific requirements or constraints. Note what would change the recommendation.]
```

## Guidelines

- **Options must be meaningfully different.** "Use React" vs "Use React with Redux" is not two options. "Client-side SPA" vs "Server-rendered with HTMX" is.
- **Tie pros/cons to the actual requirements.** Generic advantages ("more scalable") are weak. Specific ones ("handles the 10k concurrent users from NFR-2") are useful.
- **Include a scrappy option.** At least one option should be the simplest possible approach, even if it doesn't satisfy all nice-to-haves.
- **Be honest about effort.** Don't undersell complexity.
- **Name the deciding factors.** State what information or constraint would tip the recommendation toward a different option.
