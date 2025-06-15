import express from 'express';
import { createPaymentIntent } from '../services/stripeService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create payment intent for Stripe
// @route   POST /api/payments/create-payment-intent
// @access  Private
router.post('/create-payment-intent', protect, async (req, res, next) => {
  try {
    const { orderId } = req.body;
    
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
    
    const paymentIntent = await createPaymentIntent(orderId);
    
    res.json(paymentIntent);
  } catch (error) {
    next(error);
  }
});

export default router;