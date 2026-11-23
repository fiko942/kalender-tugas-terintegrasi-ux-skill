# Source Decision Log

## Sources and authority

The ZIP contains `PRD.md.docx`, `UX-SPEC.md.docx`, `DESIGN-SYSTEM.md.docx`, `INTERACTION-SPEC.md.docx`, `ACCEPTANCE-CRITERIA.md.docx`, `AGENTS.md.docx`, and `PRD Overview.pptx`. The first six are preserved as Markdown in this repository. The PPTX is contextual teaching material and is not treated as normative where it conflicts with the detailed specifications.

## Differences requiring product confirmation

| Topic | Detailed PRD/specification | Overview deck | Handling in this progress repository |
| --- | --- | --- | --- |
| Product integration | Product is framed as a task calendar for students, with manual entry; external LMS integration is out of scope. | One slide says input tugas manual & sinkronisasi otomatis. | Keep manual entry as current scope; automatic sync remains a future question. |
| Notifications | H-3 and H-1, scheduled at 09.00 local time; provider unspecified. | Mentions push notifications and marking complete directly from notification panel. | Scheduling is documented; push provider and notification actions are not claimed implemented. |
| Priority indicators | Detailed specifications focus on deadline/status indicators. | Overview slide mentions colored priority indicators. | No priority model is inferred; request confirmation before adding priority as product behavior. |
| Success metrics | PRD sets ≥70% weekly calendar usage and qualitative overdue improvement against baseline. | Deck adds adoption of reminder and a 40% overdue reduction target. | Keep PRD metrics authoritative; deck metrics are context requiring validation. |

## Evidence notes

- Detailed PRD acceptance IDs AC-001–AC-043 are preserved in root `README.md` and `docs/ACCEPTANCE-CRITERIA.md`.
- The deck describes a discovery workflow (interview → empathy map → persona → user needs → PRD). It does not supply interview transcripts or evidence artifacts in this ZIP, so no research claims are invented here.
