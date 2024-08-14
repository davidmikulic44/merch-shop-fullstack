import knex from '../../db/knex.js';

export const getItems = async (req, res) => {
  const { category } = req.query;
  try {
    let query = knex('item')
      .leftJoin('images', 'item.id', 'images.item_id')
      .select('item.*', knex.raw('GROUP_CONCAT(images.image ORDER BY images.image SEPARATOR ",") as images'))
      .groupBy('item.id');

    if (category) {
      query = query.where('item.category_id',
        knex('categories')
        .select('id')
        .where('category', category));
    }

    const items = await query;

    const itemsWithImages = items.map(item => ({
      ...item,
      images: item.images ? item.images.split(',') : []
    }));

    res.status(200).json(itemsWithImages);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const createItem = async (req, res) => {
  const { name, price, image_path, model_path } = req.body;  // Note: 'image_path' should be in the body

  console.log("Received item data:", { name, price, image_path, model_path });

  try {
    // Start a transaction
    const newItem = await knex.transaction(async trx => {
      console.log("Starting transaction...");

      // Insert the new item and return the item details
      const [item] = await trx('item')
        .insert({ name, price });

      console.log("Item created:", item);
      console.log("Image path: ", image_path);

      // Insert the image if provided
      if (image_path) {
        const imageInsert = {
          item_id: item,  // Correctly use the item ID
          image: image_path
        };

        console.log("Image insert:", imageInsert);

        await trx('images').insert(imageInsert);
        console.log("Image inserted successfully");
      } else {
        console.log("No image to insert");
      }

      return item;
    });

    // Fetch the item with its image outside the transaction
    const itemWithImage = await knex('item')
      .leftJoin('images', 'item.id', 'images.item_id')
      .where('item.id', newItem.id)
      .select('item.*', 'images.image as image')
      .first();

    console.log("Final item with image:", itemWithImage);

    // Send the response
    res.status(201).json(itemWithImage);
  } catch (error) {
    console.error('Error creating item and image:', error);
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
  const { name, price, image_path, model_path, category_id } = req.body;

  try {
    // Fetch the current item
    const [currentItem] = await knex('item').where({ id }).select('*');

    if (!currentItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Prepare the data to be updated
    const updatedData = {
      name: name !== undefined ? name : currentItem.name,
      price: price !== undefined ? price : currentItem.price,
      image_path: image_path !== undefined ? image_path : currentItem.image_path,
      model_path: model_path !== undefined ? model_path : currentItem.model_path,
      category_id: category_id !== undefined ? category_id : currentItem.category_id,
    };

    // Update the item
    const [updatedItem] = await knex('item')
      .where({ id })
      .update(updatedData);

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not updated' });
    }

    // Respond with the updated item
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete images associated with the item
    await knex('images').where({ item_id: id }).del();

    // Delete the item
    const deletedItem = await knex('item').where({ id }).del();
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
