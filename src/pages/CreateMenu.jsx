import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import {api} from "../api/api.js";

export default function CreateMenu() {
    const [activityLevel, setActivityLevel] = useState("");
    const [bmr, setBmr] = useState(0);
    const [calorieRequirement, setCalorieRequirement] = useState(0);
    const [foods, setFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const bmrResponse = await api.get("/api/health-profile");
                setBmr(bmrResponse.data.bmr);

                const foodsResponse = await api.get("/api/food/show");
                setFoods(foodsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!activityLevel) return;
        let multiplier = 1;
        if (activityLevel === "light") multiplier = 1.2;
        if (activityLevel === "moderate") multiplier = 1.5;
        if (activityLevel === "heavy") multiplier = 1.8;
        setCalorieRequirement(bmr * multiplier);
    }, [activityLevel, bmr]);

    const addFood = (food) => {
        setSelectedFoods([...selectedFoods, { ...food, quantity: 100 }]); // default 100g
    };

    const removeFood = (foodId) => {
        setSelectedFoods(selectedFoods.filter((f) => f.id !== foodId));
    };

    const updateQuantity = (foodId, quantity) => {
        setSelectedFoods(
            selectedFoods.map((f) =>
                f.id === foodId ? { ...f, quantity: Math.max(1, quantity) } : f
            )
        );
    };


    const totalSelectedCalories = selectedFoods.reduce(
        (sum, food) => sum + (food.calorie * food.quantity) / 100,
        0
    );

    const submitMenu = async () => {
        try {
            const menuRequest = selectedFoods.map((f) => ({
                foodId: f.id,
                foodName: f.foodName,
                foodQuantity: f.quantity, // in grams
            }));

            console.log(menuRequest);
            await api.post("/api/diet/create-menu/foods", {"menu" : menuRequest});

            alert("Menu submitted successfully!");
            setSelectedFoods([]);
            setActivityLevel("");
        } catch (error) {
            console.error("Error submitting menu:", error);
            alert("Failed to submit menu.");
        }
    };

    // Filter foods by search
    const filteredFoods = foods.filter((food) =>
        food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-[1200px] mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Your Menu</h1>

            {/* Activity Level Selection */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Select Activity Level</h2>
                <div className="flex gap-4">
                    {["light", "moderate", "heavy"].map((level) => (
                        <button
                            key={level}
                            onClick={() => setActivityLevel(level)}
                            className={`px-4 py-2 rounded ${
                                activityLevel === level
                                    ? "bg-green-500 text-gray-800"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Calorie Info */}
            {activityLevel && (
                <div className="mb-6">
                    <p>
                        Your calorie requirement: <b>{calorieRequirement.toFixed(0)}</b> kcal
                    </p>
                    <p>
                        Selected foods calories: <b>{totalSelectedCalories.toFixed(0)}</b>{" "}
                        kcal
                    </p>
                </div>
            )}

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search foods..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Food List */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Select Foods</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(filteredFoods) &&
                        filteredFoods.map((food) => {
                            const selected = selectedFoods.find((f) => f.id === food.id);
                            return (
                                <div
                                    key={food.id}
                                    className={`border p-3 rounded ${
                                        selected ? "border-green-500 bg-green-100" : "border-gray-500"
                                    }`}
                                >
                                    <h3 className="font-semibold">{food.foodName}</h3>
                                    <p>Per 100g: {food.calorie} kcal</p>
                                    <p>
                                        Protein: {food.protein}g | Fat: {food.fat}g | Carbs:{" "}
                                        {food.carbohydrate}g
                                    </p>
                                    <p className="text-sm text-gray-600">{food.description}</p>

                                    {selected ? (
                                        <div className="mt-2 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm">Quantity (g):</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={selected.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            food.id,
                                                            parseInt(e.target.value) || 1
                                                        )
                                                    }
                                                    className="w-20 text-center border rounded"
                                                />
                                            </div>
                                            <p className="text-sm">
                                                → {(food.calorie * selected.quantity) / 100} kcal
                                            </p>
                                            <button
                                                onClick={() => removeFood(food.id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => addFood(food)}
                                            className="mt-2 px-4 py-1 bg-green-500 text-white rounded"
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>

            {/* Summary Table */}
            {selectedFoods.length > 0 && (
                <div className="mb-6">
                    <h2 className="font-semibold mb-2">Your Menu Summary</h2>
                    <table className="w-full border-collapse border border-gray-400 text-sm">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Food</th>
                            <th className="border p-2">Quantity (g)</th>
                            <th className="border p-2">Calories</th>
                            <th className="border p-2">Protein (g)</th>
                            <th className="border p-2">Fat (g)</th>
                            <th className="border p-2">Carbs (g)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedFoods.map((food) => (
                            <tr key={food.id}>
                                <td className="border p-2">{food.foodName}</td>
                                <td className="border p-2 text-center">{food.quantity}</td>
                                <td className="border p-2 text-center">
                                    {((food.calorie * food.quantity) / 100).toFixed(1)}
                                </td>
                                <td className="border p-2 text-center">
                                    {((food.protein * food.quantity) / 100).toFixed(1)}
                                </td>
                                <td className="border p-2 text-center">
                                    {((food.fat * food.quantity) / 100).toFixed(1)}
                                </td>
                                <td className="border p-2 text-center">
                                    {((food.carbohydrate * food.quantity) / 100).toFixed(1)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Submit Button */}
            {selectedFoods.length > 0 && (
                <button
                    onClick={submitMenu}
                    className="px-6 py-3 bg-green-500 text-white rounded font-semibold"
                >
                    Submit Menu
                </button>
            )}
        </div>
    );
}
