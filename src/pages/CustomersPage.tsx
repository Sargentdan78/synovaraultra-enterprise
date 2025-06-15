import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Search, User, Users, UserPlus, Star, ShoppingBag, 
  Heart, Dna, Fingerprint, BarChart3, Brain, Target,
  Zap, Tag, Calendar, BadgePercent, Gift
} from "lucide-react";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCustomerDnaOpen, setIsCustomerDnaOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const { toast } = useToast();

  // Mock customer data
  const customers = [
    {
      id: "cust-001",
      name: "Jennifer Wilson",
      email: "jennifer@example.com",
      orders: 24,
      totalSpent: 1865.50,
      lastOrder: "2023-06-01",
      avatar: "https://images.unsplash.com/photo-1557296387-5358a603daef?w=150&h=150&fit=crop",
      segment: "premium",
      ltv: 3420,
      status: "active",
      preferredCategories: ["Electronics", "Fashion"],
      preferredColors: ["blue", "black"],
      socialInfluence: 85,
      productViews: 142,
      abandonedCarts: 3,
      personalizationStatus: "enabled",
      behavioralTags: ["tech-enthusiast", "deal-seeker", "night-shopper"],
      dnaScore: 91,
      purchasePrediction: "high"
    },
    {
      id: "cust-002",
      name: "Robert Johnson",
      email: "robert@example.com",
      orders: 7,
      totalSpent: 423.75,
      lastOrder: "2023-05-15",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop",
      segment: "standard",
      ltv: 890,
      status: "active",
      preferredCategories: ["Home & Garden", "Tools"],
      preferredColors: ["green", "brown"],
      socialInfluence: 23,
      productViews: 56,
      abandonedCarts: 1,
      personalizationStatus: "enabled",
      behavioralTags: ["weekend-shopper", "researcher", "price-sensitive"],
      dnaScore: 72,
      purchasePrediction: "medium"
    },
    {
      id: "cust-003",
      name: "Sarah Davis",
      email: "sarah@example.com",
      orders: 18,
      totalSpent: 1230.25,
      lastOrder: "2023-06-10",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      segment: "premium",
      ltv: 2780,
      status: "active",
      preferredCategories: ["Beauty", "Accessories"],
      preferredColors: ["pink", "gold", "white"],
      socialInfluence: 92,
      productViews: 203,
      abandonedCarts: 2,
      personalizationStatus: "enabled",
      behavioralTags: ["trend-follower", "social-shopper", "bundle-buyer"],
      dnaScore: 88,
      purchasePrediction: "high"
    },
    {
      id: "cust-004",
      name: "Michael Brown",
      email: "michael@example.com",
      orders: 3,
      totalSpent: 189.99,
      lastOrder: "2023-03-22",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      segment: "new",
      ltv: 340,
      status: "inactive",
      preferredCategories: ["Electronics"],
      preferredColors: ["black"],
      socialInfluence: 15,
      productViews: 34,
      abandonedCarts: 2,
      personalizationStatus: "enabled",
      behavioralTags: ["mobile-user", "comparison-shopper", "abandoned-cart"],
      dnaScore: 45,
      purchasePrediction: "low"
    },
    {
      id: "cust-005",
      name: "Emily Garcia",
      email: "emily@example.com",
      orders: 12,
      totalSpent: 875.25,
      lastOrder: "2023-05-28",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      segment: "standard",
      ltv: 1450,
      status: "active",
      preferredCategories: ["Home & Garden", "Kitchen", "Decor"],
      preferredColors: ["white", "beige", "pastel"],
      socialInfluence: 67,
      productViews: 98,
      abandonedCarts: 1,
      personalizationStatus: "enabled",
      behavioralTags: ["home-decorator", "review-writer", "seasonal-shopper"],
      dnaScore: 79,
      purchasePrediction: "medium"
    },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "premium") return matchesSearch && customer.segment === "premium";
    if (selectedTab === "standard") return matchesSearch && customer.segment === "standard";
    if (selectedTab === "new") return matchesSearch && customer.segment === "new";
    
    return matchesSearch;
  });

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "premium":
        return "text-purple-600 bg-purple-100";
      case "standard":
        return "text-blue-600 bg-blue-100";
      case "new":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getCustomerDnaColor = (score: number) => {
    if (score >= 85) return { bg: "bg-purple-500", text: "text-purple-500" };
    if (score >= 70) return { bg: "bg-blue-500", text: "text-blue-500" };
    if (score >= 50) return { bg: "bg-green-500", text: "text-green-500" };
    return { bg: "bg-amber-500", text: "text-amber-500" };
  };

  const getBehavioralTags = (tags: string[]) => {
    return tags.map((tag, index) => (
      <span 
        key={index} 
        className="inline-block px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground mr-1 mb-1"
      >
        {tag}
      </span>
    ));
  };

  const getPredictionBadge = (prediction: string) => {
    switch (prediction) {
      case "high":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">High</span>;
      case "medium":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Medium</span>;
      case "low":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Low</span>;
      default:
        return null;
    }
  };

  const generatePersonalizedRecommendations = (customer: any) => {
    // In a real implementation, this would call an AI service
    toast({
      title: "Recommendations Generated",
      description: `Personalized recommendations for ${customer.name} have been created based on their Customer DNA profile.`
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer DNA Profiles</h1>
            <p className="text-muted-foreground mt-1">
              Advanced customer profiling and personalization engine
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              <span>Add Customer</span>
            </Button>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex items-center space-x-4">
          <div className="w-full max-w-sm flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Brain size={16} />
            <span>Create Segments</span>
          </Button>
        </div>

        {/* Customer DNA Dashboard */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Dna size={18} />
                <span>DNA Insights</span>
              </CardTitle>
              <CardDescription>
                AI-generated customer behavioral patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-muted-foreground">Profile Completeness</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-muted-foreground">Behavioral Data Points</span>
                    <span className="font-medium">1,248</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="text-muted-foreground">Prediction Accuracy</span>
                    <span className="font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                
                <div className="bg-primary/5 p-3 rounded-md text-sm">
                  <p className="font-medium mb-1">Customer DNA Engine</p>
                  <p className="text-muted-foreground">
                    Analyzing 57 behavioral signals across 5 customer segments
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Target size={18} />
                <span>Segment Distribution</span>
              </CardTitle>
              <CardDescription>
                Customer segmentation based on behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 inline-block rounded-full bg-purple-500"></span>
                      <span className="text-muted-foreground">Premium</span>
                    </span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2 bg-muted [&>div]:bg-purple-500" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 inline-block rounded-full bg-blue-500"></span>
                      <span className="text-muted-foreground">Standard</span>
                    </span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2 bg-muted [&>div]:bg-blue-500" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 inline-block rounded-full bg-green-500"></span>
                      <span className="text-muted-foreground">New</span>
                    </span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2 bg-muted [&>div]:bg-green-500" />
                </div>
                
                <div className="bg-primary/5 p-3 rounded-md text-sm">
                  <p className="font-medium mb-1">Segment Insight</p>
                  <p className="text-muted-foreground">
                    Premium customers have 3.2x higher LTV than standard
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Zap size={18} />
                <span>Personalization Impact</span>
              </CardTitle>
              <CardDescription>
                Business results from customer DNA personalization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <ShoppingBag size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    <div className="font-medium flex items-center gap-1">
                      24.8%
                      <span className="text-green-600 text-xs">+8.3%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <BadgePercent size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Average Order Value</div>
                    <div className="font-medium flex items-center gap-1">
                      $127.40
                      <span className="text-green-600 text-xs">+21.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Repeat Purchase Rate</div>
                    <div className="font-medium flex items-center gap-1">
                      68.2%
                      <span className="text-green-600 text-xs">+15.4%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-md text-sm border border-green-100">
                  <p className="font-medium mb-1 text-green-700">ROI: 375%</p>
                  <p className="text-green-600">
                    Personalization has generated a 3.75x return on investment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Profiles</CardTitle>
            <CardDescription>
              Manage your customer database with AI-powered insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
              
              <TabsContent value={selectedTab} className="mt-6">
                <div className="relative overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Customer</TableHead>
                        <TableHead>Segment</TableHead>
                        <TableHead>DNA Score</TableHead>
                        <TableHead>Purchase Prediction</TableHead>
                        <TableHead className="text-right">Lifetime Value</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            No customers found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={customer.avatar} alt={customer.name} />
                                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">{customer.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSegmentColor(customer.segment)}`}>
                                {customer.segment.charAt(0).toUpperCase() + customer.segment.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={customer.dnaScore} 
                                  className={`h-2 w-16 [&>div]:${getCustomerDnaColor(customer.dnaScore).bg}`} 
                                />
                                <span className={`text-sm font-medium ${getCustomerDnaColor(customer.dnaScore).text}`}>
                                  {customer.dnaScore}/100
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getPredictionBadge(customer.purchasePrediction)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${customer.ltv.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setIsCustomerDnaOpen(true);
                                }}
                              >
                                View DNA
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Customer DNA Profile Dialog */}
      {selectedCustomer && (
        <Dialog open={isCustomerDnaOpen} onOpenChange={setIsCustomerDnaOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Customer DNA Profile</DialogTitle>
              <DialogDescription>
                AI-generated behavioral profile for {selectedCustomer.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-12 gap-6">
              {/* Customer Overview */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                    <AvatarFallback>{selectedCustomer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{selectedCustomer.email}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSegmentColor(selectedCustomer.segment)}`}>
                      {selectedCustomer.segment.charAt(0).toUpperCase() + selectedCustomer.segment.slice(1)}
                    </span>
                  </div>
                  
                  <div className="w-full mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Orders</span>
                      <span className="font-medium">{selectedCustomer.orders}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Spent</span>
                      <span className="font-medium">${selectedCustomer.totalSpent.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Order</span>
                      <span className="font-medium">{new Date(selectedCustomer.lastOrder).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={() => generatePersonalizedRecommendations(selectedCustomer)}
                  >
                    Generate Recommendations
                  </Button>
                </div>
              </div>
              
              {/* DNA Profile */}
              <div className="col-span-12 md:col-span-8 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Fingerprint size={16} /> Customer DNA Score
                  </h4>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">DNA Score</span>
                      <span className={`font-semibold text-lg ${getCustomerDnaColor(selectedCustomer.dnaScore).text}`}>
                        {selectedCustomer.dnaScore}/100
                      </span>
                    </div>
                    <Progress 
                      value={selectedCustomer.dnaScore} 
                      className={`h-3 [&>div]:${getCustomerDnaColor(selectedCustomer.dnaScore).bg}`} 
                    />
                    <p className="text-sm mt-3 text-muted-foreground">
                      This score represents the completeness and depth of our understanding
                      of this customer's preferences and behaviors.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Heart size={16} /> Preferences
                    </h4>
                    <div className="bg-primary/5 p-4 rounded-lg space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Preferred Categories</span>
                        <div className="flex flex-wrap">
                          {selectedCustomer.preferredCategories.map((category, index) => (
                            <span 
                              key={index} 
                              className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mr-1 mb-1"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Color Preferences</span>
                        <div className="flex flex-wrap">
                          {selectedCustomer.preferredColors.map((color, index) => (
                            <span 
                              key={index} 
                              className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 mr-1 mb-1"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground block mb-1">Shopping Patterns</span>
                        <div className="flex flex-wrap">
                          {getBehavioralTags(selectedCustomer.behavioralTags)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 size={16} /> Engagement Metrics
                    </h4>
                    <div className="bg-primary/5 p-4 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Product Views</span>
                        <span className="font-medium">{selectedCustomer.productViews}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Abandoned Carts</span>
                        <span className="font-medium">{selectedCustomer.abandonedCarts}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Social Influence</span>
                        <div className="flex items-center gap-1">
                          <Progress value={selectedCustomer.socialInfluence} className="h-2 w-16" />
                          <span className="font-medium text-xs">
                            {selectedCustomer.socialInfluence}/100
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Target size={16} /> Personalization Strategy
                  </h4>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="space-y-3 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center gap-1">
                          <Tag size={15} />
                          <span>Product Recommendations</span>
                        </span>
                        <span className={`text-sm font-medium ${getPredictionColor(selectedCustomer.purchasePrediction)}`}>
                          {selectedCustomer.purchasePrediction.toUpperCase()} match probability
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center gap-1">
                          <Calendar size={15} />
                          <span>Best Time to Contact</span>
                        </span>
                        <span className="text-sm font-medium">
                          {getBestTimeToContact(selectedCustomer.behavioralTags)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm flex items-center gap-1">
                          <BadgePercent size={15} />
                          <span>Discount Sensitivity</span>
                        </span>
                        <span className="text-sm font-medium">
                          {getDiscountSensitivity(selectedCustomer.behavioralTags)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Brain size={16} className="text-blue-800 mt-0.5" />
                        <div>
                          <p className="text-blue-800 text-sm font-medium">AI Personalization Insight</p>
                          <p className="text-sm text-blue-700">
                            {getPersonalizationInsight(selectedCustomer)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCustomerDnaOpen(false)}>Close</Button>
              <Button onClick={() => {
                setIsCustomerDnaOpen(false);
                toast({ 
                  title: "Personalization Applied", 
                  description: "This customer will now see personalized content across all touchpoints."
                });
              }}>Apply Personalization</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}

// Helper functions for displaying customer insights
function getPredictionColor(prediction: string) {
  switch (prediction) {
    case "high":
      return "text-green-600";
    case "medium":
      return "text-blue-600";
    case "low":
      return "text-amber-500";
    default:
      return "";
  }
}

function getBestTimeToContact(tags: string[]) {
  if (tags.includes("night-shopper")) return "Evening (6-10 PM)";
  if (tags.includes("weekend-shopper")) return "Weekend Mornings";
  return "Workday Afternoons";
}

function getDiscountSensitivity(tags: string[]) {
  if (tags.includes("deal-seeker") || tags.includes("price-sensitive")) return "High";
  if (tags.includes("premium-buyer")) return "Low";
  return "Medium";
}

function getPersonalizationInsight(customer: any) {
  if (customer.segment === "premium" && customer.dnaScore > 85) {
    return "This customer values exclusivity and early access more than discounts. Consider VIP treatment with new arrivals.";
  }
  
  if (customer.socialInfluence > 80) {
    return "High social media influence suggests offering shareable content and experiences could expand reach.";
  }
  
  if (customer.behavioralTags.includes("abandoned-cart")) {
    return "Cart abandonment pattern indicates price sensitivity. Consider targeted offers for items left in cart.";
  }
  
  if (customer.behavioralTags.includes("researcher")) {
    return "This customer researches extensively before purchasing. Provide detailed product information and comparisons.";
  }
  
  return "Based on browsing patterns, this customer is likely to respond well to curated collections and guided shopping experiences.";
}