// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // ملف CSS لتنسيق الشريط العلوي

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Property Management</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add" className="add-property-button">Add Property</Link>
      </div>
    </nav>
  );
};

export default Navbar;
