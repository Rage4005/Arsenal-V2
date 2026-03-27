import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { gamesData } from '../gamesData';

const Profile = () => {
  const [purchasedGames, setPurchasedGames] = useState([]);

  useEffect(() => {
    // Try to load any purchased games from localStorage, or use a mock library
    const saved = JSON.parse(localStorage.getItem('purchasedGames')) || gamesData.slice(0, 3);
    setPurchasedGames(saved);
  }, []);

  return (
    <main className="profile-page" style={{ padding: '40px', minHeight: '80vh' }}>
      <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', background: 'var(--glass-bg)', padding: '30px', borderRadius: '12px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: 'white' }}>
          <i className="fas fa-user"></i>
        </div>
        <div className="user-info">
          <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '32px', marginBottom: '8px' }}>ArmanGamer</h1>
          <p style={{ color: 'var(--gray-100)', opacity: 0.8 }}>arman@example.com</p>
          <p style={{ color: 'var(--orange-light)', fontSize: '14px', marginTop: '4px' }}>Member since 2026</p>
        </div>
      </div>

      <section className="my-library">
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <h2 className="section-title" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '24px' }}>My Library ({purchasedGames.length})</h2>
        </div>
        
        {purchasedGames.length > 0 ? (
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {purchasedGames.map(game => (
              <ProductCard 
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                discount={game.discount}
                currentPrice={game.price}
                originalPrice={game.originalPrice}
                platforms={game.platforms}
              />
            ))}
          </div>
        ) : (
          <div className="empty-library" style={{ textAlign: 'center', padding: '40px', background: 'var(--gray-800)', borderRadius: '8px' }}>
            <p>You haven't bought any games yet.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
