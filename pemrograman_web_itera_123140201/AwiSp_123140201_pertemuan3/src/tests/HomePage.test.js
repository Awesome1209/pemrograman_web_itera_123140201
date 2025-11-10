import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import HomePage from '../pages/HomePage';

// Data mock
const mockBooks = [
  { id: '1', title: 'Buku A', author: 'Penulis A', status: 'milik' },
  { id: '2', title: 'Buku B', author: 'Penulis B', status: 'baca' },
  { id: '3', title: 'Buku C', author: 'Penulis C', status: 'beli' },
];

// Helper untuk render dengan provider
const renderHomePage = (books) => {
  return render(
    <BrowserRouter>
      <BookContext.Provider value={{ books }}>
        <HomePage />
      </BookContext.Provider>
    </BrowserRouter>
  );
};

// Mock useDebounce agar test tidak perlu menunggu 300ms
jest.mock('../hooks/useDebounce', () => ({
  useDebounce: (value) => value, // Langsung kembalikan nilai, tidak usah delay
}));

test('filters books by status', () => {
  renderHomePage(mockBooks);

  // Ubah filter ke "Sedang Dibaca"
  fireEvent.change(screen.getByDisplayValue('Semua Status'), {
    target: { value: 'baca' },
  });

  // Harusnya hanya Buku B yang tampil
  expect(screen.getByText('Buku B')).toBeInTheDocument();
  expect(screen.queryByText('Buku A')).not.toBeInTheDocument();
  expect(screen.queryByText('Buku C')).not.toBeInTheDocument();
});

test('filters books by search term', () => {
  renderHomePage(mockBooks);
  
  // Cari "Buku A"
  fireEvent.change(screen.getByPlaceholderText(/Cari/i), {
    target: { value: 'Buku A' },
  });

  // Harusnya hanya Buku A yang tampil
  expect(screen.getByText('Buku A')).toBeInTheDocument();
  expect(screen.queryByText('Buku B')).not.toBeInTheDocument();
  expect(screen.queryByText('Buku C')).not.toBeInTheDocument();
});