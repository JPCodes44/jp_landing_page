## MANDATORY: Read policies before doing anything

Before writing ANY code, you MUST complete these steps IN ORDER. Do not skip any step. Do not start implementing until all steps are done.

## SLUG: redesign-and-animate-frame3

KEYWORD FOR ACTIVATING WORKTREE: /task-insert-animation

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
You need to put in the animation within the existing rectangle in @packages/frontend/src/components/Frame3.tsx.
</important>
<task>
You are an expert in playing videos with its current duration based on scrub animations in /home/jp/JP_landing_page/packages/frontend.

    I want you to insert the animation into the rectangle in @packages/frontend/src/components/Frame3.tsx. The animation should play based on scrub animations, meaning as the user scrolls, the animation should play forward or backward depending on the scroll direction. The animation should also be responsive and look good on all screen sizes. The animation should fully end and stop at the end of the scroll.


    Here are the steps to implement the theme file:

    1. Go into @packages/frontend/src/components/Frame3.tsx and identify the rectangle where the animation needs to be inserted.
    2. Grab my video file in @packages/frontend/src/assets/videos/scrubDemo.mp4 and import it into Frame3.tsx.
    3. make sure the video is within the rectangle completely without changing the dimensions of the rectangle or the position animation of the rectangle.
    4. animate the video based on the scroll position of the user. The video should play forward when the user scrolls down and play backward when the user scrolls up. The animation should be smooth and responsive to the user's scrolling behavior.
    5. Test the changes across different screen sizes to ensure that the frontend is responsive and visually appealing on all devices.

    Make sure to cover the entire rectangle with the video and ensure that the animation is smooth and responsive to the user's scrolling behavior. The goal is to create an engaging and interactive experience for the users as they scroll through the page.

</task>

---
