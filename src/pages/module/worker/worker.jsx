import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Search, Trash2, Filter, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../../hook/useFetch";
import conf from "../../../config";

const Worker = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchAllWorkers();
  }, []);

  useEffect(() => {
    const activeFilters = [...selectedExpertise, ...selectedStatus];
    setFilters(activeFilters);
  }, [selectedExpertise, selectedStatus]);

  const fetchAllWorkers = async () => {
    try {
      setError("");
      setIsLoading(true);

      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/shopkeeper/worker/get-all-worker`,
      });

      if (result.success) {
        const workerData = result.data || [];
        const normalizedWorkers = workerData.map((worker) => ({
          id: worker._id,
          name: worker.name || "Unknown",
          expertise: worker.experties || "N/A",
          phone: worker.contact || "N/A",
          address: worker.address || "N/A",
          status: worker.status || "Pending", // Assuming status exists; adjust as needed
        }));

        setWorkers(normalizedWorkers);

        if (normalizedWorkers.length === 0) {
          toast.info("No workers found");
        }
      } else {
        setError(result.message || "Failed to fetch workers");
        setWorkers([]);
      }
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError(err.message || "Error fetching workers");
      setWorkers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWorker = async (workerId, workerName) => {
    if (!window.confirm(`Are you sure you want to delete ${workerName}?`)) return;

    try {
      setIsLoading(true);
      const result = await fetchData({
        method: "DELETE",
        url: `${conf.apiBaseUrl}/shopkeeper/worker/delete-worker/${workerId}`,
      });

      if (result.success) {
        toast.success(result.message || "Worker deleted successfully");
        fetchAllWorkers();
      } else {
        toast.error(result.message || "Failed to delete worker");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.message || "Error deleting worker");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters([]);
    setSelectedExpertise([]);
    setSelectedStatus([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleCheckboxToggle = (value, type) => {
    const setter = type === "expertise" ? setSelectedExpertise : setSelectedStatus;
    const current = type === "expertise" ? selectedExpertise : selectedStatus;

    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const filteredWorkers = workers
    .filter((worker) => {
      const matchesSearch =
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesExpertise =
        selectedExpertise.length === 0 || selectedExpertise.includes(worker.expertise);

      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(worker.status);

      return matchesSearch && matchesExpertise && matchesStatus;
    });

  const totalPages = Math.ceil(filteredWorkers.length / rowsPerPage);
  const paginatedWorkers = filteredWorkers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
  <div className="p-6 bg-[#E0E9E9] min-h-screen">
    <ToastContainer />
    
    {/* Top Navigation Bar */}
    <div className="bg-white px-6 py-3 shadow-sm border border-teal-200 rounded-md flex items-center justify-between mb-4">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-gray-800">Worker List</h1>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-black" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Worker Name or Phone No. or Address..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-[#1f8a70] text-sm bg-[#e0e9e9] placeholder-black focus:outline-none  focus:ring-[#1f8a70]"
          />
        </div>
      </div>
      <div className="flex-1" />
    </div>

    {/* Combined Filter and Table Container */}
    <div className="bg-white p-4 rounded-md shadow space-y-4">
      
      {/* Filter Section */}
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center text-[#06A77D] text-sm gap-2 hover:text-[#05745a]"
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>

          {/* Display selected filters beside the Filter button */}
          {filters.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center bg-[#DDF0F0] text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow-sm whitespace-nowrap"
                >
                  {filter}
                  <button
                    onClick={() => {
                      setSelectedExpertise((prev) => prev.filter((item) => item !== filter));
                      setSelectedStatus((prev) => prev.filter((item) => item !== filter));
                    }}
                    className="ml-1 text-gray-500 hover:text-red-600 text-xs"
                    title="Remove Filter"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleResetFilters}
          className="bg-[#DDF0F0] hover:bg-[#b7e2e2] text-sm px-4 py-2 rounded-md shadow-sm"
        >
          Reset Filter
        </button>

        {showFilterDropdown && (
          <div className="absolute z-50 mt-12 w-64 bg-white border border-gray-300 rounded-md shadow-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">Expertise</p>
              <button
                onClick={() => setShowFilterDropdown(false)}
                className="text-gray-500 hover:text-red-500 text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-2">
              {["Electrician", "Plumber", "Painter", "Carpenter", "AC Repair", "Tile Fitting"].map((exp) => (
                <label key={exp} className="block text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedExpertise.includes(exp)}
                    onChange={() => handleCheckboxToggle(exp, "expertise")}
                  />
                  <span className="ml-2">{exp}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Worker Table */}
      <div className="overflow-x-auto rounded-md border border-gray-300">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <span className="text-lg">Loading workers...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-48">
            <span className="text-red-500 text-lg">{error}</span>
          </div>
        ) : (
          <>
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-[#f1f8f8] text-gray-700 font-semibold">
                <tr>
                  <th className="px-5 py-3 border-b border-gray-200">Sr.No.</th>
                  <th className="px-5 py-3 border-b border-gray-200">Worker Name</th>
                  <th className="px-5 py-3 border-b border-gray-200">Expertise</th>
                  <th className="px-5 py-3 border-b border-gray-200">Phone Number</th>
                  <th className="px-5 py-3 border-b border-gray-200">Address</th>
                  <th className="px-5 py-3 border-b border-gray-200 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedWorkers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No workers found
                    </td>
                  </tr>
                ) : (
                  paginatedWorkers.map((worker, index) => (
                    <tr key={worker.id} className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="px-5 py-3">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-5 py-3">{worker.name}</td>
                      <td className="px-5 py-3">{worker.expertise}</td>
                      <td className="px-5 py-3">{worker.phone}</td>
                      <td className="px-5 py-3">{worker.address}</td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex justify-center gap-4 text-[15px]">
                          <button
                            onClick={() =>
                              navigate(`/worker/worker-view/${worker.id}`, {
                                state: worker,
                              })
                            }
                            className="text-[#06A77D] hover:text-[#05745a]"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/worker/worker-edit/${worker.id}`, {
                                state: worker,
                              })
                            }
                            className="text-[#06A77D] hover:text-[#05745a]"
                            title="View"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteWorker(worker.id, worker.name)}
                            className="text-[#06A77D] hover:text-[#a72822]"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm">
              <span className="text-gray-600">
                Showing{" "}
                {paginatedWorkers.length > 0
                  ? (currentPage - 1) * rowsPerPage + 1
                  : 0}{" "}
                to {(currentPage - 1) * rowsPerPage + paginatedWorkers.length} of{" "}
                {filteredWorkers.length} Entries
              </span>

              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentPage === i + 1
                        ? "bg-[#06A77D] text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

};

export default Worker;
