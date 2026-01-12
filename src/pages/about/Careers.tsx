import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Code, Server, Shield, Users } from 'lucide-react';

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Network Engineer",
      department: "Infrastructure",
      location: "Atlanta, GA",
      type: "Full-time",
      icon: Server,
      description: "Design and implement enterprise network solutions for our clients. Requires 5+ years of experience with Cisco and network security."
    },
    {
      title: "Cloud Solutions Architect",
      department: "Cloud Services",
      location: "Atlanta, GA",
      type: "Full-time",
      icon: Code,
      description: "Lead cloud migration projects and design scalable cloud architectures. Azure/AWS certifications required."
    },
    {
      title: "Cybersecurity Specialist",
      department: "Security",
      location: "Atlanta, GA",
      type: "Full-time",
      icon: Shield,
      description: "Protect client systems and data through advanced security measures. CISSP or equivalent certification preferred."
    },
    {
      title: "IT Support Specialist",
      department: "Support Services",
      location: "Atlanta, GA",
      type: "Full-time",
      icon: Users,
      description: "Provide technical support to clients and ensure smooth operations. Strong communication skills essential."
    }
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      description: "Industry-leading compensation packages"
    },
    {
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and family"
    },
    {
      title: "Professional Development",
      description: "Certifications, training, and conference attendance"
    },
    {
      title: "Flexible Schedule",
      description: "Work-life balance with flexible working hours"
    },
    {
      title: "Career Growth",
      description: "Clear advancement paths and mentorship programs"
    },
    {
      title: "Modern Tools",
      description: "Latest technology and equipment to do your best work"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our <span className="text-accent">Team</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Build your career with a company that values innovation, growth, and excellence
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Work at <span className="text-accent">Somsuite Technology</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Join a team that is shaping the future of technology services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl">
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-foreground-muted">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Open <span className="text-accent">Positions</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Find your perfect role in our growing team
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((job, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <job.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-foreground-muted mb-4">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm">{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{job.type}</span>
                        </div>
                      </div>
                      <p className="text-foreground-muted leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="default"
                    className="bg-accent hover:bg-accent-hover text-primary font-semibold whitespace-nowrap"
                    asChild
                  >
                    <Link to="/contact">
                      Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Application <span className="text-accent">Process</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Simple and transparent hiring process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Apply",
                description: "Submit your application and resume through our contact form"
              },
              {
                step: "2",
                title: "Review",
                description: "Our team reviews your qualifications and experience"
              },
              {
                step: "3",
                title: "Interview",
                description: "Meet with our team to discuss the role and your fit"
              },
              {
                step: "4",
                title: "Offer",
                description: "Receive an offer and join the Somsuite Technology family"
              }
            ].map((process, i) => (
              <Card key={i} className="p-8 text-center relative overflow-hidden group hover:border-accent transition-all">
                <div className="text-8xl font-bold text-accent/10 absolute -top-4 -right-4 group-hover:text-accent/20 transition-colors">
                  {process.step}
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <span className="text-2xl font-bold text-accent">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                  <p className="text-foreground-muted">{process.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Send your resume and let us know which position interests you
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link to="/contact">
              Apply Today <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
