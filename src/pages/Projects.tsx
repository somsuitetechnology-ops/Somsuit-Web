import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight, Zap, ShoppingCart, Users, Heart, BookOpen } from 'lucide-react';
import demoEcommerce from '@/assets/demo-ecommerce.png';
import demoHealthcare from '@/assets/demo-healthcare.png';
import demoLearning from '@/assets/demo-learning.png';
import demoFintech from '@/assets/demo-fintech.png';
const baraarugImage = '/lovable-uploads/584c88fd-31cf-4435-990e-889f5cfafa3f.png';
const siuAlumniImage = '/lovable-uploads/0c2a73d8-0b86-428f-ac5d-d74aa65c1d1d.png';
const sonakImage = '/lovable-uploads/bdcc3514-02c7-4745-b2c4-681b44722010.png';
const hugodressImage = '/lovable-uploads/12a4d78a-a084-48aa-80d6-f4d9e1bca47b.png';
const sohaAwardsImage = '/lovable-uploads/ab299ea0-be47-45f4-a3ad-a8e6644ad7db.png';
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      title: "SIU Alumni Association",
      description: "Complete branding, logo design, and Alumni Registration system for Somalia International University Alumni Association, creating a professional identity and digital platform that connects graduates worldwide.",
      image: siuAlumniImage,
      category: "Branding & Web",
      tags: ["Logo Design", "Brand Identity", "Alumni Network", "Registration System"],
      link: "https://alumni.siu.edu.so",
      type: "Website",
      icon: Users
    },
    {
      title: "Baraarug Consultant Firm",
      description: "Comprehensive branding, logo design, and web development for a leading consulting firm, establishing their digital presence and professional credibility.",
      image: baraarugImage, 
      category: "Branding & Web",
      tags: ["Branding", "Web Design", "Consulting"],
      link: "https://bcf.so",
      type: "Website",
      icon: Heart
    },
    {
      title: "Hugodress.com",
      description: "Modern e-commerce platform for fashion retail, featuring responsive design, secure payment integration, and intuitive user experience.",
      image: "/lovable-uploads/12a4d78a-a084-48aa-80d6-f4d9e1bca47b.png?v=2",
      category: "E-commerce", 
      tags: ["E-commerce", "Fashion", "Online Store"],
      link: "https://hugodress.com",
      type: "Website",
      icon: ShoppingCart
    },
    {
      title: "Sonak.so",
      description: "Innovative technology learning platform designed to make programming and tech skills accessible to Somali-speaking learners worldwide.",
      image: sonakImage,
      category: "Education",
      tags: ["Education", "Technology", "Learning Platform"],
      link: "https://sonak.so",
      type: "Website",
      icon: BookOpen
    },
    {
      title: "FinTech Mobile App",
      description: "Secure mobile banking application with advanced features including account management, transfers, investments, and financial analytics.",
      image: demoFintech,
      category: "Mobile App",
      tags: ["Mobile", "FinTech", "Banking", "Security"],
      link: "#",
      type: "Mobile App",
      icon: Zap
    },
    {
      title: "Soha Awards",
      description: "Comprehensive voting system for Somali Health Awards, recognizing significant contributions in the healthcare sector with secure voting mechanisms and award management.",
      image: sohaAwardsImage,
      category: "Healthcare",
      tags: ["Healthcare", "Voting System", "Awards", "Recognition"],
      link: "#",
      type: "Web Application",
      icon: Heart
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Director, SIU Alumni Association",
      content: "Somsuite Technology delivered exceptional branding that perfectly captured our vision. The logo and brand identity have helped us build a stronger connection with our alumni network.",
      rating: 5
    },
    {
      name: "Fatima Ali",
      role: "CEO, Baraarug Consultant",
      content: "The team at Somsuite Technology exceeded our expectations. From branding to web development, they provided comprehensive solutions that transformed our business presence.",
      rating: 5
    },
    {
      name: "Mohamed Omar",
      role: "Founder, Hugodress",
      content: "Our e-commerce platform has been a game-changer for our business. The user experience is excellent and the technical implementation is flawless.",
      rating: 5
    }
  ];

  const categories = ["All", "Branding", "Web Development", "E-commerce", "Education", "Mobile App", "Healthcare"];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => {
        if (activeCategory === "E-commerce") return project.category === "E-commerce";
        if (activeCategory === "Branding") return project.category.includes("Branding");
        if (activeCategory === "Web Development") return project.category.includes("Web");
        if (activeCategory === "Education") return project.category === "Education";
        if (activeCategory === "Mobile App") return project.category === "Mobile App";
        if (activeCategory === "Healthcare") return project.category === "Healthcare";
        return false;
      });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" style={{
        background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--brand-primary)) 30%, hsl(var(--background)) 100%)'
      }}>
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--accent) / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--accent) / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
            <span className="text-accent font-semibold text-sm">🎨 Showcasing Excellence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Our <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">Portfolio</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Explore our latest projects and see how we've helped businesses transform 
            their digital presence and achieve their goals.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button 
              key={category}
              variant={category === activeCategory ? "accent" : "glass"}
              className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                category === activeCategory 
                  ? 'shadow-lg shadow-accent/30 scale-105' 
                  : 'hover:scale-105'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-2 border-transparent hover:border-accent/30 bg-gradient-to-br from-card to-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-background-secondary to-background-tertiary">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <project.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
                    {project.category}
                  </Badge>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="text-xs bg-accent/5 border-accent/20 text-foreground hover:bg-accent/10 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Description */}
                <p className="text-foreground-muted leading-relaxed min-h-[80px]">
                  {project.description}
                </p>
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  {project.link !== "#" ? (
                    <Button 
                      variant="accent" 
                      size="sm" 
                      asChild 
                      className="group/btn shadow-lg shadow-accent/20"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Site
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  ) : (
                    <Button variant="glass" size="sm" disabled>
                      Demo Project
                    </Button>
                  )}
                  <span className="text-sm text-foreground-muted font-medium">{project.type}</span>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" 
                   style={{ background: 'linear-gradient(135deg, hsl(var(--accent) / 0.1), transparent)' }} 
              />
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-background-secondary to-background py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
              <span className="text-accent font-semibold text-sm">💬 Client Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-accent">Clients Say</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="group p-8 border-2 border-transparent hover:border-accent/30 bg-gradient-to-br from-card to-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-6 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span 
                      key={i} 
                      className="text-accent text-2xl transform group-hover:scale-110 transition-transform"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <div className="absolute -left-2 -top-2 text-6xl text-accent/20 font-serif">"</div>
                  <p className="text-foreground-muted text-lg leading-relaxed relative z-10 pl-6">
                    {testimonial.content}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-foreground-muted">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "50+", label: "Projects Completed", icon: "🚀" },
              { number: "25+", label: "Happy Clients", icon: "😊" },
              { number: "5+", label: "Years Experience", icon: "⭐" },
              { number: "100%", label: "Client Satisfaction", icon: "✨" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-foreground-muted font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden" style={{
        background: 'linear-gradient(135deg, hsl(var(--background-secondary)) 0%, hsl(var(--brand-primary)) 50%, hsl(var(--background-secondary)) 100%)'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
            <span className="text-accent font-semibold text-sm">🤝 Let's Work Together</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Start Your <br />
            <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
              Next Project?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's create something amazing together. Get in touch to discuss your project and see how we can help transform your vision into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="hero" size="lg" asChild className="group shadow-2xl shadow-accent/30">
              <a href="/contact" className="text-lg px-12 py-6">
                Start Your Project
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild className="text-lg px-12 py-6">
              <a href="https://wa.link/49u948" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;