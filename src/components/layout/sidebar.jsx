import React from "react";
import {
  FaTachometerAlt,
  FaUserTie,
  FaBox,
  FaBoxes,
  FaShoppingCart,
  FaMoneyBill,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-[#19a699] text-white flex flex-col shadow-lg">

     
      {/* Menu */}
      <nav className="flex-1 mt-4 flex flex-col gap-1 px-3">
        {/* Dashboard (active) */}
        <div className="flex items-center gap-3 px-4 py-3 bg-teal-700 rounded-lg cursor-pointer font-medium transition">
          <FaTachometerAlt className="text-lg" />
          <span>Dashboard</span>
        </div>

        {/* Worker */}
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-teal-600 rounded-lg cursor-pointer font-medium transition">
          <FaUserTie className="text-lg" />
          <span>Worker</span>
        </div>

        {/* Small Product */}
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-teal-600 rounded-lg cursor-pointer font-medium transition">
          <FaBox className="text-lg" />
          <span>Small Product</span>
        </div>

        {/* Big Product */}
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-teal-600 rounded-lg cursor-pointer font-medium transition">
          <FaBoxes className="text-lg" />
          <span>Big Product</span>
        </div>

        {/* Order */}
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-teal-600 rounded-lg cursor-pointer font-medium transition">
          <FaShoppingCart className="text-lg" />
          <span>Order</span>
        </div>

        {/* Payments */}
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-teal-600 rounded-lg cursor-pointer font-medium transition">
          <FaMoneyBill className="text-lg" />
          <span>Payments</span>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-teal-500 text-sm text-center">
        © 2025 MyApp
      </div>
    </div>
  );
};

export default Sidebar;
