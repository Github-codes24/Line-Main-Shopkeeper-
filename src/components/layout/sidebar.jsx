import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserTie,
  FaBox,
  FaBoxes,
  FaShoppingCart,
  FaMoneyBill,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition no-underline 
   ${isActive ? "bg-[#007e74] text-white" : "bg-white text-[#007e74] hover:bg-[#e6f5f3]"}`;

  return (
    <div className="h-screen w-64 bg-[#19a699] text-white flex flex-col shadow-lg mb-2">
      {/* Menu */}
      <nav className="flex flex-col gap-y-3 m-3">
        <NavLink to="/" end className={linkClasses}>
          <FaTachometerAlt className="text-lg" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/worker" className={linkClasses}>
          <FaUserTie className="text-lg" />
          <span>Worker</span>
        </NavLink>

        <NavLink to="/small-product" className={linkClasses}>
          <FaBox className="text-lg" />
          <span>Small Product</span>
        </NavLink>

        <NavLink to="/big-product" className={linkClasses}>
          <FaBoxes className="text-lg" />
          <span>Big Product</span>
        </NavLink>

        {/* Orders Button */}
        <NavLink
          to="/orders"
          className={linkClasses}
        >
          <span className="flex items-center gap-3">
            <FaShoppingCart className="text-lg" />
            <span>Orders</span>
          </span>
        </NavLink>

        {/* Payments */}
        <NavLink to="/payment" className={linkClasses}>
          <FaMoneyBill className="text-lg" />
          <span>Payment</span>
        </NavLink>
      </nav>

    </div>
  );
};

export default Sidebar;
