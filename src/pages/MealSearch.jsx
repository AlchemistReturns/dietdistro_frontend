import React, { useState } from "react";

export default function MealSearch() {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchMeals = async (e) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        try {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );
            const data = await res.json();
            setMeals(data.meals || []);
        } catch (err) {
            console.error("Error fetching meals:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto font-primary">
            <h1 className="text-2xl font-bold text-green-800 mb-4">Recipe Search</h1>

            <form onSubmit={searchMeals} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search for a recipe..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                />
                <button
                    type="submit"
                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meals.map((meal) => (
                    <div
                        key={meal.idMeal}
                        className="card p-4 border rounded-lg shadow-sm bg-white"
                    >
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <h2 className="text-green-700 font-semibold text-lg mb-1">
                            {meal.strMeal}
                        </h2>
                        <p className="text-sm text-gray-600 mb-2">
                            Category: {meal.strCategory} | Area: {meal.strArea}
                        </p>
                        <a
                            href={meal.strSource || meal.strYoutube}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View Recipe
                        </a>
                    </div>
                ))}
            </div>

            {!loading && meals.length === 0 && query && (
                <p className="text-gray-500">No recipes found for "{query}".</p>
            )}
        </div>
    );
}
