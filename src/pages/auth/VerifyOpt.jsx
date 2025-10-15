import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Add axios interceptor to include token in requests
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const inputsRef = useRef([]);
  const contact = sessionStorage.getItem("contact");
  const expertise = sessionStorage.getItem("expertise");

  useEffect(() => {
    if (!contact || !expertise) navigate("/");
  }, [contact, expertise, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
      if (index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/shopkeeper/auth/verify-otp`,
        {
          contact: contact,
          experties: expertise,
          otp: finalOtp
        }
      );

      console.log("API Response:", response.data); // Debug log

      // Check if API response is successful
      if (response.data?.success) {
        // Store token and shopId in sessionStorage BEFORE navigation
        if (response.data.token) {
          sessionStorage.setItem("token", response.data.token);
          console.log("Token stored:", response.data.token); // Debug log
          
          // Set axios default header immediately
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        if (response.data.data?.shopId) {
          sessionStorage.setItem("shopId", response.data.data.shopId);
          console.log("ShopId stored:", response.data.data.shopId); // Debug log
        }
        
        // Verify token is stored before navigation
        const storedToken = sessionStorage.getItem("token");
        console.log("Stored token before navigation:", storedToken); // Debug log
        
        if (storedToken) {
          // Use window.location for hard navigation to ensure clean state
          navigate("/dashboard");
        } else {
          setError("Failed to store authentication token. Please try again.");
        }
      } else {
        setError(response.data?.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/shopkeeper/auth/resend-otp`,
        { 
          contact,
          experties: expertise
        }
      );
      alert("OTP resent successfully!");
      setOtp(new Array(6).fill(""));
      setError("");
      inputsRef.current[0]?.focus();
    } catch (error) {
      console.error("Resend error:", error);
      alert(error.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-600">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-center">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-2">Verify Code</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter code we just sent to your mobile no./E-mail
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              disabled={isVerifying}
              className="w-10 h-10 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200 disabled:opacity-50"
            />
          ))}
        </div>

        {/* Error */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Resend */}
        <p className="text-sm text-gray-600 mb-6">
          Didn't receive the code?
          <button
            onClick={handleResend}
            disabled={isVerifying}
            className="text-red-500 font-semibold ml-1 disabled:opacity-50"
          >
            Resend
          </button>
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            disabled={isVerifying}
            className="flex-1 py-1 rounded-md border border-teal-500 text-teal-700 bg-teal-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="flex-1 py-1 rounded-md bg-teal-700 text-white  transition disabled:opacity-50"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;