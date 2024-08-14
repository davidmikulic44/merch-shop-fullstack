import express from 'express';
import { getAllOrders, getOrderById, deleteOrder, createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.delete('/:id', deleteOrder);

export default router;