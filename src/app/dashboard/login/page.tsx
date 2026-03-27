"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import {
  cmsLogin,
  fetchCmsAuthStatus,
  getCmsToken,
  setCmsSession,
  CmsApiError,
} from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";

export default function DashboardLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const enabled = await fetchCmsAuthStatus();
        if (cancelled) return;
        if (!enabled) {
          router.replace("/dashboard");
          return;
        }
        if (getCmsToken()) {
          router.replace("/dashboard");
          return;
        }
      } catch {
        if (!cancelled) toast.error("Could not reach CMS API");
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Enter email and password");
      return;
    }
    setBusy(true);
    try {
      const res = await cmsLogin(email.trim(), password);
      setCmsSession(res.token, res.user);
      toast.success("Signed in");
      router.replace("/dashboard");
    } catch (err) {
      if (err instanceof CmsApiError && err.status === 404) {
        toast.error(
          "CMS API not found (404). Is the Go server running? Restart `npm run dev` after .env changes, or set NEXT_PUBLIC_CMS_API_URL to your API (e.g. http://127.0.0.1:8081)."
        );
        return;
      }
      if (err instanceof CmsApiError && err.status === 503) {
        toast.error(
          "CMS login is off on the server. Set CMS_JWT_SECRET (and bootstrap user) in backend .env."
        );
        return;
      }
      toast.error(
        err instanceof CmsApiError ? err.message : "Sign-in failed"
      );
    } finally {
      setBusy(false);
    }
  };

  if (checking) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background dark:bg-[hsl(var(--background))]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--brand-accent)/0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--brand-accent)/0.15),transparent)]"
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-2 border-[hsl(var(--brand-accent)/0.3)] border-t-[hsl(var(--brand-accent))]" />
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            Preparing workspace…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground dark:bg-[hsl(222_47%_5%)] dark:text-zinc-100">
      {/* Ambient layers */}
      <div className="pointer-events-none fixed inset-0" aria-hidden>
        <div className="absolute -left-[20%] -top-[10%] h-[min(720px,90vw)] w-[min(720px,90vw)] rounded-full bg-[hsl(var(--brand-accent)/0.09)] blur-[100px]" />
        <div className="absolute -right-[15%] top-[20%] h-[min(560px,70vw)] w-[min(560px,70vw)] rounded-full bg-[hsl(215_70%_35%/0.2)] blur-[90px]" />
        <div className="absolute bottom-[-20%] left-1/2 h-[min(480px,60vw)] w-[min(480px,60vw)] -translate-x-1/2 rounded-full bg-[hsl(var(--brand-accent)/0.05)] blur-[100px]" />
        <div
          className={cn(
            "absolute inset-0 opacity-[0.35]",
            "bg-[linear-gradient(hsl(0_0%_100%/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.04)_1px,transparent_1px)]",
            "bg-[length:56px_56px]",
            "[mask-image:radial-gradient(ellipse_75%_65%_at_50%_42%,black_15%,transparent_68%)]"
          )}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
        {/* Top badge */}
        <div
          className={cn(
            "mb-8 flex items-center gap-2 rounded-full border border-[hsl(var(--brand-accent)/0.25)]",
            "bg-[hsl(var(--brand-accent)/0.06)] px-4 py-1.5 backdrop-blur-md",
            "shadow-[0_0_32px_-12px_hsl(var(--brand-accent)/0.35)]"
          )}
        >
          <Sparkles
            className="h-3.5 w-3.5 text-[hsl(var(--brand-accent))]"
            strokeWidth={2}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground dark:text-zinc-400">
            Secure workspace
          </span>
        </div>

        {/* Glass card */}
        <div
          className={cn(
            "w-full max-w-[420px] rounded-3xl border border-border p-px shadow-xl shadow-[hsl(var(--brand-accent)/0.08)]",
            "bg-gradient-to-b from-white to-[hsl(204_35%_99%)] dark:border-white/[0.08]",
            "dark:bg-gradient-to-b dark:from-white/[0.12] dark:to-white/[0.02]",
            "dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset,0_0_60px_-20px_hsl(var(--brand-accent)/0.12)]"
          )}
        >
          <div
            className={cn(
              "rounded-[calc(1.5rem-1px)] px-8 pb-10 pt-9",
              "bg-card/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-card/90",
              "dark:bg-[hsl(var(--card))]/90 dark:supports-[backdrop-filter]:bg-[hsl(var(--card))]/75"
            )}
          >
            {/* Logo */}
            <div className="mb-8 flex justify-center">
                <div
                className={cn(
                  "group relative rounded-2xl border border-border bg-white p-5 shadow-sm",
                  "transition-all duration-500 hover:border-[hsl(var(--brand-accent)/0.35)] hover:shadow-[0_12px_40px_-16px_hsl(var(--brand-accent)/0.2)]",
                  "dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
                  "dark:hover:border-[hsl(var(--brand-accent)/0.25)] dark:hover:shadow-[0_0_40px_-12px_hsl(var(--brand-accent)/0.25),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur dark:opacity-0",
                    "bg-gradient-to-br from-[hsl(var(--brand-accent)/0.18)] to-transparent",
                    "transition-opacity duration-500 group-hover:opacity-100 dark:group-hover:opacity-100"
                  )}
                />
                <BrandLogo
                  width={200}
                  height={64}
                  className="relative h-11 w-auto max-w-[200px] object-contain sm:h-12"
                  priority
                />
              </div>
            </div>

            <div className="mb-8 space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem] dark:text-white">
                Welcome back
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground dark:text-zinc-500">
                Sign in to manage content, HR, contracts, and quotations.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="cms-email"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Email
                </Label>
                <div className="group relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-[hsl(var(--brand-accent))] dark:text-zinc-500"
                    strokeWidth={1.75}
                  />
                  <Input
                    id="cms-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={cn(
                      "h-12 rounded-xl border-border bg-background pl-11 text-[15px] text-foreground placeholder:text-muted-foreground",
                      "transition-all duration-200",
                      "focus-visible:border-[hsl(var(--brand-accent)/0.45)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-accent)/0.2)]",
                      "dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-600"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="cms-password"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Password
                </Label>
                <div className="group relative">
                  <Lock
                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-[hsl(var(--brand-accent))] dark:text-zinc-500"
                    strokeWidth={1.75}
                  />
                  <Input
                    id="cms-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={cn(
                      "h-12 rounded-xl border-border bg-background pl-11 text-[15px] text-foreground placeholder:text-muted-foreground",
                      "transition-all duration-200",
                      "focus-visible:border-[hsl(var(--brand-accent)/0.45)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-accent)/0.2)]",
                      "dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-zinc-600"
                    )}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={busy}
                  className={cn(
                    "group relative h-12 w-full overflow-hidden rounded-xl border-0",
                    "bg-gradient-to-r from-[hsl(var(--brand-accent))] via-[hsl(var(--brand-accent))] to-[hsl(var(--brand-accent-muted))]",
                    "text-[15px] font-bold tracking-tight text-white dark:text-[hsl(var(--brand-primary))]",
                    "shadow-[0_8px_32px_-8px_hsl(var(--brand-accent)/0.55),0_0_0_1px_hsl(var(--brand-accent)/0.2)_inset]",
                    "transition-all duration-300 ease-out",
                    "hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_hsl(var(--brand-accent)/0.45)]",
                    "active:scale-[0.98]",
                    "disabled:opacity-55 disabled:hover:scale-100 disabled:hover:shadow-[0_8px_32px_-8px_hsl(var(--brand-accent)/0.55)]"
                  )}
                >
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    aria-hidden
                  />
                  <span className="relative">
                    {busy ? "Signing in…" : "Sign in"}
                  </span>
                </Button>
              </div>
            </form>

            <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-8 dark:border-white/[0.06]">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "h-auto gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground",
                  "transition-colors hover:bg-accent/10 hover:text-accent dark:hover:bg-white/[0.04]"
                )}
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 opacity-70" strokeWidth={2} />
                  Back to site
                </Link>
              </Button>
              <p className="text-center text-[11px] leading-relaxed text-muted-foreground dark:text-zinc-600">
                Protected session · JWT-secured CMS API
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
