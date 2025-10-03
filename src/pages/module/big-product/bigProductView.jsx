// BigProductView.jsx
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const BigProductView = () => {
    const navigate = useNavigate();
    const {id} = useParams(); // get id from route param
    const [product, setProduct] = useState(null);

    const handleBack = () => navigate("/big-product");

    const handleEdit = () => {
        navigate(`/big-product/edit/${id}`);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(
                    `https://linemen-be-1.onrender.com/shopkeeper/bigproduct/get-single-bigproduct/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGMzZmNiZTRiOGM1OWJmMjJmODkzMTQiLCJyb2xlIjoic2hvcGtlZXBlciIsImlhdCI6MTc1NzY3NDk5MiwiZXhwIjoxNzYwMjY2OTkyfQ.fjFQFWcOGtmErZ2nkhJo1CB5HHubgIcVHnmBjTEz730",
                        },
                    }
                );
                if (res.data.success) {
                    setProduct(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
            {/* Header */}
            <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2 items-center">
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
                <h2 className="text-xl font-semibold text-gray-800 p-2 rounded-lg">View Big Product</h2>
            </div>

            {/* Product Details */}
            <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                {/* Product Image */}
                <div className="flex items-start">
                    <p className="w-1/3 font-medium">Product Image</p>
                    <div className="w-full">
                        <img src={product.productImageUrl} alt={product.productName} className="max-h-60 rounded" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                    <div className="flex items-center pt-3">
                        <p className="w-1/3 block mb-1">Product Name:</p>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
                            {product.productName}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 block mb-1">Product Category:</label>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
                            {product.productCategory?.tabName}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 block mb-1">Product Price:</label>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
                            ₹{product.productPrice}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 block mb-1">Product Description:</label>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg px-4">
                            {product.productDescription}
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={handleEdit}
                        className="bg-teal-700 text-white px-12 py-1 rounded hover:bg-teal-800"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductView;
