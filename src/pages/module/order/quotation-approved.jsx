import React from "react";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import ServiceImg from "../../../assets/Frame 1261155363.jpg";
import {useNavigate} from "react-router-dom";

const products = [
    {name: "PVC Wire", price: 400, qty: 1},
    {name: "LED Light", price: 80, qty: 5},
    {name: "Switches", price: 10, qty: 7},
    {name: "Connector", price: 400, qty: 1},
    {name: "LED light", price: 120, qty: 3},
];

const calculateAmount = (price, qty) => price * qty;
const total = products.reduce((sum, item) => sum + calculateAmount(item.price, item.qty), 0);

const QuotationApproved = () => {
    const navigate = useNavigate();
    const orderId = "ORD8468163287164";

    return (
        <div className="min-h-screen bg-gray-100 p-3">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg px-3 py-3">
                <div className="flex items-center space-x-4">
                    <IoArrowBackCircleOutline
                        className="text-4xl text-[#0D2E28] cursor-pointer hover:text-[#007E74]"
                        onClick={() => navigate(-1)}
                    />
                    <h2 className="text-2xl font-medium text-[#0D2E28] mt-1">Order Details</h2>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white shadow-sm rounded-lg p-3 mt-3 flex flex-col h-[100vh]">
                <div className="border border-[#999999] rounded-md px-4 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
                    {/* Order Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center w-full mb-2">
                        <span className="font-extrabold text-lg">Order Number</span>
                        <span className="font-medium sm:mx-2">:</span>
                        <input
                            className="flex-1 w-full sm:w-auto border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg font-extrabold"
                            readOnly
                            value={orderId}
                        />
                    </div>

                    {/* Customer Details */}
                    <div>
                        <h3 className="font-bold text-lg">Customer Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Customer Name" value="Suresh Raina" />
                            <LabelInput label="Phone Number" value="+91-9876543210" />
                            <LabelInput label="Address" value="1901 Thornridge Cir. Shiloh, Hawaii 81063" />
                            <LabelInput label="Email Id" value="Nirajkumark23@gmail.com" />
                            <LabelInput label="Order Status" value="Work in progress" color="#0088FF" />
                        </div>
                    </div>

                    <hr className="max-w-2xl text-black" />

                    {/* Service Details */}
                    <div>
                        <h3 className="font-bold text-lg">Service Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Service Required" value="Electrician" />
                            <LabelInput label="Date" value="16/07/2024" />
                            <div className="flex flex-col sm:flex-row sm:items-center w-full">
                                <label className="font-medium sm:w-36">Photos</label>
                                <span className="font-medium sm:mx-2">:</span>
                                <img
                                    src={ServiceImg}
                                    alt="service"
                                    className="w-36 h-36 mt-2 sm:mt-0 object-cover border"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="max-w-2xl text-black" />

                    {/* Work Details */}
                    <div>
                        <h3 className="font-bold text-lg">Work Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Worker Assigned" value="Niranjankumar Kalantri" />
                            <LabelInput label="Last Updated" value="16/07/2024" />
                            <LabelInput label="Quotation Status" value="Approved" color="#34C759" />
                        </div>

                        {/* Product Table */}
                        <div className="flex flex-col mt-4 overflow-x-auto">
                            <div className="min-w-[500px] p-4 border border-black">
                                <p className="text-lg font-medium mb-2">Suresh Raina</p>
                                <div className="flex justify-between -mt-3 -mb-1 font-medium text-sm">
                                    <p>Quotation No: 1</p>
                                    <p>Quotation Date: 10-07-2025</p>
                                </div>
                                <table className="w-full table-auto border border-black text-sm text-left">
                                    <thead>
                                        <tr className="border-b font-semibold">
                                            <th className="p-2">#</th>
                                            <th className="p-2">Products</th>
                                            <th className="p-2">Price</th>
                                            <th className="p-2">Qty</th>
                                            <th className="p-2">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((item, index) => (
                                            <tr key={index} className="font-medium">
                                                <td className="px-2 py-1">{index + 1}</td>
                                                <td className="px-2 py-1">{item.name}</td>
                                                <td className="px-2 py-1">{item.price}</td>
                                                <td className="px-2 py-1">{item.qty}</td>
                                                <td className="px-2 py-1">{calculateAmount(item.price, item.qty)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t font-semibold">
                                            <td colSpan="3" className="p-2 text-left">
                                                Final Amount
                                            </td>
                                            <td colSpan="2" className="p-2 text-center">
                                                {total.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <hr className="max-w-2xl text-black" />

                    {/* Payment Details */}
                    <div>
                        <h3 className="font-bold text-lg">Payment Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Total Bill" value="₹6000" />
                            <LabelInput label="Payment Method" value="Online" />
                            <LabelInput label="Payment Status" value="Paid" color="#34C759" />
                            <LabelInput label="Customer Feedback" value="Pending" color="#FFCC00" />
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center space-x-5 mt-6">
                    <button className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-md">Verify OTP</button>
                </div>
            </div>
        </div>
    );
};

// Responsive LabelInput
const LabelInput = ({label, value, color}) => (
    <div className="flex flex-col sm:flex-row sm:items-center mb-2 w-full">
        <label className="font-medium sm:w-40">{label}</label>
        <span className="font-medium sm:mx-2">:</span>
        <input
            type="text"
            className={`border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg flex-1 w-full sm:w-auto ${
                color ? "text-[color]" : ""
            }`}
            style={color ? {color} : {}}
            readOnly
            value={value}
        />
    </div>
);

export default QuotationApproved;
