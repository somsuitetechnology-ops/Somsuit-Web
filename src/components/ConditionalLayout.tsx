"use client";

import { usePathname } from "next/navigation";
import Layout from "@/components/Layout";

/**
 * Public marketing pages use the main nav/footer; /dashboard is a standalone shell.
 */
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/dashboard" || pathname?.startsWith("/dashboard/")) {
    return <>{children}</>;
  }
  return <Layout>{children}</Layout>;
}
