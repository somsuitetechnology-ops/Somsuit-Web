"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { cmsApi, CmsApiError, type RequestItem } from "@/lib/cms-api";
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

const SERVICE_OPTIONS = [
  "Consulting",
  "DevOps / Hosting",
  "Development",
  "Support",
  "Design",
  "Other",
];

const ctaClass = cn(
  "rounded-xl font-semibold shadow-md transition-all",
  "bg-primary text-primary-foreground hover:bg-primary/90",
  "dark:bg-[hsl(var(--brand-accent))] dark:text-[hsl(var(--brand-primary))] dark:hover:bg-[hsl(var(--primary-hover))] dark:shadow-[0_0_24px_-8px_hsl(var(--brand-accent)/0.45)]"
);

const filterSelectClass =
  "h-10 w-full min-w-[170px] rounded-xl dark:border-white/10 dark:bg-[hsl(var(--card))]";

export default function RequestsPage() {
  const qc = useQueryClient();
  const { data: projects = [] } = useQuery({
    queryKey: ["cms", "projects"],
    queryFn: () => cmsApi.listProjects(),
  });
  const { data: offeredServices = [] } = useQuery({
    queryKey: ["cms", "offered-services"],
    queryFn: () => cmsApi.listOfferedServices(),
  });
  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "requests"],
    queryFn: () => cmsApi.listRequests(),
  });

  const servicePicklist = useMemo(() => {
    const fromCatalog = offeredServices
      .filter((o) => (o.status ?? "active") !== "archived")
      .map((o) => o.name.trim())
      .filter(Boolean);
    const fromRequests = data
      .map((r) => r.service.trim())
      .filter(Boolean);
    const merged = new Set<string>([
      ...fromCatalog,
      ...fromRequests,
      ...SERVICE_OPTIONS,
    ]);
    return [...merged].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
  }, [offeredServices, data]);

  const [serviceFilter, setServiceFilter] = useState<string>("__all__");
  const [projectFilter, setProjectFilter] = useState<string>("__all__");

  const filteredData = useMemo(() => {
    return data.filter((r) => {
      if (serviceFilter !== "__all__" && r.service !== serviceFilter) {
        return false;
      }
      if (projectFilter !== "__all__" && r.projectId !== projectFilter) {
        return false;
      }
      return true;
    });
  }, [data, serviceFilter, projectFilter]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RequestItem | null>(null);
  const [name, setName] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      const body = {
        name,
        service,
        description,
        projectId,
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
      };
      if (editing) {
        return cmsApi.updateRequest(editing.id, body);
      }
      return cmsApi.createRequest(body);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "requests"] });
      toast.success(editing ? "Request updated" : "Request created");
      setDialogOpen(false);
      setEditing(null);
      resetForm();
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteRequest(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "requests"] });
      toast.success("Request deleted");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  function resetForm() {
    setName("");
    setService(servicePicklist[0] ?? SERVICE_OPTIONS[0]);
    setDescription("");
    setProjectId(projects[0]?.id ?? "");
    setEmail("");
    setPhone("");
    setCompany("");
  }

  const openCreate = () => {
    setEditing(null);
    resetForm();
    if (projects.length && !projectId) setProjectId(projects[0].id);
    setDialogOpen(true);
  };

  const openEdit = (r: RequestItem) => {
    setEditing(r);
    setName(r.name);
    setService(r.service);
    setDescription(r.description);
    setProjectId(r.projectId);
    setEmail(r.email ?? "");
    setPhone(r.phone ?? "");
    setCompany(r.company ?? "");
    setDialogOpen(true);
  };

  const columns: ColumnDef<RequestItem>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground dark:text-zinc-100">
          {row.original.name}
        </span>
      ),
    },
    {
      accessorKey: "service",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Service" />
      ),
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium text-black",
            "border-[hsl(var(--brand-accent)/0.45)] bg-[hsl(var(--brand-accent)/0.15)]",
            "dark:border-[hsl(var(--brand-accent)/0.5)] dark:bg-[hsl(var(--brand-accent)/0.3)] dark:text-black"
          )}
        >
          {row.original.service}
        </span>
      ),
    },
    {
      id: "projectName",
      accessorFn: (row) => row.project?.name ?? "—",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Project" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground dark:text-zinc-400">
          {row.original.project?.name ?? "—"}
        </span>
      ),
    },
    {
      id: "contact",
      accessorFn: (row) => row.email ?? "",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact" />
      ),
      cell: ({ row }) => {
        const e = row.original.email?.trim();
        const ph = row.original.phone?.trim();
        if (!e && !ph) {
          return (
            <span className="text-muted-foreground dark:text-zinc-600">—</span>
          );
        }
        return (
          <span className="max-w-[140px] truncate text-xs text-muted-foreground dark:text-zinc-400">
            {[e, ph].filter(Boolean).join(" · ")}
          </span>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <span className="hidden max-w-xs truncate text-muted-foreground dark:text-zinc-500 lg:inline">
          {row.original.description}
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

  const filterToolbar = (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={serviceFilter} onValueChange={setServiceFilter}>
        <SelectTrigger className={filterSelectClass}>
          <SelectValue placeholder="Service" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All services</SelectItem>
          {servicePicklist.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={projectFilter} onValueChange={setProjectFilter}>
        <SelectTrigger className={filterSelectClass}>
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All projects</SelectItem>
          {projects.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground dark:text-white">
            Requests
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Service requests are tied to a project. Service types come from your
            Services catalog (and any legacy labels already on requests).
          </p>
        </div>
        <Button
          onClick={openCreate}
          className={ctaClass}
          disabled={projects.length === 0}
        >
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New request
        </Button>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Create at least one project before adding requests.
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={filteredData}
        isLoading={isPending}
        searchPlaceholder="Search name, service, project, notes…"
        toolbarRight={filterToolbar}
        emptyMessage={
          data.length === 0
            ? "No requests yet."
            : "No requests match your filters."
        }
        pageSize={8}
        resetPaginationKey={`${serviceFilter}-${projectFilter}`}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-lg"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>{editing ? "Edit request" : "New request"}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label>Project</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="r-name">Name</Label>
                <Input
                  id="r-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label>Service</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {servicePicklist.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="r-desc">Description</Label>
                <Textarea
                  id="r-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="r-email">Email</Label>
                <Input
                  id="r-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="rounded-xl"
                  placeholder="Optional"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="r-phone">Phone</Label>
                <Input
                  id="r-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl"
                  placeholder="Optional"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="r-company">Company</Label>
                <Input
                  id="r-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="rounded-xl"
                  placeholder="Optional"
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
                !name.trim() || !projectId || !service || saveMu.isPending
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
            <AlertDialogTitle>Delete request?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
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
