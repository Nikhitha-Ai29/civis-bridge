import React from 'react';
import '../styles/MapView.css';

function MapView() {
  return (
    <div className="map-view">
      <div className="map-header">
        <h2>Map View</h2>
        <p className="subtitle">Visualize reported issues across the community.</p>
      </div>

      <div className="map-container">
        <div className="map-placeholder">
          <div className="placeholder-content">
            <div className="map-icon">🗺️</div>
            <h3>Interactive Map Coming Soon</h3>
            <p>View all reported issues on an interactive map of your community</p>
            <div className="issue-markers">
              <div className="marker pothole">🌪️</div>
              <div className="marker light">💡</div>
              <div className="marker park">🎪</div>
              <div className="marker safety">⚠️</div>
            </div>
          </div>
        </div>
      </div>

      <div className="map-legend">
        <h4>Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-marker pothole">🌪️</span>
            <span>Roads & Infrastructure</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker light">💡</span>
            <span>Lighting & Utilities</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker park">🎪</span>
            <span>Parks & Recreation</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker safety">⚠️</span>
            <span>Public Safety</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
