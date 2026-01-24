import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  FileText, 
  Handshake, 
  Factory, 
  Package, 
  Wallet, 
  BarChart3, 
  Clock, 
  Calculator, 
  CreditCard, 
  Receipt, 
  Database, 
  Users, 
  UserCog,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Smartphone,
  Cloud,
  Lock,
  Star,
  X,
  Play,
  Award,
  Target,
  Rocket
} from 'lucide-react';
// Using images from public folder
const loginPage = '/ERPLogin.png';
const mainDashboard = '/ERP1.png';
const salesDashboard = '/ERP2.png';
const accountingMenu = '/ERP3.png';
const hrmMenu = '/ERP4.png';
const essImage = '/ESS.jpg.jpeg';

const AsuitERP = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const coreModules = [
    {
      icon: ShoppingCart,
      title: 'Purchasing',
      description: 'Complete procurement management with vendor tracking, purchase orders, and automated workflows.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Customer Web Portal',
      description: 'Self-service portal for customers to view orders, invoices, and track deliveries in real-time.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Handshake,
      title: 'CRM & Sales',
      description: 'Powerful customer relationship management with sales pipeline, lead tracking, and opportunity management.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Factory,
      title: 'Manufacturing',
      description: 'End-to-end manufacturing management including BOMs, work orders, and production scheduling.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Package,
      title: 'Distribution',
      description: 'Streamline your distribution with warehouse management, shipping integration, and route optimization.',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Wallet,
      title: 'Finance',
      description: 'Complete financial management with general ledger, budgeting, and financial reporting.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Dashboards',
      description: 'Real-time business intelligence with customizable dashboards and advanced analytics.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Time & Projects',
      description: 'Project management with time tracking, resource allocation, and project accounting.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Calculator,
      title: 'Accounting',
      description: 'Full-featured accounting system with chart of accounts, journal entries, and financial statements.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: CreditCard,
      title: 'POS',
      description: 'Point of sale system with inventory integration, multiple payment methods, and receipt printing.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Receipt,
      title: 'Billing',
      description: 'Automated billing and invoicing with recurring billing, payment tracking, and collections.',
      color: 'from-violet-500 to-violet-600'
    },
    {
      icon: Database,
      title: 'Inventory',
      description: 'Advanced inventory management with multi-location tracking, serial numbers, and lot control.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Users,
      title: 'CRM',
      description: 'Customer relationship management with contact management, activity tracking, and email integration.',
      color: 'from-sky-500 to-sky-600'
    },
    {
      icon: UserCog,
      title: 'HRM',
      description: 'Human resource management with employee records, payroll, attendance, and performance reviews.',
      color: 'from-rose-500 to-rose-600'
    }
  ];

  const keyFeatures = [
    { icon: Package, text: 'Modular & Scalable Architecture', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, text: 'Real-Time Data Synchronization', color: 'from-yellow-500 to-orange-500' },
    { icon: Shield, text: 'Role-Based Access Control', color: 'from-green-500 to-emerald-500' },
    { icon: Globe, text: 'Multi-Currency Support', color: 'from-purple-500 to-pink-500' },
    { icon: BarChart3, text: 'Advanced Reporting & Analytics', color: 'from-indigo-500 to-blue-500' },
    { icon: Smartphone, text: 'Mobile App Access', color: 'from-teal-500 to-cyan-500' },
    { icon: Cloud, text: 'Cloud-Based Infrastructure', color: 'from-sky-500 to-blue-500' },
    { icon: Database, text: 'API Integration Ready', color: 'from-violet-500 to-purple-500' },
    { icon: Rocket, text: 'Automated Workflows', color: 'from-red-500 to-pink-500' },
    { icon: Lock, text: 'Audit Trail & Compliance', color: 'from-rose-500 to-red-500' },
    { icon: Globe, text: 'Multi-Language Support', color: 'from-amber-500 to-yellow-500' },
    { icon: BarChart3, text: 'Customizable Dashboards', color: 'from-emerald-500 to-green-500' }
  ];

  const stats = [
    { number: '14+', label: 'Integrated Modules', icon: Package },
    { number: '99.9%', label: 'Uptime Guarantee', icon: Shield },
    { number: '24/7', label: 'Support Available', icon: Users },
    { number: '100+', label: 'Happy Clients', icon: Star }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Efficiency',
      description: 'Automate repetitive tasks and streamline workflows to save time and reduce errors.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Better Decision Making',
      description: 'Real-time insights and comprehensive reports help you make informed business decisions.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      title: 'Scale Your Business',
      description: 'Grow without limits with a scalable platform that adapts to your business needs.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access control and comprehensive audit trails.',
      color: 'from-red-500 to-rose-500'
    }
  ];

  const screenshots = [
    { image: loginPage, title: 'Secure Login System', description: 'Email/Password and Passcode authentication' },
    { image: mainDashboard, title: 'Main Dashboard', description: 'Real-time business metrics at a glance' },
    { image: salesDashboard, title: 'Sales Dashboard', description: 'Track sales, invoices, and revenue' },
    { image: accountingMenu, title: 'Accounting Module', description: 'Complete financial management tools' },
    { image: hrmMenu, title: 'HRM Module', description: 'Employee and payroll management' },
    { image: essImage, title: 'Employee Self-Service', description: 'ESS portal for employee management and self-service' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-background to-primary/20">
        {/* Advanced Animated Background */}
        <div className="absolute inset-0">
          {/* Dynamic Gradient Mesh */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/20 via-transparent to-accent/10 animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 via-transparent to-accent/15 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(hsl(var(--accent) / 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--accent) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />

          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border-2 border-accent/30 text-accent mb-8 animate-fade-in backdrop-blur-sm shadow-lg">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wider">Enterprise Resource Planning</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in leading-tight">
            <span className="block mb-2 text-white">Somsuite</span>
            <span className="block bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(214,254,92,0.5)]">
              ERP System
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-6 animate-fade-in font-medium">
            The Complete Solution for All Business Needs
          </p>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 animate-fade-in leading-relaxed">
            Integrate sales, accounting, inventory, HR, and reporting into one powerful platform. 
            Streamline operations, boost productivity, and scale your business with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in">
            <Button size="lg" variant="accent" className="text-lg px-8 py-6 group shadow-2xl shadow-accent/30" asChild>
              <a href="https://wa.link/49u948" target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 w-5 h-5" />
                Request a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <Card key={index} className="bg-background/40 backdrop-blur-md border-accent/20 p-6 hover:bg-background/60 hover:border-accent/40 transition-all duration-300 hover:scale-105">
                  <StatIcon className="w-8 h-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.number}</div>
                  <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">Complete Modules</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              All-in-One Business Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              14 powerful modules working seamlessly together to run your entire business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreModules.map((module, index) => (
              <div
                key={module.title}
                className="group relative bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <module.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {module.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:via-accent/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-6">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">User Interface</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Intuitive & Powerful Interface
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience a clean, modern interface designed for productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.map((screenshot, index) => (
              <Card
                key={screenshot.title}
                className="group relative bg-card rounded-xl overflow-hidden border-2 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedImage(screenshot.image)}
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-background-secondary to-background-tertiary">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  
                  {/* Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-card to-card/80">
                  <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">
                    {index + 1} of {screenshots.length}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent transition-colors">
                    {screenshot.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {screenshot.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Image Modal */}
          <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-6xl max-h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl">
              {selectedImage && (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="ERP Screenshot"
                    className="w-full h-auto max-h-[90vh] object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">Why Choose Asuit ERP</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Key Features & Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to run a modern, efficient business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card
                  key={feature.text}
                  className="group relative p-6 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300`} />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <FeatureIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-foreground font-semibold text-base leading-relaxed pt-2">{feature.text}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-background-secondary to-background">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Business Operations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the benefits that make Somsuite ERP the preferred choice for modern businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <Card
                  key={benefit.title}
                  className="group relative p-8 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <BenefitIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/20 border-2 border-accent/40 text-accent mb-8 backdrop-blur-sm shadow-lg">
            <Rocket className="w-5 h-5" />
            <span className="text-sm font-bold tracking-wider">Get Started Today</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-accent to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(214,254,92,0.5)]">
              Business?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of businesses already using Somsuite ERP to streamline operations, 
            increase efficiency, and drive growth. Get a personalized demo today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="accent" className="text-lg px-10 py-7 group shadow-2xl shadow-accent/30" asChild>
              <a href="https://wa.link/49u948" target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 w-5 h-5" />
                Schedule a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsuitERP;
