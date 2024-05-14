import express from 'express';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';
import knex from 'knex';
import authRoutes from './src/routes/authRoutes.js';


const app = express();
dotenv.config({ path: './.env' });
app.use(express.json());

const router = express.Router();
router.use((req, res, next) => {
    console.log('Middleware executed'); // Add this line
    console.log('Request:', req.method, req.originalUrl);
    next();
  });
// Database connection using Knex
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});

// Test the database connection
db.raw('SELECT 1')
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((error) => {
    console.error('Error connecting to MySQL:', error);
  });

app.use(serveStatic("../frontend/dist"));
app.use('/auth', authRoutes(db)); // Pass the Knex instance to the authRoutes

const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not set in .env

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
