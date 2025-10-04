import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Upload as UploadIcon } from "lucide-react";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730"; // Replace with your actual token

const SmallProductAdd = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const api = axios.create({
    baseURL: "https://linemen-be-1.onrender.com",
    headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
  });

  // Fetch categories (tabs)
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
    if (!productCategory) {
      setSubCategories([]);
      setProductSubCategory("");
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await api.get(
          `/shopkeeper/bigproduct/${productCategory}/subtabs`
        );
        if (res.data.success) {
          setSubCategories(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching sub-categories:", err);
      }
    };
    fetchSubCategories();
  }, [productCategory]);

  const handleBack = () => navigate(-1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (
      !productName ||
      !productCategory ||
      !productPrice ||
      !productDescription ||
      !productImage
    ) {
      alert("Please fill all fields and select an image");
      return;
    }

    if (productDescription.length < 10) {
      alert("Product description must be at least 10 characters");
      return;
    }

    if (subCategories.length > 0 && !productSubCategory) {
      alert("Please select a valid product sub-category for this category.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productCategory", productCategory);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("productImage", productImage);
    formData.append("shopkeeperId", "68c3fcbe4b8c59bf22f89314");

    if (productSubCategory) formData.append("productSubCategory", productSubCategory);

    try {
      setLoading(true);
      const res = await api.post("/shopkeeper/small-products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product Added Successfully ✅");
      navigate(-1);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      alert(
        `Failed to add product ❌: ${
          error.response?.data?.message || error
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F0F7F7] p-4 font-sans text-[#0D2E28]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 p-3 border border-gray-300 bg-white rounded">
          <button
            onClick={handleBack}
            className="p-1 rounded-full text-3xl hover:bg-gray-200"
          >
            <IoArrowBackCircleOutline />
          </button>
          <h1 className="text-2xl font-semibold">Add New Small Product</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 mt-2 rounded-lg border border-[#616666] shadow-sm">
          <div className="space-y-5">
            {/* Product Image */}
            <div className="flex items-start">
              <label className="w-1/3 pt-2 font-medium">Product Image</label>
              <div className="w-2/3">
                <label
                  htmlFor="photo-upload"
                  className="w-48 h-48 flex items-center justify-center border-2 border-solid border-[#B2D8D5] rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                >
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-[#007E74] bg-opacity-10 text-[#007E74] px-4 py-2 rounded-md font-semibold text-sm">
                      <UploadIcon />
                      <span>Upload Photo</span>
                    </div>
                  )}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="flex items-center">
              <label className="w-1/3 font-medium">Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
                className="w-2/3 border bg-[#F5FFFF] border-[#B2D8D5] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007E74] placeholder:text-[#0D2E28] placeholder:font-medium"
              />
            </div>

            {/* Product Category */}
            <div className="flex items-center">
              <label className="w-1/3 font-medium">Product Category:</label>
              <select
                value={productCategory}
                onChange={(e) => {
                  setProductCategory(e.target.value);
                  setProductSubCategory("");
                }}
                className="w-2/3 border border-[#B2D8D5] bg-[#F5FFFF] rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007E74] text-[#0D2E28] font-medium"
              >
                <option value="">Select Product Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.tabName}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Sub-Category */}
            {subCategories.length > 0 && (
              <div className="flex items-center">
                <label className="w-1/3 font-medium">
                  Product Sub-Category:
                </label>
                <select
                  value={productSubCategory}
                  onChange={(e) => setProductSubCategory(e.target.value)}
                  className="w-2/3 border border-[#B2D8D5] rounded-md px-3 py-2 bg-[#F5FFFF] focus:outline-none focus:ring-1 focus:ring-[#007E74] text-[#0D2E28]"
                >
                  <option value="">Select Product Sub-Category</option>
                  {subCategories.map((subCat) => (
                    <option key={subCat._id} value={subCat.name}>
                      {subCat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Product Price */}
            <div className="flex items-center">
              <label className="w-1/3 font-medium">Product Price:</label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter Price"
                className="w-2/3 border border-[#B2D8D5] rounded-md px-3 py-2 bg-[#F5FFFF] focus:outline-none focus:ring-1 focus:ring-[#007E74] placeholder:text-[#0D2E28] placeholder:font-medium"
              />
            </div>

            {/* Product Description */}
            <div className="flex items-start">
              <label className="w-1/3 pt-2 font-medium">
                Product Description:
              </label>
              <textarea
                rows="4"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter Product Description"
                className="w-2/3 border border-[#B2D8D5] rounded-md px-3 py-2 bg-[#F5FFFF] focus:outline-none focus:ring-1 focus:ring-[#007E74] placeholder:text-[#0D2E28] placeholder:font-medium"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handleBack}
                className="w-[200px] h-[40px] rounded-[8px] border border-[#007E74] text-[#007E74] font-semibold bg-[#E6F2F1] hover:bg-[#d1e5e4] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-[200px] h-[40px] rounded-[8px] bg-[#007E74] text-white font-semibold hover:bg-[#006a62] transition-colors disabled:bg-gray-400"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Form Field
const FormField = ({label, placeholder, type, children}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            <label className="w-full sm:w-1/3 font-medium">{label}</label>
            <span className="hidden sm:inline font-medium">:</span>
            {type === "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    rows={3}
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

export default SmallProductAdd;
