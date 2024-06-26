import knex from '../../db/knex.js'; // Adjust the path to your knex instance

export const getAllCategories = async (req, res) => {
    console.log('getAllCategories controller function called');
    try {
      const categories = await knex('categories').select('category');
      console.log('Fetched categories from database:', categories);
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };