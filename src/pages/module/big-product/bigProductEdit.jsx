// BigProductEdit.jsx
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BigProductEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();

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
                const res = await axios.get(
                    `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/get-single-bigproduct/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGVjOTM4MzdlMGU0ZTA2ZWExZmRhMTEiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc2MDMzNDgyOSwiZXhwIjoxNzYwMzYzNjI5fQ.LTh_6QMFjALzK6rrhonR_p8xgz0WGPBNh3KC6iBTVes",
                        },
                    }
                );
                if (res.data.success) {
                    setProduct(res.data.data);
                } else {
                    toast.error(res.data.message || "Failed to fetch product data");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                toast.error("Something went wrong while fetching product");
            }
        };
        getProduct();
    }, [id]);

    const handleBack = () => {
        navigate("/big-product");
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct((prev) => ({...prev, [name]: value}));
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                productPrice: Number(product.productPrice),
                productDescription: product.productDescription,
            };

            const res = await axios.put(
                `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/update-bigproduct/${id}`,
                payload,
                {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGVjOTM4MzdlMGU0ZTA2ZWExZmRhMTEiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc2MDMzNDgyOSwiZXhwIjoxNzYwMzYzNjI5fQ.LTh_6QMFjALzK6rrhonR_p8xgz0WGPBNh3KC6iBTVes",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data.success) {
                toast.success("Product updated successfully!");
                setTimeout(() => navigate("/big-product"), 1500);
            } else {
                toast.error(res.data.message || "Failed to update product");
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
                <button onClick={() => navigate(-1)} className="text-xl text-black hover:opacity-75">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                            stroke="#0D2E28"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                            stroke="#0D2E28"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.6663 20H13.333"
                            stroke="#0D2E28"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold text-gray-800 p-2 rounded-lg">Edit Big Product</h2>
            </div>

            <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                <div className="items-center border border-black p-2 rounded-lg">
                    <div className="flex items-start">
                        <p className="w-1/3 font-medium">Product Image</p>
                        <div className="w-full">
                            <img src={product.productImageUrl} alt={product.productName} className="max-h-60 rounded" />
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

// Reusable Form Field
const FormField = ({label, placeholder, type, children}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            <label className="w-full sm:w-1/3 font-medium">{label}</label>
            <span className="hidden sm:inline font-medium">:</span>
            {type === "textarea" ? (
                <textarea
                    placeholder={placeholder}
                    rows={4}
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

export default BigProductEdit;
