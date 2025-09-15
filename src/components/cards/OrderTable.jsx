import React from "react";
import { Eye } from "lucide-react";

const statusColors = {
  Assigned: "bg-green-100 text-green-700 border border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Completed: "bg-blue-100 text-blue-700 border border-blue-300",
  Rejected: "bg-red-100 text-red-700 border border-red-300",
};

const OrderTable = ({ orders = [] }) => (
  <div className="bg-white p-4 rounded-xl shadow-md w-full">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-semibold text-gray-800">Order Management</h4>
      <button className="text-sm text-teal-600 hover:underline">See All</button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 font-medium text-gray-600">Order No.</th>
            <th className="p-2 font-medium text-gray-600">Service required</th>
            <th className="p-2 font-medium text-gray-600">Status</th>
            <th className="p-2 font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <tr
                key={idx}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="p-2">{order.orderNo}</td>
                <td className="p-2">{order.serviceRequired}</td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2">
                  <button className="text-teal-600 hover:text-teal-800">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrderTable;
