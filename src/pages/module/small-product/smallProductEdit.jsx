import React, {useState} from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";

const SmallProductEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const location = useLocation();

    const product = location.state || {
        id,
        name: "",
        category: "",
        subcategory: "",
        price: "",
        description: "",
        image: "",
    };

    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [subcategory, setSubcategory] = useState(product.subcategory);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);

    const handleBack = () => navigate("/small-product");

    const handleUpdate = () => {
        console.log("Updated product:", {id, name, category, price, description});
        navigate("/small-product");
    };

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
                    <h1 className="ml-4 text-xl font-medium">Edit Small Product</h1>
                </div>
            </div>

            {/* Form */}
            <div className="flex flex-col border rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
                <div className="space-y-4 border border-black p-4 rounded-lg min-h-screen">
                    {/* Image */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                        <label className="w-full sm:w-1/3 font-medium">Product Image</label>
                        <span className="hidden sm:inline font-medium">:</span>
                        <div className="flex-1 flex items-center ">
                            <div className="flex items-center w-32 h-32 border border-[#007E74] rounded-lg bg-gray-50">
                                <img
                                    src={product.image || "placeholder.png"}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain rounded"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Name */}
                    <FormField label="Product Name" value={name} setValue={setName} placeholder="Enter Product Name" />

                    {/* Product Category */}
                    <FormField label="Product Category" value={category} setValue={setCategory} type="select">
                        <option>Select Product Category</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Groceries</option>
                    </FormField>

                    {/* Product Sub-Category */}
                    <FormField label="Product Sub-Category" value={subcategory} setValue={setSubcategory} type="select">
                        <option>Select Product Category</option>
                    </FormField>

                    {/* Product Price */}
                    <FormField label="Product Price" value={price} setValue={setPrice} placeholder="Enter Price" />

                    {/* Product Description */}
                    <FormField
                        label="Product Description"
                        value={description}
                        setValue={setDescription}
                        placeholder="Enter Product Description"
                        type="textarea"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                        onClick={handleBack}
                        className="bg-teal-100 border border-[#007E74] text-[#007E74] px-14 py-2 rounded-lg w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-teal-700 text-white px-12 py-2 rounded-lg hover:bg-teal-800 w-full sm:w-auto"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

// Reusable Form Field
const FormField = ({label, value, setValue, placeholder, type, children}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            <label className="w-full sm:w-1/3 font-medium">{label}</label>
            <span className="hidden sm:inline font-medium">:</span>
            {type === "textarea" ? (
                <textarea
                    rows={3}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                />
            ) : type === "select" ? (
                <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                >
                    {children}
                </select>
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                />
            )}
        </div>
    );
};

// Reusable Form Field
const FormField = ({label, value, setValue, placeholder, type, children}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
            <label className="w-full sm:w-1/3 font-medium">{label}</label>
            <span className="hidden sm:inline font-medium">:</span>
            {type === "textarea" ? (
                <textarea
                    rows={3}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                />
            ) : type === "select" ? (
                <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                >
                    {children}
                </select>
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 w-full sm:w-auto border border-[#007E74] rounded px-3 py-2"
                />
            )}
        </div>
    );
};

export default SmallProductEdit;
