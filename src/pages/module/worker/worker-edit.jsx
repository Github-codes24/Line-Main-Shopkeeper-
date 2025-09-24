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
                url: `${conf.apiBaseUrl}shopkeeper/worker/update-worker/${id}`,
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
        <div className="p-2">
            <ToastContainer />
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-md shadow-md">
                <button onClick={handleCancel} className="text-teal-700">
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">Edit Worker Details</h2>
            </div>

            {/* Form Container */}
            <div className="border-2 shadow-md rounded-md p-6 bg-white">
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

                <hr className="my-6 border-gray-300" />

                <div className="flex justify-center gap-6">
                    <button
                        onClick={handleCancel}
                        className="px-8 py-1 border border-teal-700 text-teal-700 rounded hover:bg-teal-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-1 bg-teal-700 text-white rounded hover:bg-teal-800 transition disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
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
