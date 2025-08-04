import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";

const UploadBill = () => {
    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "No file chosen");
    };

    return (
        <div className="p-3 bg-gray-100 min-h-screen">
            <div className=" bg-white shadow-sm rounded-lg px-3 py-2">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <IoArrowBackCircleOutline className="text-4xl text-[#0D2E28]" />
                    <h2 className="text-2xl font-medium text-[#0D2E28] mt-1">Upload Bill</h2>
                </div>
            </div>

            <div className='bg-white p-3 rounded-lg shadow-sm mt-3'>
                {/* Upload Section */}
                <div className="min-h-screen mb-6 border-1 border-[#999999] rounded-md px-20 py-8">
                    <div className="flex items-center mb-3">
                        <label className="w-40 font-bold text-[#000000] text-lg">Upload Bill</label>
                        <span className="font-medium mr-2">:</span>
                        <div className="w-80 border-1 border-[#19A699] rounded-md px-3 py-2 bg-[#F5FFFF]">
                                <input
                                type="file"
                                id="bill"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-[#0D2E28] file:mr-4 file:py-1 file:px-4
                  file:rounded-md file:border-0 file:text-sm file:font-semibold
                  file:bg-[#007E74] file:text-white"
                            />
                            {/* <span className="text-sm text-gray-500 truncate">{fileName}</span> */}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-40 font-bold text-[#000000] text-lg">Add Products</label>
                        <span className="font-medium mr-2">:</span>
                        <select className="w-80 border-1 border-[#19A699] rounded-md px-3 py-2 text-[#616666] bg-[#F5FFFF]">
                            <option value="">Select Product</option>
                            <option value="product1">Product 1</option>
                            <option value="product2">Product 2</option>
                            <option value="product3">Product 3</option>
                        </select>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-center space-x-5 mt-6">
                    <button className="px-12 py-2 border-1 bg-[#D9F1EB] border-[#007E74] font-medium text-[#007E74] rounded-lg">
                        Cancel
                    </button>
                    <button className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-md">
                        Upload Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadBill;
