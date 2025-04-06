// src/components/CafeList.js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import CafeCard from './CafeCard';

const CafeList = ({ cafes, searchTerm, selectedFilter }) => {
  // Memoize filtered cafes to avoid recalculating on every render
  const filteredCafes = useMemo(() => {
    if (!cafes) return [];
    
    return cafes.filter(cafe => {
      // Filter by search term
      const matchesSearch = cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            cafe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesFilter = selectedFilter === '' || cafe.category === selectedFilter;
      
      // Return true if matches both search and filter
      return matchesSearch && matchesFilter;
    });
  }, [cafes, searchTerm, selectedFilter]);
  
  if (!cafes) {
    return <div className="loading">Loading...</div>;
  }
  
  if (filteredCafes.length === 0) {
    return <div className="no-results">No cafes found matching your criteria.</div>;
  }
  
  return (
    <div className="cafe-list">
      {filteredCafes.map(cafe => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
};

CafeList.propTypes = {
  cafes: PropTypes.array,
  searchTerm: PropTypes.string.isRequired,
  selectedFilter: PropTypes.string.isRequired
};

export default CafeList;