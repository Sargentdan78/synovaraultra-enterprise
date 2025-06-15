import { aiMonitoringService, contentGeneratorService, productImportService } from '../services/aiService.js';

/**
 * AI Monitoring Controller
 * Handles requests for AI monitoring and autonomous operations
 */

// @desc    Get system status and metrics
// @route   GET /api/ai/monitoring/status
// @access  Private/Admin
export const getSystemStatus = async (req, res, next) => {
  try {
    const systemStatus = await aiMonitoringService.getSystemStatus();
    res.json(systemStatus);
  } catch (error) {
    next(error);
  }
};

// @desc    Get inventory recommendations
// @route   GET /api/ai/monitoring/inventory-recommendations
// @access  Private/Admin
export const getInventoryRecommendations = async (req, res, next) => {
  try {
    const recommendations = await aiMonitoringService.getInventoryRecommendations();
    res.json(recommendations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get price optimization recommendations
// @route   GET /api/ai/monitoring/price-optimizations
// @access  Private/Admin
export const getPriceOptimizations = async (req, res, next) => {
  try {
    const optimizations = await aiMonitoringService.getPriceOptimizations();
    res.json(optimizations);
  } catch (error) {
    next(error);
  }
};

// @desc    Run autonomous action
// @route   POST /api/ai/monitoring/actions/:actionType
// @access  Private/Admin
export const runAutonomousAction = async (req, res, next) => {
  try {
    const { actionType } = req.params;
    const result = await aiMonitoringService.runAutonomousAction(actionType);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Content Generator Controller
 * Handles requests for AI-powered content generation
 */

// @desc    Generate blog post
// @route   POST /api/ai/content/blog
// @access  Private/Admin
export const generateBlogPost = async (req, res, next) => {
  try {
    const params = req.body;
    const blogPost = await contentGeneratorService.generateBlogPost(params);
    res.json(blogPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Generate social media posts
// @route   POST /api/ai/content/social
// @access  Private/Admin
export const generateSocialPosts = async (req, res, next) => {
  try {
    const params = req.body;
    const socialPosts = await contentGeneratorService.generateSocialPosts(params);
    res.json(socialPosts);
  } catch (error) {
    next(error);
  }
};

// @desc    Generate product description
// @route   POST /api/ai/content/product-description
// @access  Private/Admin
export const generateProductDescription = async (req, res, next) => {
  try {
    const params = req.body;
    const productDescription = await contentGeneratorService.generateProductDescription(params);
    res.json(productDescription);
  } catch (error) {
    next(error);
  }
};

/**
 * Product Import Controller
 * Handles requests for product import operations
 */

// @desc    Import products from external source
// @route   POST /api/ai/import/products
// @access  Private/Admin
export const importProducts = async (req, res, next) => {
  try {
    const params = req.body;
    const importResults = await productImportService.importProducts(params);
    res.json(importResults);
  } catch (error) {
    next(error);
  }
};

// @desc    Get available import sources
// @route   GET /api/ai/import/sources
// @access  Private/Admin
export const getImportSources = async (req, res, next) => {
  try {
    const sources = await productImportService.getAvailableSources();
    res.json(sources);
  } catch (error) {
    next(error);
  }
};

// @desc    Schedule periodic import
// @route   POST /api/ai/import/schedule
// @access  Private/Admin
export const scheduleImport = async (req, res, next) => {
  try {
    const params = req.body;
    const schedule = await productImportService.scheduleImport(params);
    res.json(schedule);
  } catch (error) {
    next(error);
  }
};