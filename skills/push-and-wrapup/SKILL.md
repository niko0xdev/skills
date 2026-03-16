---
name: push-and-wrapup
description: Push the branch to remote, verify remote state, and clean up the worktree. Use when the user asks to "push this," "ship it," "wrap up," "push and clean up," or when commits are ready and the work needs to be pushed to remote and the local environment cleaned up.
---

# Push and Wrapup

Push the branch, verify remote state, and clean up the local worktree.

## Process

1. Pre-push checks
2. Push to remote
3. Verify remote state
4. Clean up worktree (if applicable)
5. Produce a summary

## Pre-Push Checks

Before pushing, verify:

```bash
# Check for uncommitted changes
git status

# Confirm branch and commits
git log --oneline main..HEAD

# Ensure we're not on main/master
git branch --show-current
```

**Stop and warn** if:
- There are uncommitted changes
- The current branch is `main` or `master`
- There are no commits ahead of the base branch

## Push

```bash
# First push — set upstream
git push -u origin <branch-name>

# Subsequent pushes
git push
```

**Never force-push** without explicit user confirmation.

## Verify Remote State

```bash
# Confirm remote branch exists
git ls-remote --heads origin <branch-name>

# Compare local and remote
git log origin/<branch-name>..HEAD
```

## Cleanup (if using worktree)

```bash
# Return to main worktree
cd <main-worktree-path>

# Remove the worktree
git worktree remove <worktree-path>

# Optionally delete branch if merged
git branch -d <branch-name>
```

## Output Format

```
## Push Summary

- **Branch:** `feat/quiz-auto-grading`
- **Commits pushed:** 3
- **Remote:** `origin/feat/quiz-auto-grading` — confirmed
- **Worktree:** Cleaned up at `../worktrees/feat/quiz-auto-grading`

### Next Steps
- [ ] Create pull request
- [ ] Request review
- [ ] Monitor CI checks
```

## Guidelines

- **Always confirm before pushing.** Show the user what will be pushed.
- **Never push to main/master directly.** Warn and stop.
- **Never force-push without permission.** Explain why a force-push would be needed and ask.
- **Verify after pushing.** Confirm the remote branch exists and matches local.
- **Clean up worktrees only after successful push.** Don't delete local state until remote is confirmed.
- **Suggest PR creation** as the natural next step after pushing.
