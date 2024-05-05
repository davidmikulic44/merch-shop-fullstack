import { validationResult } from 'express-validator';
import * as userModel from '../models/userModel.js';

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const isPasswordValid = await userModel.validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    req.session.user = user;
    res.status(200).json({ msg: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ msg: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};