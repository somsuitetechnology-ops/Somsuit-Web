"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from "next/link";
import { HeroBrandIllustration } from "@/components/HeroBrandIllustration";
import { HeroTechBackground } from "@/components/HeroTechBackground";
import { ArrowRight, Network, Cloud, Shield, Cpu, Wrench, Globe, ExternalLink, Users, BookOpen, ShoppingCart, Heart, Database, FileText, Handshake, Factory, Package, Wallet, BarChart3, Clock, Calculator, CreditCard, Receipt, UserCog, Zap, Target, Award, ShieldCheck } from 'lucide-react';

const baraarugImage = '/lovable-uploads/584c88fd-31cf-4435-990e-889f5cfafa3f.png';
const siuAlumniImage = '/lovable-uploads/0c2a73d8-0b86-428f-ac5d-d74aa65c1d1d.png';
const sonakImage = '/lovable-uploads/bdcc3514-02c7-4745-b2c4-681b44722010.png';
const hugodressImage = '/lovable-uploads/12a4d78a-a084-48aa-80d6-f4d9e1bca47b.png';
const sohaAwardsImage = '/lovable-uploads/ab299ea0-be47-45f4-a3ad-a8e6644ad7db.png';
const somsuiteImage = '/ESS.jpg.jpeg';
const jjFishImage = '/j.jpg.jpeg';

const Home = () => {
  const [erpDialogOpen, setErpDialogOpen] = useState(false);

  const erpModules = [
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

  return (
    <div className="overflow-hidden">
      {/* Hero — two columns: copy + brand vector */}
      <section className="relative min-h-screen overflow-hidden bg-white dark:bg-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[hsl(204_35%_98%)] to-white dark:from-background dark:via-background-secondary dark:to-background" />
          <div
            className="absolute inset-0 opacity-[0.4] dark:opacity-28"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--accent) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--accent) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
              animation: "gridMove 50s linear infinite",
            }}
          />
          <div
            className="absolute -right-32 top-1/4 h-[min(480px,70vw)] w-[min(480px,70vw)] rounded-full bg-accent/12 blur-3xl dark:bg-accent/15"
            aria-hidden
          />
          <div
            className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[hsl(var(--brand-primary)/0.04)] blur-3xl"
            aria-hidden
          />
        </div>

        <div className="relative z-0 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-16">
            {/* Column 1 — messaging */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <div className="mb-5 inline-flex rounded-full border border-accent/35 bg-accent/10 px-4 py-2 shadow-sm shadow-accent/10 backdrop-blur-sm dark:border-accent/40 dark:bg-accent/15 lg:mx-0">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm">
                  Cloud · Network · Security
                </span>
              </div>

              <h1 className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[2.75rem] xl:text-[3.25rem]">
                <span className="block">Grow without</span>
                <span className="mt-1 block bg-gradient-to-r from-accent via-brand-accent to-[hsl(var(--brand-accent-muted))] bg-clip-text text-transparent drop-shadow-[0_0_24px_hsl(var(--brand-accent)/0.28)]">
                  IT friction.
                </span>
              </h1>

              <p className="mx-auto mb-9 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg lg:mx-0 lg:max-w-sm">
                One partner for strategy, build, and support—so your teams move fast and stay secure.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="group w-full border-2 border-accent/40 px-10 py-6 text-base font-bold shadow-xl shadow-accent/25 transition-all hover:scale-[1.02] sm:w-auto sm:px-12 sm:py-7 sm:text-lg"
                >
                  <Link href="/contact">
                    Schedule to Discuss
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-2" size={22} />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full border-2 border-border px-10 py-6 text-base text-foreground backdrop-blur-sm hover:bg-accent/10 hover:text-accent dark:border-white/20 sm:w-auto sm:px-12 sm:py-7 sm:text-lg"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>

            {/* Column 2 — brand vector */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative w-full max-w-[540px] rounded-[2rem] border border-[hsl(var(--brand-accent)/0.22)] bg-gradient-to-br from-white via-[hsl(204_42%_99%)] to-[hsl(204_32%_96%)] p-5 shadow-[0_36px_90px_-28px_hsl(var(--brand-accent)/0.42),0_0_0_1px_rgba(255,255,255,0.8)_inset] ring-1 ring-[hsl(var(--brand-accent)/0.1)] dark:from-[hsl(var(--card)/0.85)] dark:via-background dark:to-background dark:ring-white/10 sm:p-7">
                <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[hsl(var(--brand-accent)/0.2)] via-transparent to-[hsl(var(--brand-accent)/0.08)] opacity-60 dark:opacity-40" />
                <div className="pointer-events-none absolute -left-3 top-10 h-28 w-28 rounded-full border-2 border-dashed border-[hsl(var(--brand-accent)/0.3)] opacity-90 dark:border-accent/35" />
                <div className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 rounded-2xl border-2 border-[hsl(var(--brand-accent)/0.22)] opacity-90" />
                <div className="relative">
                  <HeroBrandIllustration />
                </div>
              </div>
            </div>
          </div>

          {/* Stats — single branded ribbon (Lucide icons only, no emoji) */}
          <div className="mx-auto mt-14 max-w-5xl lg:mt-20">
            <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-accent)/0.18)] bg-white/80 shadow-[0_24px_60px_-28px_hsl(var(--brand-accent)/0.25),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-md dark:border-white/[0.09] dark:bg-[hsl(var(--card)/0.55)] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
              <div
                className="h-1 w-full bg-gradient-to-r from-transparent via-[hsl(var(--brand-accent))] to-transparent opacity-90"
                aria-hidden
              />
              <div className="grid grid-cols-1 gap-px bg-[hsl(var(--brand-accent)/0.14)] sm:grid-cols-2 md:grid-cols-4 dark:bg-white/[0.1]">
                {(
                  [
                    { number: "50+", label: "Projects delivered", Icon: Target },
                    { number: "25+", label: "Happy clients", Icon: Users },
                    { number: "5+", label: "Years experience", Icon: Award },
                    { number: "24/7", label: "Always-on support", Icon: ShieldCheck },
                  ] as const
                ).map(({ number, label, Icon }) => (
                  <div
                    key={label}
                    className="group relative flex items-center gap-4 bg-white px-5 py-6 transition-colors duration-300 hover:bg-[hsl(var(--brand-accent)/0.05)] dark:bg-[hsl(var(--card)/0.85)] dark:hover:bg-[hsl(var(--brand-accent)/0.1)] sm:px-6 sm:py-7 md:flex-col md:items-center md:gap-4 md:px-5 md:py-10 md:text-center"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--brand-accent)/0.22)] bg-[linear-gradient(160deg,hsl(var(--brand-accent)/0.2),hsl(var(--brand-accent)/0.07))] text-[hsl(var(--brand-accent))] shadow-[0_6px_20px_-8px_hsl(var(--brand-accent)/0.45)] ring-2 ring-[hsl(var(--brand-accent)/0.08)] transition-transform duration-300 group-hover:scale-105 dark:border-[hsl(var(--brand-accent)/0.35)] dark:from-[hsl(var(--brand-accent)/0.28)] dark:to-[hsl(var(--brand-accent)/0.1)] dark:ring-[hsl(var(--brand-accent)/0.12)] sm:h-12 sm:w-12 md:mb-1">
                      <Icon className="h-[22px] w-[22px] sm:h-6 sm:w-6" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 md:w-full">
                      <p
                        className="font-display text-[2.35rem] font-bold leading-[0.95] tracking-[-0.04em] tabular-nums sm:text-5xl md:text-6xl lg:text-[3.35rem] xl:text-[3.65rem]"
                        style={{ fontFeatureSettings: '"tnum" 1' }}
                      >
                        <span className="bg-gradient-to-br from-[hsl(var(--brand-accent))] via-[hsl(var(--brand-accent))] to-[hsl(var(--brand-accent-muted))] bg-clip-text text-transparent drop-shadow-[0_2px_24px_hsl(var(--brand-accent)/0.22)]">
                          {number}
                        </span>
                      </p>
                      <p className="mt-2 max-w-[14rem] font-sans text-[10px] font-semibold uppercase leading-tight tracking-[0.2em] text-[hsl(var(--brand-primary)/0.55)] dark:text-zinc-500 md:mx-auto md:mt-3 md:text-[11px] md:tracking-[0.22em]">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                    href={service.link ?? "/services"}
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
              <Link href="/services">
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
                className="bg-accent hover:bg-accent-hover text-primary-foreground font-semibold px-8"
              >
                <Link href="/about">
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
            {/* Somsuite ERP */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-accent/30">
              <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-background to-background-tertiary">
                <img 
                  src={somsuiteImage} 
                  alt="Somsuite ERP System"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
                    ERP System
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Somsuite ERP</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["ERP", "Enterprise", "Business Management", "Cloud"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-accent/5 border-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-foreground-muted leading-relaxed">
                  Comprehensive Enterprise Resource Planning system designed to streamline business operations, manage resources, and provide real-time insights for informed decision-making across all departments.
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => setErpDialogOpen(true)}
                    className="bg-accent hover:bg-accent-hover group/btn"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Explore Modules
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <span className="text-sm text-foreground-muted font-medium">ERP System</span>
                </div>
              </div>
            </Card>

            {/* Jj-fish Account System */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-accent/30">
              <div className="aspect-video relative overflow-hidden bg-white p-4">
                <img 
                  src={jjFishImage} 
                  alt="Jj-fish Account System"
                  className="w-full h-full object-contain object-center transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
                    Accounting System
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">Jj-fish Account System</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {["Accounting", "Financial Management", "Bookkeeping", "Reports"].map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-accent/5 border-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-foreground-muted leading-relaxed">
                  Comprehensive accounting system designed for fish trading businesses, featuring financial tracking, bookkeeping, and detailed reporting capabilities to manage all accounting operations efficiently.
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent-hover group/btn">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <span className="text-sm text-foreground-muted font-medium">Accounting System</span>
                </div>
              </div>
            </Card>

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
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild className="border-accent text-accent hover:bg-accent hover:text-white">
              <Link href="/projects">
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

          {/* Call to Action Box — dark brand shell so text + buttons stay readable */}
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--brand-accent)/0.35)] bg-gradient-to-br from-[hsl(var(--brand-primary))] via-[hsl(204_40%_22%)] to-[hsl(204_48%_32%)] p-8 text-center shadow-[0_28px_80px_-24px_hsl(var(--brand-accent)/0.45)] sm:p-12 md:p-14 animate-fade-in dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.5)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, hsl(var(--brand-accent) / 0.5) 1px, transparent 0),
                  linear-gradient(135deg, transparent 40%, hsl(var(--brand-accent) / 0.06) 40%, hsl(var(--brand-accent) / 0.06) 41%, transparent 41%)
                `,
                backgroundSize: "28px 28px, 18px 18px",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[hsl(var(--brand-accent)/0.2)] blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[hsl(var(--brand-accent)/0.12)] blur-3xl"
              aria-hidden
            />

            <div className="relative z-10">
              <div className="mb-6 inline-flex">
                <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-sm sm:gap-3 sm:px-6 sm:py-3">
                  <Globe className="h-5 w-5 shrink-0 text-[hsl(var(--brand-accent))]" aria-hidden />
                  <span className="text-sm font-bold tracking-wide text-white sm:text-base">
                    Have an idea?
                  </span>
                </div>
              </div>

              <h3 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-4xl md:text-[2.75rem]">
                Let&apos;s build something amazing together
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-200/95 sm:text-lg md:mt-5">
                Whether you have a fully formed concept or just a spark of inspiration, our team is ready to help you turn it into reality. Share your vision with us today.
              </p>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="group h-auto rounded-xl border-0 bg-white px-8 py-6 text-base font-bold text-[hsl(var(--brand-primary))] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] transition-all hover:scale-[1.02] hover:bg-zinc-100 sm:px-10 sm:text-lg"
                >
                  <Link href="/contact">
                    Share your idea
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="h-auto rounded-xl border-2 border-white/45 bg-transparent px-8 py-6 text-base font-bold text-white shadow-none backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white sm:px-10 sm:text-lg"
                >
                  <Link href="/projects">View our work</Link>
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
            className="bg-accent text-primary-foreground hover:bg-accent-hover text-lg px-10 py-6 glow-intense"
          >
            <Link href="/contact">
              Get Started Today <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Somsuite ERP Dialog */}
      <Dialog open={erpDialogOpen} onOpenChange={setErpDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 gap-0 bg-gradient-to-br from-background via-background-secondary to-background">
          <div className="relative overflow-hidden">
            {/* Header with gradient */}
            <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border-b border-accent/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center shadow-lg">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-3xl font-bold text-foreground mb-2">
                    Somsuite ERP System
                  </DialogTitle>
                  <DialogDescription className="text-base text-foreground-muted">
                    Comprehensive Enterprise Resource Planning with {erpModules.length} integrated modules
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Tabs Container */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <Tabs defaultValue={erpModules[0].title.toLowerCase().replace(/\s+/g, '-')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-auto gap-2 p-2 bg-background-secondary/50 backdrop-blur-sm border border-accent/10 mb-6 overflow-x-auto">
                  {erpModules.map((module) => {
                    const ModuleIcon = module.icon;
                    const tabValue = module.title.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <TabsTrigger
                        key={module.title}
                        value={tabValue}
                        className="flex flex-col items-center gap-2 px-4 py-3 h-auto data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:border-accent/50 border border-transparent rounded-lg transition-all hover:bg-accent/10"
                      >
                        <ModuleIcon className="w-5 h-5" />
                        <span className="text-xs font-medium text-center leading-tight">{module.title}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {/* Tab Contents */}
                <div className="space-y-4">
                  {erpModules.map((module) => {
                    const ModuleIcon = module.icon;
                    const tabValue = module.title.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <TabsContent
                        key={module.title}
                        value={tabValue}
                        className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95"
                      >
                        <Card className="border-2 border-accent/20 bg-gradient-to-br from-card to-card/50 overflow-hidden group hover:border-accent/40 transition-all duration-300">
                          <div className="p-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                              {/* Icon Section */}
                              <div className="flex-shrink-0">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                  <ModuleIcon className="w-10 h-10 text-white" />
                                </div>
                              </div>

                              {/* Content Section */}
                              <div className="flex-1 space-y-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                                    {module.title}
                                  </h3>
                                  <p className="text-foreground-muted text-lg leading-relaxed">
                                    {module.description}
                                  </p>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/50">
                                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span>Real-time synchronization</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span>Role-based access control</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span>Advanced reporting</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span>Mobile app access</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </TabsContent>
                    );
                  })}
                </div>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-accent/20 bg-background-secondary/30 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <Zap className="w-4 h-4 text-accent" />
                <span>All modules are fully integrated and cloud-based</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setErpDialogOpen(false)}
                  className="border-accent/30 text-accent hover:bg-accent/10"
                >
                  Close
                </Button>
                <Button
                  variant="default"
                  asChild
                  className="bg-accent hover:bg-accent-hover"
                >
                  <Link href="/products/flowerp" onClick={() => setErpDialogOpen(false)}>
                    View Full Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
