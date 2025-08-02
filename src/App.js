import React from 'react';
import Sidebar from './components/side-nav';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
