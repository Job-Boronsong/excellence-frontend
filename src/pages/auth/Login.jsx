import React, { useState } from 'react';
import API from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('auth/token/', { email, password });
      localStorage.setItem('token', res.data.access);
      alert('Logged in!');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={loginUser}>
      <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
