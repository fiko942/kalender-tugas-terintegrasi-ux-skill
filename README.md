# Kalender Tugas Terintegrasi — PRD Only + UX Skill

> Aplikasi mandiri untuk mahasiswa mengelola tugas akademik, tenggat, progres, dan pengingat. Repositori ini adalah paket progres PRD Only + UX Skill; repositori PRD-only sebelumnya tetap terpisah.

**Status:** implementasi awal · **Aplikasi:** [`apps/web`](apps/web) · **Perubahan:** [`CHANGELOG.md`](CHANGELOG.md)

## Artefak spesifikasi UX

- [UX Specification](docs/UX-SPEC.md)
- [Design System](docs/DESIGN-SYSTEM.md)
- [Interaction Specification](docs/INTERACTION-SPEC.md)
- [Acceptance Criteria](docs/ACCEPTANCE-CRITERIA.md)
- [Reusable UX Skill](skills/ux-skill/SKILL.md)
- [Instruksi coding agent](AGENTS.md)
- [Sumber PRD hasil ekstraksi](docs/PRD-SOURCE.md)
- [Catatan konteks overview deck dan konflik](docs/SOURCE-DECISIONS.md)

## Menjalankan aplikasi

Lihat [`apps/web/README.md`](apps/web/README.md) untuk setup, migrasi, dan konfigurasi deployment.

---

# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Fitur: Kalender Tugas Terintegrasi

Versi: 1.0Status: DraftJenis Produk: Fitur aplikasi manajemen pembelajaran mahasiswa

## 1. Product Overview

### 1.1 Latar Belakang

Mahasiswa sering menghadapi kesulitan dalam mengelola berbagai tugas akademik yang berasal dari mata kuliah berbeda. Informasi tenggat waktu tersebar di berbagai sumber, seperti LMS, grup komunikasi kelas, dan pengumuman dosen.

Kondisi tersebut menyebabkan mahasiswa berpotensi lupa terhadap tenggat waktu, kesulitan menentukan prioritas pengerjaan, dan mengalami penumpukan tugas menjelang akhir minggu.

Untuk mengatasi permasalahan tersebut, dikembangkan fitur Kalender Tugas Terintegrasi yang memungkinkan mahasiswa mencatat, melihat, dan memantau seluruh tenggat waktu tugas dalam satu tempat.

Fitur ini dilengkapi dengan notifikasi pengingat otomatis tiga hari dan satu hari sebelum tenggat waktu.

### 1.2 Product Vision

Menyediakan satu pusat pengelolaan tenggat waktu akademik yang membantu mahasiswa mengorganisasi tugas, mengatur waktu pengerjaan, dan menyelesaikan tugas tepat waktu.

### 1.3 Target Pengguna

Mahasiswa aktif yang mengikuti beberapa mata kuliah dan memiliki berbagai tugas dengan tenggat waktu berbeda.

## 2. User Problem

Berdasarkan hasil wawancara dan pemetaan empati, ditemukan permasalahan utama:

- Mahasiswa kesulitan mengingat seluruh tenggat waktu tugas.

- Informasi tugas tersebar di berbagai platform.

- Mahasiswa tidak memiliki tampilan terpusat untuk memantau jadwal pengumpulan tugas.

- Tugas sering menumpuk menjelang akhir minggu.

- Mahasiswa membutuhkan pengingat sebelum tenggat waktu agar dapat mempersiapkan pengerjaan tugas.

### Problem Statement

Mahasiswa membutuhkan sistem pengelolaan tugas terpusat yang dapat menampilkan seluruh tenggat waktu dan memberikan pengingat secara otomatis agar mereka dapat mengatur waktu pengerjaan dan mengumpulkan tugas tepat waktu.

## 3. User Persona

Nama: BudiUsia: 20 tahunPekerjaan: Mahasiswa aktif

### Karakteristik

- Mengikuti beberapa mata kuliah setiap semester.

- Menerima tugas dari beberapa dosen.

- Menggunakan smartphone dan laptop untuk aktivitas akademik.

- Memiliki jadwal perkuliahan dan aktivitas organisasi.

### Goals

- Mengetahui seluruh tenggat waktu tugas.

- Menghindari keterlambatan pengumpulan tugas.

- Mengatur prioritas pengerjaan tugas.

- Mengurangi penumpukan pekerjaan menjelang akhir minggu.

### Pain Points

- Sering lupa tenggat waktu.

- Kesulitan memantau banyak tugas.

- Tidak memiliki pengingat yang terorganisasi.

## 4. Product Goals

Produk memiliki tujuan sebagai berikut:

- Memusatkan informasi tenggat waktu seluruh tugas mahasiswa.

- Memudahkan mahasiswa memantau tugas berdasarkan tanggal pengumpulan.

- Membantu mahasiswa mengidentifikasi tugas yang mendekati tenggat waktu.

- Memberikan pengingat otomatis sebelum tenggat waktu.

- Memudahkan mahasiswa memantau progres penyelesaian tugas.

### Success Metrics

| Indikator | Target Awal |

| --- | --- |

| Tugas yang tercatat memiliki tenggat waktu | 100% |

| Pengingat H-3 dan H-1 berhasil dijadwalkan | 100% |

| Tugas yang selesai sebelum tenggat waktu | Meningkat dibanding baseline |

| Mahasiswa yang menggunakan kalender setiap minggu | ≥ 70% pengguna aktif |

Catatan: Target merupakan hipotesis awal dan perlu divalidasi melalui pengujian produk.

## 5. Functional Requirements

### FR-01: Manajemen Tugas

Sistem harus memungkinkan mahasiswa menambahkan tugas baru.

Data tugas terdiri dari:

- Nama tugas.

- Mata kuliah.

- Deskripsi tugas.

- Tanggal dan waktu tenggat.

- Status pengerjaan.

- Tanggal pembuatan.

Mahasiswa dapat:

- Menambahkan tugas.

- Melihat detail tugas.

- Mengubah informasi tugas.

- Menghapus tugas.

### FR-02: Kalender Tugas Terintegrasi

Sistem harus menyediakan kalender yang menampilkan seluruh tugas mahasiswa berdasarkan tenggat waktu.

Ketentuan:

- Menampilkan kalender bulanan.

- Menampilkan kalender mingguan.

- Menampilkan tugas pada tanggal tenggat masing-masing.

- Menampilkan jumlah tugas pada setiap tanggal.

- Memungkinkan pengguna memilih tanggal untuk melihat daftar tugas.

- Menampilkan daftar tugas mendatang.

### FR-03: Pengingat Otomatis

Sistem harus menyediakan notifikasi pengingat otomatis berdasarkan tenggat waktu tugas.

Ketentuan:

- Pengingat pertama dikirim tiga hari sebelum tenggat waktu (H-3).

- Pengingat kedua dikirim satu hari sebelum tenggat waktu (H-1).

- Pengingat hanya dikirim untuk tugas yang belum selesai.

- Pengingat tidak dikirim setelah tenggat waktu berlalu.

- Pengingat harus memuat nama tugas, mata kuliah, dan tanggal tenggat.

- Sistem mencatat status pengiriman notifikasi.

### FR-04: Status Pengerjaan Tugas

Setiap tugas memiliki status:

- Belum Dikerjakan.

- Sedang Dikerjakan.

- Selesai.

Mahasiswa dapat mengubah status tugas secara manual.

### FR-05: Daftar Tugas

Sistem harus menyediakan daftar tugas yang dapat ditampilkan berdasarkan:

- Semua tugas.

- Belum dikerjakan.

- Sedang dikerjakan.

- Selesai.

- Mendekati tenggat waktu.

- Sudah melewati tenggat waktu.

Sistem juga menyediakan pengurutan berdasarkan tenggat waktu terdekat.

## 6. Non-Functional Requirements

### NFR-01: Performance

- Halaman kalender harus dapat dimuat dengan cepat.

- Perubahan status tugas harus diperbarui tanpa perlu memuat ulang seluruh aplikasi jika memungkinkan.

### NFR-02: Usability

- Fitur harus mudah digunakan oleh mahasiswa.

- Informasi tenggat waktu harus mudah ditemukan.

- Pengguna dapat menambahkan tugas dengan proses yang sederhana.

### NFR-03: Responsive

- Sistem dapat digunakan melalui desktop, tablet, dan smartphone.

- Tampilan kalender harus menyesuaikan ukuran layar.

### NFR-04: Reliability

- Data tugas harus tersimpan secara persisten.

- Sistem pengingat harus menjalankan penjadwalan secara konsisten.

- Kegagalan pengiriman notifikasi harus dapat dicatat.

### NFR-05: Security

- Pengguna hanya dapat mengakses dan mengelola tugas miliknya sendiri.

- Data tugas harus dilindungi melalui mekanisme autentikasi dan otorisasi.

## 7. Business Rules

- Setiap tugas wajib memiliki nama tugas, mata kuliah, dan tenggat waktu.

- Tenggat waktu tidak boleh lebih awal dari tanggal dan waktu saat tugas dibuat.

- Setiap tugas memiliki satu status pengerjaan.

- Pengingat H-3 dan H-1 dijadwalkan berdasarkan tenggat waktu.

- Jika tugas sudah berstatus Selesai, pengingat berikutnya dibatalkan.

- Jika tenggat waktu diubah, jadwal pengingat harus diperbarui.

- Jika tugas dibuat kurang dari tiga hari sebelum tenggat, hanya pengingat yang masih relevan yang dijadwalkan.

- Tugas yang melewati tenggat waktu tetap ditampilkan dalam kalender dan daftar tugas.

## 8. User Stories

US-01: Menambahkan Tugas

Sebagai mahasiswa, saya ingin menambahkan tugas beserta tenggat waktunya agar semua kewajiban akademik saya tercatat.

US-02: Melihat Kalender

Sebagai mahasiswa, saya ingin melihat seluruh tenggat waktu dalam kalender agar dapat mengetahui jadwal pengumpulan tugas.

US-03: Menerima Pengingat

Sebagai mahasiswa, saya ingin menerima pengingat tiga hari dan satu hari sebelum tenggat agar tidak lupa mengerjakan tugas.

US-04: Memperbarui Status

Sebagai mahasiswa, saya ingin mengubah status pengerjaan tugas agar dapat memantau progres pekerjaan.

US-05: Mengubah Tenggat Waktu

Sebagai mahasiswa, saya ingin memperbarui tenggat waktu tugas apabila terdapat perubahan jadwal dari dosen.

US-06: Melihat Tugas Terdekat

Sebagai mahasiswa, saya ingin melihat daftar tugas dengan tenggat waktu terdekat agar dapat menentukan prioritas pengerjaan.

## 9. Scope

### In Scope

- Menambahkan, mengubah, melihat, dan menghapus tugas.

- Kalender tugas bulanan dan mingguan.

- Daftar tugas berdasarkan status.

- Pengingat otomatis H-3 dan H-1.

- Pengelolaan status tugas.

- Tampilan responsif.

- Pengaturan penjadwalan ulang pengingat ketika tenggat berubah.

### Out of Scope

- Integrasi otomatis dengan Google Calendar.

- Sinkronisasi tugas dari LMS eksternal.

- Pengumpulan file tugas.

- Kolaborasi pengerjaan tugas antarmahasiswa.

- Pembagian tugas kelompok.

- Rekomendasi prioritas berbasis AI.

## 10. Assumptions & Dependencies

### Assumptions

- Mahasiswa sudah memiliki akun dan telah login.

- Mahasiswa memasukkan tugas secara manual.

- Setiap tugas memiliki satu tanggal dan waktu tenggat.

- Mahasiswa menggunakan zona waktu lokal yang ditetapkan pada akun.

### Dependencies

- Sistem autentikasi pengguna.

- Database untuk penyimpanan tugas.

- Scheduler untuk menjalankan pengingat otomatis.

- Layanan notifikasi untuk menyampaikan pengingat.

- Izin notifikasi dari perangkat atau browser jika menggunakan Web Push.

## 11. Expected Deliverables

Implementasi fitur harus menghasilkan:

- Halaman dashboard tugas.

- Halaman kalender tugas.

- Form tambah dan edit tugas.

- Halaman atau panel detail tugas.

- Daftar tugas berdasarkan status.

- Sistem pengingat otomatis H-3 dan H-1.

- Mekanisme perubahan status tugas.

- Sistem penyimpanan data tugas.

## 12. Product Acceptance Criteria

Fitur dinyatakan memenuhi kebutuhan produk apabila:

- Mahasiswa dapat menambahkan tugas dengan informasi yang diwajibkan.

- Tugas yang dibuat muncul pada kalender sesuai tenggat waktu.

- Mahasiswa dapat melihat seluruh tugas dalam kalender dan daftar tugas.

- Sistem dapat menjadwalkan pengingat H-3 dan H-1.

- Pengingat tidak dikirim untuk tugas yang sudah selesai.

- Perubahan tenggat waktu memperbarui jadwal pengingat.

- Mahasiswa dapat memperbarui status pengerjaan.

- Tugas tetap tersimpan setelah pengguna keluar dan masuk kembali.

- Fitur dapat digunakan melalui desktop dan smartphone.

End of PRD v1.0


---

# Detailed Acceptance Criteria (AC-001–AC-043)

Kriteria penerimaan berikut melengkapi PRD sumber. Hasil uji tiap AC harus dicatat sebagai Pass, Fail, Blocked, atau Not Tested dengan bukti.

# ACCEPTANCE CRITERIA

## Project: Kalender Tugas Terintegrasi

Version: 1.0Status: Draft

References:

- PRD.md v1.0

- UX-SPEC.md v1.0

- DESIGN-SYSTEM.md v1.0

- INTERACTION-SPEC.md v1.0

# 1. Purpose

Dokumen ini mendefinisikan kriteria penerimaan untuk fitur Kalender Tugas Terintegrasi.

Tujuannya adalah memastikan bahwa aplikasi:

- Memenuhi kebutuhan pengguna yang telah didefinisikan dalam PRD.

- Mengimplementasikan alur dan struktur UX sesuai UX-SPEC.

- Menggunakan komponen visual sesuai DESIGN-SYSTEM.

- Memiliki perilaku interaksi sesuai INTERACTION-SPEC.

- Berfungsi secara konsisten dan dapat diuji.

# 2. Acceptance Criteria Convention

Setiap kriteria memiliki:

- ID: Identitas kriteria.

- Requirement: Kondisi yang harus dipenuhi.

- Expected Result: Hasil yang diharapkan.

- Priority: Tingkat kepentingan.

- Verification: Cara memverifikasi.

## Priority

| Priority | Description |

| --- | --- |

| Must Have | Wajib terpenuhi agar fitur dapat diterima |

| Should Have | Penting, tetapi tidak menghalangi fungsi utama |

| Could Have | Peningkatan kualitas jika waktu memungkinkan |

## Verification Method

- Manual Test: Pengujian langsung oleh pengguna atau penguji.

- Automated Test: Pengujian menggunakan skrip.

- Visual Inspection: Pemeriksaan tampilan dan konsistensi desain.

- Integration Test: Pemeriksaan integrasi antarkomponen atau layanan.

# 3. Functional Acceptance Criteria

## 3.1 Task Management

### AC-001 — Create Task

Priority: Must HaveVerification: Manual Test, Automated Test

Given pengguna berada pada halaman Tambah Tugas,

When pengguna mengisi nama tugas, mata kuliah, tanggal tenggat, dan waktu tenggat dengan data valid,

Then sistem harus:

- Menyimpan tugas.

- Memberikan identitas unik pada tugas.

- Menggunakan status awal Belum Dikerjakan.

- Menampilkan konfirmasi berhasil.

- Memperbarui daftar tugas dan kalender.

### AC-002 — Required Field Validation

Priority: Must HaveVerification: Manual Test, Automated Test

Given pengguna berada pada form Tambah Tugas,

When pengguna mengosongkan salah satu field wajib,

Then sistem harus:

- Menolak penyimpanan.

- Menampilkan pesan kesalahan pada field terkait.

- Mempertahankan data lain yang telah diisi.

### AC-003 — Past Deadline Validation

Priority: Must HaveVerification: Automated Test

Given pengguna membuat tugas baru,

When pengguna memasukkan tenggat yang sudah berlalu,

Then sistem harus menolak penyimpanan dan menampilkan pesan bahwa tenggat tidak valid.

### AC-004 — Edit Task

Priority: Must HaveVerification: Manual Test, Automated Test

Given tugas telah tersimpan,

When pengguna mengubah informasi tugas dan menyimpan perubahan,

Then sistem harus memperbarui data dan menampilkan informasi terbaru pada seluruh halaman terkait.

### AC-005 — Delete Task

Priority: Must HaveVerification: Manual Test, Automated Test

Given pengguna memilih tindakan hapus,

When pengguna mengonfirmasi penghapusan,

Then sistem harus:

- Menghapus tugas.

- Membatalkan pengingat yang masih tertunda.

- Menghilangkan tugas dari dashboard, kalender, dan daftar tugas.

- Menampilkan konfirmasi berhasil.

### AC-006 — Cancel Delete

Priority: Must HaveVerification: Manual Test

Given dialog konfirmasi penghapusan sedang terbuka,

When pengguna memilih Batal,

Then dialog harus ditutup dan tugas tetap tersimpan.

# 4. Calendar Acceptance Criteria

### AC-007 — Monthly Calendar

Priority: Must HaveVerification: Manual Test, Visual Inspection

Given pengguna membuka halaman Kalender,

When tampilan kalender bulanan ditampilkan,

Then sistem harus:

- Menampilkan hari dan tanggal sesuai bulan yang dipilih.

- Menampilkan indikator pada tanggal yang memiliki tugas.

- Menampilkan jumlah tugas pada tanggal terkait.

- Memberikan indikator visual pada tanggal hari ini.

### AC-008 — Calendar Navigation

Priority: Must HaveVerification: Manual Test

Given kalender sedang menampilkan bulan tertentu,

When pengguna memilih bulan sebelumnya atau berikutnya,

Then sistem harus menampilkan bulan yang sesuai tanpa kehilangan data tugas.

### AC-009 — Date Selection

Priority: Must HaveVerification: Manual Test

Given pengguna membuka kalender,

When pengguna memilih tanggal,

Then sistem harus menampilkan daftar tugas yang memiliki tenggat pada tanggal tersebut.

### AC-010 — Weekly Calendar

Priority: Should HaveVerification: Manual Test, Visual Inspection

Given pengguna berada pada halaman Kalender,

When pengguna memilih tampilan mingguan,

Then sistem harus menampilkan tugas berdasarkan hari dalam minggu yang dipilih.

# 5. Task Status Acceptance Criteria

### AC-011 — Update Task Status

Priority: Must HaveVerification: Manual Test, Automated Test

Given tugas memiliki status tertentu,

When pengguna mengubah status tugas,

Then sistem harus menyimpan status baru dan memperbarui tampilannya pada seluruh halaman.

### AC-012 — Completed Task

Priority: Must HaveVerification: Integration Test

Given tugas memiliki pengingat yang belum dikirim,

When pengguna mengubah status menjadi Selesai,

Then sistem harus membatalkan seluruh pengingat yang masih tertunda.

### AC-013 — Reactivate Completed Task

Priority: Should HaveVerification: Integration Test

Given tugas telah berstatus Selesai,

When pengguna mengubah status menjadi Belum Dikerjakan atau Sedang Dikerjakan,

Then sistem harus menghitung ulang pengingat yang masih relevan.

# 6. Notification Acceptance Criteria

### AC-014 — H-3 Reminder

Priority: Must HaveVerification: Integration Test

Given tugas memiliki tenggat yang memungkinkan pengingat H-3,

When waktu pengingat H-3 tercapai,

Then sistem harus mengirimkan pengingat untuk tugas yang belum selesai.

### AC-015 — H-1 Reminder

Priority: Must HaveVerification: Integration Test

Given tugas memiliki tenggat yang memungkinkan pengingat H-1,

When waktu pengingat H-1 tercapai,

Then sistem harus mengirimkan pengingat untuk tugas yang belum selesai.

### AC-016 — Reminder Cancellation

Priority: Must HaveVerification: Integration Test

Given tugas memiliki pengingat yang belum dikirim,

When tugas dihapus atau statusnya berubah menjadi Selesai,

Then pengingat terkait tidak boleh dikirim.

### AC-017 — Reminder Rescheduling

Priority: Must HaveVerification: Integration Test

Given tugas memiliki jadwal pengingat,

When pengguna mengubah tanggal atau waktu tenggat,

Then sistem harus membatalkan jadwal lama dan membuat jadwal baru yang masih relevan.

### AC-018 — No Duplicate Reminder

Priority: Must HaveVerification: Automated Test, Integration Test

Given satu tugas memiliki jadwal pengingat,

When sistem menjalankan proses pengiriman,

Then satu jadwal pengingat tidak boleh menghasilkan notifikasi duplikat.

### AC-019 — Notification Failure

Priority: Should HaveVerification: Integration Test

Given layanan notifikasi mengalami kegagalan,

When sistem mencoba mengirimkan pengingat,

Then sistem harus mencatat kegagalan dan tidak mengubah atau menghilangkan data tugas.

# 7. Dashboard Acceptance Criteria

### AC-020 — Dashboard Summary

Priority: Must HaveVerification: Manual Test, Automated Test

Given pengguna membuka Dashboard,

When data tugas berhasil dimuat,

Then sistem harus menampilkan:

- Total tugas.

- Tugas belum dikerjakan.

- Tugas sedang dikerjakan.

- Tugas selesai.

- Tugas mendatang.

- Tugas terlambat.

### AC-021 — Upcoming Tasks

Priority: Must HaveVerification: Manual Test

Given pengguna memiliki beberapa tugas,

When Dashboard ditampilkan,

Then tugas mendatang harus diurutkan berdasarkan tenggat terdekat.

### AC-022 — Summary Navigation

Priority: Should HaveVerification: Manual Test

Given Dashboard menampilkan kartu ringkasan,

When pengguna mengeklik salah satu kartu,

Then sistem harus membuka daftar tugas dengan filter yang sesuai.

# 8. Filtering and Sorting Acceptance Criteria

### AC-023 — Filter by Status

Priority: Must HaveVerification: Manual Test, Automated Test

Given pengguna membuka halaman Semua Tugas,

When pengguna memilih filter status,

Then sistem harus menampilkan hanya tugas yang memenuhi kriteria filter.

### AC-024 — Overdue Filter

Priority: Must HaveVerification: Automated Test

Given terdapat tugas dengan tenggat yang sudah berlalu dan status belum selesai,

When pengguna memilih filter Terlambat,

Then sistem harus menampilkan tugas tersebut.

Catatan: Terlambat merupakan kondisi yang dihitung dari tenggat dan status, bukan status keempat yang disimpan secara permanen.

### AC-025 — Sorting

Priority: Should HaveVerification: Manual Test, Automated Test

Given daftar tugas ditampilkan,

When pengguna mengubah pengurutan,

Then daftar harus mengikuti kriteria pengurutan yang dipilih tanpa menghilangkan filter aktif.

# 9. User Experience Acceptance Criteria

### AC-026 — Consistent Navigation

Priority: Must HaveVerification: Manual Test, Visual Inspection

Given pengguna berada pada halaman mana pun,

When pengguna menggunakan navigasi utama,

Then sistem harus menampilkan halaman yang sesuai dan memberikan indikator menu aktif.

### AC-027 — Feedback

Priority: Must HaveVerification: Manual Test

Given pengguna melakukan tindakan penting,

When tindakan berhasil atau gagal,

Then sistem harus menampilkan umpan balik yang dapat dipahami.

### AC-028 — Empty State

Priority: Should HaveVerification: Manual Test, Visual Inspection

Given pengguna belum memiliki tugas atau hasil filter kosong,

When halaman ditampilkan,

Then sistem harus menampilkan pesan empty state dan tindakan yang relevan.

### AC-029 — Responsive Layout

Priority: Must HaveVerification: Visual Inspection, Manual Test

Given aplikasi diakses menggunakan desktop, tablet, atau mobile,

When halaman ditampilkan,

Then:

- Layout harus menyesuaikan ukuran layar.

- Tidak boleh terjadi horizontal overflow yang mengganggu.

- Tombol dan field harus tetap dapat digunakan.

- Informasi utama tetap mudah dibaca.

### AC-030 — Form Error Recovery

Priority: Must HaveVerification: Manual Test

Given pengguna memasukkan data yang tidak valid,

When sistem menampilkan pesan kesalahan,

Then pengguna harus dapat memperbaiki field tanpa kehilangan data lain yang telah diisi.

# 10. Design System Acceptance Criteria

### AC-031 — Color Consistency

Priority: Must HaveVerification: Visual Inspection

Semua komponen harus menggunakan warna yang konsisten dengan DESIGN-SYSTEM.md.

### AC-032 — Typography Consistency

Priority: Should HaveVerification: Visual Inspection

Seluruh halaman harus menggunakan tipografi dan hierarki teks yang telah ditentukan.

### AC-033 — Component Consistency

Priority: Must HaveVerification: Visual Inspection

Button, input, card, badge, modal, dan komponen lain harus memiliki gaya yang konsisten.

### AC-034 — Status Indicator

Priority: Must HaveVerification: Visual Inspection

Setiap status tugas harus memiliki indikator visual yang konsisten dan dapat dibedakan.

# 11. Non-Functional Acceptance Criteria

### AC-035 — Performance

Priority: Should HaveVerification: Performance Test

- Halaman utama ditargetkan dapat ditampilkan dalam waktu maksimal 3 detik pada kondisi pengujian yang wajar.

- Interaksi utama harus memberikan respons tanpa jeda yang mengganggu.

- Proses penyimpanan harus memberikan indikator loading.

### AC-036 — Data Persistence

Priority: Must HaveVerification: Integration Test

Given pengguna telah menyimpan tugas,

When pengguna memuat ulang aplikasi atau masuk kembali,

Then data tugas harus tetap tersedia.

### AC-037 — Data Isolation

Priority: Must HaveVerification: Security Test

Given aplikasi digunakan oleh lebih dari satu pengguna,

When pengguna mengakses data tugas,

Then pengguna hanya boleh mengakses data yang menjadi haknya.

### AC-038 — Accessibility

Priority: Should HaveVerification: Accessibility Test, Manual Test

- Seluruh fungsi utama dapat dioperasikan menggunakan keyboard.

- Field memiliki label yang jelas.

- Fokus keyboard terlihat.

- Pesan kesalahan dapat dikenali.

- Informasi status tidak hanya dibedakan berdasarkan warna.

# 12. Edge Case Acceptance Criteria

### AC-039 — Task Created Less Than Three Days Before Deadline

Priority: Must HaveVerification: Automated Test

Given pengguna membuat tugas dengan tenggat kurang dari tiga hari,

When sistem menjadwalkan pengingat,

Then sistem hanya membuat pengingat yang waktunya masih relevan dan belum berlalu.

### AC-040 — Task Becomes Overdue

Priority: Must HaveVerification: Automated Test

Given tugas belum selesai,

When waktu tenggat telah berlalu,

Then sistem harus menampilkan tugas sebagai terlambat tanpa mengubah status tersimpan secara otomatis.

### AC-041 — Multiple Tasks on the Same Date

Priority: Must HaveVerification: Manual Test

Given terdapat beberapa tugas dengan tanggal tenggat yang sama,

When tanggal tersebut dipilih pada kalender,

Then sistem harus menampilkan seluruh tugas yang terkait.

### AC-042 — Network Failure During Save

Priority: Must HaveVerification: Integration Test

Given pengguna sedang menyimpan tugas,

When koneksi mengalami gangguan,

Then sistem harus menampilkan pesan kegagalan, mempertahankan input, dan mencegah pembuatan data duplikat ketika pengguna mencoba kembali.

### AC-043 — Delete Task with Pending Reminder

Priority: Must HaveVerification: Integration Test

Given tugas memiliki pengingat yang masih tertunda,

When pengguna menghapus tugas,

Then pengingat tidak boleh dikirim setelah penghapusan berhasil.

# 13. Release Acceptance

Aplikasi dapat dinyatakan memenuhi versi 1.0 apabila:

- Seluruh kriteria Must Have telah lulus pengujian.

- Tidak terdapat bug kritis yang menghalangi fungsi utama.

- Data tugas tersimpan secara persisten.

- Operasi utama CRUD berfungsi.

- Kalender menampilkan tenggat dengan benar.

- Pengingat H-3 dan H-1 berfungsi sesuai aturan.

- Perubahan status dan tenggat memperbarui pengingat.

- Tampilan responsif dan konsisten dengan design system.

- Tidak terdapat masalah keamanan kritis.

- Pengujian regresi terhadap fitur utama telah lulus.

Kriteria Should Have dan Could Have yang belum terpenuhi harus dicatat sebagai pekerjaan lanjutan dan tidak boleh diklaim telah selesai.

# 14. Test Execution Report

Setiap kriteria harus memiliki hasil pengujian.

| Field | Description |

| --- | --- |

| Criteria ID | ID acceptance criteria |

| Test Status | Pass, Fail, Blocked, Not Tested |

| Test Evidence | Screenshot, log, atau hasil pengujian |

| Bug Reference | Identitas bug jika ditemukan |

| Notes | Catatan penguji |

## Test Status

- Pass: Kriteria terpenuhi.

- Fail: Kriteria belum terpenuhi.

- Blocked: Pengujian tidak dapat dilakukan karena dependensi.

- Not Tested: Belum dilakukan pengujian.

End of ACCEPTANCE-CRITERIA v1.0
