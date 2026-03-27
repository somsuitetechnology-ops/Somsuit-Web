"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Building2,
  Target,
  Users,
  Network,
  Cloud,
  Wrench,
  Shield,
  Puzzle,
  Package,
  Cpu,
  FileCode,
  Sparkles,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavigation = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/about', hasDropdown: true },
    { name: 'SERVICES', href: '/services', hasDropdown: true },
    { name: 'PRODUCTS', href: '/products', hasDropdown: true },
    { name: 'PARTNERS', href: '/partners' },
    { name: 'OUR CLIENTS', href: '/clients' },
    { name: 'REQUEST SERVICE', href: '/request' },
    { name: 'BLOG', href: '/blog' },
    { name: "CONTACT US", href: "/contact" },
  ];

  const aboutDropdown: { name: string; href: string; icon: LucideIcon }[] = [
    { name: "Company Overview", href: "/about/company", icon: Building2 },
    { name: "Mission & Vision", href: "/about/mission", icon: Target },
    { name: "Careers", href: "/about/careers", icon: Users },
  ];

  const servicesDropdown: { name: string; href: string; icon: LucideIcon }[] = [
    { name: "Corporate Networking", href: "/services/networking", icon: Network },
    { name: "Cloud Computing", href: "/services/cloud", icon: Cloud },
    { name: "Managed Services", href: "/services/managed", icon: Wrench },
    { name: "IT Security Solutions", href: "/services/security", icon: Shield },
    { name: "System Integration", href: "/services/integration", icon: Puzzle },
  ];

  const productsDropdown: { name: string; href: string; icon: LucideIcon }[] = [
    { name: "Asuit ERP", href: "/products/flowerp", icon: Cpu },
    { name: "Hardware Solutions", href: "/products/hardware", icon: Package },
    { name: "Software Licensing", href: "/products/software", icon: FileCode },
    { name: "Custom Applications", href: "/products/custom", icon: Puzzle },
    { name: "AI & Automation Tools", href: "/products/ai", icon: Sparkles },
  ];

  const isAboutSection = pathname.startsWith("/about");
  const isServicesSection = pathname.startsWith("/services");
  const isProductsSection = pathname.startsWith("/products");

  const dropdownTriggerClass = (sectionActive: boolean) =>
    cn(
      "group/tr relative h-auto min-h-0 rounded-full border border-transparent bg-transparent px-2.5 py-2 text-[9px] font-bold uppercase tracking-[0.14em] shadow-none transition-all duration-300 sm:px-3 sm:text-[10px]",
      "text-foreground/70 hover:border-[hsl(var(--brand-accent)/0.22)] hover:bg-[hsl(var(--brand-accent)/0.08)] hover:text-[hsl(var(--brand-accent))] hover:shadow-[0_6px_24px_-10px_hsl(var(--brand-accent)/0.35)]",
      "data-[state=open]:z-10 data-[state=open]:border-[hsl(var(--brand-accent)/0.35)] data-[state=open]:bg-[hsl(var(--brand-accent)/0.14)] data-[state=open]:text-[hsl(var(--brand-accent))] data-[state=open]:shadow-[0_12px_36px_-12px_hsl(var(--brand-accent)/0.45)]",
      sectionActive &&
        "border-[hsl(var(--brand-accent)/0.28)] bg-[hsl(var(--brand-accent)/0.1)] text-[hsl(var(--brand-accent))] shadow-[inset_0_0_0_1px_hsl(var(--brand-accent)/0.12)]"
    );

  const dropdownShell =
    "overflow-hidden rounded-2xl border border-[hsl(var(--brand-accent)/0.18)] bg-white/98 shadow-[0_32px_64px_-20px_hsl(var(--brand-accent)/0.35),0_0_0_1px_rgba(255,255,255,0.9)_inset,0_0_80px_-24px_hsl(var(--brand-accent)/0.15)] backdrop-blur-xl dark:border-white/10 dark:bg-[hsl(var(--card))] dark:shadow-[0_32px_64px_-20px_rgba(0,0,0,0.55)]";

  const dropdownLinkClass =
    "group/d flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 hover:bg-[hsl(var(--brand-accent)/0.09)] hover:shadow-[inset_3px_0_0_0_hsl(var(--brand-accent))] focus:bg-[hsl(var(--brand-accent)/0.09)] focus:outline-none active:scale-[0.99]";

  const DropdownHeader = ({ label }: { label: string }) => (
    <div className="border-b border-[hsl(var(--brand-accent)/0.12)] bg-gradient-to-r from-[hsl(var(--brand-accent)/0.12)] via-[hsl(var(--brand-accent)/0.06)] to-transparent px-4 py-2.5 dark:from-[hsl(var(--brand-accent)/0.2)] dark:via-transparent">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--brand-accent))] dark:text-accent">
        {label}
      </p>
    </div>
  );

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 z-[100] w-full isolate">
      {/* Top brand gradient strip — iconic blue accent */}
      <div
        className="pointer-events-none h-[3px] w-full bg-gradient-to-r from-[hsl(204_48%_38%)] via-[hsl(204_55%_58%)] to-[hsl(204_50%_42%)] shadow-[0_3px_20px_hsl(var(--brand-accent)/0.5)]"
        aria-hidden
      />

      {/* Top bar — contact & trust signals */}
      <div className="relative overflow-hidden border-b border-[hsl(var(--brand-accent)/0.4)] bg-[hsl(var(--brand-primary))] text-white shadow-[inset_0_-1px_0_0_rgba(65,145,195,0.2)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,hsl(var(--brand-accent)/0.18),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 text-[11px] font-medium leading-tight sm:px-6 sm:text-xs lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:gap-x-6">
            <span className="hidden items-center gap-2 text-[hsl(var(--brand-accent))] sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--brand-accent))] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--brand-accent))] shadow-[0_0_12px_hsl(var(--brand-accent))]" />
              </span>
              <span className="font-semibold uppercase tracking-[0.22em] text-white/95">
                Somsuite
              </span>
              <span className="text-white/35">|</span>
              <span className="font-medium text-white/65">Enterprise IT &amp; Cloud</span>
            </span>
            <a
              href="tel:+16784961792"
              className="inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-white/95 transition-colors hover:bg-white/[0.06] hover:text-[hsl(var(--brand-accent))]"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--brand-accent))]" aria-hidden />
              <span className="hidden sm:inline">+1 (678) 496-1792</span>
              <span className="sm:hidden">Call us</span>
            </a>
            <a
              href="mailto:info@somsuite.tech"
              className="inline-flex items-center gap-1.5 rounded-full px-1.5 py-0.5 text-white/95 transition-colors hover:bg-white/[0.06] hover:text-[hsl(var(--brand-accent))]"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--brand-accent))]" aria-hidden />
              <span className="max-w-[200px] truncate sm:max-w-none">info@somsuite.tech</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 sm:gap-x-5">
            <span className="hidden items-center gap-1.5 text-white/70 md:inline-flex">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--brand-accent))]" aria-hidden />
              Atlanta, GA
            </span>
            <span className="hidden items-center gap-1.5 text-white/70 lg:inline-flex">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--brand-accent))]" aria-hidden />
              Mon–Sat · 9:00–18:00 EST
            </span>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-white/95 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.35)] transition hover:border-[hsl(var(--brand-accent)/0.55)] hover:bg-[hsl(var(--brand-accent)/0.18)] hover:text-white hover:shadow-[0_8px_28px_-8px_hsl(var(--brand-accent)/0.35)]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5 text-[hsl(var(--brand-accent))]" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "overflow-visible border-b border-[hsl(var(--brand-accent)/0.1)] bg-gradient-to-b from-[hsl(204_42%_98%)] from-0% via-white to-[hsl(204_35%_99%)] backdrop-blur-xl transition-all duration-500 dark:border-white/[0.07] dark:from-[hsl(210_35%_11%)] dark:via-[hsl(var(--card))] dark:to-[hsl(var(--card))]",
          scrolled
            ? "shadow-[0_16px_48px_-12px_hsl(var(--brand-accent)/0.22),0_8px_24px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45)]"
            : "shadow-[0_1px_0_hsl(var(--brand-accent)/0.06)]"
        )}
      >
      <div className="mx-auto max-w-7xl overflow-visible px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.75rem] items-center justify-between gap-4 overflow-visible">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-shrink-0 items-center rounded-xl p-1 -m-1 transition-all duration-300 hover:bg-[hsl(var(--brand-accent)/0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-accent)/0.35)]"
          >
            <BrandLogo
              width={200}
              height={64}
              className="h-[3.25rem] w-auto max-w-[min(200px,42vw)] object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop — iconic floating nav rail */}
          <div className="hidden min-w-0 flex-1 justify-center lg:flex">
            <div
              className={cn(
                // overflow-x-auto clips Radix dropdowns (overflow-y becomes non-visible); keep visible
                "inline-flex max-w-full flex-wrap items-center justify-center gap-0.5 overflow-visible rounded-full border border-[hsl(var(--brand-accent)/0.14)] bg-white/85 px-1 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_10px_40px_-16px_hsl(var(--brand-accent)/0.3),0_0_0_1px_rgba(255,255,255,0.6)]",
                "backdrop-blur-2xl dark:border-white/[0.08] dark:bg-zinc-950/55 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_12px_48px_-16px_rgba(0,0,0,0.5)]"
              )}
            >
            {mainNavigation.map((item) => {
              if (item.name === 'ABOUT US' && item.hasDropdown) {
                return (
                  <NavigationMenu key={item.name}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={dropdownTriggerClass(isAboutSection)}>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className={dropdownShell}>
                          <DropdownHeader label="About Somsuite" />
                          <ul className="grid w-[min(100vw-2rem,320px)] gap-0.5 p-2">
                            {aboutDropdown.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className={dropdownLinkClass}
                                  >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-accent)/0.1)] text-[hsl(var(--brand-accent))] transition-colors group-hover/d:bg-[hsl(var(--brand-accent)/0.18)] dark:bg-accent/15">
                                      <subItem.icon className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm font-semibold text-foreground group-hover/d:text-accent">
                                        {subItem.name}
                                      </span>
                                    </span>
                                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/d:translate-x-0.5 group-hover/d:opacity-100 group-hover/d:text-accent" />
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              }
              
              if (item.name === 'SERVICES' && item.hasDropdown) {
                return (
                  <NavigationMenu key={item.name}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={dropdownTriggerClass(isServicesSection)}>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className={dropdownShell}>
                          <DropdownHeader label="Our Services" />
                          <ul className="grid w-[min(100vw-2rem,320px)] gap-0.5 p-2">
                            {servicesDropdown.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link href={subItem.href} className={dropdownLinkClass}>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-accent)/0.1)] text-[hsl(var(--brand-accent))] transition-colors group-hover/d:bg-[hsl(var(--brand-accent)/0.18)] dark:bg-accent/15">
                                      <subItem.icon className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm font-semibold text-foreground group-hover/d:text-accent">
                                        {subItem.name}
                                      </span>
                                    </span>
                                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/d:translate-x-0.5 group-hover/d:opacity-100 group-hover/d:text-accent" />
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              }

              if (item.name === 'PRODUCTS' && item.hasDropdown) {
                return (
                  <NavigationMenu key={item.name}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={dropdownTriggerClass(isProductsSection)}>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className={dropdownShell}>
                          <DropdownHeader label="Products" />
                          <ul className="grid w-[min(100vw-2rem,320px)] gap-0.5 p-2">
                            {productsDropdown.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link href={subItem.href} className={dropdownLinkClass}>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--brand-accent)/0.1)] text-[hsl(var(--brand-accent))] transition-colors group-hover/d:bg-[hsl(var(--brand-accent)/0.18)] dark:bg-accent/15">
                                      <subItem.icon className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-sm font-semibold text-foreground group-hover/d:text-accent">
                                        {subItem.name}
                                      </span>
                                    </span>
                                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/d:translate-x-0.5 group-hover/d:opacity-100 group-hover/d:text-accent" />
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group/rl relative whitespace-nowrap rounded-full px-2.5 py-2 text-[9px] font-bold uppercase tracking-[0.12em] transition-all duration-300 sm:px-3 sm:text-[10px]",
                    isActive(item.href)
                      ? "bg-[hsl(var(--brand-accent)/0.14)] text-[hsl(var(--brand-accent))] shadow-[inset_0_0_0_1px_hsl(var(--brand-accent)/0.22),0_6px_20px_-14px_hsl(var(--brand-accent)/0.45)]"
                      : "text-foreground/70 hover:bg-[hsl(var(--brand-accent)/0.08)] hover:text-[hsl(var(--brand-accent))]"
                  )}
                >
                  {item.name}
                  {!isActive(item.href) && (
                    <span className="pointer-events-none absolute inset-x-2 bottom-1 h-px scale-x-0 rounded-full bg-gradient-to-r from-transparent via-[hsl(var(--brand-accent))] to-transparent opacity-0 transition-all duration-300 group-hover/rl:scale-x-100 group-hover/rl:opacity-100" />
                  )}
                </Link>
              );
            })}
            </div>
          </div>

          {/* Desktop — theme control */}
          <div className="hidden shrink-0 items-center lg:flex">
            <div
              className={cn(
                "rounded-full border border-[hsl(var(--brand-accent)/0.14)] bg-white/85 p-0.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_8px_28px_-12px_hsl(var(--brand-accent)/0.22)] backdrop-blur-xl",
                "dark:border-white/[0.08] dark:bg-zinc-950/55"
              )}
            >
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="mt-3 space-y-1 rounded-2xl border border-[hsl(var(--brand-accent)/0.16)] bg-white/95 px-2 pb-4 pt-3 shadow-[0_20px_50px_-16px_hsl(var(--brand-accent)/0.28),inset_0_1px_0_0_rgba(255,255,255,0.9)] backdrop-blur-xl dark:border-white/10 dark:bg-[hsl(var(--card))]/95 dark:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.45)]">
              {mainNavigation.map((item) => {
                // About Us Dropdown
                if (item.name === 'ABOUT US' && item.hasDropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        <span>{item.name}</span>
                        {mobileAboutOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {mobileAboutOpen && (
                        <div className="pl-4 space-y-1 mt-1">
                          {aboutDropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-3 py-2 text-sm transition-colors ${
                                isActive(subItem.href)
                                  ? "bg-accent/15 text-accent"
                                  : "text-foreground/90 hover:bg-accent/10 hover:text-accent"
                              } rounded-md`}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileAboutOpen(false);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Services Dropdown
                if (item.name === 'SERVICES' && item.hasDropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        <span>{item.name}</span>
                        {mobileServicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-4 space-y-1 mt-1">
                          {servicesDropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-3 py-2 text-sm transition-colors ${
                                isActive(subItem.href)
                                  ? "bg-accent/15 text-accent"
                                  : "text-foreground/90 hover:bg-accent/10 hover:text-accent"
                              } rounded-md`}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileServicesOpen(false);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Products Dropdown
                if (item.name === 'PRODUCTS' && item.hasDropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        <span>{item.name}</span>
                        {mobileProductsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {mobileProductsOpen && (
                        <div className="pl-4 space-y-1 mt-1">
                          {productsDropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-3 py-2 text-sm transition-colors ${
                                isActive(subItem.href)
                                  ? "bg-accent/15 text-accent"
                                  : "text-foreground/90 hover:bg-accent/10 hover:text-accent"
                              } rounded-md`}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileProductsOpen(false);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular menu items
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-accent/15 text-accent"
                        : "text-foreground hover:bg-accent/10 hover:text-accent"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navigation;
