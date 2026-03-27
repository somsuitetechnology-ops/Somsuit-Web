import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  loading,
  icon: Icon,
  /** Light mode only: second tone for alternating grid (odd-index cards). */
  alternate = false,
}: {
  title: string;
  value: React.ReactNode;
  loading?: boolean;
  icon: LucideIcon;
  alternate?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-all duration-300",
        /* Light — branded; alternate rows use soft cool grey vs white */
        "border-[hsl(var(--brand-accent)/0.22)]",
        alternate
          ? "bg-[hsl(var(--muted))] shadow-[0_1px_0_0_hsl(var(--brand-accent)/0.1),0_12px_40px_-24px_hsl(var(--brand-primary)/0.14)]"
          : "bg-white shadow-[0_1px_0_0_hsl(var(--brand-accent)/0.12),0_12px_40px_-24px_hsl(var(--brand-primary)/0.18)]",
        "hover:border-[hsl(var(--brand-accent)/0.4)] hover:shadow-[0_0_0_1px_hsl(var(--brand-accent)/0.12),0_20px_48px_-28px_hsl(var(--brand-accent)/0.22)]",
        /* Dark — uniform (no striping) */
        "dark:border-white/10 dark:bg-[hsl(var(--card))] dark:shadow-none",
        "dark:hover:border-[hsl(var(--brand-accent)/0.3)] dark:hover:shadow-[0_0_28px_-12px_hsl(var(--brand-accent)/0.25)]"
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[hsl(var(--brand-accent))] via-[hsl(var(--brand-accent))] to-[hsl(var(--brand-accent))] opacity-90"
        aria-hidden
      />
      <div className="relative p-5 pt-6 md:p-6 md:pt-7">
        <div
          className={cn(
            "pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl",
            "bg-[hsl(var(--brand-accent)/0.15)] dark:bg-[hsl(var(--brand-accent)/0.18)]"
          )}
        />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p
              className={cn(
                "text-xs font-bold uppercase tracking-[0.14em]",
                "text-[hsl(var(--brand-primary)/0.55)] dark:text-zinc-400"
              )}
            >
              {title}
            </p>
            <p className="mt-2 text-4xl font-bold tabular-nums tracking-tight">
              {loading ? (
                <span className="inline-block h-10 w-14 animate-pulse rounded-md bg-[hsl(var(--brand-accent)/0.12)] dark:bg-white/10" />
              ) : (
                <span className="text-[hsl(var(--brand-primary))] dark:text-[hsl(var(--brand-accent))]">
                  {value}
                </span>
              )}
            </p>
          </div>
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 transition-transform duration-300 group-hover:scale-105",
              "border-[hsl(var(--brand-accent)/0.35)] bg-[hsl(var(--brand-accent)/0.14)] text-[hsl(var(--brand-primary))]",
              "dark:border-[hsl(var(--brand-accent)/0.4)] dark:bg-[hsl(var(--brand-accent)/0.12)] dark:text-[hsl(var(--brand-accent))]"
            )}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
        </div>
      </div>
    </div>
  );
}
