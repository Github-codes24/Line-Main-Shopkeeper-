import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "../components/cards/card";
import OrderTable from "../components/cards/OrderTable";
import TopSellingProduct from "../components/cards/Products";
import TopWorker from "../components/cards/worker-card";

import useFetch from "../../src/hook/useFetch";
import conf from "../../src/hook/useFetch";

const DashboardPage = () => {
  const [fetchData] = useFetch();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const result = await fetchData({
        method: "GET",
        url: `${conf.apiBaseUrl}/shopkeeper/dashboard`,
      });

      if (result.success) {
        setDashboardData(result.data);
      } else {
        toast.error(result.message || "Failed to load dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!dashboardData) return null;

  const { stats, orderManagement, topSellingProduct, topWorker } = dashboardData;

  return (
    <div className="p-4 space-y-6">
      <ToastContainer />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Sales"
          value={stats?.totalSales?.value}
          change={stats?.totalSales?.change}
        />
        <Card
          title="Total Worker"
          value={stats?.totalWorker?.value}
          change={stats?.totalWorker?.change}
        />
        <Card
          title="Total Customer"
          value={stats?.totalCustomer?.value}
          change={stats?.totalCustomer?.change}
        />
        <Card
          title="Total Order"
          value={stats?.totalOrder?.value}
          change={stats?.totalOrder?.change}
        />
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
