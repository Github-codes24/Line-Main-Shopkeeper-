import React, {useState} from "react";
import OtpModal from "./otpModal";
import OrderManagement from "./order-management";

const OrderProcessing = () => {
    const [showOtpModal, setShowOtpModal] = useState(false);

    const handleOtpClose = () => {
        // do any extra cleanup if needed
    };

    // Custom details for OrderManagement
    const details = (
        <div className="space-y-6">
            {/* Work Details */}
            <hr className="max-w-2xl text-black" />
            <h3 className="font-bold text-lg">Work Details</h3>
            <div className="mt-2 space-y-4">
                <LabelInput label="Worker Assigned" value="Niranjankumar Kalantri" />
                <LabelInput label="Worker Assigned" value="Niranjankumar Kalantri" />
                <LabelInput label="Last Updated" value="16/07/2024" />
            </div>

            {/* Payment Details */}
            <hr className="max-w-2xl text-black" />
            <h3 className="font-bold text-lg">Payment Details</h3>
            <div className="mt-2 space-y-4">
                <LabelInput label="Total Bill" value="₹6000" />
                <LabelInput label="Payment Method" value="Online" />
                <LabelInput label="Transaction ID" value="TRN5648464HGD654" />
                <LabelInput label="Payment Status" value="Paid" color="#34C759" />
            </div>

            {/* Customer Feedback */}
            <hr className="max-w-2xl text-black" />
            <h3 className="font-bold text-lg">Customer Feedback</h3>
            <div className="mt-2">
                <LabelInput label="Feedback" value="Pending" color="#FFCC00" />
            </div>
        </div>
    );

    return (
        <div>
            <OrderManagement
                showButtons={true}
                orderStatus="Work in Progress"
                orderStatusColor="#0088FF"
                customAdditionalDetails={details}
                customButtons={
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setShowOtpModal(true)}
                            className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-md"
                        >
                            Verify OTP
                        </button>
                    </div>
                }
            />
            <OtpModal show={showOtpModal} setShow={setShowOtpModal} onClose={handleOtpClose} />
        </div>
    );
};

// Reusable LabelInput component
const LabelInput = ({label, value, color}) => (
    <div className="flex flex-col sm:flex-row sm:items-center mb-2 w-full">
        <label className="font-medium sm:w-40">{label}</label>
        <span className="font-medium sm:mx-2">:</span>
        <input
            type="text"
            className="border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg flex-1 w-full sm:w-auto"
            style={color ? {color} : {}}
            readOnly
            value={value}
        />
    </div>
);

export default OrderProcessing;
