import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import "./ChangePassword.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(UserContext); // Get user context
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      alert("Please log in to access this page.");
      navigate("/user-login");
    }
  }, [user, navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    console.log("Password change initiated.");
    console.log("Current password:", currentPassword);
    console.log("New password:", newPassword);
    console.log("Confirm password:", confirmPassword);
  
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      console.log("Error: Passwords do not match.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token"); // Consistent with UserLogin.js
      console.log("Token retrieved from localStorage:", token);
      
      if (!token) {
        setError("User is not authenticated. Please log in again.");
        console.log("Error: No token available.");
        return;
      }
  
      const response = await axios.put(
        "/api/change-password",
        { currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Response from API:", response.data);
      setMessage(response.data.message);
    } catch (err) {
      console.error("Error during password change:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ChangePassword;
