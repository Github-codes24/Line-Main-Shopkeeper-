import React from "react";
import {useNavigate} from "react-router-dom";
import {PiStarLight} from "react-icons/pi"; // Import star icon

const TopWorker = ({workers = []}) => {
    const navigate = useNavigate(); // Add this line

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
        <div className="bg-white p-4 shadow-md rounded-lg border border-gray-800">
            <div className="flex justify-between items-center mb-2">
                <h3
                    className="font-semibold text-lg mb-4"
                    style={{
                        fontWeight: 500,
                        fontSize: "20px",
                        color: "rgba(51, 51, 51, 1)",
                    }}
                >
                    Top Worker
                </h3>

                <button className="text-sm font-medium text--200" onClick={() => navigate("/worker")}>
                    See All
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-800">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b bg-teal-600 text-white">
                                <th className="p-2 text-center font-medium">Sr.No.</th>
                                <th className="p-2 text-center font-medium">Worker Name</th>
                                <th className="p-2 text-center font-medium">Expertise</th>
                                <th className="p-2 text-center font-medium">Phone Number</th>
                                <th className="p-2 text-center font-medium">Orders Completed</th>
                                <th className="p-2 text-center font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workers.length > 0 ? (
                                workers.map((w, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="p-2 text-center font-normal">{i + 1}</td>
                                        <td className="p-2 text-center font-normal">{w.workerName}</td>
                                        <td className="p-2 text-center font-normal">{w.expertise}</td>
                                        <td className="p-2 text-center font-normal">{w.phone}</td>
                                        <td className="p-2 text-center font-normal">{w.ordersCompleted}</td>
                                        <td className="p-2 text-center font-normal">{renderStars(w.rating)}</td>
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
                            <p className="text-sm text-gray-600">Orders Completed: {w.ordersCompleted}</p>
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
