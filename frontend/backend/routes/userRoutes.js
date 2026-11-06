import express from 'express';
import {
  getUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/profile')
  .put(protect, updateUserProfile);

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

export default router;
