import React, { useEffect, useState } from 'react';
import { deleteFood, getFoodWiki} from '../api/api.js';
import {useAuth} from "../state/AuthContext.jsx";

export default function FoodWiki() {
    const [foods, setFoods] = useState([]);
    const {user} = useAuth();
    console.log("Looking for food");
    console.log(foods);

    useEffect(() => {
        getFoodWiki().then(res => setFoods(res.data || []));
    }, []);
    async function handleDelete(id) {
        try {
            await deleteFood(id); // replace with your API call
            setFoods((prev) => prev.filter((f) => f.id !== id));
        } catch (error) {
            console.error("Delete failed", error);
        }
    }

    return (
        <div className="p-6 max-w-[1200px] mx-auto">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Food Wiki</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foods.map(food => (
                    <div key={food.id} className="card p-4">
                        <h2 className="text-green-700 font-semibold">{food.foodName}</h2>
                        <p>Calories: {food.calorie}</p>
                        <p>Carbs: {food.carbohydrate} | Protein: {food.protein} | Fat: {food.fat}</p>
                        <p>{food.description}</p>
                        {user?.roles?.includes("ROLE_ADMIN") && (
                            <button
                                onClick={() => handleDelete(food.id)}
                                className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
