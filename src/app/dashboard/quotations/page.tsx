"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  cmsApi,
  CmsApiError,
  fetchQuotationPdfBlob,
  type Quotation,
  type QuotationLineInput,
  type QuotationUpsertBody,
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
import { Eye, FileDown, Plus, Pencil, Trash2, MinusCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DashboardDataTable } from "@/components/dashboard/DashboardDataTable";
import { DataTableColumnHeader } from "@/components/dashboard/DataTableColumnHeader";

const ctaClass = cn(
  "rounded-xl font-semibold shadow-md transition-all",
  "bg-primary text-primary-foreground hover:bg-primary/90",
  "dark:bg-[hsl(var(--brand-accent))] dark:text-[hsl(var(--brand-primary))] dark:hover:bg-[hsl(var(--primary-hover))] dark:shadow-[0_0_24px_-8px_hsl(var(--brand-accent)/0.45)]"
);

function emptyLine(): QuotationLineInput {
  return { description: "", quantity: 1, unitPrice: 0 };
}

function emptyForm() {
  return {
    customerName: "",
    customerEmail: "",
    customerCompany: "",
    customerAddress: "",
    taxPercent: 0,
    validUntilStr: "",
    status: "draft",
    notes: "",
    lines: [emptyLine()] as QuotationLineInput[],
  };
}

function toDateInput(iso?: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export default function QuotationsPage() {
  const qc = useQueryClient();
  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "quotations"],
    queryFn: () => cmsApi.listQuotations(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Quotation | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pdfBusy, setPdfBusy] = useState<{
    id: string;
    op: "view" | "download";
  } | null>(null);

  const isPdfBusy = (id: string) => pdfBusy?.id === id;

  const saveMu = useMutation({
    mutationFn: async () => {
      const lines = form.lines.filter(
        (l) => l.description.trim() && l.quantity > 0 && l.unitPrice >= 0
      );
      const body: QuotationUpsertBody = {
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim() || undefined,
        customerCompany: form.customerCompany.trim() || undefined,
        customerAddress: form.customerAddress.trim() || undefined,
        taxPercent: form.taxPercent,
        validUntil: form.validUntilStr.trim()
          ? form.validUntilStr.trim()
          : null,
        status: form.status,
        notes: form.notes.trim() || undefined,
        lines,
      };
      if (lines.length === 0) {
        throw new Error("Add at least one line item with description and quantity.");
      }
      if (editing) {
        return cmsApi.updateQuotation(editing.id, body);
      }
      return cmsApi.createQuotation(body);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "quotations"] });
      toast.success(editing ? "Quotation updated" : "Quotation created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
    },
    onError: (e) => {
      toast.error(
        e instanceof CmsApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : "Save failed"
      );
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteQuotation(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "quotations"] });
      toast.success("Quotation deleted");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  const viewPdf = async (q: Quotation) => {
    setPdfBusy({ id: q.id, op: "view" });
    try {
      const blob = await fetchQuotationPdfBlob(q.id);
      const url = URL.createObjectURL(blob);
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) {
        URL.revokeObjectURL(url);
        toast.error("Pop-up blocked. Allow pop-ups to view the PDF.");
        return;
      }
      toast.success("PDF opened in a new tab");
      window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
    } catch (e) {
      toast.error(e instanceof CmsApiError ? e.message : "Could not open PDF");
    } finally {
      setPdfBusy(null);
    }
  };

  const downloadPdf = async (q: Quotation) => {
    setPdfBusy({ id: q.id, op: "download" });
    try {
      const blob = await fetchQuotationPdfBlob(q.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quotation-${q.quoteNumber.replace(/\//g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded");
    } catch (e) {
      toast.error(e instanceof CmsApiError ? e.message : "PDF download failed");
    } finally {
      setPdfBusy(null);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (q: Quotation) => {
    setEditing(q);
    setForm({
      customerName: q.customerName,
      customerEmail: q.customerEmail ?? "",
      customerCompany: q.customerCompany ?? "",
      customerAddress: q.customerAddress ?? "",
      taxPercent: q.taxPercent ?? 0,
      validUntilStr: toDateInput(q.validUntil),
      status: q.status ?? "draft",
      notes: q.notes ?? "",
      lines:
        q.lines && q.lines.length > 0
          ? q.lines.map((l) => ({
              description: l.description,
              quantity: l.quantity,
              unitPrice: l.unitPrice,
            }))
          : [emptyLine()],
    });
    setDialogOpen(true);
  };

  const updateLine = (
    i: number,
    patch: Partial<QuotationLineInput>
  ) => {
    setForm((f) => ({
      ...f,
      lines: f.lines.map((l, j) => (j === i ? { ...l, ...patch } : l)),
    }));
  };

  const columns: ColumnDef<Quotation>[] = [
    {
      accessorKey: "quoteNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quote #" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm font-medium text-foreground dark:text-zinc-100">
          {row.original.quoteNumber}
        </span>
      ),
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
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
        <div className="flex flex-wrap justify-end gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-lg"
            title="View PDF in new tab"
            disabled={isPdfBusy(row.original.id)}
            onClick={() => viewPdf(row.original)}
          >
            <Eye className="mr-1 h-3.5 w-3.5" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-lg"
            title="Download PDF"
            disabled={isPdfBusy(row.original.id)}
            onClick={() => downloadPdf(row.original)}
          >
            <FileDown className="mr-1 h-3.5 w-3.5" />
            PDF
          </Button>
          <Button
            variant="ghost"
            size="icon"
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
            Quotations
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Build quotes with line items; view or download a branded PDF (logo
            and company details from server env).
          </p>
        </div>
        <Button onClick={openCreate} className={ctaClass}>
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New quotation
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        searchPlaceholder="Search quote # or customer…"
        emptyMessage="No quotations yet."
        pageSize={8}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-xl"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>
              {editing ? `Edit ${editing.quoteNumber}` : "New quotation"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div className="grid gap-2">
              <Label htmlFor="q-customer">Customer name *</Label>
              <Input
                id="q-customer"
                value={form.customerName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customerName: e.target.value }))
                }
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="q-email">Email</Label>
                <Input
                  id="q-email"
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, customerEmail: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q-co">Company</Label>
                <Input
                  id="q-co"
                  value={form.customerCompany}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, customerCompany: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="q-addr">Customer address</Label>
              <Textarea
                id="q-addr"
                value={form.customerAddress}
                onChange={(e) =>
                  setForm((f) => ({ ...f, customerAddress: e.target.value }))
                }
                className="rounded-xl"
                rows={2}
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="q-tax">Tax %</Label>
                <Input
                  id="q-tax"
                  type="number"
                  min={0}
                  step="0.1"
                  value={form.taxPercent}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      taxPercent: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="q-valid">Valid until</Label>
                <Input
                  id="q-valid"
                  type="date"
                  value={form.validUntilStr}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, validUntilStr: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Line items *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() =>
                    setForm((f) => ({ ...f, lines: [...f.lines, emptyLine()] }))
                  }
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add line
                </Button>
              </div>
              {form.lines.map((line, i) => (
                <div
                  key={i}
                  className="grid gap-2 rounded-xl border border-border p-3 dark:border-white/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Line {i + 1}
                    </span>
                    {form.lines.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-destructive"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            lines: f.lines.filter((_, j) => j !== i),
                          }))
                        }
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Description"
                    value={line.description}
                    onChange={(e) =>
                      updateLine(i, { description: e.target.value })
                    }
                    className="rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <Label className="text-xs">Qty</Label>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={line.quantity || ""}
                        onChange={(e) =>
                          updateLine(i, {
                            quantity: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs">Unit price</Label>
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={line.unitPrice || ""}
                        onChange={(e) =>
                          updateLine(i, {
                            unitPrice: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="q-notes">Notes</Label>
              <Textarea
                id="q-notes"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="rounded-xl"
                rows={2}
              />
            </div>
          </div>
          <SheetFooter className="flex flex-col gap-2 border-t bg-muted/30 px-6 py-4 sm:flex-row sm:flex-wrap sm:justify-end">
            {editing && (
              <div className="flex w-full flex-col gap-2 sm:mr-auto sm:w-auto sm:flex-row">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full rounded-xl sm:w-auto"
                  disabled={isPdfBusy(editing.id)}
                  onClick={() => viewPdf(editing)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View PDF
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full rounded-xl sm:w-auto"
                  disabled={isPdfBusy(editing.id)}
                  onClick={() => downloadPdf(editing)}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            )}
            <div className="flex w-full justify-end gap-2 sm:w-auto">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => saveMu.mutate()}
                disabled={!form.customerName.trim() || saveMu.isPending}
                className={ctaClass}
              >
                {saveMu.isPending ? "Saving…" : "Save"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete quotation?</AlertDialogTitle>
            <AlertDialogDescription>
              Line items will be removed with the quote.
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
