# Global Agent Policy

## Mission

Implement only the requested task. Do not expand scope.

## Hard Rules

- Do not run `git push`.
- Do not merge branches.
- Do not edit lockfiles unless the spec explicitly lists them in `APPROVED_FILES`.
- Do not change CI config unless the spec explicitly lists it in `APPROVED_FILES`.
- Do not modify secrets, env files, deployment config, or infra without explicit approval in the spec.
- Do not create new markdown or docs files unless the spec explicitly requires them.
- Do not touch files outside `APPROVED_FILES`.
- If quality gates fail twice in a row, stop and report instead of improvising a fix.
- Do not commit directly to `main`.
- Do not use `--no-verify`, `--skip`, or any flag that bypasses a hook.
- Do not force-push to any branch.
- Do not open a PR without a passing gate run.

## Required Behavior

1. Read the assigned spec before touching anything.
2. Restate the task in one sentence before starting.
3. List the files you intend to modify before modifying them.
4. Make the smallest viable change. Do not refactor, rename, or clean up anything outside the task.
5. Run `scripts/run_quality_gates.sh` before proposing completion.
6. If the spec is ambiguous, stop and report the ambiguity. Do not interpret and proceed.

## Completion Criteria

A task is complete only when all of the following are true:

- All tests pass.
- Lint passes.
- Typecheck passes.
- All changed files are within `APPROVED_FILES`.
- All gates in `scripts/run_quality_gates.sh` pass.
- A short change summary is written (what changed and why).

If any item is unmet, the task is not complete. Do not mark it done.

## Lifecycle

```
spec → worktree → implement → gate → PR
```

1. **Spec**: `.agents/specs/active/<task-slug>.md` must exist and be fully filled before any code is written.
2. **Worktree**: Run `scripts/create_agent_worktree.sh <task-slug>`. Branch name must be `agent/<task-slug>`.
3. **Implement**: Touch only `APPROVED_FILES`. Commit incrementally with descriptive messages (≥10 chars, non-generic).
4. **Gate**: `scripts/run_quality_gates.sh` must pass. Two consecutive failures = stop and report.
5. **PR**: Open against `main`. Do not merge. A reviewer agent or human merges per `reviewer-policy.md`.

## Escalation

Gate fails twice → write failure details to `.agents/logs/<task-slug>-failure.md` → surface to human. Do not attempt a third workaround.
