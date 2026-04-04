import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SmallGameCard from '../components/SmallGameCard';
import { db } from '../firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const slidesCount = 4;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, 'games');
        const querySnapshot = await getDocs(gamesCollection);
        const gamesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGames(gamesList);
      } catch (error) {
        console.error("Error fetching games: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Derived collections
  const popularThisWeek = games.filter(g => g.categories?.includes('popular')).slice(0, 4);
  const frequentlyBought = games.filter(g => g.categories?.includes('frequently-bought')).slice(0, 4);
  const mostlyPlayed = games.filter(g => g.categories?.includes('mostly-played')).slice(0, 4);
  
  // Specific sections for the lists
  const topSellers = [...games].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
  const topFree = games.filter(g => g.price === 0).slice(0, 5);
  const mustPlay = games.filter(g => g.categories?.includes('must-play') || g.rating >= 4.8).slice(0, 5);
  
  // Physical listings (bottom section)
  const homePageGames = games.slice(0, 7);

  if (loading) {
    return (
      <div className="loading-container" style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <div className="loader">Loading Arsenal Catalog...</div>
      </div>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="hero-slider">
          {/* Hero slides can also be dynamic, but for now we keep the top 4 games as slides */}
          {games.slice(0, 4).map((game, index) => (
            <div key={game.id} className={`hero-slide ${currentSlide === index ? 'active' : ''}`}>
              <div className="hero-content">
                <h1 className="hero-title">{game.title}</h1>
                <p className="hero-description">{game.genre}</p>
                <button className="cta-button">Buy Now</button>
              </div>
              <div className="hero-background" style={{ backgroundImage: `url('${game.image}')` }}></div>
            </div>
          ))}
          {games.length === 0 && (
            <div className="hero-slide active">
              <div className="hero-content">
                <h1 className="hero-title">Welcome to Arsenal</h1>
                <p className="hero-description">The ultimate destination for gamers.</p>
                <button className="cta-button" onClick={() => window.location.href='/admin'}>Go to Admin to add games</button>
              </div>
              <div className="hero-background" style={{ background: '#1a1a2e' }}></div>
            </div>
          )}
        </div>
        {games.length > 0 && (
          <div className="slider-dots">
            {games.slice(0, 4).map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        )}
      </section>

    <main className="main-content">
        {/* 1. Popular Games (High Performance Grid) */}
        {popularThisWeek.length > 0 && (
          <section className="popular-this-week" style={{ marginBottom: '60px' }}>
            <div className="section-header">
              <h2 className="section-title">Popular Games This Week</h2>
            </div>
            <div className="product-grid">
              {popularThisWeek.map(game => (
                <ProductCard key={game.id} {...game} currentPrice={game.price} />
              ))}
            </div>
          </section>
        )}

        {/* 2. Top Lists (Mini Columns) */}
        <section className="top-lists-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', margin: '60px 0' }}>
          <div className="top-list-column">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Top Rated <i className="fas fa-chevron-right" style={{ fontSize: '14px', color: '#a0a0a0' }}></i>
            </h3>
            <div className="top-list-items" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {topSellers.map(game => (
                <SmallGameCard key={game.id} title={game.title} image={game.image} price={game.price} />
              ))}
            </div>
          </div>

          <div className="top-list-column">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Top Free to Play <i className="fas fa-chevron-right" style={{ fontSize: '14px', color: '#a0a0a0' }}></i>
            </h3>
            <div className="top-list-items" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {topFree.map(game => (
                <SmallGameCard key={game.id} title={game.title} image={game.image} price={0} isFree={true} />
              ))}
              {topFree.length === 0 && <p style={{ color: '#555', fontSize: '14px' }}>Wait for upcoming drops...</p>}
            </div>
          </div>

          <div className="top-list-column">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Must Play <i className="fas fa-chevron-right" style={{ fontSize: '14px', color: '#a0a0a0' }}></i>
            </h3>
            <div className="top-list-items" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {mustPlay.map(game => (
                <SmallGameCard key={game.id} title={game.title} image={game.image} price={game.price} />
              ))}
              {mustPlay.length === 0 && <p style={{ color: '#555', fontSize: '14px' }}>Stay tuned for new releases!</p>}
            </div>
          </div>
        </section>

        {/* 3. Physical Listings (Secondary Collections) */}
        <section className="newest-listings" style={{ borderTop: '1px solid #1a1a2e', paddingTop: '40px' }}>
          <div className="section-header">
            <h2 className="section-title">Newest physical listings</h2>
            <button className="show-all-button">Show all</button>
          </div>

          <div className="category-grid">
            <div className="category-card">
              <i className="fas fa-gamepad"></i>
              <span>Consoles</span>
              <span className="item-count">(202 items)</span>
            </div>
            <div className="category-card">
              <i className="fas fa-headphones"></i>
              <span>Accessories</span>
              <span className="item-count">(202 items)</span>
            </div>
          </div>

          <div className="product-grid">
            {homePageGames.map(game => (
              <ProductCard 
                key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                discount={game.discount}
                currentPrice={game.price}
                originalPrice={game.originalPrice}
              />
            ))}
            {homePageGames.length === 0 && <p style={{ color: '#aaa' }}>No games available yet.</p>}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
