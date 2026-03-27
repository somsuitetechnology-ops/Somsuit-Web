"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardAuthGate } from "@/components/dashboard/DashboardAuthGate";
import { DashboardProfileMenu } from "@/components/dashboard/DashboardProfileMenu";

function dashboardPageTitle(pathname: string): string {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "Dashboard";
  const m = pathname.match(/\/dashboard\/([^/]+)/);
  if (!m) return "Dashboard";
  const slug = m[1];
  if (slug === "login") return "Sign in";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/dashboard/login";

  if (isLogin) {
    return <>{children}</>;
  }

  const pageTitle = dashboardPageTitle(pathname ?? "");

  return (
    <DashboardAuthGate>
      <div
        data-somsuite-dashboard
        className="flex min-h-screen bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--background-secondary))_50%,hsl(var(--background))_100%)] dark:bg-[hsl(var(--background))]"
      >
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header
            className={cn(
              "flex h-14 shrink-0 items-center justify-between gap-4 border-b px-4 sm:px-6",
              "border-[hsl(var(--brand-accent)/0.18)] bg-white/95 backdrop-blur-md",
              "shadow-[0_1px_0_0_hsl(var(--brand-accent)/0.08),0_8px_30px_-12px_hsl(var(--brand-accent)/0.06)]",
              "dark:border-white/[0.06] dark:bg-[hsl(var(--background))] dark:shadow-none"
            )}
          >
            <div className="min-w-0">
              {pageTitle !== "Dashboard" && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground dark:text-zinc-500">
                  Dashboard
                </p>
              )}
              <h1 className="truncate text-lg font-semibold tracking-tight text-foreground dark:text-zinc-100">
                {pageTitle}
              </h1>
            </div>
            <DashboardProfileMenu />
          </header>
          <main
            className={cn(
              "flex-1 overflow-auto p-6 md:p-8",
              "bg-[linear-gradient(180deg,hsl(var(--background-secondary))_0%,hsl(var(--background-tertiary))_50%,hsl(var(--background-secondary))_100%)]",
              "dark:bg-[hsl(var(--background))] dark:text-zinc-100"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </DashboardAuthGate>
  );
}
