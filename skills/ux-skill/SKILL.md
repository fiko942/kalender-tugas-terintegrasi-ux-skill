---
name: kalender-tugas-ux
description: Apply the approved UX specification, design system, and interaction rules when designing, implementing, or reviewing the Kalender Tugas Terintegrasi web app. Use for UI, responsive behavior, accessibility, forms, calendar interactions, task states, or visual validation.
---

# Kalender Tugas Terintegrasi UX Skill

## Purpose

Use this skill to keep product UX, implementation, and verification aligned with the supplied specifications. Treat these project documents as the product source of truth:

1. Root `README.md` — PRD and product-level acceptance criteria.
2. `docs/UX-SPEC.md` — user goals, information architecture, screen requirements, and responsive experience.
3. `docs/DESIGN-SYSTEM.md` — visual tokens, typography, components, and accessibility rules.
4. `docs/INTERACTION-SPEC.md` — state transitions, validation, feedback, and interaction behavior.
5. `docs/ACCEPTANCE-CRITERIA.md` — AC-001 through AC-043 and verification conventions.
6. Root `AGENTS.md` — repository-wide coding and decision rules.

Read the relevant source sections before changing UI. When a request conflicts with the source, identify the exact conflict and ask for a product decision before changing scope. The overview deck is contextual; `docs/SOURCE-DECISIONS.md` records its differences from the detailed specs.

## Activation

Apply this skill when work changes or evaluates:

- Dashboard, task list, calendar, task details, create/edit forms, status controls, dialogs, or notifications.
- Visual hierarchy, colors, typography, spacing, responsive behavior, keyboard access, or screen-reader feedback.
- Product interaction flows, validation, loading/error/empty states, or design-system consistency.

Skip for isolated backend changes that do not affect a rendered or user-operated flow. Still follow the repository `AGENTS.md` and cite the applicable requirement when backend state affects UX.

## Product context

The primary user is Budi, a 20-year-old student balancing multiple courses. He needs a quick, trustworthy view of deadlines and progress across desktop and mobile. Optimize for deadline visibility, low-friction task entry, predictable feedback, and clear distinction among `Belum Dikerjakan`, `Sedang Dikerjakan`, `Selesai`, and the derived overdue condition.

## Required workflow

### 1. Map request to specification

- Identify the page, component, state, and user flow affected.
- Cite the relevant section and AC IDs in the implementation notes or test names.
- Check scope and assumptions. Do not add priority, LMS sync, collaboration, or a delivery provider based only on an overview slide.
- List normal, loading, empty, error, validation, and destructive states relevant to the change.

### 2. Design before implementation

- Reuse tokens and components in `docs/DESIGN-SYSTEM.md`; avoid component-level arbitrary colors, typography, radii, and spacing.
- Keep task deadline and status meaning visible. Do not convey state by color alone; include text, iconography, or accessible labels.
- Keep the primary action obvious, preserve a predictable hierarchy, and keep forms focused on essential information.
- Use the established stack and patterns in `apps/web`; do not install or replace UI dependencies without a requirement.

### 3. Implement interaction behavior

- Every actionable control has a clear accessible name, visible focus, disabled/loading state when work is pending, and outcome feedback.
- Required fields have persistent labels and inline errors. Preserve valid values when validation or network errors occur. Prevent duplicate submissions while a save is pending.
- Destructive actions require confirmation and explain the object/action. Cancel preserves state; confirmation updates every affected surface.
- Calendar controls expose month/week selection, period navigation, selected date, today, task counts, and all tasks for a selected date. Provide a non-calendar route to task information.
- Filters and sorting compose predictably. Clearing search/filter restores the expected list, and empty results explain how to recover.
- Keep state consistent across dashboard, calendar, and task list after create/edit/delete/status changes.
- For task reminders, present schedule separately from delivery. Never show “sent” or imply delivery without provider confirmation. Completed/deleted tasks must not appear as eligible pending reminders.

### 4. Accessibility and responsive behavior

- Use semantic landmarks, headings, form labels, native controls where suitable, and programmatic names for icon-only controls.
- Verify all core flows with keyboard only: tab order, activation, Escape/cancel where specified, visible focus, and focus restoration after dialogs.
- Ensure errors and save outcomes are announced to assistive technology; status text must not depend on color.
- Respect reduced-motion preferences. Motion must communicate state and must not be required to understand a change.
- Check desktop, tablet, and mobile representative widths. Prevent unintended horizontal overflow; maintain usable touch targets and readable content; account for mobile safe areas where relevant.
- Do not disable browser zoom. Preserve logical reading/focus order at every breakpoint.

### 5. Test and verify

- Add or update focused tests before changing behavior. Include boundary/error cases from the affected ACs.
- Run the app’s lint, typecheck, relevant unit tests, full test suite, and production build as appropriate.
- For user-visible changes, use browser tools to exercise the full changed flow (click/type/submit/navigate), not only a screenshot. Check related routes that share state, and verify edge states.
- When smoke-testing `output: standalone` locally, run `npm run start:standalone`; it stages `.next/static` into `.next/standalone/.next/static` before serving. Verify referenced CSS and JavaScript return HTTP 200 and browser console has no asset/hydration failures.
- For responsive changes, exercise desktop and mobile viewports. If a browser/emulation limitation prevents verification, state the exact limitation and use the closest available substitute without claiming mobile pass.
- Check console/runtime errors and verify results from rendered state or persisted data; do not infer success from a click alone.

## Pre-merge checklist

- [ ] Relevant UX, design-system, interaction, and AC sections were read.
- [ ] The change stays within approved scope; assumptions/conflicts are recorded.
- [ ] Normal, loading, empty, validation, network-error, and destructive states were considered.
- [ ] Keyboard flow, focus, labels, announcements, color-independent status, and reduced motion were checked.
- [ ] Desktop and mobile behavior were checked when layout or interaction is responsive.
- [ ] Related dashboard/list/calendar surfaces remain consistent.
- [ ] Applicable AC IDs have evidence-backed status.
- [ ] Tests and production/build checks are reported with actual output.
- [ ] Supabase live behavior, Vercel deployment, and notification delivery are marked Not Tested/Blocked unless directly verified.

## Reporting rules

Use only these acceptance statuses: `Pass`, `Fail`, `Blocked`, or `Not Tested`. For every `Pass`, state the evidence (test/browser result and environment). Distinguish local demo behavior from authenticated, persistent, provider-backed behavior. Do not report full release acceptance while any Must Have AC is unverified. Summarize remaining UX gaps and deployment dependencies plainly.
