# Spec: laptop-query

Add a laptop media query to index.css so the landing page is responsive on 13"–15.6" screens (1280–1440px CSS px wide).

---

## Objective
Add `@media (768px <= width <= 1440px)` CSS variable overrides to `packages/frontend/src/index.css` so the page scales correctly on laptop screens between the existing desktop and mobile breakpoints.

## Why
The desktop CSS variables are sized for 1920px screens. On laptops (1280–1440px), fonts and spacing are oversized and the layout breaks. A laptop media query interpolating between desktop and mobile values fixes this without touching component code.

## Branch
agent/laptop-query

## Worktree
../wt-laptop-query

## Allowed files
- packages/frontend/src/index.css
- packages/frontend/src/components/Footer.tsx
- packages/frontend/src/components/Frame4.tsx
- packages/frontend/src/components/Frame6.tsx
- packages/frontend/src/hooks/useBreakpoint.ts
- packages/frontend/src/components/Frame4.test.tsx
- packages/frontend/src/components/Frame5.test.tsx

## Forbidden files
- package-lock.json
- .github/workflows/*
- infra/*
- packages/frontend/src/components/frame3/*
- packages/frontend/src/components/frame5/*

## Constraints
- No new dependencies unless explicitly approved
- Preserve all public APIs
- Must not break existing tests
- Do not modify Frame3 or Frame5 component files

## Domain Policy
- `.agents/policies/00-agent-contract.md` (always)
- `.agents/policies/01-task-protocol.md` (always)
- `.agents/policies/02-validation.md` (always)
- `.agents/policies/03-frontend-policy.md` (if touching packages/frontend/)

## Read Before Starting
- packages/frontend/src/index.css
- jp_prompts/desktopShots/ (reference images)

## Implementation Notes
Add a single `@media (768px <= width <= 1440px)` block after the existing mobile block in index.css. Scale CSS custom property values to ~75–85% of desktop values. Keep the desktop (>1440px) and mobile (≤767px) unchanged.

## Acceptance Criteria
- [ ] A `@media (768px <= width <= 1440px)` block exists in `packages/frontend/src/index.css`
- [ ] All frame CSS variables (frame1–frame6, footer, nav) have laptop-scaled overrides
- [ ] Existing mobile (`width <= 767px`) styles are unchanged
- [ ] `bun run lint` passes
- [ ] `bun run typecheck` passes
- [ ] `bun test` passes

## Required Checks
- bun run lint
- bun run typecheck
- bun test

## Rollback Plan
Revert branch if regression appears in any frame's visual layout on desktop or mobile.

## Reviewer Checklist
- [ ] All changed files are in Allowed Files
- [ ] No files from Forbidden Files were touched
- [ ] No new dependencies introduced
- [ ] No dead abstractions added
- [ ] No mocks added where real behavior can be tested
- [ ] All Acceptance Criteria are demonstrably met
- [ ] Required Checks pass in CI
