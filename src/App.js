import React from 'react';
import SideNav from './components/layout/sidebar';

import Dashboard from './pages/dashboard';
import './App.css';
// import BigProduct from './pages/module/big-product/bigProduct';
// import BigProductAdd from './pages/module/big-product/bigProductAdd';
// import BigProductEdit from './pages/module/big-product/bigProductEdit';
// import BigProductView from './pages/module/big-product/bigProductView';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        {/* <Routes>
          <Route path="/" element={<BigProduct />} />
          <Route path="/bigProductAdd" element={<BigProductAdd />} />
          <Route path="/bigProductEdit" element={<BigProductEdit />} />
          <Route path="/bigProductView" element={<BigProductView />} />
        </Routes> */}
      </div>
    </div>
  );
}


export default App;
