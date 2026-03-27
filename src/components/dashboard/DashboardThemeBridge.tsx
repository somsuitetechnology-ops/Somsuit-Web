"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const ACTIVE_KEY = "somsuite-dashboard-theme-session";

/**
 * First visit to /dashboard/* in this tab: show the CMS shell in light without
 * overwriting the user's saved preference in localStorage (persist: false).
 * Navigating between dashboard routes does not re-apply light (so dark mode sticks).
 * Leaving the dashboard syncs React state from localStorage (the saved preference).
 */
export function DashboardThemeBridge() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  useEffect(() => {
    const inDashboard = pathname?.startsWith("/dashboard") ?? false;
    const apply = setThemeRef.current;

    if (inDashboard) {
      if (!sessionStorage.getItem(ACTIVE_KEY)) {
        sessionStorage.setItem(ACTIVE_KEY, "1");
        apply("light", { persist: false });
      }
      return;
    }

    if (sessionStorage.getItem(ACTIVE_KEY)) {
      try {
        const stored = localStorage.getItem("moral-tech-theme");
        if (stored === "light" || stored === "dark" || stored === "system") {
          apply(stored);
        }
      } catch {
        /* ignore */
      }
      sessionStorage.removeItem(ACTIVE_KEY);
    }
  }, [pathname]);

  return null;
}
