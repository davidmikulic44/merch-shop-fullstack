import knex from '../../db/knex.js';

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
      const categories = await knex('categories').select('id', 'category'); // Selects the correct column
      res.status(200).json(categories);
  } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
// Create a new category
export const createCategory = async (req, res) => {
  const { category } = req.body; // Extract category from request body

  if (!category) {
    return res.status(400).json({ message: 'Category name is required' }); // Return an error if empty
  }

  try {
    const [categoryId] = await knex('categories').insert({ category });

    const newCategory = await knex('categories').where({ ID: categoryId }).first();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Update an existing category
export const updateCategory = async (req, res) => {
  const { id } = req.params; // Extract the category ID from the request parameters
  const { category } = req.body; // Extract the new category name from the request body

  // Validate the input
  if (!id || !category) {
    return res.status(400).json({ message: 'Category ID and name are required' });
  }

  try {
    // Update the category in the database
    const updatedRows = await knex('categories')
      .where({ ID: id })
      .update({ category });

    // Check if any rows were updated
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Fetch the updated category
    const updatedCategory = await knex('categories')
      .where({ ID: id })
      .first();

    res.status(200).json(updatedCategory); // Return the updated category
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex('categories').where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
