// src/components/SearchBar.js
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    <div className="search-container">
      <div className="search-icon" style={{ 
        position: 'absolute', 
        left: '15px', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        color: '#8B4513' 
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        style={{ paddingLeft: '40px' }}
        placeholder="Cari berdasarkan nama, lokasi, atau kategori..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button 
          className="clear-search"
          onClick={() => setSearchTerm('')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired
};

export default SearchBar;