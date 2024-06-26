import express from 'express';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import itemRoutes from './src/routes/itemRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import spotifyRoutes from './src/routes/spotifyRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';

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
app.use('/cart', cartRoutes)
app.use('/spotify', spotifyRoutes);
app.use('/categories', categoryRoutes);
app.use(serveStatic("../frontend/dist"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
