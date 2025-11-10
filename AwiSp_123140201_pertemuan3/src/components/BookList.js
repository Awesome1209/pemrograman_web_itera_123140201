import React from 'react';
import BookItem from './BookItem';
import './BookList.css'; // Kita akan buat file CSS sederhana

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p className="empty-message">Tidak ada buku yang cocok dengan kriteria Anda.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;