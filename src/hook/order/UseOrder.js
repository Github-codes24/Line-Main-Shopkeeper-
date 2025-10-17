import React, {useState} from "react";
import useFetch from "../../hook/useFetch";
import {useRecoilState} from "recoil";
import {getAllOrdersAtom, getOrderByIdAtom} from "../../state/order/orderState";
import conf from "../../config";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const UseOrder = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchData] = useFetch();
    const [getOrders, setGetOrders] = useRecoilState(getAllOrdersAtom);
    const [getOrderById, setGetOrderById] = useRecoilState(getOrderByIdAtom);

    const fetchAllOrders = async (shopId, page, limit, search, expertise) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/orders`,
                data: {shopkeeperId: shopId, page: page, limit: limit, search: search, expertise: expertise},
            });
            if (res) {
                setGetOrders(res);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error while fetching orders:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderById = async (id) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}/shopkeeper/orders/${id}`,
            });
            if (res?.data) {
                setGetOrderById(res);
            }
        } catch (error) {
            console.log("Error while fetching order by id :", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const uploadFinalBill = async (id, formData) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PUT",
                url: `${conf.apiBaseUrl}/shopkeeper/orders/${id}/finalize-bill`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res?.success) {
                toast.success(res.message || "Bill uploaded successfully!");
            } else {
                toast.error(res.message || "Failed to upload bill");
            }

            return res;
        } catch (error) {
            toast.error("Error while uploading final bill");
            return {success: false, error};
        } finally {
            setLoading(false);
        }
    };

    const acceptOrder = async (orderId, workerId) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/orders/accept-order`,
                data: {orderId: orderId, workerId: workerId},
            });
            if (res) {
                navigate("/orders");
                toast.success(res.message);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error while accept order :", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const rejectOrder = async (id, reason) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/orders/reject-order`,
                data: {orderId: id, rejectionReason: reason},
            });
            if (res) {
                navigate("/orders");
                toast.success(res?.message);
            }
        } catch (error) {
            console.log("Error while reject order:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const reassignWorker = async () => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/orders/reassign-worker`,
            });
            if (res) {
                console.log("Data", res);
            }
        } catch (error) {
            console.log("Error while reassigning worker:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const pickupVerificationOTP = async (orderId, otp) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "PATCH",
                url: `${conf.apiBaseUrl}/shopkeeper/orders/pickup-verification`,
                data: {bookingId: orderId, otp: otp},
            });
            if (res) {
                toast.success(res.message);
            }
        } catch (error) {
            console.log("Error while reassigning worker:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const settlePayment = async (payload) => {
        setLoading(true);
        try {
            const res = await fetchData({
                method: "POST",
                url: `${conf.apiBaseUrl}/shopkeeper/payments/settle-payment`,
                data: payload,
            });

            if (res) {
                toast.success(res.message);
                fetchOrderById(payload.orderId);
            }
            return res;
        } catch (error) {
            console.log("Error while settle payment:", error);
            toast.error("Error while settling payment");
            return {success: false, error};
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        getOrders,
        fetchAllOrders,
        getOrderById,
        fetchOrderById,
        uploadFinalBill,
        acceptOrder,
        rejectOrder,
        reassignWorker,
        pickupVerificationOTP,
        settlePayment,
    };
};

export default UseOrder;
