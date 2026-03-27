"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  cmsApi,
  CmsApiError,
  type Employee,
  type EmployeeInput,
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

function emptyForm(): EmployeeInput {
  return {
    employeeCode: "",
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    streetAddress: "",
    city: "",
    country: "",
    hireDate: undefined,
    nationalId: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    notes: "",
    status: "active",
  };
}

function toDateInput(iso?: string): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export default function EmployeesPage() {
  const qc = useQueryClient();
  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "employees"],
    queryFn: () => cmsApi.listEmployees(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const [form, setForm] = useState<EmployeeInput>(emptyForm);
  const [hireDateStr, setHireDateStr] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      const payload: EmployeeInput = {
        ...form,
        hireDate: hireDateStr.trim()
          ? `${hireDateStr}T00:00:00Z`
          : undefined,
      };
      if (editing) {
        return cmsApi.updateEmployee(editing.id, payload);
      }
      return cmsApi.createEmployee(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "employees"] });
      toast.success(editing ? "Employee updated" : "Employee created");
      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm());
      setHireDateStr("");
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteEmployee(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms"] });
      toast.success("Employee deleted");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm());
    setHireDateStr("");
    setDialogOpen(true);
  };

  const openEdit = (e: Employee) => {
    setEditing(e);
    setForm({
      employeeCode: e.employeeCode,
      fullName: e.fullName,
      email: e.email ?? "",
      phone: e.phone ?? "",
      jobTitle: e.jobTitle ?? "",
      department: e.department ?? "",
      streetAddress: e.streetAddress ?? "",
      city: e.city ?? "",
      country: e.country ?? "",
      nationalId: e.nationalId ?? "",
      emergencyContactName: e.emergencyContactName ?? "",
      emergencyContactPhone: e.emergencyContactPhone ?? "",
      notes: e.notes ?? "",
      status: e.status ?? "active",
    });
    setHireDateStr(toDateInput(e.hireDate));
    setDialogOpen(true);
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "employeeCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground dark:text-zinc-100">
          {row.original.fullName}
        </span>
      ),
    },
    {
      accessorKey: "jobTitle",
      header: "Role",
      cell: ({ row }) => row.original.jobTitle || "—",
    },
    {
      accessorKey: "department",
      header: "Dept",
      cell: ({ row }) => row.original.department || "—",
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
            Employees
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Full staff profiles: contact, job, address, emergency contacts, and
            status.
          </p>
        </div>
        <Button onClick={openCreate} className={ctaClass}>
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New employee
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        searchPlaceholder="Search by name, code, or department…"
        emptyMessage="No employees yet."
        pageSize={8}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-lg"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>
              {editing ? "Edit employee" : "New employee"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="emp-code">Employee code *</Label>
                <Input
                  id="emp-code"
                  value={form.employeeCode}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, employeeCode: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="emp-name">Full name *</Label>
                <Input
                  id="emp-name"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fullName: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-email">Email</Label>
                <Input
                  id="emp-email"
                  type="email"
                  value={form.email ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-phone">Phone</Label>
                <Input
                  id="emp-phone"
                  value={form.phone ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-title">Job title</Label>
                <Input
                  id="emp-title"
                  value={form.jobTitle ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, jobTitle: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-dept">Department</Label>
                <Input
                  id="emp-dept"
                  value={form.department ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, department: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="emp-addr">Street address</Label>
                <Input
                  id="emp-addr"
                  value={form.streetAddress ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, streetAddress: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-city">City</Label>
                <Input
                  id="emp-city"
                  value={form.city ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, city: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-country">Country</Label>
                <Input
                  id="emp-country"
                  value={form.country ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, country: e.target.value }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-hire">Hire date</Label>
                <Input
                  id="emp-hire"
                  type="date"
                  value={hireDateStr}
                  onChange={(e) => setHireDateStr(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emp-nid">National ID</Label>
                <Input
                  id="emp-nid"
                  value={form.nationalId ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, nationalId: e.target.value }))
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
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="emp-ec-name">Emergency contact</Label>
                <Input
                  id="emp-ec-name"
                  value={form.emergencyContactName ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      emergencyContactName: e.target.value,
                    }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="emp-ec-phone">Emergency phone</Label>
                <Input
                  id="emp-ec-phone"
                  value={form.emergencyContactPhone ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      emergencyContactPhone: e.target.value,
                    }))
                  }
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="emp-notes">Notes</Label>
                <Textarea
                  id="emp-notes"
                  value={form.notes ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  className="rounded-xl"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <SheetFooter className="flex-row justify-end gap-2 border-t bg-muted/30 px-6 py-4 sm:justify-end">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => saveMu.mutate()}
              disabled={
                !form.employeeCode?.trim() ||
                !form.fullName?.trim() ||
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
            <AlertDialogTitle>Delete employee?</AlertDialogTitle>
            <AlertDialogDescription>
              Linked contracts will be unlinked; salary records for this employee
              are removed (cascade).
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
