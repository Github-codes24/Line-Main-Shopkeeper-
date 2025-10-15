import React, {useState, useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hook/useFetch"; // Your custom fetch hook
import conf from "../../../config";

const WorkerEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const [fetchData] = useFetch();

    const existingWorker = state;
    const [formData, setFormData] = useState(existingWorker || {});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!existingWorker) {
            toast.error("Worker data not found.");
        }
    }, [existingWorker]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const result = await fetchData({
                method: "PATCH",
                url: `${conf.apiBaseUrl}/shopkeeper/worker/update-worker/${id}`,
                data: {
                    name: formData.name,
                    experties: formData.expertise, // send as 'experties'
                    contact: formData.phone, // send as 'contact'
                    address: formData.address,
                },
            });

            if (result.success) {
                toast.success(result.message || "Worker updated successfully");
                setTimeout(() => {
                    navigate("/worker");
                }, 1500);
            } else {
                toast.error(result.message || "Failed to update worker");
            }
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Something went wrong while updating.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (!existingWorker) {
        return <h2 className="p-6 text-red-500">Worker not found!</h2>;
    }

    return (
        <div className="flex flex-col min-h-screen p-3 bg-gray-200">
            <ToastContainer />
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-md shadow-md">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="text-xl text-black ">
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M26.6663 20H13.333"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <h1 className="ml-4 text-xl font-medium">Edit Worker Details</h1>
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 border-2 shadow-md rounded-md p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-700 mb-6">Personal Details</h3>

                <div className="space-y-5">
                    <DetailInput label="Name" name="name" value={formData.name || ""} onChange={handleChange} />
                    <DetailInput
                        label="Expertise"
                        name="expertise"
                        value={formData.expertise || ""}
                        onChange={handleChange}
                    />
                    <DetailInput
                        label="Phone Number"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                    />
                    <DetailInput
                        label="Address"
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                    />
                    <DetailInput label="Email Id" name="email" value={formData.email || ""} onChange={handleChange} />
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-center gap-6 mt-6">
                <button
                    onClick={handleCancel}
                    className="px-16 py-2 border border-teal-700 text-teal-700 rounded "
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-16 py-2 bg-teal-700 text-white rounded "
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

// Label + Editable Input
const DetailInput = ({label, name, value, onChange}) => (
    <div className="flex items-center">
        <label className="w-48 font-medium text-gray-700">{label} :</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="bg-teal-50 border border-teal-500 rounded px-3 py-1 w-full max-w-md"
        />
    </div>
);

export default WorkerEdit;
