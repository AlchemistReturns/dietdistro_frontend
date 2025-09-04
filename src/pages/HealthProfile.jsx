import React, { useState, useEffect } from 'react';
import { createOrUpdateHealthProfile, getHealthProfile } from '../api/api.js';

export default function HealthProfile() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getHealthProfile()
            .then(res => {
                const profile = res.data;
                if (profile) {
                    setHeight(profile.height ?? '');
                    setWeight(profile.weight ?? '');
                    setAge(profile.age ?? '');
                    setGender(profile.gender ?? '');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createOrUpdateHealthProfile({ height, weight, age, gender });
            setMessage('Profile saved successfully!');
        } catch (err) {
            console.error(err);
            setMessage('Failed to save profile.');
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Health Profile</h1>
            {message && (
                <p className="mb-4 text-sm text-green-700">{message}</p>
            )}
            <form onSubmit={handleSubmit} className="card p-4">
                <input
                    type="number"
                    placeholder="Height (cm)"
                    className="w-full p-2 mb-2 border rounded"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Weight (kg)"
                    className="w-full p-2 mb-2 border rounded"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    className="w-full p-2 mb-2 border rounded"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    required
                />
                <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                    Save Profile
                </button>
            </form>
        </div>
    );
}
