import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema({
  orderItemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order',
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['requested', 'approved', 'denied', 'processed'],
    default: 'requested',
  },
  processedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Return = mongoose.model('Return', returnSchema);

export default Return;