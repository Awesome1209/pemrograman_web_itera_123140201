import sys

# List awal berisi 6 dictionary data mahasiswa
data_mahasiswa = [
    {"NIM": "123140201", "nama": "Awi Septian Prasetyo", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 90},
    {"NIM": "123140211", "nama": "Muhammad Bimastiar", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"NIM": "123140200", "nama": "Piela", "nilai_uts": 50, "nilai_uas": 60, "nilai_tugas": 55},
    {"NIM": "123140151", "nama": "Tasya", "nilai_uts": 90, "nilai_uas": 95, "nilai_tugas": 88},
    {"NIM": "123140171", "nama": "Firman", "nilai_uts": 60, "nilai_uas": 45, "nilai_tugas": 65},
    {"NIM": "123140204", "nama": "Habbi Widagdo", "nilai_uts": 75, "nilai_uas": 80, "nilai_tugas": 70},
]

# --- Definisi Fungsi-Fungsi Inti ---

def hitung_nilai_akhir(uts, uas, tugas):
    """
    Menghitung nilai akhir berdasarkan bobot:
    30% UTS + 40% UAS + 30% Tugas
    """
    return (uts * 0.30) + (uas * 0.40) + (tugas * 0.30)

def tentukan_grade(nilai_akhir):
    """
    Menentukan grade berdasarkan nilai akhir.
    A: ≥80, B: ≥70, C: ≥60, D: ≥50, E: <50
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def proses_semua_data(data_list):
    """
    Memproses seluruh data mahasiswa untuk menambahkan 
    'nilai_akhir' dan 'grade' ke setiap dictionary.
    """
    for mhs in data_list:
        mhs['nilai_akhir'] = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        mhs['grade'] = tentukan_grade(mhs['nilai_akhir'])
    return data_list

def tampilkan_tabel(data_list, title="Data Mahasiswa"):
    """
    Menampilkan data mahasiswa dalam format tabel yang rapi.
    """
    if not data_list:
        print(f"\n--- Tidak ada data untuk ditampilkan di '{title}' ---")
        return

    print(f"\n--- {title} ---")
    print("=" * 79)
    print(f"| {'No':<3} | {'NIM':<10} | {'Nama':<25} | {'UTS':>5} | {'UAS':>5} | {'Tugas':>5} | {'Akhir':>6} | {'Grade':>5} |")
    print("=" * 79)
    
    for i, mhs in enumerate(data_list, 1):
        print(f"| {i:<3} | {mhs['NIM']:<10} | {mhs['nama']:<25} | {mhs['nilai_uts']:>5.1f} | {mhs['nilai_uas']:>5.1f} | {mhs['nilai_tugas']:>5.1f} | {mhs['nilai_akhir']:>6.2f} | {mhs['grade']:>5} |")
    
    print("=" * 79)

def cari_terbaik_terendah(data_list):
    """
    Mencari dan menampilkan mahasiswa dengan nilai akhir tertinggi dan terendah.
    """
    if not data_list:
        print("\nData masih kosong.")
        return

    tertinggi = max(data_list, key=lambda mhs: mhs['nilai_akhir'])
    terendah = min(data_list, key=lambda mhs: mhs['nilai_akhir'])
    
    print("\n--- Peringkat Mahasiswa ---")
    print(f"Nilai Tertinggi: {tertinggi['nama']} (NIM: {tertinggi['NIM']}) - Nilai: {tertinggi['nilai_akhir']:.2f} (Grade {tertinggi['grade']})")
    print(f"Nilai Terendah : {terendah['nama']} (NIM: {terendah['NIM']}) - Nilai: {terendah['nilai_akhir']:.2f} (Grade {terendah['grade']})")

# --- Fungsi untuk Fitur Tambahan ---

def input_mahasiswa_baru():
    """
    Meminta input dari user untuk data mahasiswa baru.
    Melakukan validasi input nilai harus berupa angka.
    """
    print("\n--- Input Data Mahasiswa Baru ---")
    nim = input("NIM: ").strip()
    nama = input("Nama: ").strip()
    
    while True:
        try:
            uts = float(input("Nilai UTS: "))
            uas = float(input("Nilai UAS: "))
            tugas = float(input("Nilai Tugas: "))
            
            if not (0 <= uts <= 100 and 0 <= uas <= 100 and 0 <= tugas <= 100):
                print("Nilai harus berada di antara 0 dan 100.")
                continue
                
            break
        except ValueError:
            print("Input nilai tidak valid! Harap masukkan angka.")
            
    mhs_baru = {
        "NIM": nim,
        "nama": nama,
        "nilai_uts": uts,
        "nilai_uas": uas,
        "nilai_tugas": tugas
    }
    
    mhs_baru['nilai_akhir'] = hitung_nilai_akhir(mhs_baru['nilai_uts'], mhs_baru['nilai_uas'], mhs_baru['nilai_tugas'])
    mhs_baru['grade'] = tentukan_grade(mhs_baru['nilai_akhir'])
    
    print(f"\nData untuk {nama} (NIM: {nim}) berhasil ditambahkan.")
    return mhs_baru

def filter_by_grade(data_list):
    """
    Memfilter dan menampilkan mahasiswa berdasarkan grade tertentu.
    """
    grade_target = input("\nMasukkan Grade yang ingin dicari (A/B/C/D/E): ").strip().upper()
    
    if grade_target not in ['A', 'B', 'C', 'D', 'E']:
        print(f"Grade '{grade_target}' tidak valid.")
        return

    hasil_filter = [mhs for mhs in data_list if mhs['grade'] == grade_target]
    
    if not hasil_filter:
        print(f"Tidak ditemukan mahasiswa dengan grade '{grade_target}'.")
    else:
        tampilkan_tabel(hasil_filter, title=f"Daftar Mahasiswa Grade {grade_target}")

def hitung_rata_rata_kelas(data_list):
    """
    Menghitung dan menampilkan nilai akhir rata-rata dari seluruh kelas.
    """
    if not data_list:
        print("\nData kelas masih kosong.")
        return
        
    total_nilai = sum(mhs['nilai_akhir'] for mhs in data_list)
    rata_rata = total_nilai / len(data_list)
    
    print("\n--- Rata-rata Nilai Kelas ---")
    print(f"Jumlah Mahasiswa : {len(data_list)}")
    print(f"Total Nilai Kelas: {total_nilai:.2f}")
    print(f"Rata-rata Kelas : {rata_rata:.2f}")

# --- FUNGSI BARU ---
def hapus_data_mahasiswa(data_list):
    """
    Menghapus data mahasiswa berdasarkan NIM.
    """
    if not data_list:
        print("\nData masih kosong, tidak ada yang bisa dihapus.")
        return data_list

    nim_target = input("\nMasukkan NIM mahasiswa yang akan dihapus: ").strip()
    
    mahasiswa_ditemukan = None
    indeks = -1

    for i, mhs in enumerate(data_list):
        if mhs['NIM'] == nim_target:
            mahasiswa_ditemukan = mhs
            indeks = i
            break
            
    if mahasiswa_ditemukan:
        print(f"\nData ditemukan:")
        print(f"  NIM   : {mahasiswa_ditemukan['NIM']}")
        print(f"  Nama  : {mahasiswa_ditemukan['nama']}")
        print(f"  Nilai : {mahasiswa_ditemukan['nilai_akhir']:.2f} (Grade {mahasiswa_ditemukan['grade']})")
        
        konfirmasi = input(f"Anda yakin ingin menghapus data {mahasiswa_ditemukan['nama']}? (y/n): ").strip().lower()
        
        if konfirmasi == 'y':
            data_list.pop(indeks)
            print(f"Data untuk {mahasiswa_ditemukan['nama']} (NIM: {nim_target}) telah berhasil dihapus.")
        else:
            print("Penghapusan dibatalkan.")
    else:
        print(f"Mahasiswa dengan NIM {nim_target} tidak ditemukan.")
        
    return data_list

# --- Program Utama (Menu Interaktif) ---

def main():
    """Fungsi utama untuk menjalankan program."""
    
    data_saat_ini = proses_semua_data(data_mahasiswa)
    
    while True:
        print("\n" + "=" * 30)
        print("   Sistem Akademik Mahasiswa")
        print("=" * 30)
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Input Data Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi & Terendah")
        print("4. Filter Mahasiswa berdasarkan Grade")
        print("5. Hitung Rata-rata Nilai Kelas")
        print("6. Hapus Data Mahasiswa")
        print("0. Keluar Program")
        print("-" * 30)
        
        pilihan = input("Masukkan pilihan Anda (0-6): ").strip()
        if pilihan == '1':
            tampilkan_tabel(data_saat_ini, title="Data Lengkap Mahasiswa")
        
        elif pilihan == '2':
            mhs_baru = input_mahasiswa_baru()
            data_saat_ini.append(mhs_baru)
            print("Data telah diperbarui.")
            tampilkan_tabel([mhs_baru], title="Data Baru yang Ditambahkan")
        
        elif pilihan == '3':
            cari_terbaik_terendah(data_saat_ini)
            
        elif pilihan == '4':
            filter_by_grade(data_saat_ini)
            
        elif pilihan == '5':
            hitung_rata_rata_kelas(data_saat_ini)
        
        elif pilihan == '6':
            data_saat_ini = hapus_data_mahasiswa(data_saat_ini)
            print("Data telah diperbarui.")
            
        elif pilihan == '0':
            print("\nTerima kasih telah menggunakan program ini. Sampai jumpa!")
            sys.exit()
            
        else:
            print("\nPilihan tidak valid. Silakan masukkan angka antara 0 hingga 6.")

if __name__ == "__main__":
    main()