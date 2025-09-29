import React from "react";
import {useNavigate} from "react-router-dom";

const SmallProductAdd = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);

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
                    <h1 className="ml-4 text-xl font-medium">Add New Small Product</h1>
                </div>
            </div>

            {/* Form */}
            <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                <div className="space-y-4 border border-black p-4 rounded-lg min-h-screen">
                    {/* Image Upload */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                        <label className="w-full sm:w-1/3 font-medium">Product Image</label>
                        <span className="hidden sm:inline font-medium">:</span>
                        <div className="flex-1 flex items-center">
                            <label
                                htmlFor="upload-photo"
                                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-[#007E74] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <svg
                                    className="w-10 h-10 text-[#007E74]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                                    />
                                </svg>
                                <span className="text-sm text-white bg-teal-600 px-8 rounded-md ">Upload Photo</span>
                                <input id="upload-photo" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Product Name */}
                    <FormField label="Product Name" placeholder="Enter Product Name" />

                    {/* Product Category */}
                    <FormField label="Product Category" placeholder="Select Category" type="select">
                        <option>Select Product Category</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Groceries</option>
                    </FormField>

                    {/* Product Subcategory */}
                    <FormField label="Product Sub-Category" placeholder="Select Category" type="select">
                        <option>Select Product Category</option>
                    </FormField>

                    {/* Product Price */}
                    <FormField label="Product Price" placeholder="Enter Price" />

                    {/* Product Description */}
                    <FormField label="Product Description" placeholder="Enter Product Description" type="textarea" />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                        onClick={handleBack}
                        className="bg-teal-100 border border-[#007E74] text-[#007E74] px-14 py-2 rounded-lg w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button className="bg-[#007E74] text-white px-8 py-2 rounded-lg hover:bg-teal-800 w-full sm:w-auto">
                        Add Product
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
