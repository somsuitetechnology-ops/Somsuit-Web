"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  cmsApi,
  CmsApiError,
  type Customer,
  type CustomerInput,
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
import { Eye, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CustomerStatusBadge, CustomerViewDialog } from "@/components/dashboard/CustomerViewDialog";
import { DashboardDataTable } from "@/components/dashboard/DashboardDataTable";
import { DataTableColumnHeader } from "@/components/dashboard/DataTableColumnHeader";

const ctaClass = cn(
  "rounded-xl font-semibold shadow-md transition-all",
  "bg-primary text-primary-foreground hover:bg-primary/90",
  "dark:bg-[hsl(var(--brand-accent))] dark:text-[hsl(var(--brand-primary))] dark:hover:bg-[hsl(var(--primary-hover))] dark:shadow-[0_0_24px_-8px_hsl(var(--brand-accent)/0.45)]"
);

function emptyForm(): CustomerInput {
  return {
    customerCode: "",
    companyName: "",
    legalName: "",
    contactName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    website: "",
    taxId: "",
    customerType: "company",
    industry: "",
    billingStreet: "",
    billingCity: "",
    billingStateProvince: "",
    billingPostalCode: "",
    billingCountry: "",
    shippingStreet: "",
    shippingCity: "",
    shippingStateProvince: "",
    shippingPostalCode: "",
    shippingCountry: "",
    notes: "",
    status: "active",
  };
}

function rowLabel(c: Customer): string {
  const parts = [c.companyName, c.contactName].filter(Boolean);
  return parts.length ? parts.join(" · ") : "—";
}

function billingCityLine(c: Customer): string {
  const parts = [c.billingCity, c.billingCountry].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
}

export default function CustomersPage() {
  const qc = useQueryClient();
  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "customers"],
    queryFn: () => cmsApi.listCustomers(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState<CustomerInput>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewing, setViewing] = useState<Customer | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      if (editing) {
        return cmsApi.updateCustomer(editing.id, form);
      }
      return cmsApi.createCustomer(form);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "customers"] });
      toast.success(editing ? "Customer updated" : "Customer created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteCustomer(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "customers"] });
      toast.success("Customer deleted");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (c: Customer) => {
    setEditing(c);
    setForm({
      customerCode: c.customerCode,
      companyName: c.companyName ?? "",
      legalName: c.legalName ?? "",
      contactName: c.contactName ?? "",
      email: c.email ?? "",
      phone: c.phone ?? "",
      alternatePhone: c.alternatePhone ?? "",
      website: c.website ?? "",
      taxId: c.taxId ?? "",
      customerType: c.customerType ?? "company",
      industry: c.industry ?? "",
      billingStreet: c.billingStreet ?? "",
      billingCity: c.billingCity ?? "",
      billingStateProvince: c.billingStateProvince ?? "",
      billingPostalCode: c.billingPostalCode ?? "",
      billingCountry: c.billingCountry ?? "",
      shippingStreet: c.shippingStreet ?? "",
      shippingCity: c.shippingCity ?? "",
      shippingStateProvince: c.shippingStateProvince ?? "",
      shippingPostalCode: c.shippingPostalCode ?? "",
      shippingCountry: c.shippingCountry ?? "",
      notes: c.notes ?? "",
      status: c.status ?? "active",
    });
    setDialogOpen(true);
  };

  const canSave =
    !!form.customerCode?.trim() &&
    (!!form.companyName?.trim() || !!form.contactName?.trim());

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "customerCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
    },
    {
      id: "display",
      accessorFn: rowLabel,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <button
          type="button"
          className={cn(
            "max-w-[280px] truncate text-left font-medium text-foreground transition-colors",
            "hover:text-primary hover:underline hover:underline-offset-4",
            "dark:text-zinc-100 dark:hover:text-[hsl(var(--brand-accent))]"
          )}
          title="View profile"
          onClick={() => setViewing(row.original)}
        >
          {rowLabel(row.original)}
        </button>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email || "—",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone || "—",
    },
    {
      id: "billingLoc",
      accessorFn: billingCityLine,
      header: "Billing location",
      cell: ({ row }) => billingCityLine(row.original),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <CustomerStatusBadge status={row.original.status} />
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
            title="View"
            className="h-9 w-9 rounded-lg text-foreground hover:bg-muted dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-[hsl(var(--brand-accent))]"
            onClick={() => setViewing(row.original)}
          >
            <Eye className="h-4 w-4" strokeWidth={1.75} />
          </Button>
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
            Customers
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Central register: company and contact details, billing and shipping
            addresses, tax ID, and notes.
          </p>
        </div>
        <Button onClick={openCreate} className={ctaClass}>
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New customer
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        searchPlaceholder="Search by code, company, contact, email…"
        emptyMessage="No customers yet."
        pageSize={8}
      />

      {viewing ? (
        <CustomerViewDialog
          customer={viewing}
          open
          onOpenChange={(openNext) => {
            if (!openNext) setViewing(null);
          }}
          onEdit={(c) => {
            openEdit(c);
            setViewing(null);
          }}
        />
      ) : null}

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-2xl"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>
              {editing ? "Edit customer" : "New customer"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Identity
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="cust-code">Customer code *</Label>
                  <Input
                    id="cust-code"
                    value={form.customerCode}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, customerCode: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select
                    value={form.customerType ?? "company"}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, customerType: v }))
                    }
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Company &amp; contact
              </p>
              <p className="mb-3 text-xs text-muted-foreground">
                Provide at least company name <em>or</em> primary contact name.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="cust-company">Company name</Label>
                  <Input
                    id="cust-company"
                    value={form.companyName ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, companyName: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="cust-legal">Legal / registered name</Label>
                  <Input
                    id="cust-legal"
                    value={form.legalName ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, legalName: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="cust-contact">Primary contact *</Label>
                  <Input
                    id="cust-contact"
                    value={form.contactName ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, contactName: e.target.value }))
                    }
                    className="rounded-xl"
                    placeholder="Full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-email">Email</Label>
                  <Input
                    id="cust-email"
                    type="email"
                    value={form.email ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-phone">Phone</Label>
                  <Input
                    id="cust-phone"
                    value={form.phone ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-phone2">Alternate phone</Label>
                  <Input
                    id="cust-phone2"
                    value={form.alternatePhone ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, alternatePhone: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-web">Website</Label>
                  <Input
                    id="cust-web"
                    value={form.website ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, website: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-tax">Tax / VAT ID</Label>
                  <Input
                    id="cust-tax"
                    value={form.taxId ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, taxId: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="cust-industry">Industry</Label>
                  <Input
                    id="cust-industry"
                    value={form.industry ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, industry: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Billing address
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="cust-bill-st">Street</Label>
                  <Input
                    id="cust-bill-st"
                    value={form.billingStreet ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, billingStreet: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-bill-city">City</Label>
                  <Input
                    id="cust-bill-city"
                    value={form.billingCity ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, billingCity: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-bill-region">State / province</Label>
                  <Input
                    id="cust-bill-region"
                    value={form.billingStateProvince ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        billingStateProvince: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-bill-post">Postal code</Label>
                  <Input
                    id="cust-bill-post"
                    value={form.billingPostalCode ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        billingPostalCode: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-bill-country">Country</Label>
                  <Input
                    id="cust-bill-country"
                    value={form.billingCountry ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, billingCountry: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shipping address
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="cust-ship-st">Street</Label>
                  <Input
                    id="cust-ship-st"
                    value={form.shippingStreet ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        shippingStreet: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-ship-city">City</Label>
                  <Input
                    id="cust-ship-city"
                    value={form.shippingCity ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, shippingCity: e.target.value }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-ship-region">State / province</Label>
                  <Input
                    id="cust-ship-region"
                    value={form.shippingStateProvince ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        shippingStateProvince: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-ship-post">Postal code</Label>
                  <Input
                    id="cust-ship-post"
                    value={form.shippingPostalCode ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        shippingPostalCode: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cust-ship-country">Country</Label>
                  <Input
                    id="cust-ship-country"
                    value={form.shippingCountry ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        shippingCountry: e.target.value,
                      }))
                    }
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cust-notes">Notes</Label>
              <Textarea
                id="cust-notes"
                value={form.notes ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="rounded-xl"
                rows={3}
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
            <AlertDialogTitle>Delete customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the customer record from the register. Quotations are
              not linked to this entry and are unchanged.
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
