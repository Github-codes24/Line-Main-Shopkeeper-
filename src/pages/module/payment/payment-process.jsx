import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import search from "../../../assets/search.png";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";

function PaymentProcess() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call with dummy data
        const fetchPaymentDetails = async () => {
            const dummyResponse = {
                orderNumber: "ORD8468163287164",
                customerName: "Suresh Raina",
                phoneNumber: "+91-9876543210",
                address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
                email: "NirajkumarK23@gmail.com",
                orderStatus: "In Progress",
                service: "Electrician",
                date: "16/07/2024",
                images: [image1, image2, image3],
            };

            setTimeout(() => {
                setData(dummyResponse);
                setLoading(false);
            }, 500);
        };

        fetchPaymentDetails();
    }, [id]);

    if (loading) {
        return <div className="p-6 text-gray-600">Loading payment details...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-3">
            {/* Header Section */}
            <div className="bg-white rounded-lg p-3 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="text-xl text-black hover:text-gray-600">
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.9997 36.6673C29.2044 36.6673 36.6663 29.2054 36.6663 20.0007C36.6663 10.7959 29.2044 3.33398 19.9997 3.33398C10.7949 3.33398 3.33301 10.7959 3.33301 20.0007C3.33301 29.2054 10.7949 36.6673 19.9997 36.6673Z"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M19.9997 13.334L13.333 20.0007L19.9997 26.6673"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M26.6663 20H13.333"
                                stroke="#0D2E28"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                    <h1 className="ml-4 text-xl font-medium">Wallet</h1>
                </div>
                {/* Search Bar */}
                <div className="relative w-full sm:w-96">
                    <img
                        src={search}
                        alt="Search"
                        className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search worker name here..."
                        className="pl-12 pr-4 py-2 w-full rounded-md border border-teal-600 bg-white outline-none"
                    />
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-md p-4 min-h-screen">
                {/* Order Number */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="font-medium text-gray-800 text-lg">Order Number :</span>
                    <span className="px-4 py-1 bg-gray-100 border border-teal-600 rounded-md font-bold text-gray-900">
                        {data.orderNumber}
                    </span>
                </div>

                {/* Customer Details */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h3>
                <div className="space-y-4">
                    {/* Name */}
                    <div className="flex items-center gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Customer Name :</span>
                        <input
                            type="text"
                            value={data.customerName}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Phone Number :</span>
                        <input
                            type="text"
                            value={data.phoneNumber}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Address :</span>
                        <textarea
                            value={data.address}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium resize-none"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Email Id :</span>
                        <input
                            type="text"
                            value={data.email}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    {/* Order Status */}
                    <div className="flex items-center gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Order Status :</span>
                        <span className="px-4 py-1 rounded-md font-medium bg-yellow-100 text-yellow-700 border border-yellow-400">
                            {data.orderStatus}
                        </span>
                    </div>
                </div>

                <hr className="my-6 border-gray-300" />

                {/* Service Details */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Details</h3>
                <div className="space-y-4">
                    {/* Service */}
                    <div className="flex items-center gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Service Required :</span>
                        <input
                            type="text"
                            value={data.service}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Date :</span>
                        <input
                            type="text"
                            value={data.date}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    {/* Photos */}
                    <div className="flex items-start gap-3">
                        <span className="w-40 text-right font-medium text-gray-700">Photos :</span>
                        <div className="flex gap-2 items-center">
                            {data.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`img-${index}`}
                                    className="w-20 h-16 rounded-md border border-gray-300 object-cover"
                                />
                            ))}
                            <a href="#" className="text-teal-600 text-sm font-medium underline">
                                View all
                            </a>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center mt-8">
                    <button className="px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition">
                        Settle Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentProcess;
