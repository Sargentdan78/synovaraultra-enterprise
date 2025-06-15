import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
  refundOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, admin, updateOrder);

router.route('/:id/refund')
  .post(protect, admin, refundOrder);

export default router;