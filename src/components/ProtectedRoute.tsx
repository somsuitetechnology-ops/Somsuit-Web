"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

type Role = "ADMIN" | "STAFF" | "CLIENT";

type ProtectedRouteProps = {
  children: React.ReactNode;
  /** Require at least one of these roles. If not set, any authenticated user is allowed. */
  roles?: Role[];
  /** Where to redirect if not authenticated (default: /login) */
  loginPath?: string;
};

export function ProtectedRoute({ children, roles, loginPath = "/login" }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading || isAuthenticated) return;
    const from = encodeURIComponent(pathname);
    router.replace(`${loginPath}?from=${from}`);
  }, [isLoading, isAuthenticated, loginPath, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (roles && roles.length > 0 && !hasRole(...roles)) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">You don&apos;t have access to this page.</p>
        <Link href="/" className="text-primary underline">
          Return home
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
