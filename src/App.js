import React from 'react';
//import Sidebar from './components/side-nav';
import  Navbar  from './components/navbar'
import Dashboard from './pages/dashboard';
import SmallProduct from './pages/smallproduct';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* <Sidebar /> */}
      <div className="main-content">
        <Navbar />
        <Dashboard />
        <SmallProduct />
      </div>
    </div>
  );
}

export default App;
