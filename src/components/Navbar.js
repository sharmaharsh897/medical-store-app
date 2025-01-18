import React, { useState, useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css";
import logoIcon from "../components/assets/gurudev.png";
import { UserContext } from "../context/userContext";
import { FaUserCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

function Navbar() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false); // State to control loader visibility

  // Check if the current path is the home route
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  // Handle login button click (simulates login action and shows the loader)
  const handleLoginClick = () => {
    setIsLoading(true); // Show the loader

    // Simulate a delay (e.g., an API call) before hiding the loader
    setTimeout(() => {
      setIsLoading(false); // Hide the loader after the simulated delay
    }, 2000); // 2 seconds for demonstration
  };

  const logoutUser = () => {
    // Remove user data from session storage
    sessionStorage.removeItem("user");
    
    if (window.confirm("Are you sure you want to logout?")) {
      // Remove user data from session storage
      sessionStorage.removeItem("user");
      console.log("User logged out");
      // Redirect to the home or login page
      window.location.href = "/"; // Adjust as per your routing
    }
    // Redirect to the home or login page
    window.location.href = "/"; // Adjust as per your routing
  };

  return (
    <div>
      {/* Loader Overlay */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

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
            {user ? (
              <span className="after-login">
                <FaUserCircle className="user-login-icon" /> {user.first_name}
                <FaCaretDown
                  className="user-login-down-icon"
                />
                <div className="dropdown-menu">
                  <button className="account-button">
                    View Profile
                  </button>
                  <button className="account-button">
                    My Orders
                  </button>
                  <button className="account-button">
                    Change Password
                  </button>
                  <button onClick={logoutUser} className="account-button">
                  Logout
                  </button>
                </div>
              </span> // Display user name
            ) : (
              <>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Login
                </a>
                <div className="dropdown-menu">
                  <RouterLink
                    to="/user-login"
                    onClick={handleLoginClick} // Show loader when clicked
                  >
                    User Login
                  </RouterLink>
                  <RouterLink
                    to="/owner-login"
                    onClick={handleLoginClick} // Show loader when clicked
                  >
                    Owner Login
                  </RouterLink>
                </div>
              </>
            )}
          </li>

          {/* <li className="dropdown">
            {user ? (
              <span>Hi, {user.first_name}</span>
            ) : (
              <>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Login
                </a>
                <div className="dropdown-menu">
                  <RouterLink
                    to="/user-login"
                    onClick={handleLoginClick} // Show loader when clicked
                  >
                    User Login
                  </RouterLink>
                  <RouterLink
                    to="/owner-login"
                    onClick={handleLoginClick} // Show loader when clicked
                  >
                    Owner Login
                  </RouterLink>
                </div>
              </>
            )}
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
