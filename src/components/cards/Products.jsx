import React, {useEffect} from "react";
import useDashboard from "../../hook/dashboard/useDashboard";

const TopSellingProduct = () => {
    const {loading, fetchTopSellingProducts, topsellingProduct, searchProduct} = useDashboard();

    const productsToDisplay = searchProduct.length > 0 ? searchProduct : topsellingProduct;

    const data =
        productsToDisplay.length > 0 ? (
            productsToDisplay.map((item, index) => (
                <tr key={index}>
                    <td className="p-3 border-b">
                        <img
                            src={item.productImageUrl || item.productImage}
                            alt={item.productName}
                            className="w-10 h-10 object-contain rounded"
                        />
                    </td>
                    <td className="p-3 border-b">{item.productName}</td>
                    <td className="p-3 border-b">{item.productSubCategory}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                    Data not found...
                </td>
            </tr>
        );
    useEffect(() => {
        fetchTopSellingProducts();
    }, []);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full border border-gray-500">
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
                        <tbody>{data}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopSellingProduct;
