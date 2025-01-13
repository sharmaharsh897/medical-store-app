const db = require('../config/dbConfig');

const createUser = async (firstName, lastName, phone, email, password) => {
  const query = 'INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES (?, ?, ?, ?, ?)';
  const [result] = await db.execute(query, [firstName, lastName, phone, email, password]);
  return { id: result.insertId, firstName, lastName, phone, email }; // Return new user details
};

module.exports = { createUser };
