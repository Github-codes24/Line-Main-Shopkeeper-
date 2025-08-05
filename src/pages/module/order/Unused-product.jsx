import React, { useState } from 'react';
import OrderDetails from './order-details';
import { useNavigate } from 'react-router-dom';

const UnusedProduct = () => {
    const navigate = useNavigate();
    const data = [
        { id: 1, product: "Ambuja cement", price: "380rs/bag", qty: "4 Bag", amount: 400 },
        { id: 2, product: "Ambuja cement", price: "380rs/bag", qty: "4 Bag", amount: 400 },
    ];

    const finalAmount = data.reduce((sum, item) => sum + item.amount, 0);

    const details = (
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
                <LabelInput label="Total Bill" value="₹6000" />
                <LabelInput label="Payment Method" value="Online" />
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

            <hr className="max-w-2xl text-black" />

            <h3 className="font-bold text-lg">Unused Product Handling</h3>
            <div className="mt-2 space-y-4">
                <LabelInput label="Number of products" value="2" />
                <LabelInput label="Product Collected" value="Yes" />
                <LabelInput label="Refund Method" value="Online" />
                <div className="flex items-center space-x-2">
                    <label className="font-medium w-30 pr-11">Refund Status</label>
                    <span className="font-medium px-2">:</span>
                    <input
                        className="border-1 border-[#007E74] bg-[#E0E9E9] text-[#34C759] px-3 py-1 rounded-lg w-80"
                        //   style={{ backgroundColor: '#E0E9E9', color: orderStatusColor }}
                        readOnly
                      value="Paid"
                    />
                </div>

                {/* <hr className="max-w-2xl text-black" /> */}

                {/* Table */}
                <div className="w-5/12 p-4 border-1 border-black rounded-none overflow-hidden">
                    <table className="w-5/12 table-auto border-1 border-black text-sm text-left">
                        <thead className="">
                            <tr>
                                <th className="border-b px-4 py-2">#</th>
                                <th className="border-b px-4 py-2">Products</th>
                                <th className="border-b px-4 py-2">Price</th>
                                <th className="border-b px-4 py-2">Qty</th>
                                <th className="border-b px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td className=" px-4 py-2">{item.id}</td>
                                    <td className=" px-4 py-2">{item.product}</td>
                                    <td className=" px-4 py-2">{item.price}</td>
                                    <td className=" px-4 py-2">{item.qty}</td>
                                    <td className=" px-4 py-2">{item.amount}</td>
                                </tr>
                            ))}
                            <tr className="border-t">
                                <td colSpan="4" className=" px-4 py-2 text-left">
                                    Final Amount
                                </td>
                                <td className=" px-4 py-2">{finalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {/* Use OrderDetail as-is */}
            <OrderDetails
                showButtons={true}
                orderStatus="Completed"
                orderStatusColor="#34C759"
                customAdditionalDetails={details}
                customButtons={
                    <button
                        onClick={() => navigate('/upload-bill')}
                        className="px-10 py-2 border-1 bg-[#D9F1EB] border-[#007E74] text-[#007E74] font-medium rounded-md"
                    >
                        Upload Bill
                    </button>
                }

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

export default UnusedProduct;


