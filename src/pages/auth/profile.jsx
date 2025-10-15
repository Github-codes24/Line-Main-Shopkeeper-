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
        <div className="flex flex-col bg-[#E0E9E9] w-full p-4 ">
            {/* Header Box */}
            <div className="bg-white rounded-lg p-4 mb-4 shadow-md flex items-center space-x-2">
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
                        d="M20.0007 36.6663C29.2054 36.6663 36.6673 29.2044 36.6673 19.9997C36.6673 10.7949 29.2054 3.33301 20.0007 3.33301C10.7959 3.33301 3.33398 10.7949 3.33398 19.9997C3.33398 29.2044 10.7959 36.6663 20.0007 36.6663Z"
                        stroke="#0D2E28"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20.0007 13.333L13.334 19.9997L20.0007 26.6663"
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

                <h2 className="text-xl md:text-2xl font-semibold" style={{
                    fontWeight: 500,
                    fontSize: '20px',
                    color: 'rgba(51, 51, 51, 1)'
                }}>Admin Profile</h2>
            </div>

            {/* Profile Box */}
            <div className="flex-grow bg-white rounded-md shadow-md p-6 md:p-4">
                {loading ? (
                    <div className="text-center min-h-[400px] flex justify-center items-center">
                        <svg
                            className="animate-spin h-10 w-10 text-[#007E74]"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-100"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="60"
                                strokeDashoffset="20"
                            ></circle>
                        </svg>
                    </div>
                ) : (
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            fullName: profile?.ownerName || "",
                            contact: profile?.contact || "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => console.log(values)}
                    >
                        {() => (
                            <Form>
                                <div className="flex flex-col md:flex-row gap-6 border border-[#616666] rounded-md p-6 min-h-[480px]">
                                    {/* Left - Fields */}
                                    <div className="space-y-6 w-full md:w-2/3">
                                        {[
                                            { label: "Full Name", value: profile?.ownerName || "" },
                                            { label: "Contact", value: profile?.contact || "" },
                                        ].map((field, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                <label className="w-40 font-medium">
                                                    {field.label}:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={field.value}
                                                    readOnly
                                                    className="flex-1 border border-[#007E74] bg-[#E0E9E9] px-3 py-2 rounded-md outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right - Profile Image */}
                                    <div className="flex flex-col items-center justify-start w-full md:w-1/3 mt-6 md:mt-0">
                                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#007E74] overflow-hidden bg-gray-200 flex items-center justify-center">
                                            {profile?.profilePictureUrl ? (
                                                <img
                                                    src={profile.profilePictureUrl}
                                                    alt={profile?.ownerName || "Profile"}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <svg 
                                                className="w-20 h-20 text-gray-400"
                                                style={{ display: profile?.profilePictureUrl ? 'none' : 'block' }}
                                                fill="currentColor" 
                                                viewBox="0 0 20 20"
                                            >
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Section - Button */}
                                <div className="mt-8 flex justify-center">
                                    <div className="mt-2 flex justify-center">
                                        <button
                                            type="button"
                                            className="bg-[#007E74] text-white rounded-md w-[200px] h-[40px] hover:bg-teal-700 transition duration-200"
                                            onClick={() => navigate(`/editprofile/${profile?.id}`)}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
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