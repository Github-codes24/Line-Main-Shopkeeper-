import React from "react";
import {Routes, Route, Navigate, Outlet} from "react-router-dom";

import Sidebar from "./components/layout/sidebar";
import Navbar from "./components/layout/navbar";
import Dashboard from "./pages/dashboard";

// Worker
import Worker from "./pages/module/worker/worker";
import WorkerView from "./pages/module/worker/worker-view";
import WorkerEdit from "./pages/module/worker/worker-edit";

// Big Product
import BigProduct from "./pages/module/big-product/bigProduct";
import BigProductAdd from "./pages/module/big-product/bigProductAdd";
import BigProductEdit from "./pages/module/big-product/bigProductEdit";
import BigProductView from "./pages/module/big-product/bigProductView";

// Small Product
import SmallProduct from "./pages/module/small-product/smallProduct";
import SmallProductAdd from "./pages/module/small-product/smallProductAdd";
import SmallProductEdit from "./pages/module/small-product/smallProductEdit";
import SmallProductView from "./pages/module/small-product/smallProductView";

// Orders
import OrderManagement from "./pages/module/order/order-management";
import OrderPending from "./pages/module/order/order-pending";
import OrderPlaced from "./pages/module/order/order-placed";
import OrderProcessing from "./pages/module/order/order-processing";
import OrderCompleted from "./pages/module/order/quotation-approved";
import OrderRejected from "./pages/module/order/quotation-rejected";
import QuotationWaiting from "./pages/module/order/quotation-waiting";

// Payment
import PaymentProcess from "./pages/module/payment/payment-process";
import Payment from "./pages/module/payment/payment";

// Auth
import Login from "./pages/auth/login";
import OtpVerification from "./pages/auth/VerifyOpt";
import ProtectedRoute from "./route/protected";

import "./App.css";
import AdminProfile from "./pages/auth/profile";
import AdminEditProfile from "./pages/auth/profileEdit";
import {ToastContainer} from "react-toastify";
import AcceptOrderModals from "./pages/module/order/accept-order-models";
import OtpModal from "./pages/module/order/otpModal";
import {useMediaQuery, useTheme} from "@mui/material";
import UploadBill from "./pages/module/order/upload-bill";

function AppLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobile, setMobile] = React.useState(false);

    return (
        <div className="h-screen flex flex-col">
            {isMobile ? (
                <div className="flex overflow-hidden">
                    <Sidebar mobile={mobile} setMobile={setMobile} />
                    <Navbar />
                </div>
            ) : (
                <Navbar />
            )}
            {/* <Navbar /> */}
            <div className="flex flex-1 overflow-hidden">
                {!isMobile && <Sidebar mobile={mobile} setMobile={setMobile} />}

                {/* Hide Outlet when sidebar is open on mobile */}
                {!mobile && (
                    <main className="flex-1 overflow-y-auto">
                        <Outlet />
                    </main>
                )}
            </div>
        </div>
    );
}

function App() {
    return (
        <>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
                <Route path="/" element={<Login />} />
                <Route path="/verify-otp" element={<OtpVerification />} />
                <Route element={<AppLayout />}>
                    <Route path="/profile" element={<AdminProfile />} />
                    <Route path="/editprofile/:id" element={<AdminEditProfile />} />
                </Route>

                {/* Protected Routes (only for logged-in users) */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />

                        {/* Worker */}
                        <Route path="/worker" element={<Worker />} />
                        <Route path="/worker/worker-view/:id" element={<WorkerView />} />
                        <Route path="/worker/worker-edit/:id" element={<WorkerEdit />} />

                        {/* Small Product */}
                        <Route path="/small-product" element={<SmallProduct />} />
                        <Route path="/small-product/add" element={<SmallProductAdd />} />
                        <Route path="/small-product/edit/:id" element={<SmallProductEdit />} />
                        <Route path="/small-product/view/:id" element={<SmallProductView />} />

                        {/* Big Product */}
                        <Route path="/big-product" element={<BigProduct />} />
                        <Route path="/big-product/add" element={<BigProductAdd />} />
                        <Route path="/big-product/edit/:id" element={<BigProductEdit />} />
                        <Route path="/big-product/view/:id" element={<BigProductView />} />

                        {/* Orders */}
                        <Route path="/orders" element={<OrderManagement />} />
                        <Route path="/orders/orderdetails/:id" element={<OrderPending />} />
                        <Route path="/orders/placed" element={<OrderPlaced />} />
                        {/* <Route path="/orders/processing" element={<OrderProcessing />} /> */}
                        <Route path="/orders/completed/:id" element={<OrderCompleted />} />
                        <Route path="/orders/rejected/:id" element={<OrderRejected />} />
                        <Route path="/orders/workinprogress/:id" element={<QuotationWaiting />} />
                        <Route path="/orders/acceptorder/:id" element={<AcceptOrderModals />} />
                        <Route path="/orders/verifyotp/" element={<OtpModal />} />
                        <Route path="/orders/uploadbill/" element={<UploadBill />} />

                        {/* Payment */}
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/payment/process/:id" element={<PaymentProcess />} />

                        {/* Catch-all → dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
