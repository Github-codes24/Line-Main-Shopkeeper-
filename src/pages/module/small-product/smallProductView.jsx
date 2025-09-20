// AddBigProduct.jsx
import React from "react";
import {useNavigate} from "react-router-dom";
const SmallProductView = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/small-product");
    };

    const handleEdit = (id) => {
        navigate(`/small-product/edit/${id}`);
    };

    return (
        <div className="flex flex-col bg-[#E0E9E9] font-medium  text-[#0D2E28] ">
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
                    <h1 className="ml-4 text-xl font-medium">View Small Product</h1>
                </div>
            </div>

            <div className="flex flex-col border  rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                <div className=" items-center border border-black p-2 rounded-lg">
                    {/* Upload Image Section */}

                    <div className="flex items-start">
                        <p className="w-1/3 font-medium">Product Image</p>
                        <div className="w-full">
                            <div className="flex items-center justify-center w-40 h-40 border-2 border border-[#007E74] rounded-lg bg-gray-50">
                                <img
                                    src="Image (1).png"
                                    alt="Product"
                                    className="max-h-full max-w-full object-contain rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="flex items-center pt-3">
                            <p className="w-1/3 block mb-1">Product Name:</p>
                            <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg p-2.5">
                                PVC Wire Cable (Red Colour)
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Category:</label>
                            <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg p-2.5">
                                Electrician
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Price:</label>
                            <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg p-2.5">₹499</div>
                        </div>

                        <div className="flex items-center">
                            <label className="w-1/3 block  mb-1">Product Description:</label>
                            <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg px-4">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde debitis eum quibusdam ab
                                similique officiis vel veniam quis fugit sint quasi laborum, ex numquam perferendis
                                voluptatem. Pariatur possimus deserunt sed.
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                </div>
                <div className="flex justify-center space-x-3 ">
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

export default SmallProductView;
