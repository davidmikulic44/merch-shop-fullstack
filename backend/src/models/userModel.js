import db from '../config/database.js';

export const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [rows, fields] = await db.execute(query, [email]);
  return rows[0];
};

export const validatePassword = async (password, hashedPassword) => {
  // Replace this with your actual password validation logic
  return password === hashedPassword;
};