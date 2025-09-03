import React, { useEffect, useState, useRef } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "lucide-react";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const filterRef = useRef(null);

  const filterOptions = ["Electrician", "Plumber", "Painter", "AC Repair", "Carpenter"];

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const data = [
          { id: 1, orderNo: "ORD8468163287164", role: "Plumber", name: "William Clarke", updated: "10-05-2025", status: "Pending" },
          { id: 2, orderNo: "ORD8468163287164", role: "AC Repair", name: "Thomas Bennett", updated: "15-05-2025", status: "Paid" },
          { id: 3, orderNo: "ORD8468163287164", role: "Electrician", name: "Charles Turner", updated: "16-07-2025", status: "Pending" },
          { id: 4, orderNo: "ORD8468163287164", role: "Painter", name: "Samuel Hughes", updated: "12-04-2025", status: "Paid" },
          { id: 5, orderNo: "ORD8468163287164", role: "Carpenter", name: "Oliver Foster", updated: "28-05-2025", status: "Pending" },
        ];
        setPayments(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payments");
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleView = (id) => navigate(`/payment/${id}`);
const handlePay = (id) => {
  navigate(`/payment/process/${id}`);
};

  const handleResetFilter = () => setFilters([]);

  const toggleFilter = (option) => {
    if (filters.includes(option)) {
      setFilters(filters.filter(f => f !== option));
    } else {
      setFilters([...filters, option]);
    }
  };

  const filteredPayments = payments.filter(item => {
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());
    const filterMatch = filters.length === 0 || filters.includes(item.role);
    return searchMatch && filterMatch;
  });

  // Close dropdown when clicking outside
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
    <div className="p-4 sm:p-6">
      {/* Header */}
     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow rounded-lg p-4 gap-3">
  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
    Payment Management
  </h2>
  <div className="relative w-full sm:w-80 lg:w-96">
    <FaSearch className="absolute left-3 inset-y-0 my-auto text-gray-400" />
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search worker name..."
      className="pl-10 pr-4 py-2 w-full border border-teal-600 rounded-full bg-teal-50 outline-none"
    />
  </div>
</div>


      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow rounded-lg p-4 mt-6 gap-3 relative">
        <div className="flex flex-wrap gap-3 relative" ref={filterRef}>
          {/* Filter Icon */}
          <div className="relative">
            <button
              className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center"
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            >
              <FaFilter className="text-teal-700" />
            </button>

            {/* Filter Dropdown */}
            {filterDropdownOpen && (
              <div className="absolute top-12 left-0 bg-white shadow-lg border rounded-lg z-50 w-48 p-2">
                {/* Cross button to close dropdown */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setFilterDropdownOpen(false)}
                    className="text-gray-500 font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>

                {filterOptions.map(option => (
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
            <div
              key={filter}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm"
            >
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
          className="px-4 py-2 bg-teal-50 border border-teal-700 text-teal-700 rounded-lg text-sm sm:text-base"
        >
          Reset Filter
        </button>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block bg-white border rounded-lg mt-6 overflow-x-auto">
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
              <tr key={item.id} className="border-b">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3">{item.orderNo}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.updated}</td>
                <td className={`p-3 font-medium ${item.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                  {item.status}
                </td>
                <td className="p-3 flex items-center gap-3">
                  <button
  onClick={() => handleView(item.id)}
  className="text-teal-700 hover:text-teal-900"
>
  <EyeIcon className="w-5 h-5" />
</button>
                  <button
                    onClick={() => handlePay(item.id)}
                    className="text-teal-700 border border-teal-700 px-3 py-1 rounded-lg bg-teal-50"
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
      <div className="grid grid-cols-1 gap-4 md:hidden mt-6">
        {filteredPayments.map((item, index) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="text-xs text-gray-500 mb-1">#{index + 1}</p>
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.role}</p>
            <p className="text-gray-600 text-sm">{item.orderNo}</p>
            <p className="text-gray-500 text-xs">Updated: {item.updated}</p>
            <p className={`text-sm font-medium mt-1 ${item.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
              {item.status}
            </p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleView(item.id)}
                className="text-teal-700 text-sm"
              >
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

      {/* Pagination - Placeholder */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-3 mt-4 rounded-lg gap-2">
        <span className="text-sm font-medium text-gray-700">
          Showing 1 to {filteredPayments.length} of {payments.length} Entries
        </span>
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-teal-700 text-white rounded">1</button>
          <button className="px-2 py-1 bg-teal-50 text-teal-700 rounded">2</button>
          <button className="px-2 py-1 bg-teal-50 text-teal-700 rounded">3</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
