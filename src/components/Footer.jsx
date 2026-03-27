import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Service-Hotline</h3>
          <p>Telefonische Beratung unter:</p>
          <p>+49 (0) 771 / 175 131 69</p>
          <p>
            <span>Montag - Freitag:</span><br />
            <span>08:00 - 12.00 Uhr</span><br />
            <span>13.00 - 17:00 Uhr</span>
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Shop</h3>
          <nav className="footer-nav">
            <a href="#">Games</a>
            <a href="#">Hardware</a>
            <a href="#">Merchandise</a>
            <a href="#">Exclusives</a>
            <a href="#">Online service</a>
          </nav>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Informationen</h3>
          <nav className="footer-nav">
            <a href="#">Download area</a>
            <a href="#">Imprint</a>
            <a href="#">Data protection</a>
            <a href="#">Newsletter</a>
            <a href="#">Shipment</a>
          </nav>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Our Company</h3>
          <nav className="footer-nav">
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </nav>
          <div className="social-links">
            <a href="#" className="social-link"><i className="fas fa-twitter"></i></a>
            <a href="#" className="social-link"><i className="fas fa-facebook"></i></a>
            <a href="#" className="social-link"><i className="fas fa-instagram"></i></a>
            <a href="#" className="social-link"><i className="fas fa-youtube"></i></a>
            <a href="#" className="social-link"><i className="fas fa-discord"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
