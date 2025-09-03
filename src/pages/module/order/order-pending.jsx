import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ServiceImg from "../../../assets/Frame 1261155363.jpg";
import AcceptOrderModels from "./accept-order-models";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const products = [
  { name: "PVC Wire", price: 400, qty: 1 },
  { name: "LED Light", price: 80, qty: 5 },
  { name: "Switches", price: 10, qty: 7 },
  { name: "Connector", price: 400, qty: 1 },
  { name: "LED light", price: 120, qty: 3 },
];


const calculateAmount = (price, qty) => price * qty;
const total = products.reduce((sum, item) => sum + calculateAmount(item.price, item.qty), 0);

  
// SuccessModal
const SuccessModal = ({ isOpen, onClose }) => {
   const { id } = useParams();
  const bookingId = '#12486'
  if (!isOpen) return null;
 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 z-50">
      <div className="bg-[#F2F5F6] rounded-xl p-6 text-center shadow-md w-[350px]">
        <div className="flex justify-center mb-4">
          <div className="bg-[#003366] rounded-full p-2">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="80" rx="40" fill="#003366" />
              <path d="M32.7273 51.6418L23.1818 39.1045L20 43.2836L32.7273 60L60 24.1791L56.8182 20L32.7273 51.6418Z" fill="#56EB54" />
            </svg>
          </div>
        </div>
        <p className="text-lg text-[#1D4865] font-medium">
          You have rejected booking <br />
          successfully.
        </p>
        <p className="text-lg text-[#1D4865] font-semibold -mt-4">
          Booking Id-{bookingId}
        </p>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-[#007E74] text-white font-semibold rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// OrderDeatils
const OrderPending = ({ showButtons = true, customButtons = null, orderStatus = "Pending", orderStatusColor = "#FFCC00", customAdditionalDetails = null }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const navigate = useNavigate();
  const orderId = 'ORD8468163287164';
  // const orderStatus = "Pending"
  

  const handleRejectConfirm = () => {
    setShowModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className=" bg-white shadow-sm rounded-lg px-3 py-2">
        <div className="flex items-center space-x-4">
          <IoArrowBackCircleOutline 
                     className="text-4xl text-[#0D2E28] cursor-pointer hover:text-[#007E74]"
                     onClick={() => navigate(-1)}  
                   />
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

          {/* {Otp && (
            <div className="mt-6">
              {Otp}
            </div>
          )} */}

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
                  style={{ backgroundColor: '#E0E9E9', color: orderStatusColor }}
                  readOnly
                  value={orderStatus}
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
                        <td className="px-2 py-1">{item.name}</td>
                        <td className="px-2 py-1">{item.price}</td>
                        <td className="px-2 py-1">{item.qty}</td>
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
          {customAdditionalDetails && (
            <div className="mt-6">
              {customAdditionalDetails}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showButtons && (
          <div className="flex justify-center space-x-5 mt-6">
            {customButtons ? (
              customButtons
            ) : (
              <>
                <button
                  className="px-10 py-2 border-1 bg-[#D9F1EB] border-[#007E74] font-medium text-[#007E74] rounded-lg"
                  onClick={() => setShowModal(true)}
                >
                  Reject Order
                </button>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="px-10 py-2 bg-[#007E74] text-white font-medium rounded-md"
                >
                  Accept Order
                </button>
              </>
            )}
          </div>
        )}

      </div>

      {/* Reject Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[700px] border border-blue-500">
            <h2 className="text-2xl font-bold text-center text-[#0D2E28] mb-6">Reject Order</h2>
            <div className="mb-6 flex items-center space-x-10">
              <label htmlFor="reason" className="font-medium text-black w-60">Reject Reason :</label>
              <input
                type="text"
                id="reason"
                placeholder="Reject Reason....."
                className="flex-1 border-1 border-[#19A699] bg-[#F5FFFF] rounded-lg px-4 py-2 text-gray-700"
              />
            </div>
            <p className="text-center text-lg text-[#616666] mb-6">
              Are you sure you want to reject order?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-14 py-2 bg-[#D9F1EB] text-[#007E74] border-1 border-[#007E74] rounded-md font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-14 py-2 bg-[#007E74] text-white rounded-md font-medium"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        bookingId="12486"
      />

      {/* Assign Modal */}
      <AcceptOrderModels isOpen={showAssignModal} onClose={() => setShowAssignModal(false)} orderId={orderId} />
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

export default OrderPending;
