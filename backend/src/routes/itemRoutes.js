import express from 'express';
import { getItems, createItem, getItemById, updateItem, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
