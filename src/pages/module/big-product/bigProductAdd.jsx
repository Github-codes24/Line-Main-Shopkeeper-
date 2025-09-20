// AddBigProduct.jsx
import React from "react";
import {useNavigate} from "react-router-dom";

const BigProductAdd = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/big-product");
    };

    return (
        <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]  ">
            <div className=" flex bg-white m-2 border rounded-md shadow-lg p-3">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M26.6663 20H13.333"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <h1 className="ml-4 text-xl font-medium">Add New Big Product</h1>
                </div>
            </div>

            <div className="flex flex-col border  rounded-md p-6 space-y-5 shadow-lg m-2 bg-white min-h-screen">
                <div className="  border border-black p-2 rounded-lg">
                    {/* Upload Image Section */}

                    <div className="flex items-start">
                        <p className="w-1/3">Product Image</p>
                        <div className="w-full">
                            <label
                                htmlFor="upload-photo"
                                className="flex flex-col items-center justify-center w-40 h-40 border-2  border-[#007E74] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                            >
                                <svg
                                    className="w-10 h-10 text-[#007E74]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                                    ></path>
                                </svg>
                                <span className="text-sm text-[#ffffff] bg-teal-600 mt-2 px-5 rounded-md py-1">
                                    Upload Photo
                                </span>
                                <input id="upload-photo" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="flex items-center pt-3">
                            <label className="w-1/3 block  mb-1">Product Name:</label>
                            <input
                                type="text"
                                placeholder="Enter Product Name"
                                className="w-full border-1 border-[#007E74] rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Category:</label>
                            <select className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]">
                                <option>Select Product Category</option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Groceries</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Price:</label>
                            <input
                                type="text"
                                placeholder="Enter Price"
                                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Description:</label>
                            <textarea
                                rows="3"
                                placeholder="Enter Product Description"
                                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                </div>
                <div className="flex justify-center space-x-3 pt-2">
                    <button
                        onClick={handleBack}
                        className="bg-teal-100 border-1 border-[#007E74] text-[#007E74] px-5 py-2 rounded hover:bg-teal-200"
                    >
                        Cancel
                    </button>
                    <button className="bg-[#007E74] text-white px-5 py-2 rounded hover:bg-teal-800">Add Product</button>
                </div>
            </div>
        </div>
    );
};

export default BigProductAdd;
