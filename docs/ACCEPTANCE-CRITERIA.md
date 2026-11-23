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
