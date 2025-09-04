import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
      <nav className="bg-green-100 p-4 flex justify-between items-center shadow">
        <h1 className="text-green-800 font-bold text-xl">DietDistro</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/health-profile">Profile</Link>}
          {user && <Link to="/create-menu">Create Menu</Link>}
          {user && <Link to="/food-wiki">Food Wiki</Link>}
          {user ? (
              <button onClick={logout} className="ml-2">Logout</button>
          ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
          )}
        </div>
      </nav>
  );
}
