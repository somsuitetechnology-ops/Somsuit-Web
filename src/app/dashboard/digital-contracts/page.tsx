"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  cmsApi,
  CmsApiError,
  fetchDigitalContractPdfBlob,
  type Customer,
  type DigitalContract,
  type DigitalContractInput,
  type OfferedService,
} from "@/lib/cms-api";
import {
  CLIENT_ONBOARDING_AGREEMENT_TEMPLATE,
  ICT_EMPLOYMENT_CONTRACT_TEMPLATE,
} from "@/lib/contract-templates";
import { buildFullServiceAgreementFromCatalog } from "@/lib/service-agreement-draft";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Pencil, Trash2, Copy, FileDown, Link2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardDataTable } from "@/components/dashboard/DashboardDataTable";
import { DataTableColumnHeader } from "@/components/dashboard/DataTableColumnHeader";

const ctaClass = cn(
  "rounded-xl font-semibold shadow-md transition-all",
  "bg-primary text-primary-foreground hover:bg-primary/90",
  "dark:bg-[hsl(var(--brand-accent))] dark:text-[hsl(var(--brand-primary))] dark:hover:bg-[hsl(var(--primary-hover))] dark:shadow-[0_0_24px_-8px_hsl(var(--brand-accent)/0.45)]"
);

const NONE = "__none__";

function emptyForm(): DigitalContractInput {
  return {
    employeeId: null,
    customerId: null,
    offeredServiceId: null,
    contractKind: "customer",
    title: "",
    partyName: "",
    partyEmail: "",
    content: "",
    status: "draft",
    ceoName: "",
    ceoSignature: "",
  };
}

function customerLabel(c: Customer): string {
  const parts = [c.companyName, c.contactName].filter(Boolean);
  return parts.length ? parts.join(" · ") : c.customerCode;
}

function deriveCustomerContractTitle(
  service: OfferedService | undefined,
  partyName: string
): string {
  const party = partyName.trim();
  const svcName = service?.name?.trim();
  if (svcName && party)
    return `Client Onboarding Agreement — ${svcName} — ${party}`;
  if (svcName) return `Client Onboarding Agreement — ${svcName}`;
  if (party) return `Client Onboarding Agreement — ${party}`;
  return "Client Onboarding Agreement";
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function DigitalContractsPage() {
  const qc = useQueryClient();
  const { data: contracts = [], isPending, error } = useQuery({
    queryKey: ["cms", "digital-contracts"],
    queryFn: () => cmsApi.listDigitalContracts(),
  });
  const { data: employees = [] } = useQuery({
    queryKey: ["cms", "employees"],
    queryFn: () => cmsApi.listEmployees(),
  });
  const { data: customers = [] } = useQuery({
    queryKey: ["cms", "customers"],
    queryFn: () => cmsApi.listCustomers(),
  });
  const { data: offeredServices = [] } = useQuery({
    queryKey: ["cms", "offered-services"],
    queryFn: () => cmsApi.listOfferedServices(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<DigitalContract | null>(null);
  const [form, setForm] = useState<DigitalContractInput>(emptyForm);
  const [employeePick, setEmployeePick] = useState<string>(NONE);
  const [customerPick, setCustomerPick] = useState<string>(NONE);
  const [servicePick, setServicePick] = useState<string>(NONE);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      const isEmployee = form.contractKind === "employee";
      const selectedService =
        servicePick === NONE
          ? undefined
          : offeredServices.find((s) => s.id === servicePick);
      const computedTitle = isEmployee
        ? form.title.trim()
        : form.title.trim() ||
          deriveCustomerContractTitle(
            selectedService,
            form.partyName ?? ""
          );
      const payload: DigitalContractInput = {
        ...form,
        title: computedTitle,
        employeeId:
          isEmployee && employeePick !== NONE ? employeePick : null,
        customerId:
          !isEmployee && customerPick !== NONE ? customerPick : null,
        offeredServiceId:
          servicePick !== NONE ? servicePick : null,
      };
      if (editing) {
        return cmsApi.updateDigitalContract(editing.id, payload);
      }
      return cmsApi.createDigitalContract(payload);
    },
    onSuccess: (saved) => {
      qc.invalidateQueries({ queryKey: ["cms", "digital-contracts"] });
      toast.success(editing ? "Contract updated" : "Contract created");
      if (saved?.shareToken && typeof window !== "undefined") {
        const link = `${window.location.origin}/contract-sign/${saved.shareToken}`;
        void navigator.clipboard.writeText(link).then(() => {
          toast.message("Signing link copied", { description: link });
        });
      }
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      setEmployeePick(NONE);
      setCustomerPick(NONE);
      setServicePick(NONE);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteDigitalContract(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "digital-contracts"] });
      toast.success("Contract deleted");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      ...emptyForm(),
      content: CLIENT_ONBOARDING_AGREEMENT_TEMPLATE,
    });
    setEmployeePick(NONE);
    setCustomerPick(NONE);
    setServicePick(NONE);
    setDialogOpen(true);
  };

  const openEdit = (c: DigitalContract) => {
    setEditing(c);
    setForm({
      contractKind: c.contractKind === "employee" ? "employee" : "customer",
      title: c.title,
      partyName: c.partyName ?? "",
      partyEmail: c.partyEmail ?? "",
      content: c.content,
      status: c.status ?? "draft",
      signedAt: c.signedAt ?? null,
      ceoName: c.ceoName ?? "",
      ceoSignature: c.ceoSignature ?? "",
    });
    setEmployeePick(c.employeeId || NONE);
    setCustomerPick(c.customerId || NONE);
    setServicePick(c.offeredServiceId || NONE);
    setDialogOpen(true);
  };

  const onEmployeePickChange = (id: string) => {
    setEmployeePick(id);
    if (form.contractKind === "employee" && id !== NONE) {
      const emp = employees.find((e) => e.id === id);
      if (emp) {
        setForm((f) => ({
          ...f,
          partyName: emp.fullName,
          partyEmail: emp.email ?? "",
        }));
      }
    }
  };

  const onCustomerPickChange = (id: string) => {
    setCustomerPick(id);
    if (id === NONE) return;
    const cust = customers.find((c) => c.id === id);
    if (cust) {
      setForm((f) => ({
        ...f,
        partyName: customerLabel(cust),
        partyEmail: cust.email ?? "",
        ...(!editing ? { title: "" } : {}),
      }));
    }
  };

  const onServicePickChange = (id: string) => {
    setServicePick(id);
    if (id === NONE) return;
    const svc = offeredServices.find((s) => s.id === id);
    if (!svc) return;
    const draft = buildFullServiceAgreementFromCatalog(svc);
    setForm((f) => ({
      ...f,
      content: f.content.trim() === "" ? draft : f.content,
      ...(!editing && f.contractKind !== "employee" ? { title: "" } : {}),
    }));
  };

  const applyClientOnboardingTemplate = () => {
    setForm((f) => ({ ...f, content: CLIENT_ONBOARDING_AGREEMENT_TEMPLATE }));
    toast.message("Client Onboarding Agreement loaded", {
      description: "Replace placeholders and review before saving.",
    });
  };

  const applyICTTemplate = () => {
    setForm((f) => ({ ...f, content: ICT_EMPLOYMENT_CONTRACT_TEMPLATE }));
    toast.message("ICT employment template applied", {
      description: "Review and customize before saving.",
    });
  };

  const onCeoSignatureFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Choose a PNG or JPG image.");
      return;
    }
    if (file.size > 1_500_000) {
      toast.error("Image too large (max ~1.5MB).");
      return;
    }
    try {
      const dataUrl = await readFileAsDataURL(file);
      setForm((f) => ({ ...f, ceoSignature: dataUrl }));
      toast.success("CEO signature image attached");
    } catch {
      toast.error("Could not read file");
    }
    e.target.value = "";
  };

  const copySigningLink = (token: string) => {
    if (!token?.trim()) {
      toast.error("Save the contract first to generate a signing link.");
      return;
    }
    const link = `${window.location.origin}/contract-sign/${token}`;
    void navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  const downloadPdf = async (id: string, title: string) => {
    try {
      const blob = await fetchDigitalContractPdfBlob(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contract-${title.slice(0, 40).replace(/\s+/g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded");
    } catch (e) {
      toast.error(e instanceof CmsApiError ? e.message : "PDF download failed");
    }
  };

  const signingLink = (token: string) =>
    typeof window !== "undefined"
      ? `${window.location.origin}/contract-sign/${token}`
      : "";

  const columns: ColumnDef<DigitalContract>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground dark:text-zinc-100">
          {row.original.title}
        </span>
      ),
    },
    {
      id: "kind",
      header: "Type",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={cn(
            "text-xs",
            row.original.contractKind === "employee"
              ? "border-violet-400/50 text-violet-600 dark:text-violet-300"
              : "border-emerald-400/50 text-emerald-700 dark:text-emerald-300"
          )}
        >
          {row.original.contractKind === "employee"
            ? "Employee (ICT)"
            : "Client onboarding"}
        </Badge>
      ),
      accessorFn: (row) => row.contractKind,
    },
    {
      id: "catalogSvc",
      header: "Service basis",
      cell: ({ row }) => row.original.offeredService?.name ?? "—",
      accessorFn: (row) => row.offeredService?.name ?? "",
    },
    {
      id: "linkedProfile",
      header: "Linked profile",
      cell: ({ row }) => {
        if (row.original.contractKind === "employee") {
          return row.original.employee?.fullName ?? "—";
        }
        if (row.original.customer) {
          return customerLabel(row.original.customer);
        }
        return "—";
      },
      accessorFn: (row) =>
        row.contractKind === "employee"
          ? (row.employee?.fullName ?? "")
          : row.customer
            ? customerLabel(row.customer)
            : "",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: () => (
        <div className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-zinc-500">
          Actions
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-end gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-foreground hover:bg-muted dark:text-zinc-300 dark:hover:bg-white/10"
            title="Copy signing link"
            onClick={() => copySigningLink(row.original.shareToken ?? "")}
          >
            <Copy className="h-4 w-4" strokeWidth={1.75} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-foreground hover:bg-muted dark:text-zinc-300 dark:hover:bg-white/10"
            title="Download PDF"
            onClick={() => downloadPdf(row.original.id, row.original.title)}
          >
            <FileDown className="h-4 w-4" strokeWidth={1.75} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-[hsl(var(--brand-accent))]"
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

  const isEmployee = form.contractKind === "employee";
  const canSave =
    form.content.trim() &&
    (isEmployee
      ? !!form.title.trim() && employeePick !== NONE && !!employeePick
      : true);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground dark:text-white">
            Digital contracts
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Choose <strong>Customer</strong> for the{" "}
            <strong>Client Onboarding Agreement</strong> (PDF + signing link).
            Choose <strong>Employee</strong> for ICT employment contracts with
            CEO signatory; employees sign via the same link.
          </p>
        </div>
        <Button onClick={openCreate} className={ctaClass}>
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New contract
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={contracts}
        isLoading={isPending}
        searchPlaceholder="Search contracts…"
        emptyMessage="No contracts yet."
        pageSize={8}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-2xl"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>
              {editing ? "Edit contract" : "New contract"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div className="grid gap-3 rounded-xl border border-border/80 bg-muted/20 p-4">
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Contract type
              </Label>
              <RadioGroup
                value={form.contractKind}
                onValueChange={(v) => {
                  const kind = v === "employee" ? "employee" : "customer";
                  setForm((f) => ({
                    ...f,
                    contractKind: kind,
                    employeeId: kind === "customer" ? null : f.employeeId,
                    ...(!editing
                      ? {
                          content:
                            kind === "employee"
                              ? ICT_EMPLOYMENT_CONTRACT_TEMPLATE
                              : CLIENT_ONBOARDING_AGREEMENT_TEMPLATE,
                        }
                      : {}),
                  }));
                  if (kind === "customer") {
                    setEmployeePick(NONE);
                  } else {
                    setCustomerPick(NONE);
                  }
                }}
                disabled={!!editing}
                className="grid gap-3 sm:grid-cols-2"
              >
                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                    form.contractKind === "customer"
                      ? "border-[hsl(var(--brand-accent))] bg-[hsl(var(--brand-accent)/0.08)]"
                      : "border-border hover:bg-muted/40"
                  )}
                >
                  <RadioGroupItem value="customer" id="ck-customer" />
                  <div>
                    <div className="font-semibold text-sm">Customer</div>
                    <p className="text-xs text-muted-foreground">
                      Client Onboarding Agreement: onboarding scope,
                      responsibilities, and signatures. PDF and signing link.
                    </p>
                  </div>
                </label>
                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                    form.contractKind === "employee"
                      ? "border-violet-500/60 bg-violet-500/10"
                      : "border-border hover:bg-muted/40"
                  )}
                >
                  <RadioGroupItem value="employee" id="ck-employee" />
                  <div>
                    <div className="font-semibold text-sm">Employee (ICT)</div>
                    <p className="text-xs text-muted-foreground">
                      Employment contract: link employee, add CEO name &
                      signature, share PDF or link for employee to sign.
                    </p>
                  </div>
                </label>
              </RadioGroup>
              {editing && (
                <p className="text-xs text-muted-foreground">
                  Type cannot be changed after creation. Duplicate the contract
                  to switch flows.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={applyClientOnboardingTemplate}
              >
                Load Client Onboarding template
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={applyICTTemplate}
              >
                Load ICT employment template
              </Button>
            </div>

            <div
              className={cn(
                "grid gap-2 rounded-xl border border-border/80 bg-muted/15 p-4",
                "dark:border-white/[0.08] dark:bg-white/[0.03]"
              )}
            >
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Service basis (catalog)
              </Label>
              <p className="text-xs text-muted-foreground">
                If you pick a catalog service, a <strong>service-scope draft</strong>{" "}
                (Part A / Part B style) can replace empty body text. For standard
                onboarding, leave <strong>None</strong> and use the Client
                Onboarding template. Not legal advice—have counsel review.
              </p>
              <Select
                value={servicePick}
                onValueChange={onServicePickChange}
                disabled={!!editing}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="No catalog service selected" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>None — custom scope only</SelectItem>
                  {offeredServices
                    .filter((s) => (s.status ?? "active") !== "archived")
                    .map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} ({s.serviceCode})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {offeredServices.length === 0 && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Add services under <strong>Services</strong> to enable
                  catalog-based drafts.
                </p>
              )}
              {!!editing && (
                <p className="text-xs text-muted-foreground">
                  Service basis cannot be changed when editing; duplicate the
                  contract to re-link.
                </p>
              )}
            </div>

            {isEmployee ? (
              <div className="grid gap-2">
                <Label>Linked employee *</Label>
                <Select value={employeePick} onValueChange={onEmployeePickChange}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.fullName} ({e.employeeCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {employees.length === 0 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Add employees in HR first.
                  </p>
                )}
              </div>
            ) : (
              <div className="grid gap-2">
                <Label>Linked customers (optional)</Label>
                <p className="text-xs text-muted-foreground">
                  Associate this agreement with a record from your customer
                  register. Counterparty fields below update when you pick a
                  customer.
                </p>
                <Select
                  value={customerPick}
                  onValueChange={onCustomerPickChange}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NONE}>None</SelectItem>
                    {customers.map((cust) => (
                      <SelectItem key={cust.id} value={cust.id}>
                        {customerLabel(cust)} ({cust.customerCode})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {customers.length === 0 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Add customers in the Customers section to enable linking.
                  </p>
                )}
              </div>
            )}

            {isEmployee && (
              <div className="grid gap-2">
                <Label htmlFor="ct-title">Title *</Label>
                <Input
                  id="ct-title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="rounded-xl"
                  placeholder="e.g. Employment agreement — ICT role"
                />
              </div>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="ct-party">Counterparty name</Label>
                <Input
                  id="ct-party"
                  value={form.partyName ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, partyName: e.target.value }))
                  }
                  className="rounded-xl"
                  placeholder={
                    isEmployee ? "Usually same as employee" : "Client / company"
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ct-email">Counterparty email</Label>
                <Input
                  id="ct-email"
                  type="email"
                  value={form.partyEmail ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, partyEmail: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
            </div>

            {isEmployee && (
              <div className="grid gap-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-violet-200">
                  CEO / company signatory
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ct-ceo">CEO name (or authorized officer)</Label>
                  <Input
                    id="ct-ceo"
                    value={form.ceoName ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, ceoName: e.target.value }))
                    }
                    className="rounded-xl"
                    placeholder="Printed name on agreement"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ct-ceosig">CEO signature image</Label>
                  <Input
                    id="ct-ceosig"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="cursor-pointer rounded-xl text-sm"
                    onChange={onCeoSignatureFile}
                  />
                  {form.ceoSignature && (
                    <div className="flex items-center gap-3">
                      <img
                        src={form.ceoSignature}
                        alt="CEO signature preview"
                        className="h-14 max-w-[180px] rounded border border-border object-contain bg-white p-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setForm((f) => ({ ...f, ceoSignature: "" }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status ?? "draft"}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ct-body">Contract text *</Label>
              <p className="text-xs text-muted-foreground">
                Replace bracketed placeholders (addresses, dates, fees). For
                catalog-based service scope drafts, Part A/B wording may differ.
              </p>
              <Textarea
                id="ct-body"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                className={cn(
                  "min-h-[320px] rounded-xl border-border/80",
                  "font-sans text-[15px] leading-[1.7] tracking-[0.01em]",
                  "text-foreground placeholder:text-muted-foreground/70"
                )}
                placeholder="Terms and conditions…"
              />
            </div>

            {editing?.shareToken && (
              <div className="grid gap-2 rounded-xl border border-border/80 bg-muted/15 p-3">
                <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Link2 className="h-3.5 w-3.5" />
                  Signing link (share)
                </Label>
                <Input
                  readOnly
                  value={signingLink(editing.shareToken)}
                  className="font-mono text-xs"
                  onFocus={(e) => e.target.select()}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-fit"
                  onClick={() => copySigningLink(editing.shareToken)}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy link
                </Button>
              </div>
            )}
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
            <AlertDialogTitle>Delete contract?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
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
