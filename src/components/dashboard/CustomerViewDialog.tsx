"use client";

import type { ComponentType, ReactNode } from "react";
import type { Customer } from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Building2,
  Factory,
  FileText,
  Hash,
  MapPinned,
  Truck,
  User,
} from "lucide-react";

function displayTitle(c: Customer): string {
  return [c.companyName, c.contactName].filter(Boolean).join(" · ") || "Customer";
}

export function customerInitials(c: Customer): string {
  const src = (c.companyName || c.contactName || c.customerCode || "?").trim();
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (src.length >= 2) return src.slice(0, 2).toUpperCase();
  return src.slice(0, 1).toUpperCase() || "?";
}

export function CustomerStatusBadge({ status }: { status?: string }) {
  const s = (status ?? "active").toLowerCase();
  const styles: Record<string, string> = {
    active:
      "border-emerald-500/30 bg-emerald-500/[0.12] text-emerald-800 dark:text-emerald-300",
    inactive:
      "border-zinc-400/25 bg-zinc-500/[0.08] text-zinc-700 dark:text-zinc-400",
    lead: "border-amber-500/35 bg-amber-500/[0.12] text-amber-900 dark:text-amber-300",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize tracking-wide",
        styles[s] ?? styles.active
      )}
    >
      {s}
    </span>
  );
}

function formatAddressBlock(
  c: Customer,
  kind: "billing" | "shipping"
): string[] {
  const street =
    kind === "billing" ? c.billingStreet : c.shippingStreet;
  const city = kind === "billing" ? c.billingCity : c.shippingCity;
  const region =
    kind === "billing" ? c.billingStateProvince : c.shippingStateProvince;
  const post =
    kind === "billing" ? c.billingPostalCode : c.shippingPostalCode;
  const country =
    kind === "billing" ? c.billingCountry : c.shippingCountry;

  const line2 = [city, region].filter(Boolean).join(", ");
  const line3 = [post, country].filter(Boolean).join(" · ");

  const lines = [street, line2, line3].filter((x) => x && x.trim());
  return lines;
}

function websiteHref(url: string): string {
  const t = url.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border/80 bg-gradient-to-br from-muted/60 via-background to-muted/30",
        "p-5 shadow-sm",
        "dark:border-white/[0.07] dark:from-white/[0.04] dark:via-[hsl(var(--secondary))] dark:to-white/[0.02]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      )}
    >
      <div className="mb-4 flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
            "border-primary/15 bg-primary/10 text-primary",
            "dark:border-[hsl(var(--brand-accent)/0.22)] dark:bg-[hsl(var(--brand-accent)/0.1)] dark:text-[hsl(var(--brand-accent))]"
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground dark:text-zinc-500">
          {title}
        </h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  href,
  className,
}: {
  label: string;
  value?: string | null;
  href?: string;
  className?: string;
}) {
  const v = value?.trim();
  if (!v) {
    return (
      <div className={cn("sm:col-span-1", className)}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/90 dark:text-zinc-500">
          {label}
        </p>
        <p className="mt-1 text-sm text-muted-foreground/70">—</p>
      </div>
    );
  }
  const content = href ? (
    <a
      href={href}
      className={cn(
        "mt-1 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline",
        "dark:text-[hsl(var(--brand-accent))]"
      )}
    >
      {v}
    </a>
  ) : (
    <p className="mt-1 text-sm font-medium leading-snug text-foreground dark:text-zinc-100">
      {v}
    </p>
  );
  return (
    <div className={cn("min-w-0 sm:col-span-1", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground dark:text-zinc-500">
        {label}
      </p>
      {content}
    </div>
  );
}

type CustomerViewDialogProps = {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (c: Customer) => void;
};

export function CustomerViewDialog({
  customer,
  open,
  onOpenChange,
  onEdit,
}: CustomerViewDialogProps) {
  if (!customer) return null;

  const typeLabel =
    customer.customerType === "individual" ? "Individual" : "Company";

  const billingLines = formatAddressBlock(customer, "billing");
  const shippingLines = formatAddressBlock(customer, "shipping");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[min(92vh,900px)] max-w-2xl gap-0 overflow-hidden p-0",
          "w-[calc(100%-1.5rem)] sm:rounded-2xl",
          "border border-border/90 shadow-2xl dark:border-white/[0.08]",
          "dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)]"
        )}
      >
        <div className="relative overflow-hidden">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 opacity-95",
              "bg-[radial-gradient(ellipse_120%_80%_at_100%_-20%,hsl(var(--brand-accent)/0.35),transparent_50%)]",
              "dark:bg-[radial-gradient(ellipse_100%_60%_at_80%_-10%,hsl(var(--brand-accent)/0.28),transparent_55%)]"
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/40 to-background dark:from-[hsl(var(--secondary))] dark:to-[hsl(var(--card))]"
            )}
            aria-hidden
          />
          <DialogHeader className="relative space-y-4 px-6 pb-6 pt-8 text-left sm:pr-14">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div
                className={cn(
                  "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-bold tracking-tight",
                  "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg",
                  "dark:bg-gradient-to-br dark:from-[hsl(var(--brand-accent))] dark:to-[hsl(var(--brand-accent-muted))] dark:text-[hsl(var(--brand-primary))]",
                  "dark:shadow-[0_12px_40px_-12px_hsl(var(--brand-accent)/0.55)]"
                )}
              >
                {customerInitials(customer)}
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <DialogTitle className="text-xl font-bold leading-tight tracking-tight text-foreground dark:text-white sm:text-2xl">
                  {displayTitle(customer)}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/80 px-2.5 py-1 font-mono text-xs font-semibold text-foreground backdrop-blur-sm",
                      "dark:border-white/[0.1] dark:bg-black/25 dark:text-zinc-200"
                    )}
                  >
                    <Hash className="h-3.5 w-3.5 opacity-70" strokeWidth={2} />
                    {customer.customerCode}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground",
                      "dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-zinc-400"
                    )}
                  >
                    <Building2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {typeLabel}
                  </span>
                  <CustomerStatusBadge status={customer.status} />
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div
          className={cn(
            "max-h-[min(56vh,520px)] space-y-4 overflow-y-auto overscroll-contain px-6 pb-2",
            "scrollbar-thin"
          )}
        >
          <Section icon={User} title="Contact">
            <Field
              label="Primary contact"
              value={customer.contactName}
              className="sm:col-span-2"
            />
            <Field
              label="Email"
              value={customer.email}
              href={customer.email ? `mailto:${customer.email}` : undefined}
            />
            <Field label="Phone" value={customer.phone} href={customer.phone ? `tel:${customer.phone}` : undefined} />
            <Field
              label="Alternate phone"
              value={customer.alternatePhone}
              href={
                customer.alternatePhone
                  ? `tel:${customer.alternatePhone}`
                  : undefined
              }
            />
            <Field
              label="Website"
              value={customer.website}
              href={customer.website ? websiteHref(customer.website) : undefined}
              className="sm:col-span-2"
            />
          </Section>

          <Section icon={Factory} title="Company">
            <Field label="Company name" value={customer.companyName} className="sm:col-span-2" />
            <Field label="Legal name" value={customer.legalName} className="sm:col-span-2" />
            <Field label="Industry" value={customer.industry} />
            <Field label="Tax / VAT ID" value={customer.taxId} />
          </Section>

          <Section icon={MapPinned} title="Billing address">
            {billingLines.length === 0 ? (
              <p className="text-sm text-muted-foreground sm:col-span-2">No billing address on file.</p>
            ) : (
              <div className="sm:col-span-2">
                <div className="rounded-xl border border-dashed border-border/70 bg-background/50 px-4 py-3 dark:border-white/[0.1] dark:bg-black/20">
                  {billingLines.map((line, i) => (
                    <p key={i} className={cn("text-sm leading-relaxed text-foreground dark:text-zinc-200", i > 0 && "mt-0.5")}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section icon={Truck} title="Shipping address">
            {shippingLines.length === 0 ? (
              <p className="text-sm text-muted-foreground sm:col-span-2">No shipping address on file.</p>
            ) : (
              <div className="sm:col-span-2">
                <div className="rounded-xl border border-dashed border-border/70 bg-background/50 px-4 py-3 dark:border-white/[0.1] dark:bg-black/20">
                  {shippingLines.map((line, i) => (
                    <p key={i} className={cn("text-sm leading-relaxed text-foreground dark:text-zinc-200", i > 0 && "mt-0.5")}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {customer.notes?.trim() ? (
            <section
              className={cn(
                "rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-5",
                "dark:border-[hsl(var(--brand-accent)/0.2)] dark:bg-[hsl(var(--brand-accent)/0.06)]"
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-800 dark:text-[hsl(var(--brand-accent))]" strokeWidth={1.75} />
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-900/80 dark:text-zinc-400">
                  Notes
                </h3>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 dark:text-zinc-300">
                {customer.notes.trim()}
              </p>
            </section>
          ) : null}
        </div>

        <DialogFooter
          className={cn(
            "gap-2 border-t border-border/80 bg-muted/30 px-6 py-4 sm:justify-between",
            "dark:border-white/[0.06] dark:bg-black/20"
          )}
        >
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          {onEdit ? (
            <Button
              type="button"
              className={cn(
                "rounded-xl font-semibold shadow-md",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "dark:bg-[hsl(var(--brand-accent))] dark:text-[hsl(var(--brand-primary))] dark:hover:bg-[hsl(var(--primary-hover))]",
                "dark:shadow-[0_0_24px_-8px_hsl(var(--brand-accent)/0.45)]"
              )}
              onClick={() => {
                onOpenChange(false);
                onEdit(customer);
              }}
            >
              Edit customer
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
