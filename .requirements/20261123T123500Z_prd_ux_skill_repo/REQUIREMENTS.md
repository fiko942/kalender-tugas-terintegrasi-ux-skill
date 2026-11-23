# PRD + UX Skill Repository Requirements

## As Is
- A separate public repository `fiko942/kalender-tugas-terintegrasi` contains a PRD in root `README.md`, `CHANGELOG.md`, `apps/web`, Supabase migrations, and Vercel configuration.
- That repository does not include the source UX specification, design system, interaction specification, acceptance criteria document, reusable UX agent skill, or root `AGENTS.md`.
- The supplied ZIP contains seven files: PRD, UX spec, design system, interaction spec, acceptance criteria, AGENTS instruction document (all DOCX), and PRD Overview PPTX.
- User approved a second public repository at `fiko942/kalender-tugas-terintegrasi-ux-skill` with both source UX documentation and a reusable agent skill. The PRD-only repository must remain unchanged.
- App production build output was previously observed to generate standalone artifacts and the standalone server answered HTTP 200. Supabase live migrations and external reminder delivery have not been verified; Vercel deployment has not been performed.

## To Be
Create a distinct repository at `~/Desktop/Kalender Tugas Terintegrasi UX Skill` containing the full PRD at root README, complete source UX specifications in `docs/`, a reusable `skills/ux-skill/SKILL.md`, root `AGENTS.md`, `CHANGELOG.md`, and `apps/web` with deployment configuration. Preserve source meaning, label unresolved implementation/testing gaps truthfully, and do not mutate the PRD-only repository.

## Requirements
1. Create a separate repository directory and verify it does not reuse the existing PRD-only Git metadata or remote.
2. Root `README.md` contains the complete PRD v1.0, all original sections and AC-001 through AC-043, with links to UX artifacts.
3. `docs/UX-SPEC.md`, `docs/DESIGN-SYSTEM.md`, `docs/INTERACTION-SPEC.md`, and `docs/ACCEPTANCE-CRITERIA.md` preserve every substantive section from the supplied corresponding source documents.
4. `skills/ux-skill/SKILL.md` is a valid, reusable agent skill with frontmatter, activation criteria, required source-doc reading, specification-first implementation workflow, accessibility/responsive/interactions guidance, verification checklist, constraints, and evidence-based reporting; it is tailored to this product and its app stack.
5. Root `AGENTS.md` preserves original agent guidance, points to actual documentation paths, and says to resolve spec conflicts explicitly without silent assumptions.
6. Root `CHANGELOG.md` distinguishes source deliverables, app implementation, verified checks, blocked/not-tested items, and deployment limits.
7. Copy the existing `apps/web` implementation and migrations, keep all secrets excluded, and document ordered migrations and the documented standalone production start command.
8. Vercel configuration must target Next.js root `apps/web`; no claim of live deployment absent evidence.
9. The UX Skill and agent instructions must map validation work to PRD/UX ACs; avoid claiming all 43 ACs pass when tests cover only a subset.
10. Run content completeness checks, lint, typecheck, tests, production build and standalone HTTP smoke; browser-test core user interactions and responsive layout when browser tooling permits.
11. Create a commit and a second new public GitHub repository only after review/verification, then push and verify remote identity and commit. Do not change the original PRD-only repo or coursework repo.

## Acceptance Criteria
- AC-R1: New local path has independent Git history and no accidental remote to the PRD-only repository.
- AC-R2: Root PRD contains AC-001..AC-043 exactly once each, and includes source PRD sections.
- AC-R3: Extracted UX docs contain all source headings and acceptance criteria; no source doc omitted.
- AC-R4: UX skill metadata and instructions validate structurally and explicitly guide agents to source artifacts, accessibility, responsive states, interaction checks, tests, and truthful reporting.
- AC-R5: `AGENTS.md` accurately identifies the docs and operational constraints.
- AC-R6: Changelog includes completed artifacts and explicit unverified/live integration states.
- AC-R7: App passes lint, typecheck, test suite, production build, standalone server response and browser flow checks; any limit is recorded.
- AC-R8: New public remote URL differs from PRD-only URL; pushed main commit matches local reviewed commit.
- AC-R9: PRD-only repo working tree, commit and remote remain unchanged.

## Testing Plan
- Content extraction: compare source DOCX paragraph counts/headings, AC IDs, required headings, and doc links against target files.
- Structural: validate YAML frontmatter, skill name/path, Markdown links, repo remotes, ignored files and secret exclusion.
- App: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, then launch `npm run start:standalone` with an alternate port; the script must prepare CSS/JS assets before serving and assert HTTP 200 plus expected page title.
- Browser: create/validate task, search/filter, navigate month/week, open task detail, inspect mobile viewport and note any automation limitation.
- GitHub: verify account identity, target repo absent, create repo public, push and compare local/remote commit SHA.
- Safety: compare original repo HEAD/status/remote before and after to establish it remains untouched.

## Implementation Plan
1. Create isolated repo and requirements/spec plan; save before implementation. Verify source repo HEAD/status remain stable.
2. Extract and convert source DOCX documents into repo docs; add PRD content and tests for required headings/AC IDs; verify completeness.
3. Create reusable UX skill and root AGENTS.md; add lightweight structural validation (frontmatter/path/required sections/links) and run it.
4. Copy apps/web, clarify README migration order and standalone server startup; confirm deployment config and secret ignore rules.
5. Run app tests/lint/typecheck/build and start standalone output; browser-check main/edge interaction and desktop/mobile if available.
6. Update changelog to evidence-based status; inspect complete staged diff and check against requirements.
7. Commit in new local repository, create distinct public GitHub repo, push and verify; recheck original PRD-only repository unchanged.
