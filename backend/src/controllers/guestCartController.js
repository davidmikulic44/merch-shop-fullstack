import { v4 as uuidv4 } from 'uuid';
import knex from '../../db/knex.js';
export const addToGuestCart = async (req, res) => {
    const { itemId, size, quantity, guestId } = req.body;

    if (!guestId) {
        return res.status(400).json({ message: 'Guest ID is required for adding to cart' });
    }

    const trx = await knex.transaction();
    try {
        let cartId;

        const unpaidCarts = await trx('guest_carts').where({ guest_id: guestId, is_paid: 0 });
        if (unpaidCarts.length === 0) {
            const [newCart] = await trx('guest_carts').insert({ guest_id: guestId, cost: 0 }).returning('id');
            cartId = newCart.id;
        } else {
            cartId = unpaidCarts[unpaidCarts.length - 1].id;
        }

        const item = await trx('item').where({ ID: itemId }).first();
        if (!item) {
            throw new Error('Item not found');
        }
        const itemPrice = item.price;
        const totalCost = itemPrice * quantity;

        await trx('guest_cart_items').insert({ guest_cart_id: cartId, item_id: itemId, size, quantity });
        await trx('guest_carts').where({ id: cartId }).increment('cost', totalCost);
        await trx.commit();

        res.status(201).json({ message: 'Item added to guest cart successfully' });
    } catch (error) {
        await trx.rollback();
        console.error('Error adding item to guest cart:', error);
        res.status(500).json({ message: 'Failed to add item to guest cart' });
    }
};
  

export const getGuestActiveCart = async (req, res) => {
    const { guestId } = req.params;
    try {
        const cart = await knex('guest_carts')
            .leftJoin('guest_cart_items', 'guest_carts.id', 'guest_cart_items.guest_cart_id')
            .leftJoin('item', 'guest_cart_items.item_id', 'item.ID')
            .leftJoin('images', 'item.ID', 'images.item_id')
            .select(
                'guest_carts.id as cartId',
                'guest_carts.is_paid',
                'guest_carts.cost',
                'guest_cart_items.*',
                'item.name',
                'item.price',
                'item.description',
                knex.raw('GROUP_CONCAT(images.image) as images')
            )
            .where({ 'guest_carts.guest_id': guestId, 'guest_carts.is_paid': 0 })
            .groupBy('guest_carts.id', 'guest_cart_items.id', 'item.ID');

        if (cart.length === 0) {
            return res.status(404).json({ message: 'No active guest cart found' });
        }

        const cartWithImages = cart.map(cartItem => ({
            ...cartItem,
            images: cartItem.images ? cartItem.images.split(',') : []
        }));

        res.status(200).json(cartWithImages);
    } catch (error) {
        console.error('Error fetching active guest cart:', error);
        res.status(500).json({ message: 'Failed to fetch active guest cart' });
    }
};

export const updateGuestCartStatus = async (req, res) => {
    const { firstName, lastName, address, city, postalCode, email, guestId } = req.body;

    try {
        await knex.transaction(async (trx) => {
            const cart = await trx('guest_carts')
                .where({ guest_id: guestId, is_paid: 0 })
                .select('id')
                .first();

            if (!cart) {
                throw new Error('No unpaid guest cart found');
            }

            const cartId = cart.id;

            await trx('guest_carts').where({ id: cartId }).update({ is_paid: 1 });

            await trx('guest_orders').insert({
                guest_cart_id: cartId,
                firstname: firstName,
                lastname: lastName,
                address: address,
                city: city,
                postal_code: postalCode,
                email: email,
            });
        });

        res.status(200).json({ message: 'Guest cart updated and order created successfully' });
    } catch (error) {
        console.error('Error updating guest cart and creating order:', error);
        res.status(500).json({ message: 'Failed to update guest cart status and create order' });
    }
};

export const removeItemFromGuestCart = async (req, res) => {
    const { cartItemId } = req.params;
    try {
        const cartItem = await knex('guest_cart_items').where('id', cartItemId).first();
        if (!cartItem) {
            return res.status(404).json({ message: 'Guest cart item not found' });
        }
        const { guest_cart_id: cartId, item_id: itemId } = cartItem;

        const item = await knex('item').where('ID', itemId).first();
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const { price } = item;

        const cart = await knex('guest_carts').where('id', cartId).first();
        if (!cart) {
            return res.status(404).json({ message: 'Guest cart not found' });
        }

        let { cost } = cart;
        cost -= price;

        await knex('guest_cart_items').where('id', cartItemId).del();
        const remainingItems = await knex('guest_cart_items').where('guest_cart_id', cartId).count('* as count').first();

        if (remainingItems.count === 0) {
            await knex('guest_carts').where('id', cartId).del();
            res.status(200).json({ message: 'Last item removed, guest cart deleted successfully' });
        } else {
            await knex('guest_carts').where('id', cartId).update({ cost });
            res.status(200).json({ message: 'Item removed from guest cart successfully', cost });
        }
    } catch (error) {
        console.error('Error removing item from guest cart:', error);
        res.status(500).json({ message: 'Failed to remove item from guest cart' });
    }
};

export const getGuestId = async (req, res) => {
    try {
        const guestId = uuidv4(); // Generate a unique guest ID

        // Assuming you have a method to insert the guest ID into the database
        await knex('guests').insert({ id: guestId });
        await knex('guest_carts').insert({ guest_id: guestId, cost: 0, is_paid: 0 });
        res.status(200).json({ guestId });
    } catch (error) {
        console.error('Error generating guest ID and creating cart:', error);
        res.status(500).json({ message: 'Failed to generate guest ID and create cart' });
    }
};

export const getGuestCartId = async (req, res) => {
    const { guestId } = req.params;
    
    try {
        // Retrieve the guest's cart ID from the database
        const cart = await knex('guest_carts')
            .where({ guest_id: guestId, is_paid: 0 })
            .select('id')
            .first();
        
        if (!cart) {
            return res.status(404).json({ message: 'No active guest cart found' });
        }
        
        // Respond with the cart ID
        res.json({ cartId: cart.id });
    } catch (error) {
        console.error('Error fetching guest cart ID:', error);
        res.status(500).json({ message: 'Failed to fetch guest cart ID' });
    }
};