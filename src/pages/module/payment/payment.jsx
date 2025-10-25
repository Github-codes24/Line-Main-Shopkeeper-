import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Eye, X, Search} from "lucide-react";
import {TbFilter} from "react-icons/tb";
import {toast} from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        console.log("🔑 Auth Token exists:", !!token);
        if (!token) {
            console.warn("⚠️ NO AUTH TOKEN FOUND! This might be why the API returns empty data.");
        }
    }, []);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const SHOPKEEPER_ID = "68e9efe94264d4f95dc18389";

    const [filters, setFilters] = useState([]);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

    const filterOptions = ["Electrician", "Painter", "Carpenter", "AC Repair", "Tile Fitting", "Plumber"];

    useEffect(() => {
        const fetchPaymentsData = async () => {
            try {
                setLoading(true);
                setError(null);

                const payload = {
                    shopkeeperId: SHOPKEEPER_ID,
                };

                console.log("=== API REQUEST DEBUG ===");
                console.log("URL:", `${conf.apiBaseUrl}/shopkeeper/payments/`);
                console.log("Payload:", payload);
                console.log("Method:", "POST");

                const response = await fetch(`${conf.apiBaseUrl}/shopkeeper/payments/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                const result = await response.json();

                console.log("=== API RESPONSE DEBUG ===");
                console.log("Full Response:", result);
                console.log("Success:", result?.success);
                console.log("Total Orders:", result?.totalOrders);
                console.log("Orders Array:", result?.orders);

                if (result && result.success) {
                    const ordersData = result.orders || [];

                    const formattedPayments = ordersData.map((p) => ({
                        id: p._id,
                        orderNo: p.orderId || "N/A",
                        role: p.workerExperties || "N/A",
                        name: p.workerName || "N/A",
                        updated: new Date(p.updatedAt || Date.now()).toLocaleDateString("en-IN"),
                        status: p.paymentStatus === "Pending" ? "Pending" : "Paid",
                        bookingType: p.bookingType || "Normal",
                    }));

                    setPayments(formattedPayments);
                    const total = result.totalOrders || ordersData.length;
                    setTotalCount(total);
                    setTotalPages(Math.ceil(total / 10));
                } else {
                    throw new Error(result.message || "API request failed");
                }
            } catch (err) {
                const errorMessage = err.message || "Failed to fetch payments";
                setError(errorMessage);
                toast.error(errorMessage);
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentsData();
    }, []);

    const handleView = (id) => {
        const payment = payments.find((p) => p.id === id);
        if (!payment) return toast.error("Payment not found!");
        if (payment.bookingType === "Full Work") {
            navigate(`/payment/process-fullwork/${id}`);
        } else {
            navigate(`/payment/process/${id}`);
        }
    };

    const handlePay = (id) => {
        const payment = payments.find((p) => p.id === id);
        if (!payment) return toast.error("Payment not found!");

        if (payment.bookingType === "Full Work") {
            navigate(`/payment/process-fullwork/${id}`);
        } else {
            navigate(`/payment/process/${id}`);
        }
    };

    const handleResetFilter = () => {
        setFilters([]);
        setSearch("");
        setCurrentPage(1);
    };

    const toggleFilter = (option) => {
        setFilters((prev) => (prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]));
        setCurrentPage(1);
    };

    const removeFilter = (option) => {
        setFilters((prev) => prev.filter((f) => f !== option));
        setCurrentPage(1);
    };

    const filteredPayments = payments.filter((item) => {
        const searchMatch =
            search === "" ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.orderNo.toLowerCase().includes(search.toLowerCase());
        const filterMatch = filters.length === 0 || filters.includes(item.role);
        return searchMatch && filterMatch;
    });

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);
    const calculatedTotalPages = Math.ceil(filteredPayments.length / 10);

    return (
        <div className="flex bg-[#E0E9E9] font-medium">
            <main className="flex-1 p-3 gap-2">
                <div className="flex flex-col md:flex-row justify-start items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-24">
                    <h1
                        className="text-lg md:text-xl font-semibold"
                        style={{
                            fontWeight: 500,
                            fontSize: "20px",
                            color: "rgba(51, 51, 51, 1)",
                        }}
                    >
                        Payment Management
                    </h1>

                    <div className="flex items-center border border-teal-600 rounded-full px-3 py-1 w-full sm:w-[300px] bg-gray-200">
                        <Search className="text-teal-600 mr-2" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Worker Name or Order No..."
                            value={search}
                            className="flex-1 outline-none bg-transparent text-sm placeholder-black"
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                            className="border px-2 py-1 rounded bg-[#E0E9E9] "
                        >
                            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                        </button>

                        {filters.map((filter) => (
                            <span
                                key={filter}
                                className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm"
                            >
                                {filter}
                                <X className="w-4 h-4 ml-2 cursor-pointer " onClick={() => removeFilter(filter)} />
                            </span>
                        ))}
                        {search && (
                            <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {`Search: "${search}"`}
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
                                            <label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Loading payments...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : paginatedPayments.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No payments found matching your criteria.</p>
                            </div>
                        ) : (
                            <table
                                className="hidden sm:table w-full text-left rounded-md shadow-lg border border-[#616666] border-separate overflow-hidden"
                                style={{borderSpacing: 0}}
                            >
                                <thead className="bg-[#e0e9e9] text-sm md:text-base">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-center">Sr.No</th>
                                        <th className="px-4 py-3 font-medium text-center">Order No.</th>
                                        <th className="px-4 py-3 font-medium text-center">Worker Role</th>
                                        <th className="px-4 py-3 font-medium text-center">Worker Name</th>
                                        <th className="px-4 py-3 font-medium text-center">Last Updated</th>
                                        <th className="px-4 py-3 font-medium text-center">Settlement Status</th>
                                        <th className="px-4 py-3 font-medium text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    {paginatedPayments.map((item, index) => (
                                        <tr key={item.id} className=" border-b border-gray-200">
                                            <td className="px-4 py-3 font-normal text-center">
                                                {startIndex + index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-normal text-center">{item.orderNo}</td>
                                            <td className="px-4 py-3 font-normal text-center">{item.role}</td>
                                            <td className="px-4 py-3 font-normal text-center">{item.name}</td>
                                            <td className="px-4 py-3 font-normal text-center">{item.updated}</td>
                                            <td
                                                className={`px-4 py-3 font-normal text-center ${
                                                    item.status === "Paid" ? "text-green-500" : "text-yellow-500"
                                                }`}
                                            >
                                                {item.status}
                                            </td>
                                            <td className="px-4 py-3 font-normal text-center">
                                                <div className="flex items-center gap-3 justify-center text-gray-700">
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

                {!loading && !error && calculatedTotalPages > 0 && (
                    <div className="w-full flex flex-col bg-white md:flex-row justify-between items-center gap-2 p-3 text-sm font-semibold text-black rounded-lg shadow">
                        <span>
                            Showing {paginatedPayments.length} of {filteredPayments.length} Entries
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-teal-700  rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                &lt;
                            </button>
                            {Array.from({length: calculatedTotalPages}, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded transition-colors ${
                                        currentPage === i + 1 ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-700 "
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, calculatedTotalPages))}
                                disabled={currentPage === calculatedTotalPages}
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
