const db = require("../config/dbConfig");

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;

  try {
    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      console.log("Validation error: Missing fields.");
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      console.log("Validation error: Passwords do not match.");
      return res.status(400).json({ message: "New password and confirm password do not match." });
    }

    // Fetch the user's password from the database
    const [user] = await db.execute("SELECT password FROM users WHERE id = ?", [userId]);
    if (!user.length) {
      console.log("User not found in the database.");
      return res.status(404).json({ message: "User not found." });
    }

    console.log("Database password (trimmed):", user[0].password.trim());
    console.log("Provided password (trimmed):", currentPassword.trim());

    // Compare current password directly with plain text
    if (user[0].password.trim() !== currentPassword.trim()) {
  console.log("Password mismatch detected.");
  console.log("Database password (trimmed):", user[0].password.trim());
  console.log("Provided password (trimmed):", currentPassword.trim());
  return res.status(401).json({ message: "Current password is incorrect." });
}

    // Update to the new plain text password
    await db.execute("UPDATE users SET password = ? WHERE id = ?", [newPassword, userId]);

    console.log("Password updated successfully for user ID:", userId);
    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { changePassword };
