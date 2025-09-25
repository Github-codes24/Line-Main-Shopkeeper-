import React from "react";
import {useNavigate} from "react-router-dom";

const BigProductEdit = () => {
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
                    <h1 className="ml-4 text-xl font-medium">Edit Big Product</h1>
                </div>
            </div>

            {/* Form */}
            <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                <div className="space-y-4 border border-black p-4 rounded-lg min-h-screen">
                    {/* Image Upload */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                        <label className="w-full sm:w-1/3 font-medium">Product Image:</label>
                        <span className="hidden sm:inline font-medium">:</span>
                        <div className="flex-1 flex items-center justify-start sm:justify-start ">
                            <img
                                src="Image (1).png"
                                alt="Product"
                                className="w-32 h-32 object-cover  rounded-md border border-[#007E74]"
                            />
                        </div>
                    </div>

                    {/* Product Name */}
                    <FormField label="Product Name:" placeholder="PVC Wire Cable (Red Colour)" />

                    {/* Product Category */}
                    <FormField label="Product Category:" placeholder="Select Category" type="select">
                        <option>Select Product Category</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Groceries</option>
                    </FormField>

                    {/* Product Sub-Category */}
                    <FormField label="Product Sub-Category:" placeholder="Select Category" type="select">
                        <option>Select Product Category</option>
                    </FormField>

                    {/* Product Price */}
                    <FormField label="Product Price:" placeholder="₹499" />

                    {/* Product Description */}
                    <FormField
                        label="Product Description:"
                        placeholder="Lorem ipsum dolor sit amet consectetur. Dolor pulvinar aliquet donec in auctor ultrices nunc. In ut ipsum varius egestas dolor senectus. Posuere ut urna ac aliquam. Et tellus consequat consectetur ornare massa augue. Odio mauris."
                        type="textarea"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                        onClick={handleBack}
                        className="bg-teal-100 text-[#007E74] border border-[#007E74] px-14 py-2 rounded-lg w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button className="bg-teal-700 text-white px-14 py-2 rounded-lg hover:bg-teal-800 w-full sm:w-auto">
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
