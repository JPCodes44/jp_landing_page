#!/usr/bin/env bash
# run_quality_gates.sh
# Master gate runner. Calls all verification scripts and reports pass/fail.
# Usage: run_quality_gates.sh [--staged | --pr]
#   --staged  (default) for pre-commit checks
#   --pr      for CI checks on full branch diff

set -uo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m'

MODE="${1:---staged}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FAILURES=0

run_gate() {
  local name="$1"
  shift
  echo -e "${YELLOW}--- Running gate: $name ---${NC}"
  if "$@"; then
    echo -e "${GREEN}[PASS] $name${NC}"
  else
    echo -e "${RED}[FAIL] $name${NC}"
    FAILURES=$((FAILURES + 1))
  fi
  echo ""
}

echo -e "${BOLD}Running quality gates (mode: $MODE)${NC}"
echo ""

# Gate 1: No secrets
run_gate "verify_no_secrets" bash "$SCRIPT_DIR/verify_no_secrets.sh" "$MODE"

# Gate 2: Spec header valid (agent branches only)
run_gate "verify_spec_header" python3 "$SCRIPT_DIR/verify_spec_header.py"

# Gate 3: Changed files match spec (agent branches only)
run_gate "verify_changed_files" bash "$SCRIPT_DIR/verify_changed_files.sh" "$MODE"

echo -e "${BOLD}--- Gate Summary ---${NC}"
if [[ $FAILURES -eq 0 ]]; then
  echo -e "${GREEN}All gates passed.${NC}"
else
  echo -e "${RED}$FAILURES gate(s) failed.${NC}"
fi

exit $FAILURES
