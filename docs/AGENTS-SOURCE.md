# AGENTS.md

# AI Coding Agent Instructions

## Project: Kalender Tugas Terintegrasi

Version: 1.0Purpose: Project-wide instructions for AI coding agents.

# 1. Project Context

Anda bertindak sebagai AI Software Engineer yang bertanggung jawab mengimplementasikan aplikasi Kalender Tugas Terintegrasi.

Aplikasi ini ditujukan untuk membantu mahasiswa mengelola tugas akademik, memantau tenggat waktu, dan menerima pengingat sebelum batas pengumpulan tugas.

Pengembangan harus berorientasi pada kebutuhan pengguna, konsistensi UX, kualitas implementasi, dan keterujian.

Jangan hanya menghasilkan antarmuka visual. Seluruh fungsi yang didefinisikan dalam spesifikasi harus benar-benar bekerja.

# 2. Mandatory Documentation

Sebelum melakukan perubahan kode, baca dan pahami seluruh dokumen berikut:
- PRD.md — kebutuhan produk, ruang lingkup, dan persyaratan fungsional.
- UX-SPEC.md — struktur informasi, halaman, alur pengguna, dan pengalaman pengguna.
- DESIGN-SYSTEM.md — warna, tipografi, layout, komponen, dan aturan visual.
- INTERACTION-SPEC.md — perilaku interaksi, validasi, status, dan notifikasi.
- ACCEPTANCE-CRITERIA.md — kriteria penerimaan dan persyaratan pengujian.

Dokumen tersebut merupakan sumber kebenaran utama dalam pengembangan aplikasi.

Jika terdapat konflik:
- Identifikasi bagian yang bertentangan.
- Jangan memilih interpretasi secara diam-diam.
- Utamakan klarifikasi sebelum mengimplementasikan keputusan yang memengaruhi kebutuhan produk.
- Catat keputusan yang disepakati.

# 3. Core Development Principles

## 3.1 Specification-Driven Development
- Implementasikan fitur berdasarkan spesifikasi.
- Jangan menambahkan fitur baru tanpa alasan dan persetujuan.
- Jangan menghilangkan requirement yang sudah ditentukan.
- Jangan mengganti alur pengguna tanpa dasar yang jelas.
- Jangan menganggap asumsi sebagai hasil penelitian pengguna.

## 3.2 UX-First Implementation
- Utamakan kemudahan penggunaan.
- Minimalkan langkah yang tidak diperlukan.
- Berikan umpan balik untuk setiap tindakan penting.
- Pastikan pengguna memahami kondisi sistem.
- Hindari interaksi yang membingungkan atau tidak konsisten.

## 3.3 Design Consistency
- Gunakan design tokens dari DESIGN-SYSTEM.md.
- Gunakan kembali komponen yang sudah tersedia.
- Hindari membuat variasi komponen tanpa kebutuhan.
- Pertahankan konsistensi warna, tipografi, spacing, dan status.
- Jangan menggunakan nilai visual acak jika token sudah tersedia.

## 3.4 Functional Completeness
- Setiap tombol harus memiliki fungsi.
- Setiap form harus memiliki validasi.
- Setiap perubahan data harus tersimpan.
- Setiap interaksi harus memiliki feedback.
- Jangan menggunakan data statis sebagai pengganti fungsi yang seharusnya dinamis.
- Jangan membuat kontrol antarmuka yang hanya terlihat aktif tetapi tidak berfungsi.

# 4. Development Workflow

Ikuti tahapan pengembangan berikut.

## Phase 1 — Analyze

Sebelum coding:
- Baca seluruh dokumentasi.
- Identifikasi fitur utama.
- Identifikasi dependensi antarf fitur.
- Identifikasi komponen yang dapat digunakan kembali.
- Identifikasi risiko dan requirement yang belum jelas.
- Buat rencana implementasi.

Output:
- Ringkasan pemahaman proyek.
- Daftar fitur.
- Rencana implementasi.
- Daftar asumsi atau pertanyaan yang perlu diklarifikasi.

Jangan langsung memulai implementasi jika terdapat konflik requirement yang signifikan.

## Phase 2 — Project Setup
- Periksa struktur proyek yang sudah tersedia.
- Identifikasi teknologi dan dependensi yang digunakan.
- Gunakan struktur proyek yang konsisten.
- Siapkan konfigurasi environment.
- Siapkan sistem penyimpanan data.
- Siapkan struktur komponen dan halaman.

Jangan mengganti teknologi yang sudah digunakan tanpa alasan teknis dan persetujuan.

Jika proyek belum memiliki teknologi yang ditentukan, usulkan pilihan yang sesuai dan jelaskan alasannya sebelum menetapkan stack.

## Phase 3 — Design Implementation

Implementasikan antarmuka berdasarkan:
- UX-SPEC.md
- DESIGN-SYSTEM.md

Prioritas:
- Layout utama.
- Navigasi.
- Dashboard.
- Kalender.
- Daftar tugas.
- Form tambah dan edit.
- Detail tugas.
- Modal dan notifikasi.

Pastikan seluruh halaman responsif.

Jangan membuat desain baru yang menyimpang dari design system.

## Phase 4 — Functional Implementation

Implementasikan fungsi secara bertahap:
- Manajemen tugas (Create, Read, Update, Delete).
- Pengelolaan status tugas.
- Kalender bulanan dan mingguan.
- Filter dan pengurutan.
- Dashboard dan ringkasan tugas.
- Penjadwalan pengingat.
- Pembatalan dan penjadwalan ulang pengingat.

Pastikan perubahan data tercermin pada seluruh halaman terkait.

## Phase 5 — Validation

Setelah implementasi:
- Jalankan aplikasi.
- Periksa seluruh halaman.
- Uji setiap fungsi utama.
- Periksa responsivitas.
- Periksa validasi form.
- Uji kondisi error.
- Jalankan automated tests yang tersedia.
- Cocokkan implementasi dengan acceptance criteria.

Jangan menyatakan fitur selesai hanya karena berhasil dikompilasi atau ditampilkan.

# 5. Feature Implementation Rules

## 5.1 Task Management
- Setiap tugas harus memiliki identitas unik.
- Field wajib harus divalidasi.
- Status awal adalah Belum Dikerjakan.
- Data tugas harus tersimpan secara persisten.
- Penghapusan harus menggunakan konfirmasi.
- Perubahan data harus memperbarui seluruh tampilan terkait.

## 5.2 Calendar
- Kalender harus menggunakan data tugas yang tersimpan.
- Tanggal dengan tugas harus memiliki indikator.
- Pengguna dapat memilih tanggal.
- Pengguna dapat berpindah bulan.
- Tampilan bulanan dan mingguan harus konsisten.

## 5.3 Task Status

Gunakan tiga status:
- Belum Dikerjakan.
- Sedang Dikerjakan.
- Selesai.

Terlambat merupakan kondisi turunan berdasarkan waktu tenggat dan status tugas, bukan status keempat yang disimpan secara permanen.

## 5.4 Reminder
- Jadwalkan pengingat H-3 dan H-1.
- Waktu pengiriman default pukul 09.00 waktu lokal pengguna.
- Jangan mengirim pengingat untuk tugas yang sudah selesai.
- Batalkan pengingat ketika tugas dihapus.
- Jadwalkan ulang ketika tenggat berubah.
- Cegah pengiriman notifikasi duplikat.
- Catat kegagalan pengiriman.

Jangan mengklaim notifikasi telah terkirim apabila layanan pengiriman belum mengonfirmasi keberhasilannya.

## 5.5 Data Persistence
- Jangan menggunakan local component state sebagai satu-satunya penyimpanan data tugas.
- Gunakan penyimpanan persisten.
- Pastikan data tetap tersedia setelah halaman dimuat ulang.
- Lindungi data berdasarkan hak akses pengguna.
- Jangan menyimpan kredensial atau secret secara langsung di source code.

# 6. Component Architecture

Gunakan pendekatan component-based architecture.

Kelompokkan komponen berdasarkan tanggung jawab.

Contoh struktur konseptual:

src/

├── components/

│   ├── layout/

│   ├── navigation/

│   ├── dashboard/

│   ├── calendar/

│   ├── tasks/

│   ├── forms/

│   └── feedback/

├── pages/

├── services/

├── hooks/

├── utils/

├── types/

├── styles/

└── tests/

Struktur aktual dapat menyesuaikan framework yang digunakan.

Ketentuan:
- Hindari satu file yang menampung seluruh aplikasi.
- Pisahkan business logic dari presentational components.
- Gunakan kembali komponen yang memiliki fungsi serupa.
- Gunakan nama file, fungsi, dan variabel yang deskriptif.
- Hindari duplikasi kode.
- Buat struktur yang mudah dipelihara dan dikembangkan.

# 7. Code Quality Rules

Setiap implementasi harus memenuhi prinsip berikut:
- Readability: Kode mudah dibaca.
- Maintainability: Kode mudah diperbaiki dan dikembangkan.
- Reusability: Komponen dapat digunakan kembali.
- Separation of Concerns: Setiap bagian memiliki tanggung jawab yang jelas.
- Error Handling: Kesalahan ditangani secara eksplisit.
- Type Safety: Gunakan sistem tipe jika didukung teknologi.
- Security: Validasi dan lindungi data pengguna.
- Testing: Fungsi utama memiliki pengujian.

Jangan:
- Membuat function yang tidak diperlukan.
- Menambahkan dependensi tanpa alasan.
- Menyembunyikan error dengan fallback yang menyesatkan.
- Menggunakan placeholder sebagai implementasi akhir.
- Menggunakan data dummy pada fitur produksi tanpa penanda yang jelas.

# 8. Responsive Design Rules

Pastikan aplikasi dapat digunakan pada:
- Mobile: kurang dari 640px.
- Tablet: 640–1023px.
- Desktop: 1024px atau lebih.
- Wide Desktop: 1440px atau lebih.

Perhatikan:
- Navigasi.
- Kalender.
- Form.
- Modal.
- Daftar tugas.
- Tombol aksi.
- Keterbacaan teks.

Hindari horizontal overflow dan elemen yang terpotong.

# 9. Testing Requirements

Gunakan ACCEPTANCE-CRITERIA.md sebagai dasar pengujian.

Minimal lakukan pengujian terhadap:

## Functional Testing
- Tambah tugas.
- Lihat tugas.
- Edit tugas.
- Hapus tugas.
- Ubah status.
- Filter tugas.
- Urutkan tugas.
- Navigasi kalender.

## Validation Testing
- Field wajib kosong.
- Tenggat masa lalu.
- Input hanya spasi.
- Input melebihi batas karakter.
- Form gagal disimpan.

## Notification Testing
- Pengingat H-3.
- Pengingat H-1.
- Pembatalan pengingat.
- Penjadwalan ulang.
- Pencegahan notifikasi duplikat.
- Kegagalan layanan notifikasi.

## Responsive Testing
- Mobile.
- Tablet.
- Desktop.

## Persistence Testing
- Memuat ulang halaman.
- Masuk kembali.
- Memastikan data tetap tersedia.

Laporkan hasil pengujian menggunakan status:
- Pass.
- Fail.
- Blocked.
- Not Tested.

Jangan mengubah status pengujian menjadi Pass tanpa bukti pengujian.

# 10. Visual Validation

Periksa hasil implementasi dengan membandingkannya terhadap:
- UX-SPEC.md.
- DESIGN-SYSTEM.md.
- INTERACTION-SPEC.md.

Periksa:
- Struktur halaman.
- Posisi elemen.
- Hierarki informasi.
- Warna.
- Tipografi.
- Spacing.
- Konsistensi komponen.
- Perilaku interaksi.
- Responsivitas.

Jika tersedia browser automation atau screenshot testing, gunakan untuk memvalidasi tampilan aktual.

Jangan menganggap desain sesuai hanya berdasarkan kode CSS atau deskripsi implementasi.

# 11. Scope Control

Fitur yang termasuk ruang lingkup:
- Dashboard tugas.
- Kalender tugas.
- Manajemen tugas.
- Pengelolaan status.
- Pengingat H-3 dan H-1.
- Filter dan pengurutan.
- Tampilan responsif.

Fitur di luar ruang lingkup tidak boleh ditambahkan secara otomatis.

Contoh fitur yang tidak boleh diasumsikan:
- Integrasi Google Calendar.
- Sinkronisasi LMS.
- Kolaborasi antarmahasiswa.
- Berbagi tugas.
- Kecerdasan buatan untuk menyusun tugas.

Jika terdapat ide pengembangan tambahan, catat sebagai usulan terpisah.

# 12. Decision and Assumption Management

Jika menemukan requirement yang belum didefinisikan:
- Identifikasi bagian yang belum jelas.
- Jelaskan dampaknya terhadap implementasi.
- Ajukan pertanyaan yang spesifik jika keputusan pengguna diperlukan.
- Jika keputusan teknis tidak memengaruhi kebutuhan produk, pilih solusi sederhana dan dokumentasikan asumsi.
- Jangan mengubah requirement inti secara sepihak.

Catat keputusan penting dalam dokumentasi proyek, misalnya DECISIONS.md.

# 13. Completion Report

Setiap tahap implementasi harus diakhiri dengan laporan yang mencakup:

## Implementation Summary
- Fitur yang berhasil dibuat.
- Komponen yang ditambahkan.
- Perubahan struktur proyek.

## Acceptance Criteria Status
- Kriteria yang lulus.
- Kriteria yang gagal.
- Kriteria yang belum diuji.

## Known Issues
- Bug yang ditemukan.
- Batasan implementasi.
- Dependensi yang belum tersedia.

## Next Steps
- Pekerjaan yang masih diperlukan.
- Prioritas perbaikan.

Jangan menyatakan seluruh aplikasi selesai jika masih terdapat kriteria Must Have yang belum terpenuhi.

# 14. Final Instruction

Prioritaskan kesesuaian implementasi terhadap seluruh dokumentasi proyek.

Urutan prioritas:
- Kebenaran fungsi.
- Kesesuaian kebutuhan pengguna.
- Kesesuaian UX dan interaksi.
- Konsistensi desain.
- Kualitas kode.
- Kinerja dan keamanan.
- Kemudahan pemeliharaan.

Prinsip utama:

Build what is specified, validate what is built, and report what is not yet complete.

Jangan hanya menghasilkan aplikasi yang terlihat benar. Hasilkan aplikasi yang benar-benar berfungsi sesuai kebutuhan pengguna.

End of AGENTS.md v1.0
