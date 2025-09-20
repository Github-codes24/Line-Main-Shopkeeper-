// BigProductEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BigProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState({
    productName: "",
    productCategory: "",
    productSubCategory: "",
    productPrice: "",
    productDescription: "",
    productImageUrl: "",
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730";

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/get-single-bigproduct/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          setProduct(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBack = () => {
    navigate("/big-product");
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update API call (only price & description)
  const handleUpdate = async () => {
    try {
      const payload = {
        productPrice: Number(product.productPrice),
        productDescription: product.productDescription,
      };

      console.log("Update Payload:", payload); // debug

      const res = await axios.put(
        `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/update-bigproduct/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert("Product updated successfully!");
        navigate("/big-product");
      }
    } catch (err) {
      console.error("Error updating product:", err.response?.data || err);
      alert("Failed to update product.");
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
        <h2 className="text-xl font-semibold text-gray-800 p-2 rounded-lg">
          Edit Big Product
        </h2>
      </div>

      <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
        <div className="items-center border border-black p-2 rounded-lg">
          {/* Product Image */}
          <div className="flex items-start">
            <p className="w-1/3 font-medium">Product Image</p>
            <div className="w-full">
              <img
                src={product.productImageUrl}
                alt={product.productName}
                className="max-h-60 rounded"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="flex items-center pt-3">
              <p className="w-1/3 block mb-1">Product Name:</p>
              <input
                type="text"
                name="productName"
                value={product.productName}
                readOnly
                className="w-full border-1 border-[#007E74] rounded-lg px-3 py-2 bg-gray-100 text-[#0D2E28]"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 block mb-1">Product Category:</label>
              <input
                type="text"
                name="productCategory"
                value={product.productCategory?.tabName || product.productCategory}
                readOnly
                className="w-full border-1 border-[#007E74] rounded px-3 py-2 bg-gray-100 text-[#0D2E28]"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 block mb-1">Product SubCategory:</label>
              <input
                type="text"
                name="productSubCategory"
                value={product.productSubCategory}
                readOnly
                className="w-full border-1 border-[#007E74] rounded px-3 py-2 bg-gray-100 text-[#0D2E28]"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 block mb-1">Product Price:</label>
              <input
                type="number"
                name="productPrice"
                value={product.productPrice}
                onChange={handleChange}
                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 text-[#0D2E28]"
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 block mb-1">Product Description:</label>
              <textarea
                rows="4"
                name="productDescription"
                value={product.productDescription}
                onChange={handleChange}
                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 text-[#0D2E28]"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-3">
          <button
            onClick={handleBack}
            className="bg-teal-100 text-[#007E74] border-1 border-[#007E74] px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-teal-700 text-white px-5 py-2 rounded hover:bg-teal-800"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BigProductEdit;
