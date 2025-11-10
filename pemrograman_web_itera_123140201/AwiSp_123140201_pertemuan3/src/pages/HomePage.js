import React, { useState, useMemo } from 'react';
import { useBooks } from '../context/BookContext';
import BookList from '../components/BookList';
import FilterControls from '../components/FilterControls';
import { useDebounce } from '../hooks/useDebounce'; // Import custom hook

const HomePage = () => {
  const { books } = useBooks(); // Ambil data dari Context
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');

  // Gunakan hook debounce untuk pencarian
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Gunakan useMemo untuk mengoptimalkan filtering & searching
  const filteredBooks = useMemo(() => {
    let tempBooks = books;

    // 1. Filter berdasarkan Status
    if (statusFilter !== 'semua') {
      tempBooks = tempBooks.filter((book) => book.status === statusFilter);
    }

    // 2. Filter berdasarkan Pencarian (setelah di-debounce)
    if (debouncedSearchTerm) {
      tempBooks = tempBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    return tempBooks;
  }, [books, statusFilter, debouncedSearchTerm]); // Kalkulasi ulang hanya jika dependensi berubah

  return (
    <div className="home-page">
      <h2>Daftar Buku Saya</h2>
      <FilterControls
        searchTerm={searchTerm}
        onSearch={(e) => setSearchTerm(e.target.value)}
        statusFilter={statusFilter}
        onFilterChange={(e) => setStatusFilter(e.target.value)}
      />
      <BookList books={filteredBooks} />
    </div>
  );
};

export default HomePage;