const db = require("../config/dbConfig"); // update this to your DB connector

exports.getAddresses = async (req, res) => {
  const userId = req.user.id; // assuming auth middleware adds user to req
  try {
    const [addresses] = await db.query("SELECT * FROM addresses WHERE user_id = ?", [userId]);
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: "Error fetching addresses" });
  }
};

exports.addAddress = async (req, res) => {
  const userId = req.user.id;
  const { name, line1, line2, city, state, pincode } = req.body;
  try {
    await db.query(
      "INSERT INTO addresses (user_id, name, line1, line2, city, state, pincode) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, name, line1, line2, city, state, pincode]
    );
    res.status(201).json({ message: "Address added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding address" });
  }
};

exports.updateAddress = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, line1, line2, city, state, pincode } = req.body;
  try {
    await db.query(
      "UPDATE addresses SET name=?, line1=?, line2=?, city=?, state=?, pincode=? WHERE id=? AND user_id=?",
      [name, line1, line2, city, state, pincode, id, userId]
    );
    res.json({ message: "Address updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating address" });
  }
};

exports.deleteAddress = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    await db.query("DELETE FROM addresses WHERE id=? AND user_id=?", [id, userId]);
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting address" });
  }
};
