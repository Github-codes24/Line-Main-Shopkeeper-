import React from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

// Dummy workers (replace with API data in production)
const workers = [
    {
        id: 1,
        name: "Niranjankumar Kalantri",
        expertise: "Electrician",
        phone: "+91-9876543210",
        address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        email: "Nirajkumar345@gmail.com",
    },
];

const WorkerView = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();

    const worker = state || workers.find((w) => w.id.toString() === id);

    if (!worker) {
        return (
            <div className="p-6">
                <h2 className="text-xl text-red-500">Worker not found!</h2>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-teal-600 text-white rounded">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-md shadow-md">
                <button onClick={() => navigate(-1)} className="text-teal-700">
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">View Worker Details</h2>
            </div>

            {/* Card */}
            <div className="bg-white border rounded-md p-6 shadow-md">
                {/* Section Title */}
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Details</h3>

                {/* Detail rows */}
                <div className="space-y-4">
                    <DetailRow label="Name" value={worker.name} />
                    <DetailRow label="Expertise" value={worker.expertise} />
                    <DetailRow label="Phone Number" value={worker.phone} />
                    <DetailRow label="Address" value={worker.address} />
                    <DetailRow label="Email Id" value={worker.email} />
                </div>

                {/* Divider */}
                <hr className="my-6 border-gray-300" />

                {/* Edit Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate(`/worker/worker-edit/${id}`, {state: worker})}
                        className="px-8 py-2 bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

// Component for showing label and input
const DetailRow = ({label, value}) => (
    <div className="flex items-center">
        <label className="w-48 font-medium text-gray-700">{label} :</label>
        <input
            type="text"
            value={value}
            disabled
            className="bg-teal-50 border border-teal-500 rounded px-3 py-1 w-full max-w-md"
        />
    </div>
);

export default WorkerView;
