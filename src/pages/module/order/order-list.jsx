import React, { useState } from 'react';
import { TbSearch } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineEye } from 'react-icons/hi';
import { TbFilter } from "react-icons/tb";
import FilterPanel from './FilterPanel';

const allOrders = [
  { id: 1, orderNo: 'ORDB8468163287164', customer: 'Theresa Webb', service: 'Plumber', status: 'Pending' },
  { id: 2, orderNo: 'ORDB8468163287164', customer: 'Jane Cooper', service: 'AC Repair', status: 'Work in Progress' },
  { id: 3, orderNo: 'ORDB8468163287164', customer: 'Jacob Jones', service: 'Electrician', status: 'Work in Progress' },
  { id: 4, orderNo: 'ORDB8468163287164', customer: 'Brooklyn Simmons', service: 'Painter', status: 'Completed' },
  { id: 5, orderNo: 'ORDB8468163287164', customer: 'Jerome Bell', service: 'Carpenter', status: 'Rejected' },
  { id: 6, orderNo: 'ORDB8468163287164', customer: 'Annette Black', service: 'Plumber', status: 'Pending' },
  { id: 7, orderNo: 'ORDB8468163287164', customer: 'Albert Flores', service: 'Electrician', status: 'Completed' },
  { id: 8, orderNo: 'ORDB8468163287164', customer: 'Savannah Nguyen', service: 'Painter', status: 'Rejected' },
  { id: 9, orderNo: 'ORDB8468163287164', customer: 'Dianne Russell', service: 'Carpenter', status: 'Pending' },
  { id: 10, orderNo: 'ORDB8468163287164', customer: 'Cody Fisher', service: 'Electrician', status: 'Work in Progress' },
];

const statusColor = {
  Pending: 'text-[#FFCC00]',
  'Work in Progress': 'text-[#0088FF]',
  Completed: 'text-[#34C759]',
  Rejected: 'text-[#EC2D01]',
};

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const [showFilter, setShowFilter] = useState(false);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-3 bg-gray-100 min-h-screen">
      <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center gap-20 mb-3">
        <h1 className="text-2xl font-medium text-black">Order List</h1>
        <div className="flex-1 sm:flex sm:justify-start">
          <div className="relative w-full sm:w-[320px]">
            <input
              type="text"
              placeholder="Search by order number"
              className="w-full border-1 border-[#007E74] bg-[#F5FFFF] text-[#0D2E28] px-10 py-2 rounded-full placeholder-[#0D2E28] placeholder:font-medium focus:outline-none"
            />
            <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-[#0D2E28]" size={18} />
          </div>
        </div>
      </div>

      <div className='relative bg-white p-3 rounded-lg shadow-sm'>
        <div className="flex flex-wrap gap-2 mb-3 text-medium">
          <button
            onClick={() => setShowFilter((prev) => !prev)} // <-- Toggle visibility
            className="text-gray-600 hover:text-black focus:outline-none"
          >
            <TbFilter className="w-8 h-8 px-1 py-1 border-[#007E74] text-[#0D2E28] bg-[#E0E9E9] rounded-lg" />
          </button>

          {['Electrician', 'Plumber', 'Painter'].map(tag => (
            <span key={tag} className="bg-[#E0E9E9] px-3 py-1 text-center rounded-full text-sm text-[#0D2E28] flex flex-row items-center gap-2">{tag} <RxCross2 /></span>
          ))}
          <button className="ml-auto px-10 py-1 bg-[#D9F1EB] border-2 border-[#007E74] text-[#007E74] rounded">Reset Filter</button>
        </div>
        {showFilter && (
          <>
            {/* Background overlay */}
            <div onClick={() => setShowFilter(false)}></div>
            {/* Floating filter panel */}
            <div className="absolute top-11 -left-2 z-50 h-full w-70 overflow-y-auto p-4">
              <FilterPanel />
            </div>
          </>
        )}

        <div className='bg-white rounded-lg border-2 border-[#E0E9E9] flex-1'>
          <div className="overflow-x-auto mb-[200px]">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-[#E0E9E9] text-[#333333]">
                <tr className="text-center">
                  <th className="py-2 px-4">Sr. No.</th>
                  <th className="py-2 px-4">Order No.</th>
                  <th className="py-2 px-4">Customer Name</th>
                  <th className="py-2 px-4">Service required</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {currentOrders.map((order, index) => (
                  <tr key={order.id} className="text-[#333333] text-center">
                    <td className="py-3 px-4">{indexOfFirstOrder + index + 1}.</td>
                    <td className="py-2 px-4">{order.orderNo}</td>
                    <td className="py-2 px-4">{order.customer}</td>
                    <td className="py-2 px-4">{order.service}</td>
                    <td className={`py-2 px-4 ${statusColor[order.status]}`}>{order.status}</td>
                    <td className="py-2 px-4"><HiOutlineEye className="text-[#007E74] text-lg cursor-pointer" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 px-4 py-1 flex bg-[#F5F5F5] justify-between items-center rounded-lg">
          <span className="text-sm text-[#0D2E28] font-semibold">
            Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, allOrders.length)} of {allOrders.length} Entries
          </span>
          <div className="flex items-center gap-2 p-1">
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              className="px-1.5 py-0.5 rounded-md bg-white text-sm text-[#007E74] font-extrabold"
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-1.5 py-0.5 rounded-md text-sm font-medium transition ${isActive
                    ? "bg-[#007E74] text-white"
                    : "bg-[#D9F1EB] text-[#007E74]"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageClick(currentPage + 1)}
              className="px-1.5 py-0.5 rounded-md text-sm bg-white text-[#007E74] font-extrabold"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
