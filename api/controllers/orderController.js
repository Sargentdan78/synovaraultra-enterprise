import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress } = req.body;
    
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    // Calculate total price
    let totalPrice = 0;
    
    // Validate all products and update inventory
    for (const item of orderItems) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      
      if (product.inventory < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough inventory for ${product.title}. Available: ${product.inventory}, Requested: ${item.quantity}` 
        });
      }
      
      // Update price based on current product price
      item.price = product.price;
      totalPrice += product.price * item.quantity;
      
      // Update inventory
      product.inventory -= item.quantity;
      await product.save();
    }
    
    // Create order
    const order = await Order.create({
      userId: req.user._id, // Assuming middleware has set req.user
      orderItems,
      shippingAddress,
      total: totalPrice,
      status: 'pending',
    });
    
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email')
      .populate({
        path: 'orderItems.productId',
        select: 'title imageUrl',
      });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user is admin or the order belongs to user
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res, next) => {
  try {
    const { user, status } = req.query;
    
    const query = {};
    
    if (user) {
      query.userId = user;
    }
    
    if (status) {
      query.status = status;
    }
    
    // If not admin, only show user's own orders
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }
    
    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .sort('-createdAt');
      
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = req.body.status || order.status;
    
    // Add payment ID if provided
    if (req.body.paymentId) {
      order.paymentId = req.body.paymentId;
    }
    
    const updatedOrder = await order.save();
    
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Refund an order
// @route   POST /api/orders/:id/refund
// @access  Private/Admin
export const refundOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order can be refunded
    if (order.status !== 'paid' && order.status !== 'fulfilled') {
      return res.status(400).json({ message: `Order cannot be refunded. Current status: ${order.status}` });
    }
    
    // Process refund logic here
    // In a real implementation, you would call a payment provider API
    
    // For now, just update the status
    order.status = 'refunded';
    await order.save();
    
    res.json({ message: 'Order refunded', order });
  } catch (error) {
    next(error);
  }
};