// SmallProductView.jsx
import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const SmallProductView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();

    const product = location.state;

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-600">
                    Product not found. Go back to{" "}
                    <button onClick={() => navigate("/small-product")} className="text-teal-700 underline">
                        Small Products
                    </button>
                    .
                </p>
            </div>
        );
    }

    const handleEdit = () => {
        navigate(`/small-product/edit/${id}`, {state: product});
    };

    return (
        <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28] min-h-screen">
            {/* Header */}
            <div className="flex bg-white m-2 border rounded-md shadow-lg p-3">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <h1 className="ml-4 text-xl font-medium">View Small Product</h1>
                </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                <div className="space-y-4 border border-black p-4 rounded-lg min-h-screen">
                    {/* Image Field */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                        <label className="w-full sm:w-1/3 font-medium">Product Image</label>
                        <span className="hidden sm:inline font-medium">:</span>
                        <div className="flex-1 flex items-center">
                            <div className="w-40 h-40 border border-[#007E74] rounded-lg bg-gray-50 flex items-center justify-center">
                                <img
                                    src={product.image || "placeholder.png"}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <DisplayField label="Product Name" value={product.name} />

                    {/* Category */}
                    <DisplayField label="Product Category" value={product.category} />

                    {/* Sub-Category */}
                    <DisplayField label="Product Sub-Category" value={product.subcategory} />

                    {/* Price */}
                    <DisplayField label="Product Price" value={product.price} />

                    {/* Description */}
                    <DisplayField label="Product Description" value={product.description} isTextarea />
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={handleEdit}
                        className="bg-teal-700 text-white px-14 py-2 rounded-lg hover:bg-teal-800"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

// Reusable Display Field
const DisplayField = ({label, value, isTextarea}) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
        <label className="w-full sm:w-1/3 font-medium">{label}</label>
        <span className="hidden sm:inline font-medium">:</span>
        {isTextarea ? (
            <div className="flex-1 w-full sm:w-auto border border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">{value}</div>
        ) : (
            <div className="flex-1 w-full sm:w-auto border border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">{value}</div>
        )}
    </div>
);

export default SmallProductView;
