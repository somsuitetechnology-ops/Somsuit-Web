"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  cmsApi,
  CmsApiError,
  type OfferedService,
  type OfferedServiceInput,
} from "@/lib/cms-api";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardDataTable } from "@/components/dashboard/DashboardDataTable";
import { DataTableColumnHeader } from "@/components/dashboard/DataTableColumnHeader";

const ctaClass = cn(
  "rounded-xl font-semibold shadow-md transition-all",
  "bg-primary text-primary-foreground hover:bg-primary/90",
  "dark:bg-[hsl(var(--brand-accent))] dark:text-[hsl(var(--brand-primary))] dark:hover:bg-[hsl(var(--primary-hover))] dark:shadow-[0_0_24px_-8px_hsl(var(--brand-accent)/0.45)]"
);

function emptyForm(): OfferedServiceInput {
  return {
    serviceCode: "",
    name: "",
    tagline: "",
    description: "",
    deliverables: "",
    prerequisites: "",
    processNotes: "",
    typicalDuration: "",
    currency: "USD",
    iconUrl: "",
    heroImageUrl: "",
    tags: [],
    status: "active",
    sortOrder: 0,
    internalNotes: "",
  };
}

function tagsToInput(tags?: string[]): string {
  return (tags ?? []).join(", ");
}

function inputToTags(s: string): string[] {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function formatOptionalPrice(
  price?: number | null,
  currency?: string
): string {
  if (price == null || Number.isNaN(price)) return "—";
  const cur = currency || "USD";
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: cur,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${cur} ${price}`;
  }
}

export default function ServicesCatalogPage() {
  const qc = useQueryClient();
  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "offered-services"],
    queryFn: () => cmsApi.listOfferedServices(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<OfferedService | null>(null);
  const [form, setForm] = useState<OfferedServiceInput>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      const tags = inputToTags(tagsInput);
      const p = priceInput.trim();
      const body: OfferedServiceInput = { ...form, tags };
      if (p === "") {
        if (editing) body.startingPrice = null;
      } else {
        const n = Number(p);
        if (Number.isFinite(n)) body.startingPrice = n;
      }
      if (editing) {
        return cmsApi.updateOfferedService(editing.id, body);
      }
      return cmsApi.createOfferedService(body);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "offered-services"] });
      qc.invalidateQueries({ queryKey: ["cms", "requests"] });
      toast.success(editing ? "Service updated" : "Service created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      setTagsInput("");
      setPriceInput("");
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteOfferedService(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "offered-services"] });
      qc.invalidateQueries({ queryKey: ["cms", "requests"] });
      toast.success("Service removed from catalog");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setTagsInput("");
    setPriceInput("");
    setDialogOpen(true);
  };

  const openEdit = (row: OfferedService) => {
    setEditing(row);
    setForm({
      serviceCode: row.serviceCode,
      name: row.name,
      tagline: row.tagline ?? "",
      description: row.description,
      deliverables: row.deliverables ?? "",
      prerequisites: row.prerequisites ?? "",
      processNotes: row.processNotes ?? "",
      typicalDuration: row.typicalDuration ?? "",
      currency: row.currency ?? "USD",
      iconUrl: row.iconUrl ?? "",
      heroImageUrl: row.heroImageUrl ?? "",
      tags: row.tags ?? [],
      status: row.status ?? "active",
      sortOrder: row.sortOrder ?? 0,
      internalNotes: row.internalNotes ?? "",
    });
    setTagsInput(tagsToInput(row.tags));
    setPriceInput(
      row.startingPrice != null && !Number.isNaN(row.startingPrice)
        ? String(row.startingPrice)
        : ""
    );
    setDialogOpen(true);
  };

  const canSave =
    !!form.serviceCode?.trim() &&
    !!form.name?.trim() &&
    !!form.description?.trim();

  const columns: ColumnDef<OfferedService>[] = [
    {
      accessorKey: "sortOrder",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="#" />
      ),
      cell: ({ row }) => row.original.sortOrder ?? 0,
    },
    {
      accessorKey: "serviceCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Service" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground dark:text-zinc-100">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "typicalDuration",
      header: "Duration",
      cell: ({ row }) => row.original.typicalDuration || "—",
    },
    {
      id: "priceCol",
      accessorFn: (r) =>
        formatOptionalPrice(r.startingPrice, r.currency),
      header: "From price",
      cell: ({ row }) =>
        formatOptionalPrice(row.original.startingPrice, row.original.currency),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
            row.original.status === "archived"
              ? "border-zinc-400/25 bg-zinc-500/[0.08] text-zinc-700 dark:text-zinc-400"
              : "border-emerald-500/30 bg-emerald-500/[0.12] text-emerald-800 dark:text-emerald-300"
          )}
        >
          {row.original.status ?? "active"}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-zinc-500">
          Actions
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            title="Edit"
            className="h-9 w-9 rounded-lg text-foreground hover:bg-muted dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-[hsl(var(--brand-accent))]"
            onClick={() => openEdit(row.original)}
          >
            <Pencil className="h-4 w-4" strokeWidth={1.75} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Delete"
            className="h-9 w-9 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setDeleteId(row.original.id)}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground dark:text-white">
            Services
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Catalog of everything you offer: positioning, scope, pricing hints,
            and internal notes. You can remove entries anytime; existing
            requests keep their labels.
          </p>
        </div>
        <Button onClick={openCreate} className={ctaClass}>
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New service
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        searchPlaceholder="Search by code, name, tagline, tags…"
        emptyMessage="No services in the catalog yet."
        pageSize={10}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-2xl"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>{editing ? "Edit service" : "New service"}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overview
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="svc-code">Service code *</Label>
                  <Input
                    id="svc-code"
                    value={form.serviceCode}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, serviceCode: e.target.value }))
                    }
                    className="rounded-xl"
                    placeholder="e.g. SVC-DEV-01"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="svc-order">Sort order</Label>
                  <Input
                    id="svc-order"
                    type="number"
                    value={form.sortOrder ?? 0}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        sortOrder: Number(e.target.value) || 0,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-name">Name *</Label>
                  <Input
                    id="svc-name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-tagline">Tagline</Label>
                  <Input
                    id="svc-tagline"
                    value={form.tagline ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tagline: e.target.value }))
                    }
                    className="rounded-xl"
                    placeholder="Short pitch for proposals and the site"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-desc">Description *</Label>
                  <Textarea
                    id="svc-desc"
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    className="rounded-xl"
                    rows={4}
                    placeholder="What this service is, outcomes, and positioning"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-tags">Tags</Label>
                  <Input
                    id="svc-tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="rounded-xl"
                    placeholder="Comma-separated, e.g. web, retainer, somalia"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Delivery
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-deliver">What&apos;s included</Label>
                  <Textarea
                    id="svc-deliver"
                    value={form.deliverables ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, deliverables: e.target.value }))
                    }
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-prereq">Prerequisites</Label>
                  <Textarea
                    id="svc-prereq"
                    value={form.prerequisites ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, prerequisites: e.target.value }))
                    }
                    className="rounded-xl"
                    rows={2}
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-process">Process / how we work</Label>
                  <Textarea
                    id="svc-process"
                    value={form.processNotes ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, processNotes: e.target.value }))
                    }
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="svc-duration">Typical duration</Label>
                  <Input
                    id="svc-duration"
                    value={form.typicalDuration ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        typicalDuration: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                    placeholder="e.g. 2–4 weeks"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Commercial &amp; media
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="svc-price">Starting price (optional)</Label>
                  <Input
                    id="svc-price"
                    type="number"
                    step="0.01"
                    min={0}
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="rounded-xl"
                    placeholder="Leave empty if variable"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Currency</Label>
                  <Select
                    value={form.currency ?? "USD"}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, currency: v }))
                    }
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="SOS">SOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-icon">Icon URL</Label>
                  <Input
                    id="svc-icon"
                    value={form.iconUrl ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, iconUrl: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="svc-hero">Hero image URL</Label>
                  <Input
                    id="svc-hero"
                    value={form.heroImageUrl ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, heroImageUrl: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status ?? "active"}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, status: v }))
                    }
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="svc-internal">Internal notes (not public)</Label>
              <Textarea
                id="svc-internal"
                value={form.internalNotes ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, internalNotes: e.target.value }))
                }
                className="rounded-xl"
                rows={2}
              />
            </div>
          </div>
          <SheetFooter className="flex-row justify-end gap-2 border-t bg-muted/30 px-6 py-4 sm:justify-end">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => saveMu.mutate()}
              disabled={!canSave || saveMu.isPending}
              className={ctaClass}
            >
              {saveMu.isPending ? "Saving…" : "Save"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this service?</AlertDialogTitle>
            <AlertDialogDescription>
              The catalog entry is deleted. Request history is unchanged and
              still shows the service name that was saved on each request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && deleteMu.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
