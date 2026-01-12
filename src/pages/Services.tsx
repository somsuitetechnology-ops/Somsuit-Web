import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Palette, Code, Smartphone, Database, HeadphonesIcon, ArrowRight, CheckCircle, Network, GraduationCap, Cloud, Shield } from 'lucide-react';

const Services = () => {
const services = [
    {
      icon: Palette,
      title: "Company Branding",
      description: "Create a powerful brand identity that resonates with your target audience and sets you apart from the competition.",
      features: [
        "Logo Design & Brand Identity",
        "Brand Guidelines & Strategy",
        "Marketing Materials Design",
        "Brand Positioning & Messaging",
        "Visual Identity Systems"
      ]
    },
    {
      icon: Code,
      title: "Web Design & Development",
      description: "Build stunning, responsive websites that deliver exceptional user experiences and drive business growth.",
      features: [
        "Custom Website Design",
        "Responsive Development",
        "E-commerce Solutions",
        "CMS Integration",
        "SEO Optimization"
      ]
    },
    {
      icon: Database,
      title: "Software Development",
      description: "Develop custom software solutions tailored to your specific business needs and workflows.",
      features: [
        "Custom Software Solutions",
        "Enterprise Applications",
        "API Development & Integration",
        "Database Design & Management",
        "System Architecture"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Create engaging mobile applications for iOS and Android that connect with your customers on the go.",
      features: [
        "Native iOS & Android Apps",
        "Cross-platform Development",
        "UI/UX Design",
        "App Store Optimization",
        "Maintenance & Support"
      ]
    },
    {
      icon: HeadphonesIcon,
      title: "IT Consultancy",
      description: "Get expert guidance on technology strategy, digital transformation, and IT infrastructure optimization.",
      features: [
        "Technology Strategy",
        "Digital Transformation",
        "IT Infrastructure Planning",
        "Security Assessment",
        "Performance Optimization"
      ]
    },
    {
      icon: Network,
      title: "Network Infrastructure",
      description: "Design and implement robust network infrastructure solutions for seamless connectivity and optimal performance.",
      features: [
        "Network Design & Planning",
        "Hardware Installation & Configuration",
        "Network Security Implementation",
        "Performance Monitoring",
        "Maintenance & Support"
      ]
    },
    {
      icon: GraduationCap,
      title: "IT Training",
      description: "Comprehensive training programs to enhance your team's technical skills and digital literacy.",
      features: [
        "Custom Training Programs",
        "Certification Preparation",
        "Hands-on Workshops",
        "Online Learning Modules",
        "Progress Tracking"
      ]
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Migrate to the cloud and leverage scalable, secure, and cost-effective cloud solutions.",
      features: [
        "Cloud Migration Strategy",
        "Multi-cloud Solutions",
        "Data Backup & Recovery",
        "Cloud Security",
        "Cost Optimization"
      ]
    },
    {
      icon: Shield,
      title: "Cyber Security",
      description: "Protect your business with comprehensive cybersecurity solutions and threat prevention strategies.",
      features: [
        "Security Audits & Assessment",
        "Threat Detection & Response",
        "Data Protection & Encryption",
        "Compliance Management",
        "Employee Security Training"
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business, goals, and challenges through detailed consultation."
    },
    {
      step: "02", 
      title: "Strategy",
      description: "We develop a comprehensive strategy and roadmap tailored to your specific needs."
    },
    {
      step: "03",
      title: "Design",
      description: "Our team creates innovative designs and prototypes that bring your vision to life."
    },
    {
      step: "04",
      title: "Development",
      description: "We build your solution using cutting-edge technologies and best practices."
    },
    {
      step: "05",
      title: "Launch",
      description: "We deploy your solution and provide ongoing support to ensure success."
    }
  ];

  return (
    <div className="py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-8">
            We offer comprehensive technology solutions designed to help your business 
            thrive in the digital age. From branding to development, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8 border-glow card-hover bg-card">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-foreground-muted">{service.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <Button variant="accent" asChild>
                  <a href="https://wa.link/49u948" target="_blank" rel="noopener noreferrer">
                    Get Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-background-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-accent">Process</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              We follow a proven methodology to ensure your project is delivered on time, 
              within budget, and exceeds your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-accent">Somsuite Technology?</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Expert Team</h3>
                    <p className="text-foreground-muted">Our skilled professionals bring years of experience and cutting-edge expertise to every project.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Proven Results</h3>
                    <p className="text-foreground-muted">We have a track record of delivering successful projects that drive real business value.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Support</h3>
                    <p className="text-foreground-muted">We provide ongoing support and maintenance to ensure your solutions continue to perform optimally.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 border-glow bg-card">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Get Started?</h3>
              <p className="text-foreground-muted text-center mb-6">
                Let's discuss your project and how we can help bring your vision to life.
              </p>
              <div className="space-y-4">
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/contact">
                    Start Your Project <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="glass" className="w-full" asChild>
                  <Link to="/projects">View Our Portfolio</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;