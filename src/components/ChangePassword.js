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
  const [loading, setLoading] = useState(false); // For spinner
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please log in to access this page.");
      navigate("/user-login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 4000); // Message disappears after 4 seconds
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await axios.put(
        "/api/change-password",
        { currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      setLoading(true); // Show loader spinner

      // Redirect to home after 2 seconds
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="change-password-container">
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      {message && <div className="popup success-popup">{message}</div>}
      {error && <div className="popup error-popup">{error}</div>}
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
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
