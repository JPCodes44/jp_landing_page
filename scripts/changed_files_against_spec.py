#!/usr/bin/env python3
"""
changed_files_against_spec.py
CI usage: given a branch name, list files changed vs main and compare against
the spec's APPROVED_FILES. Exits 1 if any unapproved file is touched.

Usage: python3 scripts/changed_files_against_spec.py <branch-name>
"""

import subprocess
import sys
import os
import fnmatch

RED = "\033[0;31m"
GREEN = "\033[0;32m"
NC = "\033[0m"


def get_changed_files(branch: str) -> list[str]:
    for base in ("origin/main", "main"):
        result = subprocess.run(
            ["git", "diff", "--name-only", f"{base}...{branch}"],
            capture_output=True, text=True
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip().splitlines()
    return []


def parse_approved_files(spec_path: str) -> list[str]:
    approved = []
    in_section = False
    with open(spec_path) as f:
        for line in f:
            stripped = line.strip()
            if stripped == "## APPROVED_FILES":
                in_section = True
                continue
            if in_section:
                if stripped.startswith("## "):
                    break
                if stripped.startswith("- "):
                    approved.append(stripped[2:].strip())
    return approved


def is_approved(filepath: str, patterns: list[str]) -> bool:
    for pattern in patterns:
        if fnmatch.fnmatch(filepath, pattern):
            return True
        if filepath == pattern:
            return True
    return False


def main():
    if len(sys.argv) < 2:
        print(f"{RED}Usage: changed_files_against_spec.py <branch-name>{NC}")
        sys.exit(2)

    branch = sys.argv[1]

    if not branch.startswith("agent/"):
        print(f"{GREEN}[audit] SKIP: Branch '{branch}' is not an agent branch.{NC}")
        sys.exit(0)

    task_slug = branch[len("agent/"):]
    spec_path = f".agents/specs/active/{task_slug}.md"

    if not os.path.exists(spec_path):
        print(f"{RED}[audit] FAIL: No spec found at {spec_path}.{NC}")
        sys.exit(1)

    approved_patterns = parse_approved_files(spec_path)
    if not approved_patterns:
        print(f"{RED}[audit] FAIL: APPROVED_FILES is empty in {spec_path}.{NC}")
        sys.exit(1)

    changed_files = get_changed_files(branch)
    if not changed_files:
        print(f"{GREEN}[audit] PASS: No changed files detected.{NC}")
        sys.exit(0)

    failures = []
    for f in changed_files:
        if not is_approved(f, approved_patterns):
            failures.append(f)

    if failures:
        print(f"{RED}[audit] FAIL: {len(failures)} unapproved file(s) changed:{NC}")
        for f in failures:
            print(f"  - {f}")
        print(f"{RED}  Update APPROVED_FILES in {spec_path} or remove the changes.{NC}")
        sys.exit(1)

    print(f"{GREEN}[audit] PASS: All {len(changed_files)} changed file(s) are approved.{NC}")
    sys.exit(0)


if __name__ == "__main__":
    main()
