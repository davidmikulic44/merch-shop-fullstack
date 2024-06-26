import express from 'express';
import { createUser, loginUser, getUserByEmail } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user/:email', getUserByEmail);

export default router;


