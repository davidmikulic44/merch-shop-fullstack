import pool from '../config/database.js';

const getAllItems = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM item");
        return rows;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw new Error('Failed to fetch items from the database');
    }
};

export { getAllItems };