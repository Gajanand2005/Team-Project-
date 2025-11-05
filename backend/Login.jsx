import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

const Login = () => {
  const { alertBox } = useContext(AppContext);
  const [formFields, setFormFields] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.email === '') {
      alertBox('error', 'Please enter email id');
      setIsLoading(false);
      return;
    }
    if (formFields.password === '') {
      alertBox('error', 'Please enter password');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formFields),
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.success) {
        alertBox('success', 'Login successful');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // redirect to a protected page or homepage
        window.location.href = '/';
      } else {
        alertBox('error', data.message || 'Login failed');
      }
    } catch (err) {
      setIsLoading(false);
      alertBox('error', 'Something went wrong');
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={formFields.email}
          onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formFields.password}
          onChange={(e) => setFormFields({ ...formFields, password: e.target.value })}
        />
        <button type="submit" disabled={isLoading}>{isLoading ? 'Signing In...' : 'Login'}</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
