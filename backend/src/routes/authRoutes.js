import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authRoutes = (db) => {
  // Route for registering a new user
  router.post('/register', async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await db('user').where({ email }).first();
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user record
      await db('user').insert({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role: 0 // Assuming the default role is 0
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Route for logging in
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Check if the user with the given email exists
      const user = await db('user').where({ email }).first();
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
};

export default authRoutes;
