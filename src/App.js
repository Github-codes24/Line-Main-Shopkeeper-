
import React from 'react';

import Sidebar from './components/layout/sidebar';
import Navbar from './components/layout/navbar';
import Dashboard from './pages/dashboard';
import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { Card } from 'react-bootstrap';
import Navbar from './components/navbar';
// import BigProduct from './pages/module/big-product/bigProduct';
// import BigProductAdd from './pages/module/big-product/bigProductAdd';
// import BigProductEdit from './pages/module/big-product/bigProductEdit';
import { Routes , Route } from 'react-router-dom';
// import BigProductView from './pages/module/big-product/bigProductView';

import SmallProduct from './pages/module/small-product/smallProduct';
import SmallProductAdd from './pages/module/small-product/smallProductAdd';
import SmallProductEdit from './pages/module/small-product/smallProductEdit';
import SmallProductView from './pages/module/small-product/smallProductView';


// import Sidebar from './components/side-nav';
// import Navbar from './components/navbar';
// import Dashboard from './pages/dashboard';
// import './App.css';


function App() {
  return (
    <div >
      {/* <Sidebar />
      <div className="main-content">
        <Navbar />
        <Dashboard />
      </div> */}
      <Navbar/>
       {/* <BigProductAdd/> */}
      {/* <BigProduct/> */}
      {/* <BigProductEdit/> */}
    
        <Routes>
          <Route path="/" element={<SmallProduct/>} />
          <Route path="/smallProductAdd" element={<SmallProductAdd/>} />
          
          <Route path="/smallProductEdit" element={<SmallProductEdit/>} />
          <Route path="/smallProductView" element={<SmallProductView/>} />
        </Routes>
      
     

      
    </div>
  );
}


export default App;

