
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import somsuiteLogo from '@/assets/somsuite.png';

const moralTechLogo = somsuiteLogo;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img src={moralTechLogo} alt="Somsuite Technology" className="h-12 w-auto mb-4" />
            <p className="text-foreground-muted mb-4 max-w-md">
              Empowering businesses through innovative technology solutions. We specialize in 
              creating digital experiences that drive growth and success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground-muted hover:text-accent transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-foreground-muted hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-foreground-muted hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-foreground-muted hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-foreground-muted hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-foreground-muted hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-foreground-muted hover:text-accent transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="text-foreground-muted hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-accent" />
                <a href="mailto:info@moraltech.io" className="text-foreground-muted hover:text-accent transition-colors">
                  info@moraltech.io
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-accent" />
                <div className="space-y-1">
                  <a href="tel:+16784961792" className="text-foreground-muted hover:text-accent transition-colors block">
                    +1 (678) 496-1792
                  </a>
                  <a href="tel:+14049386586" className="text-foreground-muted hover:text-accent transition-colors block">
                    +1 (404) 938-6586
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-accent" />
                <span className="text-foreground-muted">
                  Atlanta, GA
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8 text-center">
          <p className="text-foreground-muted">
            © {currentYear} Somsuite Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
