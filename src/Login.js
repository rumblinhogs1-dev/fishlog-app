import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="logo">🎣</div>
      <h1 className="app-title">FishLog</h1>
      <p className="app-subtitle">Your fishing companion</p>
      
      <div className="login-form">
        <input 
          type="email" 
          placeholder="Email address"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
        
        <button className="btn btn-secondary">
          Create Account
        </button>
      </div>
      
      <div className="signup-link">
        Don't have an account? <a href="#signup">Sign up</a>
      </div>
    </div>
  );
}

export default Login;
