import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import Supplier from './models/supplierModel.js';
import Order from './models/orderModel.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
    isActive: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'user',
    isActive: true
  }
];

const categories = [
  {
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    slug: 'electronics'
  },
  {
    name: 'Clothing',
    description: 'Apparel and fashion items',
    slug: 'clothing'
  },
  {
    name: 'Home & Kitchen',
    description: 'Home goods and kitchen appliances',
    slug: 'home-kitchen'
  },
  {
    name: 'Beauty',
    description: 'Beauty and personal care products',
    slug: 'beauty'
  }
];

const suppliers = [
  {
    name: 'TechSuppliers Inc.',
    contactEmail: 'contact@techsuppliers.com',
    phone: '555-123-4567',
    address: '123 Tech Ave, San Francisco, CA',
    paymentTerms: 'Net 30',
    status: 'active'
  },
  {
    name: 'Fashion Wholesale Co.',
    contactEmail: 'orders@fashionwholesale.com',
    phone: '555-789-1234',
    address: '456 Style Blvd, New York, NY',
    paymentTerms: 'Net 15',
    status: 'active'
  },
  {
    name: 'Home Goods Direct',
    contactEmail: 'supply@homegoodsdirect.com',
    phone: '555-456-7890',
    address: '789 Home Lane, Chicago, IL',
    paymentTerms: 'Net 45',
    status: 'active'
  }
];

// Seed data function
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Supplier.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data cleared...');

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    console.log('Users added...');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    
    console.log('Categories added...');

    // Insert suppliers
    const createdSuppliers = await Supplier.insertMany(suppliers);
    
    console.log('Suppliers added...');

    // Create products
    const products = [
      {
        title: 'Bluetooth Headphones',
        description: 'Wireless Bluetooth headphones with noise cancellation',
        imageUrl: 'https://via.placeholder.com/500',
        price: 79.99,
        cost: 35.00,
        sku: 'TECH-001',
        supplierId: createdSuppliers[0]._id,
        inventory: 50,
        categoryId: createdCategories[0]._id,
        status: 'active'
      },
      {
        title: 'Smartphone Case',
        description: 'Protective case for smartphones',
        imageUrl: 'https://via.placeholder.com/500',
        price: 19.99,
        cost: 5.00,
        sku: 'TECH-002',
        supplierId: createdSuppliers[0]._id,
        inventory: 100,
        categoryId: createdCategories[0]._id,
        status: 'active'
      },
      {
        title: 'T-Shirt',
        description: 'Cotton t-shirt with logo',
        imageUrl: 'https://via.placeholder.com/500',
        price: 24.99,
        cost: 8.00,
        sku: 'CLOTH-001',
        supplierId: createdSuppliers[1]._id,
        inventory: 75,
        categoryId: createdCategories[1]._id,
        status: 'active'
      },
      {
        title: 'Coffee Maker',
        description: 'Automatic coffee maker with timer',
        imageUrl: 'https://via.placeholder.com/500',
        price: 89.99,
        cost: 40.00,
        sku: 'HOME-001',
        supplierId: createdSuppliers[2]._id,
        inventory: 30,
        categoryId: createdCategories[2]._id,
        status: 'active'
      },
      {
        title: 'Face Moisturizer',
        description: 'Hydrating face moisturizer with SPF',
        imageUrl: 'https://via.placeholder.com/500',
        price: 34.99,
        cost: 12.00,
        sku: 'BEAUTY-001',
        supplierId: createdSuppliers[2]._id,
        inventory: 60,
        categoryId: createdCategories[3]._id,
        status: 'active'
      },
      {
        title: 'Tablet',
        description: '10-inch tablet with HD display',
        imageUrl: 'https://via.placeholder.com/500',
        price: 299.99,
        cost: 150.00,
        sku: 'TECH-003',
        supplierId: createdSuppliers[0]._id,
        inventory: 25,
        categoryId: createdCategories[0]._id,
        status: 'active'
      },
      {
        title: 'Jeans',
        description: 'Classic fit denim jeans',
        imageUrl: 'https://via.placeholder.com/500',
        price: 49.99,
        cost: 18.00,
        sku: 'CLOTH-002',
        supplierId: createdSuppliers[1]._id,
        inventory: 40,
        categoryId: createdCategories[1]._id,
        status: 'active'
      },
      {
        title: 'Blender',
        description: 'High-powered blender for smoothies',
        imageUrl: 'https://via.placeholder.com/500',
        price: 69.99,
        cost: 28.00,
        sku: 'HOME-002',
        supplierId: createdSuppliers[2]._id,
        inventory: 35,
        categoryId: createdCategories[2]._id,
        status: 'active'
      },
      {
        title: 'Shampoo',
        description: 'Moisturizing shampoo for all hair types',
        imageUrl: 'https://via.placeholder.com/500',
        price: 12.99,
        cost: 4.00,
        sku: 'BEAUTY-002',
        supplierId: createdSuppliers[2]._id,
        inventory: 80,
        categoryId: createdCategories[3]._id,
        status: 'active'
      },
      {
        title: 'Wireless Earbuds',
        description: 'True wireless earbuds with charging case',
        imageUrl: 'https://via.placeholder.com/500',
        price: 129.99,
        cost: 60.00,
        sku: 'TECH-004',
        supplierId: createdSuppliers[0]._id,
        inventory: 45,
        categoryId: createdCategories[0]._id,
        status: 'active'
      }
    ];

    const createdProducts = await Product.insertMany(products);
    
    console.log('Products added...');

    // Create some orders
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const orders = [
      {
        user: createdUsers[1]._id,
        items: [
          {
            product: createdProducts[0]._id,
            name: createdProducts[0].title,
            quantity: 1,
            price: createdProducts[0].price,
            image: createdProducts[0].imageUrl
          },
          {
            product: createdProducts[1]._id,
            name: createdProducts[1].title,
            quantity: 2,
            price: createdProducts[1].price,
            image: createdProducts[1].imageUrl
          }
        ],
        shippingAddress: {
          address: '123 Main St',
          city: 'Boston',
          postalCode: '02108',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        paymentResult: {
          id: 'mock_payment_123',
          status: 'completed',
          updateTime: today,
          email: 'john@example.com'
        },
        taxPrice: 12.00,
        shippingPrice: 10.00,
        totalAmount: 62.98 + 12.00 + 10.00,
        status: 'delivered',
        deliveredAt: today,
        createdAt: yesterday
      },
      {
        user: createdUsers[1]._id,
        items: [
          {
            product: createdProducts[3]._id,
            name: createdProducts[3].title,
            quantity: 1,
            price: createdProducts[3].price,
            image: createdProducts[3].imageUrl
          }
        ],
        shippingAddress: {
          address: '123 Main St',
          city: 'Boston',
          postalCode: '02108',
          country: 'USA'
        },
        paymentMethod: 'PayPal',
        paymentResult: {
          id: 'mock_payment_124',
          status: 'completed',
          updateTime: today,
          email: 'john@example.com'
        },
        taxPrice: 7.20,
        shippingPrice: 10.00,
        totalAmount: 89.99 + 7.20 + 10.00,
        status: 'processing',
        createdAt: today
      }
    ];

    await Order.insertMany(orders);
    
    console.log('Orders added...');
    console.log('Data import completed!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Execute the seed function
importData();