import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [expertiseList, setExpertiseList] = React.useState([]);
  const [loadingExpertise, setLoadingExpertise] = React.useState(false);
  const [expertiseFetched, setExpertiseFetched] = React.useState(false);

  // Fetch expertise list when dropdown is clicked
  const handleExpertiseDropdownClick = async () => {
    // Only fetch if not already fetched
    if (expertiseFetched) return;

    setLoadingExpertise(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/shopkeeper/auth/experties`
      );

      if (response.data?.success) {
        setExpertiseList(response.data.data);
        setExpertiseFetched(true);
      }
    } catch (error) {
      console.error("Error fetching expertise:", error);
      alert("Failed to load expertise. Please try again.");
    } finally {
      setLoadingExpertise(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      expertise: "",
      emailOrPhone: "",
    },
    validationSchema: Yup.object({
      expertise: Yup.string().required("Expertise is required"),
      emailOrPhone: Yup.string().required("Email or Mobile Number is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/shopkeeper/auth/login-otp`,
          { 
            contact: values.emailOrPhone,
            experties: values.expertise
          }
        );

        // Check if API response is successful
        if (response.data?.success) {
          sessionStorage.setItem("contact", values.emailOrPhone);
          sessionStorage.setItem("expertise", values.expertise);
          
          // Navigate immediately after successful API response
          navigate("/verify-otp");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert(error.response?.data?.message || "Failed to send OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-teal-700 text-center">LineMan Logo</h1>
        <h2 className="text-md font-semibold text-gray-800 text-center mt-2">Shopkeeper Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6 mt-1">
          Please Log In To Your Account
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Expertise Select */}
          <select
            name="expertise"
            className={`w-full border ${
              formik.touched.expertise && formik.errors.expertise
                ? "border-red-500"
                : "border-teal-500"
            } rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400`}
            {...formik.getFieldProps("expertise")}
            onClick={handleExpertiseDropdownClick}
            disabled={loadingExpertise}
          >
            <option value="">
              {loadingExpertise ? "Loading expertise..." : "Select Expertise"}
            </option>
            {expertiseList.map((item) => (
              <option key={item._id} value={item._id}>
                {item.tabName}
              </option>
            ))}
          </select>
          {formik.touched.expertise && formik.errors.expertise && (
            <div className="text-red-500 text-xs">{formik.errors.expertise}</div>
          )}

          {/* Email/Phone Input */}
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Enter Your Email / Mobile Number"
            className={`w-full border ${
              formik.touched.emailOrPhone && formik.errors.emailOrPhone
                ? "border-red-500"
                : "border-teal-500"
            } rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400`}
            {...formik.getFieldProps("emailOrPhone")}
          />
          {formik.touched.emailOrPhone && formik.errors.emailOrPhone && (
            <div className="text-red-500 text-xs">{formik.errors.emailOrPhone}</div>
          )}

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 text-white py-2 rounded-md"
          >
            {loading ? "Sending OTP..." : "Log In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;