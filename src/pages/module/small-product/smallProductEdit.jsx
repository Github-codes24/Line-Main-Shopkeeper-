import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SmallProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // State for category & sub-category
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  // Dropdown data
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Image handling
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGVjOTM4MzdlMGU0ZTA2ZWExZmRhMTEiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc2MDMzNDgyOSwiZXhwIjoxNzYwMzYzNjI5fQ.LTh_6QMFjALzK6rrhonR_p8xgz0WGPBNh3KC6iBTVes";

  // Fetch product & pre-populate fields
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `https://linemen-be-1.onrender.com/shopkeeper/small-products/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          const product = response.data.data;
          setName(product.productName);
          setPrice(product.productPrice);
          setDescription(product.productDescription);
          setImageUrl(product.productImageUrl);

          // Set category
          const catId = product.productCategory?._id || "";
          setCategoryId(catId);

          // Fetch sub-categories for this category
          if (catId) {
            const subResponse = await axios.get(
              `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/${catId}/subtabs`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (subResponse.data.success) {
              setSubCategories(subResponse.data.data);

              // Set selected sub-category
              const subCatId =
                typeof product.productSubCategory === "object"
                  ? product.productSubCategory._id
                  : product.productSubCategory;
              setSubCategoryId(subCatId || "");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error.response?.data || error);
      }
    };

    fetchProduct();
  }, [id, token]);

  // Fetch all categories (tabs/expertise)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://linemen-be-1.onrender.com/shopkeeper/bigproduct/experties",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          setCategories(response.data.data); // { _id, tabName }
        }
      } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error);
      }
    };
    fetchCategories();
  }, [token]);

  // Fetch sub-categories when user manually changes category
  useEffect(() => {
    if (!categoryId) {
      setSubCategories([]);
      setSubCategoryId("");
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/${categoryId}/subtabs`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setSubCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching sub-categories:", error.response?.data || error);
      }
    };

    fetchSubCategories();
  }, [categoryId, token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("productName", name);
    formData.append("productPrice", price);
    formData.append("productDescription", description);
    formData.append("productCategory", categoryId);
    formData.append("productSubCategory", subCategoryId);
    if (imageFile) formData.append("productImage", imageFile);

    try {
      const response = await axios.put(
        `https://linemen-be-1.onrender.com/shopkeeper/small-products/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        console.log("Product updated successfully!");
        navigate("/small-product");
      }
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
      alert("Failed to update product. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF1F1] p-4 font-sans text-[#0D2E28]">
      {/* Header */}
      <div className="flex bg-white mb-4 border border-[#D6E2E2] rounded-lg shadow-sm p-4 items-center">
        <button onClick={() => navigate(-1)} className="text-xl text-black hover:opacity-75">
          {/* Back Icon SVG */}
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z" stroke="#0D2E28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673" stroke="#0D2E28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26.6663 20H13.333" stroke="#0D2E28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-semibold">Edit Small Product</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-[#D6E2E2] rounded-lg shadow-sm p-8">
        <div className="space-y-6">
          {/* Product Image */}
          <div className="flex">
            <p className="w-1/4 font-medium pt-2">Product Image</p>
            <div className="w-3/4">
              <div className="relative w-48 h-48">
                <img src={imageUrl || "https://via.placeholder.com/150"} alt="Product" className="w-full h-full object-cover rounded-lg border border-gray-300"/>
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  Upload Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange}/>
                </label>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div className="flex items-center">
            <p className="w-1/4 font-medium">Product Name:</p>
            <div className="w-3/4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-[#A7C4C2]  bg-[#F5FFFF] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] focus:border-transparent outline-none"/>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center">
            <p className="w-1/4 font-medium">Product Category:</p>
            <div className="w-3/4">
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSubCategoryId("");
                }}
                className="w-full border border-[#A7C4C2] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] bg-[#F5FFFF] focus:border-transparent outline-none "
              >
                <option value="">Select Product Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.tabName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub-Category */}
          <div className="flex items-center">
            <p className="w-1/4 font-medium">Product Sub-Category:</p>
            <div className="w-3/4">
              <select
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                className="w-full border border-[#A7C4C2] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] bg-[#F5FFFF] focus:border-transparent outline-none  disabled:bg-gray-100"
                disabled={!categoryId || subCategories.length === 0}
              >
                <option value="">Select Product Sub-Category</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center">
            <p className="w-1/4 font-medium">Product Price:</p>
            <div className="w-3/4 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-[#A7C4C2] rounded-lg px-4 py-2 pl-8 focus:ring-2 bg-[#F5FFFF] focus:ring-[#007E74] focus:border-transparent outline-none"/>
            </div>
          </div>

          {/* Description */}
          <div className="flex">
            <p className="w-1/4 font-medium pt-2">Product Description:</p>
            <div className="w-3/4">
              <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-[#A7C4C2] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] bg-[#F5FFFF] focus:border-transparent outline-none"/>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button onClick={() => navigate("/small-product")} className="bg-[#E0F2F1] text-[#007E74] border border-[#007E74] font-semibold px-8 py-2 rounded-lg hover:bg-[#B2DFDB] transition-colors">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-[#007E74] text-white font-semibold px-8 py-2 rounded-lg hover:bg-[#00695C] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Form Field
const FormField = ({label, value, setValue, placeholder, type, children}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            <label className="w-full sm:w-1/3 font-medium">{label}</label>
            <span className="hidden sm:inline font-medium">:</span>
            {type === "textarea" ? (
                <textarea
                    rows={3}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                />
            ) : type === "select" ? (
                <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                >
                    {children}
                </select>
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                />
            )}
        </div>
    );
};

export default SmallProductEdit;
