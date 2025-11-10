import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import App from './App';
import './index.css'; // Global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BookProvider>
        <App />
      </BookProvider>
    </BrowserRouter>
  </React.StrictMode>
);