# INTERACTION SPECIFICATION

## Project: Kalender Tugas Terintegrasi

Version: 1.0Status: DraftReferences:
- PRD.md v1.0
- UX-SPEC.md v1.0
- DESIGN-SYSTEM.md v1.0

# 1. Interaction Overview

## 1.1 Objective

Mendefinisikan seluruh perilaku interaksi pengguna pada fitur Kalender Tugas Terintegrasi agar implementasi aplikasi memiliki perilaku yang konsisten, dapat diprediksi, dan mudah digunakan.

## 1.2 Interaction Principles
- Immediate Feedback: Setiap tindakan pengguna mendapatkan respons.
- Predictability: Perilaku komponen harus konsisten.
- Error Prevention: Sistem mencegah kesalahan sebelum terjadi.
- User Control: Pengguna dapat membatalkan tindakan tertentu.
- State Consistency: Perubahan data harus tercermin pada seluruh halaman terkait.
- Persistence: Perubahan data penting harus tersimpan secara persisten.

# 2. Global Interaction Behavior

## 2.1 Navigation

Ketika pengguna memilih menu navigasi:
| Action | Expected Behavior |
| --- | --- |
| Klik Dashboard | Membuka halaman Dashboard |
| Klik Kalender | Membuka halaman Kalender |
| Klik Semua Tugas | Membuka halaman Semua Tugas |
| Klik Tambah Tugas | Membuka form Tambah Tugas |
| Klik kembali | Kembali ke halaman sebelumnya sesuai konteks navigasi |

Aturan:
- Menu aktif harus memiliki indikator visual.
- Navigasi tidak boleh menghasilkan halaman kosong.
- Perpindahan halaman harus mempertahankan data yang sudah tersimpan.

## 2.2 Global Loading

Ketika sistem mengambil data:
- Tampilkan loading indicator.
- Hindari menampilkan data yang belum terkonfirmasi sebagai data terbaru.
- Gunakan skeleton loading jika sesuai.
- Jika terjadi kegagalan, tampilkan pesan kesalahan dan opsi mencoba kembali.

## 2.3 Global Error Handling

Semua kegagalan harus memberikan pesan yang dapat dipahami pengguna.

Contoh:
- Gagal memuat data: "Data tugas tidak dapat dimuat. Silakan coba kembali."
- Gagal menyimpan: "Tugas gagal disimpan. Periksa koneksi dan coba kembali."
- Gagal menghapus: "Tugas gagal dihapus. Silakan coba kembali."

# 3. Task Creation Interaction

## 3.1 Trigger

Pengguna mengeklik tombol "Tambah Tugas".

## 3.2 Interaction Flow
- Sistem membuka form Tambah Tugas.
- Pengguna mengisi nama tugas.
- Pengguna memilih mata kuliah.
- Pengguna mengisi deskripsi jika diperlukan.
- Pengguna memilih tanggal tenggat.
- Pengguna memilih waktu tenggat.
- Pengguna memilih status awal.
- Pengguna mengeklik Simpan.
- Sistem melakukan validasi.
- Jika valid, sistem menyimpan tugas.
- Sistem menjadwalkan pengingat yang masih relevan.
- Sistem menampilkan konfirmasi berhasil.
- Data tugas diperbarui pada dashboard, kalender, dan daftar tugas.

## 3.3 Field Interaction
| Field | Interaction |
| --- | --- |
| Nama Tugas | Text input |
| Mata Kuliah | Text input atau selection |
| Deskripsi | Multiline text |
| Tanggal Tenggat | Date picker |
| Waktu Tenggat | Time picker |
| Status | Dropdown |

## 3.4 Validation Rules

### Nama Tugas
- Wajib diisi.
- Tidak boleh hanya berisi spasi.
- Maksimal 150 karakter.

### Mata Kuliah
- Wajib diisi.
- Maksimal 100 karakter.

### Deskripsi
- Opsional.
- Maksimal 1000 karakter.

### Tanggal dan Waktu Tenggat
- Wajib diisi.
- Tidak boleh berada di masa lalu saat membuat tugas baru.
- Tanggal dan waktu harus diperlakukan sebagai satu nilai tenggat.

### Status
- Nilai awal default: Belum Dikerjakan.
- Hanya menerima nilai status yang tersedia.

## 3.5 Form States
| State | Expected Behavior |
| --- | --- |
| Default | Form kosong dengan nilai awal |
| Focus | Field menampilkan indikator fokus |
| Invalid | Field menampilkan pesan kesalahan |
| Submitting | Tombol Simpan menampilkan loading |
| Success | Form ditutup dan data diperbarui |
| Error | Pesan kesalahan ditampilkan dan input dipertahankan |

## 3.6 Duplicate Submission Prevention
- Tombol Simpan dinonaktifkan selama proses penyimpanan.
- Sistem mencegah pengiriman data berulang akibat klik berkali-kali.
- Sistem hanya membuat satu tugas untuk satu proses submit.

# 4. Task Editing Interaction

## 4.1 Trigger

Pengguna memilih Edit pada halaman Detail Tugas.

## 4.2 Behavior
- Sistem membuka form edit.
- Seluruh field diisi menggunakan data tugas saat ini.
- Pengguna memperbarui informasi.
- Pengguna mengeklik Simpan Perubahan.
- Sistem melakukan validasi.
- Sistem menyimpan perubahan.
- Jika tenggat berubah, sistem menghitung ulang jadwal pengingat.
- Kalender dan daftar tugas diperbarui.
- Sistem menampilkan konfirmasi berhasil.

## 4.3 Special Rules
- Jika pengguna membatalkan perubahan, data lama tetap dipertahankan.
- Jika tenggat waktu berubah, pengingat lama yang belum diproses dibatalkan.
- Pengingat baru dijadwalkan berdasarkan tenggat terbaru.
- Jika status berubah menjadi Selesai, pengingat yang belum dikirim dibatalkan.

# 5. Task Deletion Interaction

## 5.1 Trigger

Pengguna memilih Hapus pada Detail Tugas.

## 5.2 Confirmation Modal

Judul: Hapus Tugas?

Pesan: Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan.

Actions:
- Batal.
- Hapus.

## 5.3 Behavior

Jika pengguna memilih Batal:
- Modal ditutup.
- Data tidak berubah.

Jika pengguna memilih Hapus:
- Sistem menghapus tugas.
- Jadwal pengingat terkait dibatalkan.
- Dashboard, kalender, dan daftar tugas diperbarui.
- Sistem menampilkan notifikasi berhasil.

Jika gagal:
- Data tetap tersedia.
- Sistem menampilkan pesan kesalahan.

# 6. Calendar Interaction

## 6.1 Month Navigation
| Action | Behavior |
| --- | --- |
| Klik bulan sebelumnya | Menampilkan bulan sebelumnya |
| Klik bulan berikutnya | Menampilkan bulan berikutnya |
| Klik tanggal | Memilih tanggal |
| Klik Today | Kembali ke tanggal hari ini |

## 6.2 Date Selection

Ketika pengguna memilih tanggal:
- Tanggal yang dipilih diberi indikator visual.
- Sistem mengambil tugas pada tanggal tersebut.
- Daftar tugas ditampilkan.
- Pengguna dapat memilih salah satu tugas.

## 6.3 Calendar View Switching

Pengguna dapat beralih antara:
- Monthly View.
- Weekly View.

Sistem mempertahankan konteks tanggal saat berpindah tampilan.

## 6.4 Task Indicator

Setiap tugas pada kalender menampilkan:
- Nama singkat tugas.
- Indikator status.
- Informasi waktu jika diperlukan.

Jika terdapat banyak tugas pada tanggal yang sama, tampilkan beberapa tugas dan indikator jumlah tugas lainnya.

# 7. Task Status Interaction

## 7.1 Available Status
- Belum Dikerjakan.
- Sedang Dikerjakan.
- Selesai.

## 7.2 Status Transition
| Current Status | New Status | Behavior |
| --- | --- | --- |
| Belum Dikerjakan | Sedang Dikerjakan | Perbarui status |
| Belum Dikerjakan | Selesai | Perbarui status dan batalkan pengingat |
| Sedang Dikerjakan | Selesai | Perbarui status dan batalkan pengingat |
| Selesai | Sedang Dikerjakan | Aktifkan kembali tugas |
| Selesai | Belum Dikerjakan | Aktifkan kembali tugas |

## 7.3 Status Update Behavior
- Perubahan status disimpan ke database.
- Status baru ditampilkan pada seluruh halaman.
- Jika menjadi Selesai, pengingat yang belum dikirim dibatalkan.
- Jika tugas diaktifkan kembali, sistem menghitung jadwal pengingat yang masih relevan.
- Jika gagal menyimpan, tampilkan status sebelumnya dan pesan kesalahan.

# 8. Notification Interaction

## 8.1 Reminder Schedule

Sistem menjadwalkan dua pengingat:
| Reminder | Schedule |
| --- | --- |
| H-3 | Tiga hari kalender sebelum tenggat |
| H-1 | Satu hari kalender sebelum tenggat |

Kedua pengingat menggunakan waktu pengiriman default pukul 09.00 waktu lokal pengguna.

## 8.2 Notification Content

Contoh H-3:

Judul: Pengingat Tugas

Pesan: Tugas Pemrograman Web akan dikumpulkan dalam 3 hari lagi. Tenggat: 20 November 2026 pukul 23.59.

Contoh H-1:

Judul: Pengingat Tugas

Pesan: Tugas Pemrograman Web harus dikumpulkan besok. Jangan lupa menyelesaikannya!

## 8.3 Notification Rules
- Notifikasi hanya dikirim untuk tugas yang belum selesai.
- Notifikasi tidak dikirim jika jadwalnya sudah berlalu.
- Perubahan tenggat memperbarui jadwal notifikasi.
- Status Selesai membatalkan pengingat yang belum diproses.
- Setiap jadwal pengingat memiliki identitas unik.
- Pengiriman ulang tidak boleh menyebabkan notifikasi duplikat.

## 8.4 Notification Failure

Jika layanan notifikasi gagal:
- Kegagalan dicatat.
- Sistem dapat melakukan retry sesuai kebijakan pengiriman.
- Status pengiriman harus dapat ditelusuri.
- Kegagalan notifikasi tidak boleh menghilangkan data tugas.

# 9. Task Filtering and Sorting Interaction

## 9.1 Filters

Pilihan filter:
- Semua.
- Belum Dikerjakan.
- Sedang Dikerjakan.
- Selesai.
- Terlambat.

## 9.2 Sorting

Pilihan pengurutan:
- Tenggat terdekat.
- Tenggat terjauh.
- Nama tugas A–Z.
- Nama tugas Z–A.

## 9.3 Behavior
- Filter dapat digunakan secara berulang.
- Pengguna dapat mengubah pengurutan tanpa menghilangkan filter aktif.
- Daftar diperbarui sesuai pilihan.
- Jika tidak ada hasil, tampilkan empty state.

10. Dashboard Interaction

## 10.1 Summary Cards

Ketika pengguna mengeklik kartu ringkasan:
- Total Tugas: membuka semua tugas.
- Belum Dikerjakan: membuka filter belum dikerjakan.
- Sedang Dikerjakan: membuka filter sedang dikerjakan.
- Selesai: membuka filter selesai.

## 10.2 Upcoming Tasks
- Tugas diurutkan berdasarkan tenggat terdekat.
- Tugas terdekat ditampilkan lebih dahulu.
- Klik tugas membuka Detail Tugas.

# 11. Empty State Interaction
| Page | Condition | Message | Action |
| --- | --- | --- | --- |
| Dashboard | Belum ada tugas | Belum ada tugas yang tercatat | Tambah Tugas |
| Kalender | Tidak ada tugas pada tanggal | Tidak ada tugas pada tanggal ini | Tambah Tugas |
| Semua Tugas | Data kosong | Belum ada tugas | Tambah Tugas |
| Filter | Tidak ada hasil | Tidak ada tugas pada kategori ini | Reset Filter |

# 12. Responsive Interaction

## Desktop
- Sidebar selalu tersedia.
- Kalender menampilkan grid bulanan.
- Modal menggunakan dialog terpusat.
- Aksi utama menggunakan tombol yang jelas.

## Tablet
- Sidebar dapat dibuka dan ditutup.
- Grid kalender menyesuaikan lebar.
- Modal menyesuaikan ukuran layar.

## Mobile
- Navigasi menggunakan pola mobile.
- Form menggunakan satu kolom.
- Dialog dapat menggunakan bottom sheet atau full-screen dialog.
- Tombol aksi utama mudah dijangkau.
- Kalender dapat menggunakan tampilan yang lebih sederhana.

# 13. Data Consistency

Setiap perubahan tugas harus tercermin pada:
- Dashboard.
- Kalender.
- Semua Tugas.
- Detail Tugas.
- Jadwal Pengingat.

Sistem harus memastikan perubahan data tidak menghasilkan status yang berbeda antarkomponen.

# 14. Interaction Completion Rules

Sebuah interaksi dinyatakan selesai apabila:
- Aksi pengguna telah diproses.
- Data berhasil diperbarui jika diperlukan.
- Tampilan mencerminkan kondisi terbaru.
- Pengguna mendapatkan umpan balik.
- Tidak ada duplikasi tindakan.
- Kesalahan dapat dipahami dan ditangani pengguna.

End of INTERACTION-SPEC v1.0
