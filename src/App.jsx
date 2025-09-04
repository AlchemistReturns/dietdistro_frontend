import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import HealthProfile from './pages/HealthProfile.jsx';
import CreateMenu from './pages/CreateMenu.jsx';
import FoodWiki from './pages/FoodWiki.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MealSearch from "./pages/MealSearch.jsx";
import AddFood from "./pages/AddFood.jsx";

export default function App() {
  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/meals" element={<MealSearch />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/health-profile" element={<ProtectedRoute><HealthProfile /></ProtectedRoute>} />
          <Route path="/create-menu" element={<ProtectedRoute><CreateMenu /></ProtectedRoute>} />
          <Route path="/food-wiki" element={<ProtectedRoute><FoodWiki /></ProtectedRoute>} />
            <Route path="/add-food" element={<AddFood />} />
        </Routes>
      </>
  );
}
