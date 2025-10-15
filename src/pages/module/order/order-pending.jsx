import React, {useEffect, useRef, useState} from "react";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import UseOrder from "../../../hook/order/UseOrder";
import CircularProgress from "@mui/material/CircularProgress";

const SuccessModal = ({isOpen, onClose, bookingId}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-[#003366] rounded-full p-3">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="80" height="80" rx="40" fill="#003366" />
                            <path
                                d="M32.7273 51.6418L23.1818 39.1045L20 43.2836L32.7273 60L60 24.1791L56.8182 20L32.7273 51.6418Z"
                                fill="#56EB54"
                            />
                        </svg>
                    </div>
                </div>
                <p className="text-lg text-[#1D4865] font-medium">
                    You have rejected booking <br /> successfully.
                </p>
                <p className="text-lg text-[#1D4865] font-semibold mt-2">Booking Id - {bookingId}</p>
                <button
                    onClick={onClose}
                    className="mt-5 w-full py-2 bg-[#007E74] text-white font-semibold rounded-lg hover:bg-[#005f58] transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const SettlePaymentModal = ({isOpen, onClose, bookingId}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-[#003366] rounded-full p-3">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="80" height="80" rx="40" fill="#003366" />
                            <path
                                d="M32.7273 51.6418L23.1818 39.1045L20 43.2836L32.7273 60L60 24.1791L56.8182 20L32.7273 51.6418Z"
                                fill="#56EB54"
                            />
                        </svg>
                    </div>
                </div>
                <p className="text-lg text-[#1D4865] font-medium">
                    You have Settled Payment
                    <br /> successfully.
                </p>
                <p className="text-lg text-[#1D4865] font-semibold mt-2">Booking Id - {bookingId}</p>
                <button
                    onClick={onClose}
                    className="mt-5 w-full py-2 bg-[#007E74] text-white font-semibold rounded-lg hover:bg-[#005f58] transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const LabelInput = ({label, value}) => (
    <div className="flex flex-col md:flex-row items-start md:items-center mb-3">
        <label className="font-medium w-40 text-gray-700">{label}</label>
        <span className="hidden md:inline-block font-medium mr-2">:</span>
        <input
            type="text"
            className="border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg w-full md:w-80 mt-1 md:mt-0"
            readOnly
            value={value}
        />
    </div>
);

const OrderPending = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {loading, getOrderById, fetchOrderById, rejectOrder, acceptOrder, pickupVerificationOTP} = UseOrder();
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showSettlePaymentModal, setShowSettlePaymentModal] = useState(false);
    const [openVerificationModal, setOpenVerificationModal] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        fetchOrderById(id);
    }, [id]);

    const handleRejectConfirm = () => {
        rejectOrder(id, reason);
        setShowModal(false);
        setShowSuccessModal(true);
    };

    const handleAcceptOrder = () => {
        let workerId = getOrderById?.worker?._id;
        acceptOrder(id, workerId);
    };

    const Section = ({title, children}) => (
        <div>
            <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">{title}</h3>
            <div className="space-y-4">{children}</div>
        </div>
    );

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1].focus();
    };

    const handleOTP = () => {
        const finalOtp = otp.join("");
        pickupVerificationOTP(id, finalOtp);
        setOpenVerificationModal(false);
    };

    return (
        <div className="h-screen bg-gray-100 p-4 ">
            <div className="bg-white shadow-sm rounded-lg px-4 py-3 flex items-center space-x-4">
                <IoArrowBackCircleOutline
                    className="text-4xl text-[#0D2E28] cursor-pointer hover:text-[#007E74] transition"
                    onClick={() => navigate(-1)}
                />
                <h2 className="text-2xl font-semibold text-[#0D2E28]">Order Details</h2>
            </div>

            {loading ? (
                <div className="flex justify-center pt-10 ">
                    <CircularProgress />
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg p-6 mt-5 flex flex-col h-auto ">
                    <div className="overflow-y-auto flex-1 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <LabelInput label="Order Number" value={getOrderById?.orderId || "-"} />
                        <div>
                            <h3 className="font-bold text-lg mb-3 text-gray-800">Customer Details</h3>
                            <LabelInput label="Customer Name" value={getOrderById?.customer?.name || "-"} />
                            {getOrderById?.customer?.contact ? (
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getOrderById.customer.contact) ? (
                                    <LabelInput label="Email Id" value={getOrderById.customer.contact} />
                                ) : /^\+?\d{10,15}$/.test(getOrderById.customer.contact) ? (
                                    <LabelInput label="Phone Number" value={getOrderById.customer.contact} />
                                ) : (
                                    <LabelInput label="Contact" value={getOrderById.customer.contact} />
                                )
                            ) : (
                                <LabelInput label="Contact" value="-" />
                            )}
                            <LabelInput label="Address" value={getOrderById?.deliveryAddress?.fullAddress} />
                            <div className="flex items-center mb-2">
                                <label className="font-medium w-40 text-gray-700">Order Status</label>
                                <span className="font-medium mr-2">:</span>
                                <input
                                    className="border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg w-80 font-semibold"
                                    style={{
                                        color:
                                            getOrderById?.orderStatus === "Pending"
                                                ? " #FFCC00"
                                                : getOrderById?.orderStatus === "WorkInProgress"
                                                ? "#0088FF"
                                                : getOrderById?.orderStatus === "Rejected"
                                                ? "#EC2D01"
                                                : getOrderById?.orderStatus === "Completed"
                                                ? "#34C759"
                                                : "black",
                                    }}
                                    readOnly
                                    value={
                                        getOrderById?.orderStatus === "Pending"
                                            ? "Pending"
                                            : getOrderById?.orderStatus === "WorkInProgress"
                                            ? "Work In Progress"
                                            : getOrderById?.orderStatus === "Rejected"
                                            ? "Rejected"
                                            : getOrderById?.orderStatus === "Completed"
                                            ? "Completed"
                                            : "Unwanted Status"
                                    }
                                />
                            </div>
                        </div>

                        <hr className="border-t border-gray-300 my-4" />

                        {/* Service Details */}
                        <div>
                            <h3 className="font-bold text-lg mb-3 text-gray-800">Service Details</h3>
                            <LabelInput label="Service Required" value={getOrderById?.specificServiceName} />
                            <LabelInput
                                label="Date"
                                value={
                                    getOrderById?.serviceDate
                                        ? new Date(getOrderById.serviceDate).toLocaleString("en-In", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : ""
                                }
                            />
                            <div className="flex items-center mb-4">
                                <label className="font-medium w-40 text-gray-700">Photos</label>
                                <span className="font-medium mr-2">:</span>
                                <img
                                    src={getOrderById?.initialRequestImages}
                                    alt="service"
                                    className="w-32 h-32 object-cover border rounded shadow-sm"
                                />
                            </div>

                            {/* Product Details Table */}
                            <div className="overflow-x-auto mt-4 rounded-lg border border-gray-200 shadow-sm">
                                <h4 className="font-medium mb-2 text-gray-700 p-2 bg-gray-100 rounded-t-lg">
                                    Product List
                                </h4>
                                <table className="min-w-full text-sm divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-2 text-left font-medium text-gray-600">#</th>
                                            <th className="px-3 py-2 text-left font-medium text-gray-600">Product</th>
                                            <th className="px-3 py-2 text-right font-medium text-gray-600">Price</th>
                                            <th className="px-3 py-2 text-right font-medium text-gray-600">Qty</th>
                                            <th className="px-3 py-2 text-right font-medium text-gray-600">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {(getOrderById?.products || []).map((item, index) => {
                                            const price = Number(item?.priceAtPurchase) || 0;
                                            const quantity = Number(item?.quantity) || 0;
                                            const name = item?.productName || "-";

                                            return (
                                                <tr key={index} className="hover:bg-gray-50 transition">
                                                    <td className="px-3 py-2">{index + 1}</td>
                                                    <td className="px-3 py-2">{name}</td>
                                                    <td className="px-3 py-2 text-right">{price.toLocaleString()}</td>
                                                    <td className="px-3 py-2 text-right">
                                                        {quantity.toLocaleString()}
                                                    </td>
                                                    <td className="px-3 py-2 text-right">
                                                        {(price * quantity).toLocaleString()}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr className="font-semibold bg-gray-50">
                                            <td colSpan="4" className="px-3 py-2 text-right">
                                                Final Amount
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                {(Number(getOrderById?.totalProductCost) || 0).toLocaleString()}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <hr className="border-t border-gray-300 my-4" />

                            {/* WorkInProgress / Completed Sections */}
                            {["WorkInProgress", "Completed"].includes(getOrderById?.orderStatus) && (
                                <div>
                                    <h3 className="font-bold text-lg mb-3 text-gray-800">Work Details</h3>

                                    <LabelInput label="Worker Assigned" value={getOrderById?.worker?.name || "-"} />
                                    <LabelInput
                                        label="Last Update"
                                        value={
                                            getOrderById?.updatedAt
                                                ? new Date(getOrderById.updatedAt).toLocaleString("en-IN", {
                                                      year: "numeric",
                                                      month: "long",
                                                      day: "numeric",
                                                  })
                                                : "-"
                                        }
                                    />
                                    {getOrderById?.paymentMethod === "COD" && (
                                        <LabelInput
                                            label="Quotation Status"
                                            value={getOrderById?.updatedAt ? "Pending" : "-"}
                                        />
                                    )}
                                    <hr className="border-t border-gray-300 my-4" />

                                    <h3 className="font-bold text-lg mb-3 text-gray-800">Payment Details</h3>

                                    <LabelInput label="Total Bill" value={getOrderById?.finalAmount} />
                                    <LabelInput label="Payment Method" value={getOrderById?.paymentMethod || "-"} />
                                    {getOrderById?.paymentMethod !== "COD" && (
                                        <LabelInput
                                            label="Transaction Id"
                                            value={getOrderById?.updatedAt ? "1234" : "-"}
                                        />
                                    )}
                                    <LabelInput label="Payment Status" value={getOrderById?.paymentStatus || "-"} />
                                    <LabelInput
                                        label="Customer Feedback"
                                        value={getOrderById?.workDoneConformationByCustomer || "-"}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-5 mt-6">
                        {getOrderById?.orderStatus === "Pending" ? (
                            <>
                                <button
                                    className="px-10 py-2 border border-[#007E74] bg-[#D9F1EB] text-[#007E74] font-medium rounded-lg hover:bg-[#c0ece1] transition"
                                    onClick={() => setShowModal(true)}
                                >
                                    Reject Order
                                </button>

                                <button
                                    className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-lg hover:bg-[#005f58] transition"
                                    onClick={handleAcceptOrder}
                                >
                                    Accept Order
                                </button>
                            </>
                        ) : getOrderById?.orderStatus === "WorkInProgress" ? (
                            getOrderById?.pickupStatus === "Picked Up" ? (
                                <>
                                    <button
                                        className="px-10 py-2 border border-[#007E74] bg-[#D9F1EB] text-[#007E74] font-medium rounded-lg hover:bg-[#c0ece1] transition"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    {getOrderById?.paymentMethod === "COD" ? (
                                        <button
                                            onClick={() => {
                                                // if (
                                                //     !getOrderById?.statusHistory?.some(
                                                //         (status) => status.status === "approved"
                                                //     )
                                                // ) {
                                                //     navigate("/orders/uploadbill");
                                                // } else {
                                                //     alert("You can upload the bill only after approval");
                                                // }
                                                setShowSettlePaymentModal(true);
                                            }}
                                            className={`px-10 py-2 font-medium rounded-lg transition bg-[#007E74] text-white hover:bg-[#005f58]`}
                                        >
                                            Settle Payment
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (
                                                    !getOrderById?.statusHistory?.some(
                                                        (status) => status.status === "approved"
                                                    )
                                                ) {
                                                    navigate("/orders/uploadbill");
                                                } else {
                                                    alert("You can upload the bill only after approval");
                                                }
                                            }}
                                            className={`px-10 py-2 font-medium rounded-lg transition ${
                                                !getOrderById?.statusHistory?.some(
                                                    (status) => status.status === "approved"
                                                )
                                                    ? "bg-[#007E74] text-white hover:bg-[#005f58]"
                                                    : "bg-gray-400 cursor-not-allowed text-white"
                                            }`}
                                        >
                                            Upload Bill
                                        </button>
                                    )}
                                </>
                            ) : getOrderById?.statusHistory?.some(
                                  (status) => status.status === "ShopkeeperAccepted"
                              ) ? (
                                <>
                                    <button
                                        className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-lg hover:bg-[#005f58] transition"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-lg hover:bg-[#005f58] transition"
                                        onClick={() => setOpenVerificationModal(true)}
                                    >
                                        Verify OTP
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="px-10 py-2 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Waiting for Shopkeeper Approval
                                </button>
                            )
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg border border-blue-500">
                        <h2 className="text-2xl font-bold text-center text-[#0D2E28] mb-6">Reject Order</h2>
                        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
                            <label htmlFor="reason" className="font-medium w-40 text-gray-700">
                                Reject Reason:
                            </label>
                            <input
                                type="text"
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Reject Reason..."
                                className="flex-1 border border-[#19A699] bg-[#F5FFFF] rounded-lg px-4 py-2"
                            />
                        </div>
                        <p className="text-center text-lg text-[#616666] mb-6">
                            Are you sure you want to reject order?
                        </p>
                        <div className="flex justify-center space-x-4 flex-wrap">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-14 py-2 bg-[#D9F1EB] text-[#007E74] border border-[#007E74] rounded-md font-medium hover:bg-[#c0ece1] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRejectConfirm}
                                className="px-14 py-2 bg-[#007E74] text-white rounded-md font-medium hover:bg-[#005f58] transition"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <SuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    bookingId={getOrderById?.orderId}
                />
            )}

            {/* OTP Verification Modal */}
            {openVerificationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFFFF] bg-opacity-10">
                    <div className="bg-white p-8 rounded-2xl border-1 border-[#D9F1EB] shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center text-[#0D2E28] mb-4">Verify OTP</h2>
                        <p className="text-xl text-center text-[#616666] mb-6">Enter the OTP provided by worker</p>

                        <div className="flex justify-center gap-3 mb-6">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    className="w-10 h-10 text-center border-2 border-[#007E74] bg-[#F5FFFF] rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    value={digit}
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                />
                            ))}
                        </div>

                        <div className="flex justify-between items-center gap-4">
                            <button
                                onClick={() => setOpenVerificationModal(false)}
                                className="w-full py-2.5 rounded-lg border-1 border-[#007E74] bg-[#D9F1EB] text-[#007E74] font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOTP}
                                className="w-full py-2.5 rounded-lg bg-[#007E74] text-white font-medium"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSettlePaymentModal && (
                <SettlePaymentModal
                    isOpen={showSettlePaymentModal}
                    onClose={() => setShowSettlePaymentModal(false)}
                    bookingId={getOrderById?.orderId}
                />
            )}
        </div>
    );
};

export default OrderPending;
