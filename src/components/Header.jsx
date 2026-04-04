import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import MetallicPaint from './MetallicPaint';

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/" className="logo-container" style={{ textDecoration: 'none' }}>
          <div className="logo-metallic" style={{ width: '50px', height: '50px' }}>
            <MetallicPaint
              imageSrc="/assets/arsenal-logo.png"
              seed={42}
              scale={1.2}
              patternSharpness={1.25}
              noiseScale={0.3}
              speed={0.2}
              liquid={0.6}
              mouseAnimation={true}
              brightness={1.5}
              contrast={0.6}
              refraction={0.005}
              blur={0.01}
            />
          </div>
          <div className="logo-text">
            <h1>Arsenal</h1>
            <span className="logo-tagline">Your Ultimate Gaming Destination</span>
          </div>
        </Link>
      </div>
      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} end>Home</NavLink>
        <NavLink to="/games" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>Games</NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>Wishlist</NavLink>
        <NavLink to="/coming-soon" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''} nav-link--coming-soon`}>
          Coming Soon <span className="soon-tag">New!</span>
        </NavLink>
      </nav>
      <div className="header-actions">
        <div className="search-bar">
          <i className="fas fa-search" onClick={handleSearchClick} style={{ cursor: 'pointer' }}></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search games..." 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <div className="user-actions">
          {currentUser && (
            <Link to="/profile" className="icon-button" title="User Profile">
              <i className="fas fa-user-circle"></i>
            </Link>
          )}
          <Link to="/wishlist" className="icon-button" title="Wishlist">
            <i className="fas fa-heart"></i>
          </Link>
          <Link to="/cart" className="icon-button" title="Shopping Cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          {currentUser ? (
            <Link to="/" onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </Link>
          ) : (
            <Link to="/login" className="logout-button" style={{ background: 'var(--accent-purple)' }}>
              <i className="fas fa-sign-in-alt"></i>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
