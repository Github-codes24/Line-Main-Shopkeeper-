import React from "react";

const LogoutModal = ({onClose, onConfirm}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-10 text-center">
                <h2 className="text-lg font-bold text-gray-800 mb-2">Confirm Logout</h2>
                <p className="text-lg text-gray-500 mb-6">You’ll need to login again to access</p>

                <div className="flex justify-between gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-1 rounded-md border border-teal-500 text-teal-700 hover:bg-teal-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-1 rounded-md bg-teal-700 text-white hover:bg-teal-800 transition"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
