// src/state/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { registerUser, loginUser, getUserInfo } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      getUserInfo(username)
          .then(res => setUser(res.data))
          .catch(() => setUser({ username }))
          .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async ({ username, email, password }) => {
    try {
      const res = await registerUser({ username, email, password });
      const { token, user } = res.data;      // <-- updated
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      setUser(user);
      alert('Registration successful.');
      navigate('/dashboard');                // or navigate('/login') if you prefer
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;      // <-- updated
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      setUser(user);                         // <-- store full user object
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed.');
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    navigate('/login');
  };

  return (
      <AuthContext.Provider value={{ user, loading, register, login, logout }}>
        {!loading && children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
