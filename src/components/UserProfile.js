/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import ChangePassword from "./ChangePassword";
import Modal from "./LogoutModal";
import ProfileDashboard from "./ProfileDashboard";
import ProfileAddresses from "./ProfileAddresses";
import ProfileDetails from "./ProfileDetails";

const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState("basicProfile");
  const [userData, setUserData] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // <- initially true for loader

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      sessionStorage.removeItem("user");
      console.log("User logged out.");
      setIsLoading(false);
      window.location.href = "/";
    }, 2000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 2000);

    fetch("http://localhost:5000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user profile:", error));

    return () => clearTimeout(timer);
  }, []);

  const breadcrumbs = {
    basicProfile: "Dashboard",
    myOrders: "Orders",
    myAddresses: "Addresses",
    changePassword: "Change Password",
    accountDetails: "Account Details",
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "basicProfile":
        return (
          <>
            <p className="welcome-text" >
              From your account dashboard you can view your{" "}
              <span
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setSelectedOption("myOrders")}
              >
                recent orders
              </span>
              , manage your shipping and billing{" "}
              <span
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setSelectedOption("myAddresses")}
              >
                addresses
              </span>
              , and edit account details.
            </p>
            <ProfileDashboard onSelectOption={setSelectedOption} />
          </>
        );
      case "myOrders":
        return <div>My Orders</div>;
        case "accountDetails":
          return (
            <div style={{ marginLeft: "-330px", marginTop: "-100px" }}>
              <ProfileDetails />
            </div>
          );
      case "myAddresses":
        return (
          <div style={{ marginLeft: "-330px", marginTop: "-100px" }}>
            <ProfileAddresses />
          </div>
        );
      case "changePassword":
        return (
          <div style={{ marginLeft: "-330px", marginTop: "-100px" }}>
            <ChangePassword />
          </div>
        );
      default:
        return <div>Select an option</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="user-profile-container">
        <div className="sidebar">
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>{" "}
            &gt; Profile &gt;
            <span className="current"> {breadcrumbs[selectedOption]}</span>
          </div>
          <h2 className="sidebar-title">My Account</h2>
          <ul className="sidebar-list">
            <li>
              <button
                className={`sidebar-item ${
                  selectedOption === "basicProfile" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("basicProfile")}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`sidebar-item ${
                  selectedOption === "myOrders" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("myOrders")}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                className={`sidebar-item ${
                  selectedOption === "myAddresses" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("myAddresses")}
              >
                Addresses
              </button>
            </li>
            <li>
              <button
                className={`sidebar-item ${
                  selectedOption === "accountDetails" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("accountDetails")}
              >
                User Account Details
              </button>
            </li>
            <li>
              <button
                className={`sidebar-item ${
                  selectedOption === "changePassword" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("changePassword")}
              >
                Change Password
              </button>
            </li>
            <li>
              <button
                className="sidebar-item logout"
                onClick={() => setShowLogoutModal(true)}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>

        <Modal
          show={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />

        <div className="content">{renderContent()}</div>
      </div>
    </>
  );
};

export default UserProfile;
