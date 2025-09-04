import React, { useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ username, email, password });
  };

  return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="card w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Register</h2>
          <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
          />
          <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit">Register</button>
        </form>
      </div>
  );
}
