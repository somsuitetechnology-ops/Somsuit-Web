import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, User } from 'lucide-react';

const Blog = () => {
  const categories = ["All", "Networking", "Cloud", "Security", "Innovation"];
  
  const articles = [
    {
      title: "The Future of Cloud Computing in Enterprise",
      excerpt: "Explore the latest trends in cloud computing and how they're transforming business operations.",
      category: "Cloud",
      date: "November 1, 2025",
      author: "Tech Team",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
    },
    {
      title: "5 Essential Network Security Best Practices",
      excerpt: "Learn how to protect your network infrastructure from modern cyber threats.",
      category: "Security",
      date: "October 28, 2025",
      author: "Security Team",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop"
    },
    {
      title: "AI and Automation: Transforming IT Operations",
      excerpt: "Discover how AI is revolutionizing the way we manage IT infrastructure.",
      category: "Innovation",
      date: "October 25, 2025",
      author: "Innovation Team",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
    },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tech <span className="text-accent">Blog</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Insights, trends, and innovations in technology
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" size={20} />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
              />
            </div>
            <Button variant="default" className="bg-accent hover:bg-accent-hover">
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? "bg-accent hover:bg-accent-hover" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-foreground-muted mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-foreground-muted">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
