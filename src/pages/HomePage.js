// src/pages/HomePage.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import CafeList from '../components/CafeList';
import LoadingSpinner from '../components/LoadingSpinner';
import { localCafes } from '../data/cafes';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="home-page">
      {/* Hero Section with Background */}
      <div className="hero-section" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1511081692775-05d0f180a065?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '80px 20px',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <h1>Temukan Cafe Terbaik di Bandar Lampung</h1>
        <p className="hero-subtitle">Jelajahi berbagai pilihan cafe untuk nongkrong, bersantai, atau meeting</p>
        
        <div className="hero-search-container">
          <input 
            type="text" 
            className="hero-search-input" 
            placeholder="Cari cafe berdasarkan nama atau lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="hero-search-button">
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
        
        <div className="hero-badges">
          <span className="hero-badge">☕ Coffee Shop</span>
          <span className="hero-badge">🍽️ Cafe & Resto</span>
          <span className="hero-badge">🧁 Dessert Cafe</span>
          <span className="hero-badge">🌄 View Bagus</span>
        </div>
      </div>
      
      {/* Info Banner */}
      <div className="info-banner">
        <div className="info-banner-content">
          <h3>Rekomendasi Cafe dengan Pemandangan Terbaik</h3>
          <p>Temukan cafe dengan view spektakuler untuk pengalaman nongkrong yang berkesan</p>
        </div>
        <button 
          className="info-banner-button"
          onClick={() => setSelectedFilter("Coffee Shop")}
        >
          Lihat Cafe
        </button>
      </div>
      
      <div className="search-filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterOptions 
          cafes={localCafes} 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter} 
        />
      </div>
      
      <CafeList 
        cafes={localCafes} 
        searchTerm={searchTerm} 
        selectedFilter={selectedFilter} 
      />
    </div>
  );
};

export default HomePage;