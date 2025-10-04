import React, {useState} from "react";
import {Eye, Trash2, Filter, X} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Search} from "lucide-react";
import {FiEdit} from "react-icons/fi";
import {IconButton} from "@mui/material";
import {FaPlus} from "react-icons/fa6";
import axios from "axios"; // ✅ Missing import
import {useEffect, useCallback} from "react";

const SmallProduct = () => {
  const navigate = useNavigate();

  const API_BASE_URL = "https://linemen-be-1.onrender.com";
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";

  const categoriesData = [
    { _id: "68c2ccc5eaa35f894cb1df46", tabName: "Plumbing", subCategories: ["Plumber", "Pipe Fitter"] },
    { _id: "68c2ccf2eaa35f894cb1df52", tabName: "Painting", subCategories: ["Painter", "POP Person"] },
    { _id: "68c2cd3feaa35f894cb1df61", tabName: "Electrician", subCategories: [] },
    { _id: "68c2cd45eaa35f894cb1df65", tabName: "Tiles Fitting", subCategories: ["Tile Layer", "Grout Specialist"] },
    { _id: "68c2cd5feaa35f894cb1df69", tabName: "AC & Refrigerator Repairing", subCategories: ["AC Technician", "Refrigerator Repair"] },
    { _id: "68c2cd6aeaa35f894cb1df6d", tabName: "TV Repair", subCategories: ["TV Repair Technician", "Home Theater Setup"] },
    { _id: "68c2cd7aeaa35f894cb1df71", tabName: "Carpentry", subCategories: ["Carpenter", "Furniture Maker"] },
  ];

  const [products, setProducts] = useState([]);
  const [categories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
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
      const response = await axios.get(`${API_BASE_URL}/shopkeeper/small-products?limit=1000`, {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
      });

      if (response.data.success) {
        let fetchedProducts = response.data.data;

        // Apply filters
        if (selectedCategory) {
          fetchedProducts = fetchedProducts.filter(p => p.productCategory?._id === selectedCategory);
        }
        if (selectedSubCategory) {
          fetchedProducts = fetchedProducts.filter(p => p.productSubCategory === selectedSubCategory);
        }
        if (searchTerm) {
          fetchedProducts = fetchedProducts.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Reset page if currentPage is out of range
        if ((currentPage - 1) * limit >= fetchedProducts.length && fetchedProducts.length > 0) {
          setCurrentPage(1);
          setLoading(false);
          return; // fetchProducts will re-run automatically
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
  }, [selectedCategory, selectedSubCategory, searchTerm, currentPage, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Actions
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/shopkeeper/small-products/${id}`, {
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

  const handleAdd = () => navigate("/small-product/add");
  const handleEdit = (id) => navigate(`/small-product/edit/${id}`);
  const handleView = (id) => navigate(`/small-product/view/${id}`);
  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const resetFilter = () => { setSelectedCategory(null); setSelectedSubCategory(null); setSearchTerm(""); setCurrentPage(1); };

  return (
    <div className="flex bg-[#E0E9E9] font-medium">
      <main className="flex-1 p-3 gap-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-3">
          <h1 className="text-lg md:text-xl font-semibold">Small Product List</h1>

          {/* Search */}
          <div className="flex border-[#16b1a2] border-2 rounded-full w-[400px] h-[50px] items-center">
            <Search className="w-5 h-5 ml-2 text-[#0D2E28]" />
            <input
              type="text"
              placeholder=" Search by Product Name..."
              className="w-full placeholder:text-black rounded-full px-2 py-1 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Add Product */}
          <button onClick={handleAdd} className="bg-[#007E74] text-white text-base px-4 py-2 rounded-lg w-full md:w-auto">+ Add New Product</button>
        </div>

        {/* Filters */}
        <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setFilterOpen(!filterOpen)} className="border px-2 py-1 rounded bg-[#E0E9E9]"><Filter className="w-4 h-4 text-gray-600" /></button>

            {selectedCategory && <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">{categories.find(c => c._id === selectedCategory)?.tabName}<X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => setSelectedCategory(null)} /></span>}
            {selectedSubCategory && <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">{selectedSubCategory}<X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => setSelectedSubCategory(null)} /></span>}
            {searchTerm && <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">{`Name: "${searchTerm}"`}<X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => setSearchTerm("")} /></span>}

            <button onClick={resetFilter} className="ml-auto px-4 py-1 rounded text-sm border border-[#007E74] bg-[#D9F1EB] text-[#007E74]">Reset Filter</button>
          </div>

          {/* Dropdown */}
          {filterOpen && (
            <div className="absolute top-16 left-3 bg-white border rounded shadow-md p-4 w-64 z-50">
              <div className="mb-3">
                <h4 className="font-semibold text-sm mb-2">Category</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {categories.map(cat => (
                    <li key={cat._id} className="flex items-center gap-2">
                      <input type="radio" id={cat._id} name="categoryFilter" checked={selectedCategory === cat._id} onChange={() => { setSelectedCategory(cat._id); setSelectedSubCategory(null); setCurrentPage(1); }} />
                      <label htmlFor={cat._id}>{cat.tabName}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedCategory && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Sub-Category</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {categories.find(c => c._id === selectedCategory)?.subCategories.map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <input type="radio" id={`${selectedCategory}-${idx}`} name="subCategoryFilter" checked={selectedSubCategory === sub} onChange={() => { setSelectedSubCategory(sub); setCurrentPage(1); }} />
                        <label htmlFor={`${selectedCategory}-${idx}`}>{sub}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
              <tbody className="text-sm md:text-base">
  {products.map((product, index) => (
    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">{(currentPage - 1) * limit + index + 1}</td>

      {/* Product Image */}
      <td className="px-4 py-3">
        <img
          src={product.productImageUrl || "PVC.png"}
          alt={product.productName}
          className="w-12 h-12 md:w-14 md:h-14 rounded border border-[#007E74]"
        />
      </td>

      {/* Product Name */}
      <td className="px-4 py-3">{product.productName}</td>

      {/* Product Category (works with object OR string) */}
      <td className="px-4 py-3">
        {typeof product.productCategory === "object"
          ? product.productCategory?.tabName || "N/A"
          : product.productCategory || "N/A"}
      </td>

      {/* Product Subcategory */}
      <td className="px-4 py-3">{product.productSubCategory || "N/A"}</td>

      {/* Product Price */}
      <td className="px-4 py-3">₹{product.productPrice}</td>

      {/* Action Buttons */}
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

export default SmallProduct;
