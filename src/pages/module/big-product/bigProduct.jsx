import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "PVC Wire Cable (Red Colour)",
    category: "Electrician",
    price: "₹499",
    status: "Pending",
  },
  {
    id: 2,
    name: "Havells 9W LED Bulb",
    category: "Electrician",
    price: "₹399",
    status: "Add By Admin",
  },
  {
    id: 3,
    name: "UPVC Plumbing Pipe (Schedule - 40) - 40m...",
    category: "Plumber",
    price: "₹499",
    status: "Approved",
  },
  {
    id: 4,
    name: "Asian Paints Ultima Weather Proof Exterior...",
    category: "Painter",
    price: "₹499",
    status: "Rejected",
  },
  {
    id: 5,
    name: "UXCELL Plush Sleeve Cover Wall Paint Paintin...",
    category: "Painter",
    price: "₹499",
    status: "Add By Admin",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Approved":
      return "text-green-500";
    case "Rejected":
      return "text-red-500";
    case "Add By Admin":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const BigProduct = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/BigProductEdit"); // replace with your route
  };
  const handleView = () => {
    navigate("/BigProductView"); // replace with your route
  };
   const handleAdd = () => {
    navigate("/BigProductAdd"); // replace with your route
  };

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([
    "Electrician",
    "Plumber",
    "Tiler",
    "Painter",
    "AC & Refrigerator Mechanic",
  ]);

  const expertiseOptions = [
    "Electrician",
    "Plumber",
    "Tiler",
    "Painter",
    "AC & Refrigerator Mechanic",
  ];

  const toggleFilter = (option) => {
    setSelectedFilters((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const removeFilter = (option) => {
    setSelectedFilters((prev) => prev.filter((item) => item !== option));
  };

  return (
    <div className="flex bg-[#E0E9E9] font-medium ">
      {/* Main Content */}
      <main className="flex-1 p-3  gap-2">
        <div className="flex justify-between items-center mb-4 shadow-xl bg-white h-16 border  rounded-xl p-2">
          <h1 className="text-xl font-semibold ml-2">Big Product List</h1>
          <div className="flex border-[#16b1a2] border-2  rounded-full w-72 ">
            <img className="  p-1 " src="Search.png" alt="" />

            <input
              type="text"
              placeholder=" Search by Product Name..."

              className="outline-none  border placeholder:text-black   "

              className="  placeholder:text-black"

            />
          </div>
          <button onClick={handleAdd} className="bg-[#007E74] text-white px-4 rounded-lg h-10 mr-2 ">
            + Add New Product
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white  shadow-xl flex flex-wrap gap-2 mb-4 items-center relative rounded-lg p-2 ">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="border px-2 py-1 rounded bg-[#E0E9E9]"
          >
            <Filter className="w-4 h-4 text-gray-600" />
          </button>

          {/* Active Filters */}
          {selectedFilters.map((filter) => (
            <span
              key={filter}
              className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {filter}
              <X
                className="w-4 h-4 ml-2 cursor-pointer"
                onClick={() => removeFilter(filter)}
              />
            </span>
          ))}

          {/* Dropdown Filter Menu */}
          {filterOpen && (
            <div className="absolute top-12 left-2 bg-white border rounded shadow-md p-4 w-64 z-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-sm">Expertise</h4>
                <X
                  className="w-4 h-4 cursor-pointer text-gray-600"
                  onClick={() => setFilterOpen(false)}
                />
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {expertiseOptions.map((option) => (
                  <li key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(option)}
                      onChange={() => toggleFilter(option)}
                    />
                    <label>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reset Filter Button */}
          <button
            onClick={() => setSelectedFilters([])}
            className="ml-auto  px-5 py-1 rounded text-sm border-1 border-[#007E74] bg-[#D9F1EB] text-[#007E74]"
          >
            Reset Filter
          </button>

          {/* Table */}
          <div className="border border-black rounded-lg  p-2 w-full">
            <table className="w-full text-left border rounded-lg shadow-lg">
              <thead className=" bg-[#E0E9E9]">
                <tr>
                  <th className="p-2">Sr.No.</th>
                  <th className="p-2">Product Image</th>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Product Category</th>
                  <th className="p-2">Product Price</th>
                  <th className="p-2">Approval Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="border-t">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      <img
                        src="PVC.png"
                        alt="product"
                        className="w-12 h-12 rounded border-1 border-[#007E74]"
                      />
                    </td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{product.price}</td>
                    <td
                      className={`p-2 font-semibold ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </td>
                    <td className="p-2 flex gap-2 text-gray-700">
                      <Eye
                        onClick={handleView}
                        className="w-4 h-4 cursor-pointer text-red-600"
                      />
                      <Pencil
                        onClick={handleEdit}
                        className="w-4 h-4 cursor-pointer text-red-600"
                      />
                      <Trash2 className="w-4 h-4 cursor-pointer text-red-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full p-2 text-sm font-semibold text-black  ">
            Showing 1 to 5 of 5 Entries
            <div className=" absolute bottom-2 right-2 flex items-center gap-2  rounded-xl  ">
              <button className="px-1 py-1 text-teal-700 hover:bg-purple-100 rounded">
                &lt;
              </button>

              <button className="px-2  rounded bg-teal-700 text-white">
                1
              </button>

              <button className="px-2 rounded bg-teal-100 text-teal-700">
                2
              </button>

              <button className="px-2 rounded bg-teal-100 text-teal-700">
                3
              </button>

              <button className="px-2 py-1 text-teal-700 hover:bg-purple-100 rounded">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BigProduct;
