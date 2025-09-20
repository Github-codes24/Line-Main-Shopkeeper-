// AddBigProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";

const SmallProductAdd = () => {
  const navigate = useNavigate();

  // Form States
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Categories from backend doc
  const categories = [
    { _id: "68c2ccc5eaa35f894cb1df46", tabName: "Plumbing" },
    { _id: "68c2cccdeaa35f894cb1df4c", tabName: "Plumbing-1" },
    { _id: "68c2ccf2eaa35f894cb1df52", tabName: "Painting" },
    { _id: "68c2cd3feaa35f894cb1df61", tabName: "Electrician" },
    { _id: "68c2cd45eaa35f894cb1df65", tabName: "Tiles Fitting" },
    { _id: "68c2cd5feaa35f894cb1df69", tabName: "AC & Refrigerator Repairing" },
    { _id: "68c2cd6aeaa35f894cb1df6d", tabName: "TV Repair" },
    { _id: "68c2cd7aeaa35f894cb1df71", tabName: "Carpentry" },
  ];

  // Axios instance with inline token
  const api = axios.create({
    baseURL: "https://linemen-be-1.onrender.com",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });

  const handleBack = () => {
    navigate("/");
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

const handleSubmit = async () => {
  if (!productName || !productCategory || !productPrice || !productDescription || !productImage) {
    alert("Please fill all fields and select an image");
    return;
  }

  const formData = new FormData();
  formData.append("productName", productName);
  formData.append("productCategory", productCategory);
  formData.append("productPrice", productPrice);
  formData.append("productDescription", productDescription);
  formData.append("productImage", productImage);

  // ✅ Conditionally add shopkeeperId only if required
  if (productCategory === "68c2ccf2eaa35f894cb1df52") { 
    // Painting (example with subCategory)
    formData.append("shopkeeperId", "68c3fcbe4b8c59bf22f89314");
    formData.append("productSubCategory", "Painter"); // example
  }

  try {
    setLoading(true);
    const res = await api.post("/shopkeeper/small-products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Product Added Successfully ✅");
    console.log("Added:", res.data);
    navigate("/");
  } catch (error) {
    console.error("Error adding product:", error.response?.data || error);
    alert("Failed to add product ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
      <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2">
        <img
          onClick={handleBack}
          className="w-8 h-8 mt-2 cursor-pointer"
          src="back Button.png"
          alt="back"
        />
        <h2 className="text-xl font-semibold text-[#0D2E28] p-2 rounded-lg">
          Add New Small Product
        </h2>
      </div>

      <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
        <div className="border border-black p-2 rounded-lg">
          {/* Upload Image */}
          <div className="flex items-start">
            <p className="w-1/3">Product Image</p>
            <div className="w-full">
              <input type="file" onChange={handleImageChange} />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="flex items-center pt-3">
              <label className="w-1/3 block mb-1">Product Name:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter Product Name"
                className="w-full border-1 border-[#007E74] rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 block mb-1">Product Category:</label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
              >
                <option value="">Select Product Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.tabName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-1/3 block mb-1">Product Price:</label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter Price"
                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 block mb-1">Product Description:</label>
              <textarea
                rows="3"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter Product Description"
                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-3 pt-2">
          <button
            onClick={handleBack}
            className="bg-teal-100 border-1 border-[#007E74] text-[#007E74] px-5 py-2 rounded hover:bg-teal-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#007E74] text-white px-5 py-2 rounded hover:bg-teal-800"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallProductAdd;
