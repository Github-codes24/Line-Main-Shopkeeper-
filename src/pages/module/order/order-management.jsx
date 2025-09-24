import React, { useState, useEffect } from "react";
import { TbSearch, TbFilter } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const statusColor = {
  Pending: "text-[#FFCC00]",
  "Work in Progress": "text-[#0088FF]",
  Completed: "text-[#34C759]",
  Rejected: "text-[#EC2D01]",
};

// Token from backend auth (replace with dynamic from localStorage later)
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const payload = {
          shopkeeperId: "68c3fcbe4b8c59bf22f89314", // required field
          search: searchQuery || "",
          page: currentPage,
          limit: 10,
        };

        const res = await axios.post(
          "https://linemen-be-1.onrender.com/shopkeeper/orders",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setOrders(res.data?.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data || err.message);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, searchQuery]);

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
    switch (order.orderStatus) {
      case "Pending":
        navigate(`/orders/pending/${order._id}`);
        break;
      case "Work in Progress":
        navigate(`/orders/workinprogress/${order._id}`);
        break;
      case "Completed":
        navigate(`/orders/completed/${order._id}`);
        break;
      case "Rejected":
        navigate(`/orders/rejected/${order._id}`);
        break;
      default:
        navigate(`/orders/${order._id}`);
    }
  };

  const ordersPerPage = 5;

  // Filters with correct response fields
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderId
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesExpertise =
      selectedExpertise.length === 0 ||
      selectedExpertise.includes(order.specificServiceName);
    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(order.orderStatus);

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
      {/* Header */}
      <div className="bg-white p-3 rounded-md shadow-sm flex flex-col sm:flex-row sm:items-center gap-20 mb-3">
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

      {/* Table & Filters */}
      <div className="relative bg-white p-3 rounded-md shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-3 text-medium items-center">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
          </button>

          {[...selectedExpertise.map((s) => ({ type: "expertise", value: s })), 
            ...selectedStatus.map((s) => ({ type: "status", value: s }))].map(
            (tag, idx) => (
              <span
                key={idx}
                className="bg-[#E0E9E9] px-3 py-1 text-center rounded-full text-sm text-[#0D2E28] flex flex-row items-center gap-2"
              >
                {tag.value}
                <RxCross2
                  className="cursor-pointer"
                  onClick={() => removeFilterTag(tag.type, tag.value)}
                />
              </span>
            )
          )}

          <button
            onClick={handleReset}
            className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded"
          >
            Reset Filter
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border-2 border-[#E0E9E9] flex-1">
          {loading ? (
            <p className="p-4 text-center">Loading orders...</p>
          ) : error ? (
            <p className="p-4 text-center text-red-500">{error}</p>
          ) : (
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
                    <tr key={order._id} className="text-[#333333] text-center">
                      <td className="py-3 px-4">{indexOfFirstOrder + index + 1}.</td>
                      <td className="py-2 px-4">{order.orderId}</td>
                      <td className="py-2 px-4">{order.customer?.name}</td>
                      <td className="py-2 px-4">{order.specificServiceName}</td>
                      <td
                        className={`py-2 px-4 ${
                          statusColor[order.orderStatus] || "text-black"
                        }`}
                      >
                        {order.orderStatus}
                      </td>
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
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && (
          <div className="mt-4 px-4 py-1 flex bg-[#F5F5F5] justify-between items-center rounded-lg">
            <span className="text-sm text-[#0D2E28] font-semibold">
              Showing {indexOfFirstOrder + 1} to{" "}
              {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} Entries
            </span>
            <div className="flex items-center gap-2 p-1">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-1 rounded-md text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-[#007E74] text-white"
                      : "bg-[#D9F1EB] text-[#007E74]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
