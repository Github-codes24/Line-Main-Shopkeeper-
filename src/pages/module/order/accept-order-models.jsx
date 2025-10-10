import React, {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import W_img from "../../../assets/Frame 1261155429.jpg";
import useDropdown from "../../../hook/dropdown/useDropdown";
import UseOrder from "../../../hook/order/UseOrder";

const AcceptOrderModels = ({isOpen, onClose, orderId, id}) => {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [expertise, setExpertise] = useState("");
    const [worker, setWorker] = useState("");
    const [showExpertiseList, setShowExpertiseList] = useState(false);
    const [showWorkerList, setShowWorkerList] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef(null);

    //--------------------------------my changes-------------------------------------------------
    const {getExperties, fetchExperties, getWorker, fetchWorker} = useDropdown();
    const {acceptOrder} = UseOrder();

    useEffect(() => {
        fetchExperties();
    }, []);

    const handleAcceptOrder = () => {
        acceptOrder(id, worker);
    };

    //---------------------------------------------------------------------------------------------

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // close modal when clicked outside
            }
            if (!event.target.closest(".dropdown")) {
                setShowExpertiseList(false);
                setShowWorkerList(false);
            }
        };

        const handleEscKey = (event) => {
            if (event.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            {/* Step 1: Order Accepted Modal */}
            {!showAssignModal && (
                <div
                    ref={modalRef}
                    className="bg-white rounded-2xl shadow-xl px-8 py-6 w-[320px] text-center border border-[#D9F1EB]"
                >
                    <div className="flex justify-center mb-4">
                        <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" width="80" height="80" rx="40" fill="#007E74" />
                            <path
                                d="M33.2273 51.6418L23.6818 39.1045L20.5 43.2836L33.2273 60L60.5 24.1791L57.3182 20L33.2273 51.6418Z"
                                fill="#56EB54"
                            />
                        </svg>
                    </div>

                    <p className="text-[#1D4865] font-medium mb-1">Order Accepted.</p>
                    <p className="text-[#1D4865] font-medium">
                        Order Id - <br />
                        <span className="font-bold">{orderId}</span>
                    </p>

                    <button
                        onClick={() => setShowAssignModal(true)}
                        className="mt-5 w-full bg-[#007E74] text-white py-2 rounded-lg font-medium hover:bg-[#00685f] transition"
                    >
                        Proceed to Assign Worker
                    </button>
                </div>
            )}

            {/* Step 2: Assign Worker Modal */}
            {showAssignModal && (
                <div ref={modalRef} className="bg-white shadow-xl rounded-2xl border border-[#D9F1EB] w-[465px] p-8">
                    {/* Expertise Row */}
                    <div className="flex items-center mb-4">
                        <label className="text-[#0D2E28] font-medium w-28">Expertise</label>
                        <span className="font-medium text-[#0D2E28] mr-2">:</span>
                        <select
                            className="border border-[#19A699] rounded-md px-4 py-2 bg-[#F5FFFF] text-[#0D2E28] w-full focus:outline-none focus:ring-2 focus:ring-[#007E74]"
                            value={expertise}
                            onChange={(e) => {
                                const selectedExpertise = e.target.value;
                                setExpertise(selectedExpertise);
                                if (selectedExpertise) {
                                    fetchWorker(selectedExpertise);
                                }
                            }}
                        >
                            <option value="">Select Expertise...</option>
                            {getExperties && getExperties.length > 0 ? (
                                getExperties.map((opt) => (
                                    <option key={opt._id} value={opt.name}>
                                        {opt.tabName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </div>

                    {/* Worker Row */}
                    <div className="flex items-center mb-6">
                        <label className="text-[#0D2E28] font-medium w-28">Worker</label>
                        <span className="font-medium text-[#0D2E28] mr-2">:</span>
                        <select
                            className={`border border-[#19A699] rounded-md px-4 py-2 bg-[#F5FFFF] text-[#0D2E28] w-full focus:outline-none focus:ring-2 focus:ring-[#007E74] ${
                                !expertise ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                            value={worker}
                            onChange={(e) => setWorker(e.target.value)}
                            disabled={!expertise}
                        >
                            <option value="">Select Worker...</option>
                            {getWorker && getWorker.length > 0 ? (
                                getWorker
                                .filter((w) => !expertise || w.experties === expertise)
                                .map((w) => (
                                    <option key={w._id} value={w._id}>
                                        {w.name} — {w.experties}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No workers available</option>
                            )}
                        </select>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-center gap-6 mt-4">
                        <button
                            onClick={onClose}
                            className="px-10 py-2 border border-[#007E74] text-[#007E74] rounded-lg bg-[#D9F1EB] font-semibold hover:bg-[#cde9e3] transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleAcceptOrder();
                                setShowAssignModal(false);
                                navigate("/order-management");
                            }}
                            className="px-10 py-2 bg-[#007E74] text-white rounded-lg font-semibold hover:bg-[#00685f] transition"
                        >
                            Assign
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcceptOrderModels;
