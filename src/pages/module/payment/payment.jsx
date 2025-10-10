import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, Filter, X, Search } from "lucide-react";
import { TbFilter } from "react-icons/tb";

// --- API Helper Function ---
async function fetchAllPayments(shopkeeperId, searchTerm, page, limit) {
    const apiUrl = 'https://linemen-be-1.onrender.com/shopkeeper/payments/';
    const payload = {
        shopkeeperId,
        search: searchTerm,
        page,
        limit,
    };
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
}

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // State for API
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const SHOPKEEPER_ID = "68c3c3d0357c37bfad321962";

    const [filters, setFilters] = useState([]);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

    const filterOptions = ["Electrician",
       "Painter",
        "Carpenter",
        "AC Repair",
        "Tile Fitting",
          "Plumber",];

    useEffect(() => {
        const fetchPaymentsData = async () => {
            try {
                setLoading(true);
                const data = await fetchAllPayments(SHOPKEEPER_ID, search, currentPage, 10);

                if (data && data.success) {
                    const formattedPayments = data.payments.map(p => ({
                        id: p._id,
                        orderNo: p.bookingId?.orderId || p.orderId,
                        role: p.worker?.experties || 'N/A',
                        name: p.worker?.name || 'N/A',
                        updated: new Date(p.updatedAt || Date.now()).toLocaleDateString("en-IN"),
                        status: p.status === 'settled' ? 'Paid' : 'Pending',
                    }));
                    setPayments(formattedPayments);
                    setTotalPages(data.totalPages);
                    setTotalCount(data.total || formattedPayments.length);
                } else {
                    throw new Error("API request failed");
                }
            } catch (err) {
                setError("Failed to fetch payments");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchPaymentsData();
        }, 500);

        return () => clearTimeout(timer);
    }, [search, currentPage]);

    const handleView = (id) => navigate(`/payment/${id}`);
    const handlePay = (id) => navigate(`/payment/process/${id}`);

    const handleResetFilter = () => {
        setFilters([]);
        setSearch("");
        setCurrentPage(1);
    };

    const toggleFilter = (option) => {
        setFilters(prev => prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]);
        setCurrentPage(1);
    };

    const removeFilter = (option) => {
        setFilters(prev => prev.filter(f => f !== option));
        setCurrentPage(1);
    };

    const filteredPayments = payments.filter((item) => {
        const filterMatch = filters.length === 0 || filters.includes(item.role);
        return filterMatch;
    });

    return (
        <div className="flex bg-[#E0E9E9] font-medium">
            <main className="flex-1 p-3 gap-2">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-3">
                    <h1 className="text-lg md:text-xl font-semibold">Payment Management</h1>

                    {/* Search */}
                    <div className="flex items-center border border-teal-600 rounded-full px-3 py-1 w-full sm:w-[300px] bg-gray-200">
                        <Search className="text-teal-600 mr-2" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Worker Name..."
                            value={search}
                            className="flex-1 outline-none bg-transparent text-sm placeholder-black"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* Filters & Table */}
                <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <button 
                            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)} 
                            className="border px-2 py-1 rounded bg-[#E0E9E9]"
                        >
                            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                        </button>

                        {filters.map((filter) => (
                            <span key={filter} className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {filter}
                                <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => removeFilter(filter)} />
                            </span>
                        ))}
                        {search && (
                            <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {`Name: "${search}"`}
                                <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => setSearch("")} />
                            </span>
                        )}

                        <button 
                            onClick={handleResetFilter} 
                            className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded"
                        >
                            Reset Filter
                        </button>
                    </div>

                    {/* Dropdown */}
                    {filterDropdownOpen && (
                        <div className="absolute top-16 left-3 bg-white border rounded shadow-md p-4 w-64 z-50">
                            <div className="mb-3">
                                <h4 className="font-semibold text-sm mb-2">Expertise</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {filterOptions.map((option) => (
                                        <li key={option} className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                id={option} 
                                                checked={filters.includes(option)} 
                                                onChange={() => toggleFilter(option)} 
                                            />
                                            <label htmlFor={option}>{option}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <table className="hidden sm:table w-full text-left rounded-lg shadow-lg border border-[#616666]">
                                <thead className="bg-[#e0e9e9] text-sm md:text-base">
                                    <tr>
                                        <th className="px-4 py-3">Sr.No</th>
                                        <th className="px-4 py-3">Order No.</th>
                                        <th className="px-4 py-3">Worker Role</th>
                                        <th className="px-4 py-3">Worker Name</th>
                                        <th className="px-4 py-3">Last Updated</th>
                                        <th className="px-4 py-3">Settlement Status</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    {filteredPayments.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">{(currentPage - 1) * 10 + index + 1}</td>
                                            <td className="px-4 py-3">{item.orderNo}</td>
                                            <td className="px-4 py-3">{item.role}</td>
                                            <td className="px-4 py-3">{item.name}</td>
                                            <td className="px-4 py-3">{item.updated}</td>
                                            <td className={`px-4 py-3 font-semibold ${item.status === "Paid" ? "text-green-500" : "text-yellow-500"}`}>
                                                {item.status}
                                            </td>
                                            <td className="px-4 py-3 flex items-center gap-3 text-gray-700">
                                                <Eye
                                                    onClick={() => handleView(item.id)}
                                                    className="w-5 h-5 cursor-pointer text-[#06A77D]"
                                                />
                                                <button
                                                    onClick={() => handlePay(item.id)}
                                                    className="text-teal-700 border border-teal-700 px-3 py-1 rounded-lg bg-[#D9F1EB]"
                                                >
                                                    Pay
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {!loading && !error && totalPages > 0 && (
                    <div className="w-full flex flex-col bg-[#F5F5F5] md:flex-row justify-between items-center gap-2 p-2 text-sm font-semibold text-black">
                        <span>
                            Showing {filteredPayments.length} of {totalCount} Entries
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-2 py-1 text-teal-700 hover:bg-purple-100 rounded disabled:opacity-50"
                            >
                                &lt;
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-700"}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-2 py-1 text-teal-700 hover:bg-purple-100 rounded disabled:opacity-50"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Payment;