import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Network, Server, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const Networking = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Corporate <span className="text-accent">Networking</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Enterprise-grade networking infrastructure designed for reliability, performance, and scalability. Build a foundation that supports your business growth.
              </p>
              <Button 
                variant="default" 
                size="lg" 
                asChild 
                className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
              >
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[Network, Server, Shield, Zap].map((Icon, i) => (
                <Card key={i} className="p-8 bg-white/5 backdrop-blur-sm border-white/10 flex items-center justify-center">
                  <Icon className="w-16 h-16 text-accent" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Networking <span className="text-accent">Services</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Comprehensive solutions for all your networking needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Network Design & Planning",
                description: "Custom network architecture designed specifically for your business requirements and future growth."
              },
              {
                title: "Network Implementation",
                description: "Professional installation and configuration of routers, switches, and other network equipment."
              },
              {
                title: "Network Security",
                description: "Multi-layered security solutions including firewalls, VPNs, and intrusion detection systems."
              },
              {
                title: "Network Monitoring",
                description: "24/7 monitoring and management to ensure optimal performance and quick issue resolution."
              },
              {
                title: "Network Optimization",
                description: "Performance tuning and optimization to maximize speed, reliability, and efficiency."
              },
              {
                title: "Network Support",
                description: "Ongoing support and maintenance to keep your network running smoothly."
              }
            ].map((service, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Why Choose Our <span className="text-accent">Networking Services</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Certified network engineers with years of experience",
                  "Partnerships with leading equipment manufacturers",
                  "Scalable solutions that grow with your business",
                  "Proactive monitoring and maintenance",
                  "Fast response times and expert support",
                  "Cost-effective solutions with maximum ROI"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground-muted text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <h3 className="text-2xl font-bold mb-6">Our Approach</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">1. Assessment</h4>
                  <p className="text-foreground-muted">We analyze your current infrastructure and business requirements.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">2. Design</h4>
                  <p className="text-foreground-muted">Create a customized network solution tailored to your needs.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">3. Implementation</h4>
                  <p className="text-foreground-muted">Professional deployment with minimal disruption to operations.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">4. Support</h4>
                  <p className="text-foreground-muted">Ongoing management and optimization for peak performance.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Upgrade Your Network?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let our experts design a network solution perfect for your business
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link href="/contact">
              Schedule Consultation <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Networking;
