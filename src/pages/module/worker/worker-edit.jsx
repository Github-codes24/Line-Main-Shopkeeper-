import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Dummy data (replace with API later)
const workers = [
  {
    id: 1,
    name: "Theresa Webb",
    expertise: "Plumber",
    phone: "+91-9876543210",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    email: "theresa.webb@example.com",
  },
  {
    id: 2,
    name: "Jane Cooper",
    expertise: "Tap Cleaner",
    phone: "+91-9876543210",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    email: "jane.cooper@example.com",
  },
];

const WorkerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const existingWorker = state || workers.find((w) => w.id.toString() === id);
  const [formData, setFormData] = useState(existingWorker || {});

  if (!existingWorker) {
    return <h2 className="p-6 text-red-500">Worker not found!</h2>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated Worker:", formData);
    navigate(`/worker`, { state: formData });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={handleCancel} className="text-teal-700">
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          Edit Worker Details
        </h2>
      </div>

      {/* Edit Form Container */}
      <div className="border-2 border-black-300 rounded-md p-6 bg-white max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          Personal Details
        </h3>

        <div className="space-y-5">
          <DetailInput label="Name" name="name" value={formData.name} onChange={handleChange} />
          <DetailInput label="Expertise" name="expertise" value={formData.expertise} onChange={handleChange} />
          <DetailInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          <DetailInput label="Address" name="address" value={formData.address} onChange={handleChange} />
          <DetailInput label="Email Id" name="email" value={formData.email} onChange={handleChange} />
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={handleCancel}
            className="px-8 py-2 border border-teal-700 text-teal-700 rounded hover:bg-teal-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Label + Editable Input
const DetailInput = ({ label, name, value, onChange }) => (
  <div className="flex items-center">
    <label className="w-48 font-medium text-gray-700">{label} :</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="bg-teal-50 border border-teal-500 rounded px-3 py-1 w-full max-w-md"
    />
  </div>
);

export default WorkerEdit;
