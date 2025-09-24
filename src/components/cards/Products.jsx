import React from "react";

const TopSellingProduct = ({products = []}) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md w-full border border-gray-500">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">Top Selling Product</h4>
                <button className="text-sm text-teal-600 hover:underline">See All</button>
            </div>

            <div className="overflow-x-auto">
                <div className="bg-white shadow-md rounded-lg border">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 font-medium text-gray-900 border-b">Product Image</th>
                                <th className="p-3 font-medium text-gray-900 border-b">Product Name</th>
                                <th className="p-3 font-medium text-gray-900 border-b">Product Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((p, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition">
                                        <td className="p-3 border-b">
                                            <img
                                                src={p.productImage}
                                                alt={p.productName}
                                                className="w-10 h-10 object-contain rounded"
                                            />
                                        </td>
                                        <td className="p-3 border-b">{p.productName}</td>
                                        <td className="p-3 border-b">{p.productcategory}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="p-4 text-center text-gray-500">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopSellingProduct;
