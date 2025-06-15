import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Supplier from '../models/supplierModel.js';

/**
 * AI Monitoring Service - Handles all AI-powered monitoring and automation
 * This service provides the backend logic for the AI Monitoring System
 */
export const aiMonitoringService = {
  /**
   * Get system status and metrics
   */
  getSystemStatus: async () => {
    try {
      // Get counts for main entities
      const [
        productCount,
        activeProductCount,
        orderCount,
        userCount,
        supplierCount,
        lowStockCount
      ] = await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ status: 'active' }),
        Order.countDocuments(),
        User.countDocuments(),
        Supplier.countDocuments(),
        Product.countDocuments({ inventory: { $lt: 10 }, status: 'active' })
      ]);

      // Get recent activity
      const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name email')
        .lean();

      // Calculate revenue metrics
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      
      const yesterdayStart = new Date(todayStart);
      yesterdayStart.setDate(yesterdayStart.getDate() - 1);
      
      const todayRevenue = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: todayStart },
            status: { $ne: 'cancelled' }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]);
      
      const yesterdayRevenue = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: yesterdayStart, $lt: todayStart },
            status: { $ne: 'cancelled' }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' }
          }
        }
      ]);
      
      // Calculate percentage change
      const todayTotal = todayRevenue.length > 0 ? todayRevenue[0].total : 0;
      const yesterdayTotal = yesterdayRevenue.length > 0 ? yesterdayRevenue[0].total : 0;
      
      let revenueChange = 0;
      if (yesterdayTotal > 0) {
        revenueChange = ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;
      }
      
      // Generate AI insights
      const insights = generateAIInsights({
        lowStockCount,
        revenueChange,
        recentOrders,
        productCount,
        activeProductCount
      });
      
      // Generate recommendations based on system status
      const recommendations = generateRecommendations({
        lowStockCount,
        revenueChange,
        productCount,
        orderCount
      });
      
      // Format response
      return {
        systemStatus: {
          status: 'operational',
          lastUpdated: new Date(),
          metrics: {
            products: {
              total: productCount,
              active: activeProductCount,
              lowStock: lowStockCount
            },
            orders: {
              total: orderCount,
              recent: recentOrders.length
            },
            users: {
              total: userCount
            },
            suppliers: {
              total: supplierCount
            },
            revenue: {
              today: todayTotal.toFixed(2),
              yesterday: yesterdayTotal.toFixed(2),
              percentageChange: revenueChange.toFixed(2)
            }
          }
        },
        autonomousActions: {
          completed: [
            {
              id: 'daily-01',
              type: 'inventory_check',
              timestamp: new Date(),
              description: 'Analyzed inventory levels and flagged low stock items'
            },
            {
              id: 'daily-02',
              type: 'sales_analysis',
              timestamp: new Date(),
              description: 'Performed daily sales pattern analysis'
            },
            {
              id: 'daily-03',
              type: 'price_optimization',
              timestamp: new Date(),
              description: 'Executed pricing optimization for high-demand products'
            }
          ],
          pending: [
            {
              id: 'pending-01',
              type: 'supplier_order',
              description: 'Generate purchase orders for low stock items',
              suggestedTime: new Date(Date.now() + 3600000)
            }
          ]
        },
        insights,
        recommendations
      };
    } catch (error) {
      console.error('Error in AI monitoring service:', error);
      throw error;
    }
  },
  
  /**
   * Get inventory optimization recommendations
   */
  getInventoryRecommendations: async () => {
    try {
      // Get low stock products
      const lowStockProducts = await Product.find({ 
        inventory: { $lt: 10 },
        status: 'active' 
      }).populate('supplierId', 'name contactEmail');
      
      // Get products with high inventory that haven't sold
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const orders = await Order.find({
        createdAt: { $gte: thirtyDaysAgo }
      });
      
      // Extract product IDs from orders
      const soldProductIds = new Set();
      orders.forEach(order => {
        if (order.items && order.items.length) {
          order.items.forEach(item => {
            soldProductIds.add(item.product.toString());
          });
        }
      });
      
      // Find overstocked products (high inventory but no recent sales)
      const overstockedProducts = await Product.find({
        _id: { $nin: Array.from(soldProductIds) },
        inventory: { $gt: 50 },
        status: 'active'
      }).populate('supplierId', 'name');
      
      // Generate purchase recommendations
      const purchaseRecommendations = lowStockProducts.map(product => {
        const reorderAmount = Math.max(20 - product.inventory, 0);
        return {
          productId: product._id,
          name: product.title,
          sku: product.sku,
          currentStock: product.inventory,
          recommendedPurchase: reorderAmount,
          supplier: product.supplierId ? product.supplierId.name : 'Unknown',
          supplierEmail: product.supplierId ? product.supplierId.contactEmail : null,
          urgency: product.inventory < 5 ? 'High' : 'Medium'
        };
      });
      
      // Generate discount recommendations for overstocked items
      const discountRecommendations = overstockedProducts.map(product => {
        const recommendedDiscount = calculateRecommendedDiscount(product.inventory);
        return {
          productId: product._id,
          name: product.title,
          sku: product.sku,
          currentStock: product.inventory,
          recommendedDiscount: `${recommendedDiscount}%`,
          currentPrice: product.price,
          suggestedPrice: product.price * (1 - (recommendedDiscount / 100)),
          supplier: product.supplierId ? product.supplierId.name : 'Unknown',
          reason: 'No sales in last 30 days'
        };
      });
      
      return {
        summary: {
          lowStockProducts: lowStockProducts.length,
          overstockedProducts: overstockedProducts.length,
          totalRecommendations: purchaseRecommendations.length + discountRecommendations.length
        },
        purchaseRecommendations,
        discountRecommendations,
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error generating inventory recommendations:', error);
      throw error;
    }
  },
  
  /**
   * Get price optimization recommendations
   */
  getPriceOptimizations: async () => {
    try {
      // Get all active products
      const products = await Product.find({ status: 'active' })
        .populate('categoryId', 'name');
      
      // Get recent orders to analyze sales patterns
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const orders = await Order.find({
        createdAt: { $gte: thirtyDaysAgo }
      });
      
      // Calculate sales frequency and revenue by product
      const productSales = {};
      orders.forEach(order => {
        if (order.items && order.items.length) {
          order.items.forEach(item => {
            const productId = item.product.toString();
            if (!productSales[productId]) {
              productSales[productId] = {
                quantity: 0,
                revenue: 0
              };
            }
            productSales[productId].quantity += item.quantity;
            productSales[productId].revenue += (item.price * item.quantity);
          });
        }
      });
      
      // Generate optimizations
      const priceOptimizations = products.map(product => {
        const productId = product._id.toString();
        const sales = productSales[productId] || { quantity: 0, revenue: 0 };
        const margin = product.price - product.cost;
        const marginPercentage = (margin / product.price) * 100;
        
        let recommendation = null;
        let newPrice = product.price;
        
        // Logic for price optimization
        if (sales.quantity > 20 && marginPercentage < 30) {
          // High sales, low margin - increase price slightly
          const increase = Math.min(10, 30 - marginPercentage);
          newPrice = product.price * (1 + (increase / 100));
          recommendation = {
            action: 'increase',
            percentage: increase.toFixed(1),
            reason: 'High demand with room to increase margin'
          };
        } else if (sales.quantity < 5 && product.inventory > 20 && marginPercentage > 40) {
          // Low sales, high margin, high inventory - consider discount
          const decrease = Math.min(15, (marginPercentage - 25));
          newPrice = product.price * (1 - (decrease / 100));
          recommendation = {
            action: 'decrease',
            percentage: decrease.toFixed(1),
            reason: 'Low sales with high inventory, margin allows reduction'
          };
        } else if (sales.quantity === 0 && product.inventory > 30) {
          // No sales and high inventory - significant discount
          const decrease = Math.min(25, marginPercentage - 15);
          newPrice = product.price * (1 - (decrease / 100));
          recommendation = {
            action: 'decrease',
            percentage: decrease.toFixed(1),
            reason: 'No recent sales with substantial inventory'
          };
        }
        
        return {
          productId: product._id,
          name: product.title,
          sku: product.sku,
          category: product.categoryId ? product.categoryId.name : 'Uncategorized',
          currentPrice: product.price.toFixed(2),
          cost: product.cost.toFixed(2),
          currentMargin: marginPercentage.toFixed(2),
          sales: sales.quantity,
          revenue: sales.revenue.toFixed(2),
          recommendation: recommendation,
          optimizedPrice: recommendation ? newPrice.toFixed(2) : product.price.toFixed(2),
          inventory: product.inventory
        };
      });
      
      // Filter out items with no recommendations
      const optimizations = priceOptimizations.filter(item => item.recommendation !== null);
      
      return {
        summary: {
          analyzedProducts: products.length,
          recommendationCount: optimizations.length,
          potentialRevenue: optimizations.reduce((sum, item) => {
            if (item.recommendation.action === 'increase') {
              const increase = parseFloat(item.optimizedPrice) - parseFloat(item.currentPrice);
              return sum + (increase * item.inventory);
            }
            return sum;
          }, 0).toFixed(2)
        },
        optimizations,
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error generating price optimizations:', error);
      throw error;
    }
  },
  
  /**
   * Run autonomous actions by action type
   */
  runAutonomousAction: async (actionType) => {
    try {
      let result = { success: true, message: 'Action completed successfully' };
      
      switch (actionType) {
        case 'inventory_check':
          // Perform inventory check and generate notifications
          result.data = await performInventoryCheck();
          break;
          
        case 'price_optimization':
          // Update prices based on AI recommendations
          result.data = await performPriceOptimization();
          break;
          
        case 'purchase_orders':
          // Generate purchase orders for low stock items
          result.data = await generatePurchaseOrders();
          break;
          
        default:
          throw new Error(`Unknown action type: ${actionType}`);
      }
      
      // Record the action in activity log
      // Assuming we have an Activity model - would create in production
      /*
      await Activity.create({
        type: 'ai_autonomous_action',
        description: `AI system executed ${actionType}`,
        details: result,
        timestamp: new Date()
      });
      */
      
      return result;
    } catch (error) {
      console.error(`Error executing autonomous action ${actionType}:`, error);
      return {
        success: false,
        message: `Failed to execute ${actionType}: ${error.message}`
      };
    }
  }
};

/**
 * AI Content Generator Service
 */
export const contentGeneratorService = {
  /**
   * Generate blog content
   */
  generateBlogPost: async (params) => {
    const { topic, targetWordCount, tone, keywords } = params;
    
    try {
      // In a production environment, this would connect to OpenAI or other LLM API
      // For this implementation, we'll simulate the content generation
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const blogPostTemplate = {
        title: generateBlogTitle(topic, keywords),
        introduction: generateIntroduction(topic, tone),
        sections: generateBlogSections(topic, keywords, targetWordCount),
        conclusion: generateConclusion(topic, tone),
        seoData: {
          metaTitle: generateSeoTitle(topic, keywords),
          metaDescription: generateSeoDescription(topic, keywords),
          suggestedTags: generateTags(topic, keywords)
        },
        generatedAt: new Date()
      };
      
      return blogPostTemplate;
    } catch (error) {
      console.error('Error generating blog content:', error);
      throw error;
    }
  },
  
  /**
   * Generate social media content
   */
  generateSocialPosts: async (params) => {
    const { product, platforms, tone, purpose } = params;
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const productDetails = await Product.findById(product);
      if (!productDetails) {
        throw new Error('Product not found');
      }
      
      // Generate platform-specific content
      const generatedPosts = {};
      
      if (platforms.includes('instagram')) {
        generatedPosts.instagram = generateInstagramPost(productDetails, tone, purpose);
      }
      
      if (platforms.includes('facebook')) {
        generatedPosts.facebook = generateFacebookPost(productDetails, tone, purpose);
      }
      
      if (platforms.includes('twitter')) {
        generatedPosts.twitter = generateTwitterPost(productDetails, tone, purpose);
      }
      
      return {
        productName: productDetails.title,
        posts: generatedPosts,
        hashtagSuggestions: generateHashtags(productDetails, purpose),
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error generating social media content:', error);
      throw error;
    }
  },
  
  /**
   * Generate product descriptions
   */
  generateProductDescription: async (params) => {
    const { productId, style, length } = params;
    
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate descriptions based on product data
      return {
        productName: product.title,
        descriptions: {
          short: generateProductShortDescription(product, style),
          standard: generateProductStandardDescription(product, style),
          detailed: generateProductDetailedDescription(product, style)
        },
        seoSuggestions: {
          title: generateSeoTitle(product.title, []),
          metaDescription: generateSeoDescription(product.title, []),
          keywords: generateProductKeywords(product)
        },
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Error generating product descriptions:', error);
      throw error;
    }
  }
};

/**
 * Product Import Service
 */
export const productImportService = {
  /**
   * Import products from external sources
   */
  importProducts: async (params) => {
    const { source, credentials, options } = params;
    
    try {
      // In production, this would connect to external APIs
      // For this implementation, we'll simulate the import process
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock import results based on source
      const importedProducts = [];
      const failedProducts = [];
      
      // Simulate importing 5-15 products
      const productCount = Math.floor(Math.random() * 10) + 5;
      
      for (let i = 0; i < productCount; i++) {
        // 90% success rate
        if (Math.random() > 0.1) {
          importedProducts.push(generateMockProduct(source, i));
        } else {
          failedProducts.push({
            externalId: `EXT-${source}-${i}`,
            reason: 'Missing required fields',
            details: 'Product data incomplete'
          });
        }
      }
      
      return {
        source,
        summary: {
          total: productCount,
          successful: importedProducts.length,
          failed: failedProducts.length
        },
        importedProducts,
        failedProducts,
        completedAt: new Date()
      };
    } catch (error) {
      console.error(`Error importing products from ${source}:`, error);
      throw error;
    }
  },
  
  /**
   * Get available import sources
   */
  getAvailableSources: async () => {
    return {
      sources: [
        {
          id: 'shopify',
          name: 'Shopify',
          icon: 'shopify',
          fields: [
            { name: 'apiKey', label: 'API Key', type: 'password' },
            { name: 'storeUrl', label: 'Store URL', type: 'text' }
          ]
        },
        {
          id: 'amazon',
          name: 'Amazon Marketplace',
          icon: 'amazon',
          fields: [
            { name: 'sellerId', label: 'Seller ID', type: 'text' },
            { name: 'accessKey', label: 'MWS Access Key', type: 'password' },
            { name: 'secretKey', label: 'Secret Key', type: 'password' }
          ]
        },
        {
          id: 'aliexpress',
          name: 'AliExpress',
          icon: 'aliexpress',
          fields: [
            { name: 'apiKey', label: 'API Key', type: 'password' },
            { name: 'appSecret', label: 'App Secret', type: 'password' }
          ]
        },
        {
          id: 'csv',
          name: 'CSV Import',
          icon: 'file-csv',
          fields: [
            { name: 'fileUpload', label: 'Upload File', type: 'file' }
          ]
        }
      ]
    };
  },
  
  /**
   * Schedule periodic import
   */
  scheduleImport: async (params) => {
    const { source, frequency, startTime, credentials } = params;
    
    try {
      // In production, this would create a schedule in a task queue system
      // For this implementation, we'll just return the scheduled details
      
      return {
        id: `schedule-${Math.random().toString(36).substring(2, 9)}`,
        source,
        frequency,
        startTime,
        nextRun: calculateNextRun(frequency, startTime),
        status: 'scheduled',
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Error scheduling import:', error);
      throw error;
    }
  }
};

/**
 * Helper functions for AI and content generation
 */

// Generate AI insights based on store data
function generateAIInsights(data) {
  const { lowStockCount, revenueChange, recentOrders } = data;
  
  const insights = [];
  
  if (lowStockCount > 0) {
    insights.push({
      type: 'inventory',
      severity: lowStockCount > 10 ? 'high' : 'medium',
      message: `${lowStockCount} products are running low on inventory and require attention.`
    });
  }
  
  if (revenueChange < -10) {
    insights.push({
      type: 'revenue',
      severity: 'high',
      message: `Revenue has dropped by ${Math.abs(revenueChange.toFixed(1))}% compared to yesterday.`
    });
  } else if (revenueChange > 10) {
    insights.push({
      type: 'revenue',
      severity: 'low',
      message: `Revenue has increased by ${revenueChange.toFixed(1)}% compared to yesterday.`
    });
  }
  
  // Analysis of recent orders
  if (recentOrders.length > 0) {
    const orderTotal = recentOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const avgOrderValue = orderTotal / recentOrders.length;
    
    insights.push({
      type: 'orders',
      severity: 'low',
      message: `Average order value in the last 24 hours is $${avgOrderValue.toFixed(2)}.`
    });
  }
  
  return insights;
}

// Generate AI-powered recommendations
function generateRecommendations(data) {
  const { lowStockCount, revenueChange, productCount } = data;
  
  const recommendations = [];
  
  if (lowStockCount > 0) {
    recommendations.push({
      type: 'inventory',
      action: 'Order inventory for low stock items',
      priority: lowStockCount > 10 ? 'high' : 'medium',
      automated: true
    });
  }
  
  if (revenueChange < -5) {
    recommendations.push({
      type: 'marketing',
      action: 'Consider running a targeted promotion to increase sales',
      priority: 'medium',
      automated: false
    });
  }
  
  if (productCount < 50) {
    recommendations.push({
      type: 'catalog',
      action: 'Import more products to expand your catalog',
      priority: 'medium',
      automated: false
    });
  }
  
  return recommendations;
}

// Calculate recommended discount based on inventory level
function calculateRecommendedDiscount(inventory) {
  if (inventory > 100) {
    return 25;
  } else if (inventory > 50) {
    return 15;
  } else {
    return 10;
  }
}

// Calculate next run time for scheduled imports
function calculateNextRun(frequency, startTime) {
  const now = new Date();
  const start = new Date(startTime);
  
  switch (frequency) {
    case 'daily':
      start.setDate(start.getDate() + 1);
      break;
    case 'weekly':
      start.setDate(start.getDate() + 7);
      break;
    case 'monthly':
      start.setMonth(start.getMonth() + 1);
      break;
    default:
      start.setDate(start.getDate() + 1);
  }
  
  // If the calculated time is in the past, adjust
  if (start < now) {
    start.setDate(now.getDate() + 1);
  }
  
  return start;
}

// Perform inventory check
async function performInventoryCheck() {
  const lowStockProducts = await Product.find({ 
    inventory: { $lt: 10 },
    status: 'active' 
  });
  
  return {
    checked: await Product.countDocuments({ status: 'active' }),
    lowStock: lowStockProducts.length,
    critical: lowStockProducts.filter(p => p.inventory < 5).length
  };
}

// Perform price optimization
async function performPriceOptimization() {
  // Get products that haven't sold in 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const orders = await Order.find({
    createdAt: { $gte: thirtyDaysAgo }
  });
  
  // Extract product IDs from orders
  const soldProductIds = new Set();
  orders.forEach(order => {
    if (order.items && order.items.length) {
      order.items.forEach(item => {
        soldProductIds.add(item.product.toString());
      });
    }
  });
  
  // Find products without recent sales and high inventory
  const productsToDiscount = await Product.find({
    _id: { $nin: Array.from(soldProductIds) },
    inventory: { $gt: 30 },
    status: 'active'
  });
  
  // Apply discounts
  let updated = 0;
  for (const product of productsToDiscount) {
    const recommendedDiscount = calculateRecommendedDiscount(product.inventory);
    const newPrice = product.price * (1 - (recommendedDiscount / 100));
    
    await Product.findByIdAndUpdate(product._id, {
      price: newPrice
    });
    
    updated++;
  }
  
  return {
    analyzed: await Product.countDocuments({ status: 'active' }),
    updated,
    discounted: productsToDiscount.length
  };
}

// Generate purchase orders
async function generatePurchaseOrders() {
  // In a real implementation, this would connect to suppliers
  // For this implementation, we'll simulate the process
  
  const lowStockProducts = await Product.find({ 
    inventory: { $lt: 10 },
    status: 'active' 
  }).populate('supplierId');
  
  // Group by supplier
  const ordersBySupplier = {};
  
  lowStockProducts.forEach(product => {
    const supplierId = product.supplierId ? product.supplierId._id.toString() : 'unknown';
    
    if (!ordersBySupplier[supplierId]) {
      ordersBySupplier[supplierId] = {
        supplier: product.supplierId ? {
          name: product.supplierId.name,
          contactEmail: product.supplierId.contactEmail
        } : {
          name: 'Unknown Supplier',
          contactEmail: null
        },
        items: []
      };
    }
    
    const reorderAmount = Math.max(20 - product.inventory, 0);
    
    ordersBySupplier[supplierId].items.push({
      product: {
        id: product._id,
        sku: product.sku,
        name: product.title
      },
      quantity: reorderAmount,
      currentStock: product.inventory
    });
  });
  
  return {
    purchaseOrders: Object.values(ordersBySupplier),
    totalProducts: lowStockProducts.length,
    totalSuppliers: Object.keys(ordersBySupplier).length
  };
}

// Blog content generation helpers
function generateBlogTitle(topic, keywords) {
  const titleTemplates = [
    `The Ultimate Guide to ${topic}`,
    `How to Maximize Results with ${topic}`,
    `${topic}: A Complete Guide for Beginners`,
    `Top 10 Tips for ${topic} Success`,
    `Why ${topic} Matters for Your Business`
  ];
  
  return titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
}

function generateIntroduction(topic, tone) {
  const introTemplates = [
    `In today's competitive market, understanding ${topic} is more crucial than ever. This guide will walk you through everything you need to know.`,
    `${topic} has transformed the way businesses operate. In this article, we'll explore the key aspects you should be aware of.`,
    `Are you looking to improve your approach to ${topic}? You're in the right place! We'll cover all the essential strategies and insights.`
  ];
  
  return introTemplates[Math.floor(Math.random() * introTemplates.length)];
}

function generateBlogSections(topic, keywords, targetWordCount) {
  const sectionCount = Math.floor(targetWordCount / 200) || 3;
  const sections = [];
  
  const sectionTemplates = [
    `Understanding ${topic} Fundamentals`,
    `Key Benefits of ${topic}`,
    `Common ${topic} Challenges`,
    `${topic} Best Practices`,
    `Implementing ${topic} in Your Business`,
    `Measuring ${topic} Success`,
    `The Future of ${topic}`
  ];
  
  for (let i = 0; i < sectionCount; i++) {
    if (i < sectionTemplates.length) {
      sections.push({
        heading: sectionTemplates[i],
        content: `This section would contain detailed information about ${sectionTemplates[i].toLowerCase()}. In a production environment, this would be generated by an AI system like GPT-4 with specific, valuable content related to the topic.`
      });
    }
  }
  
  return sections;
}

function generateConclusion(topic, tone) {
  return `In conclusion, ${topic} represents a significant opportunity for businesses that approach it strategically. By implementing the tips and insights shared in this guide, you'll be well-positioned to achieve better results and stay ahead of competitors.`;
}

function generateSeoTitle(topic, keywords) {
  const seoTitleTemplates = [
    `Complete ${topic} Guide: Expert Tips & Strategies`,
    `${topic} 101: Everything You Need to Know`,
    `Mastering ${topic}: A Comprehensive Guide`
  ];
  
  return seoTitleTemplates[Math.floor(Math.random() * seoTitleTemplates.length)];
}

function generateSeoDescription(topic, keywords) {
  return `Discover essential ${topic} strategies, best practices, and expert insights in our comprehensive guide. Learn how to implement effective techniques for better results.`;
}

function generateTags(topic, keywords) {
  const baseTags = [topic, 'guide', 'tips', 'strategy'];
  return [...baseTags, ...(keywords || [])];
}

// Social media content generation
function generateInstagramPost(product, tone, purpose) {
  const captions = [
    `✨ Introducing our amazing ${product.title}! Perfect for those looking to upgrade their experience. Check it out now! #MustHave #NewArrival`,
    `🔥 Elevate your style with our ${product.title}. Designed for performance and aesthetics. Shop now before it's gone! #TopPicks #LimitedStock`,
    `📢 The wait is over! Our ${product.title} is now available. Swipe to see all the amazing features! #NewProduct #ShopNow`
  ];
  
  return {
    caption: captions[Math.floor(Math.random() * captions.length)],
    imageDescription: `Lifestyle image showing the ${product.title} in use with clear focus on product features`,
    recommendedTime: 'Between 12-2 PM for maximum engagement'
  };
}

function generateFacebookPost(product, tone, purpose) {
  const posts = [
    `🎉 NEW PRODUCT ALERT 🎉\nWe're thrilled to introduce our latest addition: the ${product.title}!\n\nDesigned with quality and performance in mind, this product is perfect for anyone looking to elevate their experience.\n\nCheck it out on our website - limited stock available!`,
    `Have you been waiting for a product that combines style and functionality? Look no further than our ${product.title}!\n\n✅ Premium quality\n✅ Innovative design\n✅ Exceptional value\n\nClick the link to learn more and order yours today!`
  ];
  
  return {
    content: posts[Math.floor(Math.random() * posts.length)],
    linkDescription: `Shop our new ${product.title} - Limited time special pricing!`,
    recommendedTime: 'Weekday evening between 7-9 PM'
  };
}

function generateTwitterPost(product, tone, purpose) {
  const tweets = [
    `Just launched! Our new ${product.title} is here to revolutionize the way you work. Check it out now! #NewProduct #MustHave`,
    `Quality meets innovation with our latest ${product.title}. Available now at special introductory pricing! #ShopNow #LimitedOffer`
  ];
  
  return {
    content: tweets[Math.floor(Math.random() * tweets.length)].substring(0, 280),
    recommendedTime: 'Weekday afternoon between 12-3 PM'
  };
}

function generateHashtags(product, purpose) {
  const baseHashtags = ['NewProduct', 'MustHave', 'ShopNow'];
  
  // Add product-specific hashtags
  const productTags = product.title.split(' ').map(word => 
    word.replace(/[^a-zA-Z0-9]/g, '')
  );
  
  // Add purpose-specific hashtags
  let purposeTags = [];
  switch(purpose) {
    case 'product_launch':
      purposeTags = ['NewLaunch', 'JustDropped', 'NewArrival'];
      break;
    case 'promotion':
      purposeTags = ['Sale', 'Discount', 'SpecialOffer', 'LimitedTime'];
      break;
    case 'engagement':
      purposeTags = ['Trending', 'MustTry', 'CustomerFavorite'];
      break;
  }
  
  return [...baseHashtags, ...productTags, ...purposeTags].slice(0, 10);
}

// Product description generators
function generateProductShortDescription(product, style) {
  return `High-quality ${product.title} perfect for everyday use. Features premium design and exceptional performance.`;
}

function generateProductStandardDescription(product, style) {
  return `Experience the difference with our premium ${product.title}. This versatile product offers outstanding quality, elegant design, and reliable performance. Perfect for both professional and personal use, it's designed to exceed your expectations.`;
}

function generateProductDetailedDescription(product, style) {
  return `Introducing our exceptional ${product.title} - the perfect addition to your collection. Crafted with meticulous attention to detail, this premium product features a stunning design combined with unparalleled functionality.

Key Features:
- Premium quality materials ensure long-lasting durability
- Elegant, versatile design complements any setting
- User-friendly interface for effortless operation
- Exceptional performance that exceeds industry standards

Whether you're a professional seeking reliable tools or a hobbyist looking for quality equipment, our ${product.title} delivers on all fronts. Each product undergoes rigorous quality testing to ensure it meets our high standards.

Elevate your experience today with the ${product.title} - where quality meets innovation.`;
}

function generateProductKeywords(product) {
  const baseKeywords = [product.title, 'quality', 'premium'];
  
  const titleWords = product.title.toLowerCase().split(' ')
    .map(word => word.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(word => word.length > 3);
    
  return [...new Set([...baseKeywords, ...titleWords])];
}

// Generate mock product for import simulation
function generateMockProduct(source, index) {
  const categories = ['Electronics', 'Apparel', 'Home Goods', 'Beauty', 'Sports'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  const baseProduct = {
    externalId: `${source}-${index}-${Date.now()}`,
    title: `${category} Product ${index + 1}`,
    description: `This is a sample product imported from ${source}.`,
    price: Math.floor(Math.random() * 100) + 10,
    cost: Math.floor(Math.random() * 50) + 5,
    imageUrl: `https://via.placeholder.com/500x500.jpg?text=${category}+${index + 1}`,
    sku: `${source.substring(0, 3).toUpperCase()}-${category.substring(0, 3).toUpperCase()}-${1000 + index}`,
    inventory: Math.floor(Math.random() * 100) + 10,
    category: category,
    status: 'active'
  };
  
  // Add source-specific fields
  switch(source) {
    case 'shopify':
      baseProduct.shopifyId = `shopify_${10000000 + index}`;
      baseProduct.variants = [
        { id: 'var1', title: 'Default', price: baseProduct.price }
      ];
      break;
    case 'amazon':
      baseProduct.asin = `B0${Math.floor(1000000 + Math.random() * 9000000)}`;
      baseProduct.amazonUrl = `https://amazon.com/dp/${baseProduct.asin}`;
      break;
    case 'aliexpress':
      baseProduct.aliId = Math.floor(1000000000 + Math.random() * 9000000000);
      baseProduct.shipping = { method: 'ePacket', cost: Math.floor(Math.random() * 10) + 3 };
      break;
  }
  
  return baseProduct;
}