#!/usr/bin/env python3
"""
verify_spec_header.py
On agent/* branches: verifies a valid spec exists in .agents/specs/active/
matching the current branch, with all required fields populated.
Exit 1 on failure.
"""

import subprocess
import sys
import os
import re

RED = "\033[0;31m"
GREEN = "\033[0;32m"
NC = "\033[0m"

REQUIRED_FIELDS = ["TASK", "BRANCH", "WORKTREE", "APPROVED_FILES", "ACCEPTANCE_CRITERIA"]


def get_branch():
    result = subprocess.run(
        ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        capture_output=True, text=True
    )
    return result.stdout.strip()


def check_field_populated(content: str, field: str) -> bool:
    """Return True if the field has at least one non-empty, non-placeholder line after the header."""
    in_section = False
    for line in content.splitlines():
        if line.strip() == f"## {field}":
            in_section = True
            continue
        if in_section:
            if line.startswith("## "):
                break
            stripped = line.strip()
            # Skip blank lines and comment lines
            if not stripped or stripped.startswith("<!--"):
                continue
            # Must have actual content beyond the bare template placeholders
            if stripped in ("-", "agent/", "../JP_landing_page-"):
                return False
            return True
    return False


def main():
    branch = get_branch()

    if not branch.startswith("agent/"):
        print(f"{GREEN}[spec] SKIP: Not an agent branch ({branch}).{NC}")
        sys.exit(0)

    task_slug = branch[len("agent/"):]
    spec_path = f".agents/specs/active/{task_slug}.md"

    if not os.path.exists(spec_path):
        print(f"{RED}[spec] FAIL: No spec found at {spec_path} for branch {branch}.{NC}")
        sys.exit(1)

    with open(spec_path) as f:
        content = f.read()

    # Verify BRANCH field matches actual branch
    branch_match = re.search(r"^## BRANCH\s*\n(?:<!--.*?-->\s*\n)?(.*?)$", content, re.MULTILINE)
    if branch_match:
        spec_branch = branch_match.group(1).strip()
        if spec_branch != branch:
            print(f"{RED}[spec] FAIL: BRANCH in spec is '{spec_branch}' but current branch is '{branch}'.{NC}")
            sys.exit(1)

    failures = []
    for field in REQUIRED_FIELDS:
        if not check_field_populated(content, field):
            failures.append(field)

    if failures:
        print(f"{RED}[spec] FAIL: Missing or empty fields in {spec_path}: {', '.join(failures)}{NC}")
        sys.exit(1)

    print(f"{GREEN}[spec] PASS: Spec {spec_path} is valid.{NC}")
    sys.exit(0)


if __name__ == "__main__":
    main()
