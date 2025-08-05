import React from 'react';
// import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h2>Product List</h2>
      <input type="text" placeholder="Search by Product Name..." />
      <img src="profilepic.png" alt="profile" className="profile-pic" />
    </div>
  );
}

export default Navbar;
