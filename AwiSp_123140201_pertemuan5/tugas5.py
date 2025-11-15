from abc import ABC, abstractmethod

# ABSTRACT CLASS LibraryItem (Persyaratan #1)
class LibraryItem(ABC):
    """
    Abstract base class untuk semua item di perpustakaan.
    Bertindak sebagai 'blueprint' untuk item lain.
    """
    
    def __init__(self, title, item_id):
        self._title = title
        self._item_id = item_id
        self._is_available = True 

    @property
    def title(self):
        """Mendapatkan judul item."""
        return self._title

    @property
    def item_id(self):
        """Mendapatkan ID unik item."""
        return self._item_id

    @property
    def is_available(self):
        """Memeriksa ketersediaan item."""
        return self._is_available

    @abstractmethod
    def get_details(self):
        """
        Method abstract untuk menampilkan detail lengkap item.
        Implementasinya akan bervariasi di tiap subclass (Polymorphism).
        """
        pass

    def __str__(self):
        return f"ID: {self._item_id}, Judul: {self._title}"

# SUBCLASS Book (Persyaratan #2)
class Book(LibraryItem):
    """
    Subclass yang mewarisi dari LibraryItem, merepresentasikan sebuah buku.
    """
    
    def __init__(self, title, item_id, author, isbn):
        super().__init__(title, item_id)
        self._author = author
        self._isbn = isbn

    def get_details(self):
        """Menampilkan detail spesifik untuk buku."""
        return f"[BUKU] ID: {self.item_id} | Judul: {self.title} | Penulis: {self._author} | ISBN: {self._isbn}"

# SUBCLASS Magazine (Persyaratan #2)
class Magazine(LibraryItem):
    """
    Subclass yang mewarisi dari LibraryItem, merepresentasikan sebuah majalah.
    """
    
    def __init__(self, title, item_id, issue_number, publisher):
        super().__init__(title, item_id)
        self._issue_number = issue_number
        self._publisher = publisher

    def get_details(self):
        """Menampilkan detail spesifik untuk majalah."""
        return f"[MAJALAH] ID: {self.item_id} | Judul: {self.title} | Edisi: {self._issue_number} | Penerbit: {self._publisher}"

# CLASS Library (Persyaratan #4)
class Library:
    """
    Class untuk mengelola koleksi item perpustakaan.
    """
    
    def __init__(self):
        self.__items = []
        self.__id_counter = 0 

    def __generate_id(self):
        """Method private untuk membuat ID unik."""
        self.__id_counter += 1
        return self.__id_counter

    def add_book(self, title, author, isbn):
        """Membuat dan menambahkan objek Buku baru ke perpustakaan."""
        new_id = self.__generate_id()
        new_book = Book(title, new_id, author, isbn)
        self.__items.append(new_book)
        print(f"-> Buku '{title}' (ID: {new_id}) berhasil ditambahkan.")

    def add_magazine(self, title, issue, publisher):
        """Membuat dan menambahkan objek Majalah baru ke perpustakaan."""
        new_id = self.__generate_id()
        new_magazine = Magazine(title, new_id, issue, publisher)
        self.__items.append(new_magazine)
        print(f"-> Majalah '{title}' (ID: {new_id}) berhasil ditambahkan.")

    def display_items(self):
        """Menampilkan detail semua item yang ada di perpustakaan."""
        if not self.__items:
            print("\nPerpustakaan masih kosong.")
            return

        print("\n--- Daftar Item di Perpustakaan ---")
        for item in self.__items:
            print(item.get_details())
        print("-----------------------------------")

    def search_item(self, query):
        """Mencari item berdasarkan judul (case-insensitive) atau ID."""
        found_items = []
        query_lower = str(query).lower()

        for item in self.__items:
            if str(item.item_id) == query:
                found_items.append(item)
            elif query_lower in item.title.lower():
                found_items.append(item)
        
        return found_items

if __name__ == "__main__":
    my_library = Library()

    print("===== Sistem Manajemen Perpustakaan Sederhana =====")

    # 1. Fitur: Menambahkan Item
    print("\n[Fitur: Menambahkan Item]")
    my_library.add_book("Python Crash Course", "Eric Matthes", "978-159327")
    my_library.add_magazine("National Geographic", "Vol. 200", "NG Society")
    my_library.add_book("Clean Code", "Robert C. Martin", "978-013235")

    # 2. Fitur: Menampilkan Semua Item
    my_library.display_items()

    # 3. Fitur: Mencari Item (berdasarkan judul)
    print("\n[Fitur: Mencari Item 'code']")
    results_title = my_library.search_item("code")
    if results_title:
        for item in results_title:
            print(f"Ditemukan: {item.get_details()}")
    else:
        print("Item tidak ditemukan.")

    # 4. Fitur: Mencari Item (berdasarkan ID)
    print("\n[Fitur: Mencari Item ID '2']")
    results_id = my_library.search_item("2") # ID "2" adalah National Geographic
    if results_id:
        for item in results_id:
            print(f"Ditemukan: {item.get_details()}")
    else:
        print("Item tidak ditemukan.")

    # 5. Fitur: Mencari Item (tidak ada)
    print("\n[Fitur: Mencari Item 'Java']")
    results_none = my_library.search_item("Java")
    if not results_none:
        print("Item 'Java' tidak ditemukan.")

    print("\n===== Selesai =====")