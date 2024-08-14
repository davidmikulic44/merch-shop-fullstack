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
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update user address
export const updateUserAddress = async (req, res) => {
  const { id } = req.params;  // User ID from route parameter
  const { address, city, postal_code } = req.body;

  try {
    const updated = await knex('users').where({ id }).update({ address, city, postal_code });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User address updated successfully' });
  } catch (error) {
    console.error('Error updating user address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
      const users = await knex('users').select('id', 'email', 'firstname', 'lastname', 'role', 'address', 'city', 'postal_code');
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, firstname, lastname, role, address, city, postal_code } = req.body;

  console.log('Updating user with ID:', id);
  console.log('Request body:', req.body);

  try {
      // Perform the update operation
      await knex('users')
          .where({ id })
          .update({
              email,
              firstname,
              lastname,
              role,
              address,
              city,
              postal_code
          });

      // Fetch the updated user to return
      const updatedUser = await knex('users')
          .where({ id })
          .first();

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


// New function to delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedRows = await knex('users')
          .where({ id })
          .del();

      if (!deletedRows) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


export const updateUserProfile = async (req, res) => {
  const { ID, address, city, postal_code } = req.body;

  try {
      const updatedUser = await knex('users')
          .where({ ID })
          .update({ address, city, postal_code });

      if (updatedUser === 0) {
          return res.status(404).json({ message: 'User not found or no changes were made.' });
      }

      res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};