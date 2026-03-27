"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cmsApi, CmsApiError } from "@/lib/cms-api";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const SERVICE_OPTIONS = [
  "Consulting",
  "DevOps / Hosting",
  "Development",
  "Support",
  "Design",
  "Other",
];

const ServiceRequest = () => {
  const { data: projects = [], isPending: projectsLoading } = useQuery({
    queryKey: ["public", "projects"],
    queryFn: () => cmsApi.listPublicProjects(),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");

  const submitMu = useMutation({
    mutationFn: () =>
      cmsApi.createPublicRequest({
        name: name.trim(),
        service,
        description: description.trim(),
        projectId: projectId.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
      }),
    onSuccess: () => {
      toast.success("Request submitted", {
        description: "We will get back to you soon.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setDescription("");
      setService(SERVICE_OPTIONS[0]);
      setProjectId(projects[0]?.id ?? "");
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Submission failed");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !projectId.trim()) {
      toast.error("Please enter your name and select a project.");
      return;
    }
    submitMu.mutate();
  };

  return (
    <div className="py-20">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Request a <span className="text-accent">Service</span>
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Tell us which product or engagement you are interested in and what
            you need. Your request appears in our team dashboard, same as
            internal entries.
          </p>
          <p className="mt-4 text-sm text-foreground-muted">
            Prefer a general message? Use{" "}
            <Link href="/contact" className="text-accent underline-offset-2 hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Card className="p-8 border-glow bg-card tech-pattern">
          {projectsLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-foreground-muted">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
              Loading projects…
            </div>
          ) : projects.length === 0 ? (
            <p className="text-center text-foreground-muted py-8">
              No projects are published yet. Please use{" "}
              <Link href="/contact" className="text-accent underline-offset-2 hover:underline">
                Contact us
              </Link>{" "}
              or ask your administrator to add portfolio projects.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label>Related project *</Label>
                <Select
                  value={projectId}
                  onValueChange={setProjectId}
                  required
                >
                  <SelectTrigger className="rounded-xl border-input-border">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sr-name">Your name *</Label>
                  <Input
                    id="sr-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    className="rounded-xl border-input-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sr-email">Email</Label>
                  <Input
                    id="sr-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-xl border-input-border focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sr-phone">Phone</Label>
                  <Input
                    id="sr-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Optional"
                    className="rounded-xl border-input-border focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sr-company">Company</Label>
                  <Input
                    id="sr-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Optional"
                    className="rounded-xl border-input-border focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service type *</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="rounded-xl border-input-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sr-desc">Describe your request *</Label>
                <Textarea
                  id="sr-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Goals, timeline, budget, or questions…"
                  rows={6}
                  required
                  className="rounded-xl border-input-border focus:border-accent resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={submitMu.isPending}
                className="w-full"
              >
                {submitMu.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit request <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          )}
        </Card>
      </section>
    </div>
  );
};

export default ServiceRequest;
