import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['blog', 'social', 'email', 'product_description', 'other']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isAIGenerated: {
    type: Boolean,
    default: true
  },
  publishDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before save
contentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for faster querying
contentSchema.index({ type: 1, status: 1 });
contentSchema.index({ publishDate: -1 });

const Content = mongoose.model('Content', contentSchema);

export default Content;