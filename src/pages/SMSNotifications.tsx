import { FileText, ExternalLink, MessageSquare, Bell, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SMSNotifications = () => {
  const features = [
    {
      icon: Bell,
      title: 'Real-Time Alerts',
      description: 'Receive instant SMS notifications when new customer orders are placed in your Asuit ERP system.',
    },
    {
      icon: Settings,
      title: 'Easy Configuration',
      description: 'Update your phone number or notification preferences at any time through your account settings.',
    },
    {
      icon: Shield,
      title: 'Privacy Control',
      description: 'Opt out anytime by replying STOP to any message or through your notification settings.',
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
              SMS Notification Management
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Learn how to enable, disable, or update your SMS notifications for Asuit ERP. 
              Stay informed about new orders and important updates directly on your mobile device.
            </p>

            <Button
              size="lg"
              className="gap-2"
              onClick={() => window.open('/Manage-SMS-Notifications.pdf', '_blank')}
            >
              <FileText className="w-5 h-5" />
              View Full Documentation
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              SMS Notification Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card/50 border-card-border hover:border-accent/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How to Manage Your SMS Notifications
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Enable Notifications</h3>
                  <p className="text-muted-foreground text-sm">
                    Navigate to your Asuit ERP settings and enter your phone number to start receiving SMS alerts for new orders.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Update Your Phone Number</h3>
                  <p className="text-muted-foreground text-sm">
                    Change your registered phone number at any time through the notification settings page in your account.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Disable Notifications</h3>
                  <p className="text-muted-foreground text-sm">
                    Opt out by clicking "Disable SMS Notifications" in your settings, or simply reply STOP to any SMS message you receive.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Re-enable Anytime</h3>
                  <p className="text-muted-foreground text-sm">
                    Changed your mind? Re-enable SMS notifications by visiting the settings page or through your ERP dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need More Information?
            </h2>
            <p className="text-muted-foreground mb-8">
              Download our complete SMS notification management guide for detailed instructions and FAQs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => window.open('/Manage-SMS-Notifications.pdf', '_blank')}
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
              By enabling SMS notifications, you agree to receive text messages from Asuit ERP. 
              Message and data rates may apply. Reply STOP to opt out at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SMSNotifications;
