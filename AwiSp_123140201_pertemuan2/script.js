document.addEventListener('DOMContentLoaded', () => {

    // --- 1. AMBIL ELEMEN YANG DIPERLUKAN ---
    // Pakai 'const' karena elemen ini gak akan berubah
    const infoWaktuEl = document.getElementById('info-waktu');
    const formTugas = document.getElementById('form-tugas');
    const inputTugas = document.getElementById('input-tugas');
    const listTugasEl = document.getElementById('list-tugas');

    
    // --- 2. WIDGET WAKTU (SYARAT: ASYNC AWAIT & TEMPLATE LITERALS) ---
    
    // Kita pakai 'async' function karena kita akan 'await' data dari API
    const ambilWaktuJakarta = async () => {
        try {
            // 'await' = tunggu sampai fetch-nya selesai
            const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Jakarta');
            
            // Kalo ada error di server (misal: 404)
            if (!response.ok) {
                throw new Error('Gagal mengambil data waktu');
            }

            const data = await response.json();
            const waktuSekarang = new Date(data.datetime);

            // Format waktu biar gampang dibaca
            const opsiFormat = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            
            // (Syarat: Template Literals pakai backtick ``)
            infoWaktuEl.textContent = `${waktuSekarang.toLocaleTimeString('id-ID', opsiFormat)}`;
        
        } catch (error) {
            // Kalo gagal (misal: gak ada internet), tampilkan error
            console.error('Error di fetchWaktu:', error);
            infoWaktuEl.textContent = 'Gagal memuat';
        }
    };


    // --- 3. WIDGET TUGAS (SYARAT: CLASS, LOCALSTORAGE, ARROW FN) ---

    // (Syarat: Implementasi Classes)
    // Kita buat 'class' untuk ngurusin semua hal soal tugas
    class ManajerTugas {
        
        constructor() {
            // Cek localStorage, ada data lama gak?
            // Kalo gak ada, kita pakai array kosong []
            this.daftarTugas = JSON.parse(localStorage.getItem('daftarTugasSaya')) || [];
        }

        // Method buat simpan ke localStorage
        simpanKeStorage() {
            localStorage.setItem('daftarTugasSaya', JSON.stringify(this.daftarTugas));
        }

        // (Syarat: Arrow Function 1)
        // Kita pakai arrow function biar 'this' nya gak lari-lari
        tambahTugas = (teksTugas) => {
            // Bikin objek tugas baru
            const tugasBaru = {
                id: Date.now(), // ID unik pakai waktu
                teks: teksTugas
            };

            this.daftarTugas.push(tugasBaru);
            this.simpanKeStorage(); // Langsung simpan
            this.render();          // Tampilkan ulang list-nya
        }

        // (Syarat: Arrow Function 2)
        hapusTugas = (idTugas) => {
            // 'filter' akan buat array baru tanpa tugas yg ID-nya kita hapus
            this.daftarTugas = this.daftarTugas.filter(tugas => tugas.id != idTugas);
            this.simpanKeStorage();
            this.render();
        }

        // ===== Method untuk Edit Tugas =====
        editTugas = (idTugas, teksBaru) => {
            // Kita pakai 'map' untuk cari dan update tugas yang sesuai
            this.daftarTugas = this.daftarTugas.map(tugas => {
                if (tugas.id == idTugas) {
                    // Jika ID-nya cocok, update teksnya
                    tugas.teks = teksBaru;
                }
                return tugas; // Kembalikan tugas
            });
            this.simpanKeStorage(); // Simpan perubahan
            this.render();          // Render ulang
        }

        // Method buat nampilin semua tugas ke HTML
        render = () => {
            // Kosongin dulu list-nya
            listTugasEl.innerHTML = '';

            // Kalo gak ada tugas
            if (this.daftarTugas.length === 0) {
                listTugasEl.innerHTML = '<li class="tugas-kosong">Hore, tidak ada tugas!</li>';
                return;
            }

            // Loop semua tugas di data kita, lalu buat elemen <li>
            this.daftarTugas.forEach(tugas => {
                const itemLi = document.createElement('li');
                
                // ===== Template literal sekarang ada tombol Edit =====
                itemLi.innerHTML = `
                    <span>${tugas.teks}</span>
                    <div class="tugas-actions">
                        <button class="edit-btn" data-id="${tugas.id}">Edit</button>
                        <button class="hapus-btn" data-id="${tugas.id}">X</button>
                    </div>
                `;
                
                listTugasEl.appendChild(itemLi);
            });
        }
    }


    // --- 4. INISIALISASI & PASANG EVENT LISTENER ---

    // Bikin objek baru dari class kita
    const appTugas = new ManajerTugas();

    // Pasang listener buat form submit
    // (Syarat: Arrow Function 3)
    formTugas.addEventListener('submit', (event) => {
        event.preventDefault(); // Biar halaman gak reload pas submit

        const teks = inputTugas.value.trim(); // Ambil teks & hapus spasi
        
        if (teks) {
            appTugas.tambahTugas(teks);
            inputTugas.value = ''; // Kosongin lagi inputnya
        }
    });

    // Pasang listener buat tombol hapus
    // Kita pasang di 'listTugasEl' (induknya) biar lebih efisien
    // Ini namanya "Event Delegation"
    // ===== Listener ini sekarang menangani Edit dan Hapus =====
    listTugasEl.addEventListener('click', (event) => {
        const target = event.target; // Element yang diklik

        // Cek apakah yg diklik itu tombol HAPUS?
        if (target.classList.contains('hapus-btn')) {
            const id = target.dataset.id;
            appTugas.hapusTugas(id);
        }

        // Cek apakah yg diklik itu tombol EDIT?
        if (target.classList.contains('edit-btn')) {
            const id = target.dataset.id;
            
            // Ambil teks tugas saat ini
            // 'closest' cari elemen 'li' terdekat
            // 'querySelector' cari 'span' di dalam 'li' tsb
            const teksSaatIni = target.closest('li').querySelector('span').textContent;
            
            // Munculkan prompt untuk edit
            const teksBaru = prompt("Edit tugas Anda:", teksSaatIni);

            // Cek jika user menekan "OK" (bukan "Cancel") dan teksnya tidak kosong
            if (teksBaru !== null && teksBaru.trim() !== "") {
                appTugas.editTugas(id, teksBaru.trim());
            }
        }
    });


    // --- 5. JALANKAN SAAT PERTAMA KALI DIMUAT ---

    // Panggil fungsi waktu
    ambilWaktuJakarta();
    
    // Tampilkan tugas yg mungkin udah ada di localStorage
    appTugas.render();

    // Bonus: Bikin jam-nya update tiap detik
    setInterval(ambilWaktuJakarta, 60000); // Update tiap 60 detik
});