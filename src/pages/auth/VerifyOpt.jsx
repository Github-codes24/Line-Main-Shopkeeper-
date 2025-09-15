import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const contact = sessionStorage.getItem("contact");

  useEffect(() => {
    if (!contact) navigate("/login"); // prevent direct access
  }, [contact, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
      if (index < 5) {
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/shopkeeper/auth/verify-otp`,
        { contact, otp: finalOtp }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError("Failed to verify OTP");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/shopkeeper/auth/login-otp`,
        { contact }
      );
      alert("OTP resent successfully!");
    } catch (error) {
      alert("Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Code</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter the code we just sent to {contact}
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
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ))}
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Resend Link */}
        <p className="text-sm text-gray-600 mb-6">
          Didn’t receive the code?
          <button
            onClick={handleResend}
            className="text-red-500 font-semibold ml-1"
          >
            Resend
          </button>
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 py-2 rounded-md border border-teal-500 text-teal-700 hover:bg-teal-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            className="flex-1 py-2 rounded-md bg-teal-700 text-white hover:bg-teal-800 transition"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
