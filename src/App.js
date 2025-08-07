import React from 'react';
// import { Card } from 'react-bootstrap';
import Navbar from './components/navbar';
import BigProduct from './pages/module/big-product/bigProduct';
import BigProductAdd from './pages/module/big-product/bigProductAdd';
import BigProductEdit from './pages/module/big-product/bigProductEdit';
import { Routes , Route } from 'react-router-dom';
import BigProductView from './pages/module/big-product/bigProductView';

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
          <Route path="/" element={<BigProduct/>} />
          <Route path="/bigProductAdd" element={<BigProductAdd/>} />
          
          <Route path="/bigProductEdit" element={<BigProductEdit/>} />
          <Route path="/bigProductView" element={<BigProductView/>} />
        </Routes>
      
     

      
    </div>
  );
}


export default App;
