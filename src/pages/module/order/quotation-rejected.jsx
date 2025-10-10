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

const QuotationRejected = () => {
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
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <div className="bg-white shadow rounded-lg px-4 py-3 flex items-center space-x-4">
                <IoArrowBackCircleOutline
                    className="text-4xl text-[#0D2E28] cursor-pointer hover:text-[#007E74] transition"
                    onClick={() => navigate(-1)}
                />
                <h2 className="text-2xl font-medium text-[#0D2E28]">Order Details</h2>
            </div>

            {/* Main Content */}
            <div className="mt-4 flex flex-col bg-white shadow rounded-lg p-4 h-[calc(100vh-5rem)]">
                <div className="flex-1 overflow-y-auto space-y-6">
                    {/* Order Info */}
                    <LabelInput label="Order Number" value={getOrderById?.orderId} />

                    {/* Customer Details */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Customer Details</h3>
                        <div className="space-y-3">
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
                            <LabelInput label="Order Status" value={getOrderById?.orderStatus} color="#EC2D01" />
                        </div>
                    </div>

                    <hr className="border-gray-300" />

                    {/* Service Details */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Service Details</h3>
                        <div className="space-y-3">
                            <LabelInput label="Service Required" value={getOrderById?.specificServiceName} />
                            <LabelInput label="Date" value={getOrderById?.serviceDate} />
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <label className="font-medium sm:w-36">Photos</label>
                                <span className="font-medium sm:mx-2">:</span>
                                <img
                                    src={getOrderById?.initialRequestImages}
                                    alt="service"
                                    className="w-36 h-36 mt-2 sm:mt-0 object-cover border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-300" />

                    {/* Work Details */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Work Details</h3>
                        <div className="space-y-3">
                            <LabelInput label="Worker Assigned" value={getOrderById?.worker?.name || "NA"} />
                            <LabelInput label="Last Updated" value={getOrderById?.updatedAt} />
                            <LabelInput label="Quotation Status" value="Rejected" color="#EC2D01" />
                            <LabelInput label="Reason" value={getOrderById?.rejectionReason} />
                        </div>

                        {/* Product Table */}
                        <div className="overflow-x-auto mt-4">
                            <div className="min-w-[500px] p-4 border border-gray-300 rounded-lg">
                                <p className="text-lg font-semibold mb-1">{getOrderById?.customer?.name}</p>
                                <p className="text-sm -mt-1 mb-2">{getOrderById?.deliveryAddress?.phone}</p>
                                <div className="flex justify-between -mt-3 -mb-2 text-sm font-medium">
                                    <p>Quotation No: 1</p>
                                    <p>{getOrderById?.createdAt}</p>
                                </div>
                                <table className="w-full table-auto border border-gray-300 text-sm mt-2">
                                    <thead className="bg-gray-100">
                                        <tr className="border-b">
                                            <th className="p-2 text-left">#</th>
                                            <th className="p-2 text-left">Products</th>
                                            <th className="p-2 text-right">Price</th>
                                            <th className="p-2 text-right">Qty</th>
                                            <th className="p-2 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getOrderById?.products.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2">{item.productName}</td>
                                                <td className="p-2 text-right">
                                                    {item.priceAtPurchase.toLocaleString()}
                                                </td>
                                                <td className="p-2 text-right">{item.quantity}</td>
                                                <td className="p-2 text-right">
                                                    {calculateAmount(
                                                        item.priceAtPurchase,
                                                        item.quantity
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="font-semibold bg-gray-50 border-t">
                                            <td colSpan="4" className="p-2 text-right">
                                                Final Amount
                                            </td>
                                            <td className="p-2 text-right">
                                                {getOrderById?.totalProductCost.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable LabelInput
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

export default QuotationRejected;
