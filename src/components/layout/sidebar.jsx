import React from "react";
import {NavLink} from "react-router-dom";
import {FaTachometerAlt, FaUserTie, FaBox, FaBoxes, FaShoppingCart, FaMoneyBill} from "react-icons/fa";
import {Box, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {MdMenu, MdClose} from "react-icons/md";

const Sidebar = ({mobile, setMobile}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const linkClasses = ({isActive}) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition no-underline 
   ${isActive ? "bg-[#007e74] text-white" : "bg-white text-[#007e74] hover:bg-[#e6f5f3]"}`;

    return (
        <>
            {/* 📱 Mobile menu button (top-right) */}
            {isMobile && !mobile && (
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "start"}}>
                    <IconButton onClick={() => setMobile(true)}>
                        <MdMenu />
                    </IconButton>
                </Box>
            )}

            {isMobile && mobile && (
                <div className="fixed inset-0 h-screen w-screen bg-[#19a699] text-white flex flex-col shadow-lg z-50">
                    {/* Close button */}
                    <div className="flex  justify-end p-3">
                        <IconButton onClick={() => setMobile(false)}>
                            <MdClose className="text-white text-2xl" />
                        </IconButton>
                    </div>

                    <nav className="flex flex-col gap-y-3 m-3">
                        <NavLink to="/dashboard" end className={linkClasses} onClick={() => setMobile(false)}>
                            <FaTachometerAlt className="text-lg" />
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink to="/worker" className={linkClasses} onClick={() => setMobile(false)}>
                            <FaUserTie className="text-lg" />
                            <span>Worker</span>
                        </NavLink>
                        <NavLink to="/small-product" className={linkClasses} onClick={() => setMobile(false)}>
                            <FaBox className="text-lg" />
                            <span>Small Product</span>
                        </NavLink>
                        <NavLink to="/big-product" className={linkClasses} onClick={() => setMobile(false)}>
                            <FaBoxes className="text-lg" />
                            <span>Big Product</span>
                        </NavLink>
                        <NavLink to="/orders" className={linkClasses} onClick={() => setMobile(false)}>
                            <FaShoppingCart className="text-lg" />
                            <span>Orders</span>
                        </NavLink>
                        <NavLink to="/payment" className={linkClasses} onClick={() => setMobile(false)}>
                            <FaMoneyBill className="text-lg" />
                            <span>Payment</span>
                        </NavLink>
                    </nav>
                </div>
            )}

            {!isMobile && (
                <div className="h-screen w-64 bg-[#19a699] text-white flex flex-col shadow-lg">
                    <nav className="flex flex-col gap-y-3 m-3">
                        <NavLink to="/dashboard" end className={linkClasses}>
                            <FaTachometerAlt className="text-lg" />
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink to="/worker" className={linkClasses}>
                            <FaUserTie className="text-lg" />
                            <span>Worker</span>
                        </NavLink>
                        <NavLink to="/small-product" className={linkClasses}>
                            <FaBox className="text-lg" />
                            <span>Small Product</span>
                        </NavLink>
                        <NavLink to="/big-product" className={linkClasses}>
                            <FaBoxes className="text-lg" />
                            <span>Big Product</span>
                        </NavLink>
                        <NavLink to="/orders" className={linkClasses}>
                            <FaShoppingCart className="text-lg" />
                            <span>Orders</span>
                        </NavLink>
                        <NavLink to="/payment" className={linkClasses}>
                            <FaMoneyBill className="text-lg" />
                            <span>Payment</span>
                        </NavLink>
                    </nav>
                </div>
            )}
        </>
    );
};

export default Sidebar;
