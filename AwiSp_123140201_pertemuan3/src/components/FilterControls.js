import React from 'react';
import './FilterControls.css'; // Kita akan buat file CSS sederhana

const FilterControls = ({ searchTerm, onSearch, statusFilter, onFilterChange }) => {
  return (
    <div className="filter-controls">
      <input
        type="text"
        placeholder="Cari berdasarkan judul atau penulis..."
        value={searchTerm}
        onChange={onSearch}
        className="search-input"
      />
      <select value={statusFilter} onChange={onFilterChange} className="filter-select">
        <option value="semua">Semua Status</option>
        <option value="beli">Ingin Dibeli</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="milik">Dimiliki</option>
      </select>
    </div>
  );
};

export default FilterControls;