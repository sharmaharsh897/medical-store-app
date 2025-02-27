import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserRegister.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null); // Notification state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // Loader spinner state
  const navigate = useNavigate();

  const Spinner = () => (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone numbers
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = "First Name can only contain letters.";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Last Name can only contain letters.";
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    // Confirm Password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error for the current field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    setLoading(true); // Show spinner while making API call
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register/",
        formData
      );
      setNotification({ type: "success", message: response.data.message });
  
      // Keep the spinner visible for 4 seconds before redirecting
      setTimeout(() => {
        setLoading(false); // Hide spinner
        navigate("/user-login");
      }, 3000);
    } catch (error) {
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Registration failed.",
      });
      setLoading(false); // Hide spinner immediately on error
    }
  };
  
  return (
    <div className="register-container">
      {loading && <Spinner />}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <p className="error-text">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <div className="password-wrapper">
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        <div className="form-group">
          <div className="password-wrapper">
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Register"}
        </button>

        <div className="separator">
          <span className="separator-line"></span>
          <span className="separator-text">OR</span>
          <span className="separator-line"></span>
        </div>

        <div className="register-footer">
          Already have an account? <Link to="/user-login">Login Here</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
