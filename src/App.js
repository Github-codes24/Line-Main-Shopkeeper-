import React from 'react';
// import Sidebar from './components/side-nav';
// import Navbar from './components/navbar';
// import Dashboard from './pages/dashboard';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Orderlist from './pages/module/order/order-list';
import OrderDetails from './pages/module/order/order-details';
import UploadBill from './pages/module/order/upload-bill';

function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
      <Routes>
       
        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order-management" element={<Navbar />} /> */}
        {/* <Route path="/sidebar" element={<Sidebar />} /> */}
        {/* <Route path="/top-worker" element={<TopWorker />} /> */}
         <Route path="/order-list" element={<Orderlist />} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/upload-bill" element={<UploadBill />} />
      </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
