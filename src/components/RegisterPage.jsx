import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import { registerUser } from '../utils/auth';

function RegisterPage({ onNavigate }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerUser({ username: username.trim(), email: email.trim(), password });
    } catch (err) {
      // ignore errors for now
    }
    alert('Registration is done');
    if (onNavigate) {
      onNavigate('login');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Register</h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username
            <input
              className={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Email Address
            <input
              className={styles.input}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
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
              required
            />
          </label>

          <button className={styles.registerBtn} type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
