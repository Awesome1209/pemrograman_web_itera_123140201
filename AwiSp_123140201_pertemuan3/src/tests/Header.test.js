import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

test('renders header with navigation links', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Cek judul
  expect(screen.getByText(/Manajemen Buku Pribadi/i)).toBeInTheDocument();
  
  // Cek link
  expect(screen.getByText('Beranda')).toBeInTheDocument();
  expect(screen.getByText('Tambah Buku')).toBeInTheDocument();
});