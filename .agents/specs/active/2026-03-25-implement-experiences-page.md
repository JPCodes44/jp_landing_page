# Spec: implement-experiences-page

Copy this file to `.agents/specs/active/<YYYY-MM-DD>-<task-id>.md` and fill in every field before starting work. A spec with any blank required field is invalid. The agent must not start without a valid spec.

---

## Objective
Implement the Experiences page component as a separate route (`/experiences`) with a project showcase grid matching the provided design screenshot.

## Why
The Experiences page is needed to showcase trucking compliance projects. The current `Services.tsx` was deleted and `Experiences.tsx` is a stub that needs full implementation.


## Branch
<!-- Must follow pattern: agent/<task-id> -->
agent/implement-experiences-page

## Worktree
<!-- Path to the worktree directory -->
../wt-implement-experiences-page

## Allowed files
- packages/frontend/src/components/Experiences.tsx
- packages/frontend/src/components/experiences/**
- packages/frontend/styles/assets/2d/icons/**
- packages/frontend/src/main.tsx
- packages/frontend/src/App.tsx
- packages/frontend/src/index.css
- packages/frontend/src/theme/index.ts
- packages/frontend/src/App.test.tsx
- .agents/specs/active/2026-03-25-implement-experiences-page.md
- .agents/logs/reads/implement-experiences-page.json

## Forbidden files
<!-- Files the agent must never touch regardless of what the task seems to require. -->
- package-lock.json
- .github/workflows/*
- infra/*

## Constraints
<!-- Non-negotiable rules for the implementation. -->
- No new dependencies unless explicitly approved
- Preserve all public APIs
- Must not break existing tests

## Domain Policy
<!-- Which domain policy applies. Remove inapplicable lines. -->
- `.agents/policies/00-agent-contract.md` (always)
- `.agents/policies/01-task-protocol.md` (always)
- `.agents/policies/02-validation.md` (always)
- `.agents/policies/03-frontend-policy.md` (if touching packages/frontend/)

## Read Before Starting
- packages/frontend/src/components/Frame4.tsx (pattern reference)
- packages/frontend/src/App.tsx (routing integration)
- packages/frontend/src/main.tsx (router config)

## Implementation Notes
- Use inline CSSProperties with CSS custom properties for responsive values
- Fanwood Text font only
- GSAP ScrollTrigger for animations following Frame4 patterns
- Placeholder dark gray divs for card images
- useBreakpoint hook for background image selection (grid.png desktop / image_frame2.png mobile)

## Acceptance Criteria
- [ ] `/experiences` route renders the Experiences page
- [ ] Navbar "experiences" link navigates to `/experiences`
- [ ] 2x2 card grid with placeholder images, tags, titles, descriptions
- [ ] Background uses grid.png on desktop and image_frame2.png on mobile
- [ ] GSAP scroll animations (header fade-in, card stagger, CTA fade-in)
- [ ] Responsive layout (2-col desktop, 1-col phone)
- [ ] bun run typecheck passes
- [ ] bun run lint passes

## Required Checks
<!-- Commands that must pass before the PR is opened. -->
- bun run lint
- bun run typecheck
- bun test

## Rollback Plan
<!-- What to do if this causes a regression after merge. -->
Revert branch if regression appears in routing or main page layout.

## Reviewer Checklist
<!-- The reviewer works through this list. All items must pass before approval. -->
- [ ] All changed files are in Allowed Files
- [ ] No files from Forbidden Files were touched
- [ ] No new dependencies introduced
- [ ] No dead abstractions added
- [ ] No mocks added where real behavior can be tested
- [ ] All Acceptance Criteria are demonstrably met
- [ ] Required Checks pass in CI
