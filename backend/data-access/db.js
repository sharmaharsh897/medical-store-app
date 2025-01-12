const db = require("../config/dbConfig");

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.execute(query, [email]);
  return rows[0]; // Returns the first matching user or undefined
};

module.exports = { findUserByEmail };
