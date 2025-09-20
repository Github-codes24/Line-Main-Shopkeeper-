// AddBigProduct.jsx
import React from "react";
import {useNavigate} from "react-router-dom";
const BigProductEdit = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/big-product");
    };

    return (
        <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28] ">
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
                    <h1 className="ml-4 text-xl font-medium">Edit Big Product</h1>
                </div>
            </div>
            <div className="flex flex-col border  rounded-md p-6 space-y-5 shadow-lg m-2 bg-white min-h-screen">
                <div className=" items-center border border-black p-2 rounded-lg">
                    {/* Upload Image Section */}

                    <div className="flex items-start">
                        <p className="w-1/3 font-medium ">Product Image</p>
                        <div className="w-full">
                            <img src="Image (1).png" alt="" />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="flex items-center pt-3">
                            <p className="w-1/3 block  mb-1">Product Name:</p>
                            <input
                                type="text"
                                placeholder="PVC Wire Cable (Red Colour)"
                                className="w-full border-1 border-[#007E74] rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Category:</label>
                            <select className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 text-[#0D2E28]">
                                <option>Select Product Category</option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Groceries</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block mb-1">Product Price:</label>
                            <input
                                type="text"
                                placeholder="₹499"
                                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Description:</label>
                            <textarea
                                rows="4"
                                placeholder="Lorem ipsum dolor sit amet consectetur. Dolor pulvinar aliquet donec in auctor ultrices nunc. In ut ipsum varius egestas dolor senectus. Posuere ut urna ac aliquam. Et tellus consequat consectetur ornare massa augue. Odio mauris."
                                className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                </div>
                <div className="flex justify-center space-x-3 ">
                    <button
                        onClick={handleBack}
                        className="bg-teal-100 text-[#007E74] border-1 border-[#007E74]  px-5 py-2 rounded-lg  "
                    >
                        Cancel
                    </button>
                    <button className="bg-teal-700 text-white px-5 py-2 rounded hover:bg-teal-800">Update</button>
                </div>
            </div>
        </div>
    );
};

export default BigProductEdit;
