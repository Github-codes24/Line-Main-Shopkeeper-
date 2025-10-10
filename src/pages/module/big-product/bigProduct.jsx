import React, { useEffect, useState, useCallback } from "react"; 
import { Eye, Trash2, Filter, X, Search } from "lucide-react";
import { TbFilter } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit } from "react-icons/fi";

const getStatusColor = (status) => {
    switch (status) {
        case "Pending":
            return "text-yellow-500";
        case "Approved":
            return "text-green-500";
        case "Rejected":
            return "text-red-500";
        case "Add By Admin":
            return "text-green-500";
        default:
            return "text-gray-500";
    }
};

const BigProduct = () => {
    const navigate = useNavigate();

    const API_BASE_URL = "https://linemen-be-1.onrender.com";
    const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";

    // Expertise options
    const expertiseOptions = [
        "Electrician",
       "Painter",
        "Carpenter",
        "AC Repair",
        "Tile Fitting",
          "Plumber",
    ];

    const [products, setProducts] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [limit] = useState(5);

    // Fetch all products and filter + paginate locally
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/shopkeeper/bigproduct/get-all-bigproduct?limit=1000`, {
                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
            });

            if (response.data.success) {
                let fetchedProducts = response.data.data;

                // Apply filters
                if (selectedFilters.length > 0) {
                    fetchedProducts = fetchedProducts.filter(p => 
                        selectedFilters.includes(p.productSubCategory)
                    );
                }
                if (searchTerm) {
                    fetchedProducts = fetchedProducts.filter(p => 
                        p.productName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                // Reset page if currentPage is out of range
                if ((currentPage - 1) * limit >= fetchedProducts.length && fetchedProducts.length > 0) {
                    setCurrentPage(1);
                    setLoading(false);
                    return;
                }

                setTotalCount(fetchedProducts.length);
                setTotalPages(Math.ceil(fetchedProducts.length / limit));

                // Slice for current page
                const start = (currentPage - 1) * limit;
                const end = start + limit;
                setProducts(fetchedProducts.slice(start, end));
            }
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [selectedFilters, searchTerm, currentPage, limit]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Actions
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await axios.delete(`${API_BASE_URL}/shopkeeper/bigproduct/delete-bigproduct/${id}`, {
                    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
                });
                if (response.data.success) {
                    alert("Product deleted successfully!");
                    fetchProducts();
                } else {
                    alert(response.data.message);
                }
            } catch (err) {
                alert("Failed to delete product.");
                console.error(err);
            }
        }
    };

    const handleAdd = () => navigate("/big-product/add");
    const handleEdit = (id) => navigate(`/big-product/edit/${id}`);
    const handleView = (id) => navigate(`/big-product/view/${id}`);
    const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
    
    const toggleFilter = (option) => {
        setSelectedFilters((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
        setCurrentPage(1);
    };

    const removeFilter = (option) => {
        setSelectedFilters((prev) => prev.filter((item) => item !== option));
        setCurrentPage(1);
    };

    const resetFilter = () => { 
        setSelectedFilters([]); 
        setSearchTerm(""); 
        setCurrentPage(1); 
    };

    return (
        <div className="flex bg-[#E0E9E9] font-medium ">
            <main className="flex-1 p-3 gap-2">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-3">
                    <h1 className="text-lg md:text-xl font-semibold">Big Product List</h1>

                    {/* Search */}
                    <div className="flex items-center border border-teal-600 rounded-full px-3 py-1 w-full sm:w-[300px] bg-gray-200">
                                <Search className="text-teal-600 mr-2" size={18} />
                                <input
                                  type="text"
                                  placeholder="Search by Product Name..."
                                  value={searchTerm}
                                  className="flex-1 outline-none bg-transparent text-sm placeholder-black"
                                  onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                  }}
                                />
                              </div>

                    {/* Add Product */}
                    <button onClick={handleAdd} className="bg-[#007E74] text-white text-base px-4 py-2 rounded-lg w-full md:w-auto">
                        + Add New Product
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => setFilterOpen(!filterOpen)} className="border px-2 py-1 rounded bg-[#E0E9E9]">
                            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                        </button>

                        {selectedFilters.map((filter) => (
                            <span key={filter} className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {filter}
                                <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => removeFilter(filter)} />
                            </span>
                        ))}
                        {searchTerm && (
                            <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {`Name: "${searchTerm}"`}
                                <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => setSearchTerm("")} />
                            </span>
                        )}

                        <button onClick={resetFilter} className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded">
                            Reset Filter
                        </button>
                    </div>

                    {/* Dropdown */}
                    {filterOpen && (
                        <div className="absolute top-16 left-3 bg-white border rounded shadow-md p-4 w-64 z-50">
                            <div className="mb-3">
                                <h4 className="font-semibold text-sm mb-2">Expertise</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {expertiseOptions.map((option) => (
                                        <li key={option} className="flex items-center gap-2">
                                            <input 
                                                type="checkbox" 
                                                id={option} 
                                                checked={selectedFilters.includes(option)} 
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
                        {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
                            <table className="hidden sm:table w-full text-left rounded-lg shadow-lg border border-[#616666]">
                                <thead className="bg-[#e0e9e9] text-sm md:text-base">
                                    <tr>
                                        <th className="px-4 py-3">Sr.No.</th>
                                        <th className="px-4 py-3">Image</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Sub-Category</th>
                                        <th className="px-4 py-3">Price</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    {products.map((product, index) => (
                                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={product.productImageUrl || "PVC.png"}
                                                    alt={product.productName}
                                                    className="w-12 h-12 md:w-14 md:h-14 rounded border border-[#007E74]"
                                                />
                                            </td>
                                            <td className="px-4 py-3">{product.productName}</td>
                                            <td className="px-4 py-3">
                                                {typeof product.productCategory === "object"
                                                    ? product.productCategory?.tabName || "N/A"
                                                    : product.productCategory || "N/A"}
                                            </td>
                                            <td className="px-4 py-3">{product.productSubCategory || "N/A"}</td>
                                            <td className="px-4 py-3">₹{product.productPrice}</td>
                                            <td className={`px-4 py-3 font-semibold ${getStatusColor(product.approvalStatus)}`}>
                                                {product.approvalStatus}
                                            </td>
                                            <td className="px-4 py-3 flex items-center gap-3 text-gray-700">
                                                <Eye
                                                    onClick={() => handleView(product._id)}
                                                    className="w-5 h-5 cursor-pointer text-[#EC2D01]"
                                                />
                                                <FiEdit
                                                    onClick={() => handleEdit(product._id)}
                                                    className="w-5 h-5 cursor-pointer text-[#EC2D01]"
                                                />
                                                <Trash2
                                                    onClick={() => handleDelete(product._id)}
                                                    className="w-5 h-5 cursor-pointer text-[#EC2D01]"
                                                />
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
                            Showing {products.length} of {totalCount} Entries
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

export default BigProduct;