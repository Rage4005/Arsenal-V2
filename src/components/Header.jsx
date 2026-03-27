import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

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

  return (
    <header className="main-header">
      <div className="logo">
        <div className="logo-container">
          <div className="logo-icon">
            <i className="fas fa-gamepad"></i>
          </div>
          <div className="logo-text">
            <h1>Arsenal</h1>
            <span className="logo-tagline">Your Ultimate Gaming Destination</span>
          </div>
        </div>
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
          <Link to="/profile" className="icon-button" title="User Profile">
            <i className="fas fa-user-circle"></i>
          </Link>
          <Link to="/wishlist" className="icon-button" title="Wishlist">
            <i className="fas fa-heart"></i>
          </Link>
          <Link to="/cart" className="icon-button" title="Shopping Cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link to="/login" className="logout-button">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
