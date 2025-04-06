// src/pages/FavoritesPage.js
import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import CafeList from '../components/CafeList';
import SearchBar from '../components/SearchBar';
import FilterOptions from '../components/FilterOptions';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Belum Ada Cafe Favorit</h2>
        <p>Anda belum menambahkan cafe ke daftar favorit Anda.</p>
        <Link to="/" className="btn-primary">
          Jelajahi Cafe
        </Link>
      </div>
    );
  }
  
  return (
    <div className="favorites-page">
      <h1>Cafe Favorit Saya</h1>
      
      <div className="search-filter-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterOptions 
          cafes={favorites} 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter} 
        />
      </div>
      
      <CafeList 
        cafes={favorites} 
        searchTerm={searchTerm} 
        selectedFilter={selectedFilter} 
      />
    </div>
  );
};

export default FavoritesPage;