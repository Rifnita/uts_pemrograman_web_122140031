// src/pages/CafeDetailPage.js
import React, { useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFavorites } from '../context/FavoritesContext';
import { localCafes, generateMenu } from '../data/cafes';

const CafeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  // Find cafe from local data
  const cafe = localCafes.find(cafe => cafe.id === parseInt(id));
  
  // Add menu if not already included
  const cafeWithMenu = cafe ? {
    ...cafe,
    menu: generateMenu(cafe.category)
  } : null;
  
  const isInFavorites = cafeWithMenu && isFavorite && isFavorite(cafeWithMenu.id);
  
  // Use useCallback to memoize the toggle favorite function
  const toggleFavorite = useCallback(() => {
    if (!cafeWithMenu) return;
    
    if (isInFavorites) {
      removeFavorite(cafeWithMenu.id);
    } else {
      addFavorite(cafeWithMenu);
    }
  }, [cafeWithMenu, isInFavorites, addFavorite, removeFavorite]);
  
  const goBack = () => {
    navigate(-1);
  };
  
  if (!cafeWithMenu) return <div className="error-message">Cafe not found</div>;
  
  // Find similar cafes (same category)
  const similarCafes = localCafes
    .filter(c => c.category === cafe.category && c.id !== cafe.id)
    .slice(0, 3);
  
  return (
    <div className="cafe-detail-page">
      <button className="back-button" onClick={goBack}>
        &larr; Kembali
      </button>
      
      <div className="cafe-detail-header">
        <div className="cafe-detail-info">
          <h1>{cafeWithMenu.name}</h1>
          <p className="cafe-category">{cafeWithMenu.category}</p>
          <div className="cafe-rating">
            <span>{"★".repeat(Math.floor(cafeWithMenu.rating))}{"☆".repeat(5 - Math.floor(cafeWithMenu.rating))}</span>
            <span className="rating-number"> {cafeWithMenu.rating}/5</span>
            <span className="cafe-price-range">{cafeWithMenu.priceRange}</span>
          </div>
          <button 
            className={`favorite-btn large ${isInFavorites ? 'active' : ''}`}
            onClick={toggleFavorite}
          >
            {isInFavorites ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
          </button>
        </div>
      </div>
      
      {/* Promo Banner */}
      {cafeWithMenu.promo && (
        <div className="promo-banner">
          <div className="promo-icon">🎁</div>
          <div className="promo-content">
            <h3>{cafeWithMenu.promo.title}</h3>
            <p>{cafeWithMenu.promo.description}</p>
            <span className="promo-validity">Berlaku hingga: {cafeWithMenu.promo.validUntil}</span>
          </div>
        </div>
      )}
      
      <div className="cafe-gallery">
        <div className="main-image">
          <img src={cafeWithMenu.thumbnail} alt={cafeWithMenu.name} />
        </div>
        <div className="thumbnail-gallery">
          {cafeWithMenu.images.slice(0, 4).map((image, index) => (
            <img key={index} src={image} alt={`${cafeWithMenu.name} ${index + 1}`} />
          ))}
        </div>
      </div>
      
      <div className="cafe-content">
        <div className="cafe-description">
          <h2>Tentang Cafe</h2>
          <p>{cafeWithMenu.description}</p>
          
          {/* Facilities */}
          <div className="cafe-facilities">
            <h3>Fasilitas</h3>
            <div className="facilities-list">
              {cafeWithMenu.facilities.wifi && (
                <div className="facility-item">
                  <span className="facility-icon">📶</span>
                  <span className="facility-name">Free WiFi</span>
                </div>
              )}
              {cafeWithMenu.facilities.powerOutlet && (
                <div className="facility-item">
                  <span className="facility-icon">🔌</span>
                  <span className="facility-name">Power Outlet</span>
                </div>
              )}
              {cafeWithMenu.facilities.parking && (
                <div className="facility-item">
                  <span className="facility-icon">🅿️</span>
                  <span className="facility-name">Parkir Luas</span>
                </div>
              )}
              {cafeWithMenu.facilities.outdoorSeating && (
                <div className="facility-item">
                  <span className="facility-icon">🪑</span>
                  <span className="facility-name">Outdoor Seating</span>
                </div>
              )}
              {cafeWithMenu.views && (
                <div className="facility-item">
                  <span className="facility-icon">🌄</span>
                  <span className="facility-name">Pemandangan Indah</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="cafe-details">
          <div className="cafe-detail-item">
            <h3>Alamat</h3>
            <p>{cafeWithMenu.address}</p>
          </div>
          
          <div className="cafe-detail-item">
            <h3>Jam Buka</h3>
            <p>{cafeWithMenu.openingHours}</p>
          </div>
          
          {/* Peak Hours */}
          <div className="peak-hours-info">
            <h3>Jam Ramai</h3>
            <div className="peak-hours-details">
              <div className="peak-hour-item">
                <span className="day-label">Weekday:</span>
                <span className="hour-value">{cafeWithMenu.peakHours.weekday}</span>
              </div>
              <div className="peak-hour-item">
                <span className="day-label">Weekend:</span>
                <span className="hour-value">{cafeWithMenu.peakHours.weekend}</span>
              </div>
              <p className="peak-hours-tip">
                Tip: Kunjungi di luar jam sibuk untuk mendapatkan tempat yang nyaman
              </p>
            </div>
          </div>
        </div>
        
        <div className="cafe-menu">
          <h2>Menu Pilihan</h2>
          <div className="menu-items">
            {cafeWithMenu.menu.map((item, index) => (
              <div key={index} className="menu-item">
                <h4>{item.name}</h4>
                <p className="menu-item-description">{item.description}</p>
                <p className="menu-item-price">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Location Map */}
      <div className="cafe-map">
        <h2>Lokasi</h2>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.75772082225!2d105.21929865823394!3d-5.402944423725638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40db8de2c1797f%3A0xbe3b8c9e75785fbd!2sBandar%20Lampung%2C%20Kota%20Bandar%20Lampung%2C%20Lampung!5e0!3m2!1sid!2sid!4v1716969325079!5m2!1sid!2sid" 
          width="100%" 
          height="300" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title={`Lokasi ${cafeWithMenu.name}`}
        ></iframe>
      </div>
      
      {/* Reviews */}
      <div className="cafe-reviews">
        <h2>Ulasan Pengunjung</h2>
        
        <div className="review-card">
          <div className="reviewer">
            <img 
              className="reviewer-avatar" 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Reviewer" 
            />
            <div>
              <div className="reviewer-name">Putri Wijaya</div>
              <div className="review-date">2 minggu yang lalu</div>
            </div>
          </div>
          <div className="review-rating">{"★".repeat(5)}</div>
          <p>Tempatnya nyaman, kopinya enak! Recommended buat yang mau ngerjain tugas atau meeting santai. WiFi kenceng dan banyak colokan.</p>
        </div>
        
        <div className="review-card">
          <div className="reviewer">
            <img 
              className="reviewer-avatar" 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Reviewer" 
            />
            <div>
              <div className="reviewer-name">Budi Santoso</div>
              <div className="review-date">1 bulan yang lalu</div>
            </div>
          </div>
          <div className="review-rating">{"★".repeat(4)}</div>
          <p>Suka banget sama suasananya, pas banget buat nongkrong. Harga masih terjangkau. Menu favorit saya es kopi susu gula aren.</p>
        </div>
      </div>
      
      {/* Similar Cafes */}
      <div className="similar-cafes">
        <h2>Cafe Serupa di Bandar Lampung</h2>
        <div className="similar-cafes-list">
          {similarCafes.map(similarCafe => (
            <Link to={`/cafe/${similarCafe.id}`} key={similarCafe.id} className="similar-cafe-card">
              <div className="similar-cafe-image">
                <img src={similarCafe.thumbnail} alt={similarCafe.name} />
              </div>
              <div className="similar-cafe-info">
                <div className="similar-cafe-name">{similarCafe.name}</div>
                <div className="similar-cafe-category">{similarCafe.category}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CafeDetailPage;