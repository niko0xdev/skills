---
name: git-worktree-manager
description: Create and manage git worktrees for isolated feature development. Handles branch naming, worktree creation, and cleanup. Use when the user asks to "set up a worktree," "create a branch for this," "isolate this work," "start a feature branch," or needs a clean working environment for a new task without disrupting current work.
---

# Git Worktree Manager

Set up and clean up git worktrees for isolated feature development.

## Create Worktree

1. Determine branch name from the task context
2. Check for existing worktrees that might conflict
3. Create the worktree and branch
4. Confirm the setup

### Branch Naming Convention

Format: `<type>/<short-description>`

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

Examples: `feat/quiz-auto-grading`, `fix/upload-timeout`, `refactor/auth-middleware`

### Commands

```bash
# List existing worktrees
git worktree list

# Create worktree with new branch
git worktree add ../worktrees/<branch-name> -b <branch-name>

# Enter the worktree
cd ../worktrees/<branch-name>
```

## Cleanup Worktree

1. Confirm all changes are committed and pushed
2. Return to the main worktree
3. Remove the worktree
4. Optionally delete the branch if merged

### Commands

```bash
# From main worktree
git worktree remove ../worktrees/<branch-name>

# Delete branch if merged
git branch -d <branch-name>

# Force delete if not merged (confirm with user first)
git branch -D <branch-name>
```

## Output Format

```
## Worktree Setup
- **Branch:** `feat/quiz-auto-grading`
- **Path:** `../worktrees/feat/quiz-auto-grading`
- **Base:** `main` (at commit abc1234)
- **Status:** Created and ready
```

## Guidelines

- **Always check `git worktree list` first** to avoid conflicts with existing worktrees.
- **Use `../worktrees/` as the default parent directory** to keep worktrees adjacent to the main repo.
- **Never force-delete branches** without confirming with the user.
- **Verify clean state** before cleanup — warn if there are uncommitted changes.
