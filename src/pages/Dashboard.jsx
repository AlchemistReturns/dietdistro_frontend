import React, { useEffect, useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';
import { getHealthProfile } from '../api/api.js';

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getHealthProfile()
        .then(res => setProfile(res.data))
        .catch(() => {});
  }, []);

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Dashboard</h1>
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.username}</h2>

        {profile ? (
            <div className="card p-4">
              <p>Height: {profile.height ?? '-'}</p>
              <p>Weight: {profile.weight ?? '-'}</p>
              <p>Age: {profile.age ?? '-'}</p>
              <p>Gender: {profile.gender}</p>
              <p>BMI: {profile.bmi}</p>
              <p>BMR: {profile.bmr}</p>
            </div>
        ) : (
            <p className="text-gray-600">No health profile found.</p>
        )}
      </div>
  );
}
