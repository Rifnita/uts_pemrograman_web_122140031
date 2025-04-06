// src/components/CafeCard.js
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFavorites } from '../context/FavoritesContext';

const CafeCard = ({ cafe }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isInFavorites = isFavorite && isFavorite(cafe.id);
  
  const toggleFavorite = useCallback((e) => {
    e.preventDefault();
    
    if (isInFavorites) {
      removeFavorite(cafe.id);
    } else {
      addFavorite(cafe);
    }
  }, [cafe, isInFavorites, addFavorite, removeFavorite]);
  
  // Menentukan badge untuk cafe
  const getBadge = () => {
    if (cafe.rating >= 4.6) return "TOP RATED";
    if (cafe.views) return "VIEW BAGUS";
    if (cafe.category === "Student Friendly") return "UNTUK MAHASISWA";
    if (cafe.priceRange === "$") return "HARGA TERJANGKAU";
    return null;
  };
  
  // Menentukan fitur cafe
  const getFeatures = () => {
    const features = [];
    
    if (cafe.facilities) {
      if (cafe.facilities.wifi) {
        features.push({ icon: "📶", name: "Free WiFi" });
      }
      
      if (cafe.facilities.powerOutlet) {
        features.push({ icon: "🔌", name: "Power Outlet" });
      }
    }
    
    // Fitur berdasarkan lokasi
    if (cafe.address && cafe.address.includes("Teluk Betung")) {
      features.push({ icon: "🌊", name: "Dekat Pantai" });
    }
    
    // Fitur berdasarkan view
    if (cafe.views) {
      features.push({ icon: "🌄", name: "View Bagus" });
    }
    
    return features;
  };
  
  const badge = getBadge();
  const features = getFeatures();
  
  return (
    <div className="cafe-card">
      <Link to={`/cafe/${cafe.id}`} className="cafe-link">
        <div className="cafe-image">
          <img src={cafe.thumbnail} alt={cafe.name} />
          {badge && <span className="cafe-badge">{badge}</span>}
          <button 
            className={`favorite-btn ${isInFavorites ? 'active' : ''}`}
            onClick={toggleFavorite}
          >
            {isInFavorites ? '★' : '☆'}
          </button>
        </div>
        <div className="cafe-info">
          <h3>{cafe.name}</h3>
          <p className="cafe-category">{cafe.category}</p>
          <div className="cafe-rating">
            <span>{"★".repeat(Math.floor(cafe.rating))}{"☆".repeat(5 - Math.floor(cafe.rating))}</span>
            <span className="rating-number"> {cafe.rating}/5</span>
            <span className="cafe-price">{cafe.priceRange}</span>
          </div>
          
          <div className="cafe-features">
            {features.map((feature, index) => (
              <span key={index} className="cafe-feature">
                <span>{feature.icon}</span> {feature.name}
              </span>
            ))}
          </div>
          
          <p className="cafe-address">{cafe.address.substring(0, 30)}...</p>
        </div>
      </Link>
    </div>
  );
};

CafeCard.propTypes = {
  cafe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    priceRange: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    address: PropTypes.string,
    facilities: PropTypes.object,
    views: PropTypes.bool
  }).isRequired
};

export default CafeCard;