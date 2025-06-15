import Supplier from '../models/supplierModel.js';
import Product from '../models/productModel.js';

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private/Admin
export const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({});
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single supplier
// @route   GET /api/suppliers/:id
// @access  Private/Admin
export const getSupplierById = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a supplier
// @route   POST /api/suppliers
// @access  Private/Admin
export const createSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Private/Admin
export const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    res.json(updatedSupplier);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a supplier
// @route   DELETE /api/suppliers/:id
// @access  Private/Admin
export const deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    // Check if supplier has products
    const products = await Product.findOne({ supplierId: req.params.id });
    
    if (products) {
      return res.status(400).json({ 
        message: 'Cannot delete supplier that has products. Update or delete products first.'
      });
    }
    
    await supplier.deleteOne();
    
    res.json({ message: 'Supplier removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Sync inventory from supplier
// @route   POST /api/suppliers/:id/sync
// @access  Private/Admin
export const syncInventory = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    // In a real implementation, this would connect to supplier API
    // For now, we just mock the functionality
    
    const products = await Product.find({ supplierId: supplier._id });
    
    // Update inventory with random changes
    for (const product of products) {
      // Random inventory change between -5 and +10
      const inventoryChange = Math.floor(Math.random() * 16) - 5;
      
      product.inventory += inventoryChange;
      
      // Ensure inventory doesn't go negative
      if (product.inventory < 0) {
        product.inventory = 0;
      }
      
      await product.save();
    }
    
    res.json({ 
      message: 'Inventory sync completed',
      productsUpdated: products.length
    });
  } catch (error) {
    next(error);
  }
};