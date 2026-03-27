"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cmsApi, CmsApiError } from "@/lib/cms-api";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await cmsApi.createPublicRequest({
        name: formData.name.trim(),
        service: formData.subject.trim(),
        description: formData.message.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
      });
      toast({
        title: "Message sent",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      const msg =
        err instanceof CmsApiError
          ? err.message
          : "Something went wrong. Please try again or email us directly.";
      toast({
        title: "Could not send",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@somsuite.tech",
      description: "Send us an email anytime!",
      action: "mailto:info@somsuite.tech",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (678) 496-1792",
      description: "Primary business line",
      action: "tel:+16784961792",
    },
    {
      icon: Phone,
      title: "Alternative Line",
      content: "+1 (404) 938-6586",
      description: "Secondary contact number",
      action: "tel:+14049386586",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Atlanta, GA",
      description: "Come say hello at our office",
      action: "#",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Fri: 8AM - 6PM",
      description: "Saturday: 9AM - 2PM",
      action: "#",
    },
  ];

  const services = [
    "Company Branding",
    "Web Design & Development",
    "Software Development",
    "Mobile App Development",
    "IT Consultancy",
  ];

  return (
    <div className="py-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-accent">Touch</span>
          </h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-8">
            Ready to transform your business with cutting-edge technology?
            Let&apos;s discuss your project and bring your vision to life.
          </p>
          <p className="text-sm text-foreground-muted max-w-2xl mx-auto">
            For a request tied to a specific portfolio project, use{" "}
            <Link
              href="/request"
              className="text-accent font-medium underline-offset-2 hover:underline"
            >
              Request a service
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="p-6 border-glow card-hover bg-card text-center pulse-ring"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-accent">
                <info.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">{info.title}</h3>
              <p className="text-accent font-medium mb-1">{info.content}</p>
              <p className="text-sm text-foreground-muted">{info.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="p-8 border-glow bg-card tech-pattern">
              <h2 className="text-2xl font-bold mb-2 circuit-lines">
                Send Us a Message
              </h2>
              <p className="text-sm text-foreground-muted mb-6">
                Submissions are saved in the CMS Requests list. Your server must
                set{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  CMS_GENERAL_INQUIRIES_PROJECT_ID
                </code>{" "}
                to a project UUID (e.g. &quot;General inquiries&quot;) so this
                form can route without picking a product.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="border-input-border focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="border-input-border focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Optional"
                      className="border-input-border focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="border-input-border focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    required
                    className="border-input-border focus:border-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and how we can help..."
                    rows={6}
                    required
                    className="border-input-border focus:border-accent resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="p-6 border-glow bg-card">
              <h3 className="text-xl font-semibold mb-4">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground-muted">{service}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 border-glow bg-card">
              <h3 className="text-xl font-semibold mb-4">Response Time</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <div>
                    <div className="font-medium">Initial Response</div>
                    <div className="text-sm text-foreground-muted">
                      Within 4 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <div>
                    <div className="font-medium">Detailed Proposal</div>
                    <div className="text-sm text-foreground-muted">
                      Within 24 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <div>
                    <div className="font-medium">Project Kickoff</div>
                    <div className="text-sm text-foreground-muted">
                      Within 1 week
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-glow bg-card">
              <h3 className="text-xl font-semibold mb-4">Quick FAQ</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">
                    Do you offer free consultations?
                  </h4>
                  <p className="text-sm text-foreground-muted">
                    Yes, we offer free initial consultations to understand your
                    needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    What&apos;s your typical project timeline?
                  </h4>
                  <p className="text-sm text-foreground-muted">
                    Timelines vary by project scope, typically 2-12 weeks.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">
                    Do you provide ongoing support?
                  </h4>
                  <p className="text-sm text-foreground-muted">
                    Yes, we offer maintenance and support packages.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let&apos;s Build the <span className="text-accent">Future Together</span>
          </h2>
          <p className="text-xl text-foreground-muted mb-8">
            Ready to transform your business with innovative technology
            solutions? Contact us today and let&apos;s start building your
            success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <a href="mailto:info@somsuite.tech">
                <Mail className="mr-2 w-5 h-5" />
                Email Us Directly
              </a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="tel:+16784961792">
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
