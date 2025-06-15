import express from 'express';
import {
  getSystemStatus, 
  getInventoryRecommendations,
  getPriceOptimizations,
  runAutonomousAction,
  generateBlogPost,
  generateSocialPosts,
  generateProductDescription,
  importProducts,
  getImportSources,
  scheduleImport
} from '../controllers/aiController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// AI Monitoring Routes
router.get('/monitoring/status', protect, admin, getSystemStatus);
router.get('/monitoring/inventory-recommendations', protect, admin, getInventoryRecommendations);
router.get('/monitoring/price-optimizations', protect, admin, getPriceOptimizations);
router.post('/monitoring/actions/:actionType', protect, admin, runAutonomousAction);

// Content Generator Routes
router.post('/content/blog', protect, admin, generateBlogPost);
router.post('/content/social', protect, admin, generateSocialPosts);
router.post('/content/product-description', protect, admin, generateProductDescription);

// Product Import Routes
router.get('/import/sources', protect, admin, getImportSources);
router.post('/import/products', protect, admin, importProducts);
router.post('/import/schedule', protect, admin, scheduleImport);

export default router;