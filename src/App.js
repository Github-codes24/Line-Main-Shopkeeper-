// src/App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/Routes';

function App() {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "Theresa Webb",
      expertise: "Plumber",
      phone: "+91-9876543210",
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    },
    {
      id: 2,
      name: "Jane Cooper",
      expertise: "AC Repair",
      phone: "+91-9876543210",
      address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    },
    {
      id: 3,
      name: "Jacob Jones",
      expertise: "Electrician",
      phone: "+91-9876543210",
      address: "8502 Preston Rd. Inglewood, Maine 98380",
    },
    {
      id: 4,
      name: "Brooklyn Simmons",
      expertise: "Painter",
      phone: "+91-9876543210",
      address: "4140 Parker Rd. Allentown, New Mexico 31134",
    },
    {
      id: 5,
      name: "Jerome Bell",
      expertise: "Carpenter",
      phone: "+91-9876543210",
      address: "2118 Thornridge Cir. Syracuse, 35624",
    },
  ]);

  return (
    <BrowserRouter>
      <AppRoutes workers={workers} setWorkers={setWorkers} />
    </BrowserRouter>
  );
}

export default App;
