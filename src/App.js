import React from 'react';
import Sidebar from './components/layout/sidebar';
import Navbar from './components/layout/navbar';
// import Dashboard from './pages/dashboard';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


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
      </Routes>
    </BrowserRouter>

  </div>
  );
}

export default App;
