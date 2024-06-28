import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../../db/knex.js';

export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, address, city, postal_code } = req.body;

    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await knex('users').insert({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: 0,
      address,
      postal_code,
      city,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await knex('users').where({ email }).first();

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await knex('users').where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




