import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Target, Users, Lightbulb } from 'lucide-react';

const Company = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Company <span className="text-accent">Overview</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Leading the way in innovative technology solutions since day one
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="text-accent">Story</span>
              </h2>
              <p className="text-foreground-muted text-lg leading-relaxed mb-6">
                Somsuite Technology was founded with a clear vision: to make enterprise-level technology solutions accessible to businesses of all sizes. We started as a small team of passionate IT professionals who believed that exceptional technology services should not come with prohibitive price tags.
              </p>
              <p className="text-foreground-muted text-lg leading-relaxed mb-6">
                Over the years, we have grown into a trusted technology partner for over 25 businesses across various industries. Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep understanding of our clients' needs.
              </p>
              <p className="text-foreground-muted text-lg leading-relaxed">
                Today, we stand as authorized partners of industry leaders like Microsoft, Dell, and Cisco, bringing world-class solutions to our clients while maintaining the personalized service that has been our hallmark since the beginning.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Award, title: "Excellence", desc: "Committed to delivering the highest quality" },
                { icon: Target, title: "Innovation", desc: "Staying ahead with cutting-edge solutions" },
                { icon: Users, title: "Partnership", desc: "Building lasting relationships with clients" },
                { icon: Lightbulb, title: "Expertise", desc: "Deep technical knowledge and experience" }
              ].map((item, i) => (
                <Card key={i} className="p-6 text-center hover:border-accent transition-all hover:shadow-lg">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground-muted">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What We <span className="text-accent">Do</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Comprehensive technology solutions for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "IT Management",
                description: "Complete oversight of your technology infrastructure, ensuring optimal performance and reliability around the clock."
              },
              {
                title: "IT Operations",
                description: "Day-to-day management of systems, networks, and applications to keep your business running smoothly."
              },
              {
                title: "Professional Services",
                description: "Expert consulting, implementation, and support services tailored to your specific business requirements."
              },
              {
                title: "Cloud Solutions",
                description: "Migration, management, and optimization of cloud infrastructure for enhanced scalability and efficiency."
              },
              {
                title: "Security Services",
                description: "Comprehensive cybersecurity solutions to protect your data, systems, and operations from threats."
              },
              {
                title: "System Integration",
                description: "Seamless integration of diverse systems and platforms for improved workflow and productivity."
              }
            ].map((service, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let us help you achieve your technology goals
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link to="/contact">
              Contact Us Today <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Company;
