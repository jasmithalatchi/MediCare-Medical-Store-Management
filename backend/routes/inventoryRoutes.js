import express from 'express';
import {
  getInventoryItems,
  getInventoryItemById,
  updateInventoryStock,
  getLowStockAlerts,
} from '../controllers/inventoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.route('/')
  .get(getInventoryItems);

router.route('/low-stock')
  .get(getLowStockAlerts);

router.route('/:id')
  .get(getInventoryItemById)
  .put(updateInventoryStock);

export default router;
