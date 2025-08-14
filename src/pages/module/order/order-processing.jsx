import React, { useState } from 'react';
import OtpModal from './otpModal';
import OrderManagement from './order-management';

const OrderProcessing = () => {
    const [showOtpModal, setShowOtpModal] = useState(false);

    const handleOtpClose = () => {
        // do any extra cleanup if needed
    };

    const details = (
        <div>
            <hr className="max-w-2xl text-black" />
            <h3 className="font-bold text-lg">Work Details</h3>
            <div className="mt-2 space-y-4">
                <LabelInput label="Worker Assigned" value="Niranjankumar Kalantri" />
                <LabelInput label="Worker Assigned" value="Niranjankumar Kalantri" />
                <LabelInput label="Last Updated" value="16/07/2024" />
            </div>

            <hr className="max-w-2xl text-black" />
            <h3 className="font-bold text-lg">Payment Details</h3>
            <div className="mt-2 space-y-4">
                <LabelInput label="Total Bill" value="₹6000" />
                <LabelInput label="Payment Method" value="Online" />
                <LabelInput label="Transaction ID" value="TRN5648464HGD654" />
                <div className="flex items-center space-x-2">
                    <label className="font-medium w-30 pr-8">Payment Status</label>
                    <span className="font-medium px-2">:</span>
                    <input
                        className="border-1 border-[#007E74] bg-[#E0E9E9] text-[#34C759] px-3 py-1 rounded-lg w-80"
                        readOnly
                        value="Paid"
                    />
                </div>
            </div>

            <hr className="max-w-2xl text-black" />
            {/* <h3 className="font-bold text-lg">Customer Feedback</h3> */}
            <div className="mt-2 space-y-4">
                <div className="flex items-center space-x-2">
                    <label className="font-bold text-lg w-30 pr-16">Customer <br /> Feedback</label>
                    <span className="font-medium px-2">:</span>
                    <input
                        className="border-1 border-[#007E74] bg-[#E0E9E9] text-[#FFCC00] px-3 py-1 rounded-lg w-80"
                        readOnly
                        value="Pending"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {/* Use OrderDetail as-is */}
            <OrderManagement
                showButtons={true}
                orderStatus="Work in Progress"
                orderStatusColor="#0088FF"
                customAdditionalDetails={details}
                customButtons={
                    <button
                        onClick={() => setShowOtpModal(true)}
                        className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-md"
                    >
                        Verify OTP
                    </button>
                }

            />
            <OtpModal
                show={showOtpModal}
                setShow={setShowOtpModal}
                onClose={handleOtpClose}
            />
        </div>
    );
};


const LabelInput = ({ label, value }) => (
    <div className="flex items-center">
        <label className="font-medium w-40">{label}</label>
        <span className="font-medium">:</span>
        <input
            type="text"
            className="border-1 ml-4 border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg w-80"
            readOnly
            value={value}
        />
    </div>
);

export default OrderProcessing;
