import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";

const BigProductEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [fetchData] = useFetch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/get-single-bigproduct/${id}`,
                });

                if (result.success) {
                    const product = result.data;
                    setName(product.productName || "");
                    setPrice(product.productPrice || "");
                    setDescription(product.productDescription || "");
                    setImageUrl(product.productImageUrl || "");

                    const catId = product.productCategory?._id || "";
                    setCategoryId(catId);

                    if (catId) {
                        const subRes = await fetchData({
                            method: "GET",
                            url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/${catId}/subtabs`,
                        });
                        if (subRes.success) {
                            setSubCategories(subRes.data || []);
                            const subCatId =
                                typeof product.productSubCategory === "object"
                                    ? product.productSubCategory._id
                                    : product.productSubCategory;
                            setSubCategoryId(subCatId || "");
                        }
                    }
                } else {
                    toast.error(result.message || "Failed to fetch product data");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                toast.error("Something went wrong while fetching product details");
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/experties`,
                });
                if (result.success) setCategories(result.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!categoryId) {
            setSubCategories([]);
            setSubCategoryId("");
            return;
        }

        const fetchSubCats = async () => {
            try {
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/${categoryId}/subtabs`,
                });
                if (result.success) setSubCategories(result.data || []);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };
        fetchSubCats();
    }, [categoryId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        if (!name || !price || !description || !categoryId) {
            toast.error("Please fill all required fields");
            return;
        }

        if (description.length < 10) {
            toast.error("Description must be at least 10 characters");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("productName", name);
        formData.append("productPrice", price);
        formData.append("productDescription", description);
        formData.append("productCategory", categoryId);
        formData.append("productSubCategory", subCategoryId);
        if (imageFile) formData.append("productImage", imageFile);

        try {
            const result = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/shopkeeper/bigproduct/update-bigproduct/${id}`,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"},
            });

            if (result.success) {
                toast.success("Product updated successfully!");
                navigate("/big-product");
            } else {
                toast.error(result.message || "Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Something went wrong while updating product");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#EAF1F1] p-4 font-sans text-[#0D2E28]">
            <div className="flex bg-white mb-4 border border-[#D6E2E2] rounded-lg shadow-sm p-4 items-center">
                <button onClick={() => navigate(-1)} className="text-xl text-black">
                    <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                            stroke="#0D2E28"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                            stroke="#0D2E28"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.6663 20H13.333"
                            stroke="#0D2E28"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <h1 className="ml-4 text-xl font-semibold">Edit Big Product</h1>
            </div>

            <div className="bg-white border border-[#D6E2E2] rounded-lg shadow-sm p-8">
                <div className="space-y-6">
                    <div className="flex">
                        <p className="w-1/4 font-medium pt-2">Product Image</p>
                        <div className="w-3/4">
                            <div className="relative w-48 h-48">
                                <img
                                    src={imageUrl || "https://via.placeholder.com/150"}
                                    alt="Product"
                                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                                />
                                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    Upload Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="w-1/4 font-medium">Product Name:</p>
                        <div className="w-3/4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-[#A7C4C2] bg-[#F5FFFF] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="w-1/4 font-medium">Product Category:</p>
                        <div className="w-3/4">
                            <select
                                value={categoryId}
                                onChange={(e) => {
                                    setCategoryId(e.target.value);
                                    setSubCategoryId("");
                                }}
                                className="w-full border border-[#A7C4C2] bg-[#F5FFFF] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] focus:border-transparent outline-none"
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

                    <div className="flex items-center">
                        <p className="w-1/4 font-medium">Product Sub-Category:</p>
                        <div className="w-3/4">
                            <select
                                value={subCategoryId}
                                onChange={(e) => setSubCategoryId(e.target.value)}
                                disabled={!categoryId || subCategories.length === 0}
                                className="w-full border border-[#A7C4C2] bg-[#F5FFFF] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] focus:border-transparent outline-none disabled:bg-gray-100"
                            >
                                <option value="">Select Product Sub-Category</option>
                                {subCategories.map((sub) => (
                                    <option key={sub._id} value={sub._id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <p className="w-1/4 font-medium">Product Price:</p>
                        <div className="w-3/4 relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border border-[#A7C4C2] bg-[#F5FFFF] rounded-lg px-4 py-2 pl-8 focus:ring-2 focus:ring-[#007E74] focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex">
                        <p className="w-1/4 font-medium pt-2">Product Description:</p>
                        <div className="w-3/4">
                            <textarea
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-[#A7C4C2] bg-[#F5FFFF] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007E74] focus:border-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                    <button
                        onClick={() => navigate("/big-product")}
                        className="bg-[#E0F2F1] text-[#007E74] border border-[#007E74] font-semibold px-12 py-1.5 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={isLoading}
                        className="bg-[#007E74] text-white font-semibold px-12 py-1.5 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BigProductEdit;
