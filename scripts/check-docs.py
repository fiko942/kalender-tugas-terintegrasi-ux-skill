#!/usr/bin/env python3
"""Check required project docs, acceptance IDs, and local Markdown links."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = [
    "README.md",
    "CHANGELOG.md",
    "AGENTS.md",
    "docs/PRD-SOURCE.md",
    "docs/UX-SPEC.md",
    "docs/DESIGN-SYSTEM.md",
    "docs/INTERACTION-SPEC.md",
    "docs/ACCEPTANCE-CRITERIA.md",
    "docs/AGENTS-SOURCE.md",
    "docs/SOURCE-DECISIONS.md",
    "skills/ux-skill/SKILL.md",
    "apps/web/package.json",
    "apps/web/vercel.json",
]
REQUIRED_ACS = {f"AC-{i:03d}" for i in range(1, 44)}


def main() -> int:
    errors: list[str] = []
    for relative in REQUIRED_FILES:
        if not (ROOT / relative).is_file():
            errors.append(f"missing required file: {relative}")
    readme = ROOT / "README.md"
    if readme.exists():
        text = readme.read_text(encoding="utf-8")
        found = set(re.findall(r"\bAC-\d{3}\b", text))
        missing = sorted(REQUIRED_ACS - found)
        if missing:
            errors.append("README missing AC identifiers: " + ", ".join(missing))
        for required in ("Product Overview", "User Problem", "User Persona", "Product Goals", "Functional Requirements", "Non-Functional Requirements", "Business Rules", "User Stories", "Scope", "Assumptions", "Expected Deliverables", "Release Acceptance", "Test Execution Report"):
            if required.casefold() not in text.casefold():
                errors.append(f"README missing PRD section: {required}")
    source_requirements = {
        "docs/UX-SPEC.md": ("UX Overview", "Information Architecture", "Page Specification", "User Flow", "Responsive Experience", "Empty States"),
        "docs/DESIGN-SYSTEM.md": ("Design Direction", "Color System", "Typography System", "Spacing System", "Component Design Specifications", "Accessibility Guidelines"),
        "docs/INTERACTION-SPEC.md": ("Interaction Overview", "Task Creation Interaction", "Task Editing Interaction", "Task Deletion Interaction", "Notification Interaction", "Data Consistency"),
        "docs/ACCEPTANCE-CRITERIA.md": ("AC-001", "AC-043", "Release Acceptance", "Test Execution Report"),
        "AGENTS.md": ("Required reading", "Specification-driven development", "UX-first", "Required quality checks", "Acceptance reporting"),
    }
    for relative, required_sections in source_requirements.items():
        doc = ROOT / relative
        if doc.exists():
            text = doc.read_text(encoding="utf-8").casefold()
            for section in required_sections:
                if section.casefold() not in text:
                    errors.append(f"{relative} missing required section: {section}")
    skill = ROOT / "skills/ux-skill/SKILL.md"
    if skill.exists():
        text = skill.read_text(encoding="utf-8")
        if not text.startswith("---\n"):
            errors.append("UX Skill must start with YAML frontmatter")
        else:
            frontmatter = text.split("---\n", 2)[1]
            for key in ("name:", "description:"):
                if key not in frontmatter:
                    errors.append(f"UX Skill frontmatter missing {key}")
        for term in ("Accessibility", "Responsive", "Verification", "Acceptance Criteria", "keyboard"):
            if term.casefold() not in text.casefold():
                errors.append(f"UX Skill missing required guidance: {term}")
    for md in [ROOT / "README.md", ROOT / "CHANGELOG.md", ROOT / "AGENTS.md", *[ROOT / "docs" / f for f in ("UX-SPEC.md", "DESIGN-SYSTEM.md", "INTERACTION-SPEC.md", "ACCEPTANCE-CRITERIA.md")], ROOT / "skills/ux-skill/SKILL.md"]:
        if not md.exists():
            continue
        text = md.read_text(encoding="utf-8")
        for target in re.findall(r"\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)", text):
            if target.startswith(("http://", "https://", "mailto:", "#")):
                continue
            base = ROOT if md == ROOT / "README.md" else md.parent
            resolved = (base / target).resolve()
            if not resolved.exists():
                errors.append(f"broken link in {md.relative_to(ROOT)}: {target}")
    if errors:
        print("Documentation checks FAILED:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print("Documentation checks passed: required files, PRD sections, AC-001..AC-043, UX Skill structure, local links.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
