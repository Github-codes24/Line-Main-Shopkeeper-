import React, {useState, useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Eye, Trash2, Search, Filter, X} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {TbFilter} from "react-icons/tb";
import {FaPlus} from "react-icons/fa6";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const Worker = () => {
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    const [workers, setWorkers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedExpertise, setSelectedExpertise] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const expertiseOptions = ["Electrician", "Painter", "Carpenter", "AC Repair", "Tile Fitting", "Plumber"];

    useEffect(() => {
        fetchAllWorkers();
    }, []);

    useEffect(() => {
        applyFiltersAndPagination();
    }, [workers, searchTerm, selectedExpertise, currentPage]);

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
                    status: worker.status || "Pending",
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

    const applyFiltersAndPagination = () => {
        let filtered = [...workers];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (worker) =>
                    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    worker.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    worker.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply expertise filter
        if (selectedExpertise.length > 0) {
            filtered = filtered.filter((worker) => selectedExpertise.includes(worker.expertise));
        }

        // Reset page if out of range
        if ((currentPage - 1) * limit >= filtered.length && filtered.length > 0) {
            setCurrentPage(1);
            return;
        }

        setTotalCount(filtered.length);
        setTotalPages(Math.ceil(filtered.length / limit));
    };

    const getPaginatedWorkers = () => {
        let filtered = [...workers];

        if (searchTerm) {
            filtered = filtered.filter(
                (worker) =>
                    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    worker.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    worker.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedExpertise.length > 0) {
            filtered = filtered.filter((worker) => selectedExpertise.includes(worker.expertise));
        }

        const start = (currentPage - 1) * limit;
        const end = start + limit;
        return filtered.slice(start, end);
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
        setSelectedExpertise([]);
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleExpertiseToggle = (expertise) => {
        setSelectedExpertise((prev) =>
            prev.includes(expertise) ? prev.filter((item) => item !== expertise) : [...prev, expertise]
        );
        setCurrentPage(1);
    };

    const handleAddWorker = () => navigate("/worker/worker-add");

    const paginatedWorkers = getPaginatedWorkers();

    return (
        <div className="flex bg-[#E0E9E9] font-medium">
            <ToastContainer />

            <main className="flex-1 p-3 gap-2">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-start items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-24">
                    <h1
                        className="text-lg md:text-xl font-semibold"
                        style={{
                            fontWeight: 500,
                            fontSize: "20px",
                            color: "rgba(51, 51, 51, 1)",
                        }}
                    >
                        Worker List
                    </h1>

                    {/* Search */}
                    <div className="flex items-center border border-teal-600 rounded-full px-3 py-1 w-full sm:w-[300px] bg-gray-200">
                        <Search className="text-teal-600 mr-2" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Name, Phone or Address..."
                            value={searchTerm}
                            className="flex-1 outline-none bg-transparent text-sm placeholder-black"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    {/* Add Worker */}
                </div>

                {/* Filters */}
                <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="border px-2 py-1 rounded bg-[#E0E9E9] "
                        >
                            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                        </button>

                        {selectedExpertise.map((exp) => (
                            <span key={exp} className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {exp}
                                <X
                                    className="w-4 h-4 ml-2 cursor-pointer "
                                    onClick={() => handleExpertiseToggle(exp)}
                                />
                            </span>
                        ))}

                        {searchTerm && (
                            <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {`Search: "${searchTerm}"`}
                                <X
                                    className="w-4 h-4 ml-2 cursor-pointer "
                                    onClick={() => {
                                        setSearchTerm("");
                                        setCurrentPage(1);
                                    }}
                                />
                            </span>
                        )}

                        <button
                            onClick={handleResetFilters}
                            className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded"
                        >
                            Reset Filter
                        </button>
                    </div>

                    {/* Dropdown */}
                    {filterOpen && (
                        <div className="absolute top-16 left-3 bg-white border rounded shadow-md p-4 w-64 z-50">
                            <div className="mb-3">
                                <h4 className="font-semibold text-sm mb-2">Expertise</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {expertiseOptions.map((exp) => (
                                        <li key={exp} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={exp}
                                                checked={selectedExpertise.includes(exp)}
                                                onChange={() => handleExpertiseToggle(exp)}
                                                className="cursor-pointer"
                                            />
                                            <label htmlFor={exp} className="cursor-pointer">
                                                {exp}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Loading workers...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : paginatedWorkers.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No workers found matching your criteria.</p>
                            </div>
                        ) : (
                            <table
                                className="hidden sm:table w-full text-left rounded-md shadow-lg border border-[#616666] border-separate overflow-hidden"
                                style={{borderSpacing: 0}}
                            >
                                <thead className="bg-[#e0e9e9] text-sm md:text-base">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-center">Sr.No.</th>
                                        <th className="px-4 py-3 font-medium text-center">Worker Name</th>
                                        <th className="px-4 py-3 font-medium text-center">Expertise</th>
                                        <th className="px-4 py-3 font-medium text-center">Phone Number</th>
                                        <th className="px-4 py-3 font-medium text-center">Address</th>
                                        <th className="px-4 py-3 font-medium text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    {paginatedWorkers.map((worker, index) => (
                                        <tr key={worker.id} className="border-b border-gray-200">
                                            <td className="px-4 py-3 font-normal text-center">
                                                {(currentPage - 1) * limit + index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-normal text-center">{worker.name}</td>
                                            <td className="px-4 py-3 font-normal text-center">{worker.expertise}</td>
                                            <td className="px-4 py-3 font-normal text-center">{worker.phone}</td>
                                            <td className="px-4 py-3 font-normal text-center">
                                                {worker.address && worker.address.length > 15
                                                    ? `${worker.address.slice(0, 35)}...`
                                                    : worker.address}
                                            </td>

                                            <td className="px-4 py-3 font-normal">
                                                <div className="flex items-center gap-3 text-gray-700 text-center">
                                                    <Eye
                                                        onClick={() =>
                                                            navigate(`/worker/worker-view/${worker.id}`, {
                                                                state: worker,
                                                            })
                                                        }
                                                        className="w-5 h-5 cursor-pointer text-[#06A77D] "
                                                        title="View Worker"
                                                    />
                                                    <FiEdit
                                                        onClick={() =>
                                                            navigate(`/worker/worker-edit/${worker.id}`, {
                                                                state: worker,
                                                            })
                                                        }
                                                        className="w-5 h-5 cursor-pointer text-[#06A77D] "
                                                        title="Edit Worker"
                                                    />
                                                    <Trash2
                                                        onClick={() => handleDeleteWorker(worker.id, worker.name)}
                                                        className="w-5 h-5 cursor-pointer text-[#06A77D]"
                                                        title="Delete Worker"
                                                    />
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
                {!isLoading && !error && totalPages > 0 && (
                    <div className="w-full flex flex-col bg-white md:flex-row justify-between items-center gap-2 p-3 text-sm font-semibold text-black rounded-lg shadow">
                        <span>
                            Showing {paginatedWorkers.length} of {totalCount} Entries
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-teal-700 "
                            >
                                &lt;
                            </button>
                            {Array.from({length: totalPages}, (_, i) => (
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
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-teal-700 "
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

export default Worker;
