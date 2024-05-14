// authController.js

import bcrypt from 'bcrypt';
import knex from '../../db/knex';

const createUser = async (req, res) => {
  // Extract user data from request body
  const { firstname, lastname, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Log the hashed password
  console.log('Hashed Password:', hashedPassword);

  // Store user data in the database
  await knex('user').insert({
    firstname,
    lastname,
    email,
    password: hashedPassword
  });

  // Send response
  res.status(201).json({ message: 'User created successfully' });
};

const loginUser = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Retrieve user data from the database based on email
  const user = await knex('user').where({ email }).first();

  // Check if user exists
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare the provided password with the hashed password stored in the database
  const passwordMatch = await bcrypt.compare(password, user.password);

  // Log the result of password comparison
  console.log('Password Match:', passwordMatch);

  // Check if password doesn't match
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Password matches, generate JWT token
  const token = generateToken(user.id);

  // Send token in response
  res.status(200).json({ token });
};

export { createUser, loginUser };
