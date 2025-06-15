import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertCircle, Brain, Cpu, Settings, Activity, Zap, BarChart4, ShoppingCart, 
  Package, ArrowUpRight, ArrowDownRight, CheckCheck, Users,
  MonitorCheck, Bot, PauseCircle, Clock, Sparkles, List, Webhook
} from "lucide-react";

interface MonitoringCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "active" | "inactive" | "alert" | "processing";
  children: React.ReactNode;
}

function MonitoringCard({ title, description, icon, status, children }: MonitoringCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "active": return "bg-green-500";
      case "inactive": return "bg-gray-300";
      case "alert": return "bg-red-500";
      case "processing": return "bg-blue-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              {icon}
              <span>{title}</span>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export function AiMonitoringSystem() {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [autonomyLevel, setAutonomyLevel] = useState<number>(70);
  const [activeMonitors, setActiveMonitors] = useState<string[]>([
    "inventory", "pricing", "orders", "marketing", "support"
  ]);
  const [alertThreshold, setAlertThreshold] = useState<string>("medium");
  const [systemStatus, setSystemStatus] = useState<{
    uptime: string;
    lastAction: string;
    actionsToday: number;
    currentLoad: number;
  }>({
    uptime: "16 days, 7 hours",
    lastAction: "Updated pricing for 3 products (2 min ago)",
    actionsToday: 53,
    currentLoad: 24
  });

  const [recentActivities, setRecentActivities] = useState<{
    time: string;
    action: string;
    type: string;
    status: "success" | "pending" | "warning" | "error";
  }[]>([
    {
      time: "2 min ago",
      action: "Updated dynamic pricing for Samsung QLED TV",
      type: "pricing",
      status: "success"
    },
    {
      time: "15 min ago",
      action: "Created purchase order for Wireless Earbuds Pro (stock low)",
      type: "inventory",
      status: "success"
    },
    {
      time: "23 min ago",
      action: "Detected price drop on competitor site for Smart Watch Series 5",
      type: "pricing",
      status: "warning"
    },
    {
      time: "47 min ago",
      action: "Auto-responded to 3 customer support tickets",
      type: "support",
      status: "success"
    },
    {
      time: "1 hour ago",
      action: "Adjusted ad budget allocation (+15% to performing campaign)",
      type: "marketing",
      status: "success"
    },
    {
      time: "1 hour ago",
      action: "Automatic refund processed for order #8294",
      type: "orders",
      status: "success"
    }
  ]);

  // Simulated metrics that would come from a real monitoring system
  const metrics = {
    pricing: {
      optimizationsToday: 37,
      revenueImpact: "+8.4%",
      marginImprovement: "+5.2%",
      competitorChecks: 142
    },
    inventory: {
      purchaseOrders: 5,
      stockoutsPrevented: 8,
      overstockPrevented: 3,
      inventoryHealth: 94
    },
    orders: {
      processed: 78,
      autoFulfilled: 56,
      refundsProcessed: 3,
      issuesDetected: 2
    },
    marketing: {
      campaignsOptimized: 4,
      adsBudgetAdjusted: 12,
      contentGenerated: 8,
      performanceIncrease: "+12.3%"
    }
  };

  const handleToggleSystem = (value: boolean) => {
    setIsEnabled(value);
    
    // Show toast notification
    if (value) {
      toast({
        title: "AI Monitoring Enabled",
        description: "The system will autonomously manage your store 24/7."
      });
    } else {
      toast({
        title: "AI Monitoring Disabled",
        description: "The system will only track events but won't take actions."
      });
    }
  };

  const handleToggleMonitor = (monitorName: string) => {
    if (activeMonitors.includes(monitorName)) {
      setActiveMonitors(activeMonitors.filter(m => m !== monitorName));
      toast({
        title: `${monitorName.charAt(0).toUpperCase() + monitorName.slice(1)} Monitoring Disabled`,
        description: `The AI will no longer monitor or make changes to ${monitorName}.`
      });
    } else {
      setActiveMonitors([...activeMonitors, monitorName]);
      toast({
        title: `${monitorName.charAt(0).toUpperCase() + monitorName.slice(1)} Monitoring Enabled`,
        description: `The AI will now monitor and optimize ${monitorName} automatically.`
      });
    }
  };

  const handleSetAutonomyLevel = (value: number[]) => {
    setAutonomyLevel(value[0]);
    let description = "";
    
    if (value[0] < 30) {
      description = "AI will only suggest changes but won't take action automatically.";
    } else if (value[0] < 70) {
      description = "AI will make routine decisions but will request approval for significant changes.";
    } else {
      description = "AI has full autonomy to make decisions and optimize your store operations.";
    }
    
    toast({
      title: `Autonomy Level: ${value[0]}%`,
      description
    });
  };
  
  // This simulates real-time activity that would happen in a production system
  useEffect(() => {
    if (!isEnabled) return;
    
    const interval = setInterval(() => {
      // Simulate a new activity happening
      const actions = [
        "Updated dynamic pricing for Kitchen Blender 2000",
        "Created purchase order for Smart Watch Series 5 (stock low)",
        "Optimized ad campaign budget allocation",
        "Processed refund for order #8376",
        "Auto-responded to customer support ticket #4582",
        "Detected potential stockout for Vitamin C Serum",
        "Adjusted product ranking in 'Best Sellers' category",
        "Generated social media post for new product launch"
      ];
      
      const types = ["pricing", "inventory", "marketing", "orders", "support"];
      const statuses: ("success" | "pending" | "warning" | "error")[] = ["success", "success", "success", "warning", "pending"];
      
      const newActivity = {
        time: "Just now",
        action: actions[Math.floor(Math.random() * actions.length)],
        type: types[Math.floor(Math.random() * types.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
      
      // Update recent activities
      setRecentActivities(prev => [newActivity, ...prev.slice(0, 5)]);
      
      // Update system status
      setSystemStatus(prev => ({
        ...prev,
        lastAction: newActivity.action + " (just now)",
        actionsToday: prev.actionsToday + 1,
        currentLoad: Math.floor(Math.random() * 40) + 10
      }));
      
    }, 45000); // Add new activity every 45 seconds
    
    return () => clearInterval(interval);
  }, [isEnabled, toast]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "pricing": return <Zap className="h-4 w-4 text-amber-500" />;
      case "inventory": return <Package className="h-4 w-4 text-blue-500" />;
      case "marketing": return <BarChart4 className="h-4 w-4 text-purple-500" />;
      case "orders": return <ShoppingCart className="h-4 w-4 text-green-500" />;
      case "support": return <Users className="h-4 w-4 text-indigo-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityStatusColor = (status: "success" | "pending" | "warning" | "error") => {
    switch (status) {
      case "success": return "bg-green-500";
      case "pending": return "bg-blue-500";
      case "warning": return "bg-amber-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span>AI Store Monitoring System</span>
          </h2>
          <p className="text-muted-foreground">
            Autonomous 24/7 management of your e-commerce operations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">System: {isEnabled ? "Online" : "Standby"}</span>
            <Switch checked={isEnabled} onCheckedChange={handleToggleSystem} />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings size={16} /> Configure
          </Button>
        </div>
      </div>
      
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              {isEnabled ? (
                <>
                  <MonitorCheck className="h-6 w-6" />
                  <span>Active</span>
                </>
              ) : (
                <>
                  <PauseCircle className="h-6 w-6" />
                  <span>Standby</span>
                </>
              )}
            </div>
            <div className="text-sm mt-1 text-primary-foreground/80">
              {isEnabled ? "Autonomously managing store operations" : "Monitoring only - no actions taken"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold">{systemStatus.uptime}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Actions Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-green-500" />
              <div className="text-2xl font-bold">{systemStatus.actionsToday}</div>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Autonomous actions taken
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">System Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-500" />
              <div className="text-2xl font-bold">{systemStatus.currentLoad}%</div>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Processing capacity
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Monitoring Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Status</CardTitle>
              <CardDescription>
                Real-time monitoring of store operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MonitoringCard 
                  title="Inventory Management" 
                  description="Stock levels and purchase orders"
                  icon={<Package size={18} />}
                  status={activeMonitors.includes("inventory") ? "active" : "inactive"}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Active</span>
                    <Switch 
                      checked={activeMonitors.includes("inventory")} 
                      onCheckedChange={() => handleToggleMonitor("inventory")} 
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Purchase Orders Created</span>
                      <span>{metrics.inventory.purchaseOrders}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Stockouts Prevented</span>
                      <span className="text-green-500 font-medium">{metrics.inventory.stockoutsPrevented}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Overstock Prevented</span>
                      <span>{metrics.inventory.overstockPrevented}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Inventory Health</span>
                      <span className="text-green-500 font-medium">{metrics.inventory.inventoryHealth}%</span>
                    </div>
                  </div>
                </MonitoringCard>

                <MonitoringCard 
                  title="Dynamic Pricing" 
                  description="Competitor monitoring and price adjustments"
                  icon={<Zap size={18} />}
                  status={activeMonitors.includes("pricing") ? "active" : "inactive"}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Active</span>
                    <Switch 
                      checked={activeMonitors.includes("pricing")} 
                      onCheckedChange={() => handleToggleMonitor("pricing")} 
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Optimizations Today</span>
                      <span>{metrics.pricing.optimizationsToday}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Revenue Impact</span>
                      <span className="text-green-500 font-medium">{metrics.pricing.revenueImpact}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Margin Improvement</span>
                      <span className="text-green-500 font-medium">{metrics.pricing.marginImprovement}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Competitor Checks</span>
                      <span>{metrics.pricing.competitorChecks}</span>
                    </div>
                  </div>
                </MonitoringCard>

                <MonitoringCard 
                  title="Order Processing" 
                  description="Fulfillment automation and refunds"
                  icon={<ShoppingCart size={18} />}
                  status={activeMonitors.includes("orders") ? "active" : "inactive"}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Active</span>
                    <Switch 
                      checked={activeMonitors.includes("orders")} 
                      onCheckedChange={() => handleToggleMonitor("orders")} 
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Orders Processed</span>
                      <span>{metrics.orders.processed}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Auto-Fulfilled</span>
                      <span>{metrics.orders.autoFulfilled}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Refunds Processed</span>
                      <span>{metrics.orders.refundsProcessed}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Issues Detected</span>
                      <span className={metrics.orders.issuesDetected > 0 ? "text-amber-500 font-medium" : ""}>
                        {metrics.orders.issuesDetected}
                      </span>
                    </div>
                  </div>
                </MonitoringCard>

                <MonitoringCard 
                  title="Marketing Automation" 
                  description="Campaign adjustments and content generation"
                  icon={<BarChart4 size={18} />}
                  status={activeMonitors.includes("marketing") ? "active" : "inactive"}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium">Active</span>
                    <Switch 
                      checked={activeMonitors.includes("marketing")} 
                      onCheckedChange={() => handleToggleMonitor("marketing")} 
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Campaigns Optimized</span>
                      <span>{metrics.marketing.campaignsOptimized}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Ad Budget Adjustments</span>
                      <span>{metrics.marketing.adsBudgetAdjusted}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Content Generated</span>
                      <span>{metrics.marketing.contentGenerated}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Performance Increase</span>
                      <span className="text-green-500 font-medium">{metrics.marketing.performanceIncrease}</span>
                    </div>
                  </div>
                </MonitoringCard>
              </div>
            </CardContent>
          </Card>

          {/* System Activity */}
          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>
                Recent automated actions and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getActivityStatusColor(activity.status)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {getActivityIcon(activity.type)}
                        <span className="font-medium text-sm">{activity.action}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
                
                {recentActivities.length === 0 && (
                  <div className="text-center py-6">
                    <div className="text-muted-foreground">No recent activity</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* System Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Adjust AI behavior and autonomy level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">AI Autonomy Level</label>
                  <span className="text-sm font-bold">{autonomyLevel}%</span>
                </div>
                <Slider 
                  defaultValue={[autonomyLevel]} 
                  max={100} 
                  step={10}
                  onValueChange={handleSetAutonomyLevel}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Suggestions Only</span>
                  <span>Semi-Autonomous</span>
                  <span>Full Autonomy</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Alert Threshold</label>
                <Select 
                  value={alertThreshold} 
                  onValueChange={setAlertThreshold}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select alert threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Alert for minor issues)</SelectItem>
                    <SelectItem value="medium">Medium (Standard alerts)</SelectItem>
                    <SelectItem value="high">High (Critical issues only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">System Features</label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Bot size={16} />
                      <span className="text-sm">Customer Support Bot</span>
                    </div>
                    <Switch checked={activeMonitors.includes("support")} onCheckedChange={() => handleToggleMonitor("support")} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} />
                      <span className="text-sm">Content Generation</span>
                    </div>
                    <Switch checked={activeMonitors.includes("content")} onCheckedChange={() => handleToggleMonitor("content")} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <List size={16} />
                      <span className="text-sm">Product Enrichment</span>
                    </div>
                    <Switch checked={activeMonitors.includes("enrichment")} onCheckedChange={() => handleToggleMonitor("enrichment")} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Webhook size={16} />
                      <span className="text-sm">API Integrations</span>
                    </div>
                    <Switch checked={activeMonitors.includes("integrations")} onCheckedChange={() => handleToggleMonitor("integrations")} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Impact</CardTitle>
              <CardDescription>
                Business impact of AI automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Revenue Impact</div>
                    <div className="font-semibold">+16.8% increase</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Profit Margin</div>
                    <div className="font-semibold">+8.2% improvement</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <ArrowDownRight size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Operational Costs</div>
                    <div className="font-semibold">-23.5% reduction</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <ArrowDownRight size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Manual Work Hours</div>
                    <div className="font-semibold">-84.7% reduction</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-100">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-700 font-medium">AI System ROI</p>
                    <p className="text-sm text-green-600 mt-1">
                      The AI monitoring system has generated a 7.8x return on investment
                      since activation. Time saved: 143 hours per month.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}