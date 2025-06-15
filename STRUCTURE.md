# This file is only for editing file nodes, do not break the structure

/src
├── assets/          # Static resources directory, storing static files like images and fonts
│
├── components/      # Components directory
│   ├── ui/         # Pre-installed shadcn/ui components, avoid modifying or rewriting unless necessary
│   ├── layout/     # Layout components for the application structure
│   │   ├── DashboardLayout.tsx # Main dashboard layout component
│   │   ├── Header.tsx          # App header with search, notifications and user menu
│   │   └── Sidebar.tsx         # Navigation sidebar with menu items
│   └── dashboard/  # Dashboard-specific components
│       ├── StatCard.tsx           # Statistic card component
│       ├── SalesChart.tsx         # Sales chart component with time period tabs
│       ├── RecentOrders.tsx       # Recent orders table component
│       ├── InventoryStatus.tsx    # Inventory status table component
│       ├── AiMonitoringSystem.tsx # AI-powered store monitoring system with autonomous operation
│       ├── ProductImporter.tsx    # Product catalog import system for automatic product population
│       └── ContentGenerator.tsx   # AI content generator for marketing, blog posts, and social media
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Pre-installed mobile detection Hook from shadcn (import { useIsMobile } from '@/hooks/use-mobile')
│   └── use-toast.ts  # Toast notification system hook for displaying toast messages (import { useToast } from '@/hooks/use-toast')
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions, including the cn function for merging Tailwind class names
│
├── pages/          # Page components directory, based on React Router structure
│   ├── HomePage.tsx            # Dashboard home page with main statistics and data overview
│   ├── ProductsPage.tsx        # Product management with AI-powered dynamic pricing system
│   ├── InventoryPage.tsx       # Inventory management with predictive AI forecasting
│   ├── CustomersPage.tsx       # Customer management with DNA profiling and personalization engine
│   ├── AnalyticsPage.tsx       # Business intelligence with AI-powered insights and predictions
│   ├── AiMonitoringPage.tsx    # AI monitoring dashboard for 24/7 autonomous store management
│   ├── ProductImporterPage.tsx # Product catalog import system for Shopify, Amazon, AliExpress, etc.
│   ├── ContentGeneratorPage.tsx # AI-powered content generation system for marketing automation
│   ├── PlaceholderPage.tsx     # Generic placeholder page for routes under development
│   └── NotFoundPage.tsx        # 404 error page component, displays when users access non-existent routes
│
├── services/       # API and service integration directory
│   └── api.ts      # API service with endpoints for products, orders, customers, etc.
│ 
├── store/          # State management directory using Zustand
│   ├── authStore.ts       # Authentication state management
│   ├── productStore.ts    # Product state management
│   ├── categoryStore.ts   # Category state management
│   ├── orderStore.ts      # Order state management
│   └── supplierStore.ts   # Supplier state management
│
├── App.tsx         # Root component, with React Router routing system configured
│                   # Add new route configurations in this file
│                   # Includes catch-all route (*) for 404 page handling
│
├── main.tsx        # Entry file, rendering the root component and mounting to the DOM
│
├── index.css       # Global styles file, containing Tailwind configuration and custom styles
│                   # Modify theme colors and design system variables in this file 
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file
                      # Contains theme customization, plugins, and content paths
                      # Includes shadcn/ui theme configuration 
