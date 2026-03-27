import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Shield, Cloud, Code, CheckCircle, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const Software = () => {
  const categories = [
    {
      icon: Package,
      title: "Microsoft Licensing",
      description: "Complete Microsoft software solutions including Windows, Office 365, and Server licenses",
      licenses: ["Windows Server", "Microsoft 365", "SQL Server", "Visual Studio", "Azure Credits"]
    },
    {
      icon: Shield,
      title: "Security Software",
      description: "Enterprise-grade security solutions to protect your business",
      licenses: ["Antivirus Solutions", "Endpoint Protection", "Email Security", "Backup Software", "VPN Licenses"]
    },
    {
      icon: Cloud,
      title: "Cloud Subscriptions",
      description: "Cloud platform subscriptions and SaaS solutions",
      licenses: ["Microsoft Azure", "AWS Credits", "Google Cloud", "Salesforce", "Adobe Creative Cloud"]
    },
    {
      icon: Code,
      title: "Development Tools",
      description: "Professional development and design software licenses",
      licenses: ["JetBrains Suite", "Adobe Creative Suite", "AutoCAD", "SolidWorks", "Development IDEs"]
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Genuine Licenses",
      description: "100% authentic software licenses from authorized distributors"
    },
    {
      icon: Shield,
      title: "Compliance Assured",
      description: "Stay compliant with proper licensing and documentation"
    },
    {
      icon: TrendingUp,
      title: "Volume Discounts",
      description: "Special pricing for bulk and enterprise licensing"
    },
  ];

  const popularProducts = [
    { name: "Microsoft 365 Business", type: "Per User/Month" },
    { name: "Windows Server 2022", type: "Perpetual License" },
    { name: "Adobe Creative Cloud", type: "Team License" },
    { name: "AutoCAD", type: "Annual Subscription" },
    { name: "SQL Server Standard", type: "Core-based License" },
    { name: "VMware vSphere", type: "Per CPU License" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)/0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
              <Package className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Authorized Distributor</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Software <span className="text-gradient">Licensing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Genuine software licenses from leading vendors. Ensure compliance and maximize productivity.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="lg" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Get Licensing Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Software Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              License <span className="text-gradient">Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive software licensing for all business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="space-y-2">
                  {category.licenses.map((license, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{license}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Popular <span className="text-gradient">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Most requested software licenses by our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProducts.map((product, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-sm text-accent">{product.type}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why License <span className="text-gradient">With Us?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Package className="w-16 h-16 text-accent mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Software <span className="text-gradient">Licenses?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us for competitive pricing and licensing consultation
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">
              Request Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Software;
