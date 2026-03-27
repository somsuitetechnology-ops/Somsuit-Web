"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  ArrowRight,
  Zap,
  Loader2,
} from "lucide-react";
import { cmsApi, type Project } from "@/lib/cms-api";

const FALLBACK_COVER =
  "https://placehold.co/1200x675/1a1f2e/d9ff00?text=Project";

function isUsableProjectLink(url: string): boolean {
  const u = url.trim();
  if (!u || u === "#") return false;
  return (
    u.startsWith("http://") ||
    u.startsWith("https://") ||
    u.startsWith("/")
  );
}

const Projects = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("__all__");

  const { data: categories = [], isError: catError } = useQuery({
    queryKey: ["public", "categories"],
    queryFn: () => cmsApi.listPublicCategories(),
  });

  const {
    data: projects = [],
    isPending,
    isError: projError,
    error,
  } = useQuery({
    queryKey: ["public", "projects"],
    queryFn: () => cmsApi.listPublicProjects(),
  });

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    [categories]
  );

  const filteredProjects = useMemo(() => {
    if (activeCategoryId === "__all__") return projects;
    return projects.filter((p) => p.categoryId === activeCategoryId);
  }, [projects, activeCategoryId]);

  const loadFailed = catError || projError;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-32 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--brand-primary)) 30%, hsl(var(--background)) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(hsl(var(--accent) / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--accent) / 0.2) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
            <span className="text-accent font-semibold text-sm">
              🎨 Showcasing Excellence
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Explore our latest projects and see how we&apos;ve helped
            businesses transform their digital presence and achieve their goals.
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {loadFailed ? (
          <p className="text-center text-sm text-destructive">
            {(error as Error)?.message ??
              "Could not load categories. Check the CMS API and try again."}
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={activeCategoryId === "__all__" ? "accent" : "glass"}
              className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                activeCategoryId === "__all__"
                  ? "shadow-lg shadow-accent/30 scale-105"
                  : "hover:scale-105"
              }`}
              onClick={() => setActiveCategoryId("__all__")}
            >
              All
            </Button>
            {sortedCategories.map((c) => (
              <Button
                key={c.id}
                variant={activeCategoryId === c.id ? "accent" : "glass"}
                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                  activeCategoryId === c.id
                    ? "shadow-lg shadow-accent/30 scale-105"
                    : "hover:scale-105"
                }`}
                onClick={() => setActiveCategoryId(c.id)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        )}
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        {isPending && !loadFailed ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-foreground-muted">
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
            <p>Loading projects…</p>
          </div>
        ) : loadFailed ? null : filteredProjects.length === 0 ? (
          <p className="text-center text-foreground-muted py-16">
            {projects.length === 0
              ? "No projects published yet. Add some from the dashboard."
              : "No projects in this category."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                animationIndex={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

function ProjectCard({
  project,
  animationIndex,
}: {
  project: Project;
  animationIndex: number;
}) {
  const coverSrc =
    project.coverImage?.trim() ||
    project.image?.trim() ||
    FALLBACK_COVER;
  const categoryLabel = project.category?.name ?? "";
  const badgeText =
    project.badge?.trim() || categoryLabel || "Project";
  const footerLabel =
    project.displayType?.trim() || categoryLabel || "";
  const linkOk = isUsableProjectLink(project.projectLink ?? "");
  const tags = project.tags ?? [];

  return (
    <Card
      className="group relative overflow-hidden border-2 border-transparent hover:border-accent/30 bg-gradient-to-br from-card to-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-3"
      style={{ animationDelay: `${animationIndex * 100}ms` }}
    >
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-background-secondary to-background-tertiary">
        <img
          src={coverSrc}
          alt={project.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            {project.iconUrl?.trim() ? (
              <img
                src={project.iconUrl.trim()}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <Zap className="w-6 h-6 text-accent-foreground" />
            )}
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <Badge className="bg-background/80 backdrop-blur-sm text-accent border-accent/20 font-semibold px-3 py-1">
            {badgeText}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
            {project.name}
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, tagIndex) => (
              <Badge
                key={`${project.id}-tag-${tagIndex}`}
                variant="outline"
                className="text-xs bg-accent/5 border-accent/20 text-foreground hover:bg-accent/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-foreground-muted leading-relaxed min-h-[80px]">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          {linkOk ? (
            <Button
              variant="accent"
              size="sm"
              asChild
              className="group/btn shadow-lg shadow-accent/20"
            >
              <a
                href={project.projectLink.trim()}
                target={
                  project.projectLink.trim().startsWith("/")
                    ? undefined
                    : "_blank"
                }
                rel={
                  project.projectLink.trim().startsWith("/")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Site
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </Button>
          ) : (
            <Button variant="glass" size="sm" disabled>
              Demo Project
            </Button>
          )}
          {footerLabel ? (
            <span className="text-sm text-foreground-muted font-medium">
              {footerLabel}
            </span>
          ) : (
            <span className="text-sm text-foreground-muted font-medium">
              &nbsp;
            </span>
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--accent) / 0.1), transparent)",
        }}
      />
    </Card>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Director, SIU Alumni Association",
      content:
        "Somsuite Technology delivered exceptional branding that perfectly captured our vision. The logo and brand identity have helped us build a stronger connection with our alumni network.",
      rating: 5,
    },
    {
      name: "Fatima Ali",
      role: "CEO, Baraarug Consultant",
      content:
        "The team at Somsuite Technology exceeded our expectations. From branding to web development, they provided comprehensive solutions that transformed our business presence.",
      rating: 5,
    },
    {
      name: "Mohamed Omar",
      role: "Founder, Hugodress",
      content:
        "Our e-commerce platform has been a game-changer for our business. The user experience is excellent and the technical implementation is flawless.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-background-secondary to-background py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
            <span className="text-accent font-semibold text-sm">
              💬 Client Testimonials
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-accent">Clients Say</span>
          </h2>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our clients
            have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group p-8 border-2 border-transparent hover:border-accent/30 bg-gradient-to-br from-card to-card/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
            >
              <div className="flex items-center mb-6 gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="text-accent text-2xl transform group-hover:scale-110 transition-transform"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="relative mb-6">
                <div className="absolute -left-2 -top-2 text-6xl text-accent/20 font-serif">
                  &ldquo;
                </div>
                <p className="text-foreground-muted text-lg leading-relaxed relative z-10 pl-6">
                  {testimonial.content}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-foreground-muted">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { number: "50+", label: "Projects Completed", icon: "🚀" },
            { number: "25+", label: "Happy Clients", icon: "😊" },
            { number: "5+", label: "Years Experience", icon: "⭐" },
            { number: "100%", label: "Client Satisfaction", icon: "✨" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-foreground-muted font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--background-secondary)) 0%, hsl(var(--brand-primary)) 50%, hsl(var(--background-secondary)) 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
          <span className="text-accent font-semibold text-sm">
            🤝 Let&apos;s Work Together
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          Ready to Start Your <br />
          <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
            Next Project?
          </span>
        </h2>

        <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
          Let&apos;s create something amazing together. Get in touch to discuss
          your project and see how we can help transform your vision into
          reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            variant="hero"
            size="lg"
            asChild
            className="group shadow-2xl shadow-accent/30"
          >
            <a href="/contact" className="text-lg px-12 py-6">
              Start Your Project
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={24}
              />
            </a>
          </Button>
          <Button variant="glass" size="lg" asChild className="text-lg px-12 py-6">
            <a href="/contact">Contact us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Projects;
