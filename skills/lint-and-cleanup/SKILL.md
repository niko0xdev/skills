---
name: lint-and-cleanup
description: Run formatters, linters, dead-code checks, and final code polish. Use when the user asks to "lint," "format," "clean up the code," "run the linter," "check code quality," or as a final step before committing to ensure code meets project standards.
---

# Lint and Cleanup

Run project formatters and linters, fix issues, and clean up dead code.

## Process

1. Detect project tooling (formatter, linter, type checker)
2. Run formatter first (fixes style automatically)
3. Run linter and fix auto-fixable issues
4. Run type checker if available
5. Identify and remove dead code from changes
6. Summarize remaining warnings

## Tool Detection

Check `package.json`, config files, and `Makefile`/scripts:

| Tool | Config files | Run command |
|------|-------------|-------------|
| Prettier | `.prettierrc`, `prettier.config.*` | `npx prettier --write <files>` |
| ESLint | `.eslintrc.*`, `eslint.config.*` | `npx eslint --fix <files>` |
| TypeScript | `tsconfig.json` | `npx tsc --noEmit` |
| Black | `pyproject.toml` [tool.black] | `black <files>` |
| Ruff | `ruff.toml`, `pyproject.toml` [tool.ruff] | `ruff check --fix <files>` |
| Go | `go.mod` | `gofmt -w <files> && go vet ./...` |

## Execution Order

1. **Format** — auto-fixes style (Prettier, Black, gofmt)
2. **Lint with autofix** — fixes code issues (ESLint --fix, Ruff --fix)
3. **Type check** — catches type errors (tsc, mypy, go vet)
4. **Dead code scan** — remove unused imports, variables, functions from changed files only

## Output Format

```
## Cleanup Summary

### Formatter
- **Tool:** Prettier
- **Files formatted:** 3 (`login.ts`, `types.ts`, `auth.test.ts`)

### Linter
- **Tool:** ESLint
- **Auto-fixed:** 5 issues (unused imports, missing semicolons)
- **Remaining warnings:** 1 — `login.ts:42` — complexity warning (acceptable)

### Type Check
- **Tool:** TypeScript (tsc --noEmit)
- **Result:** Clean — no type errors

### Dead Code Removed
- `types.ts`: Removed unused `OldTokenType` interface
- `login.ts`: Removed unused `debugLog` import

### Remaining Warnings
- [Any warnings that weren't auto-fixed and why they're acceptable or need manual attention]
```

## Guidelines

- **Scope to changed files.** Don't reformat the entire codebase — only touch files that were modified.
- **Format before linting.** Formatters and linters can conflict. Running the formatter first prevents noise.
- **Don't suppress warnings without reason.** If adding `// eslint-disable`, explain why.
- **Only remove dead code you introduced.** Don't clean up pre-existing dead code unless asked.
- **Report, don't hide.** Show remaining warnings even if you've chosen not to fix them.
