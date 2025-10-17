import React from "react";
import {Eye} from "lucide-react";
import {useNavigate} from "react-router-dom";

const statusColors = {
    Assigned: "bg-transparent text-[#1BC47D] border-0",
    Pending: "bg-transparent text-[#FDB913] border-0",
    Completed: "bg-transparent text-[#1BC47D] border-0",
    Rejected: "bg-transparent text-[#FF4444] border-0",
    WorkInProgress: "bg-transparent text-[#FF4444] border-0",
};

const OrderTable = ({orders = []}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-800 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h4
                    className="text-lg font-semibold text-gray-800"
                    style={{
                        fontWeight: 500,
                        fontSize: "18px",
                        color: "rgba(51, 51, 51, 1)",
                    }}
                >
                    Order Management
                </h4>
                <button onClick={() => navigate("/orders")} className="text-sm font-medium text-grey-100 ">
                    See All
                </button>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto rounded-xl border border-gray-800 w-full">
                <table className="w-full text-sm text-gray-700 ">
                    <thead className="bg-gray-100 text-center">
                        <tr className="bg-gray-100 text-center">
                            <th className="p-3 font-medium text-gray-900">Order No.</th>
                            <th className="p-3 font-medium text-gray-900">Service Required</th>
                            <th className="p-3 font-medium text-gray-900">Status</th>
                            <th className="p-3 font-mediumtext-gray-900 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, idx) => (
                            <tr key={idx} className="">
                                <td className="p-3 font-medium text-gray-800 text-center">{order.orderNo}</td>
                                <td className="p-3 font-medium text-gray-800 text-center">{order.serviceRequired}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-medium font-medium ${
                                            statusColors[order.status] ||
                                            "bg-gray-100 text-gray-700 border border-gray-300"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => navigate(`/orders/orderdetails/${order._id}`)}
                                        className="text-teal-600 "
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
