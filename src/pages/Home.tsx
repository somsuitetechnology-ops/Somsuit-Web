import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Network, Cloud, Shield, Cpu, Wrench, Globe, ExternalLink, Users, BookOpen, ShoppingCart, Heart } from 'lucide-react';

const baraarugImage = '/lovable-uploads/584c88fd-31cf-4435-990e-889f5cfafa3f.png';
const siuAlumniImage = '/lovable-uploads/0c2a73d8-0b86-428f-ac5d-d74aa65c1d1d.png';
const sonakImage = '/lovable-uploads/bdcc3514-02c7-4745-b2c4-681b44722010.png';
const hugodressImage = '/lovable-uploads/12a4d78a-a084-48aa-80d6-f4d9e1bca47b.png';
const sohaAwardsImage = '/lovable-uploads/ab299ea0-be47-45f4-a3ad-a8e6644ad7db.png';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        {/* Ultra Advanced Animated Background */}
        <div className="absolute inset-0">
          {/* Dynamic Morphing Gradient Mesh */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-accent/25 via-transparent to-accent/15 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
          </div>

          {/* Optimized 3D Grid System - Reduced complexity */}
          <div className="absolute inset-0 opacity-20" style={{ perspective: '1000px' }}>
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--accent) / 0.2) 2px, transparent 2px),
                  linear-gradient(90deg, hsl(var(--accent) / 0.2) 2px, transparent 2px)
                `,
                backgroundSize: '100px 100px',
                backgroundPosition: '0 0',
                animation: 'gridMove 40s linear infinite'
              }}
            />
          </div>

          {/* Simplified Hexagonal Tech Pattern */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0',
            animation: 'hexagonMove 35s linear infinite'
          }} />

          {/* Optimized Particles - Reduced count */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-accent will-change-transform"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.4 + Math.random() * 0.4,
                boxShadow: `0 0 20px hsl(var(--accent) / 0.6)`
              }}
            />
          ))}

          {/* Optimized Glowing Orbs */}
          <div className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute -bottom-48 -right-48 w-[700px] h-[700px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

          {/* Simplified Circuit Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            
            {/* Horizontal Lines */}
            <line x1="0" y1="25%" x2="100%" y2="25%" stroke="url(#line-gradient-1)" strokeWidth="2">
              <animate attributeName="x1" from="-100%" to="100%" dur="6s" repeatCount="indefinite" />
              <animate attributeName="x2" from="0%" to="200%" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="url(#line-gradient-1)" strokeWidth="2">
              <animate attributeName="x1" from="-100%" to="100%" dur="8s" repeatCount="indefinite" />
              <animate attributeName="x2" from="0%" to="200%" dur="8s" repeatCount="indefinite" />
            </line>
            
            {/* Vertical Lines */}
            <line x1="25%" y1="0" x2="25%" y2="100%" stroke="url(#line-gradient-1)" strokeWidth="2">
              <animate attributeName="y1" from="-100%" to="100%" dur="7s" repeatCount="indefinite" />
              <animate attributeName="y2" from="0%" to="200%" dur="7s" repeatCount="indefinite" />
            </line>
            <line x1="75%" y1="0" x2="75%" y2="100%" stroke="url(#line-gradient-1)" strokeWidth="2">
              <animate attributeName="y1" from="-100%" to="100%" dur="9s" repeatCount="indefinite" />
              <animate attributeName="y2" from="0%" to="200%" dur="9s" repeatCount="indefinite" />
            </line>
          </svg>

          {/* Simplified Geometric Shapes */}
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-accent/30 rotate-45" style={{ animation: 'float 15s ease-in-out infinite' }} />
          <div className="absolute bottom-24 right-24 w-36 h-36 border-2 border-accent/25 rounded-full" style={{ animation: 'float 18s ease-in-out infinite' }} />
          
          {/* Simplified Tech Nodes - Reduced count */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`node-${i}`}
              className="absolute w-4 h-4 bg-accent/40 rounded-full will-change-transform"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i % 3) * 20}%`,
                animation: `pulse 5s ease-in-out infinite, float ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                boxShadow: '0 0 30px hsl(var(--accent) / 0.6)'
              }}
            >
              <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '4s' }} />
            </div>
          ))}

          {/* Simplified Digital Rain - Reduced count */}
          {[...Array(10)].map((_, i) => (
            <div
              key={`rain-${i}`}
              className="absolute w-px opacity-40"
              style={{
                left: `${i * 10}%`,
                height: '100%',
                background: `linear-gradient(to bottom, transparent, hsl(var(--accent) / 0.5), transparent)`,
                animation: `matrixRain ${5 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-block mb-6 px-6 py-3 bg-accent/20 border-2 border-accent/40 rounded-full backdrop-blur-sm shadow-lg shadow-accent/20">
            <span className="text-accent font-bold text-sm tracking-wider">🚀 Innovative Technology Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="block mb-3">Providing Quality</span>
            <span className="block mb-3 bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_30px_rgba(214,254,92,0.5)]" style={{ animationDuration: '3s' }}>
              Systems Solutions
            </span>
            <span className="block text-white/90">is Our Top Priority!</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Empowering businesses through cutting-edge technology, innovative solutions, and exceptional IT services. Transform your digital presence with Somsuite Technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              variant="default" 
              size="lg" 
              asChild 
              className="text-lg px-12 py-7 bg-accent hover:bg-accent-hover text-primary font-bold shadow-2xl shadow-accent/30 group border-2 border-accent/50 hover:scale-105 transition-all"
            >
              <Link to="/contact">
                Schedule to Discuss 
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={24} />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="text-lg px-12 py-7 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link to="/services">
                Our Services
              </Link>
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: "50+", label: "Projects Delivered", icon: "🎯" },
              { number: "25+", label: "Happy Clients", icon: "😊" },
              { number: "5+", label: "Years Experience", icon: "⭐" },
              { number: "24/7", label: "Support", icon: "🛡️" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:text-accent-hover transition-colors">
                  {stat.number}
                </div>
                <div className="text-white/70 font-medium text-sm">
                  {stat.label}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced Brand Design */}
      <section className="py-24 bg-gradient-to-b from-background via-background to-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)/0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Cpu className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">What We Offer</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IT solutions designed to elevate your business
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Network,
                title: "Corporate Networking",
                description: "Design, implement, and manage robust network infrastructure for seamless business connectivity and performance.",
                link: "/services/networking"
              },
              {
                icon: Cloud,
                title: "Cloud Computing",
                description: "Migrate and optimize your infrastructure with secure, scalable cloud solutions tailored to your needs.",
                link: "/services/cloud"
              },
              {
                icon: Wrench,
                title: "Managed Services",
                description: "Comprehensive IT management and support to keep your systems running smoothly 24/7.",
                link: "/services/managed"
              },
              {
                icon: Shield,
                title: "IT Security Solutions",
                description: "Advanced security solutions to protect your business from cyber threats and ensure compliance.",
                link: "/services/security"
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className="group relative p-8 bg-card/50 backdrop-blur-sm border-glow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="mb-6 relative">
                    <div className="w-20 h-20 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:border-accent/60 group-hover:shadow-lg group-hover:shadow-accent/20 group-hover:scale-110 transition-all duration-500 relative">
                      <service.icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-gradient transition-all duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[100px]">
                    {service.description}
                  </p>

                  {/* Read More Link with Arrow */}
                  <Link 
                    to={service.link}
                    className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all duration-300 group/link relative"
                  >
                    <span className="relative">
                      Read More
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover/link:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />
              </Card>
            ))}
          </div>

          {/* View All Services Button */}
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" asChild className="group">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Layered Cards */}
            <div className="relative h-[600px] flex items-center justify-center">
              {/* Card 1 - Back */}
              <div className="absolute top-0 left-0 w-[350px] h-[280px] bg-primary rounded-2xl shadow-2xl z-10 p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-2">AN IT</h3>
                <h3 className="text-3xl font-bold text-white mb-2">SERVICES</h3>
                <h3 className="text-3xl font-bold text-white mb-4">COMPANY</h3>
                <p className="text-white/80 text-sm uppercase tracking-wide">
                  Specializing in IT Management
                </p>
              </div>

              {/* Card 2 - Middle with Image */}
              <div className="absolute top-20 right-0 w-[300px] h-[320px] rounded-2xl shadow-2xl overflow-hidden z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-center text-white">
                    <Shield className="w-20 h-20 mx-auto mb-4 text-accent" />
                    <p className="text-lg font-semibold">Professional IT Services</p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Front */}
              <div className="absolute bottom-0 left-12 w-[360px] h-[280px] bg-accent rounded-2xl shadow-2xl z-30 p-8 flex flex-col justify-center">
                <h3 className="text-4xl font-bold text-primary mb-4">WORK</h3>
                <h3 className="text-4xl font-bold text-primary mb-6">SMART</h3>
                <p className="text-primary text-sm uppercase tracking-wide">
                  Working smart doesn't mean working less
                </p>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <div className="mb-4">
                <span className="text-accent text-sm font-bold uppercase tracking-wider">
                  About Us
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Somsuite <span className="text-accent">Technology</span>
              </h2>
              
              <p className="text-foreground-muted text-lg leading-relaxed mb-6">
                Somsuite Technology is an IT services company specializing in IT management, IT operations, and IT professional services. Somsuite Technology was founded with a mission to provide innovative technology solutions that empower businesses to thrive in the digital age.
              </p>
              
              <p className="text-foreground-muted text-lg leading-relaxed mb-8">
                We took on the challenge of providing exceptional support to our clients as an authorized partner of industry-leading brands such as Microsoft, Dell, Cisco, and many others. Our team of certified professionals delivers comprehensive solutions tailored to your business needs.
              </p>
              
              <Button 
                variant="default" 
                size="lg" 
                asChild 
                className="bg-accent hover:bg-accent-hover text-primary font-semibold px-8"
              >
                <Link to="/about">
                  Read More <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Projects Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-accent">Projects</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Transforming ideas into reality with innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* SIU Alumni Association */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-accent/30">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-background to-background-tertiary">
                <img 
                  src={siuAlumniImage} 
                  alt="SIU Alumni Association"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
                    Branding & Web
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">SIU Alumni Association</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["Logo Design", "Brand Identity", "Alumni Network", "Registration System"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-accent/5 border-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-foreground-muted leading-relaxed">
                  Complete branding, logo design, and Alumni Registration system for Somalia International University Alumni Association, creating a professional identity and digital platform that connects graduates worldwide.
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent-hover group/btn">
                    <a href="https://alumni.siu.edu.so" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Site
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <span className="text-sm text-foreground-muted font-medium">Website</span>
                </div>
              </div>
            </Card>

            {/* Baraarug Consultant Firm */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-accent/30">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-background to-background-tertiary">
                <img 
                  src={baraarugImage} 
                  alt="Baraarug Consultant Firm"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
                    Branding & Web
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Baraarug Consultant Firm</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["Branding", "Web Design", "Consulting", "Professional"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-accent/5 border-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-foreground-muted leading-relaxed">
                  Comprehensive branding, logo design, and web development for a leading consulting firm, establishing their digital presence and professional credibility in the market.
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent-hover group/btn">
                    <a href="https://bcf.so" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Site
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <span className="text-sm text-foreground-muted font-medium">Website</span>
                </div>
              </div>
            </Card>

            {/* Hugodress.com */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-accent/30">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-background to-background-tertiary">
                <img 
                  src={hugodressImage} 
                  alt="Hugodress E-commerce"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
                    E-commerce
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Hugodress.com</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["E-commerce", "Fashion", "Online Store", "Payment Integration"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-accent/5 border-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-foreground-muted leading-relaxed">
                  Modern e-commerce platform for fashion retail, featuring responsive design, secure payment integration, and intuitive user experience for seamless online shopping.
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent-hover group/btn">
                    <a href="https://hugodress.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Site
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <span className="text-sm text-foreground-muted font-medium">Website</span>
                </div>
              </div>
            </Card>

            {/* Sonak.so */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-accent/30">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-background to-background-tertiary">
                <img 
                  src={sonakImage} 
                  alt="Sonak Learning Platform"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
                    Education
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Sonak.so</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["Education", "Technology", "Learning Platform", "E-learning"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-accent/5 border-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-foreground-muted leading-relaxed">
                  Innovative technology learning platform designed to make programming and tech skills accessible to Somali-speaking learners worldwide through interactive courses.
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent-hover group/btn">
                    <a href="https://sonak.so" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Site
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <span className="text-sm text-foreground-muted font-medium">Website</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild className="border-accent text-accent hover:bg-accent hover:text-white">
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Innovation & Ideas Section */}
      <section className="py-24 bg-gradient-to-b from-background to-background-secondary relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`innovation-particle-${i}`}
              className="absolute rounded-full bg-accent/30"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-bold text-accent tracking-wider">INNOVATION HUB</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ideas, <span className="text-gradient">Our Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We transform visionary concepts into cutting-edge technological solutions that drive the future
            </p>
          </div>

          {/* Innovation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "💡",
                title: "Ideation & Discovery",
                description: "Share your vision and let us help you explore possibilities, refine concepts, and identify the perfect technology stack for your project.",
                gradient: "from-yellow-500/10 to-orange-500/10",
                borderColor: "border-yellow-500/30",
                glowColor: "hover:shadow-yellow-500/20"
              },
              {
                icon: "🚀",
                title: "Rapid Prototyping",
                description: "Transform ideas into working prototypes quickly. We leverage agile methodologies to bring your concepts to life in record time.",
                gradient: "from-blue-500/10 to-cyan-500/10",
                borderColor: "border-blue-500/30",
                glowColor: "hover:shadow-blue-500/20"
              },
              {
                icon: "⚡",
                title: "Custom Solutions",
                description: "Every business is unique. We craft bespoke technology solutions tailored to your specific needs, goals, and industry requirements.",
                gradient: "from-purple-500/10 to-pink-500/10",
                borderColor: "border-purple-500/30",
                glowColor: "hover:shadow-purple-500/20"
              },
              {
                icon: "🎯",
                title: "Strategic Planning",
                description: "From concept to execution, we help you create comprehensive roadmaps that align technology with your business objectives.",
                gradient: "from-green-500/10 to-emerald-500/10",
                borderColor: "border-green-500/30",
                glowColor: "hover:shadow-green-500/20"
              },
              {
                icon: "🔬",
                title: "R&D Excellence",
                description: "Stay ahead with our research-driven approach. We explore emerging technologies to give you a competitive advantage.",
                gradient: "from-red-500/10 to-rose-500/10",
                borderColor: "border-red-500/30",
                glowColor: "hover:shadow-red-500/20"
              },
              {
                icon: "🌟",
                title: "Innovation Partnership",
                description: "Join forces with us for long-term innovation. We become your dedicated technology partner, evolving with your business.",
                gradient: "from-accent/10 to-accent/5",
                borderColor: "border-accent/30",
                glowColor: "hover:shadow-accent/20"
              }
            ].map((item, index) => (
              <Card 
                key={index}
                className={`group relative p-8 bg-card/50 backdrop-blur-sm border-2 ${item.borderColor} hover:border-accent/50 hover:-translate-y-2 hover:shadow-2xl ${item.glowColor} transition-all duration-500 overflow-hidden animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-gradient transition-all duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
          </div>

          {/* Call to Action Box */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-primary/50 to-accent/10 backdrop-blur-sm p-12 text-center animate-fade-in">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
                backgroundSize: '30px 30px',
                animation: 'gridMove 20s linear infinite'
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3 px-6 py-3 bg-accent/20 rounded-full border border-accent/40">
                  <Globe className="w-5 h-5 text-accent" />
                  <span className="text-accent font-bold">Have an Idea?</span>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Build Something Amazing Together
              </h3>
              
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Whether you have a fully formed concept or just a spark of inspiration, our team is ready to help you turn it into reality. Share your vision with us today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  size="lg" 
                  asChild
                  className="bg-accent hover:bg-accent-hover text-primary font-bold text-lg px-10 py-6 shadow-2xl shadow-accent/30 group border-2 border-accent/50 hover:scale-105 transition-all"
                >
                  <Link to="/contact">
                    Share Your Idea
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-10 py-6"
                >
                  <Link to="/projects">
                    View Our Work
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss how we can help you achieve your technology goals
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent text-primary hover:bg-accent-hover text-lg px-10 py-6 glow-intense"
          >
            <Link to="/contact">
              Get Started Today <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
