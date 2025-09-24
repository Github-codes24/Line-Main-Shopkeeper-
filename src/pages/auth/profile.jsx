import React, {useEffect} from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hook/useAuth";

const AdminProfile = () => {
    const navigate = useNavigate();
    const {loading, fetchProfile, profile} = useAuth();

    useEffect(() => {
        fetchProfile();
    }, []);

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Required"),
        contact: Yup.string().required("Required"),
    });

    const handleBack = () => navigate(-1);

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
                    onClick={handleBack}
                    className="cursor-pointer"
                >
                    <path
                        d="M20.0007 36.6663C29.2054 36.6663 36.6673 29.2044 36.6673 20.0007C36.6673 10.7959 29.2054 3.33398 20.0007 3.33398C10.7959 3.33398 3.33398 10.7959 3.33398 20.0007C3.33398 29.2054 10.7959 36.6663 20.0007 36.6663Z"
                        stroke="#0D2E28"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20.0007 13.334L13.334 20.0007L20.0007 26.6673"
                        stroke="#0D2E28"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M26.6673 20H13.334"
                        stroke="#0D2E28"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <h2 className="text-xl md:text-2xl font-semibold">Admin Profile</h2>
            </div>

            {/* Profile Box */}
            <div className="flex flex-col bg-white rounded-md  shadow-md p-6 space-y-5 min-h-screen">
                {loading ? (
                    <div className="text-center min-h-[200px] flex items-center justify-center">
                        <span className="text-gray-500">Loading...</span>
                    </div>
                ) : (
                    <Formik
                        initialValues={{fullName: "", contact: ""}}
                        validationSchema={validationSchema}
                        onSubmit={(values) => console.log(values)}
                    >
                        {() => (
                            <Form className="space-y-4">
                                {/* Full Name */}
                                <div className="flex items-center">
                                    <label className="w-1/3 font-medium">Full Name:</label>
                                    <input
                                        type="text"
                                        value={profile?.ownerName || ""}
                                        readOnly
                                        className="w-full border border-[#007E74] rounded-lg px-3 py-2 bg-[#E0E9E9] outline-none"
                                    />
                                </div>

                                {/* Contact */}
                                <div className="flex items-center">
                                    <label className="w-1/3 font-medium">Contact:</label>
                                    <input
                                        type="text"
                                        value={profile?.contact || ""}
                                        readOnly
                                        className="w-full border border-[#007E74] rounded-lg px-3 py-2 bg-[#E0E9E9] outline-none"
                                    />
                                </div>

                                {/* Button */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/editprofile/${profile?.id}`)}
                                        className="bg-[#007E74] text-white px-6 py-2 rounded-lg hover:bg-teal-700"
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
