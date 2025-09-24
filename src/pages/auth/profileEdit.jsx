import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../hook/useAuth";

const AdminEditProfile = () => {
    const navigate = useNavigate();
    const {loading, fetchProfile, profile, updateProfile} = useAuth();
    const {id} = useParams();

    useEffect(() => {
        fetchProfile();
    }, []);

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: profile?.ownerName || "",
            phone: profile?.contact || "",
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            updateProfile({ownerName: values.fullName});
            setSubmitting(false);
        },
    });

    return (
        <div className="flex flex-col min-h-screen bg-[#E0E9E9] p-3">
            {/* Header */}
            <div className="bg-white rounded-lg p-2 mb-2 shadow-md flex items-center space-x-2">
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => navigate(-1)}
                    className="cursor-pointer"
                >
                    <path
                        d="M20 36.667C29.204 36.667 36.667 29.205 36.667 20C36.667 10.796 29.204 3.334 20 3.334C10.796 3.334 3.334 10.796 3.334 20C3.334 29.205 10.796 36.667 20 36.667Z"
                        stroke="#0D2E28"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20 13.334L13.334 20L20 26.667"
                        stroke="#0D2E28"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M26.667 20H13.334"
                        stroke="#0D2E28"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <h2 className="text-xl md:text-2xl font-semibold ml-2">Edit Profile</h2>
            </div>

            {/* Form */}
            <div className="flex-grow bg-white rounded-md shadow-md p-6">
                {loading ? (
                    <div className="text-center min-h-[400px] flex items-center justify-center">
                        <span className="text-gray-500">Loading...</span>
                    </div>
                ) : (
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div className="flex items-center">
                            <label className="w-1/3 font-medium">Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-2/3 border border-[#007E74] rounded-lg px-3 py-2 bg-[#F5FFFF] focus:outline-none"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex items-center">
                            <label className="w-1/3 font-medium">Contact:</label>
                            <input
                                type="text"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-2/3 border border-[#007E74] rounded-lg px-3 py-2 bg-[#F5FFFF] focus:outline-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => formik.resetForm() || navigate(-1)}
                                className="border border-[#007E74] text-[#0f9e9e] px-10 py-2 rounded-md hover:bg-[#e0f7f7] bg-[#D9F1EB]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#007E74] text-white px-6 py-2 rounded-md hover:bg-[#0c7d7d]"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminEditProfile;
