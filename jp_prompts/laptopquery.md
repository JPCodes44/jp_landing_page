## MANDATORY: Read policies before doing anything

Before writing ANY code, you MUST complete these steps IN ORDER. Do not skip any step. Do not start implementing until all steps are done.

## SLUG: laptop-query

KEYWORD FOR ACTIVATING WORKTREE: /task-laptop-query

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
The current website is perfect for the desktop dimension 1080x1920 and mobile width <= 767px.

All the desktop reference images will be provided in @./jp_prompts/desktopShots with its corresponding labels.

all the scroll images and videos that are in rects @./packages/frontend/src/components/frame3, @./packages/frontend/src/components/frame5, are already in there so dont change anything in those components.

Re-factor as much of the existing css properties from the desktop :root selector to the laptop media query to make the website responsive and visually appealing on laptop screens. This will involve adjusting font sizes, spacing, and layout structures to ensure a cohesive design across different screen sizes.
</important>
<task>
You are an expert at media queries and exactly copying the layout, style, spacing from desktop into laptop screens in /home/jp/JP_landing_page/packages/frontend.

    I want you to media query the entire frontend codebase to make it responsive and look good on the laptop version. This includes but is not limited to: adjusting layout, font sizes, spacing, and any other relevant styles for different screen widths.

    Here are the steps:

    1. Go into the frontend codebase and for each component and app.tsx in /Users/jpmak/JP_landing_page/packages/frontend/src, check how elements on laptop dimensions 2x8 inches for 13-inch, 13x9 inches for 14-inch, and 14x10 inches for 15.6-inch models compare to the desktop images in @./jp_prompts/desktopShots.
    1.1 Note any elements that don't match what you see on the desktop version when compared to the laptop version by looking at the reference images.
    2. Go into the index.css files and create a media query based on what you see fit for the laptop dimensions using @media and width <= 767px (some value)..
    3. Implement the necessary CSS changes within the media query to ensure that the frontend is responsive and visually appealing on laptop screens by referencing the reference images closely. This may involve adjusting font sizes, modifying layout structures, and tweaking spacing to create a cohesive design across different screen sizes.
    5. Test the changes across different laptop dimensions to ensure that the frontend is responsive and visually appealing on all laptop devices.


    Please closely refer to the desktop version reference images provided in the prompt to ensure that the laptop version maintains a cohesive design and visual appeal. Pay close attention to details such as font sizes, spacing, and layout structures to create a seamless user experience across different screen sizes.

</task>

---
