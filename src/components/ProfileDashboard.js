import React from "react";
import { FaBox, FaMapMarkerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDashboard.css";

const ProfileDashboard = ({ onSelectOption }) => {
  const menuItems = [
    { icon: <FaBox size={40} />, label: "Orders", value: "myOrders" },
    { icon: <FaMapMarkerAlt size={40} />, label: "Addresses", value: "myAddresses" },
    { icon: <FaUser size={40} />, label: "Account Details", value: "changePassword" },
    { icon: <FaSignOutAlt size={40} />, label: "Logout", value: "logout" },
  ];

  return (
    <div className="profile-dashboard">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="profile-card"
          onClick={() => {
            if (item.value === "logout") {
              onSelectOption("logout");
            } else {
              onSelectOption(item.value);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="profile-icon">{item.icon}</div>
          <p className="profile-label">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileDashboard;
