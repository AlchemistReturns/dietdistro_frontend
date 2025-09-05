import React, { useEffect, useState } from "react";
import {api} from "../api/api.js";

// Example: fetch from API
const response = await api.get("/api/diet/social/show");
const social_data = await response.data;

export default function BrowseMenus() {
    const [menus, setMenus] = useState(null);

    useEffect(() => {
        // Simulating API response (replace with your API call)
        setMenus(social_data);
    }, []);

    if (!menus) {
        return <p className="text-center mt-10 text-gray-500">Loading menus...</p>;
    }

    return (
        <div className="p-6 grid grid-cols-3 gap-6 max-w-[1200px] mx-auto">


            {Object.entries(menus).map(([category, menusArray], index) => (
                <div key={index} className="mb-8 w-[300px]">


                    <div className="">
                        {menusArray.map((menuObj, menuIndex) => (
                            <div
                                key={menuIndex}
                                className=" shadow-md rounded-2xl p-4 border hover:shadow-lg transition text-center"
                            >
                                <h4 className="text-lg mb-2 font-bold">
                                    Menu
                                </h4>
                                <ul className="space-y-2">
                                    {menuObj.menu.map((item) => (
                                        <li
                                            key={item.foodId}
                                            className="text-center text-gray-700 border-b pb-1"
                                        >
                                            {item.foodName} - {item.foodQuantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
