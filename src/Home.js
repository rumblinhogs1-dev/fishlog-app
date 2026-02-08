import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Header */}
      <div className="header">
        <h1>Today's Fishing</h1>
      </div>

      {/* Main Content */}
      <div className="content">
        {/* Log Catch Button */}
        <button className="log-catch-btn" onClick={() => navigate('/log')}>
          📸 Log a Catch
        </button>

        {/* Stats Card */}
        <div className="stats-card">
          <div className="stats-header">This Month</div>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">23</div>
              <div className="stat-label">Catches</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Species</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Trips</div>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="location-card">
          <div className="card-title">📍 Current Location</div>
          <div className="location-name">Colorado River, Austin, TX</div>
          
          <div className="conditions-grid">
            <div className="condition-item">
              <div className="condition-label">Weather</div>
              <div className="condition-value">☀️ 78°F</div>
            </div>
            <div className="condition-item">
              <div className="condition-label">Water Temp</div>
              <div className="condition-value">💧 68°F</div>
            </div>
            <div className="condition-item">
              <div className="condition-label">Flow</div>
              <div className="condition-value">🌊 450 cfs</div>
            </div>
            <div className="condition-item">
              <div className="condition-label">Best Time</div>
              <div className="condition-value">🕐 6-9am</div>
            </div>
          </div>
        </div>

        {/* Tip Card */}
        <div className="tip-card">
          <strong>💡 Tip:</strong> Morning conditions are ideal for bass fishing. 
          Try topwater lures near structure.
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="nav-bar">
        <div className="nav-item active" onClick={() => navigate('/home')}>
          <div className="nav-icon">🏠</div>
          <div className="nav-label">Home</div>
        </div>
        <div className="nav-item" onClick={() => navigate('/log')}>
          <div className="nav-icon">📝</div>
          <div className="nav-label">Log</div>
        </div>
        <div className="nav-item" onClick={() => navigate('/history')}>
          <div className="nav-icon">📋</div>
          <div className="nav-label">History</div>
        </div>
        <div className="nav-item" onClick={() => navigate('/map')}>
          <div className="nav-icon">🗺️</div>
          <div className="nav-label">Map</div>
        </div>
        <div className="nav-item" onClick={() => navigate('/profile')}>
          <div className="nav-icon">👤</div>
          <div className="nav-label">Profile</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
