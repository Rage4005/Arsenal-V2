import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(items);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title: item.title, price: item.price, image: item.image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Game added to cart!');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <main className="main-content">
      <section className="wishlist-section">
        <div className="section-header">
          <h2 className="section-title">My Wishlist</h2>
        </div>
        <div className="wishlist-grid" id="wishlistGrid">
          {wishlist.length === 0 ? (
            <p className="empty-wishlist">Your wishlist is empty</p>
          ) : (
            wishlist.map((item) => (
              <article key={item.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={item.image} alt={item.title} className="product-image" />
                  <button className="wishlist-button active" onClick={() => removeFromWishlist(item.id)}>
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{item.title}</h3>
                  <p className="product-price">${item.price}</p>
                  <button className="add-to-cart-button" onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Wishlist;
