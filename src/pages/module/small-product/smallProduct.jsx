import React, {useState, useEffect} from "react";
import {Eye, Trash2, X, Search} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {FaPlus} from "react-icons/fa6";
import {TbFilter} from "react-icons/tb";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";
import {IconButton} from "@mui/material";

const SmallProduct = () => {
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    const categoryOptions = [
        "Electrician",
        "Painter",
        "Carpenter",
        "AC / Refrigerator Repair",
        "Tile Fitting",
        "Plumbing",
    ];

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [limit] = useState(10);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/small-products?limit=1000`,
                });

                if (result.success) {
                    const productData = result.data || [];
                    setAllProducts(productData);

                    if (productData.length === 0) {
                        toast.info("No products found");
                    }
                } else {
                    setError(result.message || "Failed to fetch products");
                    setAllProducts([]);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message || "Error fetching products");
                setAllProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    useEffect(() => {
        applyFiltersAndPagination();
    }, [allProducts, searchTerm, selectedCategories, currentPage]);

    const applyFiltersAndPagination = () => {
        let filtered = [...allProducts];

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) => {
                const categoryName =
                    typeof product.productCategory === "object"
                        ? product.productCategory?.tabName
                        : product.productCategory;
                return selectedCategories.includes(categoryName);
            });
        }

        if ((currentPage - 1) * limit >= filtered.length && filtered.length > 0) {
            setCurrentPage(1);
            return;
        }

        setTotalCount(filtered.length);
        setTotalPages(Math.ceil(filtered.length / limit));

        const start = (currentPage - 1) * limit;
        const end = start + limit;
        setProducts(filtered.slice(start, end));
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
        );
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleDelete = async (id, productName) => {
        if (!window.confirm(`Are you sure you want to delete ${productName}?`)) return;

        try {
            const result = await fetchData({
                method: "DELETE",
                url: `${conf.apiBaseUrl}/shopkeeper/small-products/${id}`,
            });

            if (result.success) {
                toast.success(result.message || "Product deleted successfully!");
                setAllProducts((prev) => prev.filter((product) => product._id !== id));
            } else {
                toast.error(result.message || "Failed to delete product");
            }
        } catch (err) {
            console.error("Delete error:", err);
            toast.error(err.message || "Error deleting product");
        }
    };

    const handleAdd = () => navigate("/small-product/add");
    const handleEdit = (id) => navigate(`/small-product/edit/${id}`);
    const handleView = (id) => navigate(`/small-product/view/${id}`);

    return (
        <div className="flex bg-[#E0E9E9] font-medium">
            <ToastContainer />

            <main className="flex-1 p-3 gap-2">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-3">
                    <h1
                        className="text-lg md:text-xl"
                        style={{
                            fontWeight: 500,
                            fontSize: "20px",
                            color: "rgba(51, 51, 51, 1)",
                        }}
                    >
                        Small Product List
                    </h1>

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

                    <button
                        onClick={handleAdd}
                        className="bg-[#007E74] text-white text-base px-4 py-2 rounded-lg w-full md:w-auto  flex items-center justify-center gap-2"
                    >
                        <FaPlus className="inline" /> Add New Product
                    </button>
                </div>

                <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="border px-2 py-1 rounded bg-[#E0E9E9]"
                        >
                            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
                        </button>

                        {selectedCategories.map((cat) => (
                            <span key={cat} className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {cat}
                                <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => handleCategoryToggle(cat)} />
                            </span>
                        ))}

                        {searchTerm && (
                            <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                                {`Search: "${searchTerm}"`}
                                <X
                                    className="w-4 h-4 ml-2 cursor-pointer"
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

                    {filterOpen && (
                        <div className="absolute top-16 left-3 bg-white border rounded shadow-md p-4 w-64 z-50">
                            <div className="mb-3">
                                <h4 className="font-semibold text-sm mb-2">Category</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {categoryOptions.map((cat) => (
                                        <li key={cat} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={cat}
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => handleCategoryToggle(cat)}
                                                className="cursor-pointer"
                                            />
                                            <label htmlFor={cat} className="cursor-pointer">
                                                {cat}
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
                                <p className="text-gray-600">Loading products...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No products found matching your criteria.</p>
                            </div>
                        ) : (
                            <table
                                className="hidden sm:table w-full text-center align-middle rounded-md shadow-lg border border-[#616666] border-separate overflow-hidden"
                                style={{borderSpacing: 0}}
                            >
                                <thead className="bg-[#e0e9e9] text-sm md:text-base">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Sr.No.</th>
                                        <th className="px-4 py-3 font-medium">Image</th>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium">Category</th>
                                        <th className="px-4 py-3 font-medium">Sub-Category</th>
                                        <th className="px-4 py-3 font-medium">Price</th>
                                        <th className="px-4 py-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm md:text-base">
                                    {products.map((product, index) => (
                                        <tr key={product._id} className="transition-colors border-b border-gray-200">
                                            <td className="px-4 py-3 font-normal">
                                                {(currentPage - 1) * limit + index + 1}
                                            </td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={product.productImageUrl || "PVC.png"}
                                                    alt={product.productName}
                                                    className="w-12 h-12 md:w-14 md:h-14 rounded border border-[#007E74] object-cover"
                                                />
                                            </td>
                                            <td className="px-4 py-3 font-normal">{product.productName}</td>
                                            <td className="px-4 py-3 font-normal">
                                                {typeof product.productCategory === "object"
                                                    ? product.productCategory?.tabName || "N/A"
                                                    : product.productCategory || "N/A"}
                                            </td>
                                            <td className="px-4 py-3 font-normal">
                                                {product.productSubCategory || "N/A"}
                                            </td>
                                            <td className="px-4 py-3 font-normal">₹{product.productPrice}</td>
                                            <td className="px-4 py-3 font-normal">
                                                <div className="flex items-center gap-1 text-gray-700">
                                                    <IconButton>
                                                        <Eye
                                                            onClick={() => handleView(product._id)}
                                                            className="w-5 h-5 cursor-pointer text-[#EC2D01]"
                                                            title="View Product"
                                                        />
                                                    </IconButton>
                                                    <IconButton>
                                                        <FiEdit
                                                            onClick={() => handleEdit(product._id)}
                                                            className="w-5 h-5 cursor-pointer text-[#EC2D01] "
                                                            title="Edit Product"
                                                        />
                                                    </IconButton>
                                                    <IconButton>
                                                        <Trash2
                                                            onClick={() =>
                                                                handleDelete(product._id, product.productName)
                                                            }
                                                            className="w-5 h-5 cursor-pointer text-[#EC2D01] "
                                                            title="Delete Product"
                                                        />
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {!loading && !error && totalPages > 0 && (
                    <div className="w-full flex flex-col bg-white md:flex-row justify-between items-center gap-2 p-3 text-sm font-semibold text-black rounded-lg shadow">
                        <span>
                            Showing {products.length} of {totalCount} Entries
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
                                        currentPage === i + 1 ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-700"
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

export default SmallProduct;
