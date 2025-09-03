import React, { useState } from "react";
import { Eye, Edit, Trash2, Filter, X } from "lucide-react";
import SearchBar from "../../../components/layout/Searchbar";
import { useNavigate } from "react-router-dom";
import Delete from "../../../components/layout/Delete";

const Worker = () => {
  // Dummy Data
  const dummyData = [
    {
      id: 1,
      name: "Theresa Webb",
      expertise: "Plumber",
      phone: "+91-9876543210",
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    },
    {
      id: 2,
      name: "Jane Cooper",
      expertise: "Tap Cleaner",
      phone: "+91-9876543210",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    },
    {
      id: 3,
      name: "Jacob Jones",
      expertise: "Plumber",
      phone: "+91-9876543210",
      address: "8502 Preston Rd. Inglewood, Maine 98380",
    },
    {
      id: 4,
      name: "Brooklyn Simmons",
      expertise: "Tap Cleaner",
      phone: "+91-9876543210",
      address: "4140 Parker Rd. Allentown, New Mexico 31134",
    },
    {
      id: 5,
      name: "Jerome Bell",
      expertise: "Plumber",
      phone: "+91-9876543210",
      address: "2118 Thornridge Cir. Syracuse, 35624",
    },
  ];

  const expertiseOptions = [
    "Electrician",
    "Plumber",
    "Tap Cleaner",
    "Painter",
    "AC & Refrigerator Mechanic",
  ];

  // State
  const navigate = useNavigate();
  const [workers, setWorkers] = useState(dummyData);
  const [selectedFilters, setSelectedFilters] = useState(["Plumber", "Tap Cleaner"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Handlers
  const handleFilterChange = (expertise) => {
    setSelectedFilters((prev) =>
      prev.includes(expertise)
        ? prev.filter((item) => item !== expertise)
        : [...prev, expertise]
    );
  };

  const handleResetFilters = () => {
    setSelectedFilters([]);
  };

  const handleView = (worker) => {
    navigate(`/worker/worker-view/${worker.id}`, { state: worker });
  };

  const handleEdit = (worker) => {
    navigate(`/worker/worker-edit/${worker.id}`, { state: worker });
  };

  const handleDelete = (id) => {
    console.log("Deleting worker with ID:", id);
    setWorkers((prev) => prev.filter((worker) => worker.id !== id));
  };

  // Derived Data
  const filteredWorkers = workers.filter((w) => {
    const matchesFilter =
      selectedFilters.length === 0 || selectedFilters.includes(w.expertise);

    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.phone.toLowerCase().includes(search.toLowerCase()) ||
      w.address.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 rounded-2xl shadow gap-3">

      {/* Search Bar */}
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* Filter Section */}
      <div className="flex items-center gap-3 mb-4 flex-wrap relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"
        >
          <Filter size={18} />
        </button>

        {/* Active Filters */}
        {selectedFilters.map((filter) => (
          <span
            key={filter}
            className="flex items-center gap-4 px-3 py-1 bg-[#e0e9e9] text-black rounded-full"
          >
            {filter}
            <X
              size={14}
              className="cursor-pointer"
              onClick={() => handleFilterChange(filter)}
            />
          </span>
        ))}

        {/* Reset Filter Button */}
        {selectedFilters.length > 0 && (
          <button
            onClick={handleResetFilters}
            className="ml-auto px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Reset Filter
          </button>
        )}

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div className="absolute top-12 left-0 bg-white border rounded-lg shadow-lg p-4 z-10">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700">Expertise</h4>
              <X
                size={18}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setIsFilterOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-2">
              {expertiseOptions.map((exp) => (
                <label key={exp} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(exp)}
                    onChange={() => handleFilterChange(exp)}
                  />
                  {exp}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Worker Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="bg-[#e0e9e9]">
              <th className="px-4 py-2 text-left">Sr. No.</th>
              <th className="px-4 py-2 text-left">Worker Name</th>
              <th className="px-4 py-2 text-left">Expertise</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.map((worker, index) => (
              <tr
                key={worker.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{worker.name}</td>
                <td className="px-4 py-2">{worker.expertise}</td>
                <td className="px-4 py-2">{worker.phone}</td>
                <td className="px-4 py-2">{worker.address}</td>
                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleView(worker)}
                    className="text-teal-600 hover:text-teal-800"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => handleEdit(worker)}
                    className="text-teal-500 hover:text-teal-700"
                  >
                    <Edit size={18} />
                  </button>

                  <Delete
                    onDelete={() => handleDelete(worker.id)}
                    trigger={
                      <button className="text-teal-500 hover:text-teal-700">
                        <Trash2 size={18} />
                      </button>
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-black bg-[#e0e9e9]">
        <p className="px-4 py-2">
          Showing 1 to {filteredWorkers.length} of {workers.length} Entries
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            &lt;
          </button>
          <button className="px-3 py-1 border rounded-lg bg-teal-500 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            3
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
export default Worker;
