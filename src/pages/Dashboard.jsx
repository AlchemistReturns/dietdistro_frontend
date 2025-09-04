import React, { useEffect, useState } from 'react';
import { useAuth } from '../state/AuthContext.jsx';
import { api, getHealthProfile } from '../api/api.js';

export default function Dashboard() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [menus, setMenus] = useState({});

    useEffect(() => {
        getHealthProfile()
            .then(res => setProfile(res.data))
            .catch(() => {});

        api.get('/api/health-profile/getMenu')
            .then(res => {
                console.log(res);
                console.log("Raw JSON string:", JSON.stringify(res.data, null, 2));
                setMenus(res.data);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-2 text-center text-green-800">
                Welcome, {user?.username}
            </h2>

            {/* Health Profile */}
            {profile ? (
                <div className="card p-6 mb-6">
                    <h2 className="text-xl font-bold text-green-800 mb-4">
                        Your Health Profile
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                            <p className="text-sm text-gray-500">Height</p>
                            <p className="text-lg font-semibold text-green-800">
                                {profile.height ?? '-'}
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                            <p className="text-sm text-gray-500">Weight</p>
                            <p className="text-lg font-semibold text-green-800">
                                {profile.weight ?? '-'}
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                            <p className="text-sm text-gray-500">Age</p>
                            <p className="text-lg font-semibold text-green-800">
                                {profile.age ?? '-'}
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="text-lg font-semibold text-green-800">
                                {profile.gender ?? '-'}
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                            <p className="text-sm text-gray-500">BMI</p>
                            <p className="text-lg font-semibold text-green-800">
                                {profile.bmi ? profile.bmi.toFixed(2) : '-'}
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl shadow-sm text-center">
                            <p className="text-sm text-gray-500">BMR</p>
                            <p className="text-lg font-semibold text-green-800">
                                {profile.bmr ? profile.bmr.toFixed(2) : '-'}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">No health profile found.</p>
            )}

            {/* Menus */}
            <div className="card p-6">
                <h2 className="text-xl font-bold text-green-800 mb-4">
                    Your Menus
                </h2>

                {menus && Object.keys(menus).length > 0 ? (
                    <div className="space-y-6">
                        {Object.entries(menus).map(([menuId, menuData]) => (
                            <div key={menuId} className="border rounded-xl p-4 bg-green-50">

                                <ul className="list-disc list-inside space-y-1">
                                    {menuData.menu.map(item => (
                                        <li key={item.foodId} className="text-gray-700">
                                            <span className="font-medium text-green-800">{item.foodName}</span> – {item.foodQuantity} g
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No menus found.</p>
                )}
            </div>
        </div>
    );
}
