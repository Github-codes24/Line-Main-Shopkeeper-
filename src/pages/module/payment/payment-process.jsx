import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import {toast} from "react-toastify";
import conf from "../../../config";
import useFetch from "../../../hook/useFetch";
import image1 from "../../../assets/image1.png";
import image2 from "../../../assets/image2.png";
import image3 from "../../../assets/image3.png";

function PaymentProcess() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [fetchData] = useFetch();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [settleLoading, setSettleLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const SHOPKEEPER_ID = "68c3c3d0357c37bfad321962";

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                setLoading(true);
                const result = await fetchData({
                    method: "GET",
                    url: `${conf.apiBaseUrl}/shopkeeper/payments/${id}?shopkeeperId=${SHOPKEEPER_ID}`,
                });

                if (result && result.success) {
                    const paymentData = result.data;
                    const order = paymentData.order;
                    const payment = paymentData.payment;
                    const customer = order?.customer;

                    const formattedData = {
                        orderNumber: order?.orderId || "N/A",
                        customerName: customer?.name || "N/A",
                        phoneNumber: customer?.addresses?.[0]?.phone || "N/A",
                        address: customer?.addresses?.[0]?.fullAddress || "N/A",
                        email: customer?.contact || "N/A",
                        orderStatus: order?.orderStatus || "N/A",
                        service: order?.specificServiceName || "N/A",
                        date: new Date(order?.serviceDate || Date.now()).toLocaleDateString("en-IN"),
                        images: order?.initialRequestImages?.length
                            ? order.initialRequestImages
                            : [image1, image2, image3],
                        workerAssigned: order?.worker?.name || "N/A",
                        lastUpdate: new Date(order?.updatedAt || Date.now()).toLocaleDateString("en-IN"),
                        quotationStatus: order?.orderStatus || "N/A",
                        totalBill: order?.finalAmount ? `₹${order.finalAmount}` : "N/A",
                        paymentMethod: order?.paymentMethod || "N/A",
                        paymentStatus: order?.paymentStatus || "N/A",
                        amountStatus: payment?.amount ? `₹${(payment.amount / 100).toFixed(2)}` : "N/A",
                    };
                    setData(formattedData);

                    // Extract products from API and format them
                    if (order?.products && Array.isArray(order.products)) {
                        const formattedProducts = order.products.map((product) => ({
                            name: product.productName || "N/A",
                            details: product.productModel || "N/A",
                            qty: product.quantity || 0,
                        }));
                        setProducts(formattedProducts);
                    } else {
                        setProducts([]);
                    }
                } else {
                    throw new Error(result.message || "API request failed to get payment details");
                }
            } catch (error) {
                console.error("Failed to fetch payment details:", error);
                toast.error("Failed to load payment details");
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
            setSettleLoading(true);
            const payload = {
                shopkeeperId: SHOPKEEPER_ID,
                paymentId: id,
            };

            const result = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/payments/settle-payment`,
                data: payload,
                headers: {"Content-Type": "application/json"},
            });

            if (result.success) {
                toast.success(result.message || "Payment settled successfully! ✅");
                setTimeout(() => navigate("/payment"), 1500);
            } else {
                toast.error(result.message || "Failed to settle payment");
            }
        } catch (error) {
            console.error("Error settling payment:", error);
            toast.error("An error occurred while settling the payment");
        } finally {
            setSettleLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-lg text-gray-600">Loading payment details...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-lg text-red-500">Failed to load payment details. Please try again.</p>
                    <button
                        onClick={() => navigate("/payment")}
                        className="mt-4 px-6 py-2 bg-teal-700 text-white rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-[#E0E9E9] font-medium">
            <main className="flex-1 p-3 gap-2">
                <div className="flex flex-col md:flex-row justify-start items-center mb-4 shadow-xl bg-white border rounded-md p-3 gap-24">
                    <h1
                        className="text-lg md:text-xl font-semibold"
                        style={{
                            fontWeight: 500,
                            fontSize: "20px",
                            color: "rgba(51, 51, 51, 1)",
                        }}
                    >
                        Wallet
                    </h1>

                    <div className="relative w-full sm:w-96">
                        <FaSearch className="absolute left-4 inset-y-0 text-[#0D2E28]" />
                        <input
                            type="text"
                            placeholder="Search worker name here..."
                            className="w-full h-5 pl-10 pr-4 py-2 border border-teal-500 rounded-full bg-[#E0E9E9] outline-none shadow-sm focus:border-teal-600 
                             text-[#0D2E28] text-base font-medium font-poppins placeholder:text-[#0D2E28]"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-bold text-[#0D2E28] text-lg">Order Number :</span>
                        <span className="px-4 py-1 bg-gray-100 border border-teal-600 rounded-md font-bold text-gray-900">
                            {data.orderNumber}
                        </span>
                    </div>

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

                    <div className="mt-6 mb-6"></div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quotation Details</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-40 text-left font-medium text-gray-700">Worker Assigned:</span>
                            <input
                                type="text"
                                value={data.workerAssigned}
                                disabled
                                className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-40 text-left font-medium text-gray-700">Last Update :</span>
                            <input
                                type="text"
                                value={data.lastUpdate}
                                disabled
                                className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-40 text-left font-medium text-gray-700">Quotation status :</span>
                            <input
                                type="text"
                                value={data.quotationStatus}
                                disabled
                                className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4"></div>
                    <div style={{display: "inline-block"}}>
                        <table className="border-collapse" style={{borderColor: "#01050bff"}}>
                            <thead>
                                <tr>
                                    <th
                                        className="border text-left px-4 py-3"
                                        style={{
                                            borderColor: "#020b18ff",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            color: "#374151",
                                        }}
                                    >
                                        Product Name
                                    </th>
                                    <th
                                        className="border text-left px-4 py-3"
                                        style={{
                                            borderColor: "#01070fff",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            color: "#374151",
                                        }}
                                    >
                                        Details
                                    </th>
                                    <th
                                        className="border text-left px-4 py-3"
                                        style={{
                                            borderColor: "#020a16ff",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            color: "#374151",
                                        }}
                                    >
                                        Qty
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.length > 0 ? (
                                    products.map((product, index) => (
                                        <tr key={index} style={{backgroundColor: "#FFFFFF"}}>
                                            <td
                                                className="border px-4 py-3"
                                                style={{
                                                    borderColor: "#000812ff",
                                                    fontSize: "14px",
                                                    color: "#374151",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {product.name}
                                            </td>
                                            <td
                                                className="border px-4 py-3"
                                                style={{
                                                    borderColor: "#00040aff",
                                                    fontSize: "14px",
                                                    color: "#374151",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {product.details}
                                            </td>
                                            <td
                                                className="border px-4 py-3"
                                                style={{
                                                    borderColor: "#010a17ff",
                                                    fontSize: "14px",
                                                    color: "#374151",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {product.qty}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="border px-4 py-3 text-center"
                                            style={{
                                                borderColor: "#01050bff",
                                                fontSize: "14px",
                                                color: "#9CA3AF",
                                            }}
                                        >
                                            No products available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <hr className="my-6 border-gray-300" />

                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="w-40 text-left font-medium text-gray-700">Total Bill :</span>
                            <input
                                type="text"
                                value={data.totalBill}
                                disabled
                                className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-40 text-left font-medium text-gray-700">Payment Method :</span>
                            <input
                                type="text"
                                value={data.paymentMethod}
                                disabled
                                className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-40 text-left font-medium text-gray-700">Payment status :</span>
                            <input
                                type="text"
                                value={data.paymentStatus}
                                disabled
                                className="flex-1 px-4 py-1 border border-teal-600 rounded-md bg-gray-100 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={handleSettlePayment}
                            disabled={settleLoading}
                            style={{
                                backgroundColor: settleLoading ? "#9CA3AF" : "#0D7377",
                                color: "#FFFFFF",
                                padding: "10px 24px",
                                borderRadius: "6px",
                                border: "none",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: settleLoading ? "not-allowed" : "pointer",
                                transition: "background-color 0.2s",
                            }}
                        >
                            {settleLoading ? "Processing..." : "Settle Payment"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PaymentProcess;
