import React from 'react';
import BookForm from '../components/BookForm';
import { useBooks } from '../context/BookContext';

const AddBookPage = () => {
  const { addBook } = useBooks();

  const handleSubmit = (bookData) => {
    addBook(bookData);
  };

  return (
    <div className="add-book-page">
      <h2>Tambah Buku Baru</h2>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBookPage;