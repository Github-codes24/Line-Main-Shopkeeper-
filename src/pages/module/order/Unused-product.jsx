// UnusedProduct.jsx
import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ServiceImg from "../../../assests/Frame 1261155363.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UnusedProduct = () => {
  const navigate = useNavigate();
  const { orderId } = useParams(); // ✅ Get orderId from route param
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch API Data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `https://linemen-be-1.onrender.com/shopkeeper/orders/${orderId}`
        );
        if (res.data.success && res.data.orders.length > 0) {
          setOrder(res.data.orders[0]);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const calculateAmount = (price, qty) => price * qty;

  if (loading) return <p className="p-6 text-center">Loading order...</p>;
  if (!order) return <p className="p-6 text-center text-red-500">Order not found.</p>;

  // Example fallback products until API gives price details
  const products = order.products || [];
  const total = products.reduce(
    (sum, item) => sum + calculateAmount(item.price || 0, item.quantity),
    0
  );

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-3">
        <div className=" bg-white shadow-sm rounded-lg px-3 py-2">
          <div className="flex items-center space-x-4">
            <IoArrowBackCircleOutline className="text-4xl text-[#0D2E28]" />
            <h2 className="text-2xl font-medium text-[#0D2E28] mt-1">
              Order Details
            </h2>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-3 mt-3 flex flex-col h-[100vh]">
          <div className="border-1 border-[#999999] rounded-md px-14 py-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
            {/* Order Number */}
            <div>
              <span className="font-extrabold text-lg">Order Number</span>
              <span className="font-medium pl-8 pr-3">:</span>
              <input
                className="w-80 border-1 font-extrabold border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg ml-2"
                readOnly
                value={order.orderId}
              />
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="font-bold text-lg">Customer Details</h3>
              <div className="mt-2 space-y-4">
                <LabelInput label="Customer Name" value={order.customer?.name} />
                <LabelInput label="Phone Number" value={order.customer?.contact} />
                <LabelInput label="Email Id" value={order.customer?.contact} />
                <div className="flex items-center space-x-2">
                  <label className="font-medium w-30 pr-14">Order Status</label>
                  <span className="font-medium px-2">:</span>
                  <input
                    className="border-1 border-[#007E74] bg-[#E0E9E9] px-3 py-1 rounded-lg w-80"
                    style={{
                      backgroundColor: "#E0E9E9",
                      color: order.orderStatus === "Completed" ? "#34C759" : "#FFCC00",
                    }}
                    readOnly
                    value={order.orderStatus}
                  />
                </div>
              </div>
            </div>

            <hr className="max-w-2xl text-black" />

            {/* Service Details */}
            <div>
              <h3 className="font-bold text-lg">Service Details</h3>
              <div className="mt-2 space-y-4">
                <LabelInput
                  label="Service Required"
                  value={order.specificServiceName}
                />
                <LabelInput
                  label="Date"
                  value={new Date(order.serviceDate).toLocaleDateString()}
                />
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
                  <h2 className="text-base font-medium mb-4 ">
                    Product List <span className="font-medium px-16">:</span>
                  </h2>
                  <table className="w-5/12 table-auto border-1 border-black text-sm text-left">
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
                          <td className="px-2 py-1">{item.productId}</td>
                          <td className="px-2 py-1">{item.price || "-"}</td>
                          <td className="px-2 py-1">{item.quantity}</td>
                          <td className="px-2 py-1">
                            {calculateAmount(item.price || 0, item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t font-semibold">
                        <td colSpan="1" className="p-2 text-left">
                          Final Amount
                        </td>
                        <td colSpan="4" className="p-2 text-center">
                          {total.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center space-x-5 mt-6">
            <button
              onClick={() => navigate("/upload-bill")}
              className="px-10 py-2 border-1 bg-[#007E74] text-white font-medium rounded-lg"
            >
              Settle Payment
            </button>
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
      value={value || "-"}
    />
  </div>
);

export default UnusedProduct;
