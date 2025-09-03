import React from "react";
import Card from "../components/cards/card";
import OrderManagement from "../components/cards/OrderTable";
import TopSellingProduct from "../components/cards/Products";
import TopWorker from "../components/cards/worker-card";
import Searchbar from "../components/layout/Searchbar";

const DashboardPage = () => {
  return (
   <div className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden mt-2">
  <div className="flex flex-1">
    <main className="flex-1 overflow-y-auto p-2">
          {/* Searchbar Section */}
          <div className="mb-4">
            <Searchbar />
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
              title="Total Sales"
              value="10,259"
              change="+2.1% This Month"
              gradient="from-blue-500 to-blue-400"
              icon="💰"
            />
            <Card
              title="Total Worker"
              value="10,259"
              change="+2.1% This Month"
              gradient="from-orange-400 to-orange-300"
              icon="⛏"
            />
            <Card
              title="Total Customer"
              value="10,259"
              change="-2.1% This Month"
              gradient="from-green-400 to-green-300"
              icon="👥"
            />
            <Card
              title="Total Order"
              value="10,259"
              change="+2.1% This Month"
              gradient="from-purple-500 to-pink-400"
              icon="🎯"
            />
          </div>

          {/* Order Management + Top Selling Product */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-4">
              <OrderManagement />
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <TopSellingProduct />
            </div>
          </div>

          {/* Top Worker Section */}
          <div className="bg-white rounded-xl shadow p-4">
            <TopWorker />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
