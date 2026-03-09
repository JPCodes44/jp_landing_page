# Spec: redesign-and-animate-frame5

---

## Objective
Create Frame5.tsx with a scroll-linked 3-state animation (large muted heading → small black heading + video rect → fullscreen video rect) and add it to App.tsx.

## Why
Frame5 is missing; the landing page needs a "My Services In Action:" showcase section.

## Branch
agent/redesign-and-animate-frame5

## Worktree
../wt-redesign-and-animate-frame5

## Allowed files
- `packages/frontend/src/components/Frame5.tsx`
- `packages/frontend/src/components/Frame5.test.tsx`
- `packages/frontend/src/theme/index.ts`
- `packages/frontend/src/App.tsx`
- `packages/frontend/src/App.test.tsx`
- `.agents/specs/active/2026-03-09-redesign-and-animate-frame5.md`

## Forbidden files
- package-lock.json
- .github/workflows/*
- infra/*

## Constraints
- No new dependencies unless explicitly approved
- Preserve all public APIs
- Must not break existing tests

## Domain Policy
- `.agents/policies/00-agent-contract.md` (always)
- `.agents/policies/01-task-protocol.md` (always)
- `.agents/policies/02-validation.md` (always)
- `.agents/policies/03-frontend-policy.md` (if touching packages/frontend/)

## Read Before Starting
- `packages/frontend/src/components/Frame3.tsx`
- `packages/frontend/src/components/Frame3.test.tsx`
- `packages/frontend/src/theme/index.ts`
- `packages/frontend/src/App.tsx`

## Implementation Notes
- Follow Frame3 sticky-section scroll pattern
- Animation: heading large+muted → small+opaque (phase 1), divider+rect fade in (phase 2), rect expands fullscreen (phase 3)
- Respect prefers-reduced-motion

## Acceptance Criteria
- [ ] Frame5.tsx renders "My Services In Action:" heading
- [ ] Heading starts large (~9rem) and muted (opacity 0.35) at center of viewport
- [ ] Heading ends small (~3.5rem), fully opaque, at top-left after scroll
- [ ] Video placeholder rectangle is hidden initially; appears when heading reaches full opacity
- [ ] Rectangle expands to fill viewport in the final scroll state
- [ ] Respects `prefers-reduced-motion` (jumps to final state, no animation)
- [ ] All quality gates pass (`bun run lint`, `bun run typecheck`, `bun test`)
- [ ] Frame5 is rendered in App.tsx after Frame4

## Required Checks
- bun run lint
- bun run typecheck
- bun test

## Rollback Plan
Revert branch if regression appears in Frame5 or App layout.

## Reviewer Checklist
- [ ] All changed files are in Allowed Files
- [ ] No files from Forbidden Files were touched
- [ ] No new dependencies introduced
- [ ] No dead abstractions added
- [ ] No mocks added where real behavior can be tested
- [ ] All Acceptance Criteria are demonstrably met
- [ ] Required Checks pass in CI
