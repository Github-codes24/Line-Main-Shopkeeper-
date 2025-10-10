import React from "react";
import { PiStarLight } from "react-icons/pi"; // Import star icon

const TopWorker = ({ workers = [] }) => {
  // Function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <PiStarLight
          key={i}
          className={i <= rating ? "text-yellow-400 inline" : "text-gray-800 inline"}
          size={22}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Top Worker</h3>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-500">
          <table className="w-full  border-collapse">
            <thead>
              <tr className="border-b bg-teal-600 text-white">
                <th className="p-2 text-center">Sr.No.</th>
                <th className="p-2 text-center">Worker Name</th>
                <th className="p-2 text-center">Expertise</th>
                <th className="p-2 text-center">Phone Number</th>
                <th className="p-2 text-center">Orders Completed</th>
                <th className="p-2 text-center">Rating</th>
              </tr>
            </thead>
            <tbody>
              {workers.length > 0 ? (
                workers.map((w, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2 text-center">{i + 1}</td>
                    <td className="p-2 text-center">{w.workerName}</td>
                    <td className="p-2 text-center">{w.expertise}</td>
                    <td className="p-2 text-center">{w.phone}</td>
                    <td className="p-2 text-center">{w.ordersCompleted}</td>
                    <td className="p-2 text-center">{renderStars(w.rating)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No workers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="block sm:hidden space-y-3">
        {workers.length > 0 ? (
          workers.map((w, i) => (
            <div key={i} className="border rounded-lg p-3 shadow-sm bg-gray-50">
              <p className="font-semibold">{w.workerName}</p>
              <p className="text-sm text-gray-600">Expertise: {w.expertise}</p>
              <p className="text-sm text-gray-600">Phone: {w.phone}</p>
              <p className="text-sm text-gray-600">
                Orders Completed: {w.ordersCompleted}
              </p>
              <div className="text-sm text-gray-900 flex items-center gap-1">
                Rating: {renderStars(w.rating)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No workers found</p>
        )}
      </div>
    </div>
  );
};

export default TopWorker;
