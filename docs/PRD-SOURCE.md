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
