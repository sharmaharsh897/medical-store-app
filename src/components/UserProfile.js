import React, { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [selectedOption, setSelectedOption] = useState("basicProfile");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")

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
  }, []);

  const renderContent = () => {
    switch (selectedOption) {
      case "basicProfile":
        return (
          <div>
            <h3>Basic Profile Details</h3>
            {userData ? (
              <ul>
                <li>Name: {userData.name}</li>
                <li>Email: {userData.email}</li>
                <li>Phone: {userData.phone}</li>
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        );
      case "avatar":
        return <div>Avatar Section</div>;
      case "myAddresses":
        return <div>My Addresses</div>;
      case "myOrders":
        return <div>My Orders</div>;
      case "changePassword":
        return <div>Change Password Form</div>;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="user-profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">User Profile</h2>
        <ul className="sidebar-list">
          <li>
            <button
              className={`sidebar-item ${
                selectedOption === "basicProfile" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("basicProfile")}
            >
              Basic Profile
            </button>
          </li>
          <li>
            <button
              className={`sidebar-item ${
                selectedOption === "avatar" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("avatar")}
            >
              Avatar
            </button>
          </li>
          <li>
            <button
              className={`sidebar-item ${
                selectedOption === "myAddresses" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("myAddresses")}
            >
              My Addresses
            </button>
          </li>
          <li>
            <button
              className={`sidebar-item ${
                selectedOption === "myOrders" ? "active" : ""
              }`}
              onClick={() => setSelectedOption("myOrders")}
            >
              My Orders
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
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default UserProfile;
