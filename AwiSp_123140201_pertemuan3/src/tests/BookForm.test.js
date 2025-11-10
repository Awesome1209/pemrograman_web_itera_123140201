import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookForm from '../components/BookForm';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

test('shows error messages on empty submission', () => {
  const handleSubmit = jest.fn(); // Mock function
  render(
    <BrowserRouter>
      <BookForm onSubmit={handleSubmit} />
    </BrowserRouter>
  );

  // Klik tombol simpan tanpa mengisi form
  fireEvent.click(screen.getByText('Simpan'));

  // Cek apakah error muncul
  expect(screen.getByText('Judul tidak boleh kosong')).toBeInTheDocument();
  expect(screen.getByText('Penulis tidak boleh kosong')).toBeInTheDocument();
  
  // Cek apakah onSubmit tidak dipanggil
  expect(handleSubmit).not.toHaveBeenCalled();
});


test('submits form with valid data', () => {
  const handleSubmit = jest.fN();
  render(
    <BrowserRouter>
      <BookForm onSubmit={handleSubmit} />
    </BrowserRouter>
  );

  // Isi form
  fireEvent.change(screen.getByLabelText(/Judul/i), {
    target: { value: 'Dune' },
  });
  fireEvent.change(screen.getByLabelText(/Penulis/i), {
    target: { value: 'Frank Herbert' },
  });
  fireEvent.change(screen.getByLabelText(/Status/i), {
    target: { value: 'milik' },
  });

  // Klik simpan
  fireEvent.click(screen.getByText('Simpan'));

  // Cek apakah onSubmit dipanggil dengan data yang benar
  expect(handleSubmit).toHaveBeenCalledWith({
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'milik',
  });

  // Cek apakah navigasi dipanggil
  expect(mockedNavigate).toHaveBeenCalledWith('/');
});