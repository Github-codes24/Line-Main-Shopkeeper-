import React, { useState } from "react";
import { Eye, Mail, PenSquare } from "lucide-react";

// Dummy AddProduct Component
const AddProduct = ({ onCancel }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <button
        onClick={onCancel}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Back to List
      </button>
    </div>
  );
};

const SmallProduct = () => {
  const [step, setStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      serialNo: "01",
      productname: "PVC Wire Cable (Red Colour)",
      productcategory: "Electrician",
      productprice: "₹ 1000",
      approvalstatus: "Approved",
    },
    {
      serialNo: "02",
      productname: "Asian Paints Exterior",
      productcategory: "Painter",
      productprice: "₹ 500",
      approvalstatus: "Pending",
    },
    // Add more sample products here
  ];

  // Filtered products
  const filteredProducts = products.filter((item) =>
    item.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (step === 1) return <AddProduct onCancel={() => setStep(0)} />;

  return (
    <div className="p-6 w-full">
      {/* Upper Section */}
      <div className="bg-gradient-to-r from-indigo-200 to-indigo-100 p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-semibold text-black">Small Product List</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by Product Name"
            className="px-3 py-1 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
            onClick={() => setStep(1)}
          >
            + Add New Product
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">Electrician</button>
          <button className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">Plumber</button>
          <button className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300">Painter</button>
        </div>
        <button className="px-3 py-1 bg-red-100 text-red-500 border border-red-400 rounded hover:bg-red-200">
          Reset Filter
        </button>
      </div>

      {/* Product Table Section */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="px-3 py-2 border">Serial No</th>
              <th className="px-3 py-2 border">Product Name</th>
              <th className="px-3 py-2 border">Category</th>
              <th className="px-3 py-2 border">Price</th>
              <th className="px-3 py-2 border">Approval Status</th>
              <th className="px-3 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-3 py-2 border text-center">{item.serialNo}</td>
                <td className="px-3 py-2 border">{item.productname}</td>
                <td className="px-3 py-2 border">{item.productcategory}</td>
                <td className="px-3 py-2 border">{item.productprice}</td>
                <td className="px-3 py-2 border text-green-600">{item.approvalstatus}</td>
                <td className="px-3 py-2 border text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button className="bg-indigo-100 p-2 rounded shadow hover:shadow-md">
                      <Eye className="text-black" size={16} />
                    </button>
                    <button className="bg-indigo-100 p-2 rounded shadow hover:shadow-md">
                      <PenSquare className="text-black" size={16} />
                    </button>
                    <button className="bg-indigo-100 p-2 rounded shadow hover:shadow-md">
                      <Mail className="text-black" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SmallProduct;
