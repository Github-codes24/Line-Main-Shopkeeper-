import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useAuth from "../../hook/useAuth";

const OtpVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(4).fill("")); // Image shows 6 boxes
    const [error, setError] = useState("");
    const inputsRef = useRef([]);
    const contact = sessionStorage.getItem("contact");
    const {verifyOTP} = useAuth();

    useEffect(() => {
        if (!contact) navigate("/");
    }, [contact, navigate]);

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
        verifyOTP(contact, finalOtp);
    };

    const handleResend = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/shopkeeper/auth/login-otp`, {contact});
            alert("OTP resent successfully!");
        } catch (error) {
            alert("Failed to resend OTP.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-600">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 text-center">
                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800 mb-2">Verify Code</h2>
                <p className="text-sm text-gray-500 mb-6">Please enter the code we just sent to mobile no./E-mail</p>

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
                            className="w-10 h-10 text-center text-lg font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-200"
                        />
                    ))}
                </div>

                {/* Error */}
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

                {/* Resend */}
                <p className="text-sm text-gray-600 mb-6">
                    Didn’t receive the code?
                    <button onClick={handleResend} className="text-red-500 font-semibold ml-1">
                        Resend
                    </button>
                </p>

                {/* Buttons */}
                <div className="flex justify-between gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleVerify}
                        className="flex-1 py-1 rounded-md bg-teal-700 text-white hover:bg-teal-800 transition"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
