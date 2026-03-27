import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cpu, Layers, Link as LinkIcon, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const Integration = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            System <span className="text-accent">Integration</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Connect your diverse systems and applications into a unified, efficient technology ecosystem that works seamlessly together.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link href="/contact">
              Integrate Your Systems <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Integration Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Integration <span className="text-accent">Solutions</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Connecting your technology for maximum efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Layers,
                title: "Application Integration",
                description: "Connect different software applications to share data and functionality seamlessly across your organization."
              },
              {
                icon: LinkIcon,
                title: "API Development & Integration",
                description: "Custom API development and third-party API integration to enable communication between systems."
              },
              {
                icon: Cpu,
                title: "Enterprise Service Bus (ESB)",
                description: "Implement ESB architecture for centralized integration of multiple applications and services."
              },
              {
                icon: Zap,
                title: "Data Integration",
                description: "Consolidate data from multiple sources into a unified view for better business intelligence."
              }
            ].map((service, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl group">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Integrations */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What We <span className="text-accent">Integrate</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Common system integrations we implement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "CRM Systems",
                description: "Integrate customer relationship management with other business systems for unified customer data."
              },
              {
                title: "ERP Solutions",
                description: "Connect enterprise resource planning with accounting, inventory, and other core systems."
              },
              {
                title: "E-commerce Platforms",
                description: "Link online stores with inventory management, accounting, and shipping systems."
              },
              {
                title: "Payment Gateways",
                description: "Secure integration of payment processing with your business applications."
              },
              {
                title: "Marketing Tools",
                description: "Connect marketing automation, email, and analytics platforms with CRM and sales systems."
              },
              {
                title: "HR Systems",
                description: "Integrate payroll, time tracking, and employee management applications."
              },
              {
                title: "Cloud Services",
                description: "Connect cloud applications with on-premise systems for hybrid environments."
              },
              {
                title: "Business Intelligence",
                description: "Integrate BI tools with data sources for comprehensive reporting and analytics."
              },
              {
                title: "Communication Tools",
                description: "Link email, chat, and collaboration platforms with business applications."
              }
            ].map((integration, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4">{integration.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{integration.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Process */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Benefits of <span className="text-accent">Integration</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Improved Efficiency",
                    desc: "Eliminate manual data entry and automate workflows across systems"
                  },
                  {
                    title: "Better Data Accuracy",
                    desc: "Reduce errors from duplicate data entry and ensure consistency"
                  },
                  {
                    title: "Enhanced Visibility",
                    desc: "Get a complete view of your business with unified data"
                  },
                  {
                    title: "Cost Savings",
                    desc: "Reduce operational costs through automation and efficiency gains"
                  },
                  {
                    title: "Faster Decision Making",
                    desc: "Access real-time data across systems for informed decisions"
                  },
                  {
                    title: "Scalability",
                    desc: "Easily add new systems without disrupting existing integrations"
                  }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                      <p className="text-foreground-muted">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <h3 className="text-2xl font-bold mb-8">Integration Process</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">1. Discovery</h4>
                  <p className="text-foreground-muted">
                    Analyze your current systems, workflows, and integration requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">2. Design</h4>
                  <p className="text-foreground-muted">
                    Create integration architecture and define data flows between systems.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">3. Development</h4>
                  <p className="text-foreground-muted">
                    Build custom connectors, APIs, and integration middleware.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">4. Testing</h4>
                  <p className="text-foreground-muted">
                    Thoroughly test integrations to ensure data accuracy and reliability.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">5. Deployment</h4>
                  <p className="text-foreground-muted">
                    Roll out integrations with minimal disruption to operations.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">6. Support</h4>
                  <p className="text-foreground-muted">
                    Ongoing monitoring and maintenance to keep integrations running smoothly.
                  </p>
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
            Ready to Connect Your Systems?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let us help you create a unified technology ecosystem
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link href="/contact">
              Discuss Integration <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Integration;
