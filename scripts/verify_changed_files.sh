#!/usr/bin/env bash
# verify_changed_files.sh
# On agent/* branches: verifies all changed files are in the spec's APPROVED_FILES.
# Usage: verify_changed_files.sh [--staged | --pr]
#   --staged  check git staged files (pre-commit)
#   --pr      check files changed vs main (CI)

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
MODE="${1:---staged}"

# Only enforce on agent/* branches
if [[ "$BRANCH" != agent/* ]]; then
  echo -e "${GREEN}[files] SKIP: Not an agent branch ($BRANCH). No file restrictions.${NC}"
  exit 0
fi

TASK_SLUG="${BRANCH#agent/}"
SPEC_FILE=".agents/specs/active/${TASK_SLUG}.md"

if [[ ! -f "$SPEC_FILE" ]]; then
  echo -e "${RED}[files] FAIL: No spec found at $SPEC_FILE for branch $BRANCH.${NC}"
  exit 1
fi

# Extract APPROVED_FILES lines from spec (lines under ## APPROVED_FILES until next ##)
APPROVED_FILES=$(awk '/^## APPROVED_FILES/{found=1; next} found && /^## /{exit} found && /^- /{gsub(/^- /,""); print}' "$SPEC_FILE")

if [[ -z "$APPROVED_FILES" ]]; then
  echo -e "${RED}[files] FAIL: APPROVED_FILES is empty in $SPEC_FILE.${NC}"
  exit 1
fi

# Get changed files
if [[ "$MODE" == "--staged" ]]; then
  CHANGED=$(git diff --cached --name-only --diff-filter=ACM)
elif [[ "$MODE" == "--pr" ]]; then
  CHANGED=$(git diff --name-only origin/main...HEAD 2>/dev/null || git diff --name-only main...HEAD)
else
  echo -e "${RED}[files] Unknown mode: $MODE. Use --staged or --pr.${NC}"
  exit 1
fi

if [[ -z "$CHANGED" ]]; then
  echo -e "${GREEN}[files] PASS: No changed files to check.${NC}"
  exit 0
fi

FAILURES=0

while IFS= read -r changed_file; do
  APPROVED=0
  while IFS= read -r pattern; do
    [[ -z "$pattern" ]] && continue
    # shellcheck disable=SC2053
    if [[ "$changed_file" == $pattern ]]; then
      APPROVED=1
      break
    fi
  done <<< "$APPROVED_FILES"

  if [[ $APPROVED -eq 0 ]]; then
    echo -e "${RED}[files] FAIL: $changed_file is not in APPROVED_FILES.${NC}"
    FAILURES=$((FAILURES + 1))
  fi
done <<< "$CHANGED"

if [[ $FAILURES -eq 0 ]]; then
  echo -e "${GREEN}[files] PASS: All changed files are approved.${NC}"
  exit 0
else
  echo -e "${RED}[files] FAIL: $FAILURES unapproved file(s). Add them to APPROVED_FILES in $SPEC_FILE or remove the changes.${NC}"
  exit 1
fi
