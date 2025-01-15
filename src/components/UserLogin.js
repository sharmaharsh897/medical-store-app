import React, { useState, useEffect } from "react";
import "./UserLogin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error message
  const [errorVisible, setErrorVisible] = useState(false); // To control the visibility of error message tooltip

  // Existing email/password login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials"); // Set an error message
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Redirect to home
      // window.location.href = "/home";
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Incorrect email or password. Please try again."); // Show the error message
      setErrorVisible(true); // Show the tooltip
    }
  };

  // Google login handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch("http://localhost:5000/api/google-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        if (!response.ok) {
          throw new Error("Google login failed");
        }

        const data = await response.json();
        console.log("Google Login Successful:", data);
        // Redirect to home or handle login state
      } catch (error) {
        console.error("Error during Google login:", error);
        setErrorMessage("Google login failed. Please try again.");
        setErrorVisible(true);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      setErrorMessage("Google login encountered an error. Please try again.");
      setErrorVisible(true);
    },
  });

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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
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
        <div className="separator">
          <span className="separator-line"></span>
          <span className="separator-text">OR</span>
          <span className="separator-line"></span>
        </div>
        <button onClick={handleGoogleLogin} className="google-login-button">
          <div className="google-icon-box">
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
          </div>
          <div className="google-text-box">Login with Google</div>
        </button>
        <div className="login-footer">
          New User? <Link to="/register">Create Account</Link>
        </div>
      </div>

      {/* Error message tooltip */}
      {errorVisible && <div className="login-tooltip error">{errorMessage}</div>}
    </div>
  );
};

export default LoginForm;
