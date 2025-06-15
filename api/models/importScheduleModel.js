import mongoose from 'mongoose';

const importScheduleSchema = new mongoose.Schema({
  source: {
    type: String,
    required: [true, 'Source is required'],
    enum: ['shopify', 'amazon', 'aliexpress', 'csv', 'custom']
  },
  sourceName: {
    type: String,
    required: [true, 'Source name is required']
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required'],
    enum: ['once', 'daily', 'weekly', 'monthly']
  },
  credentials: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Credentials are required'],
    select: false // Don't return credentials in queries by default
  },
  options: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  lastRunAt: {
    type: Date
  },
  nextRunAt: {
    type: Date,
    required: [true, 'Next run date is required']
  },
  lastRunStatus: {
    type: String,
    enum: ['success', 'partial', 'failed', 'pending', null],
    default: null
  },
  lastRunDetails: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
importScheduleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for faster querying
importScheduleSchema.index({ nextRunAt: 1, isActive: 1 });
importScheduleSchema.index({ source: 1 });

const ImportSchedule = mongoose.model('ImportSchedule', importScheduleSchema);

export default ImportSchedule;