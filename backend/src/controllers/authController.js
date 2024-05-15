// authController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../../db/knex.js'; // Import knex

const createUser = async (req, res, db) => { // Add db parameter
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await db('user').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data in the database
    await db('user').insert({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: 0 // Assuming the default role is 0
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res, db) => { // Add db parameter
  try {
    const { email, password } = req.body;

    // Retrieve user data from the database based on email
    const user = await db('user').where({ email }).first();

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserByEmail = async (req, res, db) => {
  const { email } = req.params;

  try {
    const user = await db('user').where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createUser, loginUser, getUserByEmail };
