import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing Edit and Delete Icons
import "./ProfileAddresses.css";

const ProfileAddresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      line1: "Bhapkar ki Goth",
      line2: "Daulat Ganj, Lashkar",
      city: "Gwalior",
      state: "Madhya Pradesh",
      pincode: "474001",
    },
    {
      id: 2,
      name: "Work",
      line1: "7 Hills Pg, Opposite Wipro SEZ",
      line2: "Ambedkar Nagar, Sarjapur road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560035",
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});
  const [newAddress, setNewAddress] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (address) => {
    setEditingId(address.id);
    setEditedAddress({ ...address });
  };

  const handleSave = (id) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id ? { ...editedAddress } : address
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
    if (confirmDelete) {
      setAddresses((prevAddresses) => prevAddresses.filter(address => address.id !== id));
    }
  };

  const handleChange = (e, field) => {
    setEditedAddress({ ...editedAddress, [field]: e.target.value });
  };

  const handleNewAddressChange = (e, field) => {
    setNewAddress({ ...newAddress, [field]: e.target.value });
  };

  const handleAddNewAddress = () => {
    if (!newAddress.name || !newAddress.line1 || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      alert("Please fill in all required fields!");
      return;
    }

    setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
    setNewAddress({
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    });
    setIsAdding(false);
  };

  const handleCancelAddAddress = () => {
    console.log("Cancel button clicked!"); // Debugging log
    setNewAddress({
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    });
    setIsAdding(false);
    console.log("isAdding state set to false");
  };

  useEffect(() => {
    document.documentElement.style.height = "auto"; // Allows dynamic growth
    document.body.style.height = "auto";
  }, [addresses, isAdding]);


  return (
    <div className="addresses-container">
      <h2 className="addresses-title">Your Addresses</h2>
      {addresses.length === 0 ? (
        <p>No saved addresses.</p>
      ) : (
        <ul className="addresses-list">
          {addresses.map((address) => (
            <li key={address.id} className="address-card">
              <div className="address-content">
                <div>
                  <h3>{address.name}</h3>
                  {editingId === address.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        value={editedAddress.line1}
                        onChange={(e) => handleChange(e, "line1")}
                        className="edit-input"
                        placeholder="Address Line 1"
                      />
                      <input
                        type="text"
                        value={editedAddress.line2}
                        onChange={(e) => handleChange(e, "line2")}
                        className="edit-input"
                        placeholder="Address Line 2 (Optional)"
                      />
                      <input
                        type="text"
                        value={editedAddress.city}
                        onChange={(e) => handleChange(e, "city")}
                        className="edit-input"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={editedAddress.state}
                        onChange={(e) => handleChange(e, "state")}
                        className="edit-input"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        value={editedAddress.pincode}
                        onChange={(e) => handleChange(e, "pincode")}
                        className="edit-input"
                        placeholder="Pin Code"
                      />
                      <button className="save-btn" onClick={() => handleSave(address.id)}>Save</button>
                    </div>
                  ) : (
                    <p>
                      {address.line1} <br />
                      {address.line2 && <>{address.line2} <br /></>}
                      {address.city}, {address.state} <br />
                      {address.pincode}
                    </p>
                  )}
                </div>
                <div className="icon-container">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEdit(address)}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(address.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isAdding ? (
        <div className="add-container">
          <input
            type="text"
            value={newAddress.name}
            onChange={(e) => handleNewAddressChange(e, "name")}
            className="add-input"
            placeholder="Address Type (Home/Work)"
            required
          />
          <input
            type="text"
            value={newAddress.line1}
            onChange={(e) => handleNewAddressChange(e, "line1")}
            className="add-input"
            placeholder="Address Line 1"
            required
          />
          <input
            type="text"
            value={newAddress.line2}
            onChange={(e) => handleNewAddressChange(e, "line2")}
            className="add-input"
            placeholder="Address Line 2 (Optional)"
          />
          <input
            type="text"
            value={newAddress.city}
            onChange={(e) => handleNewAddressChange(e, "city")}
            className="add-input"
            placeholder="City"
            required
          />
          <input
            type="text"
            value={newAddress.state}
            onChange={(e) => handleNewAddressChange(e, "state")}
            className="add-input"
            placeholder="State"
            required
          />
          <input
            type="text"
            value={newAddress.pincode}
            onChange={(e) => handleNewAddressChange(e, "pincode")}
            className="add-input"
            placeholder="Pin Code"
            required
          />
          <button className="save-btn" onClick={handleAddNewAddress}>Save Address</button>
          <button className="cancel-btn" onClick={handleCancelAddAddress}>
  Cancel
</button>
          </div>
      ) : (
        <button className="add-address-btn" onClick={() => setIsAdding(true)}>Add New Address</button>
      )}
    </div>
  );
};

export default ProfileAddresses;
