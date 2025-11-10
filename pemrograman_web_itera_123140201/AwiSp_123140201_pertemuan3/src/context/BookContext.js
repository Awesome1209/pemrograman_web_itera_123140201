import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid'; // install: npm install uuid

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);

  // Tambah buku baru
  const addBook = (bookData) => {
    const newBook = { id: uuidv4(), ...bookData };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  // Update buku berdasarkan ID
  const updateBook = (id, updatedData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedData } : book
      )
    );
  };

  // Hapus buku berdasarkan ID
  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  // Ambil satu buku berdasarkan ID (untuk halaman edit)
  const getBookById = (id) => {
    return books.find((book) => book.id === id);
  };

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};