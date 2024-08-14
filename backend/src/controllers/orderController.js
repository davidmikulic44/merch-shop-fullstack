import knex from '../../db/knex.js';

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    // Fetch orders with user details, cart cost, and detailed cart item information
    const orders = await knex('orders')
      .leftJoin('users', 'orders.user_id', 'users.ID') // Include user details
      .leftJoin('cart', 'orders.cart_id', 'cart.ID') // Include cart details
      .leftJoin('cart_item', 'cart.ID', 'cart_item.cart_id') // Include cart items
      .leftJoin('item', 'cart_item.item_id', 'item.ID') // Include item details
      .select(
        'orders.id as order_id',           // Order ID
        'orders.cart_id',                  // Cart ID
        'users.firstname',                 // User's first name
        'users.lastname',                  // User's last name
        'users.email',                     // User's email
        'users.address',                   // User's address
        'users.city',                      // User's city
        'users.postal_code',               // User's postal code
        'cart.cost',                       // Cart cost
        'cart_item.ID as cart_item_id',    // Cart Item ID
        'cart_item.size',                  // Item size
        'cart_item.quantity',              // Quantity of items
        'item.name',                       // Item name
        'item.price'                       // Item price
      )
      .orderBy('orders.id', 'desc'); // Optionally order by order ID

    // Process orders to aggregate cart items under each order
    const ordersWithDetails = orders.reduce((acc, order) => {
      const { order_id, cart_id, firstname, lastname, email, address, city, postal_code, cost, cart_item_id, size, quantity, name, price } = order;

      // Find the existing order in the accumulator
      let existingOrder = acc.find(o => o.order_id === order_id);

      if (!existingOrder) {
        // Create a new order entry
        existingOrder = {
          order_id,
          cart_id,
          firstname,
          lastname,
          email,
          address,
          city,
          postal_code,
          cost,
          items: []
        };
        acc.push(existingOrder);
      }

      if (cart_item_id) {
        // Add item details to the existing order's items array
        existingOrder.items.push({
          cart_item_id,
          size,
          quantity,
          name,
          price
        });
      }

      return acc;
    }, []);

    res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await knex('orders').where({ id }).first();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const { user_id, cart_id } = req.body;
  try {
    const [orderId] = await knex('orders').insert({ user_id, cart_id }).returning('id');
    res.status(201).json({ id: orderId, message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await knex('orders').where({ id }).del();
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
