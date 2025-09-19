import {useState} from "react";
import conf from "../config";
import useFetch from "./useFetch";
import {useRecoilState, useSetRecoilState} from "recoil";
import {profileAtom, shopkeeperLoginAtom} from "../state/smallproduct/auth/authState";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

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
                url: `${conf.apiBaseUrl}shopkeeper/auth/login-otp`,
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

    const verifyOTP = async (contact, finalOtp) => {
        setLoading(true);
        try {
            const data = {
                contact: contact,
                otp: finalOtp,
            };
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}shopkeeper/auth/verify-otp`,
                data: data,
            });
            if (res) {
                sessionStorage.setItem("token", res?.token);
                sessionStorage.setItem("shopId", res?.data?.shopId);
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

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}shopkeeper/profile/me`,
            });
            if (res) {
                setProfile(res?.data);
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

    const updateProfile = async (payload) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}shopkeeper/profile/me`,
                data: payload,
            });
            if (res) {
                alert(res?.message);
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

    const logoutAdmin = () => {
        setUserInfo({
            isAuthenticated: true,
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
