import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Smartphone, Globe, Database, Zap, Users, CheckCircle, Rocket } from 'lucide-react';
import Link from 'next/link';

const Custom = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Custom web platforms built with modern frameworks and technologies",
      features: ["Responsive Design", "Cloud-Native Architecture", "API Integration", "Admin Dashboards"]
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["Native Development", "React Native", "Flutter Apps", "App Store Deployment"]
    },
    {
      icon: Database,
      title: "Enterprise Software",
      description: "Large-scale business applications tailored to your workflows",
      features: ["CRM Systems", "ERP Solutions", "Workflow Automation", "Data Analytics"]
    },
    {
      icon: Code,
      title: "API Development",
      description: "Robust APIs and microservices for system integration",
      features: ["RESTful APIs", "GraphQL", "Real-time Services", "Third-party Integration"]
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "Understanding your requirements and defining project scope",
      icon: Users
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description: "Creating wireframes and interactive prototypes for approval",
      icon: Code
    },
    {
      number: "03",
      title: "Development",
      description: "Agile development with regular updates and testing",
      icon: Zap
    },
    {
      number: "04",
      title: "Deployment & Support",
      description: "Launch and ongoing maintenance with dedicated support",
      icon: Rocket
    },
  ];

  const technologies = [
    "React", "Node.js", "Python", "Flutter", "React Native", "PostgreSQL",
    "MongoDB", "AWS", "Azure", "Docker", "Kubernetes", "TypeScript"
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
              <Code className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Tailored Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Custom <span className="text-gradient">Applications</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Bespoke software solutions designed specifically for your business needs. From web apps to mobile platforms.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="lg" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Development <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Full-stack development services for all platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
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

      {/* Development Process */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proven methodology for successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <div className="text-5xl font-bold text-gradient mb-4">{step.number}</div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technology <span className="text-gradient">Stack</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern tools and frameworks we use
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow">
                <p className="font-bold text-gradient">{tech}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Rocket className="w-16 h-16 text-accent mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Turn your vision into reality with our custom development services
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">
              Discuss Your Project
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Custom;
