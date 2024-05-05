// backend/routes/authRoutes.js

import express from 'express';
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/login - Endpoint for user login
router.post('/login', authController.login);

// POST /api/logout - Endpoint for user logout
router.post('/logout', authController.logout);

module.exports = router;