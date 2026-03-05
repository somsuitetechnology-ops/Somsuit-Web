import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Cloud, Database, Lock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const CloudComputing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Cloud <span className="text-accent">Computing</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Scalable cloud solutions that empower your business to grow without limits. Access your data anytime, anywhere.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link href="/contact">
              Explore Cloud Solutions <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Cloud Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Cloud <span className="text-accent">Solutions</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Comprehensive cloud services for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Cloud,
                title: "Cloud Migration",
                description: "Seamlessly move your applications and data to the cloud with zero downtime and minimal disruption."
              },
              {
                icon: Database,
                title: "Cloud Storage",
                description: "Secure, scalable storage solutions that grow with your business needs."
              },
              {
                icon: Lock,
                title: "Cloud Security",
                description: "Enterprise-grade security measures to protect your data in the cloud."
              },
              {
                icon: TrendingUp,
                title: "Cloud Optimization",
                description: "Maximize performance and minimize costs with our cloud optimization services."
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

      {/* Benefits */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Card className="p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <h3 className="text-2xl font-bold mb-8">Cloud Platforms We Support</h3>
              <div className="space-y-4">
                {[
                  "Microsoft Azure - Complete cloud platform",
                  "Amazon Web Services (AWS) - Industry leader",
                  "Google Cloud Platform - Innovation focused",
                  "Hybrid Cloud Solutions - Best of both worlds"
                ].map((platform, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground-muted">{platform}</span>
                  </div>
                ))}
              </div>
            </Card>

            <div>
              <h2 className="text-4xl font-bold mb-8">
                Benefits of <span className="text-accent">Cloud Computing</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Scalability",
                    desc: "Scale resources up or down based on demand"
                  },
                  {
                    title: "Cost Savings",
                    desc: "Pay only for what you use, no large upfront investments"
                  },
                  {
                    title: "Accessibility",
                    desc: "Access your data from anywhere, on any device"
                  },
                  {
                    title: "Reliability",
                    desc: "99.9% uptime with automatic backups and disaster recovery"
                  },
                  {
                    title: "Security",
                    desc: "Enterprise-grade security and compliance"
                  },
                  {
                    title: "Innovation",
                    desc: "Access to latest technologies and updates"
                  }
                ].map((benefit, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                    <p className="text-foreground-muted">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Move to the Cloud?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start your cloud journey with expert guidance
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link href="/contact">
              Get Cloud Consultation <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CloudComputing;
