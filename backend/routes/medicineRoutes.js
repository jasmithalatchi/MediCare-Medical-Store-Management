import express from 'express';
import {
  getMedicines,
  getCategories,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from '../controllers/medicineController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getMedicines)
  .post(protect, admin, createMedicine);

// Get list of distinct categories
router.get('/categories', getCategories);

router.route('/:id')
  .get(getMedicineById)
  .put(protect, admin, updateMedicine)
  .delete(protect, admin, deleteMedicine);

export default router;
