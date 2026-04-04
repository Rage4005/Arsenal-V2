import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/assets/arsenal-logo.png" alt="Arsenal Logo" className="footer-logo-img" />
            <div className="footer-logo-text">
              <h2>Arsenal</h2>
              <span>Your Ultimate Gaming Destination</span>
            </div>
          </div>
          <p className="footer-about">
            The world's most advanced digital marketplace for gamers. 
            Experience premium service, instant delivery, and the best prices 
            on your favorite titles.
          </p>
          <div className="social-links-footer">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Discord"><i className="fab fa-discord"></i></a>
            <a href="#" aria-label="Steam"><i className="fab fa-steam"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-nav-group">
          <div className="footer-col">
            <h4>Marketplace</h4>
            <ul>
              <li><Link to="/games">All Games</Link></li>
              <li><Link to="/games?cat=new">New Releases</Link></li>
              <li><Link to="/games?cat=free">Free to Play</Link></li>
              <li><Link to="/coming-soon">Coming Soon</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-newsletter">
          <h4>Join the Arsenal</h4>
          <p>Get exclusive deals and game updates first.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-google-pay"></i>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">&copy; {new Date().getFullYear()} Arsenal Gaming. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
