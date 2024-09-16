import React from 'react'
import './Navbar.css';

import logoIcon from "../components/assets/gurudev.png";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
      <div className="navbar-logo">
      <img src={logoIcon} alt="Logo" className="logo-image" />
      </div>
      {/* <ul className="navbar-links">
        <li><a href="/index.html" target='_blank'>Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul> */}
    </nav>
    </div>
  )
}

export default Navbar
