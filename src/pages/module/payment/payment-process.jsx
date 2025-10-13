import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";

// --- API Helper Functions ---
async function fetchPaymentById(paymentId, shopkeeperId) {
    const apiUrl = `https://linemen-be-1.onrender.com/shopkeeper/payments/${paymentId}?shopkeeperId=${shopkeeperId}`;
    const response = await fetch(apiUrl, { method: 'GET' });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
}

async function settlePayment(paymentId, shopkeeperId) {
    const apiUrl = 'https://linemen-be-1.onrender.com/shopkeeper/payments/settle-payment';
    const payload = { shopkeeperId, paymentId };
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
}

function PaymentProcess() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const SHOPKEEPER_ID = "68c3c3d0357c37bfad321962"; // This should come from an auth context or global state

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const response = await fetchPaymentById(id, SHOPKEEPER_ID);
                if (response && response.success) {
                    const paymentData = response.data;
                    // --- UPDATED MAPPING LOGIC BASED ON NEW JSON ---
                    const formattedData = {
                        orderNumber: paymentData.orderId || 'N/A',
                        customerName: paymentData.worker?.name || 'N/A', // Handles null worker
                        phoneNumber: paymentData.worker?.contact || 'N/A', // Handles null worker
                        address: "Address not available in API",
                        email: paymentData.shopKeeper?.contact || 'N/A', // Uses shopKeeper key
                        orderStatus: paymentData.status === 'created' ? 'In Progress' : 'Settled',
                        service: paymentData.worker?.experties || 'N/A', // Handles null worker
                        date: new Date(paymentData.updatedAt || Date.now()).toLocaleDateString("en-IN"),
                        images: [image1, image2, image3],
                    };
                    setData(formattedData);
                } else {
                    throw new Error("API request failed to get payment details");
                }
            } catch (error) {
                console.error("Failed to fetch payment details:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPaymentDetails();
        }
    }, [id]);

    const handleSettlePayment = async () => {
        try {
            const result = await settlePayment(id, SHOPKEEPER_ID);
            if (result.success) {
                alert(result.message);
                navigate('/payment');
            } else {
                alert("Failed to settle payment.");
            }
        } catch (error) {
            console.error("Error settling payment:", error);
            alert("An error occurred while settling the payment.");
        }
    };

    if (loading) {
        return <div className="p-6 text-gray-600">Loading payment details...</div>;
    }

    if (!data) {
        return <div className="p-6 text-red-500">Failed to load payment details. Please try again.</div>;
    }

    return (
        // --- UI REMAINS UNCHANGED ---
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header Section */}
            <div className=" h-[73px] bg-white rounded-[8px] p-4 shadow-md flex flex-col sm:flex-row justify-between items-center gap-[101px] mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Wallet</h2>

                <div className="flex-1 flex">
                                        <div className="relative w-full sm:w-96">
                                            <FaSearch className="absolute left-4 inset-y-0 my-auto text-[#0D2E28]" />
                                            <input
                                                type="text"
                                            
                                               
                                                placeholder="Search worker name here..."
                                                className="w-full h-10 pl-10 pr-4 py-2 border border-teal-500 rounded-full bg-[#E0E9E9] outline-none shadow-sm focus:border-teal-600 
                             text-[#0D2E28] text-base font-medium font-poppins placeholder:text-[#0D2E28]"
                                            />
                
                                        </div>
                
                                    </div>

            </div>

            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-md p-6  mx-auto">
                {/* Order Number */}
                <div className="flex items-center gap-3 mb-6">
                    <span className="font-bold text-[#0D2E28] text-lg">Order Number :</span>
                    <span className="px-4 py-1 bg-gray-100 border border-teal-600 rounded-md font-bold text-gray-900">
                        {data.orderNumber}
                    </span>
                </div>

                {/* Customer Details */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-40 text-left font-medium text-gray-700">Customer Name :</span>
                        <input
                            type="text"
                            value={data.customerName}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="w-40 text-left font-medium text-gray-700">Phone Number :</span>
                        <input
                            type="text"
                            value={data.phoneNumber}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="w-40 text-left font-medium text-gray-700">Address :</span>
                        <textarea
                            value={data.address}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium resize-none"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="w-40 text-left font-medium text-gray-700">Email Id :</span>
                        <input
                            type="text"
                            value={data.email}
                            disabled
                            className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="w-40 text-left font-medium text-gray-700">Order Status :</span>
                        <input
                            type="text"
                            value={data.orderStatus}
                            disabled
                            className="flex-1 px-4 py-1 border text-[#FFCC00] border-teal-600 rounded-md bg-gray-100 font-medium"
                        />
                    </div>


                </div>

                <hr className="my-6 border-gray-300" />

                {/* Service Details */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Details</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        {/* Changed text-right to text-left */}
                        <span className="w-40 text-left font-medium text-gray-700">Service Required :</span>
                        <input type="text" value={data.service} disabled className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium" />
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Changed text-right to text-left */}
                        <span className="w-40 text-left font-medium text-gray-700">Date :</span>
                        <input type="text" value={data.date} disabled className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium" />
                    </div>
                    <div className="flex items-start gap-3">
                        {/* Changed text-right to text-left */}
                        <span className="w-40 text-left font-medium text-gray-700">Photos :</span>
                        <div className="flex gap-2 items-center">
                            {data.images.map((img, index) => (
                                <img key={index} src={img} alt={`img-${index}`} className="w-20 h-16 rounded-md border border-gray-300 object-cover" />
                            ))}
                            <a href="#" className="text-teal-600 text-sm font-medium underline">View all</a>
                        </div>
                    </div>
                </div>

                {/* Button */}
                <div className="flex justify-center mt-8">
                    <button onClick={handleSettlePayment} className="px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition">
                        Settle Payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentProcess;