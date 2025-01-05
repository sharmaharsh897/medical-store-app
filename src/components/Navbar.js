import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css";
import logoIcon from "../components/assets/gurudev.png";

function Navbar() {
  const location = useLocation();

  // Check if the current path is the home route
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoIcon} alt="Logo" className="logo-image" />
        </div>
        <ul className="navbar-links">
          <li>
            {isHomePage ? (
              <ScrollLink to="home" smooth={true} duration={100}>
                Home
              </ScrollLink>
            ) : (
              <RouterLink to="/home">Home</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="about" smooth={true} duration={100}>
                About
              </ScrollLink>
            ) : (
              <RouterLink to="/home">About</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="services" smooth={true} duration={100}>
                Services
              </ScrollLink>
            ) : (
              <RouterLink to="/home">Services</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="contact" smooth={true} duration={100}>
                Contact Us
              </ScrollLink>
            ) : (
              <RouterLink to="/home">Contact Us</RouterLink>
            )}
          </li>
          <li className="dropdown">
            <a href="/" onClick={(e) => e.preventDefault()}>
              Login
            </a>
            <div className="dropdown-menu">
              <RouterLink to="/user-login">User Login</RouterLink>
              <RouterLink to="/owner-login">Owner Login</RouterLink>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
