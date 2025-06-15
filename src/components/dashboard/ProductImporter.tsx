import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { 
  FileInput, FileCode, ShoppingBag, Download, ArrowDownToLine, RefreshCcw, CheckCircle2, 
  Box, RotateCcw, AlertCircle, Database, Bot, Waypoints, Settings, Cloud
} from "lucide-react";

interface ImportStatus {
  id: string;
  source: string;
  status: "queued" | "processing" | "completed" | "error";
  productsFound: number;
  productsImported: number;
  timestamp: string;
  error?: string;
  lastSync?: string;
}

export function ProductImporter() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("shopify");
  const [importProgress, setImportProgress] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [importStatuses, setImportStatuses] = useState<ImportStatus[]>([
    {
      id: "imp-001",
      source: "Shopify",
      status: "completed",
      productsFound: 245,
      productsImported: 245,
      timestamp: "2023-06-15 14:32:45",
      lastSync: "2 days ago"
    },
    {
      id: "imp-002",
      source: "AliExpress",
      status: "completed",
      productsFound: 892,
      productsImported: 874,
      timestamp: "2023-06-10 09:15:22",
      lastSync: "7 days ago"
    },
    {
      id: "imp-003",
      source: "Amazon",
      status: "error",
      productsFound: 156,
      productsImported: 112,
      timestamp: "2023-06-08 16:48:03",
      error: "API rate limit exceeded",
      lastSync: "9 days ago"
    }
  ]);

  const [importConfig, setImportConfig] = useState({
    shopify: {
      apiKey: "",
      storeUrl: "",
      syncImages: true,
      syncInventory: true,
      syncPrices: true,
      enrichProducts: true,
      scheduleSync: "daily",
    },
    aliexpress: {
      apiKey: "",
      enrichProducts: true,
      autoTranslate: true,
      filterRating: true,
      minRating: 4.5,
      scheduleSync: "weekly",
    },
    amazon: {
      apiKey: "",
      marketplaceId: "",
      enrichProducts: true,
      maxProducts: 1000,
      scheduleSync: "daily",
    },
    csv: {
      enrichProducts: true,
      overwriteExisting: false,
      scheduleSync: "manual",
    }
  });

  const [enrichmentSettings, setEnrichmentSettings] = useState({
    improveTitles: true,
    enhanceDescriptions: true,
    generateSEOKeywords: true,
    createMetaDescriptions: true,
    suggestCategories: true,
    extractFeatures: true,
    translateToEnglish: false,
  });

  const handleImport = (source: string) => {
    setIsLoading(true);
    setImportProgress(0);
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          
          // Add new import status
          const newStatus: ImportStatus = {
            id: `imp-${Math.floor(Math.random() * 1000)}`,
            source: source.charAt(0).toUpperCase() + source.slice(1),
            status: "completed",
            productsFound: Math.floor(Math.random() * 500) + 50,
            productsImported: Math.floor(Math.random() * 500) + 50,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
            lastSync: "Just now"
          };
          
          setImportStatuses(prev => [newStatus, ...prev]);
          
          toast({
            title: "Import Completed",
            description: `Successfully imported products from ${source.charAt(0).toUpperCase() + source.slice(1)}.`
          });
          
          return null;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 400);
    
    // Clear interval if component unmounts
    return () => clearInterval(interval);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "queued":
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Queued</span>;
      case "processing":
        return <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">Processing</span>;
      case "completed":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      case "error":
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Error</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span>Product Catalog Automation</span>
          </h2>
          <p className="text-muted-foreground">
            Automatically import and enrich products from multiple sources
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="shopify" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="shopify" className="flex items-center gap-2">
              <ShoppingBag size={16} />
              <span>Shopify</span>
            </TabsTrigger>
            <TabsTrigger value="aliexpress" className="flex items-center gap-2">
              <Cloud size={16} />
              <span>AliExpress</span>
            </TabsTrigger>
            <TabsTrigger value="amazon" className="flex items-center gap-2">
              <Box size={16} />
              <span>Amazon</span>
            </TabsTrigger>
            <TabsTrigger value="csv" className="flex items-center gap-2">
              <FileCode size={16} />
              <span>CSV Import</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings size={16} />
              <span>Global Settings</span>
            </Button>
          </div>
        </div>
        
        {/* Shopify Integration */}
        <TabsContent value="shopify" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Shopify Integration</span>
                </CardTitle>
                <CardDescription>
                  Import products from your Shopify store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="shopify-api-key" className="block text-sm font-medium">
                    API Key / Access Token
                  </label>
                  <Input
                    id="shopify-api-key"
                    value={importConfig.shopify.apiKey}
                    onChange={e => setImportConfig({
                      ...importConfig,
                      shopify: {
                        ...importConfig.shopify,
                        apiKey: e.target.value
                      }
                    })}
                    placeholder="Enter your Shopify API key"
                    type="password"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="shopify-store-url" className="block text-sm font-medium">
                    Store URL
                  </label>
                  <Input
                    id="shopify-store-url"
                    value={importConfig.shopify.storeUrl}
                    onChange={e => setImportConfig({
                      ...importConfig,
                      shopify: {
                        ...importConfig.shopify,
                        storeUrl: e.target.value
                      }
                    })}
                    placeholder="your-store.myshopify.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your full Shopify store URL
                  </p>
                </div>
                
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-medium">Import Options</h4>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="sync-images" className="text-sm text-muted-foreground">
                      Sync product images
                    </label>
                    <Switch
                      id="sync-images"
                      checked={importConfig.shopify.syncImages}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        shopify: {
                          ...importConfig.shopify,
                          syncImages: checked
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="sync-inventory" className="text-sm text-muted-foreground">
                      Sync inventory levels
                    </label>
                    <Switch
                      id="sync-inventory"
                      checked={importConfig.shopify.syncInventory}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        shopify: {
                          ...importConfig.shopify,
                          syncInventory: checked
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="sync-prices" className="text-sm text-muted-foreground">
                      Sync product prices
                    </label>
                    <Switch
                      id="sync-prices"
                      checked={importConfig.shopify.syncPrices}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        shopify: {
                          ...importConfig.shopify,
                          syncPrices: checked
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label htmlFor="enrich-products" className="text-sm text-muted-foreground">
                      AI product enrichment
                    </label>
                    <Switch
                      id="enrich-products"
                      checked={importConfig.shopify.enrichProducts}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        shopify: {
                          ...importConfig.shopify,
                          enrichProducts: checked
                        }
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-medium">Sync Schedule</h4>
                  <Select
                    value={importConfig.shopify.scheduleSync}
                    onValueChange={value => setImportConfig({
                      ...importConfig,
                      shopify: {
                        ...importConfig.shopify,
                        scheduleSync: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual only</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {importProgress !== null && (
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Importing products...</span>
                      <span>{importProgress}%</span>
                    </div>
                    <Progress value={importProgress} className="h-2" />
                  </div>
                )}
                <div className="w-full flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => {
                      toast({
                        title: "Connection Tested",
                        description: "Successfully connected to Shopify API."
                      });
                    }}
                    disabled={isLoading}
                  >
                    <Waypoints size={16} />
                    <span>Test Connection</span>
                  </Button>
                  <Button 
                    className="flex items-center gap-2" 
                    onClick={() => handleImport("shopify")}
                    disabled={isLoading}
                  >
                    <Download size={16} />
                    <span>Import Products</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            {/* AI Enrichment Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    <span>AI Product Enrichment</span>
                  </CardTitle>
                  <CardDescription>
                    Automatically enhance product listings with AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="improve-titles" 
                        checked={enrichmentSettings.improveTitles}
                        onCheckedChange={checked => setEnrichmentSettings({
                          ...enrichmentSettings,
                          improveTitles: checked === true
                        })}
                      />
                      <label htmlFor="improve-titles" className="text-sm font-medium">
                        Optimize product titles
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Enhance readability and SEO with AI-generated titles
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="enhance-descriptions" 
                        checked={enrichmentSettings.enhanceDescriptions}
                        onCheckedChange={checked => setEnrichmentSettings({
                          ...enrichmentSettings,
                          enhanceDescriptions: checked === true
                        })}
                      />
                      <label htmlFor="enhance-descriptions" className="text-sm font-medium">
                        Enhance product descriptions
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Generate detailed, marketing-focused descriptions
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="generate-seo" 
                        checked={enrichmentSettings.generateSEOKeywords}
                        onCheckedChange={checked => setEnrichmentSettings({
                          ...enrichmentSettings,
                          generateSEOKeywords: checked === true
                        })}
                      />
                      <label htmlFor="generate-seo" className="text-sm font-medium">
                        Generate SEO keywords
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Add high-performance search keywords
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="create-meta" 
                        checked={enrichmentSettings.createMetaDescriptions}
                        onCheckedChange={checked => setEnrichmentSettings({
                          ...enrichmentSettings,
                          createMetaDescriptions: checked === true
                        })}
                      />
                      <label htmlFor="create-meta" className="text-sm font-medium">
                        Create meta descriptions
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Generate optimized meta descriptions for search results
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="suggest-categories" 
                        checked={enrichmentSettings.suggestCategories}
                        onCheckedChange={checked => setEnrichmentSettings({
                          ...enrichmentSettings,
                          suggestCategories: checked === true
                        })}
                      />
                      <label htmlFor="suggest-categories" className="text-sm font-medium">
                        Auto-categorize products
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Automatically assign products to appropriate categories
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="extract-features" 
                        checked={enrichmentSettings.extractFeatures}
                        onCheckedChange={checked => setEnrichmentSettings({
                          ...enrichmentSettings,
                          extractFeatures: checked === true
                        })}
                      />
                      <label htmlFor="extract-features" className="text-sm font-medium">
                        Extract product features
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Identify and highlight key product features
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Imports</CardTitle>
                  <CardDescription>
                    Recent product import history
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-y-auto">
                  {importStatuses.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No import history found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {importStatuses.map((status) => (
                        <div key={status.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {status.source === "Shopify" && <ShoppingBag size={16} />}
                              {status.source === "AliExpress" && <Cloud size={16} />}
                              {status.source === "Amazon" && <Box size={16} />}
                              {status.source === "CSV" && <FileCode size={16} />}
                              <span className="font-medium">{status.source}</span>
                            </div>
                            {getStatusBadge(status.status)}
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">
                            {status.timestamp}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Products: {status.productsImported} / {status.productsFound}</span>
                            <span>Last sync: {status.lastSync}</span>
                          </div>
                          {status.error && (
                            <div className="mt-2 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle size={12} />
                              <span>{status.error}</span>
                            </div>
                          )}
                          <div className="mt-3 flex items-center gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <RotateCcw size={14} />
                              <span>Sync</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-1">
                              <RefreshCcw size={14} />
                              <span>View Log</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* AliExpress Integration */}
        <TabsContent value="aliexpress">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                <span>AliExpress Integration</span>
              </CardTitle>
              <CardDescription>
                Import products from AliExpress Dropshipping Center
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    API Key
                  </label>
                  <Input
                    value={importConfig.aliexpress.apiKey}
                    onChange={e => setImportConfig({
                      ...importConfig,
                      aliexpress: {
                        ...importConfig.aliexpress,
                        apiKey: e.target.value
                      }
                    })}
                    placeholder="Enter your AliExpress API key"
                    type="password"
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Import Options</h4>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">
                      Auto-translate product descriptions
                    </label>
                    <Switch
                      checked={importConfig.aliexpress.autoTranslate}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        aliexpress: {
                          ...importConfig.aliexpress,
                          autoTranslate: checked
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">
                      Filter by minimum rating
                    </label>
                    <Switch
                      checked={importConfig.aliexpress.filterRating}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        aliexpress: {
                          ...importConfig.aliexpress,
                          filterRating: checked
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2 pl-6">
                    <label className="text-sm text-muted-foreground">
                      Minimum rating (0-5)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={importConfig.aliexpress.minRating}
                      onChange={e => setImportConfig({
                        ...importConfig,
                        aliexpress: {
                          ...importConfig.aliexpress,
                          minRating: parseFloat(e.target.value)
                        }
                      })}
                      disabled={!importConfig.aliexpress.filterRating}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <label className="text-sm text-muted-foreground">
                      AI product enrichment
                    </label>
                    <Switch
                      checked={importConfig.aliexpress.enrichProducts}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        aliexpress: {
                          ...importConfig.aliexpress,
                          enrichProducts: checked
                        }
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Sync Schedule</h4>
                  <Select
                    value={importConfig.aliexpress.scheduleSync}
                    onValueChange={value => setImportConfig({
                      ...importConfig,
                      aliexpress: {
                        ...importConfig.aliexpress,
                        scheduleSync: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual only</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Waypoints size={16} />
                <span>Test Connection</span>
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={() => handleImport("aliexpress")}
              >
                <Download size={16} />
                <span>Import Products</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Amazon Integration */}
        <TabsContent value="amazon">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Box className="h-5 w-5" />
                <span>Amazon Integration</span>
              </CardTitle>
              <CardDescription>
                Import products from Amazon marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    API Key / Access Token
                  </label>
                  <Input
                    value={importConfig.amazon.apiKey}
                    onChange={e => setImportConfig({
                      ...importConfig,
                      amazon: {
                        ...importConfig.amazon,
                        apiKey: e.target.value
                      }
                    })}
                    placeholder="Enter your Amazon API key"
                    type="password"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Marketplace ID
                  </label>
                  <Input
                    value={importConfig.amazon.marketplaceId}
                    onChange={e => setImportConfig({
                      ...importConfig,
                      amazon: {
                        ...importConfig.amazon,
                        marketplaceId: e.target.value
                      }
                    })}
                    placeholder="e.g., ATVPDKIKX0DER for US"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the ID for your target Amazon marketplace
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Maximum Products to Import
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={importConfig.amazon.maxProducts}
                    onChange={e => setImportConfig({
                      ...importConfig,
                      amazon: {
                        ...importConfig.amazon,
                        maxProducts: parseInt(e.target.value)
                      }
                    })}
                    placeholder="1000"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">
                    AI product enrichment
                  </label>
                  <Switch
                    checked={importConfig.amazon.enrichProducts}
                    onCheckedChange={checked => setImportConfig({
                      ...importConfig,
                      amazon: {
                        ...importConfig.amazon,
                        enrichProducts: checked
                      }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Sync Schedule</h4>
                  <Select
                    value={importConfig.amazon.scheduleSync}
                    onValueChange={value => setImportConfig({
                      ...importConfig,
                      amazon: {
                        ...importConfig.amazon,
                        scheduleSync: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual only</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <Waypoints size={16} />
                <span>Test Connection</span>
              </Button>
              <Button 
                className="flex items-center gap-2"
                onClick={() => handleImport("amazon")}
              >
                <Download size={16} />
                <span>Import Products</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      
        {/* CSV Import */}
        <TabsContent value="csv">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                <span>CSV Import</span>
              </CardTitle>
              <CardDescription>
                Import products using a CSV file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="csv-file" className="text-sm font-medium">
                    Upload CSV File
                  </label>
                  <div className="flex items-center gap-2">
                    <Input id="csv-file" type="file" accept=".csv" />
                    <Button variant="secondary" className="flex items-center gap-1">
                      <FileInput size={16} />
                      <span>Browse</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload a CSV file with product data
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Import Options</h4>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">
                      Overwrite existing products
                    </label>
                    <Switch
                      checked={importConfig.csv.overwriteExisting}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        csv: {
                          ...importConfig.csv,
                          overwriteExisting: checked
                        }
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-muted-foreground">
                      AI product enrichment
                    </label>
                    <Switch
                      checked={importConfig.csv.enrichProducts}
                      onCheckedChange={checked => setImportConfig({
                        ...importConfig,
                        csv: {
                          ...importConfig.csv,
                          enrichProducts: checked
                        }
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="csv-format">
                      <AccordionTrigger className="text-sm">CSV Format Information</AccordionTrigger>
                      <AccordionContent>
                        <div className="text-xs space-y-2">
                          <p>Your CSV file should include the following columns:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>sku (required): Unique product identifier</li>
                            <li>title (required): Product name</li>
                            <li>description: Detailed product description</li>
                            <li>price: Product price (numeric, without currency symbol)</li>
                            <li>inventory: Stock quantity (numeric)</li>
                            <li>category: Product category</li>
                            <li>imageUrl: URL to product image</li>
                            <li>weight: Product weight</li>
                            <li>dimensions: Product dimensions</li>
                          </ul>
                          <div className="pt-2">
                            <a href="#" className="text-primary hover:underline flex items-center gap-1">
                              <ArrowDownToLine size={14} />
                              <span>Download CSV Template</span>
                            </a>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div />
              <Button 
                className="flex items-center gap-2"
                onClick={() => handleImport("csv")}
              >
                <Download size={16} />
                <span>Import Products</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 rounded-full p-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Automated Product Catalog Management</h3>
            <p className="text-sm text-blue-700 mt-1">
              The system will automatically import products based on your settings, 
              enrich them with AI-generated content, and maintain inventory synchronization. 
              You can schedule regular imports or run them manually as needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}