import express from 'express';
import Stripe from 'stripe';
import { processWebhook } from '../services/stripeService.js';

const router = express.Router();

// @desc    Process Stripe webhooks
// @route   POST /api/webhooks/stripe
// @access  Public
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  const sig = req.headers['stripe-signature'];
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  try {
    const processed = await processWebhook(event);
    
    if (processed) {
      res.json({ received: true });
    } else {
      res.json({ received: true, processed: false });
    }
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    res.status(500).send(`Webhook processing error: ${error.message}`);
  }
});

export default router;