# AGENTS.md — AI Coding Agent Instructions

Project: Kalender Tugas Terintegrasi · Specification version 1.0

## 1. Project context

You are an AI software engineer working on a student task calendar. Optimize for user needs, consistent UX, reliable task behavior, accessibility, and testability. Do not produce a visual-only implementation when a specification requires functioning behavior.

## 2. Required reading

Before changing product behavior, read:

- `README.md` — canonical PRD and acceptance criteria.
- `docs/UX-SPEC.md` — information architecture, screen requirements, and responsive experience.
- `docs/DESIGN-SYSTEM.md` — colors, typography, layout, components, and visual rules.
- `docs/INTERACTION-SPEC.md` — validation, states, interactions, and notifications.
- `docs/ACCEPTANCE-CRITERIA.md` — verification requirements AC-001 through AC-043.
- `skills/ux-skill/SKILL.md` — detailed UX implementation and verification workflow.

These documents are the source of truth. If two sources conflict, record both passages and ask for clarification before making a product decision. `docs/SOURCE-DECISIONS.md` records known differences between the detailed specs and the overview deck.

## 3. Specification-driven development

- Map changes to PRD/UX sections and explicit AC IDs.
- Implement one small, testable behavior at a time; write/update tests before behavior changes.
- Keep the feature scope aligned with the approved in-scope/out-of-scope lists.
- Do not infer LMS synchronization, task priority, push notification provider, or reminder delivery from context slides. Get confirmation first.
- Treat overdue as a derived condition: deadline has passed and task is not completed. Never persist it as a fourth task status.
- Preserve user-entered values on validation or network failures and prevent duplicate submissions.
- Keep dashboard, calendar, and task list consistent after mutations.

## 4. UX-first and design consistency

- Follow `docs/DESIGN-SYSTEM.md` tokens and reusable component rules.
- Follow the complete page and interaction behavior in `docs/UX-SPEC.md` and `docs/INTERACTION-SPEC.md`.
- Provide explicit loading, success, validation, empty, retryable-error, and destructive-confirmation feedback where applicable.
- Ensure accessible labels, keyboard operation, visible focus, color-independent status, screen-reader announcements, and reduced-motion support.
- Verify representative desktop/tablet/mobile widths for responsive changes; do not claim a viewport was tested if tooling reports another size.

## 5. Application architecture

The web application is in `apps/web` and uses Next.js App Router, TypeScript, React, Supabase libraries, and standalone output. Deployment target is Vercel with root directory `apps/web`.

- Never put secrets in source. Use `.env.example` only for variable names/placeholders; `.env.local` must remain ignored.
- Supabase schema changes belong in ordered SQL migrations under `apps/web/supabase/migrations/`.
- Before using Supabase, apply all migrations in order. Never claim live RLS/auth/persistence from static inspection alone.
- Reminder scheduling state is not proof of delivery. No provider delivery may be reported as sent without provider confirmation.
- The local standalone production command is `npm run start:standalone`. It prepares generated static assets before starting `.next/standalone/server.js`; check CSS/JS asset responses and browser console hydration errors. Vercel manages the deployed runtime. Do not use `next start` as the verification command for standalone output.

## 6. Required quality checks

For UI and behavior changes:

1. Focused tests, then full `npm test`.
2. `npm run lint` and `npm run typecheck`.
3. `npm run build` for production-sensitive changes.
4. Browser end-to-end verification for visible behavior: operate the flow, inspect resulting state, related routes, errors, and responsive layout when relevant.
5. Check console errors, keyboard usability, and accessibility-related state.

For documentation changes, run `python3 scripts/check-docs.py` and verify local links.

## 7. Acceptance reporting

Use `Pass`, `Fail`, `Blocked`, or `Not Tested`. `Pass` requires direct evidence. The current local app may run in demo mode; clearly distinguish demo behavior from authenticated persisted behavior. Mark Supabase migrations, real notifications, mobile verification, and live deployment according to evidence. Do not claim release acceptance while any Must Have criterion remains unverified.

## 8. Completion report

Report: changed files/behavior, reason, tests and actual results, browser flow and viewport, AC status, known limitations, and deployment state. Never imply production deployment, data persistence, or reminder delivery without direct evidence.
