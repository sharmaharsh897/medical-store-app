import React, { useState, useEffect } from "react";
import "./OwnerLogin.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const OwnerLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Existing email/password login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await fetch("http://localhost:5000/api/owner-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
  
      if (!response.ok) {
        const errorData = await response.text(); // Log the error response as text
        console.error("Error response:", errorData);
        throw new Error("Invalid credentials");
      }
  
      const data = await response.json();
      setUser({ first_name: data.firstname, last_name: data.lastname });
      localStorage.setItem("token", data.token); // Use "token" as the key
      setTimeout(() => {
        setLoading(false); // Hide loader after 2 seconds
        navigate("/home");
      }, 2000);
      console.log("Login successful:", data);
    } catch (error) {
      setLoading(false); // Hide loader on error
      console.error("Error during login:", error);
      setErrorMessage("Incorrect email or password. Please try again.");
      setErrorVisible(true);
    }
  };

  useEffect(() => {
    if (errorVisible) {
      const timeout = setTimeout(() => {
        setErrorMessage("");
        setErrorVisible(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [errorVisible]);

  // Tooltip fade-out effect
  useEffect(() => {
    if (errorVisible) {
      const timeout = setTimeout(() => {
        setErrorMessage("");
        setErrorVisible(false); // Hide the error message after 4 seconds
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [errorVisible]);

  return (
    <div>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Admin Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                required
              />
              <span
                className="material-symbols-outlined password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        {/* Error message tooltip */}
        {errorVisible && (
          <div className="login-tooltip error">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default OwnerLoginForm;
