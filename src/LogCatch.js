import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogCatch.css';

function LogCatch() {
  const navigate = useNavigate();
  
  const [catchData, setCatchData] = useState({
    photo: null,
    photoPreview: null,
    species: '',
    weight: '',
    length: '',
    lure: '',
    location: 'Detecting location...',
    date: new Date().toISOString(),
    notes: ''
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCatchData({
        ...catchData,
        photo: file,
        photoPreview: URL.createObjectURL(file)
      });
    }
  };

  const handleInputChange = (field, value) => {
    setCatchData({
      ...catchData,
      [field]: value
    });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setCatchData({ ...catchData, location: 'Getting location...' });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);
          setCatchData({
            ...catchData,
            location: `${lat}, ${lon}`
          });
        },
        (error) => {
          setCatchData({
            ...catchData,
            location: 'Location unavailable'
          });
        }
      );
    }
  };

  const handleSave = () => {
    if (!catchData.species) {
      alert('Please select a species');
      return;
    }
    if (!catchData.weight && !catchData.length) {
      alert('Please enter weight or length');
      return;
    }

    const existingCatches = JSON.parse(localStorage.getItem('catches') || '[]');
    
    const newCatch = {
      id: Date.now(),
      ...catchData,
      photoPreview: catchData.photoPreview || null
    };
    
    existingCatches.push(newCatch);
    localStorage.setItem('catches', JSON.stringify(existingCatches));
    
    alert('Catch saved successfully!');
    navigate('/home');
  };

  React.useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="logcatch-container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/home')}>
          ←
        </button>
        <h1>Log Your Catch</h1>
        <div style={{ width: '24px' }}></div>
      </div>

      <div className="content">
        <div className="photo-section">
          <label htmlFor="photo-input" className="photo-upload">
            {catchData.photoPreview ? (
              <img src={catchData.photoPreview} alt="Catch preview" className="photo-preview" />
            ) : (
              <div className="photo-placeholder">
                <div className="camera-icon">📷</div>
                <div className="camera-text">Tap to add photo</div>
              </div>
            )}
          </label>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Species *</label>
          <select
            className="form-select"
            value={catchData.species}
            onChange={(e) => handleInputChange('species', e.target.value)}
          >
            <option value="">Select species...</option>
            <option value="Largemouth Bass">Largemouth Bass</option>
            <option value="Smallmouth Bass">Smallmouth Bass</option>
            <option value="Rainbow Trout">Rainbow Trout</option>
            <option value="Brown Trout">Brown Trout</option>
            <option value="Brook Trout">Brook Trout</option>
            <option value="Catfish">Catfish</option>
            <option value="Bluegill">Bluegill</option>
            <option value="Crappie">Crappie</option>
            <option value="Pike">Pike</option>
            <option value="Walleye">Walleye</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Weight (lbs)</label>
            <input
              type="number"
              step="0.1"
              className="form-input"
              placeholder="4.5"
              value={catchData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Length (in)</label>
            <input
              type="number"
              step="0.5"
              className="form-input"
              placeholder="18"
              value={catchData.length}
              onChange={(e) => handleInputChange('length', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Lure/Bait Used</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Spinnerbait - White/Chartreuse"
            value={catchData.lure}
            onChange={(e) => handleInputChange('lure', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <div className="location-display">
            📍 {catchData.location}
          </div>
          <button className="location-btn" onClick={getLocation}>
            Refresh Location
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Notes (optional)</label>
          <textarea
            className="form-textarea"
            placeholder="Caught near fallen log in shallow water..."
            rows="4"
            value={catchData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          💾 Save Catch
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/home')}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default LogCatch;
