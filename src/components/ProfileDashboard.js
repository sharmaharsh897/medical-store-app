import React , { useState, useEffect }  from "react";
import { FaBox, FaMapMarkerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDashboard.css";

const ProfileDashboard = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { icon: <FaBox size={40} />, label: "Orders" },
    { icon: <FaMapMarkerAlt size={40} />, label: "Addresses" },
    { icon: <FaUser size={40} />, label: "Account Details" },
    { icon: <FaSignOutAlt size={40} />, label: "Logout" },
    { icon: <FaUser size={40} />, label: "Account Details" },
    { icon: <FaSignOutAlt size={40} />, label: "Logout" },
  ];

  return (
    <div className="profile-container">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="profile-dashboard">
          {menuItems.map((item, index) => (
            <div key={index} className="profile-card">
              <div className="profile-icon">{item.icon}</div>
              <p className="profile-label">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
