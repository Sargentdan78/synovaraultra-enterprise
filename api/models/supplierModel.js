import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  platform: {
    type: String,
    trim: true,
  },
  apiKey: {
    type: String,
    select: false,
  },
  webhookSecret: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;