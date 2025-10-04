import React, {useEffect, useState, useRef} from "react";
import {FaFilter, FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {EyeIcon} from "lucide-react";
import { CiFilter } from "react-icons/ci";


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
    const SHOPKEEPER_ID = "68c3c3d0357c37bfad321962"; // Should come from auth context

    const [filters, setFilters] = useState([]);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const filterRef = useRef(null);

    const filterOptions = ["Electrician", "Plumber", "Painter", "AC Repair", "Carpenter"];

    useEffect(() => {
        const fetchPaymentsData = async () => {
            try {
                setLoading(true);
                const data = await fetchAllPayments(SHOPKEEPER_ID, search, currentPage, 10);
                
                if (data && data.success) {
                    // --- UPDATED MAPPING LOGIC BASED ON NEW JSON ---
                    const formattedPayments = data.payments.map(p => ({
                        id: p._id,
                        orderNo: p.bookingId?.orderId || p.orderId, // Use nested orderId first
                        role: p.worker?.experties || 'N/A', // Handles null worker
                        name: p.worker?.name || 'N/A', // Handles null worker
                        updated: new Date(p.updatedAt || Date.now()).toLocaleDateString("en-IN"),
                        status: p.status === 'settled' ? 'Paid' : 'Pending',
                    }));
                    setPayments(formattedPayments);
                    setTotalPages(data.totalPages);
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

    const handleResetFilter = () => setFilters([]);

    const toggleFilter = (option) => {
        setFilters(prev => prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]);
    };

    const filteredPayments = payments.filter((item) => {
        const filterMatch = filters.length === 0 || filters.includes(item.role);
        return filterMatch;
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        // --- UI REMAINS UNCHANGED ---
        <div className="sm:p-2 bg-gray-200">
            {/* Header - separate card */}
            <div className="bg-white rounded-md p-3 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
                <div className="flex items-center">
                    {/* Title Left */}
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 whitespace-nowrap">
                        Payment Management
                    </h2>

                    {/* Spacer + Search Bar Center */}
                    <div className="flex-1 flex justify-center">
                       <div className="relative w-full sm:w-96">
  <FaSearch className="absolute left-4 inset-y-0 my-auto text-[#0D2E28]" />
  <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search worker name here..."
  className="w-full h-10 pl-10 pr-4 py-2 border border-teal-500 rounded-full bg-[#E0E9E9] outline-none shadow-sm focus:border-teal-600 
             text-[#0D2E28] text-base font-medium font-poppins placeholder:text-[#0D2E28]"
/>

</div>

                    </div>
                </div>
            </div>

            <>
    {/* Filter Bar + Table - Merged Card */}
    <div className="bg-white rounded-md p-4 mt-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative">
            <div className="flex flex-wrap gap-3 relative" ref={filterRef}>
                {/* Filter Icon */}
                <div className="relative">
                    <button
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"
                        onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                    >
                        <CiFilter className="" />
                    </button>

                    {/* Filter Dropdown */}
                    {filterDropdownOpen && (
                        <div className="absolute top-12 left-0 bg-white shadow-lg border rounded-lg z-50 w-48 p-2">
                            <div className="flex justify-end mb-2">
                                <button
                                    onClick={() => setFilterDropdownOpen(false)}
                                    className="text-gray-500 font-bold text-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            {filterOptions.map((option) => (
                                <div
                                    key={option}
                                    className={`p-2 cursor-pointer hover:bg-teal-50 flex justify-between items-center ${
                                        filters.includes(option) ? "bg-teal-100" : ""
                                    }`}
                                    onClick={() => toggleFilter(option)}
                                >
                                    <span>{option}</span>
                                    {filters.includes(option) && <span></span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selected Filters */}
                {filters.map((filter) => (
                    <div key={filter} className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm">
                        <span className="text-gray-800">{filter}</span>
                        <button
                            className="ml-2 text-gray-500"
                            onClick={() => setFilters(filters.filter((f) => f !== filter))}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleResetFilter}
                className="w-52 h-10 bg-teal-50 border border-[#007E74] text-[#007E74] rounded-md font-medium text-sm sm:text-base"
            >
                Reset Filter
            </button>
        </div>

       {/* Table - Desktop */}
<div className="hidden md:block mt-4 overflow-x-auto border border-zinc-950 rounded-lg  h-[682px] opacity-100">
    <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-200 text-gray-800">
            <tr>
                <th className="p-3">Sr.No</th>
                <th className="p-3">Order No.</th>
                <th className="p-3">Worker Role</th>
                <th className="p-3">Worker Name</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Settlement Status</th>
                <th className="p-3">Action</th>
            </tr>
        </thead>
        <tbody>
            {filteredPayments.map((item, index) => (
                <tr key={item.id}>
                    <td className="p-3 text-center">{index + 1}</td>
                    <td className="p-3">{item.orderNo}</td>
                    <td className="p-3">{item.role}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.updated}</td>
                    <td
                        className={`p-3 font-medium ${
                            item.status === "Paid" ? "text-green-600" : "text-yellow-600"
                        }`}
                    >
                        {item.status}
                    </td>
                    <td className="p-3 flex items-center gap-3">
                        <button
                            className="text-teal-700 hover:text-teal-900"
                        >
                            <EyeIcon className="w-5 h-5" />
                        </button>
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
</div>

        {/* Card Layout - Mobile */}
        <div className="grid grid-cols-1 gap-4 md:hidden mt-4">
            {filteredPayments.map((item, index) => (
                <div key={item.id} className="border rounded-lg p-4 shadow-sm bg-white">
                    <p className="text-xs text-gray-500 mb-1">#{index + 1}</p>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.role}</p>
                    <p className="text-gray-600 text-sm">{item.orderNo}</p>
                    <p className="text-gray-500 text-xs">Updated: {item.updated}</p>
                    <p
                        className={`text-sm font-medium mt-1 ${
                            item.status === "Paid" ? "text-green-600" : "text-yellow-600"
                        }`}
                    >
                        {item.status}
                    </p>
                    <div className="flex gap-3 mt-3">
                        <button onClick={() => handleView(item.id)} className="text-teal-700 text-sm">
                            👁️
                        </button>
                        <button
                            onClick={() => handlePay(item.id)}
                            className="text-teal-700 border border-teal-700 px-3 py-1 rounded-lg bg-teal-50 text-sm"
                        >
                            Pay
                        </button>
                    </div>
                </div>
            ))}
        </div>


  {/* Pagination -- MOVED OUTSIDE as a SEPARATE BLOCK */}
<div className="h-[40px] flex justify-between items-center rounded-lg opacity-100 px-4 py-2 bg-gray-200 mt-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]">
  <span className="text-sm font-medium text-gray-700">
    Showing 1 to {filteredPayments.length} of {payments.length} Entries
  </span>

  {/* Page buttons */}
  <div className="flex items-center gap-2">
    {/* Prev Button */}
    <button
      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
      disabled={currentPage === 1}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-teal-700 bg-white hover:bg-teal-50 shadow-sm disabled:opacity-50"
    >
      ‹
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages).keys()].map(num => (
      <button
        key={num + 1}
        onClick={() => setCurrentPage(num + 1)}
        className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium transition-colors shadow-sm
          ${
            currentPage === num + 1
              ? "bg-teal-700 text-white"
              : "bg-teal-100 text-teal-700 hover:bg-teal-200"
          }`}
      >
        {num + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
      disabled={currentPage === totalPages}
      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-teal-700 bg-white hover:bg-teal-50 shadow-sm disabled:opacity-50"
    >
      ›
    </button>
  </div>
</div>


    </div>

    
</>
        </div>
    );
};

export default Payment;