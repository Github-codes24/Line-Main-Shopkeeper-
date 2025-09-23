import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../components/cards/card";
import OrderTable from "../components/cards/OrderTable";
import TopSellingProduct from "../components/cards/Products";
import TopWorker from "../components/cards/worker-card";
import useFetch from "../../src/hook/useFetch";
import conf from "../config";
import Searchbar from "../components/layout/Searchbar";

const DashboardPage = () => {
    const [fetchData] = useFetch();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const getDashboardData = async () => {
        try {
            setLoading(true);
            const result = await fetchData({
                method: "GET",
                url: `${conf.apiBaseUrl}shopkeeper/dashboard`,
            });

            if (result) {
                setDashboardData(result);
            } else {
                toast.error(result?.message || "Failed to load dashboard");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching dashboard");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getDashboardData();
    }, []);

    if (loading) return <p className="p-6">Loading dashboard...</p>;
    if (!dashboardData) return <div className="text-red-600">No dashboard data available...</div>;

    const {stats, orderManagement, topSellingProduct, topWorker} = dashboardData;

    return (
        <div className="space-y-6 bg-gray-200 p-2 min-h-screen">
            <ToastContainer />
            <Searchbar />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-40">
                <Card title="Total Sales" value={stats?.totalSales?.value} change={stats?.totalSales?.change} />
                <Card title="Total Worker" value={stats?.totalWorker?.value} change={stats?.totalWorker?.change} />
                <Card
                    title="Total Customer"
                    value={stats?.totalCustomer?.value}
                    change={stats?.totalCustomer?.change}
                />
                <Card title="Total Order" value={stats?.totalOrder?.value} change={stats?.totalOrder?.change} />
            </div>

            {/* Order Table & Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrderTable orders={orderManagement} />
                <TopSellingProduct products={topSellingProduct} />
            </div>

            {/* Workers */}
            <TopWorker workers={topWorker} />
        </div>
    );
};

export default DashboardPage;
