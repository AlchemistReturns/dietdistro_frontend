import React, { useState } from "react";
import axios from "axios";

export default function AddFood() {
    const [form, setForm] = useState({
        foodName: "",
        calorie: "",
        carbohydrate: "",
        protein: "",
        fat: "",
        description: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await axios.post("http://localhost:8080/api/food/add", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT protected
                    "Content-Type": "application/json",
                },
            });
            setMessage(res.data);
            setForm({
                foodName: "",
                calorie: "",
                carbohydrate: "",
                protein: "",
                fat: "",
                description: "",
            });
        } catch (err) {
            console.error(err);
            setMessage("Error adding food item.");
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Add Food Item</h1>

            {message && (
                <p className="mb-4 text-center text-sm text-blue-700">{message}</p>
            )}

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 bg-white p-6 rounded-xl shadow"
            >
                <input
                    type="text"
                    name="foodName"
                    placeholder="Food Name"
                    value={form.foodName}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="calorie"
                    placeholder="Calories per 100g"
                    value={form.calorie}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="carbohydrate"
                    placeholder="Carbohydrate (g)"
                    value={form.carbohydrate}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="protein"
                    placeholder="Protein (g)"
                    value={form.protein}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="fat"
                    placeholder="Fat (g)"
                    value={form.fat}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-green-700 text-white py-2 rounded-lg hover:bg-green-600"
                >
                    Add Food
                </button>
            </form>
        </div>
    );
}
