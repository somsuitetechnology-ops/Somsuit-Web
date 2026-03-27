import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Bot, Sparkles, Workflow, TrendingUp, Zap, CheckCircle, Rocket } from 'lucide-react';
import Link from 'next/link';

const AI = () => {
  const solutions = [
    {
      icon: Brain,
      title: "AI Analytics & Insights",
      description: "Transform data into actionable insights using advanced AI algorithms",
      features: ["Predictive Analytics", "Pattern Recognition", "Real-time Insights", "Custom ML Models"]
    },
    {
      icon: Bot,
      title: "Chatbots & Virtual Assistants",
      description: "Intelligent conversational AI for customer service and support",
      features: ["24/7 Availability", "Multi-language Support", "Context-aware Responses", "CRM Integration"]
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Automate repetitive tasks and streamline business workflows",
      features: ["RPA Solutions", "Document Processing", "Email Automation", "Workflow Optimization"]
    },
    {
      icon: Sparkles,
      title: "Computer Vision",
      description: "Image and video analysis for quality control and monitoring",
      features: ["Object Detection", "Facial Recognition", "OCR Technology", "Quality Inspection"]
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Efficiency",
      description: "Automate tasks and reduce operational costs by up to 60%"
    },
    {
      icon: Zap,
      title: "Faster Decisions",
      description: "Real-time AI insights for quick and informed decision making"
    },
    {
      icon: Rocket,
      title: "Competitive Edge",
      description: "Stay ahead with cutting-edge AI technology"
    },
  ];

  const useCases = [
    {
      industry: "Healthcare",
      application: "Patient diagnosis assistance and medical image analysis",
      impact: "40% faster diagnosis"
    },
    {
      industry: "Finance",
      application: "Fraud detection and risk assessment automation",
      impact: "99% accuracy rate"
    },
    {
      industry: "Retail",
      application: "Customer behavior prediction and inventory optimization",
      impact: "30% sales increase"
    },
    {
      industry: "Manufacturing",
      application: "Quality control and predictive maintenance",
      impact: "50% less downtime"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)/0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Intelligent Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              AI & Automation <span className="text-gradient">Tools</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Harness the power of artificial intelligence and automation to transform your business operations.
            </p>
            <Link href="/contact">
              <Button variant="hero" size="lg" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Explore AI Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Solutions */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI <span className="text-gradient">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI tools tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <solution.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Industry <span className="text-gradient">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world AI implementations across sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gradient">{useCase.industry}</h3>
                  <div className="px-3 py-1 bg-accent/10 rounded-full">
                    <span className="text-xs font-bold text-accent">{useCase.impact}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{useCase.application}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">AI?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-glow group">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Brain className="w-16 h-16 text-accent mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Embrace <span className="text-gradient">AI?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how AI can revolutionize your business
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">
              Schedule AI Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AI;
