// server.js

import express from 'express';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import itemRoutes from './src/routes/itemRoutes.js'
import db from './db/db.js'; // Import the database connection

const app = express();
dotenv.config({ path: './.env' });
app.use(express.json());

const router = express.Router();
router.use((req, res, next) => {
    console.log('Middleware executed');
    console.log('Request:', req.method, req.originalUrl);
    next();
});


app.use('/auth', authRoutes);
app.use('/items', itemRoutes)
app.use(serveStatic("../frontend/dist"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
