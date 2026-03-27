"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  clearCmsSession,
  cmsGetMe,
  getCmsUser,
  type CmsAuthUser,
} from "@/lib/cms-api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { LogOut, ArrowLeft, ChevronDown, Sun, Moon, Monitor } from "lucide-react";

function initialsFromUser(user: CmsAuthUser | null): string {
  if (!user) return "?";
  const n = user.name?.trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  }
  const e = user.email?.trim();
  if (e) {
    return e.slice(0, 2).toUpperCase();
  }
  return "U";
}

const menuSurface = cn(
  "w-[min(calc(100vw-1.5rem),18.5rem)] rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/40",
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
);

const actionItemClass = cn(
  "mt-1 flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm font-medium text-zinc-100",
  "outline-none focus:bg-zinc-800/90 data-[highlighted]:bg-zinc-800/90"
);

export function DashboardProfileMenu() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<CmsAuthUser | null>(null);

  useEffect(() => {
    setUser(getCmsUser());
    void cmsGetMe()
      .then(setUser)
      .catch(() => {
        /* auth off or expired — keep localStorage snapshot if any */
        setUser(getCmsUser());
      });
  }, []);

  const displayName = user?.name?.trim() || "User";
  const email = user?.email?.trim() || "—";
  const initials = initialsFromUser(user);

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const themeIcon =
    theme === "light" ? (
      <Sun className="h-5 w-5 text-zinc-200" />
    ) : theme === "dark" ? (
      <Moon className="h-5 w-5 text-zinc-200" />
    ) : (
      <Monitor className="h-5 w-5 text-zinc-200" />
    );

  const signOut = () => {
    clearCmsSession();
    router.replace("/dashboard/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-2xl px-1 py-1 outline-none",
            "ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-accent)/0.65)]",
            "transition hover:bg-zinc-900/50 dark:ring-offset-[hsl(var(--background))]"
          )}
          aria-label="Open profile menu"
        >
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              "bg-[hsl(var(--brand-accent))] text-sm font-bold tracking-tight text-[hsl(var(--brand-primary))]"
            )}
            style={{ boxShadow: "0 0 22px -6px hsl(204 51% 51% / 0.45)" }}
          >
            {initials}
          </span>
          <ChevronDown className="hidden h-4 w-4 text-zinc-500 sm:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} className={menuSurface}>
          <div className="rounded-xl bg-zinc-900/90 p-3">
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                  "bg-[hsl(var(--brand-accent))] text-sm font-bold text-[hsl(var(--brand-primary))]"
                )}
                style={{ boxShadow: "0 0 20px -4px hsl(204 51% 51% / 0.55)" }}
              >
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{displayName}</p>
                <p className="truncate text-xs text-zinc-400">{email}</p>
              </div>
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[hsl(var(--brand-accent))]"
                style={{ boxShadow: "0 0 10px hsl(204 51% 51% / 0.85)" }}
                title="Online"
              />
            </div>
          </div>

          <DropdownMenuItem className={actionItemClass} onSelect={() => signOut()}>
            <LogOut className="h-4 w-4 text-zinc-400" />
            Sign out
          </DropdownMenuItem>

          <DropdownMenuItem className={actionItemClass} asChild>
            <Link
              href="/"
              className="flex w-full cursor-pointer items-center gap-2 no-underline text-inherit"
            >
              <ArrowLeft className="h-4 w-4 text-zinc-400" />
              Back to site
            </Link>
          </DropdownMenuItem>

          <div className="mt-2 rounded-xl border border-zinc-800/80 bg-zinc-900/90 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-black text-xs font-bold text-white">
                  N
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Theme
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cycleTheme();
                }}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  "border border-zinc-800 bg-zinc-950 text-zinc-100",
                  "transition hover:bg-zinc-800/80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-accent)/0.5)]"
                )}
                title="Cycle theme"
              >
                {themeIcon}
              </button>
            </div>
          </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
