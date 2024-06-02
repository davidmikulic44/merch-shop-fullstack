// src/controllers/itemController.js

import knex from '../../db/knex.js';

export const getItems = async (req, res) => {
  try {
    const items = await knex('item')
      .leftJoin('images', 'item.id', 'images.item_id')
      .select('item.*', 'images.image as image')
      .groupBy('item.id'); // Group by item id to avoid duplicate items
    
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const createItem = async (req, res) => {
  const { name, price, images } = req.body;
  try {
    const newItem = await knex('item').insert({ name, price, images }).returning('*');
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await knex('item')
      .where({ id })
      .first();

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const images = await knex('images')
      .where('item_id', id)
      .select('image');

    const models = await knex('models')
      .where('item_id', id)
      .select('model');

    // Attach images and models to the item object
    item.images = images.map(img => img.image);
    item.models = models.map(mod => mod.model);

    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, images } = req.body;
  try {
    const updatedItem = await knex('item').where({ id }).update({ name, price, images }).returning('*');
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await knex('item').where({ id }).del().returning('*');
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
