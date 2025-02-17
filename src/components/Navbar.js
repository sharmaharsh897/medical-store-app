/*eslint-disable*/
import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Navbar.css";
import Modal from "./LogoutModal"; // Import the Modal component
import SessionModal from "./SessionModal";
import logoIcon from "../components/assets/gurudev.png";
import { UserContext } from "../context/userContext";
import { FaUserCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import axios from "axios";


const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes in milliseconds

const fetchUserProfile = async () => {
  try {
    const token = sessionStorage.getItem("authToken"); // Fetch the token from sessionStorage
    const response = await axios.get("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User Profile:", response.data);
    // Handle the profile data (e.g., display it in a modal or redirect to a profile page)
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
  }
};

function Navbar() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false); // State to control loader visibility
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Check if the current path is the home route
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  useEffect(() => {
    if (user) {
      console.log("User detected, starting inactivity timer");
      startInactivityTimer();
  
      window.addEventListener("mousemove", resetInactivityTimer);
      window.addEventListener("keydown", resetInactivityTimer);
  
      return () => {
        console.log("Cleaning up inactivity timer and event listeners");
        clearInactivityTimer();
        window.removeEventListener("mousemove", resetInactivityTimer);
        window.removeEventListener("keydown", resetInactivityTimer);
      };
    }
  }, [user]); 

  useEffect(() => {
    if (showSessionModal) {
      console.log("Session modal is visible, clearing inactivity timer");
      clearInactivityTimer(); // Stop the timer while modal is visible
    }
  }, [showSessionModal]);

  const handleSessionExtend = () => {
    console.log("Extending session");
    setShowSessionModal(false); // Close modal
    startInactivityTimer(); // Restart the timer
  };
  
  const startInactivityTimer = () => {
    clearInactivityTimer(); // Clear existing timer
    const id = setTimeout(() => {
      console.log("Session timeout triggered");
      setShowSessionModal(true); // Show session timeout modal
    }, INACTIVITY_TIMEOUT);
    setTimeoutId(id); // Save new timer ID
  };

  const resetInactivityTimer = () => {
    if (user) {
      startInactivityTimer();
    }
  };

  const clearInactivityTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  const handleLoginClick = () => {
    setIsLoading(true); // Show the loader

    // Simulate a delay (e.g., an API call) before hiding the loader
    setTimeout(() => {
      setIsLoading(false); // Hide the loader after the simulated delay
    }, 2000); // 2 seconds for demonstration
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      sessionStorage.removeItem("user");
      console.log("User logged out.");
      setIsLoading(false);
      window.location.href = "/";
    }, 2000);
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
              <ScrollLink to="home" smooth={true} duration={500}>
                Home
              </ScrollLink>
            ) : (
              <RouterLink to="/home">Home</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="about" smooth={true} duration={500}>
                About
              </ScrollLink>
            ) : (
              <RouterLink to="/home">About</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="services" smooth={true} duration={500}>
                Services
              </ScrollLink>
            ) : (
              <RouterLink to="/home">Services</RouterLink>
            )}
          </li>
          <li>
            {isHomePage ? (
              <ScrollLink to="contact" smooth={true} duration={500}>
                Contact Us
              </ScrollLink>
            ) : (
              <RouterLink to="/home">Contact Us</RouterLink>
            )}
          </li>

          <li className="dropdown">
            {user ? (
              <span className="after-login">
                <FaUserCircle className="user-login-icon" /> {user.first_name} {user.last_name}
                <FaCaretDown className="user-login-down-icon" />
                <div className="dropdown-menu">
                <button className="account-button" onClick={fetchUserProfile}>
    <RouterLink to="/profile">Profile</RouterLink>
  </button>
                  <button className="account-button">
                    <RouterLink to="">My Orders</RouterLink>
                  </button>
                  <button className="account-button">
                    <RouterLink to="/change-password">
                      Change Password
                    </RouterLink>
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(true)} // Open modal
                    className="account-button"
                  >
                    <RouterLink>Logout</RouterLink>
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
      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)} // Close modal
        onConfirm={handleLogout} // Confirm logout
      />
       <SessionModal
        show={showSessionModal}
        onClose={handleSessionExtend} // Stay logged in
        onConfirm={handleLogout} // Log out due to inactivity
      />
    </div>
  );
}

export default Navbar;
