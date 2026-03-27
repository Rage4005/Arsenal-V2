import React, { useState } from 'react';
import '../coming-soon.css';

const NotifyButton = () => {
  const [notified, setNotified] = useState(false);

  const handleClick = () => {
    setNotified(true);
    setTimeout(() => {
      setNotified(false);
    }, 2000);
  };

  return (
    <button 
      className={`notify-btn ${notified ? 'notified' : ''}`}
      onClick={handleClick}
      disabled={notified}
    >
      {notified ? 'Notification Set!' : 'Notify Me'}
    </button>
  );
};

const ComingSoon = () => {
  return (
    <main className="main-content coming-soon-content">
      <section className="coming-soon-hero">
        <h1>Upcoming Releases</h1>
        <p>Get ready for these amazing titles coming to Arsenal</p>
      </section>

      <section className="coming-soon-grid">
        <article className="coming-soon-card">
          <div className="coming-soon-image">
            <img src="/assets/t8.gif" alt="Tekken 8" />
            <div className="release-date">March 2025</div>
          </div>
          <div className="coming-soon-details">
            <h3>Tekken 8</h3>
            <p>The next evolution in fighting games. Experience the most ambitious Tekken yet.</p>
            <div className="price-tag">$59.99</div>
            <NotifyButton />
          </div>
        </article>

        <article className="coming-soon-card">
          <div className="coming-soon-image">
            <img src="/assets/Grand Theft Auto Gta6 GIF by GIPHY Gaming.gif" alt="GTA VI" />
            <div className="release-date">Late 2025</div>
          </div>
          <div className="coming-soon-details">
            <h3>Grand Theft Auto VI</h3>
            <p>Return to Vice City in the most anticipated game of the decade.</p>
            <div className="price-tag">$69.99</div>
            <NotifyButton />
          </div>
        </article>

        <article className="coming-soon-card">
          <div className="coming-soon-image">
            <img src="/assets/Ichigo Kurosaki Mask GIF by Xbox.gif" alt="BLEACH rebirth of Souls" />
            <div className="release-date">April 2025</div>
          </div>
          <div className="coming-soon-details">
            <h3>BLEACH Rebirth of Souls</h3>
            <p>Bankai: Katen Kyōkotsu Karamatsu Shinjū — where every move is a deadly play in BLEACH: Rebirth of Souls</p>
            <div className="price-tag">$69.99</div>
            <NotifyButton />
          </div>
        </article>
      </section>
    </main>
  );
};

export default ComingSoon;
