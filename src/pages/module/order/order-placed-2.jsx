import React from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ServiceImg from "../../../assests/Frame 1261155363.jpg";
import { useNavigate } from 'react-router-dom';

const OrderPlaced2 = () => {
    const navigate = useNavigate();

    const products = [
        { name: "Ambuja Cement", price: 380, qty: 4 },
        { name: "Ambuja Cement", price: 380, qty: 4 },
        { name: "Ambuja Cement", price: 380, qty: 4 },
        { name: "Ambuja Cement", price: 380, qty: 4 },
    ];

    const calculateAmount = (price, qty) => price * qty;
    const total = products.reduce((sum, item) => sum + calculateAmount(item.price, item.qty), 0);
    return (
        <div>
            {/* Use OrderDetail as-is */}
            {/* <OrderDetails
                showButtons={true}
                orderStatus=""
                orderStatusColor="#34C759"
                // customAdditionalDetails={details}

            /> */}
            <div>
                <div>
                    <div className="min-h-screen bg-gray-100 p-3">
                        <div className=" bg-white shadow-sm rounded-lg px-3 py-2">
                            <div className="flex items-center space-x-4">
                                <IoArrowBackCircleOutline className="text-4xl text-[#0D2E28]" />
                                <h2 className="text-2xl font-medium text-[#0D2E28] mt-1">Order Details</h2>
                            </div>
                        </div>

                        <div className="bg-white shadow-sm rounded-lg p-3 mt-3 flex flex-col h-[100vh]">
                            <div className="border-1 border-[#999999] rounded-md px-14 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
                                <div>
                                    <span className="font-extrabold text-lg">Order Number</span>
                                    <span className="font-medium pl-8 pr-3">:</span>
                                    <input
                                        className="w-80 border-1 font-extrabold border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg ml-2"
                                        readOnly
                                        value="ORD8468163287164"
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
                                        <div className="flex items-center space-x-2">
                                            <label className="font-medium w-30 pr-14">Order Status</label>
                                            <span className="font-medium px-2">:</span>
                                            <input
                                                className="border-1 border-[#007E74] bg-[#E0E9E9] text-[#FFCC00] px-3 py-1 rounded-lg w-80"
                                                style={{ backgroundColor: '#E0E9E9', color: "#34C759" }}
                                                readOnly
                                                value="Completed"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="max-w-2xl text-black" />

                                {/* Service Details */}
                                <div>
                                    <h3 className="font-bold text-lg">Service Details</h3>
                                    <div className="mt-2 space-y-4">
                                        <LabelInput label="Service Required" value="Electrician" />
                                        <LabelInput label="Date" value="16/07/2024" />
                                        <div className="flex items-start">
                                            <label className="font-medium w-36">Photos</label>
                                            <span className="font-medium pl-4 pr-2">:</span>
                                            <img
                                                src={ServiceImg}
                                                alt="service"
                                                className="w-15 h-15 ml-2 object-cover border"
                                            />
                                        </div>

                                        {/* Product Table */}
                                        <div className="flex flex-col">
                                            <h2 className="text-base font-medium mb-4 ">Product List <span className="font-medium px-16">:</span></h2>
                                            <div className='w-[550px] p-4 border-1 border-black '>
                                                <p className='text-lg font-medium'>Suresh Raina</p>
                                                <p className='text-sm -mt-3 text-black'>5165484623</p>
                                                <div className='flex justify-between -mt-3 -mb-1 font-medium text-sm'>
                                                    <p>Quatation No: 1</p>
                                                    <p>Quatation Date: 10-07-2025</p>
                                                </div>
                                                <table className="w-[500px] table-auto border-1 border-black text-sm text-left">
                                                    <thead>
                                                        <tr className="border-b font-semibold">
                                                            <th className="p-2 font-semibold">#</th>
                                                            <th className="p-2 font-semibold">Products</th>
                                                            <th className="p-2 font-semibold">Price</th>
                                                            <th className="p-2 font-semibold">Qty</th>
                                                            <th className="p-2 font-semibold">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map((item, index) => (
                                                            <tr key={index} className="font-medium">
                                                                <td className="px-2 py-1">{index + 1}</td>
                                                                <td className="px-2 py-1">{item.name}</td>

                                                                {/* Price with rs/bag inline */}
                                                                <td className="px-2 py-1">
                                                                    <span className="flex items-center gap-1">
                                                                        {item.price}
                                                                        <span className="text-sm text-gray-600">rs/bag</span>
                                                                    </span>
                                                                </td>

                                                                {/* Quantity with bag inline */}
                                                                <td className="px-2 py-1">
                                                                    <span className="flex items-center gap-1">
                                                                        {item.qty}
                                                                        <span className="text-sm text-gray-600">bag</span>
                                                                    </span>
                                                                </td>

                                                                <td className="px-2 py-1">{calculateAmount(item.price, item.qty)}</td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                    <tfoot>
                                                        <tr className="border-t font-semibold">
                                                            <td colSpan="3" className="p-2 text-left">Final Amount</td>
                                                            <td colSpan="4" className="p-2 text-center">{total.toLocaleString()}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <hr className="max-w-2xl text-black" />
                                    <h3 className="font-bold text-lg">Work Details</h3>
                                    <div className="mt-2 space-y-4">
                                        <LabelInput label="Worker Assigned" value="Niranjankumar Kalantri" />
                                        <LabelInput label="Last Updated" value="16/07/2024" />
                                    </div>

                                    <hr className="max-w-2xl text-black" />
                                    <h3 className="font-bold text-lg">Payment Details</h3>
                                    <div className="mt-2 space-y-4">
                                        <LabelInput label="Total Bill" value="₹5000" />
                                        <LabelInput label="Payment Method" value="Cash" />
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
                                                className="border-1 border-[#007E74] bg-[#E0E9E9] text-[#34C759] px-3 py-1 rounded-lg w-80"
                                                readOnly
                                                value="Work Done"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex justify-center space-x-5 mt-6">
                                <button className="px-12 py-2 border-1 bg-[#D9F1EB] border-[#007E74] font-medium text-[#007E74] rounded-lg"
                                onClick={() => navigate('/upload-bill', { state: { from: '/order-placed-2' } })}>
                                    Upload Bill
                                </button>
                                <button className="px-12 py-2 bg-[#007E74] text-white font-medium rounded-md">
                                    Settle Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default OrderPlaced2;


