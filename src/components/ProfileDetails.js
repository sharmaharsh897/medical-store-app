import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileDetails.css'; // your custom css

const UserAccountDetails = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileAndAddress = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const profileResponse = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const addressResponse = await axios.get('/api/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = profileResponse.data;
        const addressData = addressResponse.data;

        setUserDetails({
          name: profileData.name || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          address: addressData.length > 0 
          ? `${addressData[0].line1}, ${addressData[0].line2}, ${addressData[0].city}, ${addressData[0].state} - ${addressData[0].pincode}`
          : 'N/A',
        });
      } catch (error) {
        console.error('Error fetching user profile or address:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndAddress();
  }, []);

  if (loading) {
    return (
      <div className="profile-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-details-container">
      <div className="profile-details-card">
        <h2 className="profile-title">User Account Details</h2>
        <div className="profile-info">
          <div className="profile-info-item">
            <span className="profile-label">Name</span>
            <span className="profile-value">{userDetails.name || 'N/A'}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{userDetails.email || 'N/A'}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Phone</span>
            <span className="profile-value">{userDetails.phone || 'N/A'}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-label">Address</span>
            <span className="profile-value">{userDetails.address || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountDetails;
