import express from 'express';
import { updateUserProfile, createUser, loginUser, getUserByEmail, updateUserAddress, getAllUsers, updateUser, deleteUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user/:email', getUserByEmail);
router.put('/user/:id', updateUserAddress);  // New route to update user address
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);  // New route to update user
router.delete('/users/:id', deleteUser);  // New route to delete user
router.put('/profile', updateUserProfile);
export default router;
