// SmallProductView.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SmallProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Using your provided token directly (for testing/demo)
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";

  const handleBack = () => {
    navigate("/small-product");
  };

  const handleEdit = () => {
    navigate(`/small-product/edit/${id}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!token) {
        setError("Authentication token missing. Please login.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://linemen-be-1.onrender.com/shopkeeper/small-products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token.trim()}`,
            },
          }
        );

        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch product");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Authentication failed. Invalid or expired token.");
        } else {
          setError(err.response?.data?.message || err.message);
        }
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  if (loading) {
    return <div className="p-4 text-center">Loading product details...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-4 text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
      {/* Header */}
      <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2">
        <img
          onClick={handleBack}
          className="w-8 h-8 mt-2 cursor-pointer"
          src="/back Button.png" // Using absolute path for clarity
          alt="Back"
        />
        <h2 className="text-xl font-semibold text-gray-800 p-2 rounded-lg">
          View Small Product
        </h2>
      </div>

      {/* Product Details */}
      <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
        {/* Product Image */}
    <div className="flex items-start p-2 rounded-lg">
  <p className="w-1/3 font-medium">Product Image</p>
  <div className="w-full">
    <img
      src={product.productImageUrl || "/default-image.png"}
      alt={product.productName}
      className="max-w-xs rounded-lg border border-black"
    />
  </div>
</div>


        {/* Form Fields */}
        <div className="space-y-4">
          <div className="flex items-center pt-3">
            <p className="w-1/3 block mb-1">Product Name:</p>
            <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
              {product.productName || "N/A"}
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block mb-1">Product Category:</label>
            <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
              {/* ✨ FIX: Access the tabName property of the category object */}
              {product.productCategory?.tabName || "N/A"}
            </div>
          </div>

          <div className="flex items-center">
  <label className="w-1/3 block mb-1">Product Sub-Category:</label>
  <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
{product.productSubCategory?.name || "N/A"}  </div>
</div>


          <div className="flex items-center">
            <label className="w-1/3 block mb-1">Product Price:</label>
            <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
              ₹{product.productPrice || "0"}
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block mb-1">Product Description:</label>
            <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] p-2.5 rounded-lg min-h-[80px]">
              {product.productDescription ||
                "No description available for this product."}
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center space-x-3 pt-4">
          <button
            onClick={handleEdit}
            className="bg-teal-700 text-white px-12 py-2 rounded-lg hover:bg-teal-800 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallProductView;
