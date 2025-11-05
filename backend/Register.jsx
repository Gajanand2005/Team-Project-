import React, { useState, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

const Register = () => {
  const { alertBox } = useContext(AppContext);
  const [formFields, setFormFields] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formFields.email || !formFields.password) {
      alertBox('error', 'Please fill all required fields');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formFields),
      });
      const data = await res.json();
      setIsLoading(false);
      if (data.success) {
        alertBox('success', 'Registered successfully. Please login.');
        window.location.href = '/login';
      } else {
        alertBox('error', data.message || 'Registration failed');
      }
    } catch (err) {
      setIsLoading(false);
      alertBox('error', 'Something went wrong');
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder="Name (optional)"
          value={formFields.name}
          onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
        />
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
        <button type="submit" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
