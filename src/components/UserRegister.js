import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./UserRegister.css";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/register', formData); // Update URL to match backend
        alert(response.data.message);
        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert(error.response?.data?.message || 'Registration failed.');
      }
    };
  
    return (
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Register</h2>
          <input
            className="form-input"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button className="form-button" type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default RegisterForm;