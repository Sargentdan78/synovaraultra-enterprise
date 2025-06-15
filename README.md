# AI-Powered E-commerce Automation Platform

A comprehensive e-commerce management system with revolutionary AI features, built with React, Node.js, and MongoDB.

## Features

- **AI-Powered Dynamic Pricing System**
  - Intelligent price optimization based on competitors, demand patterns, and inventory levels

- **Predictive Inventory Management**
  - Machine learning forecasting for demand prediction
  - Automatic purchase order generation
  - Inventory level optimization

- **Customer DNA Personalization Engine**
  - Sophisticated customer profiling
  - Behavioral pattern analysis
  - Personalized product recommendations

- **24/7 Autonomous Store Monitoring**
  - AI-based system that monitors and manages your store
  - Configurable autonomy levels
  - Handles pricing, inventory, and marketing while you're offline

- **Automatic Product Import System**
  - Multi-source catalog population (Shopify, Amazon, AliExpress, CSV)
  - AI-enhanced product descriptions and images
  - Scheduled synchronization

- **AI Content Generator**
  - Blog post generation
  - Social media content creation
  - Product descriptions and marketing content

- **Business Intelligence Dashboard**
  - AI-powered analytics
  - Predictive insights
  - Automated recommendations

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui (based on Radix UI)
- Zustand for state management
- Chart.js for data visualization

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Stripe integration for payments

## Deployment on Railway

### Prerequisites

1. [Railway Account](https://railway.app/)
2. MongoDB database (can be provisioned on Railway or use MongoDB Atlas)
3. Stripe account for payment processing (optional)
4. OpenAI API key for enhanced AI capabilities (optional)

### Deployment Steps

1. **Fork or clone this repository**

2. **Set up Railway project**
   - Create a new project in Railway
   - Add this repository as the source
   - Add a MongoDB service or connect an external MongoDB database

3. **Configure environment variables in Railway**
   Required variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

   Optional variables (for enhanced functionality):
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Deploy your application**
   - Railway will automatically build and deploy the application based on the configuration in railway.toml and nixpacks.toml

5. **Initialize the database**
   - To seed the database with initial data, run the following command in Railway shell:
     ```
     npm run seed:api
     ```

6. **Access your application**
   - Once deployed, Railway will provide you with a URL to access your application

## Local Development

1. **Clone the repository**
   ```
   git clone [repository-url]
   cd [repository-name]
   ```

2. **Install dependencies**
   ```
   npm run install:all
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Create a `.env` file in the `api` directory
   - Use the `.env.example` files as templates

4. **Start development servers**
   ```
   npm run dev
   ```
   This will start both the frontend (Vite) and backend (Express) development servers.

5. **Seed the database**
   ```
   npm run seed:api
   ```

## Admin Access

After seeding the database, you can access the admin panel with these credentials:
- Email: admin@example.com
- Password: 123456

## API Documentation

The API is RESTful and supports the following main endpoints:

- `/api/users` - User management and authentication
- `/api/products` - Product management
- `/api/orders` - Order management
- `/api/suppliers` - Supplier management
- `/api/categories` - Category management
- `/api/ai` - AI-powered features and automation

For detailed API documentation, refer to the endpoint implementations in the `api/routes` directory.

## Security Notes

1. **API Keys**: Never commit API keys to the repository. Always use environment variables.
2. **Railway Environment Variables**: All sensitive information should be stored in Railway's environment variables for production deployment.
3. **Authentication**: The system uses JWT for authentication. Admin-only endpoints are protected.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created with Devv.AI