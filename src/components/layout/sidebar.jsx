import React from 'react';

const SideNav = () => {
  return (
    <div className="w-64 h-screen bg-teal-600 p-3 flex flex-col">
      {/* Logo Section */}
      <div className="bg-white text-teal-800 text-xl font-bold px-4 py-3 mb-4 border border-gray-300">
        LineMan Logo
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-3">
        <button className="flex items-center px-4 py-2 bg-teal-700 text-white rounded-md">
          🏠 Dashboard
        </button>

        <button className="flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100">
          👷 Worker
        </button>

        <button className="flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100">
          📦 Small Product
        </button>

        <button className="flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100">
          📦 Big Product
        </button>

        <button className="flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100">
          🛒 Order
        </button>

        <button className="flex items-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100">
          💳 Payments
        </button>
      </nav>
    </div>
  );
};

export default SideNav;
