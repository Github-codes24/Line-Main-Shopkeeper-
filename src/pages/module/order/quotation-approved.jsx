import React, {useEffect} from "react";
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

const QuotationApproved = () => {
    const navigate = useNavigate();
    const orderId = "ORD8468163287164";

    //--------------------------my changes-------------------------------------------------
    const {id} = useParams();
    const {getOrderById, fetchOrderById, uploadFinalBill} = UseOrder();

    useEffect(() => {
        fetchOrderById(id);
    }, [id]);

    const handelUploadFinalBill = (orderId) => {
        uploadFinalBill(orderId);
    };

    //-------------------------------------------------------------------------------------

    return (
        <div className="min-h-screen bg-gray-100 p-3">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg px-3 py-3">
                <div className="flex items-center space-x-4">
                    <IoArrowBackCircleOutline
                        className="text-4xl text-[#0D2E28] cursor-pointer hover:text-[#007E74]"
                        onClick={() => navigate(-1)}
                    />
                    <h2 className="text-2xl font-semibold text-[#0D2E28] mt-1">Order Details</h2>
                </div>
            </div>

            {/* Main Section */}
            <div className="flex flex-col bg-white shadow-sm rounded-lg p-4 mt-3 h-[calc(100vh-1rem)]">
                <div className="border border-gray-300 rounded-md px-5 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
                    {/* Order Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-bold text-lg">Order Number</span>
                        <span className="font-medium">:</span>
                        <input
                            className="border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-md font-semibold w-full sm:w-80"
                            readOnly
                            value={getOrderById?.orderId}
                        />
                    </div>

                    {/* Customer Details */}
                    <Section title="Customer Details">
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

                        <LabelInput label="Order Status" value={getOrderById?.orderStatus} color="#0088FF" />
                    </Section>

                    {/* Service Details */}
                    <Section title="Service Details">
                        <LabelInput label="Service Required" value={getOrderById?.specificServiceName} />
                        <LabelInput label="Date" value={getOrderById?.serviceDate} />
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <label className="font-medium sm:w-40">Photos</label>
                            <span className="font-medium sm:mx-2">:</span>
                            <img
                                src={getOrderById?.initialRequestImages}
                                alt="service"
                                className="w-36 h-36 mt-2 sm:mt-0 border border-[#007E74] rounded-md object-cover"
                            />
                        </div>
                    </Section>

                    {/* Work Details */}
                    <Section title="Work Details">
                        <LabelInput label="Worker Assigned" value={getOrderById?.worker?.name} />
                        <LabelInput label="Last Updated" value={getOrderById?.updatedAt} />
                        <LabelInput
                            label="Quotation Status"
                            value={getOrderById?.paymentStatus || "-"}
                            color="#34C759"
                        />

                        {/* Product Table */}
                        <div className="mt-4 border border-black rounded-md bg-[#FAFAFA] p-4">
                            <div className="flex flex-col mb-3">
                                <p className="text-lg font-semibold text-gray-800">
                                    {getOrderById?.customer?.name || "NA"}
                                </p>
                                <p className="text-sm text-gray-600 -mt-1">{getOrderById?.deliveryAddress?.phone}</p>
                                <div className="flex justify-between text-sm font-medium text-gray-700">
                                    <p>Quotation No: 1</p>
                                    <p>{getOrderById?.createdAt}</p>
                                </div>
                            </div>

                            {/* Horizontally Scrollable Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-[600px] w-full border border-black text-sm text-left">
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
                                                <td className="p-2 border-r border-black">{item.priceAtPurchase}</td>
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
                                            <td className="p-2">{getOrderById?.finalAmount.toLocaleString()}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </Section>

                    {/* Payment Details */}
                    <Section title="Payment Details">
                        <LabelInput label="Total Bill" value={getOrderById?.finalAmount} />
                        <LabelInput label="Payment Method" value={getOrderById?.paymentMethod || "-"} />
                        <LabelInput label="Payment Status" value={getOrderById?.paymentStatus || "-"} color="#34C759" />
                        <LabelInput
                            label="Customer Feedback"
                            value={getOrderById?.workDoneConformationByCustomer || "-"}
                            // color="#FFCC00"
                        />
                    </Section>
                </div>

                {/* Action Button */}
                <div className="flex justify-center mt-4">
                    <button
                        className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-md hover:bg-[#00665e] transition-all"
                        onClick={() => navigate("/orders/uploadbill/")}
                    >
                        Upload Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ---------- Reusable Components ---------- */

// Section Wrapper with underline heading
const Section = ({title, children}) => (
    <div>
        <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-1">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

// Input Label Pair
const LabelInput = ({label, value, color}) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <label className="font-medium sm:w-40">{label}</label>
        <span className="font-medium">:</span>
        <input
            type="text"
            className="border border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-md flex-1 sm:w-80 font-medium"
            style={color ? {color} : {}}
            readOnly
            value={value}
        />
    </div>
);

export default QuotationApproved;
