// src/components/Card.jsx
import React from "react";
import {TrendingUp, TrendingDown, Users, ShoppingCart, Briefcase, Target} from "lucide-react";

const Card = ({ title, value, change }) => {
  const isPositive = (change || "").includes("+");


    // Softer pastel gradient config
    const config = {
        "Total Sales": {
            color: "from-blue-400 to-blue-300", // soft blue
            icon: <ShoppingCart size={22} />,
        },
        "Total Worker": {
            color: "from-orange-400 to-orange-300", // soft orange
            icon: <Briefcase size={22} />,
        },
        "Total Customer": {
            color: "from-green-400 to-green-300", // soft green
            icon: <Users size={22} />,
        },
        "Total Order": {
            color: "from-purple-400 to-pink-300", // soft purple-pink
            icon: <Target size={22} />,
        },
    };

    const {color, icon} = config[title] || {
        color: "from-gray-400 to-gray-300",
        icon: <Users size={22} />,
    };

    return (
        <div className={`p-3 rounded-xl shadow-md bg-gradient-to-br ${color} text-white`}>
            {/* Title + Icon */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium">{title}</h3>
                <div className="text-white opacity-90">{icon}</div>
            </div>

            {/* Value */}
            <p className="text-3xl font-bold mb-2">₹ {value}</p>

            {/* Change indicator */}
            <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
                {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                <span>{change}</span>
            </div>
        </div>
    );
};

export default Card;
