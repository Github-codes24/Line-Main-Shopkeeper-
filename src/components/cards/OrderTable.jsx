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
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Order Management</h4>
                <button
                    onClick={() => navigate("/orders")}
                    className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
                >
                    See All
                </button>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 text-left border-b border-gray-100/70">
                            <th className="p-3 font-semibold text-gray-900">Order No.</th>
                            <th className="p-3 font-semibold text-gray-900">Service Required</th>
                            <th className="p-3 font-semibold text-gray-900">Status</th>
                            <th className="p-3 font-semibold text-gray-900 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100/60"
                            >
                                <td className="p-3">{order.orderNo}</td>
                                <td className="p-3 capitalize">{order.serviceRequired}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            statusColors[order.status] ||
                                            "bg-gray-100 text-gray-700 border border-gray-300"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => navigate(`/orders/${order.orderNo}`)}
                                        className="text-teal-600 hover:text-teal-800 transition-transform duration-200 hover:scale-110"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
