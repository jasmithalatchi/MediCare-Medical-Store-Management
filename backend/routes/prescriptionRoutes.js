import express from 'express';
import {
  uploadPrescription,
  getMyPrescriptions,
  getAllPrescriptions,
  reviewPrescription,
} from '../controllers/prescriptionController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, uploadPrescription)
  .get(protect, admin, getAllPrescriptions);

router.route('/my')
  .get(protect, getMyPrescriptions);

router.route('/:id/status')
  .put(protect, admin, reviewPrescription);

export default router;
