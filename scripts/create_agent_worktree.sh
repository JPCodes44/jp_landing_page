#!/usr/bin/env bash
# create_agent_worktree.sh
# Scaffolds a new agent worktree and spec file.
# Usage: ./scripts/create_agent_worktree.sh <task-slug>

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m'

if [[ $# -lt 1 ]]; then
  echo -e "${RED}Usage: $0 <task-slug>${NC}"
  echo "  Example: $0 add-hero-section"
  exit 1
fi

TASK_SLUG="$1"
BRANCH="agent/${TASK_SLUG}"
REPO_ROOT="$(git rev-parse --show-toplevel)"
REPO_NAME="$(basename "$REPO_ROOT")"
WORKTREE_PATH="${REPO_ROOT}/../${REPO_NAME}-${TASK_SLUG}"
SPEC_PATH="${REPO_ROOT}/.agents/specs/active/${TASK_SLUG}.md"
TEMPLATE_PATH="${REPO_ROOT}/.agents/specs/TEMPLATE.md"

echo -e "${BOLD}Creating agent worktree for: $TASK_SLUG${NC}"
echo ""

# Validate slug
if [[ ! "$TASK_SLUG" =~ ^[a-z0-9-]+$ ]]; then
  echo -e "${RED}Error: task-slug must be lowercase alphanumeric with hyphens only.${NC}"
  exit 1
fi

# Check spec doesn't already exist
if [[ -f "$SPEC_PATH" ]]; then
  echo -e "${RED}Error: Spec already exists at $SPEC_PATH. Delete it first if starting fresh.${NC}"
  exit 1
fi

# Check branch doesn't already exist
if git show-ref --quiet "refs/heads/${BRANCH}"; then
  echo -e "${RED}Error: Branch $BRANCH already exists.${NC}"
  exit 1
fi

# Check worktree path doesn't already exist
if [[ -d "$WORKTREE_PATH" ]]; then
  echo -e "${RED}Error: Worktree directory already exists at $WORKTREE_PATH.${NC}"
  exit 1
fi

# Create spec from template
echo -e "${YELLOW}Creating spec at $SPEC_PATH...${NC}"
cp "$TEMPLATE_PATH" "$SPEC_PATH"

# Pre-fill BRANCH and WORKTREE fields
sed -i "s|^agent/$|${BRANCH}|" "$SPEC_PATH"
sed -i "s|^\.\./JP_landing_page-$|${WORKTREE_PATH}|" "$SPEC_PATH"

echo -e "${GREEN}Spec created. Fill in TASK, APPROVED_FILES, and ACCEPTANCE_CRITERIA before starting work.${NC}"
echo ""

# Create worktree + branch
echo -e "${YELLOW}Creating git worktree at $WORKTREE_PATH on branch $BRANCH...${NC}"
git worktree add "$WORKTREE_PATH" -b "$BRANCH"

# Configure hooks path in the worktree
echo -e "${YELLOW}Configuring hooks in worktree...${NC}"
git -C "$WORKTREE_PATH" config core.hooksPath "${REPO_ROOT}/.githooks"

echo ""
echo -e "${GREEN}${BOLD}Done! Worktree ready.${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit the spec:  ${SPEC_PATH}"
echo "  2. Change to worktree:  cd ${WORKTREE_PATH}"
echo "  3. Implement, then gate:  bash scripts/run_quality_gates.sh"
echo "  4. Open a PR from $BRANCH to main"
