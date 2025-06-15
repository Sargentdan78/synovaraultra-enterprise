import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  AreaChart, Brain, Calendar, ChevronDown, Download, TrendingUp, TrendingDown, 
  BarChart3, PieChart, Eye, DollarSign, ShoppingCart, Users, Package, Share2
} from "lucide-react";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30");
  const { toast } = useToast();

  const handleGenerateReport = () => {
    // In a real implementation, this would generate a report
    toast({
      title: "Report Generated",
      description: "Your analytics report has been generated and is ready for download."
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Business Intelligence</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered analytics and predictive insights
            </p>
          </div>
          
          <div className="flex gap-2">
            <Select
              value={dateRange}
              onValueChange={setDateRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 Days</SelectItem>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="90">Last 90 Days</SelectItem>
                <SelectItem value="365">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleGenerateReport}
            >
              <Download size={16} />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-4">
          <MetricCard
            icon={<DollarSign className="h-5 w-5 text-blue-600" />}
            iconBg="bg-blue-100"
            title="Revenue"
            value="$126,485"
            change="+12.3%"
            isPositive={true}
            description="vs. previous period"
          />
          
          <MetricCard
            icon={<ShoppingCart className="h-5 w-5 text-purple-600" />}
            iconBg="bg-purple-100"
            title="Orders"
            value="1,643"
            change="+8.5%"
            isPositive={true}
            description="vs. previous period"
          />
          
          <MetricCard
            icon={<Users className="h-5 w-5 text-green-600" />}
            iconBg="bg-green-100"
            title="New Customers"
            value="392"
            change="+15.1%"
            isPositive={true}
            description="vs. previous period"
          />
          
          <MetricCard
            icon={<Eye className="h-5 w-5 text-amber-600" />}
            iconBg="bg-amber-100"
            title="Conversion Rate"
            value="3.8%"
            change="-0.4%"
            isPositive={false}
            description="vs. previous period"
          />
        </div>

        {/* Sales Overview Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Revenue and order volumes with AI-driven predictions
                </CardDescription>
              </div>
              <Select defaultValue="revenue">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                  <SelectItem value="aov">Average Order Value</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="h-80 relative">
            {/* This would be replaced with a real chart component */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <AreaChart size={280} />
            </div>
            
            {/* Mock revenue chart */}
            <div className="absolute inset-0 flex flex-col">
              {/* Chart UI mock */}
              <div className="flex-1 relative">
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-transparent to-primary/10 rounded-md"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-transparent to-primary/5 rounded-md"></div>
                <div className="absolute bottom-0 left-0 right-[40%] h-1 bg-primary/40"></div>
                <div className="absolute bottom-0 left-[60%] right-0 h-1 bg-amber-400/40 dashed-line"></div>
                
                {/* Prediction marker */}
                <div className="absolute bottom-2 left-[59%] px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded border border-amber-200">
                  AI Prediction
                </div>
                
                {/* Legend */}
                <div className="absolute top-2 right-2 flex items-center gap-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-md shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary/60 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Actual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-400/60 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Predicted</span>
                  </div>
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="h-6 flex justify-between text-xs text-muted-foreground px-2">
                <span>Jan 1</span>
                <span>Jan 8</span>
                <span>Jan 15</span>
                <span>Jan 22</span>
                <span>Jan 29</span>
                <span>Feb 5</span>
                <span>Feb 12</span>
              </div>
            </div>
            
            {/* Machine Learning Insight Panel */}
            <div className="absolute top-4 left-4 max-w-sm bg-white/90 backdrop-blur-sm p-4 rounded-md shadow-md border border-muted">
              <div className="flex items-center gap-2">
                <Brain size={18} className="text-primary" />
                <h4 className="font-medium text-sm">AI Insight</h4>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Revenue is projected to increase 15-18% over the next 30 days
                based on seasonal patterns and current market trends.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">92% confidence</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">upward trend</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="forecasts">AI Forecasts</TabsTrigger>
          </TabsList>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>
                    Revenue breakdown by channel
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  {/* This would be replaced with a real chart component */}
                  <div className="h-full w-full flex items-center justify-center relative">
                    <PieChart size={180} className="opacity-10" />
                    
                    {/* Mock pie chart */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-r-violet-500 border-b-green-500 border-l-amber-500"></div>
                        <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="font-medium">Total Sales</div>
                            <div className="text-2xl font-bold">$126.4K</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Online Store (48%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                        <span>Marketplace (28%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Social (15%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <span>Retail (9%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profitability Analysis</CardTitle>
                  <CardDescription>
                    Profit margins by product category
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  {/* This would be replaced with a real chart component */}
                  <div className="h-full w-full flex items-center justify-center relative">
                    <BarChart3 size={220} className="opacity-10" />
                    
                    {/* Mock bar chart */}
                    <div className="absolute inset-0 flex items-end justify-around pb-10">
                      <div className="w-12 bg-blue-500 h-[65%] rounded-t-md"></div>
                      <div className="w-12 bg-blue-500 h-[45%] rounded-t-md"></div>
                      <div className="w-12 bg-blue-500 h-[80%] rounded-t-md"></div>
                      <div className="w-12 bg-blue-500 h-[55%] rounded-t-md"></div>
                      <div className="w-12 bg-blue-500 h-[35%] rounded-t-md"></div>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-muted-foreground">
                      <span>Electronics</span>
                      <span>Fashion</span>
                      <span>Home</span>
                      <span>Beauty</span>
                      <span>Sports</span>
                    </div>
                    
                    {/* AI Insight */}
                    <div className="absolute top-2 right-2 p-2 bg-primary/5 rounded-md border border-primary/20 max-w-xs">
                      <div className="text-xs font-medium flex items-center gap-1">
                        <Brain size={12} /> AI Insight
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground">
                        Home category shows highest profitability (42% margin)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Marketing ROI</CardTitle>
                  <CardDescription>
                    Return on investment across marketing channels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">Paid Search</div>
                          <div className="text-sm font-semibold">580% ROI</div>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">Social Media Ads</div>
                          <div className="text-sm font-semibold">410% ROI</div>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">Email Marketing</div>
                          <div className="text-sm font-semibold">750% ROI</div>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">Affiliate</div>
                          <div className="text-sm font-semibold">320% ROI</div>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Brain size={24} className="text-blue-600" />
                        <div>
                          <h4 className="font-medium text-blue-800">AI-Generated Marketing Insight</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Email campaigns deliver the highest ROI at 750%. Our AI analysis suggests 
                            increasing email marketing budget by 20% could generate an additional $14,500 
                            in monthly revenue. Consider reducing affiliate spend and reallocating to email and 
                            paid search for optimal returns.
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Button size="sm" variant="secondary">Apply Recommendations</Button>
                            <Button size="sm" variant="outline">Generate Campaign</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Products Tab */}
          <TabsContent value="products" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>
                    Products with highest sales volume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-medium">Wireless Earbuds Pro</div>
                          <div className="text-xs text-muted-foreground">Electronics</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">485 units</div>
                        <div className="text-xs text-green-600">+24% growth</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-medium">Smart Watch Series 5</div>
                          <div className="text-xs text-muted-foreground">Electronics</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">417 units</div>
                        <div className="text-xs text-green-600">+18% growth</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-medium">Organic Cotton T-Shirt</div>
                          <div className="text-xs text-muted-foreground">Fashion</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">389 units</div>
                        <div className="text-xs text-red-600">-5% decline</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-medium">Kitchen Blender 2000</div>
                          <div className="text-xs text-muted-foreground">Home</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">352 units</div>
                        <div className="text-xs text-green-600">+31% growth</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="font-medium">Vitamin C Serum</div>
                          <div className="text-xs text-muted-foreground">Beauty</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">347 units</div>
                        <div className="text-xs text-green-600">+12% growth</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance Matrix</CardTitle>
                  <CardDescription>
                    Analysis based on volume and profitability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px] relative border rounded-md">
                    {/* This would be replaced with a real chart component */}
                    <div className="absolute inset-0 p-4">
                      {/* Quadrant labels */}
                      <div className="absolute top-2 left-2 text-xs font-medium">High Volume, Low Margin</div>
                      <div className="absolute top-2 right-2 text-xs font-medium">Stars</div>
                      <div className="absolute bottom-2 left-2 text-xs font-medium">Phase Out</div>
                      <div className="absolute bottom-2 right-2 text-xs font-medium">High Margin, Low Volume</div>
                      
                      {/* Axis */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted"></div>
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-muted"></div>
                      
                      {/* Data points */}
                      <div className="absolute top-[20%] left-[30%] w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="absolute top-[25%] left-[70%] w-5 h-5 bg-green-500 rounded-full"></div>
                      <div className="absolute top-[40%] left-[45%] w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="absolute top-[60%] left-[20%] w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="absolute top-[70%] left-[60%] w-4 h-4 bg-amber-500 rounded-full"></div>
                      <div className="absolute top-[75%] left-[75%] w-3 h-3 bg-purple-500 rounded-full"></div>
                      <div className="absolute top-[30%] left-[85%] w-4 h-4 bg-green-500 rounded-full"></div>
                      <div className="absolute top-[65%] left-[40%] w-2 h-2 bg-red-500 rounded-full"></div>
                      
                      {/* Legend */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-3 py-1 rounded-md text-xs flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Stars</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span>Solid</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span>Potential</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Review</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-primary/5 p-3 rounded-md text-sm">
                    <p><span className="font-medium">AI Analysis:</span> 3 products in the "Stars" category 
                    contribute 42% of total profit. Consider expanding variations and marketing spend
                    for these high-performing items.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Customers Tab */}
          <TabsContent value="customers" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-12">
              <Card className="md:col-span-5">
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>
                    Distribution by lifetime value
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 relative">
                  {/* This would be replaced with a real chart component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 relative">
                      {/* Donut chart segments */}
                      <div className="absolute inset-0 rounded-full border-[16px] border-purple-500 border-r-blue-500 border-b-green-500 border-l-amber-500"></div>
                      <div className="absolute inset-12 rounded-full bg-white"></div>
                    </div>
                    
                    {/* Legend */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-xs">Premium (28%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-xs">Regular (42%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs">Occasional (18%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-xs">New (12%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-7">
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                  <CardDescription>
                    New customer growth and acquisition costs
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 relative">
                  {/* This would be replaced with a real chart component */}
                  <div className="absolute inset-0 flex flex-col p-4">
                    {/* Mock line and bar chart combination */}
                    <div className="flex-1 relative">
                      {/* Mock bar chart (customers acquired) */}
                      <div className="absolute bottom-0 left-[5%] w-[8%] h-[30%] bg-blue-200 rounded-t"></div>
                      <div className="absolute bottom-0 left-[18%] w-[8%] h-[35%] bg-blue-200 rounded-t"></div>
                      <div className="absolute bottom-0 left-[31%] w-[8%] h-[40%] bg-blue-200 rounded-t"></div>
                      <div className="absolute bottom-0 left-[44%] w-[8%] h-[28%] bg-blue-200 rounded-t"></div>
                      <div className="absolute bottom-0 left-[57%] w-[8%] h-[45%] bg-blue-200 rounded-t"></div>
                      <div className="absolute bottom-0 left-[70%] w-[8%] h-[52%] bg-blue-200 rounded-t"></div>
                      <div className="absolute bottom-0 left-[83%] w-[8%] h-[38%] bg-blue-200 rounded-t"></div>
                      
                      {/* Mock line chart (acquisition cost) */}
                      <div className="absolute h-px w-full top-[60%] bg-red-400"></div>
                      <div className="absolute h-2 w-2 top-[60%] left-[9%] bg-red-500 rounded-full"></div>
                      <div className="absolute h-2 w-2 top-[55%] left-[22%] bg-red-500 rounded-full"></div>
                      <div className="absolute h-2 w-2 top-[50%] left-[35%] bg-red-500 rounded-full"></div>
                      <div className="absolute h-2 w-2 top-[58%] left-[48%] bg-red-500 rounded-full"></div>
                      <div className="absolute h-2 w-2 top-[45%] left-[61%] bg-red-500 rounded-full"></div>
                      <div className="absolute h-2 w-2 top-[40%] left-[74%] bg-red-500 rounded-full"></div>
                      <div className="absolute h-2 w-2 top-[48%] left-[87%] bg-red-500 rounded-full"></div>
                      
                      {/* Connect the dots */}
                      <svg className="absolute inset-0" style={{ zIndex: -1 }}>
                        <polyline 
                          points="9%,60% 22%,55% 35%,50% 48%,58% 61%,45% 74%,40% 87%,48%" 
                          fill="none" 
                          stroke="#f87171" 
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    
                    {/* X-axis labels */}
                    <div className="h-6 flex justify-between text-xs text-muted-foreground px-[5%] pt-2">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                    </div>
                    
                    {/* Legend */}
                    <div className="h-6 flex justify-center gap-6 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-200 rounded"></div>
                        <span>New Customers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded"></div>
                        <span>Acquisition Cost</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-12">
                <CardHeader>
                  <CardTitle>Customer Lifetime Value</CardTitle>
                  <CardDescription>
                    Average customer value over time with AI projections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3 h-48 relative">
                      {/* This would be replaced with a real chart component */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <AreaChart size={180} />
                      </div>
                      
                      {/* Mock area chart */}
                      <div className="absolute inset-0 pt-5 flex flex-col">
                        <div className="flex-1 relative">
                          {/* Chart line */}
                          <div className="absolute left-0 right-0 bottom-0 h-[70%] bg-gradient-to-t from-transparent to-primary/10 rounded-md"></div>
                          <div className="absolute left-0 right-[30%] bottom-0 h-[50%] bg-gradient-to-t from-transparent to-primary/5 rounded-md"></div>
                          
                          {/* AI Prediction extension */}
                          <div className="absolute right-0 left-[70%] bottom-0 h-[70%] bg-gradient-to-t from-transparent to-amber-200/30 rounded-md"></div>
                          
                          {/* Divider between actual and predicted */}
                          <div className="absolute top-0 bottom-0 left-[70%] border-l border-dashed border-amber-400"></div>
                          <div className="absolute top-1 left-[71%] text-xs text-amber-500 bg-white px-1">AI Projected</div>
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="h-6 flex justify-between text-xs text-muted-foreground px-2">
                          <span>Day 1</span>
                          <span>Month 1</span>
                          <span>Month 3</span>
                          <span>Month 6</span>
                          <span>Year 1</span>
                          <span>Year 2</span>
                          <span>Year 3</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 space-y-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Average 1-Year LTV</div>
                        <div className="text-2xl font-bold">$328.50</div>
                        <div className="text-xs flex items-center text-green-600">
                          <TrendingUp size={12} className="mr-1" />
                          18.2% increase
                        </div>
                      </div>
                      
                      <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                        <div className="flex items-start gap-2">
                          <Brain size={16} className="text-amber-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-amber-800">AI-Generated Insight</div>
                            <p className="text-xs text-amber-700 mt-1">
                              Your top 20% of customers generate 68% of total revenue. Our AI suggests 
                              focusing retention efforts on this segment could increase projected 3-Year LTV 
                              by 32%, resulting in additional $1.2M annual revenue.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <Share2 size={16} className="mr-2" />
                        Export LTV Analysis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* AI Forecasts Tab */}
          <TabsContent value="forecasts" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain size={18} />
                    <span>AI Business Forecasts</span>
                  </CardTitle>
                  <CardDescription>
                    Machine learning predictions and business insights
                  </CardDescription>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Forecast horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">6 Months</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <AiPredictionCard 
                      icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
                      title="Revenue Forecast"
                      current="$126,485"
                      predicted="$148,200"
                      change="+17.2%"
                      confidenceLevel={92}
                    />
                    <AiPredictionCard 
                      icon={<ShoppingCart className="h-5 w-5 text-blue-600" />}
                      title="Order Volume"
                      current="1,643 orders"
                      predicted="1,895 orders"
                      change="+15.3%"
                      confidenceLevel={88}
                    />
                    <AiPredictionCard 
                      icon={<Users className="h-5 w-5 text-purple-600" />}
                      title="Customer Growth"
                      current="8,427 customers"
                      predicted="9,356 customers"
                      change="+11.0%"
                      confidenceLevel={85}
                    />
                  </div>
                  
                  <div className="p-5 border rounded-lg bg-primary/5">
                    <div className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Key Events in Next 30 Days</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 text-amber-800 rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold">
                          12
                        </div>
                        <div>
                          <div className="font-medium">Expected Inventory Shortage</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <TrendingUp size={14} className="text-red-500" />
                            <span>Wireless Earbuds Pro projected to sell out</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold">
                          18
                        </div>
                        <div>
                          <div className="font-medium">Demand Spike Expected</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <TrendingUp size={14} className="text-green-500" />
                            <span>+45% orders predicted in Home category</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold">
                          23
                        </div>
                        <div>
                          <div className="font-medium">Margin Optimization Opportunity</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <TrendingUp size={14} className="text-blue-500" />
                            <span>Price elasticity favorable for 3% increase</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Market Trend Analysis</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <TrendingUp size={16} className="text-green-500 mt-1" />
                          <span className="text-sm">
                            <strong>Rising Demand:</strong> The Beauty category shows 28% projected growth, 
                            driven by seasonal trends and competitor stock shortages.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingDown size={16} className="text-red-500 mt-1" />
                          <span className="text-sm">
                            <strong>Declining Interest:</strong> Home Office subcategory expected to 
                            decline 12% as remote work trends stabilize.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingUp size={16} className="text-green-500 mt-1" />
                          <span className="text-sm">
                            <strong>Emerging Category:</strong> Sustainable products showing 45% growth 
                            potential based on search trend analysis.
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">AI Recommendations</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronDown size={16} className="text-amber-500 mt-1" />
                          <span className="text-sm">
                            <strong>Pricing Strategy:</strong> Temporary 5% reduction on slow-moving 
                            inventory could increase turnover by 35%.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown size={16} className="text-amber-500 mt-1" />
                          <span className="text-sm">
                            <strong>Inventory Planning:</strong> Increase Smart Watch stock by 20% to 
                            meet projected holiday demand.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown size={16} className="text-amber-500 mt-1" />
                          <span className="text-sm">
                            <strong>Marketing Focus:</strong> Shift 15% of ad spend from Home Office to 
                            Beauty category for optimal ROI.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  description: string;
}

function MetricCard({ icon, iconBg, title, value, change, isPositive, description }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`h-10 w-10 rounded-full ${iconBg} flex items-center justify-center`}>
            {icon}
          </div>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-muted-foreground text-sm">
          <span>{title}</span>
          <span className="mx-1">•</span>
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

interface AiPredictionCardProps {
  icon: React.ReactNode;
  title: string;
  current: string;
  predicted: string;
  change: string;
  confidenceLevel: number;
}

function AiPredictionCard({ icon, title, current, predicted, change, confidenceLevel }: AiPredictionCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {confidenceLevel}% confidence
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-muted/50 rounded">
            <div className="text-xs text-muted-foreground mb-1">Current</div>
            <div className="font-semibold">{current}</div>
          </div>
          <div className="p-2 bg-amber-50 rounded border border-amber-100">
            <div className="text-xs text-amber-700 mb-1">Predicted</div>
            <div className="font-semibold text-amber-900">{predicted}</div>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-sm flex items-center gap-1 text-green-600">
            <TrendingUp size={14} />
            <span className="font-medium">{change} increase predicted</span>
          </div>
        </div>
      </div>
    </div>
  );
}