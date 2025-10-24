import React, {useState, useEffect} from "react";
import {TbSearch, TbFilter} from "react-icons/tb";
import {RxCross2} from "react-icons/rx";
import {HiOutlineEye} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import UseOrder from "../../../hook/order/UseOrder";

const statusColor = {
    Pending: "text-[#FFCC00]",
    WorkInProgress: "text-[#0088FF]",
    "Work in Progress": "text-[#0088FF]",
    Completed: "text-[#34C759]",
    Rejected: "text-[#EC2D01]",
    PendingCustomerConfirmation: "text-[#FF8800]",
};

const OrderManagement = () => {
    const navigate = useNavigate();
    const shopId = sessionStorage.getItem("shopId");
    const {loading, getOrders, fetchAllOrders} = UseOrder();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [search, setSearch] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [expertise, setSelectedExpertise] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    const expertiseOptions = ["Electrician", "Painter", "Carpenter", "AC Repair", "Tile Fitting", "Plumber"];
    const statusOptions = ["All", "Work in Progress", "Pending", "Completed", "Rejected"];

    useEffect(() => {
        fetchAllOrders(shopId, page, limit, search, expertise);
    }, [page, limit, search, expertise]);

    useEffect(() => {
        if (getOrders?.orders?.length > 0) {
            let orders = [...getOrders.orders];

            if (expertise.length > 0) {
                orders = orders.filter((order) => expertise.includes(order.specificServiceName));
            }

            if (selectedStatus.length > 0 && !selectedStatus.includes("All")) {
                orders = orders.filter((order) => selectedStatus.includes(order.orderStatus));
            }

            setFilteredOrders(orders);
        } else {
            setFilteredOrders([]);
        }
    }, [getOrders, expertise, selectedStatus]);

    const toggleFilter = (type, value) => {
        const updater = type === "expertise" ? setSelectedExpertise : setSelectedStatus;
        const current = type === "expertise" ? expertise : selectedStatus;

        if (current.includes(value)) {
            updater(current.filter((item) => item !== value));
        } else {
            updater([...current, value]);
        }
    };

    const removeFilterTag = (type, value) => {
        if (type === "expertise") {
            setSelectedExpertise(expertise.filter((item) => item !== value));
        } else {
            setSelectedStatus(selectedStatus.filter((item) => item !== value));
        }
    };

    const handleReset = () => {
        setSelectedExpertise([]);
        setSelectedStatus([]);
    };

    return (
        <div className="p-3 bg-gray-200 min-h-screen">
            <div className="bg-white p-3 rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center gap-20 mb-3">
                <h1
                    style={{
                        fontWeight: 500,
                        fontSize: "20px",
                        color: "rgba(51, 51, 51, 1)",
                    }}
                >
                    Order List
                </h1>
                <div className="flex-1 sm:flex sm:justify-start">
                    <div className="relative w-full sm:w-[420px]">
                        <input
                            type="text"
                            placeholder="Search by order number"
                            className="w-full border-1 border-teal-600 bg-[#F5FFFF] text-[#0D2E28] px-12 py-2 rounded-full placeholder-[#0D2E28] placeholder:font-medium focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <TbSearch
                            className="absolute left-5 top-1/2 -translate-y-1/2 transform text-[#0D2E28]"
                            size={18}
                        />
                    </div>
                </div>
            </div>

            <div className="relative bg-white p-3 rounded-md shadow-sm min-h-screen">
                <div className="flex flex-wrap gap-2 mb-3 text-medium items-center relative">
                    <button
                        className="text-gray-600 hover:text-black focus:outline-none"
                        onClick={() => setShowFilter((prev) => !prev)}
                    >
                        <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                    </button>

                    {[
                        ...expertise.map((s) => ({type: "expertise", value: s})),
                        ...selectedStatus.map((s) => ({type: "status", value: s})),
                    ].map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-[#E0E9E9] px-3 py-1 text-center rounded-full text-sm text-[#0D2E28] flex flex-row items-center gap-2"
                        >
                            {tag.value}
                            <RxCross2 className="cursor-pointer" onClick={() => removeFilterTag(tag.type, tag.value)} />
                        </span>
                    ))}

                    <button
                        className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded"
                        onClick={handleReset}
                    >
                        Reset Filter
                    </button>

                    {showFilter && (
                        <div className="absolute top-10 left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 w-[280px]">
                            <h3 className="font-semibold text-[#007E74] mb-2">Filter by Service</h3>
                            <div className="flex flex-col gap-1 mb-3">
                                {expertiseOptions.map((option) => (
                                    <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={expertise.includes(option)}
                                            onChange={() => toggleFilter("expertise", option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>

                            <h3 className="font-semibold text-[#007E74] mb-2">Filter by Status</h3>
                            <div className="flex flex-col gap-1">
                                {statusOptions.map((option) => (
                                    <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={selectedStatus.includes(option)}
                                            onChange={() => toggleFilter("status", option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg border border-[#616666] flex-1">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded shadow ">
                            <thead
                                style={{
                                    fontWeight: 400,
                                    fontSize: "16px",
                                    color: "rgba(51, 51, 51, 1)",
                                    background: "#E0E9E9",
                                }}
                            >
                                <tr className="text-center">
                                    <th className="py-2 px-4">Sr. No.</th>
                                    <th className="py-2 px-4">Order No.</th>
                                    <th className="py-2 px-4">Customer Name</th>
                                    <th className="py-2 px-4">Service required</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-10 text-[#0D2E28] font-medium tracking-wide"
                                        >
                                            Loading Orders...
                                        </td>
                                    </tr>
                                ) : filteredOrders?.length > 0 ? (
                                    filteredOrders.map((order, index) => (
                                        <tr key={order._id} className="text-[#333333] text-center">
                                            <td className="py-3 px-4">{(page - 1) * limit + (index + 1)}</td>
                                            <td className="py-2 px-4">{order.orderId || "NA"}</td>
                                            <td className="py-2 px-4">{order.customer?.name || "NA"}</td>
                                            <td className="py-2 px-4">{order.specificServiceName || "NA"}</td>
                                            <td
                                                className={`py-2 px-4 ${
                                                    statusColor[order.orderStatus] || "text-black"
                                                }`}
                                            >
                                                {order.orderStatus || "NA"}
                                            </td>
                                            <td className="py-2 px-4 flex justify-center">
                                                <IconButton
                                                    onClick={() => navigate(`/orders/orderdetails/${order._id}`)}
                                                >
                                                    <HiOutlineEye className="text-[#007E74] text-lg cursor-pointer" />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-gray-500 font-medium">
                                            Order data not found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-4 px-4 py-1 flex bg-white justify-between items-center rounded-lg">
                {getOrders?.totalOrders > 0 ? (
                    <>
                        <span className="text-sm text-[#0D2E28] font-semibold">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, getOrders?.totalOrders || 0)} of{" "}
                            {getOrders?.totalOrders || 0} Entries
                        </span>

                        <div className="flex items-center gap-2 p-1">
                            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                                &lt;
                            </button>

                            {[...Array(getOrders?.totalPages || 0)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                                        page === i + 1 ? "bg-[#007E74] text-white" : "bg-[#D9F1EB] text-[#007E74]"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button onClick={() => setPage(page + 1)} disabled={page === getOrders?.totalPages}>
                                &gt;
                            </button>
                        </div>
                    </>
                ) : (
                    <span className="w-full text-center text-sm text-gray-500 font-medium py-2">
                        No entries available
                    </span>
                )}
            </div>
        </div>
    );
};

export default OrderManagement;
