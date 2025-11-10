# 📚 Manajemen Buku Pribadi (Personal Book Manager)

Sebuah aplikasi web berbasis React yang dibuat untuk memenuhi tantangan teknis. Aplikasi ini memungkinkan pengguna untuk mencatat dan mengelola koleksi buku pribadi mereka, melacak apa yang sedang dibaca, dan apa yang ingin dibeli.

- **Nama: Awi Septian Prasetyo**
- **NIM: 123140201**
- **Program Studi: Teknik Informatika**

![Menampilkan Dashboard](tugas3-1.png)

![Menampilkan Dashboard](tugas3-2.png)
---
## ✨ Fitur Utama

* **CRUD Buku:** Tambah, Edit, dan Hapus data buku (Judul, Penulis, Status).
* **Manajemen Status:** Kategorikan buku ke dalam tiga status:
    * Ingin Dibeli
    * Sedang Dibaca
    * Telah Dimiliki
* **Pencarian Cepat:** Cari buku secara dinamis berdasarkan judul atau penulis.
* **Filter Status:** Saring koleksi buku Anda berdasarkan statusnya.
* **Penyimpanan Lokal:** Data buku Anda tersimpan secara persisten di `localStorage` peramban, sehingga data tidak hilang saat halaman di-refresh.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan tumpukan teknologi modern untuk memenuhi persyaratan teknis:

* **Frontend:** React (v18+)
* **State Management:** React Context API (untuk state global buku)
* **Hooks:** `useState`, `useEffect`, dan `useMemo`.
* **Routing:** React Router v6 (untuk navigasi multi-halaman).
* **Penyimpanan:** `localStorage` API Peramban.
* **Testing:** Jest & React Testing Library (RTL) untuk unit testing.
* **Styling:** CSS Murni (dengan file terpisah per komponen).
* **Utilities:** `uuid` (untuk ID unik).
---

### Implementasi Khusus

Sesuai permintaan, proyek ini juga mengimplementasikan:

1.  **Custom Hooks:**
    * `useLocalStorage`: Hook untuk menyinkronkan state React dengan `localStorage` secara otomatis.
    * `useDebounce`: Hook untuk menunda eksekusi (digunakan pada input pencarian) demi optimalisasi performa.
2.  **Error Handling:** Validasi form input di `BookForm.js` untuk memastikan judul dan penulis tidak kosong saat diserahkan.
3.  **Komponen Reusable:** Lebih dari 3 komponen reusable telah dibuat (misalnya `BookForm`, `BookItem`, `BookList`, `FilterControls`, `Header`).
---

## 🚀 Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini di mesin lokal Anda:

1.  **Clone repositori (atau salin file):**
    ```bash
    git clone [URL-REPOSITORI-ANDA]
    cd [NAMA-FOLDER-PROYEK]
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan aplikasi (mode pengembangan):**
    ```bash
    npm start
    ```
    Buka [http://localhost:3000](http://localhost:3000) untuk melihatnya di peramban.
---

## 🧪 Menjalankan Tes

Proyek ini dilengkapi dengan 5+ unit test menggunakan React Testing Library untuk memvalidasi fungsionalitas komponen dan *error handling*.

Untuk menjalankan *test suite*:

```bash
npm test
