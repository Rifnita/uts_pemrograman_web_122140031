// src/components/FilterOptions.js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const FilterOptions = ({ cafes, selectedFilter, setSelectedFilter }) => {
  // Memoize the categories to avoid recalculating on each render
  const categories = useMemo(() => {
    if (!cafes) return [];
    
    // Get unique categories from cafe data
    const uniqueCategories = [...new Set(cafes.map(cafe => cafe.category))];
    return uniqueCategories.sort();
  }, [cafes]);
  
  return (
    <div className="filter-container">
      <h3>Filter Berdasarkan Kategori</h3>
      <div className="filter-options">
        <button 
          className={`filter-btn ${selectedFilter === '' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('')}
        >
          Semua
        </button>
        
        {categories.map(category => (
          <button 
            key={category}
            className={`filter-btn ${selectedFilter === category ? 'active' : ''}`}
            onClick={() => setSelectedFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

FilterOptions.propTypes = {
  cafes: PropTypes.array,
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired
};

export default FilterOptions;