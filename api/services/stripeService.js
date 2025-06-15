import Stripe from 'stripe';
import Order from '../models/orderModel.js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100), // Stripe expects amount in cents
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
      },
    });
    
    return {
      clientSecret: paymentIntent.client_secret,
      amount: order.total,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

export const processWebhook = async (event) => {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;
      
      // Update order status
      await Order.findByIdAndUpdate(orderId, {
        status: 'paid',
        paymentId: paymentIntent.id,
      });
      
      return true;
      
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      const failedOrderId = failedPaymentIntent.metadata.orderId;
      
      // Mark order as payment failed
      await Order.findByIdAndUpdate(failedOrderId, {
        status: 'payment_failed',
      });
      
      return true;
      
    default:
      return false;
  }
};