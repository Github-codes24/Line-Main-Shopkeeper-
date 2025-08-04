
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddWorker = ({ workers, setWorkers }) => {
  const navigate = useNavigate();

  const [workerData, setWorkerData] = useState({
    name: "",
    expertise: "",
    phone: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const newWorker = {
      ...workerData,
      id: Date.now(), // simple unique ID
    };

    setWorkers([...workers, newWorker]);
    navigate("/");
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen font-[Poppins] py-8 px-4">
      <div className="w-[1108px]">
        {/* === Top Header Section === */}
        <div className="bg-white w-full h-[72px] rounded-[20px] flex items-center shadow px-6 mb-10">
          <div
            onClick={() => navigate(-1)}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer mr-4"
          >
            <ArrowLeft size={18} />
          </div>
          <h2 className="text-xl font-bold">Add Worker</h2>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-[20px] shadow p-6 w-[1108px]">
          <div className="mb-4 h-[30px] text-left ml-16">
            <h3 className="text-lg font-semibold">Personal Details</h3>
          </div>

          <form className="bg-gray-50 p-6 rounded w-[642px] h-auto space-y-4">
            {/* Name */}
            <div className="relative h-[40px] mb-4 ml-12">
              <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">Name</label>
              <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
              <input
                type="text"
                name="name"
                value={workerData.name}
                onChange={handleChange}
                className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699] rounded px-4 bg-[#E0E9E9] text-sm"
              />
            </div>

            {/* Expertise */}
            <div className="relative h-[40px] mb-4 ml-12">
              <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">
                Expertise
              </label>
              <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
              <select
                name="expertise"
                value={workerData.expertise}
                onChange={handleChange}
                className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699] rounded px-4 bg-[#E0E9E9] text-sm"
              >
                <option value="">Select Expertise</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Painter">Painter</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Carpenter">Carpenter</option>
              </select>
            </div>

            {/* Phone */}
            <div className="relative h-[40px] mb-4 ml-12">
              <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">Phone</label>
              <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
              <input
                type="text"
                name="phone"
                value={workerData.phone}
                onChange={handleChange}
                className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699] rounded px-4 bg-[#E0E9E9] text-sm"
              />
            </div>

            {/* Address */}
            <div className="relative h-[40px] mb-4 ml-12">
              <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">Address</label>
              <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
              <input
                type="text"
                name="address"
                value={workerData.address}
                onChange={handleChange}
                className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699] rounded px-4 bg-[#E0E9E9] text-sm"
              />
            </div>

            {/* Email */}
            <div className="relative h-[40px] mb-4 ml-12">
              <label className="absolute left-0 top-[8px] w-[227px] text-sm font-semibold text-left">Email ID</label>
              <span className="absolute left-[227px] top-[8px] font-semibold">:</span>
              <input
                type="email"
                name="email"
                value={workerData.email}
                onChange={handleChange}
                className="absolute left-[349px] w-[349px] h-[40px] border border-[#19A699] rounded px-4 bg-[#E0E9E9] text-sm"
              />
            </div>

            {/* Divider */}
            <div className="w-[642px] h-[1px] bg-black mt-6"></div>
          </form>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center">
          <div className="flex justify-center gap-4 mt-10">
            <button
              className="w-[200px] h-[40px] bg-[#D9F1EB] text-[#007E74] font-semibold rounded"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="w-[200px] h-[40px] bg-[#007E74] text-white font-semibold rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorker;
