import express from 'express';

const router = express.Router();

/**
 * @route   GET /health
 * @desc    Health check endpoint for Railway
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Service is healthy',
    timestamp: new Date().toISOString()
  });
});

export default router;