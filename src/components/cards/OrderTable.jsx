import React from "react";
import {Eye} from "lucide-react";
import {useNavigate} from "react-router-dom";

const statusColors = {
    Assigned: "bg-green-100 text-green-700 border border-green-300",
    Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Completed: "bg-blue-100 text-blue-700 border border-blue-300",
    Rejected: "bg-red-100 text-red-700 border border-red-300",
};

const OrderTable = ({orders = []}) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full border border-gray-500">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">Order Management</h4>
                <button className="text-sm text-teal-600 hover:underline" onClick={() => navigate("/orders")}>
                    See All
                </button>
            </div>

            <div className="overflow-x-auto">
                <div className="bg-white shadow-md rounded-lg border">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 font-medium text-gray-900 border-b">Order No.</th>
                                <th className="p-3 font-medium text-gray-900 border-b">Service required</th>
                                <th className="p-3 font-medium text-gray-900 border-b">Status</th>
                                <th className="p-3 font-medium text-gray-900 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition">
                                        <td className="p-3 border-b">{order.orderNo}</td>
                                        <td className="p-3 border-b">{order.serviceRequired}</td>
                                        <td className="p-3 border-b">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    statusColors[order.status] || "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-3 border-b">
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
        </div>
    );
};

export default OrderTable;
