import React, {useEffect, useState} from "react";
import {IoArrowBackCircleOutline} from "react-icons/io5";
import ServiceImg from "../../../assets/Frame 1261155363.jpg";
import {useNavigate, useParams} from "react-router-dom";
import UseOrder from "../../../hook/order/UseOrder";

const products = [
    {name: "PVC Wire", price: 400, qty: 1},
    {name: "LED Light", price: 80, qty: 5},
    {name: "Switches", price: 10, qty: 7},
    {name: "Connector", price: 400, qty: 1},
    {name: "LED light", price: 120, qty: 3},
];

const calculateAmount = (price, qty) => price * qty;
const total = products.reduce((sum, item) => sum + calculateAmount(item.price, item.qty), 0);

const QuotationWaiting = () => {
    const navigate = useNavigate();
    const orderId = "ORD8468163287164";

    //-------------------------my changes------------------------------------------------------
    const {id} = useParams();
    const {getOrderById, fetchOrderById} = UseOrder();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchOrderById(id);
    }, [id]);

    //----------------------------------------------------------------------------------------

    return (
        <div className="min-h-screen bg-gray-100 p-3">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg px-3 py-2">
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
                <div className="border border-gray-300 rounded-md px-10 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
                    {/* Order ID */}
                    <div className="flex items-center">
                        <span className="font-extrabold text-lg w-44">Order Number</span>
                        <span className="font-medium pr-3">:</span>
                        <input
                            className="w-80 border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-md font-semibold"
                            readOnly
                            value={getOrderById?.orderId}
                        />
                    </div>

                    {/* Customer Details */}
                    <section>
                        <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">Customer Details</h3>
                        <div className="space-y-4">
                            <LabelInput label="Customer Name" value={getOrderById?.customer?.name} />
                            {getOrderById?.customer?.contact ? (
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getOrderById.customer.contact) ? (
                                    <LabelInput label="Email Id" value={getOrderById.customer.contact} />
                                ) : /^\+?\d{10,15}$/.test(getOrderById.customer.contact) ? (
                                    <LabelInput label="Phone Number" value={getOrderById.customer.contact} />
                                ) : (
                                    <LabelInput label="Contact" value={getOrderById.customer.contact} />
                                )
                            ) : (
                                <LabelInput label="Contact" value="N/A" />
                            )}
                            <LabelInput label="Address" value={getOrderById?.deliveryAddress?.fullAddress} />
                            <LabelInput
                                label="Order Status"
                                value={getOrderById?.orderStatus}
                                textColor="text-[#0088FF]"
                            />
                        </div>
                    </section>

                    {/* Service Details */}
                    <section>
                        <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">Service Details</h3>
                        <div className="space-y-4">
                            <LabelInput label="Service Required" value={getOrderById?.specificServiceName} />
                            <LabelInput label="Date" value={getOrderById?.serviceDate} />
                            <div className="flex items-start">
                                <label className="font-medium w-40">Photos</label>
                                <span className="font-medium pr-2">:</span>
                                <img
                                    src={getOrderById?.initialRequestImages}
                                    alt="service"
                                    className="w-20 h-20 ml-2 object-cover border border-[#007E74] rounded-md"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Work Details */}
                    <section>
                        <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">Work Details</h3>
                        <div className="space-y-4">
                            <LabelInput label="Worker Assigned" value={getOrderById?.worker?.name} />
                            <LabelInput label="Last Updated" value={getOrderById?.updatedAt} />
                            <LabelInput
                                label="Quotation Status"
                                value="Pending For user Approval"
                                textColor="text-[#FFCC00]"
                            />
                        </div>

                        {/* Product Table */}
                        <div className="flex flex-col mt-6">
                            <div className="border border-black rounded-md p-4 w-fit bg-[#FAFAFA]">
                                <div className="mb-2">
                                    <p className="text-lg font-semibold text-gray-800">
                                        {getOrderById?.customer?.name}
                                    </p>
                                    <p className="text-sm text-gray-600 -mt-1">
                                        {getOrderById?.deliveryAddress?.phone}
                                    </p>
                                    <div className="flex justify-between text-sm mt-1 font-medium text-gray-700">
                                        <p>Quotation No: 1</p>
                                        <p>{getOrderById?.createdAt}</p>
                                    </div>
                                </div>

                                {/* Horizontal Scroll Wrapper */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-[600px] border border-black text-sm text-left mt-2">
                                        <thead className="bg-[#E0E9E9] border-b border-black">
                                            <tr>
                                                <th className="p-2 border-r border-black">#</th>
                                                <th className="p-2 border-r border-black">Products</th>
                                                <th className="p-2 border-r border-black">Price</th>
                                                <th className="p-2 border-r border-black">Qty</th>
                                                <th className="p-2">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getOrderById?.products.map((item, index) => (
                                                <tr key={index} className="border-t border-black hover:bg-gray-50">
                                                    <td className="p-2 border-r border-black">{index + 1}</td>
                                                    <td className="p-2 border-r border-black">{item.productName}</td>
                                                    <td className="p-2 border-r border-black">
                                                        {item.priceAtPurchase}
                                                    </td>
                                                    <td className="p-2 border-r border-black">{item.quantity}</td>
                                                    <td className="p-2">
                                                        {calculateAmount(item.priceAtPurchase, item.quantity)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-[#F4F4F4] border-t border-black font-semibold">
                                            <tr>
                                                <td colSpan="4" className="p-2 text-right border-r border-black">
                                                    Final Amount
                                                </td>
                                                <td className="p-2">
                                                    {getOrderById?.totalProductCost.toLocaleString()}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/* ✅ Verify OTP Button - OUTSIDE BORDER */}
                <div className="flex justify-center mt-6 pb-6">
                    <button
                        className="bg-[#007E74] hover:bg-[#005f56] text-white font-semibold px-8 py-2 rounded-lg shadow-md transition-all duration-300"
                        onClick={() => navigate("/orders/verifyotp/")}
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

const LabelInput = ({label, value, textColor}) => (
    <div className="flex items-center">
        <label className="font-medium w-40">{label}</label>
        <span className="font-medium">:</span>
        <input
            type="text"
            className={`border border-[#007E74] ml-4 bg-[#E0E9E9] px-3 py-1 rounded-md w-80 font-semibold ${textColor}`}
            readOnly
            value={value}
        />
    </div>
);

export default QuotationWaiting;
