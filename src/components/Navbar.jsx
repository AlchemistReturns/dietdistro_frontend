import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
      <nav className="bg-green-100 p-4 flex justify-between items-center shadow max-w-[1200px] mx-auto">
        <h1 className="text-green-800 font-bold text-xl font-primary">DietDistro</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/meals">Find recipes</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <Link to="/health-profile">Profile</Link>}
          {user && <Link to="/create-menu">Create Menu</Link>}
            {user && <Link to="/social">Browse Menus</Link>}
          {user && <Link to="/food-wiki">Food Wiki</Link>}
            {user?.roles?.includes("ROLE_ADMIN") && (
                <Link to="/add-food">Add Food</Link>
            )}
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
