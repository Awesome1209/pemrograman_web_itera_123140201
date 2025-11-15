## 📚 Penjelasan Singkat Tugas Praktikum Python OOP

Proyek ini adalah implementasi **Sistem Manajemen Perpustakaan Sederhana** yang dibangun menggunakan Python.
Tujuan utamanya adalah untuk mendemonstrasikan penerapan konsep-konsep inti **Object-Oriented Programming (OOP)** secara praktis dan benar.

Program ini mensimulasikan sebuah perpustakaan yang dapat menyimpan dan mengelola koleksi item. Arsitektur program dirancang dengan pilar-pilar OOP:

* **Abstraction:** Menggunakan *Abstract Base Class* (`LibraryItem`) untuk menciptakan "blueprint" item.
* **Inheritance:** Menggunakan *subclass* (`Book` dan `Magazine`) yang mewarisi sifat dari `LibraryItem`.
* **Encapsulation:** Melindungi data inti (seperti `__items` di `Library`) menggunakan *access modifier* (private/protected).
* **Polymorphism:** Memungkinkan setiap *subclass* untuk memiliki implementasi unik (`get_details`) yang bisa dipanggil secara seragam.

Kelas `Library` bertindak sebagai "manajer" atau "controller" yang menangani semua logika operasional, seperti menyimpan koleksi dan menyediakan metode untuk berinteraksi dengan koleksi tersebut.

---

## ✨ Fitur-Fitur Utama

Sistem ini memiliki fungsionalitas inti sebagai berikut:

* **1. Menambahkan Item Baru**
    * Program dapat menambahkan objek **Buku** baru (lengkap dengan data penulis dan ISBN) ke dalam koleksi.
    * Program dapat menambahkan objek **Majalah** baru (lengkap dengan data nomor edisi dan penerbit) ke dalam koleksi.

* **2. Pembuatan ID Otomatis**
    * Setiap item yang berhasil ditambahkan akan secara otomatis mendapatkan ID unik yang di-generate secara internal oleh kelas `Library` (menggunakan atribut *private* `__id_counter`).

* **3. Menampilkan Seluruh Koleksi**
    * Sistem dapat mencetak ke konsol daftar semua item yang tersimpan di perpustakaan.
    * **(Demonstrasi Polymorphism)** Detail yang ditampilkan akan otomatis menyesuaikan dengan jenis itemnya; format `Book` (dengan Penulis/ISBN) dan format `Magazine` (dengan Edisi/Penerbit) akan tercetak dengan benar meskipun dipanggil dari *loop* yang sama.

* **4. Mencari Item**
    * Sistem menyediakan satu fungsi pencarian serbaguna yang dapat menemukan item berdasarkan dua kriteria:
        * **Berdasarkan ID Item:** Pencarian harus persis (misal, mencari `2` akan menemukan item dengan ID 2).
        * **Berdasarkan Judul:** Pencarian bersifat parsial dan *case-insensitive* (misal, mencari `"code"` akan menemukan item dengan judul `"Clean Code"`).

## Screenshoot
<img width="1654" height="832" alt="image" src="https://github.com/user-attachments/assets/a8416fc4-be82-4746-9813-f72e942491a2" />
