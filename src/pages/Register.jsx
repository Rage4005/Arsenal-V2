import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hyperspeed from '../components/Hyperspeed';
import { useAuth } from '../components/AuthContext';
import '../auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { signup, saveUserProfile, loginWithGoogle, logout } = useAuth();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [validity, setValidity] = useState({ username: null, email: null, password: null, confirmPassword: null });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value, validity: inputValidity } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      let isValid = inputValidity.valid;
      if (name === 'username') isValid = isValid && value.length >= 3;
      if (name === 'password') isValid = isValid && value.length >= 6;
      if (name === 'confirmPassword') isValid = isValid && value === newData.password && value.length >= 6;
      // also re-check confirmPassword if password changes
      if (name === 'password' && newData.confirmPassword) {
        setValidity(v => ({...v, confirmPassword: newData.confirmPassword === value}));
      }

      setValidity((prevVal) => ({ ...prevVal, [name]: isValid }));
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUserValid = formData.username.length >= 3;
    const isEmailValid = formData.email.includes('@');
    const isPassValid = formData.password.length >= 6;
    const isConfirmValid = formData.confirmPassword === formData.password;
    
    setValidity({ 
      username: isUserValid, 
      email: isEmailValid,
      password: isPassValid,
      confirmPassword: isConfirmValid
    });
    
    if (isUserValid && isEmailValid && isPassValid && isConfirmValid) {
      try {
        setError('');
        setLoading(true);
        const { user } = await signup(formData.email, formData.password);
        await saveUserProfile(user, formData.username);
        // Log the newly registered user out to force them to login manually
        await logout();
        navigate('/login');
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          setError('This email is already registered. Please login instead.');
        } else {
          setError('Failed to create an account. ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const { user, isNewUser } = await loginWithGoogle();
      
      if (isNewUser) {
        await saveUserProfile(user);
        await logout(); // Force them to login now that they are registered
        navigate('/login');
      } else {
        // They already registered before
        await logout();
        navigate('/login');
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign in cancelled.');
      } else {
        setError('Failed to sign in with Google. ' + err.message);
      }
    } finally {
      setLoading(false);
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
          totalSideLightSticks: 10,
          lightPairsPerRoadWay: 15,
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
        {error && <div className="error-message" style={{color: '#ff4d4d', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '5px', marginBottom: '15px'}}>{error}</div>}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:'absolute',right:'20px',top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,0.7)'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div className={`input-box ${validity.email === false ? 'error' : validity.email === true ? 'success' : ''}`}>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              required 
              value={formData.email}
              onInput={handleInput}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:'absolute',right:'20px',top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,0.7)'}}><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:'absolute',right:'20px',top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,0.7)'}}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <div className={`input-box ${validity.confirmPassword === false ? 'error' : validity.confirmPassword === true ? 'success' : ''}`}>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password" 
              required 
              minLength="6"
              value={formData.confirmPassword}
              onInput={handleInput}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{position:'absolute',right:'20px',top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,0.7)'}}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <div className="terms">
            <label><input type="checkbox" required /> I agree to the terms & conditions</label>
          </div>
          <button type="submit" className="btn" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
          <div className="register-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
          
          <div className="social-login">
            <button type="button" className="social-btn steam" onClick={handleGoogleSignIn} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button type="button" className="social-btn discord">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Continue with Github
            </button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default Register;
