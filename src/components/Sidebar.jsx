import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ active, onNavigate, currentUser, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'issue-tracker', label: 'Issue Tracker', icon: '🎯' },
    { id: 'updates', label: 'Updates', icon: '📢' },
    { id: 'map-view', label: 'Map View', icon: '🗺️' },
    { id: 'report-summarizer', label: 'Report Summarizer', icon: '📄' },
    { id: 'admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🌉</span>
          <h1>CivisBridge</h1>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        {currentUser ? (
          <div className="user-area">
            <div className="user-name">Hello, {currentUser.name || currentUser.email}</div>
            <button className="logout-btn" onClick={() => onLogout && onLogout()}>Log out</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button className={`nav-item ${active === 'login' ? 'active' : ''}`} onClick={() => onNavigate('login')}>Log In</button>
            <button className={`nav-item ${active === 'register' ? 'active' : ''}`} onClick={() => onNavigate('register')}>Register</button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
