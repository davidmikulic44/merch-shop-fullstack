// routes/cartRoutes.js
import express from 'express';
import { addToCart, getActiveCart, updateCartStatus, removeItemFromCart, getCartDetails } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add-to-cart', addToCart);
router.get('/active-cart/:userId', getActiveCart);
router.post('/update-status', updateCartStatus);
router.delete('/remove-item/:cartItemId', removeItemFromCart);
router.get('/cart/:cartId/details', getCartDetails);
export default router;
