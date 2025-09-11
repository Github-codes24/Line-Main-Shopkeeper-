import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/sidebar";
import Navbar from "./components/layout/navbar";

import Dashboard from "./pages/dashboard";

// Worker
import Worker from "./pages/module/worker/worker";
import WorkerView from "./pages/module/worker/worker-view";
import WorkerEdit from "./pages/module/worker/worker-edit";

// Big Product
import BigProduct from "./pages/module/big-product/bigProduct";
import BigProductAdd from "./pages/module/big-product/bigProductAdd";
import BigProductEdit from "./pages/module/big-product/bigProductEdit";
import BigProductView from "./pages/module/big-product/bigProductView";

// Small Product
import SmallProduct from "./pages/module/small-product/smallProduct";
import SmallProductAdd from "./pages/module/small-product/smallProductAdd";
import SmallProductEdit from "./pages/module/small-product/smallProductEdit";
import SmallProductView from "./pages/module/small-product/smallProductView";

// Orders
import OrderManagement from "./pages/module/order/order-management";
import OrderPending from "./pages/module/order/order-pending";
import OrderPlaced from "./pages/module/order/order-placed";
import OrderProcessing from "./pages/module/order/order-processing";
import OrderCompleted from "./pages/module/order/quotation-approved";
import OrderRejected from "./pages/module/order/quotation-rejected";
import PendingOrder from "./pages/module/order/order-pending";

// payment
import PaymentProcess from "./pages/module/payment/payment-process";
import Payment from "./pages/module/payment/payment";

import "./App.css";
import QuotationWaiting from "./pages/module/order/quotation-waiting";

function App() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-3">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Worker */}
            <Route path="/worker" element={<Worker />} />
         <Route path="/worker/worker-view/:id" element={<WorkerView />} />
         <Route path="/worker/worker-edit/:id" element={<WorkerEdit />} />
         

\

            {/* Small Product */}
            <Route path="/small-product" element={<SmallProduct />} />
            <Route path="/small-product/add" element={<SmallProductAdd />} />
            <Route
              path="/small-product/edit/:id"
              element={<SmallProductEdit />}
            />
            <Route
              path="/small-product/view/:id"
              element={<SmallProductView />}
            />

            
            {/* Big Product */}
            <Route path="/big-product" element={<BigProduct />} />
            <Route path="/big-product/add" element={<BigProductAdd />} />
            <Route path="/big-product/edit/:id" element={<BigProductEdit />} />
            <Route path="/big-product/view/:id" element={<BigProductView />} />


            {/* Orders */}
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/orders/pending" element={<OrderPending />} />
            <Route path="/orders/placed" element={<OrderPlaced />} />
            <Route path="/orders/processing" element={<OrderProcessing />} />
            <Route path="/orders" element={<OrderManagement />} />
<Route path="/orders/pending/:id" element={<OrderPending />} />
<Route path="/orders/processing/:id" element={<OrderProcessing />} />
<Route path="/orders/completed/:id" element={<OrderCompleted />} />
<Route path="/orders/rejected/:id" element={<OrderRejected />} />
 <Route path="/orders/pending/:id" element={<PendingOrder />} />
 <Route path="/orders/workinprogress/:id" element={< QuotationWaiting/>} />
           
           {/* Payment */}
<Route path="/payment" element={<Payment />} />
<Route path="/payment/process/:id" element={<PaymentProcess />} />

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
