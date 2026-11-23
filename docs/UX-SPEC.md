# USER EXPERIENCE SPECIFICATION (UX-SPEC)

## Fitur: Kalender Tugas Terintegrasi

Versi: 1.0Referensi: PRD.md v1.0Status: Draft

# 1. UX Overview

## 1.1 UX Objective

Membantu mahasiswa mengelola seluruh tugas akademik dalam satu tempat melalui pengalaman yang sederhana, terorganisasi, dan mudah dipahami.

Pengguna harus dapat:
- Mengetahui tugas yang harus dikerjakan.
- Melihat tenggat waktu seluruh tugas.
- Mengetahui tugas yang mendekati tenggat.
- Menambahkan tugas baru dengan mudah.
- Memantau progres penyelesaian tugas.
- Mengetahui pengingat tugas yang perlu segera diselesaikan.

## 1.2 UX Design Principles
- Visibility: Informasi tenggat waktu harus mudah ditemukan.
- Simplicity: Pengelolaan tugas tidak membutuhkan banyak langkah.
- Consistency: Navigasi dan komponen memiliki pola yang konsisten.
- Feedback: Setiap tindakan pengguna mendapatkan respons yang jelas.
- Error Prevention: Sistem membantu mencegah kesalahan input dan keterlambatan.
- Accessibility: Informasi tidak hanya dibedakan berdasarkan warna.

# 2. User Context

## 2.1 Primary Persona

Budi, 20 tahun, Mahasiswa Aktif

Karakteristik:
- Mengikuti beberapa mata kuliah.
- Memiliki tugas dengan tenggat waktu berbeda.
- Menggunakan smartphone dan laptop.
- Sering lupa jadwal pengumpulan tugas.

## 2.2 User Goals
| Goal | Expected Experience |
| --- | --- |
| Mengetahui tugas | Semua tugas dapat dilihat dalam satu tempat |
| Mengetahui tenggat | Tanggal pengumpulan mudah ditemukan |
| Mengatur prioritas | Tugas terdekat mudah diidentifikasi |
| Memantau progres | Status pengerjaan dapat diperbarui |
| Menghindari keterlambatan | Mendapatkan pengingat otomatis |

## 2.3 Main User Scenario

Budi membuka aplikasi pada pagi hari untuk memeriksa tugas yang harus diselesaikan minggu ini.

Budi melihat tiga tugas yang belum selesai, salah satunya memiliki tenggat waktu besok. Budi membuka detail tugas tersebut, mengubah status menjadi Sedang Dikerjakan, kemudian menyelesaikannya pada hari yang sama.

Setelah selesai, Budi mengubah status tugas menjadi Selesai. Sistem tidak lagi mengirimkan pengingat untuk tugas tersebut.

# 3. Information Architecture (IA)

## 3.1 Sitemap

Struktur navigasi aplikasi:

Task Management

│

├── Dashboard

│   ├── Ringkasan Tugas

│   ├── Tugas Mendatang

│   └── Tugas Terlambat

│

├── Kalender

│   ├── Tampilan Bulanan

│   ├── Tampilan Mingguan

│   └── Detail Tugas

│

├── Semua Tugas

│   ├── Semua

│   ├── Belum Dikerjakan

│   ├── Sedang Dikerjakan

│   ├── Selesai

│   └── Terlambat

│

├── Tambah Tugas

│

└── Detail Tugas

├── Informasi Tugas

├── Edit Tugas

├── Ubah Status

└── Hapus Tugas

## 3.2 Primary Navigation

Navigasi utama terdiri dari:
- Dashboard
- Kalender
- Semua Tugas
- Tambah Tugas

Detail tugas dapat diakses dari dashboard, kalender, maupun daftar tugas.

# 4. Page Specification

## PAGE-01: Dashboard

### Purpose

Memberikan gambaran umum seluruh tugas mahasiswa dan membantu mengidentifikasi pekerjaan yang membutuhkan perhatian.

### Information Components
- Sapaan pengguna.
- Ringkasan jumlah seluruh tugas.
- Jumlah tugas belum dikerjakan.
- Jumlah tugas sedang dikerjakan.
- Jumlah tugas selesai.
- Daftar tugas mendatang.
- Daftar tugas yang terlambat.
- Tombol tambah tugas.

### User Actions
- Membuka detail tugas.
- Menambahkan tugas.
- Membuka kalender.
- Melihat semua tugas.
- Memperbarui status tugas.

### Expected Outcome

Budi dapat mengetahui kondisi seluruh tugas tanpa harus membuka setiap mata kuliah.

## PAGE-02: Kalender Tugas

### Purpose

Menampilkan seluruh tenggat waktu tugas berdasarkan kalender.

### Information Components
- Nama bulan dan tahun.
- Navigasi bulan sebelumnya dan berikutnya.
- Pilihan tampilan bulanan dan mingguan.
- Penanda tanggal yang memiliki tugas.
- Informasi jumlah tugas per tanggal.
- Daftar tugas berdasarkan tanggal yang dipilih.

### User Actions
- Memilih tanggal.
- Berpindah bulan.
- Berpindah minggu.
- Membuka detail tugas.
- Menambahkan tugas pada tanggal tertentu.

### Expected Outcome

Budi dapat mengetahui distribusi tenggat waktu tugas dalam satu bulan atau minggu.

## PAGE-03: Semua Tugas

### Purpose

Menyediakan daftar seluruh tugas yang dapat dikelompokkan berdasarkan status.

### Information Components
- Nama tugas.
- Mata kuliah.
- Tenggat waktu.
- Status pengerjaan.
- Indikator keterlambatan.
- Filter status.
- Pengurutan berdasarkan tenggat waktu.

### User Actions
- Memilih filter.
- Mengurutkan tugas.
- Membuka detail tugas.
- Mengubah status tugas.

### Expected Outcome

Budi dapat menemukan tugas tertentu dengan cepat dan mengetahui prioritas pengerjaannya.

## PAGE-04: Tambah / Edit Tugas

### Purpose

Memungkinkan mahasiswa mencatat dan memperbarui informasi tugas.

### Form Fields
| Field | Type | Required |
| --- | --- | --- |
| Nama tugas | Text | Ya |
| Mata kuliah | Text / Selection | Ya |
| Deskripsi | Textarea | Tidak |
| Tanggal tenggat | Date picker | Ya |
| Waktu tenggat | Time picker | Ya |
| Status | Selection | Ya |

### User Actions
- Mengisi informasi tugas.
- Menyimpan tugas.
- Membatalkan input.
- Memperbarui informasi tugas.

### Expected Outcome

Tugas berhasil disimpan dan langsung muncul pada kalender serta daftar tugas.

## PAGE-05: Detail Tugas

### Purpose

Menampilkan informasi lengkap mengenai tugas yang dipilih.

### Information Components
- Nama tugas.
- Mata kuliah.
- Deskripsi.
- Tanggal dan waktu tenggat.
- Status pengerjaan.
- Informasi pengingat.
- Waktu pembuatan tugas.

### User Actions
- Mengubah status.
- Mengedit tugas.
- Menghapus tugas.
- Kembali ke halaman sebelumnya.

### Expected Outcome

Budi dapat memahami informasi tugas dan melakukan pengelolaan tanpa harus mencari kembali tugas tersebut.

# 5. User Flow

## 5.1 Flow: Menambahkan Tugas

Dashboard
|

v

Klik Tambah Tugas
|

v

Form Tambah Tugas
|

v

Isi Informasi Tugas
|

v

Validasi Input
|

+---- Tidak Valid
|        |
|        v
|    Tampilkan Error
|        |
|        v
|    Perbaiki Input
|        |
|        +---- Kembali Validasi
|

+---- Valid
|

v

Simpan Tugas
|

v

Jadwalkan Pengingat
|

v

Tampilkan Konfirmasi
|

v

Kembali ke Dashboard

## 5.2 Flow: Melihat Tenggat Waktu

Dashboard
|

v

Buka Kalender
|

v

Pilih Bulan / Minggu
|

v

Pilih Tanggal
|

v

Tampilkan Daftar Tugas
|

v

Pilih Tugas
|

v

Detail Tugas

## 5.3 Flow: Memperbarui Status

Daftar Tugas
|

v

Pilih Tugas
|

v

Detail Tugas
|

v

Ubah Status
|

+---- Sedang Dikerjakan
|

+---- Selesai
|

v

Batalkan Pengingat
|

v

Perbarui Tampilan



# 6. User Interaction Requirements

## 6.1 Task Creation
- Tombol tambah tugas harus mudah ditemukan.
- Form menampilkan label setiap field.
- Field wajib diidentifikasi dengan jelas.
- Pengguna mendapatkan umpan balik setelah penyimpanan.
- Jika penyimpanan gagal, data input tidak boleh hilang selama sesi masih berlangsung.

## 6.2 Calendar Interaction
- Tanggal yang memiliki tugas harus memiliki indikator.
- Tanggal yang dipilih harus terlihat berbeda.
- Tugas ditampilkan sesuai tanggal tenggat.
- Pengguna dapat berpindah bulan tanpa kehilangan konteks navigasi.

## 6.3 Task Status Interaction
- Pengguna dapat memperbarui status dengan mudah.
- Perubahan status langsung tercermin pada daftar dan dashboard.
- Tugas selesai tidak lagi mendapatkan pengingat.

## 6.4 Notification Interaction
- Notifikasi menampilkan nama tugas.
- Notifikasi menampilkan mata kuliah.
- Notifikasi menampilkan tanggal tenggat.
- Notifikasi dapat mengarahkan pengguna ke detail tugas.

# 7. Responsive Experience

## Desktop
- Navigasi utama menggunakan sidebar.
- Kalender memiliki ruang untuk menampilkan informasi tugas.
- Daftar tugas dapat ditampilkan dalam bentuk tabel atau daftar.

## Tablet
- Navigasi dapat menggunakan sidebar yang dapat dibuka dan ditutup.
- Kalender menyesuaikan lebar layar.
- Informasi tugas tetap terbaca.

## Mobile
- Navigasi menggunakan menu yang sesuai untuk layar kecil.
- Kalender menggunakan tampilan yang disederhanakan.
- Daftar tugas ditampilkan dalam bentuk kartu.
- Form menggunakan tata letak satu kolom.
- Tombol aksi utama mudah dijangkau.

# 8. Empty States

Sistem harus menyediakan pengalaman yang informatif ketika belum terdapat data.

### Empty Dashboard

Pesan: "Belum ada tugas yang tercatat."

Aksi: "Tambah Tugas Pertama"

### Empty Calendar

Pesan: "Tidak ada tugas pada tanggal ini."

### Empty Task List

Pesan: "Belum ada tugas pada kategori ini."

# 9. UX Error Prevention
- Sistem harus memberikan informasi apabila tenggat waktu tidak valid.
- Penghapusan tugas harus meminta konfirmasi.
- Perubahan status harus mendapatkan umpan balik.
- Kesalahan input harus ditampilkan dekat dengan field terkait.
- Pengguna harus mendapatkan informasi apabila penyimpanan gagal.
- Kalender harus tetap menampilkan tugas yang melewati tenggat waktu.

# 10. UX Deliverables

Dokumen UX ini menjadi acuan untuk menghasilkan:
- Sitemap.
- User Flow.
- Page Specification.
- Wireframe.
- Interactive Prototype.
- UI Design.
- Responsive Design.
- Interaction Specification.

# 11. UX Design Constraints
- Seluruh halaman harus konsisten dengan tujuan utama pengelolaan tugas.
- Informasi tenggat waktu harus menjadi informasi yang mudah ditemukan.
- Status tugas harus dapat dibedakan dengan jelas.
- Tidak boleh ada navigasi yang tidak memiliki fungsi.
- Tidak boleh ada fitur di luar ruang lingkup PRD tanpa persetujuan.
- Seluruh alur utama harus dapat diselesaikan tanpa kebingungan pengguna.

End of UX-SPEC v1.0
