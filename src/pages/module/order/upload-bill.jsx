import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

const sampleProducts = [
    { id: 1, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 2, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 3, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 4, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 5, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 1, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 2, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 3, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 4, name: "Ambuja Cement", price: 360, unit: "Bag" },
    { id: 5, name: "Ambuja Cement", price: 360, unit: "Bag" },
];

const UploadBill = () => {
    const [fileName, setFileName] = useState("No file chosen");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [quantities, setQuantities] = useState(
        sampleProducts.reduce((acc, product) => {
            acc[product.id] = { checked: false, qty: 0 };
            return acc;
        }, {})
    );
    const location = useLocation();
    const navigate = useNavigate();

    const fromPage = location.state?.from || '/'; // fallback if state is missing


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "No file chosen");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleCheckbox = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: { ...prev[id], checked: !prev[id].checked }
        }));
    };

    const incrementQty = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: { ...prev[id], qty: prev[id].qty + 1 }
        }));
    };

    const decrementQty = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: { ...prev[id], qty: Math.max(0, prev[id].qty - 1) }
        }));
    };

    return (
        <div className="p-3 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-4">
                    <IoArrowBackCircleOutline className="text-4xl text-[#0D2E28]"
                        onClick={() => navigate(fromPage)} />
                    <h2 className="text-2xl font-medium text-[#0D2E28] mt-1">Upload Bill</h2>
                </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm mt-3">
                <div className="min-h-screen mb-6 border-1 border-[#999999] rounded-md px-20 py-8">
                    {/* Upload Section */}
                    <div className="flex items-center mb-3">
                        <label className="w-40 font-bold text-[#000000] text-lg">Upload Bill</label>
                        <span className="font-medium mr-4">:</span>
                        <div className="w-80 border-1 border-[#19A699] rounded-md px-3 py-2 bg-[#F5FFFF]">
                            <input
                                type="file"
                                id="bill"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-[#0D2E28] file:mr-4 file:py-1 file:px-4
                                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                                    file:bg-[#007E74] file:text-white"
                            />
                        </div>
                    </div>

                    {/* Product Dropdown */}
                    <div className="flex items-start relative">
                        <label className="w-40 font-bold text-[#000000] text-lg mt-2">Add Products</label>
                        <span className="font-medium mr-4 mt-2">:</span>
                        <div className="w-80">
                            <button
                                onClick={toggleDropdown}
                                className="w-full border-1 border-[#19A699] rounded-md px-3 py-2 text-left text-[#616666] bg-[#F5FFFF]"
                            >
                                Select Product
                            </button>
                            {dropdownOpen && (
                                <div className="absolute z-10 mt-1 w-80 max-h-96 overflow-y-auto border-2 border-[#19A699] bg-[#F2FFFE] shadow-sm scrollbar-hide">
                                    {sampleProducts.map(product => (
                                        <div key={product.id} className="flex items-center justify-between px-3 py-3 border-b-2 border-gray-500">
                                            <input
                                                type="checkbox"
                                                checked={quantities[product.id]?.checked}
                                                onChange={() => toggleCheckbox(product.id)}
                                                className="mr-2 accent-[#007E74] w-4 h-4"
                                            />
                                            <div className="flex-grow ml-2">
                                                <div className="text-sm font-medium text-[#1D4864]">{product.name}</div>
                                                <div className="text-medium font-medium text-[#1D4864]">{product.price}Rs/{product.unit}</div>
                                            </div>
                                            <div className="flex items-center space-x-1 text-[#0D2E28] font-semibold bg-[#F5FFFF] px-2 py-1 rounded-md">
                                                <button onClick={() => decrementQty(product.id)}>
                                                    <FaMinus size={12} className='bg-[#1D4864CC] rounded-full p-1 text-white w-6 h-6' />
                                                </button>
                                                <span className="text-base px-1 text-[#1D4864] underline">{quantities[product.id]?.qty.toFixed(1)}</span>
                                                <button onClick={() => incrementQty(product.id)}>
                                                    <FaPlus size={12} className='bg-[#1D4864CC] rounded-full p-1 text-white w-6 h-6' />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='ml-80 mt-3'>
                        <p className='text-base font-medium text-[#007E74] pl-6 cursor-pointer'>+ Add More Product</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-5 mt-6">
                    <button className="px-12 py-2 border-1 bg-[#D9F1EB] border-[#007E74] font-medium text-[#007E74] rounded-lg">
                        Cancel
                    </button>
                    <button className="px-12 py-2 bg-[#007E74] text-white font-medium rounded-md">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadBill;
