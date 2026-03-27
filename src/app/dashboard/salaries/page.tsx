"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  cmsApi,
  CmsApiError,
  type SalaryRecord,
  type SalaryInput,
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
import { Checkbox } from "@/components/ui/checkbox";
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

const ALL = "__all__";

function emptyForm(): SalaryInput {
  return {
    employeeId: "",
    amount: 0,
    currency: "USD",
    period: "",
    paid: false,
    notes: "",
  };
}

export default function SalariesPage() {
  const qc = useQueryClient();
  const [filterEmp, setFilterEmp] = useState<string>(ALL);

  const { data: employees = [] } = useQuery({
    queryKey: ["cms", "employees"],
    queryFn: () => cmsApi.listEmployees(),
  });

  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "salaries", filterEmp],
    queryFn: () =>
      cmsApi.listSalaries(filterEmp === ALL ? undefined : filterEmp),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SalaryRecord | null>(null);
  const [form, setForm] = useState<SalaryInput>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      if (editing) {
        return cmsApi.updateSalary(editing.id, form);
      }
      return cmsApi.createSalary(form);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "salaries"] });
      toast.success(editing ? "Salary updated" : "Salary recorded");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteSalary(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "salaries"] });
      toast.success("Record deleted");
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

  const openEdit = (r: SalaryRecord) => {
    setEditing(r);
    setForm({
      employeeId: r.employeeId,
      amount: r.amount,
      currency: r.currency ?? "USD",
      period: r.period,
      paid: r.paid ?? false,
      notes: r.notes ?? "",
    });
    setDialogOpen(true);
  };

  const columns: ColumnDef<SalaryRecord>[] = [
    {
      id: "employee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employee" />
      ),
      accessorFn: (row) => row.employee?.fullName ?? row.employeeId,
      cell: ({ row }) => (
        <span className="font-medium text-foreground dark:text-zinc-100">
          {row.original.employee?.fullName ?? row.original.employeeId}
        </span>
      ),
    },
    {
      accessorKey: "period",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Period" />
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const cur = row.original.currency ?? "USD";
        return `${cur} ${row.original.amount.toFixed(2)}`;
      },
    },
    {
      accessorKey: "paid",
      header: "Paid",
      cell: ({ row }) => (row.original.paid ? "Yes" : "No"),
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
            Salaries
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Payroll-style entries per employee and period (e.g. 2025-03).
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={filterEmp} onValueChange={setFilterEmp}>
            <SelectTrigger className="w-full rounded-xl sm:w-[220px]">
              <SelectValue placeholder="Filter employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All employees</SelectItem>
              {employees.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={openCreate} className={ctaClass}>
            <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
            New salary
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        searchPlaceholder="Search period or employee…"
        emptyMessage="No salary records yet."
        pageSize={8}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-md"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>
              {editing ? "Edit salary" : "New salary"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div className="grid gap-2">
              <Label>Employee *</Label>
              <Select
                value={form.employeeId}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, employeeId: v }))
                }
                disabled={!!editing}
              >
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
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sal-period">Period * (e.g. 2025-03)</Label>
              <Input
                id="sal-period"
                value={form.period}
                onChange={(e) =>
                  setForm((f) => ({ ...f, period: e.target.value }))
                }
                className="rounded-xl"
                placeholder="2025-03"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="sal-amt">Amount *</Label>
                <Input
                  id="sal-amt"
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.amount || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      amount: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sal-cur">Currency</Label>
                <Input
                  id="sal-cur"
                  value={form.currency ?? "USD"}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, currency: e.target.value }))
                  }
                  className="rounded-xl"
                  placeholder="USD"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="sal-paid"
                checked={form.paid ?? false}
                onCheckedChange={(c) =>
                  setForm((f) => ({ ...f, paid: c === true }))
                }
              />
              <Label htmlFor="sal-paid" className="font-normal">
                Mark as paid
              </Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sal-notes">Notes</Label>
              <Textarea
                id="sal-notes"
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
              disabled={
                !form.employeeId ||
                !form.period.trim() ||
                form.amount < 0 ||
                saveMu.isPending
              }
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
            <AlertDialogTitle>Delete salary record?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the payroll entry only.
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
