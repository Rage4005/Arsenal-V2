import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SmallGameCard from '../components/SmallGameCard';
import { homePageGames, popularThisWeek, frequentlyBought, mostlyPlayed } from '../gamesData';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-slider">
          <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`}>
            <div className="hero-content">
              <h1 className="hero-title">Marvel's Spider-Man 2</h1>
              <p className="hero-description">
                Peter Parker and Miles Morales return for an exciting new adventure
                in Marvel's Spider-Man 2!
              </p>
              <button className="cta-button">Pre-order Now</button>
            </div>
            <div className="hero-background" style={{ backgroundImage: "url('assets/spd 2.jpeg')" }}></div>
          </div>

          <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`}>
            <div className="hero-content">
              <h1 className="hero-title">Cyberpunk 2077</h1>
              <p className="hero-description">
                Enter the futuristic world of Night City in this groundbreaking RPG
                where your choices shape the story.
              </p>
              <button className="cta-button">Buy Now</button>
            </div>
            <div className="hero-background" style={{ backgroundImage: "url('assets/Cyberpunk.jpg')" }}></div>
          </div>

          <div className={`hero-slide ${currentSlide === 2 ? 'active' : ''}`}>
            <div className="hero-content">
              <h1 className="hero-title">Elden Ring</h1>
              <p className="hero-description">
                Journey through the vast lands of the Lands Between in this epic
                action RPG from FromSoftware.
              </p>
              <button className="cta-button">Buy Now</button>
            </div>
            <div className="hero-background" style={{ backgroundImage: "url('assets/Elden ring.jpeg')" }}></div>
          </div>

          <div className={`hero-slide ${currentSlide === 3 ? 'active' : ''}`}>
            <div className="hero-content">
              <h1 className="hero-title">Ghost of Tsushima</h1>
              <p className="hero-description">
                Experience the beauty and brutality of feudal Japan in this
                stunning open-world adventure.
              </p>
              <button className="cta-button">Buy Now</button>
            </div>
            <div className="hero-background" style={{ backgroundImage: "url('assets/Ghost of thushima.png')" }}></div>
          </div>
        </div>
        <div className="slider-dots">
          {[...Array(slidesCount)].map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      <main className="main-content">
        <section className="newest-listings">
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
              <i className="fas fa-laptop"></i>
              <span>PC & Mobile</span>
              <span className="item-count">(202 items)</span>
            </div>
            <div className="category-card">
              <i className="fas fa-box"></i>
              <span>Bundles</span>
              <span className="item-count">(202 items)</span>
            </div>
            <div className="category-card">
              <i className="fas fa-gamepad"></i>
              <span>Games</span>
              <span className="item-count">(202 items)</span>
            </div>
            <div className="category-card">
              <i className="fas fa-headphones"></i>
              <span>Accessories</span>
              <span className="item-count">(202 items)</span>
            </div>
          </div>

          <div className="platform-bar">
            {/* Example matching the HTML */}
            <div className="platform-item">
              <svg
                className="platform-logo"
                width="90"
                height="30"
                viewBox="0 0 90 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Paths left out for brevity unless we have the original, in the original it was just commented out or empty */}
              </svg>
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
                platforms={game.platforms}
              />
            ))}
          </div>
        </section>

        <section className="top-lists-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', margin: '60px 0' }}>
          <div className="top-list-column">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Top Sellers <i className="fas fa-chevron-right" style={{ fontSize: '14px', color: '#a0a0a0' }}></i>
            </h3>
            <div className="top-list-items" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {popularThisWeek.slice(0, 5).map(game => (
                <SmallGameCard key={game.id} title={game.title} image={game.image} price={game.price} />
              ))}
            </div>
          </div>

          <div className="top-list-column">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Top Free to Play <i className="fas fa-chevron-right" style={{ fontSize: '14px', color: '#a0a0a0' }}></i>
            </h3>
            <div className="top-list-items" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {frequentlyBought.slice(0, 5).map(game => (
                <SmallGameCard key={game.id} title={game.title} image={game.image} price={0} isFree={true} />
              ))}
            </div>
          </div>

          <div className="top-list-column">
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              Top Upcoming Wishlisted <i className="fas fa-chevron-right" style={{ fontSize: '14px', color: '#a0a0a0' }}></i>
            </h3>
            <div className="top-list-items" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {mostlyPlayed.slice(0, 5).map(game => (
                <SmallGameCard key={game.id} title={game.title} image={game.image} price={game.price} />
              ))}
            </div>
          </div>
        </section>

        <section className="popular-this-week" style={{ marginTop: '40px' }}>
          <div className="section-header">
            <h2 className="section-title">Popular Games This Week</h2>
            <button className="show-all-button">Show all</button>
          </div>
          <div className="product-grid">
            {popularThisWeek.map(game => (
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
        </section>

        <section className="frequently-bought" style={{ marginTop: '40px' }}>
          <div className="section-header">
            <h2 className="section-title">Frequently Bought</h2>
            <button className="show-all-button">Show all</button>
          </div>
          <div className="product-grid">
            {frequentlyBought.map(game => (
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
        </section>

        <section className="mostly-played" style={{ marginTop: '40px' }}>
          <div className="section-header">
            <h2 className="section-title">Mostly Played</h2>
            <button className="show-all-button">Show all</button>
          </div>
          <div className="product-grid">
            {mostlyPlayed.map(game => (
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
        </section>
      </main>
    </>
  );
};

export default Home;
