import express from 'express';
import { getAllItems } from '../models/itemModel.js';

const router = express.Router();

// Define a route to fetch items from the database
router.get('/items', async (req, res) => {
    try {
        const items = await getAllItems();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;