import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductsPage from "@/pages/ProductsPage";
import InventoryPage from "@/pages/InventoryPage";
import CustomersPage from "@/pages/CustomersPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AiMonitoringPage from "@/pages/AiMonitoringPage";
import ProductImporterPage from "@/pages/ProductImporterPage";
import ContentGeneratorPage from "@/pages/ContentGeneratorPage";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders" element={
            <PlaceholderPage 
              title="Order Management" 
              description="View and process customer orders, manage fulfillment, handle returns and refunds."
            />
          } />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/suppliers" element={
            <PlaceholderPage 
              title="Supplier Management" 
              description="Manage your supplier relationships, track orders, and integrate with supplier APIs."
            />
          } />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/marketing" element={
            <PlaceholderPage 
              title="Marketing & Automation" 
              description="Create campaigns, manage content, set up automated workflows, and analyze marketing performance."
            />
          } />
          <Route path="/account" element={
            <PlaceholderPage 
              title="Account Settings" 
              description="Manage your account details, security settings, and preferences."
            />
          } />
          <Route path="/settings" element={
            <PlaceholderPage 
              title="System Settings" 
              description="Configure system-wide settings, integrations, and automation rules."
            />
          } />
          <Route path="/support" element={
            <PlaceholderPage 
              title="Support Center" 
              description="Get help with using the platform, contact support, and access documentation."
            />
          } />
          
          {/* New AI Automation Pages */}
          <Route path="/ai-monitoring" element={<AiMonitoringPage />} />
          <Route path="/product-importer" element={<ProductImporterPage />} />
          <Route path="/content-generator" element={<ContentGeneratorPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;