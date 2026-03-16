---
name: pipeline-controller
description: Orchestrate the full development pipeline from request to shipped code. Controls stage sequencing, tracks progress, handles stage transitions, and supports partial runs. Use when the user says "run the pipeline," "start the pipeline," "pipeline," "take this from spec to ship," "full workflow," or wants to execute multiple development stages in sequence. Also use when resuming a pipeline ("continue the pipeline," "pick up where we left off," "run from step N").
---

# Pipeline Controller

Orchestrate the 10-stage development pipeline, tracking progress and managing transitions between stages.

## Stages

| # | Stage | Skill | Gate (must be true to proceed) |
|---|-------|-------|-------------------------------|
| 1 | Analyze | `requirements-analyzer` | Open questions addressed or accepted |
| 2 | Brainstorm | `solution-brainstormer` | User picks an approach |
| 3 | Plan | `implementation-planner` | User approves the plan |
| 4 | Branch | `git-worktree-manager` | Worktree created, on feature branch |
| 5 | Implement | `feature-implementer` | All plan steps complete |
| 6 | Write Tests | `test-case-writer` | Tests written |
| 7 | Run Tests | `test-runner` | All tests pass |
| 8 | Lint | `lint-and-cleanup` | No errors, warnings reviewed |
| 9 | Commit | `commit-message-author` | Changes committed |
| 10 | Push | `push-and-wrapup` | Branch pushed, worktree cleaned |

## Running the Pipeline

### Full Run

When the user provides a request and asks to run the pipeline:

1. Announce the pipeline and show the stage table
2. Execute each stage in order
3. At each gate, confirm with the user before proceeding
4. Track progress using the status tracker format below

### Partial Run

Users can start from any stage or run a subset:

- `"run stages 5-8"` — implement through lint
- `"start from step 4"` — branch through push
- `"just run analyze and brainstorm"` — stages 1-2 only

### Preset Groups

| Group | Stages | Use when |
|-------|--------|----------|
| **spec-to-plan** | 1 → 2 → 3 | Planning before coding |
| **branch-setup** | 4 | Starting isolated work |
| **implement-and-verify** | 5 → 6 → 7 → 8 | Coding and quality checks |
| **ship-and-cleanup** | 9 → 10 | Committing and pushing |

Users can invoke groups by name: `"run spec-to-plan"`, `"run implement-and-verify"`.

## Status Tracker

Maintain and display this tracker after each stage completes:

```
## Pipeline Status

**Request:** [One-line summary of what's being built]
**Branch:** [branch name, once created]
**Started:** [timestamp]

| # | Stage | Status | Notes |
|---|-------|--------|-------|
| 1 | Analyze | ✅ Done | 3 FRs, 2 open questions resolved |
| 2 | Brainstorm | ✅ Done | Option B selected (server-rendered) |
| 3 | Plan | ✅ Done | 6 steps, ~4 files |
| 4 | Branch | ✅ Done | feat/quiz-auto-grading |
| 5 | Implement | 🔄 Active | Step 3 of 6 |
| 6 | Write Tests | ⏳ Pending | |
| 7 | Run Tests | ⏳ Pending | |
| 8 | Lint | ⏳ Pending | |
| 9 | Commit | ⏳ Pending | |
| 10 | Push | ⏳ Pending | |
```

Status icons: `✅ Done` | `🔄 Active` | `⏳ Pending` | `⛔ Blocked` | `⏭️ Skipped`

## Gate Rules

Each gate is a checkpoint between stages. At each gate:

1. Show the output from the completed stage
2. Show the updated status tracker
3. State what the next stage will do
4. Ask: proceed, adjust, or stop?

**Hard gates** (always require user confirmation):
- After **Analyze** (stage 1) — user must resolve or accept open questions
- After **Brainstorm** (stage 2) — user must pick an approach
- After **Plan** (stage 3) — user must approve before code changes begin
- Before **Push** (stage 10) — user must confirm push to remote

**Soft gates** (proceed automatically unless there are issues):
- After **Branch** (stage 4) — proceed if worktree created successfully
- After **Implement** (stage 5) — proceed if all steps completed
- After **Write Tests** (stage 6) — proceed if tests written
- After **Run Tests** (stage 7) — proceed only if all tests pass; stop if failures
- After **Lint** (stage 8) — proceed if no errors; warn on remaining warnings
- After **Commit** (stage 9) — proceed if commit succeeded

## Error Handling

**Test failures (stage 7):**
Loop back: stage 7 → fix in stage 5 → re-run stage 6 if needed → stage 7 again. Max 3 loops before stopping and asking the user.

**Lint errors (stage 8):**
Auto-fix what's fixable. If errors remain, loop back to stage 5 for manual fixes. Max 2 loops.

**Commit hook failures (stage 9):**
Fix the issue, re-stage, and create a new commit. Do not amend.

**Any stage fails unexpectedly:**
Stop the pipeline, show the status tracker with `⛔ Blocked` on the failed stage, and explain what happened.

## Resuming

When a user returns to continue a pipeline:

1. Show the last known status tracker
2. Confirm which stage to resume from
3. Continue execution

## Guidelines

- **Don't rush gates.** The whole point is user control at decision points.
- **Keep the tracker visible.** Show it after every stage, not just at the end.
- **Respect partial runs.** If the user only asked for stages 1-3, stop after 3 even if everything looks good.
- **Carry context forward.** Each stage's output feeds the next. Reference prior outputs explicitly (e.g., "Implementing FR-1 from the requirements analysis").
- **Announce each stage.** Before starting a stage, state: "Starting Stage N: [name]" so the user always knows where they are.
