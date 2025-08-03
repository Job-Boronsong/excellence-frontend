// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('auth/token/', { email, password });
      localStorage.setItem('token', res.data.access);
      alert('Login successful!');
      navigate('/'); // Redirect to Dashboard
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={loginUser}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
