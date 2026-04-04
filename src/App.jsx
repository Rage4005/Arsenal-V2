import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ComingSoon from './pages/ComingSoon';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { useAuth } from './components/AuthContext';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync search query with URL params when on games page
  useEffect(() => {
    if (location.pathname === '/games') {
      const params = new URLSearchParams(location.search);
      const q = params.get('search');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, [location]);

  if (!currentUser && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/" replace /> : <Register />} />
      </Routes>
    );
  }

  return (
    <div className="container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games searchQuery={searchQuery} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
