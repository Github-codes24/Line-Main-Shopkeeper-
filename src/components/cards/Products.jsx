import React, {useEffect} from "react";
import useDashboard from "../../hook/dashboard/useDashboard";

const TopSellingProduct = () => {
    const {loading, fetchTopSellingProducts, topsellingProduct, searchProduct} = useDashboard();

    const productsToDisplay = searchProduct.length > 0 ? searchProduct : topsellingProduct;

    useEffect(() => {
        fetchTopSellingProducts();
    }, []);

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800">Top Selling Products</h4>
                <button
                    className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
                    // onClick={() => navigate("/products")}
                >
                    See All
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 text-left border-b border-gray-100/70">
                            <th className="p-3 font-semibold text-gray-900">Product Image</th>
                            <th className="p-3 font-semibold text-gray-900">Product Name</th>
                            <th className="p-3 font-semibold text-gray-900">Product Category</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productsToDisplay.length > 0 ? (
                            productsToDisplay.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100/60"
                                >
                                    <td className="p-3">
                                        <img
                                            src={item.productImageUrl || item.productImage}
                                            alt={item.productName}
                                            className="w-10 h-10 rounded-md object-cover border border-gray-200"
                                        />
                                    </td>
                                    <td className="p-3 font-medium text-gray-800">{item.productName}</td>
                                    <td className="p-3 text-gray-600">{item.productSubCategory || "—"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="p-6 text-center text-gray-500 italic">
                                    Data not found...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopSellingProduct;
