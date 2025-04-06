// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import PropTypes from 'prop-types';

const Navbar = ({ title }) => {
  const { favorites } = useFavorites();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {title}
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/favorites" className="nav-links">
              Favorites ({favorites.length})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: 'Cafe Finder'
};

export default Navbar;