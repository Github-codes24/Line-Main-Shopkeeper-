import React from "react";

const products = [
  { name: "PVC Wire Cable", category: "Tap Cleaner", image: "/images/product.png" },
  { name: "Havells 9W LED Bulb", category: "Tap Cleaner", image: "/images/product.png" },
  { name: "UPVC Plumbing Pipe", category: "Plumber", image: "/images/product.png" },
  { name: "Asian Paints Ultima", category: "Painter", image: "/images/product.png" },
];

const TopSellingProduct = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-gray-800">Top Selling Product</h4>
        <button className="text-sm text-teal-600 hover:underline">See All</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 font-medium text-gray-700">Product Image</th>
              <th className="p-2 font-medium text-gray-700">Product Name</th>
              <th className="p-2 font-medium text-gray-700">Product Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-b last:border-none hover:bg-gray-50 transition">
                <td className="p-2">
                  <img src={p.image} alt={p.name} className="w-8 h-8 object-contain" />
                </td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProduct;
