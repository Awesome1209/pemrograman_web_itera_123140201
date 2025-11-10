import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Kita akan buat file CSS sederhana

const Header = () => {
  return (
    <header className="app-header">
      <h1>Manajemen Buku Pribadi</h1>
      <nav>
        <NavLink to="/">Beranda</NavLink>
        <NavLink to="/add">Tambah Buku</NavLink>
      </nav>
    </header>
  );
};

export default Header;