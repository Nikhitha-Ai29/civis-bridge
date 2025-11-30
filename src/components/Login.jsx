import React, { useState } from 'react';
import { authenticate } from '../utils/auth';
import styles from './Login.module.css';

function Login({ onLogin, onNavigate }) {
  const [userType, setUserType] = useState('politician'); // default per design (attachment highlights politician)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const selectType = (t) => setUserType(t);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No error messages per requirements; attempt authenticate
    const result = authenticate(username.trim(), password);
    if (result.success) {
      onLogin && onLogin(result.user);
      // ensure parent navigation (activePage) also switches to dashboard
      onNavigate && onNavigate('dashboard');
    } else {
      // silently do nothing for now
      // in future can show error
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>CivisBridge</h1>
          <div className={styles.subtitle}>Community Issue Reporting</div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.sectionTitle}>Login</h2>

          <div className={styles.typeRow}>
            <button
              type="button"
              className={`${styles.typeCard} ${userType === 'citizen' ? styles.citizenActive : ''}`}
              onClick={() => selectType('citizen')}
            >
              <div className={styles.typeIcon}>👤</div>
              <div className={styles.typeLabel}>Citizen</div>
              {userType === 'citizen' && <div className={`${styles.check} ${styles.blue}`}>✓</div>}
            </button>

            <button
              type="button"
              className={`${styles.typeCard} ${userType === 'politician' ? styles.politicianActive : ''}`}
              onClick={() => selectType('politician')}
            >
              <div className={styles.typeIcon}>💼</div>
              <div className={styles.typeLabel}>Politician</div>
              {userType === 'politician' && <div className={`${styles.check} ${styles.purple}`}>✓</div>}
            </button>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              Username
              <input
                className={styles.input}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className={styles.label}>
              Password
              <input
                className={styles.input}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button className={styles.loginBtn} type="submit">Login</button>
          </form>

          <div className={styles.footerText}>
            <span>Don't have an account?</span>
            <button type="button" className={styles.registerLink} onClick={() => onNavigate && onNavigate('register')}>Register Here</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
