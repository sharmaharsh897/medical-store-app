const { createUser } = require('../data-access/db'); // ensure db functions are set correctly
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !phone || !email || !password) {
    console.log(firstName);
    console.log(lastName)
    console.log(phone)
    console.log(email)
    console.log(password)

    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt password
    const newUser = await createUser(firstName, lastName, phone, email, hashedPassword); // Create user function

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ message: "User registered successfully.", token });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser };
