import { Button } from '@/components/ui/button';
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
  Zap
} from 'lucide-react';
import loginPage from '@/assets/flowerp-login-page.png';
import mainDashboard from '@/assets/flowerp-main-dashboard.png';
import salesDashboard from '@/assets/flowerp-sales-dashboard.png';
import accountingMenu from '@/assets/flowerp-accounting-menu.png';
import hrmMenu from '@/assets/flowerp-hrm-menu.png';

const AsuitERP = () => {
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
    'Modular & Scalable Architecture',
    'Real-Time Data Synchronization',
    'Role-Based Access Control',
    'Multi-Currency Support',
    'Advanced Reporting & Analytics',
    'Mobile App Access',
    'Cloud-Based Infrastructure',
    'API Integration Ready',
    'Automated Workflows',
    'Audit Trail & Compliance',
    'Multi-Language Support',
    'Customizable Dashboards'
  ];

  const screenshots = [
    { image: loginPage, title: 'Secure Login System', description: 'Email/Password and Passcode authentication' },
    { image: mainDashboard, title: 'Main Dashboard', description: 'Real-time business metrics at a glance' },
    { image: salesDashboard, title: 'Sales Dashboard', description: 'Track sales, invoices, and revenue' },
    { image: accountingMenu, title: 'Accounting Module', description: 'Complete financial management tools' },
    { image: hrmMenu, title: 'HRM Module', description: 'Employee and payroll management' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid-move" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Enterprise Resource Planning</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-glow">Asuit ERP</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            The complete solution for all business needs
          </p>

          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12 animate-fade-in">
            Asuit ERP integrates sales, accounting, inventory, HR, and reporting into one powerful platform. 
            Streamline your operations, boost productivity, and scale your business with confidence.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button size="lg" variant="accent" asChild>
              <a href="https://wa.link/49u948" target="_blank" rel="noopener noreferrer">
                Request a Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.title}
                className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">
                    {screenshot.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {screenshot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <div
                key={feature}
                className="flex items-start gap-3 p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 hover:border-accent/50 hover:bg-card/50 transition-all duration-300"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Get Started Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your{' '}
            <span className="text-glow">Business?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join hundreds of businesses already using Asuit ERP to streamline operations, 
            increase efficiency, and drive growth. Get a personalized demo today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="accent" className="group" asChild>
              <a href="https://wa.link/49u948" target="_blank" rel="noopener noreferrer">
                Schedule a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
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
