import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [expertiseList, setExpertiseList] = React.useState([]);
  const [loadingExpertise, setLoadingExpertise] = React.useState(true);

  // Validation schema
  const validationSchema = Yup.object().shape({
    expertise: Yup.string().required("Please select an expertise"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      expertise: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // Handle login logic here
        console.log("Form submitted:", values);
        // Navigate or handle response
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Fetch expertise list when component mounts
  useEffect(() => {
    const fetchExpertise = async () => {
      setLoadingExpertise(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/shopkeeper/auth/experties`
        );

        if (response.data?.success) {
          setExpertiseList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching expertise:", error);
        alert("Failed to load expertise. Please try again.");
      } finally {
        setLoadingExpertise(false);
      }
    };

    fetchExpertise();
  }, []); // Runs once on mount

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-teal-700 text-center">LineMan Logo</h1>
        <h2 className="text-md font-semibold text-gray-800 text-center mt-2">
          Shopkeeper Login
        </h2>
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

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Log In"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;