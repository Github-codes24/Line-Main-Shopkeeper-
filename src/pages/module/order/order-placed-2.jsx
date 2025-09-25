import React from "react";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import ServiceImg from "../../../assests/Frame 1261155363.jpg";
import {useNavigate} from "react-router-dom";

const OrderPlaced2 = () => {
    const navigate = useNavigate();

    const products = [
        {name: "Ambuja Cement", price: 380, qty: 4},
        {name: "Ambuja Cement", price: 380, qty: 4},
        {name: "Ambuja Cement", price: 380, qty: 4},
        {name: "Ambuja Cement", price: 380, qty: 4},
    ];

    const calculateAmount = (price, qty) => price * qty;
    const total = products.reduce((sum, item) => sum + calculateAmount(item.price, item.qty), 0);

    return (
        <div className="min-h-screen bg-gray-100 p-3">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg px-3 py-3 flex items-center space-x-4">
                <IoArrowBackCircleOutline
                    className="text-4xl text-[#0D2E28] cursor-pointer hover:text-[#007E74]"
                    onClick={() => navigate(-1)}
                />
                <h2 className="text-2xl font-medium text-[#0D2E28] mt-1">Order Details</h2>
            </div>

            {/* Main Content */}
            <div className="bg-white shadow-sm rounded-lg p-3 mt-3 flex flex-col h-[calc(100vh-4rem)]">
                <div className="border border-[#999999] rounded-md px-4 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
                    {/* Order Info */}
                    <LabelInput label="Order Number" value="ORD8468163287164" />

                    {/* Customer Details */}
                    <div>
                        <h3 className="font-bold text-lg">Customer Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Customer Name" value="Suresh Raina" />
                            <LabelInput label="Phone Number" value="+91-9876543210" />
                            <LabelInput label="Address" value="1901 Thornridge Cir. Shiloh, Hawaii 81063" />
                            <LabelInput label="Email Id" value="Nirajkumark23@gmail.com" />
                            <LabelInput label="Order Status" value="Completed" color="#FFCC00" />
                        </div>
                    </div>

                    <hr className="max-w-2xl text-black" />

                    {/* Service Details */}
                    <div>
                        <h3 className="font-bold text-lg">Service Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Service Required" value="Electrician" />
                            <LabelInput label="Date" value="16/07/2024" />
                            <div className="flex flex-col sm:flex-row sm:items-center">
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

                    {/* Product List */}
                    <div>
                        <h3 className="font-bold text-lg">Product List</h3>
                        <div className="flex flex-col mt-2 overflow-x-auto">
                            <div className="min-w-[500px] p-4 border border-black">
                                <p className="text-lg font-medium mb-1">Suresh Raina</p>
                                <p className="text-sm -mt-1 mb-2">5165484623</p>
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
                                                <td className="px-2 py-1 flex items-center gap-1">
                                                    {item.price} <span className="text-sm text-gray-600">rs/bag</span>
                                                </td>
                                                <td className="px-2 py-1 flex items-center gap-1">
                                                    {item.qty} <span className="text-sm text-gray-600">bag</span>
                                                </td>
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

                    {/* Work Details */}
                    <div>
                        <h3 className="font-bold text-lg">Work Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Worker Assigned" value="Niranjankumar Kalantri" />
                            <LabelInput label="Last Updated" value="16/07/2024" />
                        </div>
                    </div>

                    <hr className="max-w-2xl text-black" />

                    {/* Payment Details */}
                    <div>
                        <h3 className="font-bold text-lg">Payment Details</h3>
                        <div className="mt-2 space-y-4">
                            <LabelInput label="Total Bill" value="₹5000" />
                            <LabelInput label="Payment Method" value="Cash" />
                            <LabelInput label="Payment Status" value="Paid" color="#34C759" />
                        </div>
                    </div>

                    <hr className="max-w-2xl text-black" />

                    {/* Customer Feedback */}
                    <div>
                        <LabelInput label="Customer Feedback" value="Work Done" color="#34C759" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-5 mt-6">
                        <button
                            className="px-12 py-2 border bg-[#D9F1EB] border-[#007E74] font-medium text-[#007E74] rounded-lg"
                            onClick={() => navigate("/upload-bill", {state: {from: "/order-placed-2"}})}
                        >
                            Upload Bill
                        </button>
                        <button className="px-12 py-2 bg-[#007E74] text-white font-medium rounded-md">
                            Settle Payment
                        </button>
                    </div>
                </div>
            </div>
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

export default OrderPlaced2;
