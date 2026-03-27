import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Server, Monitor, HardDrive, Wifi, Shield, Zap, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const Hardware = () => {
  const categories = [
    {
      icon: Server,
      title: "Servers & Storage",
      description: "Enterprise-grade servers and storage solutions for optimal performance and scalability",
      features: ["Dell PowerEdge Servers", "HP ProLiant Systems", "NetApp Storage", "SAN & NAS Solutions"]
    },
    {
      icon: Monitor,
      title: "Workstations & PCs",
      description: "High-performance workstations and desktop computers for business productivity",
      features: ["Dell Precision", "HP Z Workstations", "Business Desktop PCs", "Gaming & CAD Systems"]
    },
    {
      icon: Wifi,
      title: "Network Equipment",
      description: "Professional networking hardware for reliable and secure connectivity",
      features: ["Cisco Switches & Routers", "Ubiquiti Access Points", "Firewalls", "Load Balancers"]
    },
    {
      icon: HardDrive,
      title: "Data Center Equipment",
      description: "Complete data center infrastructure solutions for modern enterprises",
      features: ["Rack Systems", "UPS & Power Distribution", "Cooling Solutions", "Cable Management"]
    },
  ];

  const brands = [
    "Dell", "HP", "Cisco", "Lenovo", "Microsoft", "Intel", "AMD", "NetApp", "Ubiquiti", "APC"
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Warranty & Support",
      description: "Comprehensive warranty coverage and technical support for all hardware"
    },
    {
      icon: Zap,
      title: "Quick Deployment",
      description: "Fast installation and configuration to minimize downtime"
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Hardware that grows with your business needs"
    },
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
              <Server className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Enterprise Hardware</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Hardware <span className="text-gradient">Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Premium business hardware from leading manufacturers. Built for performance, reliability, and growth.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="lg" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hardware Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Product <span className="text-gradient">Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive hardware solutions for every business need
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
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Brands */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted <span className="text-gradient">Brands</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We partner with industry-leading manufacturers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {brands.map((brand, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow">
                <p className="text-lg font-bold text-gradient">{brand}</p>
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
              Why Choose <span className="text-gradient">Our Hardware?</span>
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
          <Server className="w-16 h-16 text-accent mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Upgrade Your <span className="text-gradient">Hardware?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a customized quote for your business hardware needs
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">
              Contact Sales Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hardware;
