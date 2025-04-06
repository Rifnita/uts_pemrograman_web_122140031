// src/context/FavoritesContext.js
import { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Create context
const FavoritesContext = createContext();

// Context provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add cafe to favorites
  const addFavorite = useCallback((cafe) => {
    setFavorites(prev => {
      // Check if cafe is already in favorites
      if (!prev.some(item => item.id === cafe.id)) {
        return [...prev, cafe];
      }
      return prev;
    });
  }, []);

  // Remove cafe from favorites
  const removeFavorite = useCallback((cafeId) => {
    setFavorites(prev => prev.filter(cafe => cafe.id !== cafeId));
  }, []);

  // Check if a cafe is in favorites
  const isFavorite = useCallback((cafeId) => {
    return favorites.some(cafe => cafe.id === cafeId);
  }, [favorites]);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};