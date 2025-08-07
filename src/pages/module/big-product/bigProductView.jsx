// AddBigProduct.jsx
import React from "react";
import { useNavigate } from 'react-router-dom';
const BigProductView = () => {
    const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // replace with your route
  };
  const handleEdit = () => {
    navigate('/bigProductEdit'); // replace with your route
  };
  

  return (
    <div className="flex flex-col bg-[#E0E9E9] font-medium  text-[#0D2E28] ">
      <div className="flex bg-white m-2 border rounded-lg shadow-lg p-2">
        <img onClick={handleBack} className="w-8 h-8 mt-2" src="back Button.png" alt="" />
        <h2  className="text-xl font-semibold  text-gray-800 p-2 rounded-lg" >View Big Product</h2>
      </div>
      
      
      <div className="flex flex-col border  rounded-md p-6 space-y-5 shadow-lg m-2 bg-white">
        <div className=" items-center border border-black p-2 rounded-lg">
        {/* Upload Image Section */}
        
        <div className="flex items-start">
          <p className="w-1/3 font-medium ">Product Image</p>
          <div  className="w-full" >
            <img src="Image (1).png" alt="" />
          </div>
          
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div  className="flex items-center pt-3">
            <p className="w-1/3 block mb-1">Product Name:</p>
            <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg p-2.5">
                PVC Wire Cable (Red Colour)
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block  mb-1">Product Category:</label>
            <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg p-2.5">
                Electrician
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block  mb-1">Product Price:</label>
            <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg p-2.5">
                ₹499
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 block  mb-1">Product Description:</label>
           <div className="w-full border-1 border-[#007E74]  bg-[#E0E9E9] rounded-lg px-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde debitis eum quibusdam ab similique officiis vel veniam quis fugit sint quasi laborum, ex numquam perferendis voluptatem. Pariatur possimus deserunt sed.
            </div>
          </div>
        </div>

        {/* Buttons */}
        
        </div>
        <div className="flex justify-center space-x-3 ">
          
          <button onClick={handleEdit} className="bg-teal-700 text-white px-12 py-1 rounded hover:bg-teal-800">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default BigProductView;
