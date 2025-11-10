class Kegiatan {
    // Constructor ini dipanggil setiap kali bikin objek Kegiatan baru
    constructor(id, nama, tanggal, waktu, jenis, lokasi, deskripsi, selesai = false) {
        // Kalau ID belum ada (misal pas nambah baru), buat ID unik pakai Date.now()
        this.id = id || Date.now(); 
        this.nama = nama;
        this.tanggal = tanggal;
        this.waktu = waktu;
        this.jenis = jenis;
        this.lokasi = lokasi;
        this.deskripsi = deskripsi;
        // Secara default, kegiatan baru belum selesai
        this.selesai = selesai;
    }
}

class KegiatanManager {
    // Constructor ini jalan pas bikin `new KegiatanManager()`
    constructor(storageKey = 'daftarKegiatan') {
        // Ini tempat menyimpan semua objek Kegiatan nanti
        this.kegiatan = []; 
        // Nama 'kunci' untuk simpan data di localStorage
        this.storageKey = storageKey;
    }

    // --- Bagian ini ngurusin simpan & ambil data dari localStorage, dibikin async biar rapi ---
    // (Pakai Promise biar `await` bisa jalan, walau localStorage aslinya sinkron)

    async loadData() {
        console.log("Mencoba memuat data..."); // Tambahkan log
        return new Promise(resolve => {
            // Coba ambil data dari localStorage pakai kunci yg udah ditentuin
            const dataDariStorage = localStorage.getItem(this.storageKey);
            
            if (dataDariStorage) {
                console.log("Data ditemukan di localStorage."); // Tambahkan log
                // Ambil data dari localStorage (bentuknya string JSON), lalu ubah jadi objek Class Kegiatan lagi
                const dataMentah = JSON.parse(dataDariStorage);
                this.kegiatan = dataMentah.map(item => 
                    new Kegiatan(item.id, item.nama, item.tanggal, item.waktu, item.jenis, item.lokasi, item.deskripsi, item.selesai)
                );
            } else {
                console.log("localStorage kosong, pakai data contoh."); // Tambahkan log
                // Kalau belum ada data, kasih data contoh biar nggak kosong
                this.kegiatan = [
                    new Kegiatan(1, "Rapat UKM Jam 10 Pagi", "2025-11-01", "10:00", "Kepanitiaan", "GSG", "Bahas acara", false),
                    new Kegiatan(2, "Deadline Laporan Pemrograman Web", "2025-10-30", "23:59", "Tugas", "LMS", "Upload ke LMS", false),
                    new Kegiatan(3, "Kerjain Proposal PKM", "2025-10-28", "19:00", "Lomba", "Perpustakaan", "Bab 1 dan 2", false),
                    new Kegiatan(4, "Tugas Lama (Selesai)", "2025-10-01", "12:00", "Tugas", "Email", "Sudah dikirim", true)
                ];
                 // Simpan data contoh ke localStorage saat pertama kali
                 localStorage.setItem(this.storageKey, JSON.stringify(this.kegiatan));
            }
            console.log("Data berhasil dimuat:", this.kegiatan); // Log setelah memuat
            resolve(); // Beri tahu kalau prosesnya udah selesai
        });
    }

    async saveData() {
        return new Promise(resolve => {
            // Simpan array 'kegiatan' ke localStorage (ubah jadi string JSON dulu)
            localStorage.setItem(this.storageKey, JSON.stringify(this.kegiatan));
            console.log("Data berhasil disimpan:", this.kegiatan); // Konfirmasi data tersimpan
            resolve(); // Beri tahu kalau prosesnya udah selesai
        });
    }

    // --- Operasi CRUD (Create, Read, Update, Delete) ---

    async addKegiatan(data) {
        // Bikin objek Kegiatan baru dari data form
        const newItem = new Kegiatan(null, data.nama, data.tanggal, data.waktu, data.jenis, data.lokasi, data.deskripsi);
        // Tambahkan ke array
        this.kegiatan.push(newItem);
        // Jangan lupa simpan perubahan ke localStorage
        await this.saveData(); 
    }

    async deleteKegiatan(id) {
        // Buat array baru yang isinya semua kegiatan KECUALI yang ID-nya cocok
        this.kegiatan = this.kegiatan.filter(item => item.id !== id);
        // Simpan array baru ini ke localStorage
        await this.saveData(); 
    }

    async updateKegiatan(id, data) {
        // Cari posisi (index) kegiatan yang mau diupdate di dalam array
        const itemIndex = this.kegiatan.findIndex(item => item.id === id);
        // Kalau ketemu (indexnya bukan -1)
        if (itemIndex > -1) {
            // Update data di objek yang sesuai
            this.kegiatan[itemIndex].nama = data.nama;
            this.kegiatan[itemIndex].tanggal = data.tanggal;
            this.kegiatan[itemIndex].waktu = data.waktu;
            this.kegiatan[itemIndex].jenis = data.jenis;
            this.kegiatan[itemIndex].lokasi = data.lokasi;
            this.kegiatan[itemIndex].deskripsi = data.deskripsi;
            // Status 'selesai' nggak di-update di sini, ada fungsi sendiri
            // Simpan perubahan ke localStorage
            await this.saveData(); 
        }
    }

    async tandaiSelesai(id, status = true) {
        // Cari posisi (index) kegiatan yang mau ditandai
        const itemIndex = this.kegiatan.findIndex(item => item.id === id);
        // Kalau ketemu
        if (itemIndex > -1) {
            // Ubah status 'selesai'-nya
            this.kegiatan[itemIndex].selesai = status;
            // Simpan perubahan ke localStorage
            await this.saveData(); 
        }
    }

    // --- Fungsi-fungsi buat ngambil data (tanpa ngubah) ---

    // Ambil satu kegiatan berdasarkan ID-nya
    getKegiatanById(id) {
        return this.kegiatan.find(item => item.id === id);
    }

    // Ambil semua kegiatan
    getAllKegiatan() {
        // Salinan array-nya, biar data asli aman nggak diubah langsung
        return [...this.kegiatan]; 
    }

    // Ambil kegiatan yang sudah difilter berdasarkan pencarian dan jenis
    getFilteredKegiatan(searchTerm, jenisTerm) {
        return this.kegiatan.filter(k => {
            const lowerSearch = searchTerm.toLowerCase();
            // Cek apakah teks pencarian ada di nama, lokasi, atau deskripsi
            const matchSearch = (
                k.nama.toLowerCase().includes(lowerSearch) ||
                k.lokasi.toLowerCase().includes(lowerSearch) ||
                k.deskripsi.toLowerCase().includes(lowerSearch)
            );
            // Cek apakah jenisnya cocok (atau kalau filternya 'Semua')
            const matchJenis = (jenisTerm === 'Semua' || k.jenis === jenisTerm);
            // Harus cocok dua-duanya baru masuk hasil filter
            return matchSearch && matchJenis;
        }).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)); // Urutkan dari yang paling baru tanggalnya
    }

    // Ambil tugas yang masih aktif (belum selesai)
    getTugasAktif() {
        return this.kegiatan.filter(k => k.jenis === "Tugas" && k.selesai === false)
                           .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal)); // Urut dari tanggal terlama
    }

    // Ambil jadwal terdekat (bukan tugas, belum selesai, mulai hari ini)
    getJadwalTerdekat(limit = 5) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set ke jam 00:00 hari ini
        // Daftar jenis yang dianggap 'jadwal' (bukan 'Tugas')
        const jenisJadwal = ["Asrama", "Kepanitiaan", "Lomba", "Kerjaan"];
        
        return this.kegiatan.filter(k => 
                                // Cek jenisnya termasuk jadwal?
                                jenisJadwal.includes(k.jenis) && 
                                // Belum selesai?
                                k.selesai === false &&
                                // Tanggalnya mulai hari ini atau ke depan?
                                new Date(k.tanggal + 'T00:00:00') >= today 
                             )
                             // Urutkan dari yang paling dekat tanggalnya
                             .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
                             // Ambil beberapa aja (default 5)
                             .slice(0, limit);
    }

    // Hitung jumlah tugas yang masih aktif
    getTotalTugasAktif() {
        return this.kegiatan.filter(k => k.jenis === "Tugas" && k.selesai === false).length;
    }

    // Hitung jumlah semua kegiatan yang sudah selesai
    getTotalSelesai() {
        return this.kegiatan.filter(k => k.selesai === true).length;
    }

    // Hitung jumlah kegiatan HARI INI yang belum selesai
    getTotalHariIni() {
        // Dapetin tanggal hari ini format YYYY-MM-DD
        const todayStr = new Date().toISOString().split('T')[0];
        return this.kegiatan.filter(k => k.tanggal === todayStr && k.selesai === false).length;
    }
}

// === Bagian ini ngurusin interaksi sama tampilan (HTML) dan event (klik, submit, dll) ===

// Pastikan semua HTML sudah siap baru jalankan Javascript
document.addEventListener('DOMContentLoaded', async () => { // Fungsi utamanya async biar bisa pakai 'await' waktu load/save data

    // --- Buat 'pengelola' data Kegiatan ---
    const kegiatanManager = new KegiatanManager();
    // Pastikan data dari localStorage sudah dimuat SEBELUM lanjut ke yg lain
    await kegiatanManager.loadData(); 

    // --- Ambil elemen-elemen HTML yang bakal dipakai ---
    const navTabs = document.querySelectorAll('.nav-tab');
    const pages = document.querySelectorAll('.page-content');
    
    // Dashboard
    const summaryTugas = document.getElementById('summary-tugas');
    const summarySelesai = document.getElementById('summary-selesai');
    const summaryHariIni = document.getElementById('summary-hari-ini');
    const listTugas = document.getElementById('list-tugas-saat-ini');
    const listJadwal = document.getElementById('list-jadwal-terdekat');
    
    // Halaman Kegiatan
    const formKegiatan = document.getElementById('form-tambah-kegiatan');
    const searchInput = document.getElementById('search-input');
    const filterJenis = document.getElementById('filter-jenis');
    const activityListContainer = document.getElementById('activity-list-container');
    const formTitle = document.getElementById('form-title'); // Judul form (Tambah/Edit)
    const submitButton = document.getElementById('submit-button'); // Tombol form (Tambah/Update)
    const cancelEditButton = document.getElementById('cancel-edit-button'); // Tombol batal edit
    const editIdInput = document.getElementById('edit-id'); // Input tersembunyi buat nyimpen ID pas lagi ngedit

    // --- Fungsi-fungsi untuk menampilkan data ke HTML ---

    // Fungsi buat ganti halaman (tab)
    const showPage = (pageId) => {
        // Sembunyikan semua halaman dulu
        pages.forEach(page => page.classList.remove('active'));
        // Bikin semua tab jadi nggak aktif dulu
        navTabs.forEach(tab => tab.classList.remove('active'));
        // Baru tampilkan halaman yang dipilih
        // Pakai '?.' jaga-jaga kalau elemennya nggak ketemu
        document.getElementById(pageId)?.classList.add('active'); 
        // Aktifkan juga tab yang sesuai
        document.querySelector(`.nav-tab[data-page="${pageId}"]`)?.classList.add('active');
    };

    // Render list tugas pakai template literal & arrow function
    const renderTugasList = () => {
        // Kosongin listnya dulu
        listTugas.innerHTML = ''; 
        // Ambil data tugas aktif dari manager
        const tugasAktif = kegiatanManager.getTugasAktif();

        // Kalau ada tugas aktif, tampilkan satu per satu
        if (tugasAktif.length > 0) {
            tugasAktif.forEach(tugas => {
                // Format tanggalnya biar lebih enak dibaca (misal: 30 Okt)
                const formattedDate = new Date(tugas.tanggal + 'T00:00:00').toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short'
                });
                // Bikin HTML buat satu item tugas, pakai template literal
                listTugas.innerHTML += `
                    <li data-id="${tugas.id}">
                        <span class="item-text">${tugas.nama} (${formattedDate})</span>
                        <div class="item-actions">
                            <button class="btn-icon selesai" title="Tandai Selesai">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </li>
                `;
            });
        } else { // Kalau nggak ada tugas aktif
            listTugas.innerHTML = '<li><span class="item-text">Hore! Tidak ada tugas saat ini.</span></li>';
        }
    };

    // Render list jadwal terdekat
    const renderJadwalList = () => {
        // Kosongin listnya dulu
        listJadwal.innerHTML = ''; 
        // Ambil data jadwal terdekat dari manager
        const nearestEvents = kegiatanManager.getJadwalTerdekat(); 

        // Kalau ada jadwal, tampilkan
        if (nearestEvents.length > 0) {
            nearestEvents.forEach(jadwal => {
                const formattedDate = new Date(jadwal.tanggal + 'T00:00:00').toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short'
                });
                listJadwal.innerHTML += `
                    <li data-id="${jadwal.id}">
                        <span class="item-text">${jadwal.nama} (${formattedDate})</span>
                        <div class="item-actions">
                            <button class="btn-icon selesai" title="Tandai Selesai">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </li>
                `;
            });
        } else { // Kalau nggak ada jadwal
            listJadwal.innerHTML = '<li><span class="item-text">Tidak ada jadwal kegiatan terdekat.</span></li>';
        }
    };

    // Render semua bagian di halaman Dashboard
    const renderDashboard = () => {
        // Update angka-angka di summary cards
        summaryTugas.textContent = kegiatanManager.getTotalTugasAktif();
        summarySelesai.textContent = kegiatanManager.getTotalSelesai();
        summaryHariIni.textContent = kegiatanManager.getTotalHariIni();
        // Update juga list tugas dan jadwal
        renderTugasList();
        renderJadwalList(); 
    };

    // Render daftar kegiatan di halaman 'Jadwal Kegiatan'
    const renderJadwalKegiatan = () => {
        // Kosongin daftar dulu
        activityListContainer.innerHTML = '';
        // Ambil teks pencarian dan filter jenis
        const searchTerm = searchInput.value;
        const jenisTerm = filterJenis.value;
        // Ambil data yang sudah difilter dari manager
        const filteredKegiatan = kegiatanManager.getFilteredKegiatan(searchTerm, jenisTerm);

        // Kalau hasil filternya kosong
        if (filteredKegiatan.length === 0) {
            activityListContainer.innerHTML = '<p id="no-activities">Oops! Tidak ada kegiatan yang cocok.</p>';
            return; // Berhenti di sini
        }

        // Kalau ada hasil, tampilkan satu per satu
        filteredKegiatan.forEach(kegiatan => {
            // Format tanggal lengkap (misal: 30 Oktober 2025)
            const formattedDate = new Date(kegiatan.tanggal).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
            // Cek apakah kegiatan ini sudah selesai, buat nambahin class 'selesai'
            const selesaiClass = kegiatan.selesai ? 'selesai' : '';

            // Bikin HTML buat satu item kegiatan
            const itemHTML = `
                <div class="activity-item ${kegiatan.jenis} ${selesaiClass}" data-id="${kegiatan.id}">
                    <div class="info">
                        <h3>${kegiatan.nama}</h3>
                        <div class="meta">
                            <span><i class="fa-solid fa-calendar-alt"></i> ${formattedDate}</span>
                            <span><i class="fa-solid fa-clock"></i> ${kegiatan.waktu}</span>
                            <span><i class="fa-solid fa-location-dot"></i> ${kegiatan.lokasi}</span>
                            <span><i class="fa-solid fa-tag"></i> ${kegiatan.jenis}</span>
                        </div>
                        <p style="font-size: 0.9rem; color: #555; margin-top: 0.5rem;">${kegiatan.deskripsi}</p>
                    </div>
                    <div class="actions">
                        <button class="btn-icon edit" title="Edit">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn-icon delete" title="Hapus">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            // Tambahkan HTML item ini ke dalam daftar
            activityListContainer.innerHTML += itemHTML;
        });
    };

    // --- Fungsi Bantuan untuk UI (User Interface) ---
    
    // Fungsi ini buat ngisi form pakai data yang mau diedit
    const populateFormForEdit = (kegiatan) => {
        // Masukin ID ke input tersembunyi
        editIdInput.value = kegiatan.id;
        // Isi semua field form sesuai data kegiatan
        document.getElementById('nama-kegiatan').value = kegiatan.nama;
        document.getElementById('tanggal').value = kegiatan.tanggal;
        document.getElementById('waktu').value = kegiatan.waktu;
        document.getElementById('jenis').value = kegiatan.jenis;
        document.getElementById('lokasi').value = kegiatan.lokasi;
        document.getElementById('deskripsi').value = kegiatan.deskripsi;

        // Ubah tampilan form jadi mode edit
        formTitle.textContent = "Edit Kegiatan"; // Ganti judul
        submitButton.innerHTML = '<i class="fa-solid fa-save"></i> Update Kegiatan'; // Ganti teks tombol submit
        cancelEditButton.style.display = 'inline-block'; // Munculin tombol 'Batal Edit'
    };

    // Fungsi ini buat balikin form ke kondisi awal (nambah baru)
    const resetFormToAddMode = () => {
        // Hapus ID yang lagi diedit (kalau ada)
        editIdInput.value = ''; 
        // Bersihin isi form-nya
        formKegiatan.reset(); 
        // Balikin tampilan form ke mode tambah
        formTitle.textContent = "Tambah Kegiatan Baru";
        submitButton.innerHTML = '<i class="fa-solid fa-plus"></i> Tambah Kegiatan';
        cancelEditButton.style.display = 'none'; // Sembunyiin lagi tombol 'Batal Edit'
    };

    // --- Di sini 'pasang pendengar' buat aksi user (klik tab, klik tombol, ngetik, dll) ---

    // 1. Klik Tab Navigasi
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Kalau tab diklik, panggil fungsi ganti halaman
            showPage(tab.dataset.page);
        });
    });
    
    // 2. Klik Tombol 'Selesai' di list TUGAS (Dashboard)
    listTugas.addEventListener('click', async (e) => { // Bikin event ini async biar bisa nunggu 'saveData'
        // Cari tau apakah yg diklik itu tombol 'selesai' atau bagian dalamnya
        const selesaiBtn = e.target.closest('.selesai');
        // Kalau iya, tombol 'selesai' yg diklik
        if (selesaiBtn) {
            // Ambil elemen <li> terdekat buat dapetin ID-nya
            const li = selesaiBtn.closest('li');
            const id = parseInt(li.dataset.id);
            // Panggil fungsi di manager untuk nandain selesai
            await kegiatanManager.tandaiSelesai(id, true); // Tunggu data baru disimpan ke localStorage
            // Update tampilan Dashboard dan Halaman Kegiatan
            renderDashboard(); 
            renderJadwalKegiatan(); 
        }
    });
    
    // 3. Klik Tombol 'Selesai' di list JADWAL (Dashboard)
    listJadwal.addEventListener('click', async (e) => { // Bikin async juga
        const selesaiBtn = e.target.closest('.selesai');
        if (selesaiBtn) {
            const li = selesaiBtn.closest('li');
            const id = parseInt(li.dataset.id);
            await kegiatanManager.tandaiSelesai(id, true); // Tunggu simpan
            renderDashboard(); 
            renderJadwalKegiatan(); 
        }
    });


    // 4. Submit Form Tambah/Update Kegiatan (Halaman 2)
    formKegiatan.addEventListener('submit', async (e) => { // Bikin async
        // Jangan biarin halaman nge-refresh pas form disubmit
        e.preventDefault();
        // Cek ID di input tersembunyi, kalau ada isinya berarti lagi ngedit
        const editingId = parseInt(editIdInput.value);
        
        // Kumpulin data dari semua field form
        const dataKegiatan = {
            nama: document.getElementById('nama-kegiatan').value,
            tanggal: document.getElementById('tanggal').value,
            waktu: document.getElementById('waktu').value,
            jenis: document.getElementById('jenis').value,
            lokasi: document.getElementById('lokasi').value,
            deskripsi: document.getElementById('deskripsi').value,
        };

        // Kalau ada ID, berarti lagi ngedit
        if (editingId) {
            // Panggil fungsi update di manager
            await kegiatanManager.updateKegiatan(editingId, dataKegiatan); // Tunggu proses update selesai
        } else { // Kalau nggak ada ID, berarti nambah baru
            // Panggil fungsi tambah di manager
            await kegiatanManager.addKegiatan(dataKegiatan); // Tunggu proses nambah selesai
        }
        
        // Balikin form ke mode tambah setelah berhasil
        resetFormToAddMode(); 
        // Update tampilan di Halaman Kegiatan dan Dashboard
        renderJadwalKegiatan(); 
        renderDashboard(); 
    });

    // 5. Klik Tombol Batal Edit
    cancelEditButton.addEventListener('click', () => {
        // Kalau tombol batal diklik, reset aja form-nya
        resetFormToAddMode();
    });

    // 6. Ngetik di Input Pencarian atau Ganti Filter Jenis (Halaman 2)
    searchInput.addEventListener('input', renderJadwalKegiatan); // Tiap ngetik, render ulang
    filterJenis.addEventListener('change', renderJadwalKegiatan); // Tiap ganti filter, render ulang

    // 7. Klik Tombol Hapus atau Edit di List Kegiatan (Halaman 2)
    activityListContainer.addEventListener('click', async (e) => { // Bikin async
        // Cek apakah tombol HAPUS yg diklik
        const deleteButton = e.target.closest('.delete');
        if (deleteButton) {
            // Ambil item <div> terdekat buat dapetin ID
            const item = deleteButton.closest('.activity-item');
            const itemId = parseInt(item.dataset.id);
            // Tanya konfirmasi dulu
            if (confirm('Yakin mau hapus kegiatan ini? Nggak bisa dibalikin lho.')) {
                // Panggil fungsi hapus di manager
                await kegiatanManager.deleteKegiatan(itemId); // Tunggu hapus
                // Update tampilan
                renderJadwalKegiatan();
                renderDashboard(); 
            }
            // Kalau tombol hapus yg diklik, nggak usah lanjut ke bagian edit
            return; 
        }

        // Cek apakah tombol EDIT yg diklik
        const editButton = e.target.closest('.edit');
        if(editButton) {
            const item = editButton.closest('.activity-item');
            const itemId = parseInt(item.dataset.id);
            // Ambil data lengkap kegiatan yg mau diedit dari manager
            const kegiatanToEdit = kegiatanManager.getKegiatanById(itemId);
            // Kalau datanya ada
            if (kegiatanToEdit) {
                // Isi form pakai data itu
                populateFormForEdit(kegiatanToEdit);
                // Biar enak, scroll ke atas ke form-nya pas mau ngedit
                formKegiatan.scrollIntoView({ behavior: 'smooth' }); 
            }
        }
    });

    // === Apa yang perlu dilakuin pas halaman pertama kali dibuka ===
    showPage('dashboard-page'); // Langsung tunjukin halaman Dashboard
    renderDashboard();          // Tampilin data awal di Dashboard
    renderJadwalKegiatan();     // Tampilin juga data awal di halaman Kegiatan

});
