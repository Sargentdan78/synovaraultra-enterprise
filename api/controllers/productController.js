import Product from '../models/productModel.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, status, supplier } = req.query;
    
    const query = {};
    
    if (category) {
      query.categoryId = category;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (supplier) {
      query.supplierId = supplier;
    }
    
    const products = await Product.find(query)
      .populate('categoryId', 'name')
      .populate('supplierId', 'name');
      
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId', 'name')
      .populate('supplierId', 'name');
      
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Instead of deleting, set status to archived
    product.status = 'archived';
    await product.save();
    
    res.json({ message: 'Product archived' });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product inventory
// @route   PUT /api/products/:id/inventory
// @access  Private/Admin
export const updateInventory = async (req, res, next) => {
  try {
    const { delta } = req.body;
    
    if (delta === undefined) {
      return res.status(400).json({ message: 'Delta value is required' });
    }
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update inventory
    product.inventory += parseInt(delta);
    
    // Ensure inventory doesn't go negative
    if (product.inventory < 0) {
      product.inventory = 0;
    }
    
    await product.save();
    
    res.json({ 
      id: product._id,
      inventory: product.inventory 
    });
  } catch (error) {
    next(error);
  }
};