import knex from '../../db/knex.js';

export const addToCart = async (req, res) => {
    console.log('Request Body:', req.body);
    const { itemId, size, quantity, userId } = req.body;

    const trx = await knex.transaction();
    try {
        console.log(`User ID: ${userId}`);
        
        // Check if the user has any unpaid carts
        const unpaidCarts = await trx('cart').where({ user_ID: userId, is_paid: 0 });
        console.log('Unpaid Carts:', unpaidCarts);

        let cartId;
        if (unpaidCarts.length === 0) {
            // If the user doesn't have any unpaid carts, create a new cart
            const [newCart] = await trx('cart').insert({ user_ID: userId, cost: 0 }).returning('ID');
            console.log('New Cart Created with ID:', newCart);
            cartId = newCart;
        } else {
            // If the user has unpaid carts, use the latest one
            cartId = unpaidCarts[unpaidCarts.length - 1].ID;
            console.log('Using Existing Cart ID:', cartId);
        }

        // Fetch the price of the item
        const item = await trx('item').where({ ID: itemId }).first();
        if (!item) {
            throw new Error('Item not found');
        }
        const itemPrice = item.price;

        // Calculate the total cost for the added items
        const totalCost = itemPrice * quantity;

        // Add item to cart_item table
        const cartItemInsertion = await trx('cart_item').insert({ cart_id: cartId, item_id: itemId, size, quantity }).returning('*');
        console.log('Cart Item Inserted:', cartItemInsertion);

        // Update the cart's total cost
        await trx('cart').where({ ID: cartId }).increment('cost', totalCost);

        await trx.commit();  // Commit the transaction
        console.log('Transaction Committed');

        res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        await trx.rollback();  // Rollback the transaction in case of error
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
};

export const getActiveCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await knex('cart')
      .leftJoin('cart_item', 'cart.ID', 'cart_item.cart_id')
      .leftJoin('item', 'cart_item.item_id', 'item.ID')
      .leftJoin('images', 'item.ID', 'images.item_id')
      .select(
        'cart.ID as cartId', 
        'cart.is_paid', 
        'cart.cost', 
        'cart_item.*', 
        'item.name', 
        'item.price', 
        'item.description',
        knex.raw('GROUP_CONCAT(images.image) as images') // Aggregate images
      )
      .where({ 'cart.user_ID': userId, 'cart.is_paid': 0 })
      .groupBy('cart.ID', 'cart_item.ID', 'item.ID'); // Group by necessary fields
  
    if (cart.length === 0) {
      return res.status(404).json({ message: 'No active cart found' });
    }

    // Map images to the cart items
    const cartWithImages = cart.map(cartItem => ({
      ...cartItem,
      images: cartItem.images ? cartItem.images.split(',') : [] // Split the concatenated string into an array
    }));

    res.status(200).json(cartWithImages);
  } catch (error) {
    console.error('Error fetching active cart:', error);
    res.status(500).json({ message: 'Failed to fetch active cart' });
  }
};



export const updateCartStatus = async (req, res) => {
  const { userId } = req.body;

  try {
    // Start a transaction
    await knex.transaction(async (trx) => {
      // Find the cart that will be updated
      const cart = await trx('cart')
        .where({ user_id: userId, is_paid: 0 })
        .select('id')
        .first();

      if (!cart) {
        throw new Error('No unpaid cart found for the user');
      }

      const cartId = cart.id;

      // Update the cart status
      await trx('cart')
        .where({ id: cartId })
        .update({ is_paid: 1 });

      // Insert a new order
      await trx('orders').insert({
        user_id: userId,
        cart_id: cartId,
        // Add other necessary order fields if any
      });
    });

    res.status(200).json({ message: 'Cart updated and order created successfully' });
  } catch (error) {
    console.error('Error updating cart and creating order:', error);
    res.status(500).json({ message: 'Failed to update cart status and create order' });
  }
};

export const removeItemFromCart = async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      // Get the cart ID and item ID of the item being removed
      const cartItem = await knex('cart_item').where('ID', cartItemId).first();
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      const { cart_id: cartId, item_id: itemId } = cartItem;
  
      // Get the price of the item being removed
      const item = await knex('item').where('ID', itemId).first();
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      const { price } = item;
  
      // Get the current cost of the cart
      const cart = await knex('cart').where('ID', cartId).first();
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      let { cost } = cart;
  
      // Update the cost by subtracting the price of the removed item
      cost -= price;
  
      // Remove the item from the cart_item table using the primary key column
      await knex('cart_item').where('ID', cartItemId).del();
  
      // Check if the cart has any items left
      const remainingItems = await knex('cart_item').where('cart_id', cartId).count('* as count').first();
  
      if (remainingItems.count === 0) {
        // If no items are left, delete the cart
        await knex('cart').where('ID', cartId).del();
        res.status(200).json({ message: 'Last item removed, cart deleted successfully' });
      } else {
        // Otherwise, update the cost of the cart
        await knex('cart').where('ID', cartId).update({ cost });
        res.status(200).json({ message: 'Item removed from cart successfully', cost });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      res.status(500).json({ message: 'Failed to remove item from cart' });
    }
  };
  