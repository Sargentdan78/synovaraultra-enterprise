import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, Instagram, Twitter, Facebook, Linkedin, MessageSquare, 
  Edit, Copy, PenTool, Globe, Sparkles, Newspaper, Loader2, PlusCircle
} from "lucide-react";

export function ContentGenerator() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("blog");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    topic: "",
    keywords: "",
    tone: "informative",
    wordCount: "600",
    includeIntro: true,
    includeConclusion: true,
    includeFAQs: false,
  });
  
  const [socialForm, setSocialForm] = useState({
    productName: "",
    benefits: "",
    targetAudience: "",
    platform: "instagram",
    includeEmoji: true,
    includeHashtags: true,
    includeCall: true,
  });
  
  const [generatedContent, setGeneratedContent] = useState<{
    content: string;
    type: string;
    timestamp: string;
  } | null>(null);
  
  const [contentHistory, setContentHistory] = useState<{
    id: string;
    title: string;
    type: string;
    platform?: string;
    timestamp: string;
    preview: string;
  }[]>([
    {
      id: "cont-001",
      title: "10 Ways to Boost Your Online Sales",
      type: "blog",
      timestamp: "2023-06-14",
      preview: "In today's competitive e-commerce landscape, finding ways to boost your online sales is crucial..."
    },
    {
      id: "cont-002",
      title: "New Summer Collection Now Available!",
      type: "social",
      platform: "instagram",
      timestamp: "2023-06-13",
      preview: "☀️ Summer vibes are here! Check out our new collection of breathable, stylish outfits perfect for..."
    },
    {
      id: "cont-003",
      title: "How to Choose the Perfect Headphones",
      type: "blog",
      timestamp: "2023-06-10",
      preview: "With so many options on the market, finding the perfect headphones can be overwhelming..."
    },
  ]);

  const generateBlogPost = () => {
    if (!blogForm.title || !blogForm.topic) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and topic for your blog post.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call to generate content
    setTimeout(() => {
      const blogContent = `# ${blogForm.title}

## Introduction

In today's rapidly evolving digital marketplace, understanding the nuances of e-commerce can significantly impact your business success. This comprehensive guide explores key strategies to optimize your online store and maximize conversion rates.

## Understanding Your Customer Journey

Every successful e-commerce store begins with a deep understanding of the customer journey. By mapping out each touchpoint and interaction, businesses can identify opportunities for improvement and optimization.

* Research suggests that 70% of customers abandon their carts due to unexpected costs
* Mobile users have a 33% lower conversion rate compared to desktop users
* Email marketing remains the most effective channel for recovering abandoned carts

## Optimizing Your Product Pages

Product pages serve as the critical decision-making point for potential customers. Enhancing these pages with detailed information, high-quality images, and social proof can dramatically improve conversion rates.

### Key elements of high-converting product pages:

1. Multiple high-resolution product images from various angles
2. Detailed specifications and dimensions
3. Clear pricing information with any discount clearly highlighted
4. Customer reviews and ratings
5. Related product recommendations

## Leveraging Data for Decision Making

Making informed decisions based on analytics is essential for continuous improvement. Implementing robust tracking and analysis tools provides valuable insights into customer behavior and preferences.

## Conclusion

Succeeding in e-commerce requires a combination of strategic planning, customer focus, and continuous optimization. By implementing the strategies outlined in this article, businesses can create more effective online stores that convert visitors into loyal customers.

## Frequently Asked Questions

**Q: How long does it take to see results from e-commerce optimization?**

A: While some changes may show immediate impact, most significant improvements require 1-3 months of testing and refinement to see substantial results.

**Q: What's the most important factor in e-commerce success?**

A: Though many factors contribute to success, providing exceptional customer experience throughout the buying journey consistently ranks as the most critical element.`;

      setGeneratedContent({
        content: blogContent,
        type: "blog",
        timestamp: new Date().toISOString().split('T')[0]
      });
      
      // Add to content history
      const newContentItem = {
        id: `cont-${Math.floor(Math.random() * 1000)}`,
        title: blogForm.title,
        type: "blog",
        timestamp: new Date().toISOString().split('T')[0],
        preview: blogContent.substring(0, 100) + "..."
      };
      
      setContentHistory([newContentItem, ...contentHistory]);
      
      setIsGenerating(false);
      
      toast({
        title: "Blog Post Generated",
        description: "Your AI-generated blog post is ready."
      });
      
    }, 3000);
  };

  const generateSocialPost = () => {
    if (!socialForm.productName || !socialForm.benefits) {
      toast({
        title: "Missing Information",
        description: "Please provide product name and key benefits.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call to generate content
    setTimeout(() => {
      let socialContent = "";
      
      switch (socialForm.platform) {
        case "instagram":
          socialContent = `✨ Introducing our game-changing ${socialForm.productName}! ✨

🔥 ${socialForm.benefits.split(',')[0]}
💯 ${socialForm.benefits.split(',')[1] || "Perfect for everyday use"}
🙌 ${socialForm.benefits.split(',')[2] || "Customer satisfaction guaranteed"}

Perfect for ${socialForm.targetAudience || "everyone who values quality and performance"}!

Don't miss out! Click the link in bio to shop now. 👆

#${socialForm.productName.replace(/\s+/g, '')} #MustHave #NewArrivals #ShopNow #QualityProducts`;
          break;
          
        case "facebook":
          socialContent = `JUST LAUNCHED: The ${socialForm.productName} you've been waiting for!

We're excited to introduce our newest addition that's changing the game. Here's why you'll love it:

✅ ${socialForm.benefits.split(',')[0]}
✅ ${socialForm.benefits.split(',')[1] || "Exceptional quality and durability"}
✅ ${socialForm.benefits.split(',')[2] || "Unbeatable value for your money"}

Designed specifically for ${socialForm.targetAudience || "those who demand the best"}.

Limited quantities available - order yours today before they're gone!

#${socialForm.productName.replace(/\s+/g, '')} #NewProduct #MustHave`;
          break;
          
        case "twitter":
          socialContent = `Just dropped: Our new ${socialForm.productName} is now available! 🚀

${socialForm.benefits.split(',')[0]} and more! Perfect for ${socialForm.targetAudience || "everyone"}!

Check it out here: [LINK] #${socialForm.productName.replace(/\s+/g, '')} #NewLaunch`;
          break;
          
        case "linkedin":
          socialContent = `📣 Product Announcement: Introducing the ${socialForm.productName}

We're thrilled to announce the launch of our latest innovation designed to transform how ${socialForm.targetAudience || "professionals"} work.

Key benefits:
• ${socialForm.benefits.split(',')[0]}
• ${socialForm.benefits.split(',')[1] || "Increased productivity"}
• ${socialForm.benefits.split(',')[2] || "Seamless integration"}

Learn more about how this game-changing solution can help your business thrive. Link in comments.

#${socialForm.productName.replace(/\s+/g, '')} #Innovation #ProductLaunch`;
          break;
      }

      setGeneratedContent({
        content: socialContent,
        type: "social",
        timestamp: new Date().toISOString().split('T')[0]
      });
      
      // Add to content history
      const newContentItem = {
        id: `cont-${Math.floor(Math.random() * 1000)}`,
        title: `${socialForm.productName} promotion`,
        type: "social",
        platform: socialForm.platform,
        timestamp: new Date().toISOString().split('T')[0],
        preview: socialContent.substring(0, 100) + "..."
      };
      
      setContentHistory([newContentItem, ...contentHistory]);
      
      setIsGenerating(false);
      
      toast({
        title: "Social Post Generated",
        description: `Your AI-generated ${socialForm.platform} post is ready.`
      });
      
    }, 2000);
  };

  const copyContent = () => {
    if (!generatedContent) return;
    
    navigator.clipboard.writeText(generatedContent.content);
    toast({
      title: "Content Copied",
      description: "The generated content has been copied to your clipboard."
    });
  };
  
  const saveContent = () => {
    if (!generatedContent) return;
    
    toast({
      title: "Content Saved",
      description: "Your content has been saved to the library."
    });
  };

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={16} className="text-pink-500" />;
      case "facebook":
        return <Facebook size={16} className="text-blue-500" />;
      case "twitter":
        return <Twitter size={16} className="text-sky-500" />;
      case "linkedin":
        return <Linkedin size={16} className="text-blue-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <PenTool className="h-6 w-6 text-primary" />
            <span>AI Content Generator</span>
          </h2>
          <p className="text-muted-foreground">
            Generate marketing content, blog posts, and social media updates
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Content</CardTitle>
              <CardDescription>
                Create high-quality content with AI assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="blog" onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="blog" className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>Blog Post</span>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Social Media</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="product" className="flex items-center gap-2">
                    <Edit size={16} />
                    <span>Product</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Blog Post Generator */}
                <TabsContent value="blog" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Blog Title
                      </label>
                      <Input
                        placeholder="Enter your blog title"
                        value={blogForm.title}
                        onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Topic/Subject
                      </label>
                      <Input
                        placeholder="What is the blog post about?"
                        value={blogForm.topic}
                        onChange={e => setBlogForm({...blogForm, topic: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Target Keywords
                      </label>
                      <Input
                        placeholder="SEO keywords, separated by commas"
                        value={blogForm.keywords}
                        onChange={e => setBlogForm({...blogForm, keywords: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Content Tone
                        </label>
                        <Select
                          value={blogForm.tone}
                          onValueChange={(value) => setBlogForm({...blogForm, tone: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="informative">Informative</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="persuasive">Persuasive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Word Count
                        </label>
                        <Select
                          value={blogForm.wordCount}
                          onValueChange={(value) => setBlogForm({...blogForm, wordCount: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">Short (~300 words)</SelectItem>
                            <SelectItem value="600">Medium (~600 words)</SelectItem>
                            <SelectItem value="1000">Long (~1000 words)</SelectItem>
                            <SelectItem value="1500">Comprehensive (~1500 words)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">
                          Include Introduction
                        </label>
                        <Switch
                          checked={blogForm.includeIntro}
                          onCheckedChange={checked => setBlogForm({...blogForm, includeIntro: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">
                          Include Conclusion
                        </label>
                        <Switch
                          checked={blogForm.includeConclusion}
                          onCheckedChange={checked => setBlogForm({...blogForm, includeConclusion: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">
                          Include FAQ Section
                        </label>
                        <Switch
                          checked={blogForm.includeFAQs}
                          onCheckedChange={checked => setBlogForm({...blogForm, includeFAQs: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      className="flex items-center gap-2" 
                      onClick={generateBlogPost}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Generate Blog Post</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Social Media Generator */}
                <TabsContent value="social" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Product/Service Name
                      </label>
                      <Input
                        placeholder="What are you promoting?"
                        value={socialForm.productName}
                        onChange={e => setSocialForm({...socialForm, productName: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Key Benefits
                      </label>
                      <Textarea
                        placeholder="List the main benefits or features, separated by commas"
                        value={socialForm.benefits}
                        onChange={e => setSocialForm({...socialForm, benefits: e.target.value})}
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Target Audience
                      </label>
                      <Input
                        placeholder="Who is this product for?"
                        value={socialForm.targetAudience}
                        onChange={e => setSocialForm({...socialForm, targetAudience: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Platform
                        </label>
                        <Select
                          value={socialForm.platform}
                          onValueChange={(value) => setSocialForm({...socialForm, platform: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">
                          Include Emojis
                        </label>
                        <Switch
                          checked={socialForm.includeEmoji}
                          onCheckedChange={checked => setSocialForm({...socialForm, includeEmoji: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">
                          Include Hashtags
                        </label>
                        <Switch
                          checked={socialForm.includeHashtags}
                          onCheckedChange={checked => setSocialForm({...socialForm, includeHashtags: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">
                          Include Call to Action
                        </label>
                        <Switch
                          checked={socialForm.includeCall}
                          onCheckedChange={checked => setSocialForm({...socialForm, includeCall: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      className="flex items-center gap-2" 
                      onClick={generateSocialPost}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          <span>Generate Social Post</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Other content types (placeholders) */}
                <TabsContent value="email">
                  <div className="p-20 text-center text-muted-foreground">
                    Email template generator coming soon
                  </div>
                </TabsContent>
                
                <TabsContent value="product">
                  <div className="p-20 text-center text-muted-foreground">
                    Product description generator coming soon
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Generated Content */}
          {generatedContent && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {generatedContent.type === "blog" ? (
                        <Newspaper className="h-5 w-5" />
                      ) : (
                        getPlatformIcon(generatedContent.type === "social" ? socialForm.platform : undefined)
                      )}
                      <span>Generated Content</span>
                    </CardTitle>
                    <CardDescription>
                      {generatedContent.timestamp} - {generatedContent.type.charAt(0).toUpperCase() + generatedContent.type.slice(1)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={copyContent}>
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`prose prose-sm max-w-none ${generatedContent.type === "social" ? "whitespace-pre-line" : ""}`}>
                  {generatedContent.type === "blog" ? (
                    <div dangerouslySetInnerHTML={{ __html: generatedContent.content.replace(/\n\n/g, '<br /><br />') }} />
                  ) : (
                    <div className="whitespace-pre-line">{generatedContent.content}</div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={saveContent}>Save to Library</Button>
                  <Button>Use This Content</Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
        
        {/* Content Library */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Content Library</CardTitle>
                <Button variant="ghost" size="sm">
                  <PlusCircle size={16} />
                </Button>
              </div>
              <CardDescription>
                Your previously generated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentHistory.map((item) => (
                  <div key={item.id} className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      {item.type === "blog" ? (
                        <FileText size={14} className="text-primary" />
                      ) : (
                        getPlatformIcon(item.platform)
                      )}
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.preview}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      <Button variant="ghost" size="sm">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}