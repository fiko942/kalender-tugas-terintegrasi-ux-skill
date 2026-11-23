# Changelog

## [0.2.0] - 2026-11-23 — PRD Only + UX Skill progress

### Ditambahkan
- Repo progres terpisah dari `kalender-tugas-terintegrasi` PRD-only.
- Root `README.md` berisi PRD penuh dan AC-001–AC-043.
- Sumber `PRD-SOURCE.md`, `UX-SPEC.md`, `DESIGN-SYSTEM.md`, `INTERACTION-SPEC.md`, `ACCEPTANCE-CRITERIA.md`, dan agent source yang diekstrak dari ZIP ke `docs/`.
- Reusable UX Skill di `skills/ux-skill/SKILL.md`.
- Root `AGENTS.md` untuk spec-driven development, UX verification, accessibility, scope, dan status reporting.
- `docs/SOURCE-DECISIONS.md` mencatat perbedaan antara deck overview dan detailed PRD/specs.
- Aplikasi Next.js di `apps/web`, Supabase migrations, dan konfigurasi deployment Vercel pada root `apps/web`.
- `scripts/check-docs.py` untuk memeriksa kelengkapan dokumen, PRD sections, AC IDs, skill structure, dan local links.

### Status verifikasi
- Lulus: seluruh 6 DOCX diekstrak; root README memuat PRD dan 43 AC; checker `python3 scripts/check-docs.py` menemukan dokumen wajib, bagian PRD, AC-001..AC-043, struktur skill, dan tautan lokal.
- Lulus: `npm run lint`, `npm run typecheck`, `npm test` (5 tes), `npm audit --omit=dev --audit-level=high` (0 kerentanan).
- Lulus: production build menghasilkan `.next/BUILD_ID` dan `.next/standalone/server.js`; `npm run start:standalone` menyiapkan aset CSS/JS; helper regression test lulus (termasuk penolakan saat build assets tidak tersedia).
- Lulus: standalone homepage membalas HTTP 200 dengan title `Tempo — Kalender Tugas`; seluruh 8 URL aset CSS/JavaScript unik diuji dan membalas HTTP 200.
- Lulus: `scripts/check-docs.py` memvalidasi required docs, PRD sections, AC-001..AC-043, UX Skill structure, dan tautan lokal; `git diff --check` bersih.
- Browser dibuka pada desktop, tetapi browser daemon menginvalidasi control context setelah reload; interaksi form dan navigasi tidak bisa diselesaikan ulang secara andal. Browser interactions/end-to-end ditandai Not Tested meskipun HTTP/static bundle checks lulus.
- Belum diverifikasi: tampilan viewport mobile, kesesuaian visual penuh terhadap setiap token design system, Supabase live migrations/auth/persistence, provider-backed reminder delivery, dan live Vercel deployment.

### Batasan
- Deck overview menyebut kemungkinan sync otomatis, priority color indicators, push notifications, dan aksi dari panel notifikasi; detail PRD/AC tidak menetapkan semua hal tersebut. Tidak satu pun diasumsikan sebagai requirement baru. Lihat `docs/SOURCE-DECISIONS.md`.
- Demo data tidak disimpan persisten. Aplikasi tidak memiliki klaim pengiriman pengingat eksternal.
- Release acceptance belum dinyatakan lulus; status tiap AC harus punya bukti.
