const db = require("../config/dbConfig");

// Fetch user by email
const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  console.log("Finding user by email:", email);
  const [rows] = await db.execute(query, [email]);
  return rows[0]; // Returns the first matching user or undefined
  
};

const findAdminByEmail = async (email) => {
  const query = "SELECT * FROM admin WHERE email = ?";
  console.log("Finding admin by email:", email);
  const [rows] = await db.execute(query, [email]);
  return rows[0]; // Returns the first matching user or undefined
  
};

// Create a new user
const createUser = async (user) => {
  const query = `
    INSERT INTO users (first_name, last_name, email, profile_picture, password)
    VALUES (?, ?, ?, ?, ?)
  `;
  const { first_name, last_name, email, profile_picture, password } = user;
  const [result] = await db.execute(query, [
    first_name,
    last_name,
    email,
    profile_picture,
    password,
  ]);
  console.log("Finding user by email:", email);

  return { id: result.insertId, ...user }; // Return created user details
};

module.exports = { findUserByEmail, createUser, findAdminByEmail };
