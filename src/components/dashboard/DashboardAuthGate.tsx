"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CmsApiError,
  clearCmsSession,
  cmsGetMe,
  fetchCmsAuthStatus,
  getCmsToken,
} from "@/lib/cms-api";

type GateState = "loading" | "ready" | "unauthed";

export function DashboardAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [state, setState] = useState<GateState>("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const authEnabled = await fetchCmsAuthStatus();
        if (cancelled) return;
        if (!authEnabled) {
          setState("ready");
          return;
        }
        const token = getCmsToken();
        if (!token) {
          setState("unauthed");
          return;
        }
        try {
          await cmsGetMe();
        } catch (e) {
          if (cancelled) return;
          clearCmsSession();
          setState("unauthed");
          return;
        }
        if (cancelled) return;
        setState("ready");
      } catch (e) {
        if (cancelled) return;
        if (e instanceof CmsApiError && e.status === 503) {
          setState("ready");
          return;
        }
        setState("unauthed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (state === "unauthed") {
      router.replace("/dashboard/login");
    }
  }, [state, router]);

  if (state === "loading" || state === "unauthed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[hsl(var(--background))]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[hsl(var(--brand-accent))] border-t-transparent" />
          <p className="text-sm text-zinc-500">
            {state === "unauthed" ? "Redirecting to sign in…" : "Loading…"}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
