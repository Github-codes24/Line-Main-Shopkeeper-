import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate, useParams} from "react-router-dom";
import {FiUpload} from "react-icons/fi";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hook/useAuth";

const AdminEditProfile = () => {
    const navigate = useNavigate();
    const {loading, fetchProfile, profile, updateProfile} = useAuth();
    const {id} = useParams();
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    // Cleanup photo preview URL on component unmount
    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

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
            try {
                setSubmitting(true);
                
                // Create FormData to send both text and file data
                const formData = new FormData();
                formData.append('ownerName', values.fullName);
                
                // Add photo if selected
                if (photo) {
                    formData.append('profilePicture', photo);
                }
                
                // Call updateProfile with FormData - API call happens HERE
                await updateProfile(formData);
                
                // Clear photo preview after successful upload
                setPhoto(null);
                if (photoPreview) {
                    URL.revokeObjectURL(photoPreview);
                }
                setPhotoPreview(null);
                
                // Show success message ONLY after API call succeeds
                toast.success("Profile updated successfully!");
                
                // Optionally refresh profile data to show updated image
                await fetchProfile();
            } catch (error) {
                console.error("Error updating profile:", error);
                toast.error(error?.response?.data?.message || "Error updating profile");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should be less than 5MB");
                e.target.value = '';
                return;
            }
            
            // Check file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
                e.target.value = '';
                return;
            }
            
            setPhoto(file);
            
            // Create preview URL and clean up previous one
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
            setPhotoPreview(URL.createObjectURL(file));
            
            // REMOVED SUCCESS MESSAGE - only show preview, no API call yet
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Get the image to display: new preview, existing profile pic, or placeholder
    const displayImage = photoPreview || profile?.profilePictureUrl;

    return (
        <div className="flex flex-col min-h-screen bg-[#E0E9E9] w-full p-4">
            <ToastContainer />
            
            {/* Header */}
            <div className="bg-white rounded-lg p-4 mb-4 shadow-md flex items-center gap-2 w-full box-border">
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
                <h2 className="text-xl md:text-2xl font-semibold ml-2" style={{
                    fontWeight: 500,
                    fontSize: '20px',
                    color: 'rgba(51, 51, 51, 1)'
                }}>Edit Profile</h2>
            </div>

            {/* Form + Profile Image */}
            <div className="flex-grow bg-white rounded-md shadow-md p-4 md:p-6 w-full box-border">
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
                    <form onSubmit={formik.handleSubmit} className="w-full">
                        <div className="flex flex-col md:flex-row gap-6 border border-[#616666] rounded-md p-6 min-h-[600px] w-full box-border flex-wrap">
                            
                            {/* Left Section - Form Fields */}
                            <div className="flex-1 flex flex-col space-y-6 min-w-0">
                                {/* Full Name */}
                                <div className="flex flex-col sm:flex-row sm:items-start w-full gap-2 sm:gap-4 min-w-0">
                                    <label className="sm:w-40 w-full font-medium sm:pt-2">Full Name:</label>
                                    <div className="flex-1 w-full min-w-0">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formik.values.fullName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full border border-[#007E74] px-3 py-2 rounded-md bg-[#F5FFFF] focus:outline-none min-w-0"
                                        />
                                        {formik.touched.fullName && formik.errors.fullName && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="flex flex-col sm:flex-row sm:items-start w-full gap-2 sm:gap-4 min-w-0">
                                    <label className="sm:w-40 w-full font-medium sm:pt-2">Contact:</label>
                                    <div className="flex-1 w-full min-w-0">
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full border border-[#007E74] px-3 py-2 rounded-md bg-[#F5FFFF] focus:outline-none min-w-0"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Profile Image + Upload */}
                            <div className="flex flex-col items-center md:items-center md:justify-start md:ml-auto w-full md:w-1/3 mt-6 md:mt-0">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#007E74] overflow-hidden bg-gray-200 flex items-center justify-center">
                                    {displayImage ? (
                                        <img
                                            src={displayImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                    ) : null}
                                    <svg 
                                        className="w-20 h-20 text-gray-400" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                        style={{display: displayImage ? 'none' : 'block'}}
                                    >
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                {/* Upload Button - Only selects file, doesn't call API */}
                                <label className="mt-4 flex items-center justify-center gap-2 bg-[#007E74] text-white rounded-md cursor-pointer w-[200px] h-[40px] hover:bg-[#0c7d7d]">
                                    <FiUpload />
                                    Upload Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex justify-center gap-4 flex-wrap">
                            <button
                                type="button"
                                onClick={() => {
                                    formik.resetForm();
                                    setPhoto(null);
                                    if (photoPreview) URL.revokeObjectURL(photoPreview);
                                    setPhotoPreview(null);
                                    navigate(-1);
                                }}
                                disabled={formik.isSubmitting || loading}
                                className="border border-[#007E74] text-[#0f9e9e] bg-[#D9F1EB] rounded-md w-[200px] h-[40px] hover:bg-[#e0f7f7] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>

                            {/* Update Profile Button - THIS calls the API */}
                            <button
                                type="submit"
                                disabled={formik.isSubmitting || loading}
                                className={`rounded-md w-[200px] h-[40px] ${
                                    formik.isSubmitting || loading
                                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                        : "bg-[#007E74] text-white hover:bg-[#0c7d7d]"
                                }`}
                            >
                                {formik.isSubmitting || loading ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminEditProfile;