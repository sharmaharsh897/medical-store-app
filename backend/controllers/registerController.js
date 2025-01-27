const db = require("../config/dbConfig");

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const registerUser = async (req, res) => {
  let { firstName, lastName, phoneNumber, email, password, confirmPassword } =
    req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.trim() !== confirmPassword.trim()) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Capitalize first and last names
    firstName = capitalizeFirstLetter(firstName.trim());
    lastName = capitalizeFirstLetter(lastName.trim());

    // Check for existing user
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ? OR phone_number = ?",
      [email, phoneNumber]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Save user with formatted names
    await db.execute(
      "INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, phoneNumber, email, password.trim()]
    );
    console.log("Data to be inserted:", {
      firstName,
      lastName,
      phoneNumber,
      email,
    });
    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { registerUser };
