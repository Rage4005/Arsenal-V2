import React, { useState, useEffect } from 'react';
import BorderGlow from './BorderGlow';

const ProductCard = ({ id, title, image, discount, currentPrice, originalPrice, platforms }) => {
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (wishlist.find(item => item.id === id)) {
      setInWishlist(true);
    }
  }, [id]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (inWishlist) {
      wishlist = wishlist.filter(item => item.id !== id);
      setInWishlist(false);
    } else {
      wishlist.push({ id, title, price: currentPrice, image });
      setInWishlist(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    // Dispatch custom event if we want other components to know
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <BorderGlow
      className="product-card"
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="transparent"
      borderRadius={8}
      glowRadius={60}
      glowIntensity={2.5}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
    >
      <div className="product-image-wrapper">
        <img src={image} alt={title} className="product-image" />
        {discount && <div className="discount-badge">{discount}</div>}
        <button 
          className={`wishlist-button ${inWishlist ? 'active' : ''}`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          onClick={toggleWishlist}
        >
          <i className="fas fa-heart"></i>
        </button>
        <h3 className="product-title">{title}</h3>
      </div>
      <div className="product-actions">
        <button className="add-to-cart-button">Add To Cart</button>
        <div className="price-tag">
          <span className="current-price">{currentPrice}$</span>
          {originalPrice && <span className="original-price">{originalPrice}$</span>}
        </div>
      </div>
    </BorderGlow>
  );
};

export default ProductCard;
