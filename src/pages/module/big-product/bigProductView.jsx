import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const BigProductView = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [fetchData] = useFetch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleBack = () => {
        navigate("/big-product");
    };

    const handleEdit = () => {
        navigate(`/big-product/edit/${id}`);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/get-single-bigproduct/${id}`,
                });

                if (result.success) {
                    setProduct(result.data);
                } else {
                    setError(result.message || "Failed to fetch product");
                    toast.error(result.message || "Failed to fetch product");
                }
            } catch (err) {
                const errorMessage = err.message || "Error loading product details";
                setError(errorMessage);
                toast.error(errorMessage);
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#E0E9E9]">
                <div className="text-center">
                    <p className="text-lg font-medium text-[#0D2E28]">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#E0E9E9]">
                <div className="text-center">
                    <p className="text-lg font-medium text-red-500">{error}</p>
                    <button
                        onClick={handleBack}
                        className="mt-4 bg-teal-700 text-white px-6 py-2 rounded-lg  transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#E0E9E9]">
                <div className="text-center">
                    <p className="text-lg font-medium text-red-500">Product not found</p>
                    <button
                        onClick={handleBack}
                        className="mt-4 bg-teal-700 text-white px-6 py-2 rounded-lg  transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
            <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2">
                <button onClick={handleBack} className="text-xl font-semibold text-gray-800 p-2 rounded-lg ">
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
                <h2 className="text-xl font-semibold text-gray-800 p-2 rounded-lg">View Big Product</h2>
            </div>

            <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                <div className="flex items-start p-2 rounded-lg">
                    <p className="w-1/3 font-medium">Product Image</p>
                    <div className="w-full">
                        <img
                            src={product.productImageUrl || "https://via.placeholder.com/300?text=No+Image"}
                            alt={product.productName}
                            className="max-w-xs rounded-lg border border-black"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center pt-3">
                        <p className="w-1/3 block mb-1">Product Name:</p>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
                            {product.productName || "N/A"}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 block mb-1">Product Category:</label>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
                            {product.productCategory?.tabName || "N/A"}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 block mb-1">Product Sub-Category:</label>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
                            {product.productSubCategory || "N/A"}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 block mb-1">Product Price:</label>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] rounded-lg p-2.5">
                            ₹{product.productPrice || "0"}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <label className="w-1/3 block mb-1">Product Description:</label>
                        <div className="w-full border-1 border-[#007E74] bg-[#E0E9E9] p-2.5 rounded-lg min-h-[80px]">
                            {product.productDescription || "No description available for this product."}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-3 pt-4">
                    <button
                        onClick={handleEdit}
                        className="bg-teal-700 text-white px-16 py-1.5 rounded-lg  transition-colors"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductView;
