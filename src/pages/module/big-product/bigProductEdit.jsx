// BigProductEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch"; // Your custom fetch hook
import conf from "../../../config";

const BigProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fetchData] = useFetch();

  const [product, setProduct] = useState({
    productName: "",
    productCategory: "",
    productSubCategory: "",
    productPrice: "",
    productDescription: "",
    productImageUrl: "",
  });

  // Fetch product details
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/get-single-bigproduct/${id}`,
        });

        if (res.success) {
          setProduct(res.data);
        } else {
          toast.error(res.message || "Failed to fetch product data");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Something went wrong while fetching product");
      }
    };
    getProduct();
  }, [id, fetchData]);

  const handleBack = () => {
    navigate("/big-product");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        productPrice: Number(product.productPrice),
        productDescription: product.productDescription,
      };

      const res = await fetchData({
        method: "PUT",
        url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/update-bigproduct/${id}`,
        data: payload,
      });

      if (res.success) {
        toast.success("Product updated successfully!");
        setTimeout(() => navigate("/big-product"), 1500);
      } else {
        toast.error(res.message || "Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Something went wrong while updating product");
    }
  };

  return (
    <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
      <ToastContainer />
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
