---
name: commit-message-author
description: Create clean conventional commit messages and PR summary drafts from staged changes. Use when the user asks to "write a commit message," "prepare the commit," "draft a PR description," "commit this," or when code changes are complete and need to be committed with a well-structured message.
---

# Commit Message Author

Create conventional commit messages and PR summaries from staged changes.

## Process

1. Review staged changes (`git diff --staged`)
2. Identify the type and scope of changes
3. Write a commit message following conventional commits
4. Draft a PR summary if requested

## Conventional Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | When |
|------|------|
| `feat` | New feature or capability |
| `fix` | Bug fix |
| `refactor` | Code change that neither fixes nor adds |
| `test` | Adding or updating tests |
| `docs` | Documentation only |
| `chore` | Build, CI, deps, or tooling |
| `style` | Formatting, whitespace (no logic change) |
| `perf` | Performance improvement |

### Rules

- **Subject line:** imperative mood, lowercase, no period, max 72 chars
- **Body:** explain *why*, not *what* (the diff shows what). Wrap at 72 chars.
- **Footer:** reference issues (`Closes #123`), note breaking changes (`BREAKING CHANGE:`)
- **Scope:** the module or area affected (`auth`, `api`, `ui`)

## Output Format

```
## Commit Message

feat(auth): add JWT token validation middleware

Add token validation to protected routes. Tokens are verified
against the signing key and checked for expiration before
allowing access to the route handler.

Closes #42

## PR Summary (if requested)

### Summary
- Add JWT validation middleware for protected routes
- Create token type definitions
- Add unit tests for token validation

### Test Plan
- [x] Unit tests for valid/invalid/expired tokens
- [x] Integration test for protected route access
- [ ] Manual test: verify 401 response with expired token
```

## Guidelines

- **Read the diff, not just file names.** The commit message should reflect what actually changed.
- **One logical change per commit.** If changes span unrelated areas, suggest splitting into multiple commits.
- **Match the repo's existing style.** Check `git log --oneline -10` first. If the repo doesn't use conventional commits, adapt.
- **Don't over-explain.** The diff is available. The message adds context the diff can't show.
- **Include the Co-Authored-By trailer** when generating commits in Claude Code sessions.
