import express from 'express';
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  syncInventory,
} from '../controllers/supplierController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, admin, getSuppliers)
  .post(protect, admin, createSupplier);

router.route('/:id')
  .get(protect, admin, getSupplierById)
  .put(protect, admin, updateSupplier)
  .delete(protect, admin, deleteSupplier);

router.route('/:id/sync')
  .post(protect, admin, syncInventory);

export default router;