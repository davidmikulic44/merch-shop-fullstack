import express from 'express';
import {
    getGuestActiveCart,
    updateGuestCartStatus,
    removeItemFromGuestCart,
    addToGuestCart,
    getGuestId,
    getGuestCartId  // Import the new function
} from '../controllers/guestCartController.js';

const router = express.Router();

// Route to add an item to a guest's cart
router.post('/add-to-guest-cart', addToGuestCart); 

// Route to create or retrieve a guest ID
router.get('/create', getGuestId); 

// Route to get the active cart for a guest
router.get('/active-cart/:guestId', getGuestActiveCart); 

// Route to update the status of a guest's cart
router.post('/update-guest-cart-status', updateGuestCartStatus); 

// Route to remove an item from a guest's cart
router.delete('/remove-item-from-guest-cart/:cartItemId', removeItemFromGuestCart); 

// Route to get the cart ID for a guest
router.get('/guest-cart-id/:guestId', getGuestCartId); 

export default router;
