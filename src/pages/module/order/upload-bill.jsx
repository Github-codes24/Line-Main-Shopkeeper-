import React, {useEffect, useState} from "react";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import {FaMinus, FaPlus} from "react-icons/fa";
import UseOrder from "../../../hook/order/UseOrder";
import {toast} from "react-toastify";

const UploadBill = () => {
    const [file, setFile] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const {loading, getOrderById, fetchOrderById, uploadFinalBill} = UseOrder();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchOrderById(id);
    }, [id]);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProductSelect = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const selectedNames =
        getOrderById?.data?.products
        ?.filter((p) => selectedProducts.includes(p.productId))
        ?.map((p) => p.productName)
        ?.join(", ") || "Selected Products";

    const handleUploadBill = async () => {
        if (!file) {
            toast.error("Please upload a bill image");
            return;
        }

        const selected = getOrderById?.data?.products
        ?.filter((p) => selectedProducts.includes(p.productId))
        ?.map((p) => ({
            productId: p.productId,
            productModel: p.productModel,
            quantity: p.quantity,
        }));

        if (!selected || selected.length === 0) {
            toast.error("Please select at least one product");
            return;
        }

        const formData = new FormData();
        formData.append("finalBillImage", file);
        formData.append("products", JSON.stringify(selected));

        try {
            setUploading(true);
            const res = await uploadFinalBill(id, formData);

            if (res?.success) {
                setShowSuccessModal(true);
            }
        } finally {
            setUploading(false);
        }
    };

    const UploadSuccessModal = ({isOpen, onClose}) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
                    <h2 className="text-xl font-semibold text-[#0D2E28] mb-4">Bill Uploaded Successfully!</h2>
                    <p className="text-gray-600 mb-6">The final bill has been uploaded successfully.</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-[#007E74] text-white font-medium rounded-md hover:bg-[#005f58]"
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="p-3 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-4">
                    <IoArrowBackCircleOutline className="text-4xl text-[#0D2E28]" onClick={() => navigate(-1)} />
                    <h2 className="text-2xl font-medium text-[#0D2E28] mt-1">Upload Bill</h2>
                </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm mt-3 min-h-screen">
                <div className="border border-gray-600 rounded-md p-4 min-h-screen">
                    <div className="mb-6 rounded-md px-10 py-8">
                        <div className="flex items-center mb-3">
                            <label className="w-40 font-semibold text-[#000000] text-lg">Upload Bill</label>
                            <span className="font-medium mr-4">:</span>
                            <div className="w-80 border border-[#19A699] rounded-md px-3 py-2 bg-[#F5FFFF]">
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

                        <div className="flex items-start relative">
                            <label className="w-40 font-semibold text-[#000000] text-lg mt-2">Add Products</label>
                            <span className="font-medium mr-4 mt-2">:</span>
                            <div className="w-80 relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="w-full border border-[#19A699] rounded-md px-3 py-2 text-left text-[#0D2E28] bg-[#F5FFFF]"
                                >
                                    {selectedProducts.length > 0 ? selectedNames : "Select Products"}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full max-h-96 overflow-y-auto border border-[#19A699] bg-[#F2FFFE] shadow-sm scrollbar-hide rounded-md">
                                        {getOrderById?.data?.products?.length > 0 ? (
                                            getOrderById.data.products.map((item, index) => (
                                                <div
                                                    key={item.productId}
                                                    className="flex items-center justify-between px-3 py-2 border-b border-gray-300"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedProducts.includes(item.productId)}
                                                            onChange={() => handleProductSelect(item.productId)}
                                                            className="accent-[#007E74] w-4 h-4"
                                                        />
                                                        <span className="text-[#1D4864] text-sm font-medium">
                                                            {item.productName}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-[#555]">Qty: {item.quantity}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="px-3 py-2 text-gray-500">No Products Found</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-5 mt-6">
                    <button
                        className="px-12 py-2 border bg-[#D9F1EB] border-[#007E74] font-medium text-[#007E74] rounded-lg"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-12 py-2 bg-[#007E74] text-white font-medium rounded-md"
                        onClick={handleUploadBill}
                    >
                        Submit
                    </button>
                </div>
            </div>

            <UploadSuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate("/orders");
                }}
            />

            {uploading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex flex-col items-center space-y-3">
                        <div className="w-8 h-8 border-4 border-t-[#007E74] border-gray-200 rounded-full animate-spin"></div>
                        <p className="text-[#0D2E28] font-medium">Uploading bill...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadBill;
