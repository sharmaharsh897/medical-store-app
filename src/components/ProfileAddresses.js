import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileDashboard.css';
import './ProfileAddresses.css';

const ProfileAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [popup, setPopup] = useState({ message: '', type: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: '', type: '' }), 3000);
  };

  const fetchAddresses = async () => {
    try {
      const res = await axios.get('/api/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/addresses/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showPopup("Address updated successfully!", "success");
      } else {
        await axios.post('/api/addresses', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showPopup("Address saved successfully!", "success");
      }
      setFormData({ name: '', line1: '', line2: '', city: '', state: '', pincode: '' });
      setEditingId(null);
      fetchAddresses();
    } catch (err) {
      console.error("Error saving address", err);
      showPopup("Failed to save address", "error");
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showPopup("Address deleted", "success");
      fetchAddresses();
    } catch (err) {
      console.error("Failed to delete address", err);
      showPopup("Delete failed", "error");
    }
  };

  return (
    <div className="profile-addresses-container">
      <h2 className="addresses-title">Your Addresses</h2>

      {addresses.length === 0 ? (
        <p>No addresses found. Please add one below.</p>
      ) : (
        <div className="addresses-list">
          {addresses.map((addr) => (
            <div key={addr.id} className="address-card">
              <div className="address-content">
                <strong>{addr.name}</strong>
                <p>{addr.line1}</p>
                <p>{addr.line2}</p>
                <p>{addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
              <div className="icon-container">
                <span className="edit-icon" onClick={() => handleEdit(addr)}>✏️</span>
                <span className="delete-icon" onClick={() => handleDelete(addr.id)}>🗑️</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={editingId ? "edit-container" : "add-container"}>
        <h3>{editingId ? "Edit Address" : "Add Address"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" className="edit-input" placeholder="Type (e.g. Home, Work)" value={formData.name} onChange={handleInput} required />
          <input type="text" name="line1" className="edit-input" placeholder="Address Line 1" value={formData.line1} onChange={handleInput} required />
          <input type="text" name="line2" className="edit-input" placeholder="Address Line 2" value={formData.line2} onChange={handleInput} />
          <input type="text" name="city" className="edit-input" placeholder="City" value={formData.city} onChange={handleInput} required />
          <input type="text" name="state" className="edit-input" placeholder="State" value={formData.state} onChange={handleInput} required />
          <input type="text" name="pincode" className="edit-input" placeholder="Pincode" value={formData.pincode} onChange={handleInput} required />

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button type="submit" className="save-btn">
              {editingId ? "Update" : "Save"}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={() => {
                setFormData({ name: '', line1: '', line2: '', city: '', state: '', pincode: '' });
                setEditingId(null);
              }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {popup.message && (
        <div className={`popup ${popup.type}`}>
          {popup.message}
        </div>
      )}
    </div>
  );
};

export default ProfileAddresses;
