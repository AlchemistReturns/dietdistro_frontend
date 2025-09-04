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
        <h2 className="text-2xl font-semibold mb-2 text-center text-green-800">Welcome, {user?.username}</h2>

        {profile ? (
            <div className="card p-6">
                <h2 className="text-xl font-bold text-green-800 mb-4">Your Health Profile</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                        <p className="text-sm text-gray-500">Height</p>
                        <p className="text-lg font-semibold text-green-800">{profile.height ?? '-'}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="text-lg font-semibold text-green-800">{profile.weight ?? '-'}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="text-lg font-semibold text-green-800">{profile.age ?? '-'}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="text-lg font-semibold text-green-800">{profile.gender ?? '-'}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                        <p className="text-sm text-gray-500">BMI</p>
                        <p className="text-lg font-semibold text-green-800">{profile.bmi ? profile.bmi.toFixed(2) : '-'}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                        <p className="text-sm text-gray-500">BMR</p>
                        <p className="text-lg font-semibold text-green-800">{profile.bmr ? profile.bmr.toFixed(2) : '-'}</p>
                    </div>
                </div>
            </div>

        ) : (
            <p className="text-gray-600">No health profile found.</p>
        )}
      </div>
  );
}
