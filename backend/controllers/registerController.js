const db = require('../config/dbConfig');

const registerUser = async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password, confirmPassword } = req.body;

  try {
    if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.trim() !== confirmPassword.trim()) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check for existing user
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ? OR phone_number = ?",
      [email, phoneNumber]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Save password without trailing spaces
    await db.execute(
      "INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, phoneNumber, email, password.trim()]
    );
    console.log("Password to be stored (trimmed):", password.trim());
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { registerUser };
