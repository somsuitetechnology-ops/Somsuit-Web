import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Target, Eye, Award, Users, ArrowRight } from 'lucide-react';
import somsuiteLogo from '@/assets/somsuite.png';

const moralTechLogo = somsuiteLogo;

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We constantly push the boundaries of technology to deliver cutting-edge solutions."
    },
    {
      icon: Eye,
      title: "Quality",
      description: "Every project is executed with meticulous attention to detail and highest standards."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from concept to delivery."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work closely with our clients as partners, not just service providers."
    }
  ];

  const expertise = [
    "Company Branding & Identity",
    "Web Design & Development", 
    "Software Development",
    "Mobile App Development",
    "IT Consultancy & Strategy"
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-16">
          <div className="float mb-8">
            <img src={moralTechLogo} alt="Somsuite Technology" className="h-16 w-auto mx-auto opacity-20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-accent">Somsuite Technology</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            We are a forward-thinking technology company dedicated to empowering businesses 
            through innovative digital solutions and cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-8 border-glow bg-card">
            <h2 className="text-2xl font-bold mb-4 text-accent">Our Mission</h2>
            <p className="text-foreground-muted text-lg leading-relaxed">
              To bridge the gap between traditional business practices and modern technology, 
              providing comprehensive solutions that drive growth, efficiency, and innovation. 
              We believe in the power of technology to transform businesses and create lasting value.
            </p>
          </Card>

          <Card className="p-8 border-glow bg-card">
            <h2 className="text-2xl font-bold mb-4 text-accent">Our Vision</h2>
            <p className="text-foreground-muted text-lg leading-relaxed">
              To become the leading technology partner for businesses seeking digital transformation. 
              We envision a future where every business, regardless of size, can leverage 
              cutting-edge technology to achieve their goals and make a positive impact.
            </p>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-background-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core <span className="text-accent">Values</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              These values guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 border-glow card-hover bg-card text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-foreground-muted">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-accent">Expertise</span>
              </h2>
              <p className="text-xl text-foreground-muted mb-8">
                With years of experience in the technology industry, we have developed 
                expertise across multiple domains to serve our clients better.
              </p>
              
              <div className="space-y-4 mb-8">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="accent" size="lg" asChild>
                <Link to="/services">
                  Explore Our Services <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Card className="p-8 border-glow bg-card">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">5+</div>
                  <div className="text-foreground-muted mb-6">Years of Excellence</div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">50+</div>
                      <div className="text-sm text-foreground-muted">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-1">25+</div>
                      <div className="text-sm text-foreground-muted">Happy Clients</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work With <span className="text-accent">Us?</span>
          </h2>
          <p className="text-xl text-foreground-muted mb-8">
            Let's discuss how we can help transform your business with innovative technology solutions.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get In Touch <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;