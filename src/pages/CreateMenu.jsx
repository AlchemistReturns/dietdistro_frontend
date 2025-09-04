import React, { useEffect, useState } from 'react';
import {
    createMenu,
    getProtein, setProtein,
    getFat, setFat,
    getCarbohydrate, setCarbohydrate
} from '../api/api.js';

export default function CreateMenu() {
    const [menuId, setMenuId] = useState(null);
    const [proteinList, setProteinList] = useState([]);
    const [fatList, setFatList] = useState([]);
    const [carbList, setCarbList] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        createMenu()
            .then(res => setMenuId(res.data.menuId))
            .catch(err => console.error(err));
        fetchAllFoods();
    }, []);

    const fetchAllFoods = async () => {
        try {
            setProteinList((await getProtein()).data || []);
            setFatList((await getFat()).data || []);
            setCarbList((await getCarbohydrate()).data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async (type, ids) => {
        if (!menuId) return;
        try {
            if (type === 'protein') await setProtein({ menuId, foodIds: ids });
            if (type === 'fat') await setFat({ menuId, foodIds: ids });
            if (type === 'carb') await setCarbohydrate({ menuId, foodIds: ids });
            setMessage(`${type} added successfully!`);
        } catch (err) {
            console.error(err);
            setMessage(`Failed to add ${type}.`);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Create Menu</h1>
            {message && <p className="mb-4 text-green-700">{message}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card p-4">
                    <h2 className="text-green-700 font-semibold mb-2">Proteins</h2>
                    <ul>
                        {proteinList.map(p => <li key={p.id}>{p.foodName}</li>)}
                    </ul>
                    <button
                        onClick={() => handleAdd('protein', proteinList.map(p => p.id))}
                        className="mt-2 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                    >
                        Add All Proteins
                    </button>
                </div>
                <div className="card p-4">
                    <h2 className="text-green-700 font-semibold mb-2">Fats</h2>
                    <ul>{fatList.map(f => <li key={f.id}>{f.foodName}</li>)}</ul>
                    <button
                        onClick={() => handleAdd('fat', fatList.map(f => f.id))}
                        className="mt-2 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                    >
                        Add All Fats
                    </button>
                </div>
                <div className="card p-4">
                    <h2 className="text-green-700 font-semibold mb-2">Carbohydrates</h2>
                    <ul>{carbList.map(c => <li key={c.id}>{c.foodName}</li>)}</ul>
                    <button
                        onClick={() => handleAdd('carb', carbList.map(c => c.id))}
                        className="mt-2 bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
                    >
                        Add All Carbs
                    </button>
                </div>
            </div>
        </div>
    );
}
