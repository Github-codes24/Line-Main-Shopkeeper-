import React, {useState} from "react";
import {TbSearch, TbFilter} from "react-icons/tb";
import {RxCross2} from "react-icons/rx";
import {HiOutlineEye} from "react-icons/hi";
import FilterPanel from "./FilterPanel";
import {useNavigate} from "react-router-dom";

const allOrders = [
    {id: 1, orderNo: "ORDB8468163287164", customer: "Theresa Webb", service: "Plumber", status: "Pending"},
    {id: 2, orderNo: "ORDB8468163287164", customer: "Jane Cooper", service: "AC Repair", status: "Work in Progress"},
    {id: 3, orderNo: "ORDB8468163287164", customer: "Jacob Jones", service: "Electrician", status: "Work in Progress"},
    {id: 4, orderNo: "ORDB8468163287164", customer: "Brooklyn Simmons", service: "Painter", status: "Completed"},
    {id: 5, orderNo: "ORDB8468163287164", customer: "Jerome Bell", service: "Carpenter", status: "Rejected"},
    {id: 6, orderNo: "ORDB8468163287164", customer: "Annette Black", service: "Plumber", status: "Pending"},
    {id: 7, orderNo: "ORDB8468163287164", customer: "Albert Flores", service: "Electrician", status: "Completed"},
    {id: 8, orderNo: "ORDB8468163287164", customer: "Savannah Nguyen", service: "Painter", status: "Rejected"},
    {id: 9, orderNo: "ORDB8468163287164", customer: "Dianne Russell", service: "Carpenter", status: "Pending"},
    {id: 10, orderNo: "ORDB8468163287164", customer: "Cody Fisher", service: "Electrician", status: "Work in Progress"},
];

const statusColor = {
    Pending: "text-[#FFCC00]",
    "Work in Progress": "text-[#0088FF]",
    Completed: "text-[#34C759]",
    Rejected: "text-[#EC2D01]",
};

const OrderManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedExpertise, setSelectedExpertise] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const navigate = useNavigate();

    const toggleFilter = (type, value) => {
        const updater = type === "expertise" ? setSelectedExpertise : setSelectedStatus;
        const current = type === "expertise" ? selectedExpertise : selectedStatus;

        if (current.includes(value)) {
            updater(current.filter((item) => item !== value));
        } else {
            updater([...current, value]);
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        setSelectedExpertise([]);
        setSelectedStatus([]);
        setCurrentPage(1);
    };

    const handleView = (order) => {
        switch (order.status) {
            case "Pending":
                navigate(`/orders/pending/${order.id}`);
                break;
            case "Work in Progress":
                navigate(`/orders/workinprogress/${order.id}`);
                break;
            case "Completed":
                navigate(`/orders/completed/${order.id}`);
                break;
            case "Rejected":
                navigate(`/orders/rejected/${order.id}`);
                break;
            default:
                navigate(`/orders/${order.id}`);
        }
    };

    const ordersPerPage = 5;
    const filteredOrders = allOrders.filter((order) => {
        const matchesSearch = order.orderNo.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesExpertise = selectedExpertise.length === 0 || selectedExpertise.includes(order.service);
        const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(order.status);
        return matchesSearch && matchesExpertise && matchesStatus;
    });

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const removeFilterTag = (type, value) => {
        if (type === "expertise") {
            setSelectedExpertise(selectedExpertise.filter((item) => item !== value));
        } else {
            setSelectedStatus(selectedStatus.filter((item) => item !== value));
        }
    };

    return (
        <div className="p-3 bg-gray-200 min-h-screen">
            <div className="bg-white p-3 rounded-md shadow-xl flex flex-col sm:flex-row sm:items-center gap-20 mb-3">
                <h1 className="text-2xl font-medium text-black">Order List</h1>
                <div className="flex-1 sm:flex sm:justify-start">
                    <div className="relative w-full sm:w-[420px]">
                        <input
                            type="text"
                            placeholder="Search by order number"
                            className="w-full border-1 border-teal-600 bg-[#F5FFFF] text-[#0D2E28] px-12 py-2 rounded-full placeholder-[#0D2E28] placeholder:font-medium focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <TbSearch
                            className="absolute left-5 top-1/2 -translate-y-1/2 transform text-[#0D2E28]"
                            size={18}
                        />
                    </div>
                </div>
            </div>

            <div className="relative bg-white p-3 rounded-md shadow-xl">
                <div className="flex flex-wrap gap-2 mb-3 text-medium items-center">
                    <button
                        onClick={() => setShowFilter((prev) => !prev)}
                        className="text-gray-600 hover:text-black focus:outline-none"
                    >
                        <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                    </button>

                    {[
                        ...selectedExpertise.map((s) => ({type: "expertise", value: s})),
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
                        onClick={handleReset}
                        className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded"
                    >
                        Reset Filter
                    </button>
                </div>

                {showFilter && (
                    <div className="absolute top-11 -left-2 z-50 w-72 bg-white border rounded-lg shadow-lg p-4">
                        {/* Close Icon for Filter Popup */}
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-medium text-[#0D2E28]">Filters</h2>
                            <RxCross2
                                className="cursor-pointer text-[#007E74] text-xl"
                                onClick={() => setShowFilter(false)}
                            />
                        </div>
                        <FilterPanel
                            selectedExpertise={selectedExpertise}
                            selectedStatus={selectedStatus}
                            toggleFilter={toggleFilter}
                        />
                    </div>
                )}

                {/* Orders Table */}
                <div className="bg-white rounded-lg border-2 border-[#E0E9E9] flex-1">
                    <div className="overflow-x-auto mb-[200px]">
                        <table className="min-w-full bg-white rounded shadow">
                            <thead className="bg-[#E0E9E9] text-[#333333]">
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
                                {currentOrders.map((order, index) => (
                                    <tr key={order.id} className="text-[#333333] text-center">
                                        <td className="py-3 px-4">{indexOfFirstOrder + index + 1}.</td>
                                        <td className="py-2 px-4">{order.orderNo}</td>
                                        <td className="py-2 px-4">{order.customer}</td>
                                        <td className="py-2 px-4">{order.service}</td>
                                        <td className={`py-2 px-4 ${statusColor[order.status]}`}>{order.status}</td>
                                        <td className="py-2 px-4 flex justify-center">
                                            <HiOutlineEye
                                                className="text-[#007E74] text-lg cursor-pointer"
                                                onClick={() => handleView(order)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-4 px-4 py-1 flex bg-[#F5F5F5] justify-between items-center rounded-lg">
                    <span className="text-sm text-[#0D2E28] font-semibold">
                        Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
                        {filteredOrders.length} Entries
                    </span>
                    <div className="flex items-center gap-2 p-1">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            &lt;
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-2 py-1 rounded-md text-sm font-medium ${
                                    currentPage === i + 1 ? "bg-[#007E74] text-white" : "bg-[#D9F1EB] text-[#007E74]"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderManagement;
