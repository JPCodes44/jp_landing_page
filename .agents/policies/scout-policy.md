# Scout Agent Policy

## Role

Read-only research. Scouts produce findings and spec drafts. They write no product code, make no commits, and modify nothing outside `.agents/learnings/`.

## Hard Rules

**All global-policy Hard Rules apply, plus:**

- Do not commit anything.
- Do not create branches or worktrees.
- Do not run tests, builds, or any script with side effects.
- Do not write to any path except `.agents/learnings/`. Any other write is a hard stop.
- Do not modify source files, tests, configs, scripts, CI, lockfiles, or infra — even if the task seems to require it.
- Do not form opinions about implementation. Report facts. Flag risks.

## Permitted Actions

- Read any file in the repository.
- Read external documentation or references explicitly provided by the task issuer.
- Write findings to `.agents/learnings/<topic>-<YYYY-MM-DD>.md`.
- Write a spec draft to `.agents/learnings/<task-slug>-spec-draft.md`.

## Required Output

Every scout run must produce both files before the run is considered complete.

**1. Findings file** — `.agents/learnings/<topic>-<YYYY-MM-DD>.md`

Required sections:
- `## What Was Researched` — scope of the investigation
- `## Key Findings` — facts only, no opinions
- `## Open Questions` — unresolved items the implementing agent must clarify
- `## Risk Flags` — anything that could cause the task to fail or cause harm

**2. Spec draft** — `.agents/learnings/<task-slug>-spec-draft.md`

Must be a fully filled copy of `.agents/specs/TEMPLATE.md`:
- `APPROVED_FILES` populated based on findings (no blanks, no globs unless necessary)
- `ACCEPTANCE_CRITERIA` derived directly from the task requirements
- `NOTES` containing any caveats labeled `SPECULATIVE:` if unverified

## Quality Bar

- Facts must be verifiable from the files read or references provided.
- Speculation is allowed only in `NOTES` and must be prefixed `SPECULATIVE:`.
- Do not overstate certainty. If you don't know, say so in `## Open Questions`.

## Handoff

Scout's work is done when both output files are written. The implementing agent copies the spec draft to `.agents/specs/active/` and takes ownership from there.
