## MANDATORY: Read policies before doing anything

Before writing ANY code, you MUST complete these steps IN ORDER. Do not skip any step. Do not start implementing until all steps are done.

## SLUG: mobile-screen-redesign

KEYWORD FOR ACTIVATING WORKTREE: /task-mobile-screen-redesign

### Step 0 — Read all policies

Read every file in `.agents/policies/` in this order:

1. `.agents/policies/00-agent-contract.md`
2. `.agents/policies/01-task-protocol.md`
3. `.agents/policies/02-validation.md`
4. `.agents/policies/03-reviewer-policy.md` (if reviewing)

After reading each file, state one key rule from it to prove you read it.

### Step 1 — Read the spec

Read `.agents/specs/active/<task-spec>.md`. Extract: objective, allowed files, forbidden files, constraints, acceptance criteria.

### Step 2 — Run begin_task.sh

Run `bash scripts/begin_task.sh <task-id>` to create the read receipt. Writes are hard-blocked until this exists.

### Step 3 — Pre-change declaration

Output the following BEFORE any edits:
TASK CLASSIFICATION:
RELEVANT FILES:
PLANNED READS:
WHY SUFFICIENT:

### Step 4 — Implement

Use my claude frontend skill
Touch ONLY files listed in APPROVED_FILES. Commit with `[spec:<task-slug>] <message>`.

### Step 4.5 - Frontend Conventions

Hard constraints:

- obey the spec exactly; do not expand scope
- modify only APPROVED_FILES
- do not use any or @ts-ignore
- do not add dependencies or change CSS/config unless the spec explicitly allows it
- complete required validation steps before finishing
- if the spec is unclear, stop and report instead of guessing

### Step 5 — Run quality gates

Run `bash scripts/run_quality_gates.sh` before declaring done. Two consecutive failures = stop and report.

### Step 6 — Open PR

`gh pr create` against main. Do NOT merge.

---

Now here is your actual task:
<notes>
keep all animations the same as the desktop version, just make sure they are implemented in a way that they look good on mobile as well. Pay special attention to the timing and sequencing of animations to ensure they feel smooth and natural on mobile devices.
</notes>
<important>
When implementing the mobile version, focus on using CSS media queries to adjust the layout and styling for smaller screens. This will allow you to reuse much of the existing code while making necessary adjustments for mobile. Ensure that all design elements are correctly positioned and styled according to the provided screenshots, and that the user experience is seamless across different devices.
</important>
<task>
You are an expert at coding mobile implementations in /home/jp/JP_landing_page/packages/frontend.

    I want you to design the mobile version using the provided design screenshots in @jp_prompts/mobile.

    Note that background assets are NOT included in the repository and you will not need to implment them for now, just make sure the rest of the design is implemented correctly. You can use blank white background until the assets are available.

    Here are the steps to redesign the mobile screen:

    1. Review the design screenshots in @jp_prompts/mobile for the mobile version.
    2. Work on each screenshot in the prompt in chronological order, ensuring that the design elements are implemented correctly and match the provided screenshots. Pay close attention to the placement of text, images, and other design elements as shown in the screenshots.
    3. try to reuse as much of the existing code and components as possible, but make necessary adjustments using css mediaqueries to ensure the design matches the mobile screenshots. This may involve modifying styles, layout, and animations to fit the mobile format while maintaining the overall aesthetic of the desktop version.
    4. Test the component to ensure it matches the design and functions correctly.

    Strictly follow the design screenshots in @jp_prompts/mobile to ensure visual consistency. Pay close attention to spacing, colors, and typography.

</task>

---
