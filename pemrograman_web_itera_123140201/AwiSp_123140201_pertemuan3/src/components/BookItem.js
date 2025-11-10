import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import './BookItem.css'; // Kita akan buat file CSS sederhana

const BookItem = ({ book }) => {
  const { deleteBook } = useBooks();

  const getStatusLabel = (status) => {
    switch (status) {
      case 'beli': return 'Ingin Dibeli';
      case 'baca': return 'Sedang Dibaca';
      case 'milik': return 'Dimiliki';
      default: return 'N/A';
    }
  };

  return (
    <div className="book-item">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>oleh {book.author}</p>
      </div>
      <div className="book-status">
         <span className={`status ${book.status}`}>{getStatusLabel(book.status)}</span>
      </div>
      <div className="book-actions">
        <Link to={`/edit/${book.id}`} className="btn-edit">Edit</Link>
        <button onClick={() => deleteBook(book.id)} className="btn-delete">Hapus</button>
      </div>
    </div>
  );
};

export default BookItem;