import React, { useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <form onSubmit={handleSubmit} className="card w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Login</h2>
          <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-3 border rounded"
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
          <button type="submit">Login</button>
        </form>
      </div>
  );
}
