import { Card } from '@/components/ui/card';
import { Target, Eye, Heart, Zap } from 'lucide-react';

const Mission = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <div className="tech-pattern absolute inset-0" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Mission & <span className="text-accent">Vision</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Guiding principles that drive everything we do
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-foreground-muted text-lg leading-relaxed mb-6">
                To empower businesses through innovative technology solutions that drive growth, enhance efficiency, and create lasting value. We are committed to making enterprise-level IT services accessible to organizations of all sizes.
              </p>
              <p className="text-foreground-muted text-lg leading-relaxed">
                We believe that exceptional technology services should not be a luxury reserved for large corporations. Our mission is to level the playing field by providing professional, reliable, and affordable IT solutions that help businesses thrive in the digital age.
              </p>
            </div>
            
            <Card className="p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <h3 className="text-2xl font-bold mb-6">Core Principles</h3>
              <ul className="space-y-4">
                {[
                  "Deliver exceptional value to every client",
                  "Maintain the highest standards of quality",
                  "Innovate continuously to stay ahead",
                  "Build long-term partnerships based on trust",
                  "Provide transparent and honest communication",
                  "Support our clients' success as our own"
                ].map((principle, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <span className="text-foreground-muted">{principle}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 order-2 lg:order-1">
              <h3 className="text-2xl font-bold mb-6">Future Goals</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Expand Services",
                    desc: "Continuously broaden our service portfolio to meet evolving client needs"
                  },
                  {
                    title: "Regional Leadership",
                    desc: "Become the most trusted IT services provider in our region"
                  },
                  {
                    title: "Innovation Hub",
                    desc: "Establish ourselves as a center for technological innovation"
                  },
                  {
                    title: "Team Growth",
                    desc: "Build the most talented and passionate team in the industry"
                  }
                ].map((goal, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-lg mb-2">{goal.title}</h4>
                    <p className="text-foreground-muted">{goal.desc}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-4xl font-bold">Our Vision</h2>
              </div>
              <p className="text-foreground-muted text-lg leading-relaxed mb-6">
                To be the most trusted and innovative technology solutions provider, recognized for our commitment to excellence, client success, and positive impact on the businesses we serve.
              </p>
              <p className="text-foreground-muted text-lg leading-relaxed">
                We envision a future where every business, regardless of size, has access to world-class technology solutions that enable them to compete effectively, grow sustainably, and achieve their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-accent">Values</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              The foundation of everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Integrity",
                description: "We operate with honesty, transparency, and ethical practices in all our interactions."
              },
              {
                icon: Zap,
                title: "Excellence",
                description: "We strive for the highest quality in every service we deliver and every relationship we build."
              },
              {
                icon: Target,
                title: "Innovation",
                description: "We continuously seek better ways to solve problems and create value for our clients."
              },
              {
                icon: Heart,
                title: "Partnership",
                description: "Your success is our success. We are dedicated to building lasting relationships."
              }
            ].map((value, i) => (
              <Card key={i} className="p-8 text-center hover:border-accent transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-foreground-muted leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
