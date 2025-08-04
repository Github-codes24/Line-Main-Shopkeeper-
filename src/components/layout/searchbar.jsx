import React from 'react';

const SearchBar = () => {
  return (
    <div className="bg-white p-2 m-2 rounded shadow mb-4">
      {/* Heading */}
      <h2 className="flex  gap-96 text-xl font-semibold  text-gray-800 mb-2">Product List <div className="flex items-center border bg-green-50 border-teal-500 rounded-full px-5 py-3 max-w-md">
        <svg
          className="w-5 h-5 text-teal-600 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011.25 4.5a7.5 7.5 0 005.4 12.15z" />
        </svg>
        <input
          type="text"
          placeholder="Search by Product Name..."
          className="outline-none w-full text-sm text-gray-700 placeholder-gray-500"
        />
      </div></h2>

      {/* Search Input */}
     
    </div>
  );
};

export default SearchBar;
