# API Documentation: E-commerce Automation Platform

This document provides detailed information about the backend API endpoints for the e-commerce automation platform.

## Authentication

### Base URL
```
/api/users
```

### Endpoints

#### Register a new user
```
POST /api/users/register
```
Request Body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "role": "user",
  "token": "JWT_TOKEN"
}
```

#### Login user
```
POST /api/users/login
```
Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "role": "user",
  "token": "JWT_TOKEN"
}
```

#### Get user profile
```
GET /api/users/profile
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response:
```json
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "role": "user"
}
```

#### Update user profile
```
PUT /api/users/profile
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "newpassword123"
}
```
Response:
```json
{
  "_id": "user_id",
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "user",
  "token": "NEW_JWT_TOKEN"
}
```

## Products

### Base URL
```
/api/products
```

### Endpoints

#### Get all products
```
GET /api/products
```
Query Parameters:
- category: Filter by category ID
- status: Filter by status (active, inactive, archived)
- supplier: Filter by supplier ID

Response:
```json
[
  {
    "_id": "product_id",
    "title": "Product Name",
    "description": "Product Description",
    "imageUrl": "https://example.com/image.jpg",
    "price": 99.99,
    "cost": 50.00,
    "sku": "PROD-001",
    "inventory": 100,
    "status": "active",
    "categoryId": {
      "_id": "category_id",
      "name": "Category Name"
    },
    "supplierId": {
      "_id": "supplier_id",
      "name": "Supplier Name"
    }
  }
]
```

#### Get single product
```
GET /api/products/:id
```
Response:
```json
{
  "_id": "product_id",
  "title": "Product Name",
  "description": "Product Description",
  "imageUrl": "https://example.com/image.jpg",
  "price": 99.99,
  "cost": 50.00,
  "sku": "PROD-001",
  "inventory": 100,
  "status": "active",
  "categoryId": {
    "_id": "category_id",
    "name": "Category Name"
  },
  "supplierId": {
    "_id": "supplier_id",
    "name": "Supplier Name"
  }
}
```

#### Create product (Admin)
```
POST /api/products
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "title": "New Product",
  "description": "Product Description",
  "imageUrl": "https://example.com/image.jpg",
  "price": 99.99,
  "cost": 50.00,
  "sku": "PROD-001",
  "inventory": 100,
  "categoryId": "category_id",
  "supplierId": "supplier_id"
}
```
Response: Created product object

#### Update product (Admin)
```
PUT /api/products/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body: Product fields to update
Response: Updated product object

#### Delete product (Admin)
```
DELETE /api/products/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response:
```json
{
  "message": "Product archived"
}
```

#### Update inventory (Admin)
```
PUT /api/products/:id/inventory
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "delta": 10
}
```
Response:
```json
{
  "id": "product_id",
  "inventory": 110
}
```

## Orders

### Base URL
```
/api/orders
```

### Endpoints

#### Create order
```
POST /api/orders
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "items": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "price": 99.99,
      "image": "https://example.com/image.jpg"
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "City",
    "postalCode": "12345",
    "country": "Country"
  },
  "paymentMethod": "Credit Card"
}
```
Response: Created order object

#### Get all orders (Admin)
```
GET /api/orders
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Array of order objects

#### Get user orders
```
GET /api/orders/myorders
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Array of order objects for the logged-in user

#### Get order by ID
```
GET /api/orders/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Order object

#### Update order to paid
```
PUT /api/orders/:id/pay
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "id": "payment_id",
  "status": "completed",
  "updateTime": "2023-01-01T12:00:00.000Z",
  "email": "payer@example.com"
}
```
Response: Updated order object

#### Update order to delivered (Admin)
```
PUT /api/orders/:id/deliver
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Updated order object

#### Process refund (Admin)
```
POST /api/orders/:id/refund
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "reason": "Customer requested refund"
}
```
Response: Updated order object with refund information

## Categories

### Base URL
```
/api/categories
```

### Endpoints

#### Get all categories
```
GET /api/categories
```
Response: Array of category objects

#### Get category by ID
```
GET /api/categories/:id
```
Response: Category object

#### Create category (Admin)
```
POST /api/categories
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "name": "Category Name",
  "description": "Category Description",
  "slug": "category-name"
}
```
Response: Created category object

#### Update category (Admin)
```
PUT /api/categories/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body: Category fields to update
Response: Updated category object

#### Delete category (Admin)
```
DELETE /api/categories/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response:
```json
{
  "message": "Category removed"
}
```

## Suppliers

### Base URL
```
/api/suppliers
```

### Endpoints

#### Get all suppliers (Admin)
```
GET /api/suppliers
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Array of supplier objects

#### Get supplier by ID (Admin)
```
GET /api/suppliers/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Supplier object

#### Create supplier (Admin)
```
POST /api/suppliers
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "name": "Supplier Name",
  "contactEmail": "supplier@example.com",
  "phone": "555-123-4567",
  "address": "Supplier Address",
  "paymentTerms": "Net 30"
}
```
Response: Created supplier object

#### Update supplier (Admin)
```
PUT /api/suppliers/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body: Supplier fields to update
Response: Updated supplier object

#### Delete supplier (Admin)
```
DELETE /api/suppliers/:id
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response:
```json
{
  "message": "Supplier removed"
}
```

#### Sync inventory with supplier (Admin)
```
POST /api/suppliers/:id/sync
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response:
```json
{
  "message": "Inventory synchronization initiated",
  "syncId": "sync_operation_id"
}
```

## Payments

### Base URL
```
/api/payments
```

### Endpoints

#### Create payment intent
```
POST /api/payments/create-payment-intent
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "orderId": "order_id"
}
```
Response:
```json
{
  "clientSecret": "stripe_client_secret"
}
```

## AI Features

### Base URL
```
/api/ai
```

### AI Monitoring Endpoints

#### Get system status
```
GET /api/ai/monitoring/status
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: System status object with metrics, insights, and recommendations

#### Get inventory recommendations
```
GET /api/ai/monitoring/inventory-recommendations
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Inventory recommendations object with purchase and discount suggestions

#### Get price optimizations
```
GET /api/ai/monitoring/price-optimizations
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: Price optimization suggestions based on AI analysis

#### Run autonomous action
```
POST /api/ai/monitoring/actions/:actionType
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Path Parameters:
- actionType: Type of action to run (inventory_check, price_optimization, purchase_orders)

Response: Action execution results

### Content Generator Endpoints

#### Generate blog post
```
POST /api/ai/content/blog
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "topic": "E-commerce Growth Strategies",
  "targetWordCount": 1000,
  "tone": "professional",
  "keywords": ["e-commerce", "growth", "strategies"]
}
```
Response: Generated blog content object

#### Generate social media posts
```
POST /api/ai/content/social
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "product": "product_id",
  "platforms": ["instagram", "facebook", "twitter"],
  "tone": "friendly",
  "purpose": "product_launch"
}
```
Response: Generated social media posts for each platform

#### Generate product description
```
POST /api/ai/content/product-description
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "productId": "product_id",
  "style": "persuasive",
  "length": "standard"
}
```
Response: Generated product descriptions in various lengths

### Product Import Endpoints

#### Get available import sources
```
GET /api/ai/import/sources
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Response: List of available import sources and required fields

#### Import products
```
POST /api/ai/import/products
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "source": "shopify",
  "credentials": {
    "apiKey": "your_api_key",
    "storeUrl": "your_store_url"
  },
  "options": {
    "importImages": true,
    "createCategories": true
  }
}
```
Response: Import results with successful and failed products

#### Schedule import
```
POST /api/ai/import/schedule
```
Headers:
```
Authorization: Bearer JWT_TOKEN
```
Request Body:
```json
{
  "source": "shopify",
  "frequency": "daily",
  "startTime": "2023-01-01T09:00:00Z",
  "credentials": {
    "apiKey": "your_api_key",
    "storeUrl": "your_store_url"
  }
}
```
Response: Scheduled import details

## Error Responses

All API endpoints return appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

Error Response Format:
```json
{
  "message": "Error message description",
  "stack": "Stack trace (only in development mode)"
}
```