"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  Layers3,
  ListTodo,
  LogOut,
  ScrollText,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";
import { clearCmsSession, getCmsUser } from "@/lib/cms-api";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/categories", label: "Categories", icon: Tags },
  { href: "/dashboard/projects", label: "Projects", icon: Layers3 },
  { href: "/dashboard/services", label: "Services", icon: Briefcase },
  { href: "/dashboard/requests", label: "Requests", icon: ListTodo },
  { href: "/dashboard/customers", label: "Customers", icon: Building2 },
  { href: "/dashboard/employees", label: "Employees", icon: Users },
  { href: "/dashboard/digital-contracts", label: "Contracts", icon: ScrollText },
  { href: "/dashboard/salaries", label: "Salaries", icon: CircleDollarSign },
  { href: "/dashboard/quotations", label: "Quotations", icon: FileText },
] as const;

function sessionInitials(u: { name: string; email: string }): string {
  const parts = u.name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  if (u.name.length >= 2) return u.name.slice(0, 2).toUpperCase();
  if (u.email.length >= 2) return u.email.slice(0, 2).toUpperCase();
  return "U";
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const cmsUser = getCmsUser();

  const handleLogout = () => {
    clearCmsSession();
    router.push("/dashboard/login");
  };

  return (
    <aside
      className={cn(
        "relative flex w-[280px] shrink-0 flex-col overflow-hidden",
        "border-r border-border bg-white text-foreground",
        "shadow-[4px_0_32px_-12px_hsl(var(--brand-accent)/0.1)]",
        "dark:border-white/[0.08] dark:bg-[hsl(var(--background))] dark:text-zinc-100",
        "dark:shadow-[8px_0_40px_-16px_rgba(0,0,0,0.65)]"
      )}
    >
      {/* Ambient depth — light: soft blue mist; dark: original */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[hsl(204_42%_98%)] via-white to-[hsl(204_30%_99%)] dark:bg-[linear-gradient(180deg,hsl(var(--brand-accent)/0.06)_0%,transparent_42%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-[18%] h-72 w-72 rounded-full bg-[hsl(var(--brand-accent)/0.14)] blur-[80px] dark:bg-[hsl(var(--brand-accent)/0.07)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-black/40 to-transparent dark:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-border/60 to-transparent dark:via-white/[0.06]"
        aria-hidden
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Brand */}
        <div className="shrink-0 px-4 pb-3 pt-5">
          <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--brand-accent)/0.35)] to-transparent" />
          <div className="flex items-start justify-between gap-3">
            <Link
              href="/"
              className="group flex min-w-0 flex-1 flex-col gap-2 rounded-xl p-2 -m-2 transition-all duration-300 hover:bg-accent/5 dark:hover:bg-white/[0.04]"
            >
              <div className="relative overflow-hidden rounded-lg border border-border bg-white px-3 py-2.5 shadow-sm backdrop-blur-md transition-[border-color,box-shadow] duration-300 group-hover:border-[hsl(var(--brand-accent)/0.35)] group-hover:shadow-[0_8px_28px_-12px_hsl(var(--brand-accent)/0.22)] dark:border-white/[0.06] dark:bg-white/[0.03] dark:shadow-none">
                <BrandLogo
                  width={180}
                  height={56}
                  className="h-9 w-auto max-w-[180px] object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <span
              className={cn(
                "mt-1 shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
                "border-[hsl(var(--brand-accent)/0.45)] bg-[hsl(var(--brand-accent)/0.08)]",
                "text-[hsl(var(--brand-accent))] shadow-[0_0_20px_-8px_hsl(var(--brand-accent)/0.4)]"
              )}
            >
              CMS
            </span>
          </div>
          <p className="mt-3 pl-1 text-[11px] leading-snug text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-foreground/80 dark:text-zinc-300">
              <Sparkles
                className="h-3 w-3 text-[hsl(var(--brand-accent))]"
                strokeWidth={1.75}
              />
              Content workspace
            </span>
          </p>
        </div>

        <p className="shrink-0 px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground dark:text-zinc-400">
          Navigation
        </p>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 pb-2">
          {nav.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl py-3 pl-4 pr-3",
                  "text-[13px] font-medium tracking-wide transition-all duration-300 ease-out",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-accent)/0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-[hsl(var(--background))]",
                  active
                    ? cn(
                        "bg-[hsl(var(--brand-accent)/0.12)] text-[hsl(var(--brand-accent))] shadow-[inset_0_0_0_1px_hsl(var(--brand-accent)/0.22),0_8px_28px_-14px_hsl(var(--brand-accent)/0.2)]",
                        "dark:bg-white/[0.07] dark:backdrop-blur-md dark:shadow-[inset_0_0_0_1px_hsl(var(--brand-accent)/0.22),0_8px_32px_-12px_hsl(var(--brand-accent)/0.25)]"
                      )
                    : cn(
                        "text-muted-foreground hover:bg-accent/10 hover:text-accent dark:text-zinc-200/95 dark:hover:bg-white/[0.06] dark:hover:text-white",
                        "hover:translate-x-0.5 hover:shadow-sm"
                      )
                )}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 rounded-full bg-[hsl(var(--brand-accent))] shadow-[0_0_14px_hsl(var(--brand-accent)/0.9)]"
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                    active
                      ? "border-[hsl(var(--brand-accent)/0.35)] bg-[hsl(var(--brand-accent)/0.12)] text-[hsl(var(--brand-accent))]"
                      : "border-border bg-muted/60 text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-300 group-hover:border-[hsl(var(--brand-accent)/0.22)] group-hover:bg-[hsl(var(--brand-accent)/0.08)] group-hover:text-[hsl(var(--brand-accent))]"
                  )}
                >
                  <Icon
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-105"
                    strokeWidth={1.75}
                  />
                </span>
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {active && (
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--brand-accent))] shadow-[0_0_8px_hsl(var(--brand-accent))]"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="shrink-0 space-y-3 border-t border-border bg-muted/30 p-4 backdrop-blur-md dark:border-white/[0.08] dark:bg-black/25">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-sm dark:border-white/[0.06] dark:bg-white/[0.03] dark:shadow-none">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold",
                "bg-gradient-to-br from-[hsl(var(--brand-accent))] to-[hsl(var(--brand-accent-muted))]",
                "text-white shadow-[0_4px_16px_-4px_hsl(var(--brand-accent)/0.5)] dark:text-[hsl(var(--brand-primary))]"
              )}
            >
              {cmsUser ? sessionInitials(cmsUser) : "ST"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-foreground dark:text-zinc-100">
                {cmsUser?.name ?? "Somsuite CMS"}
              </p>
              <p className="truncate text-[10px] text-muted-foreground dark:text-zinc-400">
                {cmsUser
                  ? cmsUser.email
                  : "API open — set CMS_JWT_SECRET to require login"}
              </p>
            </div>
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--brand-accent))] shadow-[0_0_10px_hsl(var(--brand-accent))]"
              title="Session"
              aria-hidden
            />
          </div>

          {cmsUser && (
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-10 w-full justify-start gap-2 rounded-xl border-border bg-background text-foreground",
                "backdrop-blur-sm transition-all duration-300 hover:border-red-500/35 hover:bg-red-500/10 hover:text-red-600",
                "dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:text-red-300"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 opacity-80" strokeWidth={1.75} />
              Sign out
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-10 w-full justify-start gap-2 rounded-xl border-border bg-background text-foreground",
              "backdrop-blur-sm transition-all duration-300 hover:border-[hsl(var(--brand-accent)/0.35)] hover:bg-[hsl(var(--brand-accent)/0.08)] hover:text-accent",
              "dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-zinc-300"
            )}
            asChild
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 opacity-80" strokeWidth={1.75} />
              Back to site
            </Link>
          </Button>

          <div
            className={cn(
              "flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.02]",
              "[&_button]:text-foreground [&_button:hover]:bg-accent/10 [&_button:hover]:text-accent dark:[&_button]:text-zinc-300 dark:[&_button:hover]:bg-white/10"
            )}
          >
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-500">
              Theme
            </span>
            <div className="scale-90">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
