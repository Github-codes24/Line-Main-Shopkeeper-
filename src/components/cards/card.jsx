// src/components/Card.jsx
import { TbWallet } from "react-icons/tb";
import {TrendingUp, TrendingDown, Users, Target } from "lucide-react";
import { Pickaxe } from "lucide-react";


const Card = ({title, value, change}) => {
    const isPositive = (change || "").includes("+");

    // Softer pastel gradient config
    const config = {
        "Total Sales": {
            color: "from-[#4C9ED9] to-[#99D5FF]", // soft blue
            icon: <TbWallet  size={22} />,
            showRupee: true, // Only show rupee for Total Sales
        },
        "Total Worker": {
            color: "from-[#D98E4C] to-[#FFC999]", // soft orange
            icon: <Pickaxe size={22} />,
            showRupee: false,
        },
        "Total Customer": {
            color: "from-[#4CD96F] to-[#99FFB3]", // soft green
            icon: <Users size={22} />,
            showRupee: false,
        },
        "Total Order": {
            color: "from-[#C94CD9] to-[#F399FF]", // soft purple-pink
            icon: <Target size={22} />,
            showRupee: false,
        },
    };

    const {color, icon, showRupee} = config[title] || {
        color: "from-gray-400 to-gray-300",
        icon: <Users size={22} />,
        showRupee: false,
    };

    return (
        <div className={`p-3 rounded-xl shadow-md bg-gradient-to-br ${color} text-white`}>
            {/* Title + Icon */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium mb-4">{title}</h3>
                <div className="text-white opacity-90">{icon}</div>
            </div>

            {/* Value - Show rupee symbol only for Total Sales */}
            <p className="text-3xl font-bold mb-2">
                {showRupee && "₹ "}{value}
            </p>

            {/* Change indicator */}
            <div className="flex space-x-4">
                <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
                    {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                    <span>{change}</span>
                </div>
                <p className="text-md font-medium ">This Month </p>
            </div>
        </div>
    );
};

export default Card;