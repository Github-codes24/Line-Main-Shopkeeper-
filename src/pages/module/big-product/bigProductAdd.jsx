import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BigProductAdd = () => {
  const navigate = useNavigate();

  // States for form fields
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  // Dropdown data
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Replace with your actual token and shopkeeper ID logic (e.g., from context or auth)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";
  const shopkeeperId = "68c2ccf2eaa35f894cb1df52";

  const handleBack = () => navigate("/big-product");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://linemen-be-1.onrender.com/shopkeeper/bigproduct/experties",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setCategories(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [token]); // Added token to dependencies

  // Fetch subcategories when category changes
  useEffect(() => {
    // Clear sub-category whenever the category changes
    setProductSubCategory(""); 
    
    if (!productCategory) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(
          `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/${productCategory}/subtabs`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setSubCategories(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };

    fetchSubCategories();
  }, [productCategory, token]); // Added token to dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!productName || !productCategory || !productSubCategory || !productPrice || !productDescription || !productImage) {
      alert("Please fill in all the required fields and select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productCategory", productCategory);
      formData.append("productSubCategory", productSubCategory);
      formData.append("productPrice", productPrice);
      formData.append("productDescription", productDescription);
      formData.append("shopkeeperId", shopkeeperId);
      if (productImage) formData.append("productImage", productImage);

      const response = await axios.post(
        "https://linemen-be-1.onrender.com/shopkeeper/bigproduct/add-bigproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message || "Product added successfully!");
        navigate("/big-product");
      } else {
        alert(response.data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // Check for specific error message from the backend
      const errorMessage = error.response?.data?.message || "Error adding product. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
      <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2">
        <button onClick={handleBack} className="text-xl text-black hover:opacity-75">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z" stroke="#0D2E28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673" stroke="#0D2E28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.6663 20H13.333" stroke="#0D2E28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-[#0D2E28] p-2 rounded-lg">
          Add New Big Product
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white"
      >
        {/* Upload Image */}
        <div className="border border-black p-2 rounded-lg">
          <div className="flex items-start">
            <p className="w-1/3">Product Image</p>
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProductImage(e.target.files[0])}
                className="w-full border border-[#007E74] rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Product Fields */}
          <div className="space-y-4 pt-3">
            <div className="flex items-center">
              <label className="w-1/3">Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
                className="w-full border border-[#007E74] rounded-lg px-3 py-2"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3">Product Category:</label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full border border-[#007E74] rounded px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.tabName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-1/3">Product Sub Category:</label>
              <select
                value={productSubCategory}
                onChange={(e) => setProductSubCategory(e.target.value)}
                className="w-full border border-[#007E74] rounded px-3 py-2"
                required
                disabled={!productCategory} // Disable if no category is selected
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-1/3">Product Price:</label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter Price"
                className="w-full border border-[#007E74] rounded px-3 py-2"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3">Product Description:</label>
              <textarea
                rows="3"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter Product Description"
                className="w-full border border-[#007E74] rounded px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-3 pt-2">
          <button
            type="button"
            onClick={handleBack}
            className="bg-teal-100 border border-[#007E74] text-[#007E74] px-5 py-2 rounded hover:bg-teal-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#007E74] text-white px-5 py-2 rounded hover:bg-teal-800"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Form Field Component
const FormField = ({label, placeholder, type, children}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            <label className="w-full sm:w-1/3 font-medium">{label}</label>
            <span className="hidden sm:inline font-medium">:</span>
            {type === "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                />
            ) : type === "select" ? (
                <select className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 text-[#0D2E28]">
                    {children}
                </select>
            ) : (
                <input
                    type="text"
                    placeholder={placeholder}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                />
            )}
        </div>
    );
};

export default BigProductAdd;
