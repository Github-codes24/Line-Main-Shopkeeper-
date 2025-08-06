import React from 'react';
import Sidebar from './components/layout/sidebar';
import Navbar from './components/layout/navbar';
import Dashboard from './pages/dashboard';
import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
