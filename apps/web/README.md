# Tempo — aplikasi web

Aplikasi kalender tugas akademik berbasis Next.js App Router. Baca root [`README.md`](../../README.md), spesifikasi UX, dan [`AGENTS.md`](../../AGENTS.md) sebelum perubahan produk.

## Prasyarat

- Node.js 20.9 atau lebih baru.
- Project Supabase yang memiliki Auth dan PostgreSQL.
- Vercel untuk deployment; set **Root Directory** menjadi `apps/web`.

## Menjalankan lokal

```bash
cp .env.example .env.local
# Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY dari Supabase Dashboard
npm install
npm run dev
```

Tanpa kredensial, halaman memakai dataset demo sementara di memori browser. Mode demo tidak menyediakan login atau persistensi.

## Migrasi Supabase

Jalankan semua migration secara berurutan melalui Supabase CLI atau SQL Editor:

1. `supabase/migrations/202611230001_initial_schema.sql`
2. `supabase/migrations/202611230002_reminder_processing.sql`
3. `supabase/migrations/202611230003_atomic_reminder_sync.sql`

Migration live belum diterapkan atau diverifikasi dalam tahap ini.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Untuk menyiapkan static assets dan menjalankan output production standalone lokal setelah build:

```bash
npm run start:standalone
```

## Deployment

Buat project Vercel dari repository ini dan set root directory `apps/web`. Tambahkan `NEXT_PUBLIC_SUPABASE_URL` serta `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` pada Preview dan Production. Atur redirect URLs di Supabase Auth setelah URL deployment diketahui. Deployment live dan reminder eksternal belum dilakukan; delivery membutuhkan provider server-side yang dikonfigurasi serta diuji.
