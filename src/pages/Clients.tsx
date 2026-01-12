import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, Award, TrendingUp, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Clients = () => {
  const testimonials = [
    {
      name: "Ahmed Hassan",
      company: "Tech Solutions Ltd",
      role: "CTO",
      text: "Somsuite Technology transformed our IT infrastructure. Their expertise and dedication are unmatched.",
      rating: 5
    },
    {
      name: "Fatima Ali",
      company: "Global Trading Co",
      role: "IT Director",
      text: "Outstanding service and support. They truly understand our business needs and deliver solutions that work.",
      rating: 5
    },
    {
      name: "Mohamed Osman",
      company: "Finance Corp",
      role: "Operations Manager",
      text: "Professional, reliable, and innovative. Somsuite Technology is our trusted IT partner.",
      rating: 5
    },
  ];

  const caseStudies = [
    {
      title: "Financial Services Modernization",
      client: "Major Bank",
      industry: "Banking & Finance",
      results: "40% improvement in system performance, 60% reduction in downtime",
      icon: TrendingUp
    },
    {
      title: "Cloud Migration Success",
      client: "Healthcare Provider",
      industry: "Healthcare",
      results: "Seamless migration to cloud, 50% cost savings, enhanced security",
      icon: Award
    },
    {
      title: "Network Infrastructure Overhaul",
      client: "Manufacturing Company",
      industry: "Manufacturing",
      results: "99.9% uptime, improved connectivity, scalable architecture",
      icon: Users
    },
  ];

  const stats = [
    { label: "Happy Clients", value: "150+", icon: Users },
    { label: "Success Rate", value: "98%", icon: Award },
    { label: "Years Experience", value: "10+", icon: TrendingUp },
    { label: "5-Star Reviews", value: "200+", icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)/0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Trusted Worldwide</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Our <span className="text-gradient">Clients</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Trusted by leading organizations across industries. Delivering excellence through partnership.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear what our clients have to say about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <Quote className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
                
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center space-x-4 pt-4 border-t border-border">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center ring-2 ring-accent/20">
                    <span className="text-accent font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-accent">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real results from real partnerships
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-glow group overflow-hidden">
                <div className="grid md:grid-cols-3 gap-8 relative z-10">
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <study.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
                          {study.industry}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{study.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gradient">{study.client}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-6 rounded-xl w-full border border-accent/20 group-hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        <p className="text-sm font-bold text-accent uppercase tracking-wider">Results</p>
                      </div>
                      <p className="text-foreground leading-relaxed">{study.results}</p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Award className="w-16 h-16 text-accent mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Our <span className="text-gradient">Success Stories?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Partner with us to transform your business with cutting-edge IT solutions
          </p>
          <Link to="/contact">
            <Button variant="hero" size="lg" className="group">
              Start Your Journey
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Clients;
