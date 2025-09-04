import React, { useEffect, useState } from 'react';
import { getFoodWiki } from '../api/api.js';

export default function FoodWiki() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getFoodWiki().then(res => setFoods(res.data || []));
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Food Wiki</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foods.map(food => (
                    <div key={food.id} className="card p-4">
                        <h2 className="text-green-700 font-semibold">{food.foodName}</h2>
                        <p>Calories: {food.calorie}</p>
                        <p>Carbs: {food.carbohydrate} | Protein: {food.protein} | Fat: {food.fat}</p>
                        <p>{food.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
