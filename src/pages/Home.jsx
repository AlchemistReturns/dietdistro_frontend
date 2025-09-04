import React from 'react';
import { useAuth } from '../state/AuthContext.jsx';

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="p-6 max-w-5xl mx-auto font-primary min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold text-green-800 mb-4 text-center">
                Welcome {user ? user.username : 'Guest'}
            </h1>

            <p className="text-gray-700 text-lg mb-6">
                DietDistro is your personal companion to healthier living.
                Track your daily nutrition, build balanced menus, and discover
                food items tailored to your lifestyle.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">📊 Health Profile</h2>
                    <p className="text-gray-600">
                        Record your BMR, track progress, and monitor your health stats
                        in one simple dashboard.
                    </p>
                </div>

                <div className="bg-green-50 p-4 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">🥗 Create Menus</h2>
                    <p className="text-gray-600">
                        Select foods from carbohydrates, proteins, and fats to generate
                        balanced diet plans that match your goals.
                    </p>
                </div>

                <div className="bg-green-50 p-4 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-semibold text-green-700 mb-2">🍎 Food Explorer</h2>
                    <p className="text-gray-600">
                        Browse a growing library of foods with nutrition info,
                        descriptions, and recommendations.
                    </p>
                </div>
            </div>
        </div>

    );
}
