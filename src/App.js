import React from 'react';
import Sidebar from './components/layout/sidebar';
import Navbar from './components/layout/navbar';
import Dashboard from './pages/dashboard';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import OrderProcessing from './pages/module/order/order-processing';
// import AcceptOrderModals from './pages/module/order/accept-order-models';
// import Orderlist from './pages/module/order/order-list';
// import OrderDetails from './pages/module/order/order-details';
// import UploadBill from './pages/module/order/upload-bill';
// import OrderPlaced from './pages/module/order/order-placed';
// import UnusedProduct from './pages/module/order/Unused-product';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
      <Routes>
       
        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order-management" element={<Navbar />} /> 
        <Route path="/sidebar" element={<Sidebar />} />  */}
        {/* <Route path="/top-worker" element={<TopWorker />} /> */}
        {/* <Route path="/order-list" element={<Orderlist />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/upload-bill" element={<UploadBill />} />
        <Route path="/order-processing" element={<OrderProcessing />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/unused-product" element={<UnusedProduct />} /> */}
      </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
