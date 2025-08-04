import React from 'react';
import Card from '../components/cards/card';
import { FaUsers, FaShoppingCart, FaUserTie, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          title="Total Sales"
          amount="10,259"
          change="+2.1%"
          icon={<FaShoppingCart />}
          bgColor="bg-teal-100"
          textColor="gray-800"
        />
        <Card
          title="Total Worker"
          amount="10,259"
          change="+2.1%"
          icon={<FaUserTie />}
          bgColor="bg-gray-100"
          textColor="gray-800"
        />
        <Card
          title="Total Customer"
          amount="10,259"
          change="-2.1%"
          icon={<FaUsers />}
          bgColor="bg-gray-900"
          textColor="white"
        />
        <Card
          title="Total Order"
          amount="10,259"
          change="+2.1%"
          icon={<FaBox />}
          bgColor="bg-gray-100"
          textColor="gray-800"
        />
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Link to="/order-management" className="block">
          <div className="p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-2">Order Management (Click to open section)</h2>
            <div className="text-sm">[Order Data Preview]</div>
          </div>
        </Link>

        <Link to="/top-selling-product" className="block">
          <div className="p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-2">Top Selling Product (Click to open section)</h2>
            <div className="text-sm">[Product Data Preview]</div>
          </div>
        </Link>
      </div>

      {/* Full width */}
      <Link to="/top-worker" className="block">
        <div className="p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
          <h2 className="text-lg font-bold mb-2">Top Worker (Click to open section)</h2>
          <div className="text-sm">[Worker Data Preview]</div>
        </div>
      </Link>

    </div>
  );
};

export default Dashboard;
