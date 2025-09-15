import { useState } from "react";
import axios from "axios";
import conf from "../config";

const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const generateOtp = async (payload) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${conf.apiBaseUrl}/shopkeeper/auth/login-otp`,
                payload
            );

            if (response.status === 200) {
                console.log("OTP sent successfully");
                return true;   // ✅ return boolean for clarity
            }
            return false;
        } catch (error) {
            console.error("Error sending OTP:", error?.response?.data || error.message);
            alert("Failed to send OTP.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, generateOtp };
};

export default useAuth;
