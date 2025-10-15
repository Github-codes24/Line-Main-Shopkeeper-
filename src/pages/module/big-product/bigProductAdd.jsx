import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";

const AddBigProduct = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productSubCategory: "",
    productPrice: "",
    productDescription: "",
    productImage: null, // Changed to store file object
  });
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [shopkeeperId, setShopkeeperId] = useState("68c2cbcdeaa35f894cb1df34"); // Default shopkeeper ID

  const API_BASE_URL = "https://linemen-be-1.onrender.com";
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGVjOTM4MzdlMGU0ZTA2ZWExZmRhMTEiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc2MDMzNDgyOSwiZXhwIjoxNzYwMzYzNjI5fQ.LTh_6QMFjALzK6rrhonR_p8xgz0WGPBNh3KC6iBTVes";

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });

  // Unified input class
  const inputClass =
    "bg-[#F5FFFF] border border-[#B2D8D5] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none focus:outline-none placeholder:text-[#0D2E28] placeholder:font-medium";

  const handleBack = () => {
    window.history.back();
  };

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/shopkeeper/bigproduct/experties");
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch sub-categories whenever a category is selected
  useEffect(() => {
    if (!formData.productCategory) {
      setSubCategories([]);
      setFormData((prev) => ({ ...prev, productSubCategory: "" }));
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await api.get(
          `/shopkeeper/bigproduct/${formData.productCategory}/subtabs`
        );
        if (res.data.success) {
          setSubCategories(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching sub-categories:", err);
      }
    };
    fetchSubCategories();
  }, [formData.productCategory]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, productCategory: categoryId, productSubCategory: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
      setFormData({ ...formData, productImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Create FormData as per API documentation
      const submitFormData = new FormData();
      submitFormData.append("productCategory", formData.productCategory);
      submitFormData.append("productPrice", formData.productPrice);
      submitFormData.append("productDescription", formData.productDescription);
      submitFormData.append("productImage", formData.productImage); // File object
      submitFormData.append("productName", formData.productName);
      submitFormData.append("productSubCategory", formData.productSubCategory);
      submitFormData.append("shopkeeperId", shopkeeperId);

      const response = await api.post("/shopkeeper/bigproduct/add-bigproduct", submitFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccess("Product added successfully!");
        setTimeout(() => {
          window.history.back();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
      {/* Header */}
      <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="text-xl font-semibold text-gray-800 p-2 rounded-lg"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                stroke="#0D2E28"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                stroke="#0D2E28"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.6663 20H13.333"
                stroke="#0D2E28"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-gray-800 p-2 rounded-lg">Add Big Product</h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
          {/* Success/Error Messages */}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg">{success}</div>}
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>}

          <div className="border border-[#616666] p-4 rounded-lg">
            {/* Product Image */}
            <div className="flex gap-4 mb-6">
              <label className="w-[240px] font-medium text-lg text-[#0D2E28]">
                Product Image
              </label>
              <div className="rounded-lg p-0 w-[240px] h-[240px] flex flex-col items-center justify-center relative">
                <img
                  src={imagePreviewUrl || "https://via.placeholder.com/240?text=No+Image"}
                  alt="Product"
                  onClick={() => fileInputRef.current.click()}
                  className="min-h-[240px] w-[240px] object-cover mb-2 cursor-pointer border-2 border-[#B2D8D5] rounded-3xl"
                />
                <button
                  className="w-[200px] h-[40px] top-50 right-50 absolute bg-[#007E7499] text-white text-base font-medium px-3 py-1 rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current && fileInputRef.current.click();
                  }}
                  type="button"
                >
                  <MdOutlineFileUpload className="absolute h-6 w-6 left-2 top-1/2 transform -translate-y-1/2"/>
                  Upload Photo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Product Name */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Name
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Product Category */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Category
                </label>
                <div className="w-full">
                  <select
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleCategoryChange}
                    className={inputClass}
                    required
                  >
                    <option value="">Select Product Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.tabName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Sub-Category */}
              {subCategories.length > 0 && (
                <div className="flex items-start gap-4">
                  <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                    Product Sub-Category
                  </label>
                  <div className="w-full">
                    <select
                      name="productSubCategory"
                      value={formData.productSubCategory}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Select Product Sub-Category</option>
                      {subCategories.map((subCat) => (
                        <option key={subCat._id} value={subCat.name}>
                          {subCat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Product Price */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Price
                </label>
                <div className="w-full">
                  <input
                    type="number"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Product Description */}
              <div className="flex items-start gap-4">
                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                  Product Description
                </label>
                <div className="w-full">
                  <textarea
                    rows="5"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    placeholder="Enter Product Description"
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-[200px] bg-[#E6F2F1] text-[#007E74] border border-[#007E74] font-medium px-10 py-2 rounded-lg hover:bg-[#d1e5e4]"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-[200px] font-medium px-10 py-2 rounded-lg bg-[#007E74] text-white hover:bg-[#006a62] transition-colors disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBigProduct;