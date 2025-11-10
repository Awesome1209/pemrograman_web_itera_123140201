import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookForm.css'; // Kita akan buat file CSS sederhana

const BookForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('beli'); // 'beli', 'baca', 'milik'
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Isi form jika initialData ada (untuk mode edit)
  useEffect(() => {
    if (initialData.id) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setStatus(initialData.status);
    }
  }, [initialData]);

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Judul tidak boleh kosong';
    if (!author.trim()) newErrors.author = 'Penulis tidak boleh kosong';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ title, author, status });
      // Reset form (jika bukan mode edit)
      if (!initialData.id) {
        setTitle('');
        setAuthor('');
        setStatus('beli');
      }
      navigate('/'); // Kembali ke beranda setelah submit
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label>Judul:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label>Penulis:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="milik">Sudah Dimiliki</option>
        </select>
      </div>
      <button type="submit" className="btn-submit">Simpan</button>
    </form>
  );
};

export default BookForm;