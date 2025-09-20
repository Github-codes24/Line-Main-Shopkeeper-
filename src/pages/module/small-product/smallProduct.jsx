import React, { useState, useEffect, useCallback } from "react";
import { Eye, Pencil, Trash2, Filter, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SmallProduct = () => {
  const navigate = useNavigate();

  const API_BASE_URL = "https://linemen-be-1.onrender.com";
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730"; 

  // States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(5);

  // 🔹 Fetch Categories (Tabs)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/shopkeeper/tabs`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Fetch Products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit,
      });

      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory) params.append("productCategory", selectedCategory);

      const response = await axios.get(
        `${API_BASE_URL}/shopkeeper/small-products?${params.toString()}`,
        { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
      );

      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalCount(
          response.data.pagination?.totalCount || response.data.data.length
        );
      }
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🔹 Delete Product
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/shopkeeper/small-products/${id}`,
          { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
        );
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

  // 🔹 Actions
  const handleAdd = () => navigate("/small-product/add");
  const handleEdit = (id) => navigate(`/small-product/edit/${id}`);
  const handleView = (id) => navigate(`/small-product/view/${id}`);

  // 🔹 Search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // 🔹 Filter
  const toggleFilter = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
    setFilterOpen(false);
  };

  const resetFilter = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  return (
    <div className="flex bg-[#E0E9E9] font-medium min-h-screen">
      <main className="flex-1 p-3 gap-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 shadow-xl bg-white border rounded-xl p-3 gap-3">
          <h1 className="text-lg md:text-xl font-semibold">
            Small Product List
          </h1>

          {/* Search */}
          <div className="flex border-[#16b1a2] border-2 rounded-full w-full md:w-72 max-w-md items-center">
            <Search className="w-5 h-5 text-[#16b1a2] ml-2" />
            <input
              type="text"
              placeholder=" Search by Product Name..."
              className="w-full placeholder:text-black rounded-full px-2 py-1 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Add Product */}
          <button
            onClick={handleAdd}
            className="bg-[#007E74] text-white px-4 py-2 rounded-lg w-full md:w-auto"
          >
            + Add New Product
          </button>
        </div>

        {/* Filters + Table */}
        <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="border px-2 py-1 rounded bg-[#E0E9E9]"
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </button>

            {/* Active filters */}
            {selectedCategory && (
              <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                {categories.find((c) => c._id === selectedCategory)?.tabName}
                <X
                  className="w-4 h-4 ml-2 cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                />
              </span>
            )}

            {searchTerm && (
              <span className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm">
                {`Name: "${searchTerm}"`}
                <X
                  className="w-4 h-4 ml-2 cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              </span>
            )}

            <button
              onClick={resetFilter}
              className="ml-auto px-4 py-1 rounded text-sm border border-[#007E74] bg-[#D9F1EB] text-[#007E74]"
            >
              Reset Filter
            </button>
          </div>

          {/* Dropdown filter */}
          {filterOpen && (
            <div className="absolute top-16 left-3 bg-white border rounded shadow-md p-4 w-64 z-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-sm">Category</h4>
                <X
                  className="w-4 h-4 cursor-pointer text-gray-600"
                  onClick={() => setFilterOpen(false)}
                />
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {categories.map((cat) => (
                  <li key={cat._id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={cat._id}
                      name="categoryFilter"
                      checked={selectedCategory === cat._id}
                      onChange={() => toggleFilter(cat._id)}
                    />
                    <label htmlFor={cat._id}>{cat.tabName}</label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table + Card View */}
          <div className="overflow-x-auto">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                {/* ✅ Desktop Table */}
                <table className="hidden sm:table w-full text-left border rounded-lg shadow-lg">
                  <thead className="bg-[#e0e9e9] text-sm md:text-base">
                    <tr>
                      <th className="p-2">Sr.No.</th>
                      <th className="p-2">Product Image</th>
                      <th className="p-2">Product Name</th>
                      <th className="p-2">Product Category</th>
                      <th className="p-2">Product Price</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm md:text-base">
                    {products.map((product, index) => (
                      <tr key={product._id} className="border-t">
                        <td className="p-2">
                          {index + 1 + (currentPage - 1) * limit}
                        </td>
                        <td className="p-2">
                          <img
                            src={product.productImageUrl || "PVC.png"}
                            alt={product.productName}
                            className="w-10 h-10 md:w-12 md:h-12 rounded border border-[#007E74]"
                          />
                        </td>
                        <td className="p-2">{product.productName}</td>
                        <td className="p-2">
                          {product.productCategory?.tabName || "N/A"}
                        </td>
                        <td className="p-2">₹{product.productPrice}</td>
                        <td className="p-2 flex gap-2 text-gray-700">
                          <Eye
                            onClick={() => handleView(product._id)}
                            className="w-4 h-4 cursor-pointer text-[#007E74]"
                          />
                          <Pencil
                            onClick={() => handleEdit(product._id)}
                            className="w-4 h-4 cursor-pointer text-[#007E74]"
                          />
                          <Trash2
                            onClick={() => handleDelete(product._id)}
                            className="w-4 h-4 cursor-pointer text-[#007E74]"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* ✅ Mobile Card View */}
                <div className="sm:hidden flex flex-col gap-3">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="border rounded-lg shadow-md p-3 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.productImageUrl || "PVC.png"}
                          alt={product.productName}
                          className="w-12 h-12 rounded border border-[#007E74]"
                        />
                        <div>
                          <p className="font-semibold">{product.productName}</p>
                          <p className="text-sm text-gray-600">
                            {product.productCategory?.tabName || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold">
                          ₹{product.productPrice}
                        </span>
                        <div className="flex gap-3 text-[#007E74]">
                          <Eye
                            onClick={() => handleView(product._id)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <Pencil
                            onClick={() => handleEdit(product._id)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <Trash2
                            onClick={() => handleDelete(product._id)}
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Pagination */}
          {!loading && !error && (
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2 p-2 text-sm font-semibold text-black">
              <span>
                Showing {products.length} of {totalCount} Entries
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-teal-700 hover:bg-purple-100 rounded disabled:opacity-50"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-teal-700 text-white"
                        : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-teal-700 hover:bg-purple-100 rounded disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SmallProduct;
