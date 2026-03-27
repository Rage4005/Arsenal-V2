import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hyperspeed from '../components/Hyperspeed';
import '../auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [validity, setValidity] = useState({ username: null, password: null });

  const handleInput = (e) => {
    const { name, value, validity: inputValidity } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const isValid = inputValidity.valid && value.length >= e.target.minLength;
    setValidity((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isUserValid = formData.username.length >= 3;
    const isPassValid = formData.password.length >= 6;

    setValidity({ username: isUserValid, password: isPassValid });

    if (isUserValid && isPassValid) {
      setTimeout(() => navigate('/'), 200);
    }
  };

  return (
    <div className="auth-body">
      <Hyperspeed
        effectOptions={{
          distortion: 'turbulentDistortion',
          length: 400,
          roadWidth: 20,
          islandWidth: 3,
          lanesPerRoad: 3,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 25,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.15, 0.6],
          lightStickHeight: [1.3, 2.0],
          movingAwaySpeed: [80, 100],
          movingCloserSpeed: [-150, -200],
          carLightsLength: [20, 100],
          carLightsRadius: [0.07, 0.2],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x131318,
            brokenLines: 0x131318,
            leftCars: [0x6366f1, 0x818cf8, 0xa78bfa],
            rightCars: [0x38bdf8, 0x7dd3fc, 0xc084fc],
            sticks: 0x818cf8,
          }
        }}
      />

      <div className="welcome-showcase">
        <h1>Join <span>Arsenal</span></h1>
        <p className="subtitle">Discover, buy, and play over 10,000+ premium games instantly on the ultimate gaming platform.</p>

        <div className="featured-game-card">
          <img src="/assets/Cyberpunk.jpg" alt="Cyberpunk 2077" />
          <div className="featured-info">
            <span className="tag">Free This Week</span>
            <h3>Cyberpunk 2077</h3>
            <p className="price"><strike>$59.99</strike> <span>Free</span></p>
          </div>
        </div>
      </div>

      <div className="wrapper" style={{ zIndex: 1 }}>
        <h1 className="arsenal-title-clean">Arsenal</h1>
        <span className="tagline">Your Ultimate Gaming Destination</span>
        <form onSubmit={handleSubmit}>
          <div className={`input-box ${validity.username === false ? 'error' : validity.username === true ? 'success' : ''}`}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              minLength="3"
              value={formData.username}
              onInput={handleInput}
            />
            <i className="fas fa-user"></i>
          </div>
          <div className={`input-box ${validity.password === false ? 'error' : validity.password === true ? 'success' : ''}`}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength="6"
              value={formData.password}
              onInput={handleInput}
            />
            <i className="fas fa-lock"></i>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" />Remember Me</label>
            <a href="#forgot">Forgot Password</a>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn steam">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button type="button" className="social-btn discord">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Continue with Github
            </button>
          </div>

          <div className="login-footer">
            <Link to="/" className="back-to-home">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
