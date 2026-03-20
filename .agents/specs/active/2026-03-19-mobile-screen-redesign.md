# Spec: mobile-screen-redesign

---

## Objective
Add a responsive mobile layout to the landing page (≤768px) so that every section renders correctly on mobile viewports, matching the 13 design screenshots in `jp_prompts/mobileShots/`, while keeping all existing GSAP animations intact.

## Why
The landing page is desktop-only with large fixed dimensions (14rem headings, 55vw hero widths, 3.75rem paddings); on mobile viewports the page is unusable and layouts break completely.

## Branch
agent/mobile-screen-redesign

## Worktree
../wt-mobile-screen-redesign

## Allowed files
- packages/frontend/src/App.tsx
- packages/frontend/src/components/Frame1.tsx
- packages/frontend/src/components/Frame2.tsx
- packages/frontend/src/components/Frame3.tsx
- packages/frontend/src/components/Frame4.tsx
- packages/frontend/src/components/Frame5.tsx
- packages/frontend/src/components/Frame6.tsx
- packages/frontend/src/components/Footer.tsx
- packages/frontend/src/theme/index.ts
- packages/frontend/src/hooks/useIsMobile.ts
- packages/frontend/src/hooks/useBreakpoint.ts
- packages/frontend/src/index.css
- packages/frontend/styles/assets/2d/videos/frame3Animation/*.png
- packages/frontend/src/App.test.tsx
- packages/frontend/src/components/Frame2.test.tsx
- packages/frontend/src/components/Frame3.test.tsx
- packages/frontend/src/components/Frame4.test.tsx
- packages/frontend/src/components/Frame5.test.tsx
- .agents/specs/active/2026-03-19-mobile-screen-redesign.md
- .agents/logs/runs/mobile-screen-redesign.json

## Forbidden files
- package-lock.json
- .github/workflows/*
- infra/*

## Constraints
- No new dependencies unless explicitly approved
- Preserve all public APIs
- Must not break existing tests
- All GSAP animations must remain functional on mobile

## Domain Policy
- `.agents/policies/00-agent-contract.md` (always)
- `.agents/policies/01-task-protocol.md` (always)
- `.agents/policies/02-validation.md` (always)
- `.agents/policies/03-frontend-policy.md` (if touching packages/frontend/)

## Read Before Starting
- packages/frontend/src/App.tsx
- packages/frontend/src/components/Frame1.tsx
- packages/frontend/src/components/Frame2.tsx
- packages/frontend/src/components/Frame3.tsx
- packages/frontend/src/components/Frame4.tsx
- packages/frontend/src/components/Frame5.tsx
- packages/frontend/src/components/Frame6.tsx
- packages/frontend/src/components/Footer.tsx
- packages/frontend/src/theme/index.ts
- jp_prompts/mobileShots/ (all 13 screenshots)

## Implementation Notes
- Use a `useIsMobile` hook (window.matchMedia at 768px breakpoint) for JS-based responsive detection
- Add mobile-specific constants to theme/index.ts with `MOBILE_` prefix
- Hamburger nav in App.tsx: ≡ button on mobile; full-screen overlay with stacked links when open
- Frame2: vertical layout on mobile (heading → paragraph → icon row, no 2-col grid)
- Frame3: canvas animation works as-is, may need initial height tweak
- Frame5: heading font sizes need mobile overrides (13rem → 4rem initial, 8rem → 3rem final)
- All inline style values must come from theme constants, no hardcoded values except layout logic

## Acceptance Criteria
- [ ] Navbar shows hamburger icon on mobile (≤768px); horizontal links hidden
- [ ] Hamburger opens full-screen overlay with stacked nav links; X closes it
- [ ] Frame1 hero heading is ~2.8rem on mobile; text fills ~88vw
- [ ] Frame2 layout is vertical on mobile: heading → paragraph → icon row
- [ ] Frame3 canvas animation runs correctly on mobile viewport
- [ ] Frame4 heading and accordion items are readable on mobile (reduced font sizes)
- [ ] Frame5 sticky animation plays correctly on mobile
- [ ] Frame6 CTA text is ~2.8rem on mobile; form fields fill width with minimal padding
- [ ] Footer contact info is readable with reduced padding
- [ ] All existing GSAP animations still play on mobile
- [ ] `bun run lint`, `bun run typecheck`, `bun test` all pass
- [ ] No new npm/bun dependencies added

## Required Checks
- bun run lint
- bun run typecheck
- bun test

## Rollback Plan
Revert branch if regression appears in desktop layout or GSAP animations.

## Reviewer Checklist
- [ ] All changed files are in Allowed Files
- [ ] No files from Forbidden Files were touched
- [ ] No new dependencies introduced
- [ ] No dead abstractions added
- [ ] No mocks added where real behavior can be tested
- [ ] All Acceptance Criteria are demonstrably met
- [ ] Required Checks pass in CI
