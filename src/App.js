// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import HomePage from './pages/HomePage';
import CafeDetailPage from './pages/CafeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import './assets/styles/App.css';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="app">
          <Navbar title="Cafe Finder Lampung" />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cafe/:id" element={<CafeDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Cafe Finder Lampung. Semua hak dilindungi.</p>
            <p>UTS Pemrograman Web - React JS</p>
          </footer>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;