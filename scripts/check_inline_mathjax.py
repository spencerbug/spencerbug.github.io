#!/usr/bin/env python3
"""Reject inline MathJax delimiters that Jekyll/Kramdown will consume."""

from __future__ import annotations

import pathlib

ROOTS = [pathlib.Path("_posts")]


def scan_line(line: str, path: pathlib.Path, lineno: int) -> list[str]:
    errors: list[str] = []

    stripped = line.strip()
    if stripped in {r"\\[", r"\\]"}:
        errors.append(
            f"{path}:{lineno}: single-backslash display MathJax delimiter "
            f"{stripped!r}; use $ delimiters in Markdown source"
        )
    in_code = False
    i = 0

    while i < len(line) - 1:
        ch = line[i]

        if ch == "`":
            in_code = not in_code
            i += 1
            continue

        if not in_code and ch == "\\" and line[i + 1] in "()":
            previous = line[i - 1] if i else ""
            if previous != "\\":
                errors.append(
                    f"{path}:{lineno}: single-backslash inline MathJax delimiter "
                    f"{line[i:i+2]!r}; use two literal backslashes in Markdown source"
                )
            i += 2
            continue

        i += 1

    return errors


def scan_file(path: pathlib.Path) -> list[str]:
    errors: list[str] = []
    in_fence = False
    fence_marker = ""

    for lineno, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        stripped = line.lstrip()

        if stripped.startswith("```") or stripped.startswith("~~~"):
            marker = stripped[:3]
            if not in_fence:
                in_fence = True
                fence_marker = marker
            elif marker == fence_marker:
                in_fence = False
                fence_marker = ""
            continue

        if not in_fence:
            errors.extend(scan_line(line, path, lineno))

    return errors


def main() -> int:
    errors: list[str] = []

    for root in ROOTS:
        if not root.exists():
            continue
        for path in root.rglob("*.md"):
            errors.extend(scan_file(path))

    if errors:
        print("MathJax delimiter errors:")
        for error in errors:
            print(f"  {error}")
        return 1

    print("MathJax delimiters look source-safe.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
