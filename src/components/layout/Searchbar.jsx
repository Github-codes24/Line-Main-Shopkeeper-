import { Search } from "lucide-react"; // for the search icon

export default function ProductListHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 bg-white p-3 rounded-lg shadow">
      {/* Title */}
      <h4 className="font-semibold text-lg sm:text-base">Product List</h4>

      {/* Search bar */}
      <div className="flex items-center border border-teal-600 rounded-full px-3 py-1 w-full sm:w-[300px]">
        <Search className="text-teal-600 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search by Product Name..."
          className="flex-1 outline-none bg-transparent text-sm placeholder-gray-500"
        />
      </div>

      {/* Button */}
      <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 w-full sm:w-auto">
        Go Offline
      </button>
    </div>
  );
}
