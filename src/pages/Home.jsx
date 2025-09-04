import React from 'react';
import { useAuth } from '../state/AuthContext.jsx';

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-green-800 mb-4">
                Welcome {user ? user.username : 'Guest'}
            </h1>
            <p className="text-gray-700">
                This is your DietDistro app. Track your health profile, create diet menus, and explore food items.
            </p>
        </div>
    );
}
