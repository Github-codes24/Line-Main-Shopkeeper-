import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {MdOutlineFileUpload} from "react-icons/md";
import {toast} from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const SmallProductAdd = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [fetchData] = useFetch();

    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productSubCategory, setProductSubCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const inputClass =
        "bg-[#F5FFFF] border border-[#B2D8D5] text-[#0D2E28] text-lg font-medium rounded-lg px-4 py-2 w-full outline-none focus:outline-none placeholder:text-[#0D2E28] placeholder:font-medium";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/experties`,
                });

                if (result.success) {
                    setCategories(result.data || []);
                } else {
                    console.error("Error fetching categories:", result.message);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!productCategory) {
            setSubCategories([]);
            setProductSubCategory("");
            return;
        }

        const fetchSubCategories = async () => {
            try {
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/${productCategory}/subtabs`,
                });

                if (result.success) {
                    setSubCategories(result.data || []);
                } else {
                    console.error("Error fetching sub-categories:", result.message);
                }
            } catch (err) {
                console.error("Error fetching sub-categories:", err);
            }
        };
        fetchSubCategories();
    }, [productCategory]);

    const handleBack = () => navigate(-1);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !productCategory || !productPrice || !productDescription || !productImage) {
            toast.error("Please fill all fields and select an image");
            return;
        }

        if (productDescription.length < 10) {
            toast.error("Product description must be at least 10 characters");
            return;
        }

        if (subCategories.length > 0 && !productSubCategory) {
            toast.error("Please select a valid product sub-category for this category.");
            return;
        }

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productCategory", productCategory);
        formData.append("productPrice", productPrice);
        formData.append("productDescription", productDescription);
        formData.append("productImage", productImage);
        formData.append("shopkeeperId", "68c3fcbe4b8c59bf22f89314");

        if (productSubCategory) formData.append("productSubCategory", productSubCategory);

        try {
            setLoading(true);
            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/small-products`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            });

            if (result.success) {
                toast.success("Product Added Successfully!");
                navigate(-1);
            } else {
                toast.error(`Failed to add product: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(`Failed to add product: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]">
            <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2">
                <div className="flex items-center">
                    <button onClick={handleBack} className="text-xl font-semibold text-gray-800 p-2 rounded-lg">
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
                    <h2 className="text-xl font-semibold text-gray-800 p-2 rounded-lg">Add New Small Product</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                    <div className="border border-[#616666] p-4 rounded-lg">
                        <div className="flex gap-4 mb-6">
                            <label className="w-[240px] font-medium text-lg text-[#0D2E28]">Product Image</label>
                            <div className="rounded-lg p-0 w-[240px] h-[240px] flex flex-col items-center justify-center relative">
                                <img
                                    src={imagePreviewUrl || "https://via.placeholder.com/240?text=No+Image"}
                                    alt="Product"
                                    onClick={() => fileInputRef.current.click()}
                                    className="min-h-[240px] w-[240px] object-cover mb-2 cursor-pointer border-2 border-[#B2D8D5] rounded-3xl"
                                />
                                <button
                                    className="w-[200px] h-[40px] top-50 right-50 absolute bg-[#007E7499] text-white text-base font-medium px-3 py-1 rounded-lg"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        fileInputRef.current && fileInputRef.current.click();
                                    }}
                                    type="button"
                                >
                                    <MdOutlineFileUpload className="absolute h-6 w-6 left-2 top-1/2 transform -translate-y-1/2" />
                                    Upload Photo
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                    Product Name:
                                </label>
                                <div className="w-full">
                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        placeholder="Enter Product Name"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                    Product Category:
                                </label>
                                <div className="w-full">
                                    <select
                                        value={productCategory}
                                        onChange={(e) => {
                                            setProductCategory(e.target.value);
                                            setProductSubCategory("");
                                        }}
                                        className={inputClass}
                                    >
                                        <option value="">Select Product Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.tabName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {subCategories.length > 0 && (
                                <div className="flex items-start gap-4">
                                    <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                        Product Sub-Category:
                                    </label>
                                    <div className="w-full">
                                        <select
                                            value={productSubCategory}
                                            onChange={(e) => setProductSubCategory(e.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="">Select Product Sub-Category</option>
                                            {subCategories.map((subCat) => (
                                                <option key={subCat._id} value={subCat.name}>
                                                    {subCat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                    Product Price:
                                </label>
                                <div className="w-full">
                                    <input
                                        type="number"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        placeholder="Enter Price"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <label className="min-w-[240px] font-medium text-lg text-[#0D2E28] pt-2">
                                    Product Description:
                                </label>
                                <div className="w-full">
                                    <textarea
                                        rows="5"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                        placeholder="Enter Product Description"
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="w-[200px] bg-[#E6F2F1] text-[#007E74] border border-[#007E74] font-medium px-10 py-2 rounded-lg"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-[200px] font-medium px-10 py-2 rounded-lg bg-[#007E74] text-white"
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SmallProductAdd;
