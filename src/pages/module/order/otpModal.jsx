import React from 'react';
import { useNavigate } from 'react-router-dom';

const OtpModal = ({ show, onClose, setShow }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFFFF] bg-opacity-10">
      <div className="bg-white p-8 rounded-2xl border-1 border-[#D9F1EB] shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#0D2E28] mb-4">Verify OTP</h2>
        <p className="text-xl text-center text-[#616666] mb-6">Enter the OTP provided by worker</p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {Array(6).fill(0).map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              className="w-10 h-10 text-center border-2 border-[#007E74] bg-[#F5FFFF] rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => {
              setShow(false);
              onClose?.(); // optional chaining
            }}
            className="w-full py-2.5 rounded-lg border-1 border-[#007E74] bg-[#D9F1EB] text-[#007E74] font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShow(false);
              navigate('/order-processing');
            }}
            className="w-full py-2.5 rounded-lg bg-[#007E74] text-white font-medium"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
