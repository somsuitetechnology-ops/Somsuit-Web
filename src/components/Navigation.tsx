import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import somsuiteLogo from '@/assets/somsuite.png';

const moralTechLogo = somsuiteLogo;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();

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
    { name: 'SCHEDULE TO DISCUSS', href: '/contact' },
    { name: 'BLOG', href: '/blog' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  const aboutDropdown = [
    { name: 'Company Overview', href: '/about/company' },
    { name: 'Mission & Vision', href: '/about/mission' },
    { name: 'Careers', href: '/about/careers' },
  ];

  const servicesDropdown = [
    { name: 'Corporate Networking', href: '/services/networking' },
    { name: 'Cloud Computing', href: '/services/cloud' },
    { name: 'Managed Services', href: '/services/managed' },
    { name: 'IT Security Solutions', href: '/services/security' },
    { name: 'System Integration', href: '/services/integration' },
  ];

  const productsDropdown = [
    { name: 'MoralERP', href: '/products/flowerp' },
    { name: 'Hardware Solutions', href: '/products/hardware' },
    { name: 'Software Licensing', href: '/products/software' },
    { name: 'Custom Applications', href: '/products/custom' },
    { name: 'AI & Automation Tools', href: '/products/ai' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary shadow-lg' : 'bg-primary/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Normal Size */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <img 
              src={moralTechLogo} 
              alt="Moral Technology" 
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-1">
            {mainNavigation.map((item) => {
              if (item.name === 'ABOUT US' && item.hasDropdown) {
                return (
                  <NavigationMenu key={item.name}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-xs font-semibold text-primary-foreground hover:text-accent hover:bg-white/10 data-[state=open]:text-accent data-[state=open]:bg-white/10 px-2.5 whitespace-nowrap">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-card border border-border">
                          <ul className="grid w-[300px] gap-2 p-4">
                            {aboutDropdown.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent focus:bg-muted focus:text-accent"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {subItem.name}
                                    </div>
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
                        <NavigationMenuTrigger className="bg-transparent text-xs font-semibold text-primary-foreground hover:text-accent hover:bg-white/10 data-[state=open]:text-accent data-[state=open]:bg-white/10 px-2.5 whitespace-nowrap">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-card border border-border">
                          <ul className="grid w-[300px] gap-2 p-4">
                            {servicesDropdown.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent focus:bg-muted focus:text-accent"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {subItem.name}
                                    </div>
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
                        <NavigationMenuTrigger className="bg-transparent text-xs font-semibold text-primary-foreground hover:text-accent hover:bg-white/10 data-[state=open]:text-accent data-[state=open]:bg-white/10 px-2.5 whitespace-nowrap">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-card border border-border">
                          <ul className="grid w-[300px] gap-2 p-4">
                            {productsDropdown.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={subItem.href}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent focus:bg-muted focus:text-accent"
                                  >
                                    <div className="text-sm font-medium leading-none">
                                      {subItem.name}
                                    </div>
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
                  to={item.href}
                  className={`px-2.5 py-2 text-xs font-semibold transition-colors relative group whitespace-nowrap ${
                    isActive(item.href)
                      ? 'text-accent'
                      : 'text-primary-foreground hover:text-accent'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : ''
                  }`} />
                </Link>
              );
            })}
            </div>
          </div>

          {/* Desktop Theme Toggle - Fixed Right */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:text-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/20 mt-2">
              {mainNavigation.map((item) => {
                // About Us Dropdown
                if (item.name === 'ABOUT US' && item.hasDropdown) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors"
                      >
                        <span>{item.name}</span>
                        {mobileAboutOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {mobileAboutOpen && (
                        <div className="pl-4 space-y-1 mt-1">
                          {aboutDropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-3 py-2 text-sm transition-colors ${
                                isActive(subItem.href)
                                  ? 'text-accent bg-white/10'
                                  : 'text-primary-foreground/80 hover:text-accent hover:bg-white/5'
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
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors"
                      >
                        <span>{item.name}</span>
                        {mobileServicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {mobileServicesOpen && (
                        <div className="pl-4 space-y-1 mt-1">
                          {servicesDropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-3 py-2 text-sm transition-colors ${
                                isActive(subItem.href)
                                  ? 'text-accent bg-white/10'
                                  : 'text-primary-foreground/80 hover:text-accent hover:bg-white/5'
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
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-primary-foreground hover:text-accent hover:bg-white/5 rounded-md transition-colors"
                      >
                        <span>{item.name}</span>
                        {mobileProductsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {mobileProductsOpen && (
                        <div className="pl-4 space-y-1 mt-1">
                          {productsDropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-3 py-2 text-sm transition-colors ${
                                isActive(subItem.href)
                                  ? 'text-accent bg-white/10'
                                  : 'text-primary-foreground/80 hover:text-accent hover:bg-white/5'
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
                    to={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-accent bg-white/10'
                        : 'text-primary-foreground hover:text-accent hover:bg-white/5'
                    } rounded-md`}
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
    </nav>
  );
};

export default Navigation;
