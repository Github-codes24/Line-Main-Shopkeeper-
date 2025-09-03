// AddBigProduct.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BigProductAdd = () => {
  const navigate = useNavigate()

   const handleBack = () => {
  navigate('/big-product');
};

  return (
    <div className="flex flex-col bg-[#E0E9E9] font-medium text-[#0D2E28]  ">
      <div className=" flex bg-white m-2 border rounded-lg shadow-lg p-2">
        <img onClick={handleBack} className="w-8 h-8 mt-2" src="back Button.png" alt="" />
        <h2 className="text-xl font-semibold  text-[#0D2E28] p-2 rounded-lg" >Add New Big Product</h2>
      </div>
      
      
      <div className="flex flex-col border  rounded-md p-6 space-y-5 shadow-lg m-2 bg-white ">
        <div className="  border border-black p-2 rounded-lg">
        {/* Upload Image Section */}
        
        <div className="flex items-start">
          <p className="w-1/3 ">Product Image</p>
          <div  className="w-full  " >
            <img src="img2.png" alt="" />
          </div>
          
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div  className="flex items-center pt-3">
            <label className="w-1/3 block  mb-1">Product Name:</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="w-full border-1 border-[#007E74] rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block  mb-1">Product Category:</label>
            <select className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]">
              <option>Select Product Category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Groceries</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block  mb-1">Product Price:</label>
            <input
              type="text"
              placeholder="Enter Price"
              className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block  mb-1">Product Description:</label>
            <textarea
              rows="3"
              placeholder="Enter Product Description"
              className="w-full border-1 border-[#007E74] rounded px-3 py-2 focus:outline-none focus:border-teal-500 placeholder:text-[#0D2E28]"
            />
          </div>
        </div>

        {/* Buttons */}
        
        </div>
        <div className="flex justify-center space-x-3 pt-2">
          <button onClick={handleBack} className="bg-teal-100 border-1 border-[#007E74] text-[#007E74] px-5 py-2 rounded hover:bg-teal-200">Cancel</button>
          <button className="bg-[#007E74] text-white px-5 py-2 rounded hover:bg-teal-800">Add Product</button>
        </div>
      </div>
    </div>
  );
};

export default BigProductAdd;
