import React, { useState, useEffect, useMemo } from 'react';
import GameCard from '../components/GameCard';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import '../games.css';

const Games = ({ searchQuery = '' }) => {
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(100);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, 'games');
        const querySnapshot = await getDocs(gamesCollection);
        const gamesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGamesData(gamesList);
      } catch (error) {
        console.error("Error fetching games: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const allCategories = useMemo(() => {
    const cats = new Set();
    gamesData.forEach(game => {
      if (game.categories) {
        game.categories.forEach(c => cats.add(c));
      }
    });
    return [...cats].sort();
  }, [gamesData]);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredGames = useMemo(() => {
    let results = gamesData;

    // Filter by search query (matches title, genre, or categories)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(game => {
        const titleMatch = game.title.toLowerCase().includes(q);
        const genreMatch = game.genre?.toLowerCase().includes(q);
        const categoryMatch = game.categories && game.categories.some(c => c.toLowerCase().includes(q));
        return titleMatch || genreMatch || categoryMatch;
      });
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      results = results.filter(game =>
        game.categories && selectedCategories.some(cat => game.categories.includes(cat))
      );
    }

    // Filter by price range
    results = results.filter(game => game.price <= priceRange);

    return results;
  }, [gamesData, searchQuery, selectedCategories, priceRange]);

  if (loading) {
    return (
      <div className="loading-container" style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <div className="loader">Loading Arsenal Catalog...</div>
      </div>
    );
  }

  return (
    <main className="games-catalog">
      <div className="filters">
        {searchQuery && (
          <div className="filter-group search-results-info">
            <h3>Search Results</h3>
            <p className="search-results-count">
              Found <strong>{filteredGames.length}</strong> game{filteredGames.length !== 1 ? 's' : ''} for "<em>{searchQuery}</em>"
            </p>
          </div>
        )}
        <div className="filter-group">
          <h3>Categories</h3>
          <div className="category-checkboxes">
            {allCategories.map(cat => (
              <label key={cat} className={selectedCategories.includes(cat) ? 'active' : ''}>
                <input 
                  type="checkbox" 
                  value={cat} 
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </label>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <h3>Price Range</h3>
          <label htmlFor="price-slider">Adjust Price Range</label>
          <input 
            type="range" 
            id="price-slider" 
            min="0" 
            max="100" 
            value={priceRange} 
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="price-slider" 
            title="Adjust the price range" 
          />
          <span className="price-value">${priceRange}</span>
        </div>
      </div>

      <div className="games-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <GameCard 
              key={game.id}
              id={game.id}
              title={game.title}
              image={game.image}
              price={game.price}
              genre={game.genre}
              rating={game.rating}
              ratingCount={game.ratingCount}
            />
          ))
        ) : (
          <div className="no-results">
            <i className="fas fa-search" style={{ fontSize: '3rem', color: '#555', marginBottom: '15px' }}></i>
            <h3>No games found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Games;
