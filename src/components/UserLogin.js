  import React, { useState, useEffect } from "react";
  import "./UserLogin.css";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faGoogle } from "@fortawesome/free-brands-svg-icons";
  import { useGoogleLogin } from "@react-oauth/google";
  import { Link } from "react-router-dom";
  import { useContext } from "react";
  import { UserContext } from "../context/userContext";
  import { useNavigate } from "react-router-dom";

  const LoginForm = () => {
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
      setLoading(true); // Show loader
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        
    
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
    
        const data = await response.json();
        setUser({ first_name: data.first_name, last_name: data.last_name });
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

    // Google login handler
    const handleGoogleLogin = useGoogleLogin({
      onSuccess: async (response) => {
        console.log("Google Token Response:", response);
    
        const idToken = response.credential; // Ensure you're using the ID token
    
        try {
          const res = await fetch("http://localhost:5000/api/google-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: idToken, // Send the ID token to the backend
            }),
          });
    
          if (!res.ok) {
            throw new Error("Google login failed.");
          }
    
          const data = await res.json();
          console.log("Google Login Success:", data);
    
          // Handle successful login (e.g., save JWT, redirect)
          localStorage.setItem("token", data.jwtToken);
          localStorage.setItem("user", JSON.stringify({  name: `${data.first_name} ${data.last_name}` }));
          navigate("/home");
        } catch (err) {
          console.error("Error during Google login:", err);
        }
      },
      onError: (error) => console.error("Google Login Failed:", error),
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
      <div>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
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
      </div>
    );
  };

  export default LoginForm;
