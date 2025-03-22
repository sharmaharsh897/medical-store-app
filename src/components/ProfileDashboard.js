import React from "react";
import { FaBox, FaMapMarkerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDashboard.css";

const ProfileDashboard = () => {
  const menuItems = [
    { icon: <FaBox size={40} />, label: "Orders" },
    { icon: <FaMapMarkerAlt size={40} />, label: "Addresses" },
    { icon: <FaUser size={40} />, label: "Account Details" },
    { icon: <FaSignOutAlt size={40} />, label: "Logout" },
    { icon: <FaUser size={40} />, label: "Account Details" },
    { icon: <FaSignOutAlt size={40} />, label: "Logout" },
  ];

  return (
    <div className="profile-dashboard">
      {menuItems.map((item, index) => (
        <div key={index} className="profile-card">
          <div className="profile-icon">{item.icon}</div>
          <p className="profile-label">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileDashboard;
