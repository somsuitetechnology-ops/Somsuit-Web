import { Navigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !hasRole(...roles)) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-4">
        <p className="text-muted-foreground">You don&apos;t have access to this page.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return <>{children}</>;
}
