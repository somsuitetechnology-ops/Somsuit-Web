import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            IT Security <span className="text-accent">Solutions</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Comprehensive cybersecurity solutions to protect your business from evolving threats. Safeguard your data, systems, and reputation.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link href="/contact">
              Secure Your Business <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Security Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Security <span className="text-accent">Services</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Multi-layered protection for complete peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Network Security",
                description: "Advanced firewalls, intrusion detection systems, and network segmentation to protect your infrastructure from unauthorized access and attacks."
              },
              {
                icon: Lock,
                title: "Endpoint Protection",
                description: "Comprehensive security for all devices including antivirus, anti-malware, and device encryption to prevent data breaches."
              },
              {
                icon: Eye,
                title: "Security Monitoring",
                description: "24/7 threat monitoring and security operations center (SOC) services to detect and respond to security incidents in real-time."
              },
              {
                icon: AlertTriangle,
                title: "Vulnerability Management",
                description: "Regular security assessments, penetration testing, and vulnerability scanning to identify and fix security weaknesses."
              }
            ].map((service, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl group">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Security Solutions */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Email Security",
                description: "Protection against phishing, spam, and email-borne threats with advanced filtering."
              },
              {
                title: "Data Encryption",
                description: "End-to-end encryption for data at rest and in transit to ensure confidentiality."
              },
              {
                title: "Access Management",
                description: "Identity and access management (IAM) with multi-factor authentication."
              },
              {
                title: "Security Training",
                description: "Employee cybersecurity awareness training to reduce human error risks."
              },
              {
                title: "Incident Response",
                description: "Rapid response and recovery procedures for security incidents."
              },
              {
                title: "Compliance Support",
                description: "Help meet regulatory requirements like GDPR, HIPAA, and PCI DSS."
              }
            ].map((solution, i) => (
              <Card key={i} className="p-8 hover:border-accent transition-all hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4">{solution.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{solution.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Approach */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Our Security <span className="text-accent">Approach</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Prevention",
                    desc: "Proactive measures to prevent security breaches before they occur"
                  },
                  {
                    title: "Detection",
                    desc: "Advanced monitoring to identify threats as quickly as possible"
                  },
                  {
                    title: "Response",
                    desc: "Rapid incident response to minimize impact and contain threats"
                  },
                  {
                    title: "Recovery",
                    desc: "Efficient recovery processes to restore normal operations"
                  },
                  {
                    title: "Improvement",
                    desc: "Continuous assessment and improvement of security posture"
                  }
                ].map((approach, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-2">{approach.title}</h4>
                      <p className="text-foreground-muted">{approach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <h3 className="text-2xl font-bold mb-8">Why Security Matters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Protect Your Reputation</h4>
                  <p className="text-foreground-muted">
                    Data breaches damage customer trust and brand reputation. Prevent incidents before they harm your business.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Avoid Financial Loss</h4>
                  <p className="text-foreground-muted">
                    Cyberattacks cost businesses millions in recovery, fines, and lost revenue. Invest in prevention.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Meet Compliance</h4>
                  <p className="text-foreground-muted">
                    Many industries require specific security standards. We help you meet and maintain compliance.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Business Continuity</h4>
                  <p className="text-foreground-muted">
                    Strong security ensures your business can operate without disruption from cyber threats.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Assessment CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get a Free Security Assessment
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Discover your vulnerabilities and get expert recommendations to improve your security posture
          </p>
          <Button 
            variant="default" 
            size="lg" 
            asChild 
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-10"
          >
            <Link href="/contact">
              Request Assessment <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Security;
