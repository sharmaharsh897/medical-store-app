const db = require("../config/dbConfig");

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id; // Assuming `authenticateToken` middleware attaches `req.user`

  try {
    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match." });
    }

    // Fetch current password from the database
    const [user] = await db.execute("SELECT password FROM users WHERE id = ?", [userId]);

    if (!user.length) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if current password matches
    if (user[0].password !== currentPassword) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    // Update password
    await db.execute("UPDATE users SET password = ? WHERE id = ?", [newPassword, userId]);

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { changePassword };
