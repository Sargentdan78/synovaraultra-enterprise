import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'ai_autonomous_action',
      'ai_content_generation',
      'product_import',
      'price_optimization',
      'inventory_update',
      'order_process',
      'user_activity',
      'system'
    ]
  },
  description: {
    type: String,
    required: true
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Indexes for faster querying
activitySchema.index({ type: 1 });
activitySchema.index({ timestamp: -1 });
activitySchema.index({ user: 1 });

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;