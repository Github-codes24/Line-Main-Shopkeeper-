
import React, { useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';



const allExpertise = ["Electrician", "Plumber", "Painter","AC Repair","Carpenter"];

const WorkerList = ({ workers, setWorkers }) => {

const navigate = useNavigate();


  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState([
    "Electrician",
    "Plumber",
    "Painter",
    "Carpenter",
    "AC Repair",
  ]);

 
const toggleFilter = (filter) => {
  if (activeFilters.includes(filter)) {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  } else {
    setActiveFilters([...activeFilters, filter]);
  }
};

  const handleDelete = (id) => {
    setWorkers((prev) => prev.filter((worker) => worker.id !== id));
  };

  const handleResetFilter = () => {
    setActiveFilters([]);
  };

  const filteredWorkers = workers.filter((worker) => {
    const matchesFilter =
      activeFilters.length === 0 || activeFilters.includes(worker.expertise);
    const matchesSearch =
      worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.phone.includes(search) ||
      worker.expertise.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    
    <div className="mx-auto mt-10 p-4 bg-white shadow-lg rounded-xl w-[1122px]">
      <div
        className="flex justify-between items-center w-[1076px] h-[72px] rounded-[8px] px-4 py-4 mb-3 ml-4 "
        style={{ border: "1px solid #E5E7EB" }}
      >
        <h2 className="text-xl font-bold  style={{ width: '140px', height: '40px' }}">
          Worker List
        </h2>
        <div className="relative w-[464px] h-[40px]">
          <img
            src="/Vector.jpg"
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 "
          />
          <input
            type="text"
            placeholder="Search by Worker Name or Phone No. or Email Id..."
            className=" w-[464px] h-[40px] pl-14 border border-gray-400 px-4 py-2 rounded-full text-sm focus:outline-none font-medium text-black placeholder-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="w-[200px] h-[40px]   bg-[#007E74] text-white px-4 py-2 rounded" onClick={() => navigate("/add-worker")}>
          {" "}  Add Worker</button>
      </div>



<div className="flex flex-col gap-2 mb-4 w-[1076px]">
  <div className="flex items-center flex-wrap gap-2">

    <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[10px] bg-[#D9F1EB]">
      <FunnelIcon className="w-5 h-5 text-[#007E74]" />
    </div>

    {allExpertise.map((expertise) => (
      <button
        key={expertise}
        onClick={() => toggleFilter(expertise)}
        className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border transition-all duration-150 ${
          activeFilters.includes(expertise)
            ? "bg-[#E0E9E9] text-green-700 border-green-400"
            : "bg-[#E0E9E9] text-gray-700 border-gray-300"
        }`}
      >
        <span>{expertise}</span>
        {activeFilters.includes(expertise) && (
          <XMarkIcon className="w-4 h-4 text-green-700 hover:text-red-500" />
        )}
      </button>
    ))}

  
    {activeFilters.length > 0 && (
      <button
        onClick={handleResetFilter}
        className="w-[200px] h-[40px] ml-auto text-sm bg-[#D9F1EB] text-[#007E74] hover:underline flex items-center justify-center px-2 rounded-md"
      >
        Reset Filter
      </button>
    )}
  </div>
</div>


      <div
        style={{ width: "1076px", height: "694px", overflowY: "auto" }}
        className="rounded border border-black"
      >
        <table className="min-w-full table-fixed   border-collapse ">
          <thead className="bg-gray-100 sticky top-0 z-10 bg-[#E0E9E9]">
            <tr>
              <th className="p-3 text-left">Sr.No.</th>
              <th className="p-3 text-left">Worker Name</th>
              <th className="p-3 text-left">Expertise</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left pl-36">Address</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No workers found
                </td>
              </tr>
            ) : (
              filteredWorkers.map((worker, index) => (
                <tr key={worker.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{worker.name}</td>
                  <td className="p-3">{worker.expertise}</td>
                  <td className="p-3">{worker.phone}</td>
                  <td className="p-3">{worker.address}</td>
                 <td className="p-3">
  <div className="flex items-center space-x-2">
    <Link to={`/view/${worker.id}`}>
      <button className="text-[#007E74] hover:text-green-700 p-1 rounded-full">
        <Eye size={18} />
      </button>
    </Link>
    <button  onClick={() => navigate(`/edit-worker/${worker.id}`)}
    className="text-[#007E74] hover:text-green-700 p-1 rounded-full">
      <Pencil size={18} />
    </button>
    <button
      onClick={() => handleDelete(worker.id)}
      className="text-[#007E74] hover:text-red-700 p-1 rounded-full"
    >
      <Trash size={18} />
    </button>
  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        className="flex justify-between items-center mt-4"
        style={{ width: "1064px", height: "40px" }}
      >
        <span className="text-sm text-gray-600">
          Showing {filteredWorkers.length} of {workers.length} Entries
        </span>
        <div className="flex space-x-2">
          <button className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">
            {"<"}
          </button>
          <button className="px-3 py-1 bg-[#007E74] text-white rounded">
            1
          </button>
          <button className="px-3 py-1 rounded bg-[#D9F1EB] hover:bg-[#007E74]">
            2
          </button>
          <button className="px-3 py-1 rounded bg-[#D9F1EB] hover:bg-[#007E74]">
            3
          </button>
          <button className="px-2 py-1 rounded bg-[#D9F1EB] hover:bg-[#007E74]">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerList;



