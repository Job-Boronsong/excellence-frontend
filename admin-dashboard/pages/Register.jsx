// src/pages/Register.jsx
import React, { useState } from 'react';
import API from '../services/api'; // Axios instance with baseURL

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await API.post('auth/register/', form);
      setSuccess('Registration successful! You can now log in.');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError('Registration failed. Try a different email.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={registerUser}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Register Admin
        </h1>

        {success && <p className="text-green-600 text-center mb-3">{success}</p>}
        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
