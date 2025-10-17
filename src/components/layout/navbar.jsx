import React, {useState, useRef, useEffect} from "react";
import {ChevronDown} from "lucide-react";
import {useNavigate} from "react-router-dom";
import LogoutModal from "../../pages/auth/LogoutModal";
import useAuth from "../../hook/useAuth";

function Navbar() {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dropdownRef = useRef(null);
    const {logoutAdmin, profile, fetchProfile} = useAuth(); // Get profile and fetchProfile from useAuth
    const navigate = useNavigate();

    // Fetch profile data when component mounts
    useEffect(() => {
        fetchProfile();
    }, []);

    const handleLogoutClick = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("token");
        logoutAdmin();
        navigate("/login");
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const hangleNavigate = () => {
        navigate("/profile");
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get profile picture URL or use placeholder
    const profileImageUrl = profile?.profilePictureUrl || "img1.jpg";

    return (
        <div className="min-w-full navbar border p-2 flex justify-between items-center">
            {/* Left: Logo */}
            <h2 className="text-[#007E74] font-poppins font-bold">LineMan Logo</h2>

            {/* Right: Profile + Dropdown */}
            <div className="flex items-center">
                <img 
                    src={profileImageUrl} 
                    alt="profile" 
                    className="profile-pic rounded-full w-8 h-8 object-cover" 
                    onError={(e) => {
                        // Fallback to default image if profile image fails to load
                        e.target.src = "img1.jpg";
                    }}
                />
                <div ref={dropdownRef} className="relative">
                    <ChevronDown
                        className="w-4 h-4 ml-2 mr-3 text-gray-700 cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />

                    {open && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
                            <ul className="text-sm text-gray-700">
                                <li
                                    className="px-3 py-2  cursor-pointer text-[#007E74]"
                                    onClick={hangleNavigate}
                                >
                                    Admin Profile
                                </li>
                                <button
                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                                    onClick={handleLogoutClick}
                                >
                                    Logout
                                </button>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && <LogoutModal onClose={handleClose} onConfirm={confirmLogout} />}
        </div>
    );
}

export default Navbar;