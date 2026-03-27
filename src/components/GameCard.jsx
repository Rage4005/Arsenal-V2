import React, { useState, useEffect } from 'react';
import BorderGlow from './BorderGlow';
const GameCard = ({ id, title, image, price, genre, rating, ratingCount }) => {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.find(item => item.id === id)) {
      setInWishlist(true);
    }
  }, [id]);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (inWishlist) {
      wishlist = wishlist.filter(item => item.id !== id);
      setInWishlist(false);
    } else {
      wishlist.push({ id, title, price, image });
      setInWishlist(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Game added to cart!');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <BorderGlow
      className="game-card"
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#1a1a1a" // Match typical dark theme card color, or make it inherit
      borderRadius={16}
      glowRadius={60}
      glowIntensity={2.5}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
    >
      <div className="game-image">
        <img src={image} alt={title} />
        <button 
          className={`wishlist-button ${inWishlist ? 'active' : ''}`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          onClick={toggleWishlist}
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
        >
          <i className="fas fa-heart"></i>
        </button>
        <div className="game-overlay">
          <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
      <div className="game-info">
        <h3>{title}</h3>
        <div className="game-meta">
          <span className="game-genre">{genre}</span>
          <span className="game-price">${price}</span>
        </div>
        <div className="game-rating">
          {[...Array(Math.floor(rating))].map((_, i) => <i key={i} className="fas fa-star"></i>)}
          {rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
          {[...Array(5 - Math.ceil(rating))].map((_, i) => <i key={i} className="far fa-star"></i>)}
          <span>({ratingCount})</span>
        </div>
      </div>
    </BorderGlow>
  );
};

export default GameCard;
