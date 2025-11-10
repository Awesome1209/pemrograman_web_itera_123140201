import { render, screen } from '@testing-library/react';
import FilterControls from '../components/FilterControls';

test('renders filter controls with correct values', () => {
  render(
    <FilterControls
      searchTerm="test"
      statusFilter="baca"
      onSearch={() => {}}
      onFilterChange={() => {}}
    />
  );

  // Cek nilai input pencarian
  expect(screen.getByPlaceholderText(/Cari/i)).toHaveValue('test');
  
  // Cek nilai select filter (getByDisplayValue lebih robust)
  expect(screen.getByDisplayValue('Sedang Dibaca')).toBeInTheDocument();
});