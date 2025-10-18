# Aplikasi Manajemen Tugas Mahasiswa

## 📖 Deskripsi Singkat

Aplikasi ini adalah sebuah *Task Manager* sederhana berbasis web yang dirancang khusus untuk membantu mahasiswa melacak dan mengelola tugas-tugas kuliah mereka. Dengan antarmuka yang bersih dan intuitif, pengguna dapat dengan mudah menambah, mencari, memfilter, dan menandai tugas yang sudah selesai. Semua data tugas disimpan langsung di browser pengguna menggunakan `localStorage`, sehingga tidak akan hilang meskipun halaman di-refresh.

---

## 🖼️ Screenshot Aplikasi

Berikut adalah beberapa tampilan dari aplikasi:

**1. Form Tambah Tugas**
*(Menampilkan form untuk memasukkan detail tugas baru)*
`` (gambar1_web1)

**2. Tampilan Utama dengan Daftar Tugas**
*(Menampilkan daftar tugas yang belum selesai dan yang sudah selesai)*
``

**3. Tampilan Filter Aktif**
*(Menampilkan hasil setelah memfilter menggunakan status tugas atau pencarian")*
``

---

## ✨ Fitur yang Telah Diimplementasikan

* **Tambah Tugas Baru**: Pengguna dapat menambahkan tugas baru dengan mengisi nama tugas, mata kuliah, dan *deadline*.
* **Hapus Tugas**: Setiap tugas dapat dihapus dari daftar melalui tombol "Hapus".
* **Tandai Selesai/Batal**: Mengubah status tugas dari "Belum Selesai" menjadi "Selesai" dan sebaliknya.
* **Penyimpanan Lokal**: Semua data tugas secara otomatis disimpan di `localStorage` browser.
* **Pencarian Real-time**: Mencari tugas secara dinamis berdasarkan **nama tugas** atau **mata kuliah**.
* **Filter Status**: Memfilter daftar tugas berdasarkan statusnya: "Semua Status", "Belum Selesai", atau "Selesai".
* **Penghitung Tugas Aktif**: Terdapat penghitung yang secara otomatis memperbarui jumlah tugas yang masih berstatus "Belum Selesai".
* **Validasi Form**: Memastikan bahwa semua kolom pada form tambah tugas harus diisi.

---

## 🔧 Penjelasan Teknis

**Aplikasi ini dibangun murni menggunakan HTML, CSS, dan JavaScript (*vanilla JS*) tanpa *framework* eksternal.**

**Penggunaan `localStorage`**
*Data tugas disimpan dalam format JSON di `localStorage` browser, memastikan data tetap ada saat aplikasi dibuka kembali.*
``
**Validasi Form**
*Form memiliki validasi sederhana untuk memastikan semua input terisi sebelum tugas ditambahkan.*
``
---

## 🚀 Cara Menjalankan Aplikasi

1.  **Unduh atau Clone Kode**: Pastikan `index.html`, `style.css`, dan `script.js` berada dalam satu folder.
2.  **Buka File HTML**: Cukup buka file `index.html` langsung menggunakan browser web.
3.  **Selesai!** Aplikasi siap digunakan.
