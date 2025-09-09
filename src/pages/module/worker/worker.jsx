// src/pages/module/worker/Worker.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import useFetch from "../../../hook/useFetch";
import conf from "../../../config";
import SearchBar from "../../../components/layout/Searchbar";
import Delete from "../../../components/layout/Delete";

const Worker = () => {
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // As per your API endpoint

  useEffect(() => {
    fetchAllWorkers();
  }, [currentPage]);

  const fetchAllWorkers = async () => {
    try {
      setError("");
      setIsLoading(true);

      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/shopkeeper/worker/get-all-worker?page=${currentPage}&limit=${rowsPerPage}`,
      });

      if (result.success) {
        const workerData = result.workers || [];
        const normalizedWorkers = workerData.map((worker) => ({
          ...worker,
          id: worker.id || worker._id,
          name: worker.name || "Unknown",
          expertise: worker.expertise || "N/A",
          phone: worker.phone || "N/A",
          address: worker.address || "N/A",
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
      setError(err.response?.data?.message || err.message || "Error fetching workers");
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
      toast.error(err.response?.data?.message || err.message || "Error deleting worker");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    if (!worker || !worker.name) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      worker.name.toLowerCase().includes(searchLower) ||
      worker.phone.toLowerCase().includes(searchLower) ||
      worker.address.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(workers.length / rowsPerPage);

  return (
    <div className="p-8 bg-[#E0E9E9] min-h-screen">
      <ToastContainer />

      <div className="bg-white p-4 shadow-md mb-6 rounded-md flex justify-between items-center">
        <h1 className="text-xl font-semibold">Worker List</h1>
        <Button
          onClick={() => navigate("/worker/worker-add")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          + Add New Worker
        </Button>
      </div>

      <div className="bg-white p-4 mb-4 rounded-md shadow flex items-center space-x-2">
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="bg-white p-4 shadow rounded-md">
        <div className="overflow-x-auto rounded-lg border border-gray-300">
          {isLoading ? (
            <div className="flex justify-center items-center h-[300px]">
              <span className="text-lg">Loading workers...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-[300px]">
              <span className="text-lg text-red-500">{error}</span>
            </div>
          ) : (
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-[#e6efef] text-black font-semibold">
                <tr>
                  <th className="px-6 py-4">Sr.No.</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Expertise</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No workers found
                    </td>
                  </tr>
                ) : (
                  filteredWorkers.map((worker, index) => (
                    <tr key={worker.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{worker.name}</td>
                      <td className="px-6 py-4">{worker.expertise}</td>
                      <td className="px-6 py-4">{worker.phone}</td>
                      <td className="px-6 py-4">{worker.address}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => navigate(`/worker/worker-view/${worker.id}`, { state: worker })}
                            className="text-teal-600 hover:text-teal-800"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => navigate(`/worker/worker-edit/${worker.id}`, { state: worker })}
                            className="text-teal-500 hover:text-teal-700"
                          >
                            <Edit size={20} />
                          </button>
                          <Delete
                            onDelete={() => handleDeleteWorker(worker.id, worker.name)}
                            trigger={
                              <button className="text-teal-500 hover:text-teal-700">
                                <Trash2 size={20} />
                              </button>
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {filteredWorkers.length > rowsPerPage && (
          <div className="flex justify-between items-center mt-4 text-sm text-black">
            <span>
              Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
              {Math.min(currentPage * rowsPerPage, filteredWorkers.length)} of{" "}
              {filteredWorkers.length} entries
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border border-gray-300 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border border-gray-300 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border border-gray-300 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Worker;
