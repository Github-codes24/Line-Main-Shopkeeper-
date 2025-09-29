import React, { useEffect, useState } from "react"; 
import { Eye,Trash2, Filter, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit } from "react-icons/fi";

import useFetch from "../../../hook/useFetch"; // Your custom fetch hook
import conf from "../../../config";

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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter states
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([
    "Electrician",
    "Painter",
    "Carpenter",
    "AC Repair",
    "Tile Fitting",
    "Plumber",
  ]);

  // ✅ Updated expertise options in the requested order
  const expertiseOptions = [
    "Electrician",
    "Painter",
    "Carpenter",
    "AC Repair",
    "Tile Fitting",
    "Plumber",
  ];

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";

  // Fetch products from API
  const fetchProducts = async (search = "", category = "", pageNum = 1) => {
    setLoading(true);
    try {
      let url =
        "https://linemen-be-1.onrender.com/shopkeeper/bigproduct/get-all-bigproduct";
      const params = { limit: 5 };
  
      if (search) params.search = search;
      if (category) params.productCategory = category;
      if (pageNum) params.page = pageNum;
  
      // ✅ If any subcategory filter is applied
      if (selectedFilters.length > 0) {
        params.productSubCategory = selectedFilters.join(","); 
      }
  
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
  
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProducts(searchText, selectedCategory, page);
  }, [page, selectedFilters]);

  const handleAdd = () => {
    navigate("/big-product/add");
  };

  const handleEdit = (id) => {
    navigate(`/big-product/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/big-product/view/${id}`);
  };

  // Delete API integration
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/delete-bigproduct/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Something went wrong while deleting.");
    }
  };

  const toggleFilter = (option) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const removeFilter = (option) => {
    setSelectedFilters((prev) => prev.filter((item) => item !== option));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setPage(1);
    fetchProducts(value, selectedCategory, 1); // search by name
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
    fetchProducts(searchText, categoryId, 1); // filter by category with pagination
  };

  return (
    <div className="flex bg-[#E0E9E9] font-medium ">
      <main className="flex-1 p-3 gap-2">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4 shadow-xl bg-white h-16 border rounded-xl p-2">
          <h1 className="text-xl font-semibold ml-2">Big Product List</h1>

          {/* Search bar */}
          <div className="flex border-[#16b1a2] border-2 rounded-full w-full md:w-72 max-w-md items-center">
            <Search className="w-5 h-5 text-[#16b1a2] ml-2" />
            <input
              type="text"
              placeholder=" Search by Product Name..."
              className="w-full placeholder:text-black rounded-full px-2 py-1 focus:outline-none"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#007E74] text-white px-4 rounded-lg h-10 mr-2 "
          >
            + Add New Product
          </button>
        </div>

        {/* Filter + Table/Card */}
        <div className="bg-white shadow-xl flex flex-col gap-3 mb-4 relative rounded-lg p-3">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="border px-2 py-1 rounded bg-[#E0E9E9]"
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </button>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <span
                  key={filter}
                  className="flex items-center bg-[#e0e9e9] px-3 py-1 rounded-full text-sm"
                >
                  {filter}
                  <X
                    className="w-4 h-4 ml-2 cursor-pointer"
                    onClick={() => removeFilter(filter)}
                  />
                </span>
              ))}
            </div>

            <button
              onClick={() => setSelectedFilters([])}
              className="ml-auto px-5 py-1 rounded text-sm border border-[#007E74] bg-[#D9F1EB] text-[#007E74]"
            >
              Reset Filter
            </button>
          </div>

          {/* Dropdown Filter Menu */}
          {filterOpen && (
            <div className="absolute top-12 left-2 bg-white border rounded shadow-md p-4 w-64 z-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-sm">Expertise</h4>
                <X
                  className="w-4 h-4 cursor-pointer text-gray-600"
                  onClick={() => setFilterOpen(false)}
                />
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {expertiseOptions.map((option) => (
                  <li key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(option)}
                      onChange={() => toggleFilter(option)}
                    />
                    <label>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table View */}
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <>
              {/* Table for md+ screens */}
              <div className="hidden sm:block overflow-x-auto border border-black rounded-lg">
                <table className="w-full text-left border rounded-lg shadow-lg">
                  <thead className="bg-[#e0e9e9] text-sm md:text-base">
                    <tr>
                      <th className="p-2">Sr.No.</th>
                      <th className="p-2">Product Image</th>
                      <th className="p-2">Product Name</th>
                      <th className="p-2">Product Category</th>
                      <th className="p-2">Product Sub-Category</th>
                      <th className="p-2">Product Price</th>
                      <th className="p-2">Approval Status</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id} className="border-t">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          <img
                            src={product.productImageUrl}
                            alt="product"
                            className="w-12 h-12 rounded border border-[#007E74]"
                          />
                        </td>
                        <td className="p-2">{product.productName}</td>
                       

                      <td className="p-2">
                        {product.productCategory?.tabName}
                      </td>
                        <td className="p-2">
                          {product.productSubCategory}
                        </td>
                        <td className="p-2">₹{product.productPrice}</td>
                        <td className={`p-2 font-semibold ${getStatusColor(product.approvalStatus)}`}>
                          {product.approvalStatus}
                        </td>
                        <td className="p-2 flex gap-2 text-gray-700">
                          <Eye
                            onClick={() => handleView(product._id)}
                            className="w-4 h-4 cursor-pointer text-red-600"
                          />
                          <FiEdit
                            onClick={() => handleEdit(product._id)}
                            className="w-4 h-4 cursor-pointer text-red-600"
                          />
                          <Trash2
                            onClick={() => handleDelete(product._id)}
                            className="w-4 h-4 cursor-pointer text-red-600"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card layout for mobile */}
              <div className="sm:hidden flex flex-col gap-3">
                {products.map((product) => (
                  <div key={product._id} className="border rounded-lg shadow-md p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.productImageUrl}
                        alt="product"
                        className="w-12 h-12 rounded border border-[#007E74]"
                      />
                      <div>
                        <p className="font-semibold">{product.productName}</p>
                        <p className="text-sm text-gray-600">
                          {product.productSubCategory || product.productCategory?.tabName}
                        </p>
                        <p className="text-sm font-semibold">₹{product.productPrice}</p>
                        <p className={`text-xs mt-1 font-semibold ${getStatusColor(product.approvalStatus)}`}>
                          {product.approvalStatus}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 text-[#007E74]">
                      <Eye
                        onClick={() => handleView(product._id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <FiEdit
                        onClick={() => handleEdit(product._id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <Trash2
                        onClick={() => handleDelete(product._id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 p-2 text-sm font-semibold text-black">
            <span>Showing {products.length} Entries</span>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 text-teal-700 hover:bg-purple-100 rounded"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              >
                &lt;
              </button>
              <button
                className={`px-3 py-1 rounded ${page === 1 ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-700"}`}
                onClick={() => setPage(1)}
              >
                1
              </button>
              <button
                className={`px-3 py-1 rounded ${page === 2 ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-700"}`}
                onClick={() => setPage(2)}
              >
                2
              </button>
              <button
                className={`px-3 py-1 rounded ${page === 3 ? "bg-teal-700 text-white" : "bg-teal-100 text-teal-700"}`}
                onClick={() => setPage(3)}
              >
                3
              </button>
              <button
                className="px-2 py-1 text-teal-700 hover:bg-purple-100 rounded"
                onClick={() => setPage((prev) => prev + 1)}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BigProduct;
