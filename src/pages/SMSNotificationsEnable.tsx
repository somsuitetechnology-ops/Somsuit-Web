import { FileText, ExternalLink, MessageSquare, CheckCircle, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SMSNotificationsEnable = () => {
  const keyPoints = [
    {
      icon: CheckCircle,
      title: 'Opt-In Only',
      description: 'SMS notifications are completely voluntary. You choose whether to receive order alerts.',
    },
    {
      icon: MessageSquare,
      title: 'Transactional Alerts',
      description: 'Messages are system-generated order notifications only—no marketing or promotional content.',
    },
    {
      icon: Phone,
      title: 'Easy Opt-Out',
      description: 'Disable notifications anytime from ERP settings or by replying STOP to any message.',
    },
    {
      icon: AlertCircle,
      title: 'Standard Rates Apply',
      description: 'Message and data rates may apply based on your mobile carrier plan.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Documentation</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              SMS Notifications for ERP Users
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Enable SMS notifications to receive instant alerts when new customer orders are created in Asuit ERP. 
              Stay informed and respond to orders faster.
            </p>

            <Button
              size="lg"
              className="gap-2"
              onClick={() => window.open('/SMS-Notifications.pdf', '_blank')}
            >
              <FileText className="w-5 h-5" />
              View Full Documentation
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              About SMS Notifications
            </h2>
            
            <Card className="bg-card/50 border-card-border">
              <CardContent className="p-6 md:p-8">
                <p className="text-muted-foreground mb-6">
                  This service sends SMS notifications to registered ERP users (store owners or authorized staff) 
                  when new customer orders are created in the system.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">SMS notifications are opt-in only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Messages are transactional and system-generated (order alerts only)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Users can disable SMS notifications at any time from within the ERP settings or by replying STOP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Message frequency depends on order volume</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Message and data rates may apply</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {keyPoints.map((point, index) => (
                <Card key={index} className="bg-card/50 border-card-border hover:border-accent/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <point.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consent Information */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Consent & Agreement
            </h2>
            
            <Card className="bg-card/50 border-card-border">
              <CardContent className="p-6 md:p-8">
                <p className="text-muted-foreground mb-4">
                  By enabling SMS notifications, you acknowledge that:
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="text-muted-foreground">You are opting in to receive SMS notifications for order alerts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="text-muted-foreground">You can opt out at any time from ERP settings or by replying STOP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="text-muted-foreground">Message and data rates may apply</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="text-muted-foreground">Message frequency depends on order volume</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Download our complete guide to learn how to enable SMS notifications in your Asuit ERP account.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => window.open('/SMS-Notifications.pdf', '_blank')}
              >
                <FileText className="w-5 h-5" />
                Download PDF Guide
                <ExternalLink className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Support
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-8">
              © 2024 Asuit ERP. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SMSNotificationsEnable;
