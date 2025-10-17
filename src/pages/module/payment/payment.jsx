import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, X, Search } from "lucide-react";
import { TbFilter } from "react-icons/tb";
import { toast } from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    // State for API
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const SHOPKEEPER_ID = "68c3c3d0357c37bfad321962";

    const [filters, setFilters] = useState([]);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

    const filterOptions = [
        "Electrician",
        "Painter",
        "Carpenter",
        "AC Repair",
        "Tile Fitting",
        "Plumber",
    ];

    useEffect(() => {
        const fetchPaymentsData = async () => {
            try {
                setLoading(true);
                setError(null);

                const payload = {
                    shopkeeperId: SHOPKEEPER_ID,
                    search: search,
                    page: currentPage,
                    limit: 10,
                };

                const result = await fetchData({
                    method: "POST",
                    url: `${conf.apiBaseUrl}/shopkeeper/payments/`,
                    data: payload,
                    headers: { "Content-Type": "application/json" },
                });

                if (result && result.success) {
                    const formattedPayments = result.payments.map(p => ({
                        id: p._id,
                        orderNo: p.bookingId?.orderId || p.orderId,
                        role: p.worker?.experties || 'N/A',
                        name: p.worker?.name || 'N/A',
                        updated: new Date(p.updatedAt || Date.now()).toLocaleDateString("en-IN"),
                        status: p.status === 'settled' ? 'Paid' : 'Pending',
                    }));
                    setPayments(formattedPayments);
                    setTotalPages(result.totalPages || 1);
                    setTotalCount(result.total || formattedPayments.length);
                } else {
                    throw new Error(result.message || "API request failed");
                }
            } catch (err) {
                const errorMessage = "Failed to fetch payments";
                setError(errorMessage);
                toast.error(errorMessage);
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
                <div className="flex flex-col md:flex-row justify-start items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-24">
                    <h1 className="text-lg md:text-xl font-semibold" style={{
                        fontWeight: 500,
                        fontSize: '20px',
                        color: 'rgba(51, 51, 51, 1)'
                    }}>Payment Management</h1>

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
                            className="border px-2 py-1 rounded bg-[#E0E9E9] "
                        >
                            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                        </button>

                        {filters.map((filter) => (
                            <span key={filter} className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {filter}
                                <X className="w-4 h-4 ml-2 cursor-pointer " onClick={() => removeFilter(filter)} />
                            </span>
                        ))}
                        {search && (
                            <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {`Name: "${search}"`}
                                <X className="w-4 h-4 ml-2 cursor-pointer " onClick={() => setSearch("")} />
                            </span>
                        )}

                        <button
                            onClick={handleResetFilter}
                            className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded "
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
                                                className="cursor-pointer"
                                            />
                                            <label htmlFor={option} className="cursor-pointer">{option}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Loading payments...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : filteredPayments.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No payments found matching your criteria.</p>
                            </div>
                        ) : (
                            <table className="hidden sm:table w-full text-left rounded-md shadow-lg border border-[#616666] border-separate overflow-hidden" style={{ borderSpacing: 0 }}>
                                <thead className="bg-[#e0e9e9] text-sm md:text-base">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Sr.No</th>
                                        <th className="px-4 py-3 font-medium">Order No.</th>
                                        <th className="px-4 py-3 font-medium">Worker Role</th>
                                        <th className="px-4 py-3 font-medium">Worker Name</th>
                                        <th className="px-4 py-3 font-medium">Last Updated</th>
                                        <th className="px-4 py-3 font-medium">Settlement Status</th>
                                        <th className="px-4 py-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    {filteredPayments.map((item, index) => (
                                        <tr key={item.id} className=" border-b border-gray-200">
                                            <td className="px-4 py-3 font-normal">{(currentPage - 1) * 10 + index + 1}</td>
                                            <td className="px-4 py-3 font-normal">{item.orderNo}</td>
                                            <td className="px-4 py-3 font-normal">{item.role}</td>
                                            <td className="px-4 py-3 font-normal">{item.name}</td>
                                            <td className="px-4 py-3 font-normal">{item.updated}</td>
                                            <td className={`px-4 py-3 font-normal ${item.status === "Paid" ? "text-green-500" : "text-yellow-500"}`}>
                                                {item.status}
                                            </td>
                                            <td className="px-4 py-3 font-normal">
                                                <div className="flex items-center gap-3 text-gray-700">
                                                    <Eye
                                                        onClick={() => handlePay(item.id)}
                                                        className="w-5 h-5 cursor-pointer text-[#06A77D] "
                                                        title="View Payment"
                                                    />
                                                    <button
                                                        onClick={() => handlePay(item.id)}
                                                        className="text-teal-700 border border-teal-700 px-3 py-1 rounded-lg bg-[#D9F1EB] "
                                                    >
                                                        Pay
                                                    </button>
                                                </div>
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
                    <div className="w-full flex flex-col bg-white md:flex-row justify-between items-center gap-2 p-3 text-sm font-semibold text-black rounded-lg shadow">
                        <span>
                            Showing {filteredPayments.length} of {totalCount} Entries
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-teal-700  rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                &lt;
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded transition-colors ${currentPage === i + 1 ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-700 "}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-teal-700  rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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