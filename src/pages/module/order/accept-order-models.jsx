import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import W_img from '../../../assets/Frame 1261155429.jpg';

const AcceptOrderModals = ({ isOpen, onClose, orderId }) => {
    //   const [showRejectedModal, setShowRejectedModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    //   const bookingId = '#12486';
    const [expertise, setExpertise] = useState('');
    const [worker, setWorker] = useState('');
    const [showExpertiseList, setShowExpertiseList] = useState(false);
    const [showWorkerList, setShowWorkerList] = useState(false);
    const navigate = useNavigate();

    const [expertiseOptions] = useState([
        'Electrician',
        'Plumber',
        'AC Repairer',
        'Painter',
        'Carpenter',
    ]);

    const [workerOptions] = useState([
        { name: 'Niranjankumar Kalantri', role: 'Electrician', img: W_img },
        { name: 'Niranjankumar Kalantri', role: 'Electrician', img: W_img },
        { name: 'Niranjankumar Kalantri', role: 'Electrician', img: W_img },
    ]);



    //   if (!showAssignModal) return null;
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-10 shadow-sm">

            {/* Trigger Buttons (for demo/testing purpose) */}
            {/* <div className="space-x-4 mb-8">
        <button onClick={() => setShowRejectedModal(true)} className="bg-red-500 text-white px-4 py-2 rounded">
          Reject Booking
        </button>
        <button onClick={() => setShowAssignModal(true)} className="bg-green-500 text-white px-4 py-2 rounded">
          Proceed to Assign Worker
        </button>
      </div> */}

            {/* ✅ Rejected Modal */}
            {/* {showRejectedModal && (
        <div className="bg-white rounded-xl shadow-xl p-6 w-[300px] text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#003366] rounded-full p-3">
              <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p className="text-gray-700 mb-1">You have rejected booking successfully.</p>
          <p className="text-gray-700">Booking Id - <span className="font-medium">{bookingId}</span></p>
          <button
            onClick={() => setShowRejectedModal(false)}
            className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
          >
            OK
          </button>
        </div>
      )} */}

            {/* Step 1: Order Accepted Modal */}
            {!showAssignModal && (
                <div className="bg-white rounded-xl shadow-xl p-6 w-[320px] text-center border border-[#D9F1EB]">
                    <div className="flex justify-center mb-4">
                        <div className="">
                            <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" width="80" height="80" rx="40" fill="#007E74" />
                                <path d="M33.2273 51.6418L23.6818 39.1045L20.5 43.2836L33.2273 60L60.5 24.1791L57.3182 20L33.2273 51.6418Z" fill="#56EB54" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-[#1D4865] font-medium mb-1">Order Accepted.</p>
                    <p className="text-[#1D4865] font-medium">
                        Order Id - <br /><span className="font-bold">{orderId}</span>
                    </p>
                    <button
                        onClick={() => setShowAssignModal(true)}
                        className="mt-4 w-full bg-[#007E74] text-[#FFFFFF] py-2 rounded-lg font-medium"
                    >
                        Proceed to Assign Worker
                    </button>
                </div>
            )}

            {/* Step 2: Assign Worker Modal */}
            {showAssignModal && (
                <div className="w-450 mt-10 p-8 bg-white shadow-xl rounded-2xl border-1 border-[#D9F1EB]">
                    <div className="space-y-4">
                        {/* Expertise Dropdown */}
                        <div className='flex items-center space-x-4'>
                            <label className="text-black font-medium w-20">Expertise</label>
                            <span className='font-medium text-[#0D2E28] pr-2'>:</span>
                            <div
                                className="relative mt-2 cursor-pointer"
                                onClick={() => setShowExpertiseList(!showExpertiseList)}
                            >
                                <div className="w-[450px] border-1 border-[#19A699] rounded-md px-4 py-2 bg-[#F5FFFF] text-[#616666]">
                                    {expertise || 'Select Expertise...'}
                                </div>
                                {showExpertiseList && (
                                    <div className="absolute z-10 mt-0 w-full bg-white border-2 border-[#D9F1EB] rounded-2xl shadow-md max-h-48 overflow-auto scrollbar-hide">
                                        {expertiseOptions.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                className="px-4 py-2.5 hover:bg-[#F0F0F0] cursor-pointer text-[#0D2E28] font-medium"
                                                onClick={() => {
                                                    setExpertise(opt);
                                                    setShowExpertiseList(false);
                                                }}
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Worker Dropdown */}
                        <div className='flex items-center space-x-4'>
                            <label className="text-black font-medium w-20">Worker</label>
                            <span className='font-medium text-[#0D2E28] pr-2'>:</span>
                            <div
                                className="relative mt-2 cursor-pointer"
                                onClick={() => setShowWorkerList(!showWorkerList)}
                            >
                                <div className="w-[450px] border-1 border-[#19A699] rounded-md px-4 py-2 bg-[#F5FFFF] text-[#616666]">
                                    {worker || 'Select Worker...'}
                                </div>
                                {showWorkerList && (
                                    <div className="absolute z-10 mt-0 p-1 w-full bg-white border-1 border-[#D9F1EB] rounded-2xl shadow-md max-h-64 overflow-auto scrollbar-hide">
                                        {workerOptions.map((w, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center px-4 py-2 cursor-pointer"
                                                onClick={() => {
                                                    setWorker(w.name);
                                                    setShowWorkerList(false);
                                                }}
                                            >
                                                <img src={w.img} alt="worker" className="w-10 h-10 rounded-full mr-3" />
                                                <div className=''>
                                                    <p className="font-normal text-sm text-[#4C4C4C] mb-1">{w.name}</p>
                                                    <p className="text-xs font-medium text-[#000000]">{w.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center space-x-5 pt-4">
                            <button
                                onClick={() => {
                                    setShowAssignModal(false);
                                    onClose();
                                }}
                                className="px-20 py-2 border-1 border-[#007E74] text-[#007E74] rounded-lg bg-[#D9F1EB] font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                className="px-20 py-2 bg-[#007E74] text-white rounded-lg font-semibold"
                                onClick={() => {
                                    setShowAssignModal(false); // Close modal
                                    navigate('/order-management'); // Navigate to processing page
                                }}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcceptOrderModals;
