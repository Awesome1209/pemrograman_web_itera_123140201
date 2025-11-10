import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { useBooks } from '../context/BookContext';

const EditBookPage = () => {
  const { id } = useParams();
  const { getBookById, updateBook } = useBooks();

  const bookToEdit = getBookById(id);

  const handleSubmit = (bookData) => {
    updateBook(id, bookData);
  };

  // Jika buku tidak ditemukan, redirect ke halaman 404
  if (!bookToEdit) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="edit-book-page">
      <h2>Edit Buku</h2>
      <BookForm onSubmit={handleSubmit} initialData={bookToEdit} />
    </div>
  );
};

export default EditBookPage;