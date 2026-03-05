import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Wrench, HeadphonesIcon, Clock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const ManagedServices = () => {
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
                Managed <span className="text-accent">Services</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Proactive IT management and support to keep your systems running smoothly. Focus on your business while we handle the technology.
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
              {[Wrench, HeadphonesIcon, Clock, TrendingUp].map((Icon, i) => (
                <Card key={i} className="p-8 bg-white/5 backdrop-blur-sm border-white/10 flex items-center justify-center">
                  <Icon className="w-16 h-16 text-accent" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Manage */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Comprehensive IT <span className="text-accent">Management</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Complete technology oversight for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "24/7 Monitoring",
                description: "Round-the-clock system monitoring to identify and resolve issues before they impact your business."
              },
              {
                title: "Help Desk Support",
                description: "Responsive technical support for your team whenever they need assistance."
              },
              {
                title: "Patch Management",
                description: "Regular updates and patches to keep all systems secure and up-to-date."
              },
              {
                title: "Backup & Recovery",
                description: "Automated backups and tested disaster recovery procedures to protect your data."
              },
              {
                title: "Performance Optimization",
                description: "Continuous tuning and optimization to ensure peak system performance."
              },
              {
                title: "Security Management",
                description: "Proactive security measures including antivirus, firewall, and threat monitoring."
              },
              {
                title: "Asset Management",
                description: "Complete tracking and lifecycle management of all IT assets and licenses."
              },
              {
                title: "Compliance Support",
                description: "Help maintain compliance with industry regulations and standards."
              },
              {
                title: "Strategic Planning",
                description: "Long-term IT strategy and roadmap aligned with business goals."
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
                Benefits of <span className="text-accent">Managed Services</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Predictable Costs",
                    desc: "Fixed monthly fees make budgeting easier and more predictable"
                  },
                  {
                    title: "Reduced Downtime",
                    desc: "Proactive monitoring prevents issues before they cause problems"
                  },
                  {
                    title: "Expert Team",
                    desc: "Access to certified professionals without hiring costs"
                  },
                  {
                    title: "Focus on Business",
                    desc: "Spend time on core business instead of IT issues"
                  },
                  {
                    title: "Scalability",
                    desc: "Services grow with your business needs"
                  },
                  {
                    title: "Peace of Mind",
                    desc: "Know your systems are monitored and maintained 24/7"
                  }
                ].map((benefit, i) => (
                  <div key={i}>
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                        <p className="text-foreground-muted">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <h3 className="text-2xl font-bold mb-8">Service Level Agreement</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-foreground-muted">Response Time</span>
                  <span className="font-bold text-accent">&lt; 1 Hour</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-foreground-muted">Uptime Guarantee</span>
                  <span className="font-bold text-accent">99.9%</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-foreground-muted">Monitoring</span>
                  <span className="font-bold text-accent">24/7</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-foreground-muted">Support</span>
                  <span className="font-bold text-accent">Unlimited</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted">Reporting</span>
                  <span className="font-bold text-accent">Monthly</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Service <span className="text-accent">Tiers</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Choose the level of support that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Essential",
                price: "Starting at",
                features: [
                  "Business hours support",
                  "Basic monitoring",
                  "Patch management",
                  "Monthly reporting",
                  "Email support"
                ]
              },
              {
                name: "Professional",
                price: "Contact us",
                features: [
                  "24/7 monitoring",
                  "Priority support",
                  "Advanced security",
                  "Weekly reporting",
                  "Phone & email support",
                  "Proactive optimization"
                ],
                recommended: true
              },
              {
                name: "Enterprise",
                price: "Custom pricing",
                features: [
                  "Dedicated account manager",
                  "Custom SLA",
                  "On-site support",
                  "Real-time reporting",
                  "Strategic IT planning",
                  "Complete management"
                ]
              }
            ].map((tier, i) => (
              <Card 
                key={i} 
                className={`p-8 ${tier.recommended ? 'border-2 border-accent shadow-xl shadow-accent/20' : 'hover:border-accent'} transition-all relative`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-foreground-muted mb-6">{tier.price}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.recommended ? "default" : "outline"}
                  className={tier.recommended ? "w-full bg-accent hover:bg-accent-hover text-primary" : "w-full"}
                  asChild
                >
                  <Link href="/contact">
                    Get Started
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Simplify Your IT Management?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let us handle your technology so you can focus on growing your business
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

export default ManagedServices;
