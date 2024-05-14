import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js'; // Import controller functions
import knex from '../../db/knex.js'


const router = express.Router();
router.use((req, res, next) => {
    req.db = knex; // Set db connection to knex
    next();
  });

router.post('/register', async (req, res) => {
  await createUser(req, res, req.db); // Pass db connection to createUser
});

router.post('/login', async (req, res) => {
  await loginUser(req, res, req.db); // Pass db connection to loginUser
});

export default router;