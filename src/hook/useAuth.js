import {useState} from "react";
import conf from "../config";
import useFetch from "./useFetch";
import {useRecoilState, useSetRecoilState} from "recoil";
import {profileAtom, shopkeeperLoginAtom} from "../state/auth/authState";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getFcmToken} from "../firebase/getFcmToken";

const useAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const setUserInfo = useSetRecoilState(shopkeeperLoginAtom);
    const [fetchData] = useFetch();
    const [loginResponse, setLoginResponse] = useState(null);
    const [profile, setProfile] = useRecoilState(profileAtom);

    // -------------------Login---------------------------

    const shopkeeperLogin = async (payload) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/auth/login-otp`,
                data: payload,
            });
            if (res) {
                navigate("/verify-otp");
                setLoginResponse(res);
                setUserInfo({
                    isAuthenticated: true,
                });
                setLoading(false);
            }
        } catch (error) {
            console.log("Error while Login Shopkeeper:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // -------------------verify OTP---------------------------

    const verifyOTP = async (contact, finalOtp) => {
        setLoading(true);

        try {
            const fcm_token = await getFcmToken();
            if (!fcm_token || typeof fcm_token !== "string") {
                toast.error("Failed to get FCM token. Please allow notifications.");
                setLoading(false);
                return;
            }
            const data = {
                contact: contact,
                otp: finalOtp,
                fcm_token: fcm_token,
            };
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/auth/verify-otp`,
                data: data,
            });
            if (res) {
                sessionStorage.setItem("token", res?.token);
                sessionStorage.setItem("shopId", res?.data?.shopId);
                toast.success(res?.message);
                navigate("/dashboard");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error while verify otp :", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // -------------------Profile---------------------------

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/shopkeeper/profile/me`,
            });
            if (res) {
                setProfile(res?.data);
                // toast.success(res?.message);
                sessionStorage.setItem("ownerName", res?.data?.ownerName);
                sessionStorage.setItem("isVerified", res?.data?.isVerified);
                sessionStorage.setItem("isActive", res?.data?.isActive);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error while fetch Profile :", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // -------------------Update Profile---------------------------

    const updateProfile = async (payload) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/shopkeeper/profile/me`,
                data: payload,
            });
            if (res) {
                toast.success(res?.message);
                navigate("/profile");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error while fetch Profile :", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    // -------------------logout Admin---------------------------

    const logoutAdmin = () => {
        toast.success("Logout Successfully");
        setUserInfo({
            isAuthenticated: false,
        });
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("contact");
        sessionStorage.removeItem("shopId");
        sessionStorage.removeItem("ownerName");
        sessionStorage.removeItem("isVerified");
        sessionStorage.removeItem("isActive");
    };

    return {loading, shopkeeperLogin, loginResponse, verifyOTP, fetchProfile, profile, updateProfile, logoutAdmin};
};

export default useAuth;
