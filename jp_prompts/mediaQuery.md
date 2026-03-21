## MANDATORY: Read policies before doing anything

Before writing ANY code, you MUST complete these steps IN ORDER. Do not skip any step. Do not start implementing until all steps are done.

## SLUG: make-mobile-version

KEYWORD FOR ACTIVATING WORKTREE: /task-make-mobile-version

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

### Step 7 - Commit and stage

Once you commit and stage changes on the worktree for the pr, prompt me to git push and review the code. I will manually push the changes onto the pr worktree and review the code.

Since agent pushes are blocked including from me, tell me the exact command to run to push the changes (usually using --no-verify since the pre-commit hooks will fail due to the agent's unique environment).

---

Now here is your actual task:
<important>
The current website is perfect for the dimension 834 by 474 px ( may not be the exact pixel dimensions).
</important>
<task>
You are an expert at media queries and theme management in /home/jp/JP_landing_page/packages/frontend.

    I want you to media query the entire frontend codebase to make it responsive and look good on the mobile version. This includes but is not limited to: adjusting layout, font sizes, spacing, and any other relevant styles for different screen widths.

    I added in all of the reference images for the mobile version in this prompt. Please use those as a guide for how the mobile version should look and feel. The goal is to ensure that the website is visually appealing and functional on smaller screens while maintaining the design integrity of the original desktop version.

    Here are the steps to implement the theme file:

    1. Go into the frontend codebase and check the responsiveness of elements across different screen sizes. Identify any elements that do not look good or are not functional on smaller screens.
    2. Create a new theme file (e.g., theme.ts) in the appropriate directory (e.g., src/theme/) to centralize all media query breakpoints and related styles.
    3. Define media query breakpoints in the theme file with meaningful names (e.g., mobile, desktop) and their corresponding pixel values.
    4. look at the reference images for the mobile version and identify the specific styles that need to be adjusted for each breakpoint (e.g., font sizes, spacing, layout changes).
    5. Refactor the existing styles in the React components to use the defined media query breakpoints from the theme file. Still stick to the css conventions thats currently used in the codebase (using theme values in react css).
    6. Test the changes across different screen sizes to ensure that the frontend is responsive and visually appealing on all devices.


    Please closely refer to the reference images for the mobile version to ensure that the design and layout are consistent with the intended look and feel. Pay attention to details such as font sizes, spacing, and overall layout adjustments to create a seamless user experience on mobile devices.

</task>

---
