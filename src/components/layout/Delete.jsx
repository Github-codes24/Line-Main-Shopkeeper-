// DeleteWorker.js
import React, { useState } from "react";

const Delete= ({ onDelete, trigger }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = () => {
    onDelete(); // perform actual delete
    setShowPopup(false); // close popup
  };

  return (
    <>
      <span onClick={() => setShowPopup(true)} className="cursor-pointer">
        {trigger}
      </span>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this worker?
            </h3>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-[#19a699] text-white rounded hover:bg-[#007e74]"
              >
                Confirm  
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Delete;
