"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { cmsApi, CmsApiError, type Category } from "@/lib/cms-api";
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

export default function CategoriesPage() {
  const qc = useQueryClient();
  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "categories"],
    queryFn: () => cmsApi.listCategories(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      if (editing) {
        return cmsApi.updateCategory(editing.id, { name });
      }
      return cmsApi.createCategory({ name });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "categories"] });
      qc.invalidateQueries({ queryKey: ["cms", "projects"] });
      toast.success(editing ? "Category updated" : "Category created");
      setDialogOpen(false);
      setEditing(null);
      setName("");
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms"] });
      toast.success("Category deleted");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  const openCreate = () => {
    setEditing(null);
    setName("");
    setDialogOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setName(c.name);
    setDialogOpen(true);
  };

  const columns: ColumnDef<Category>[] = [
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
            Categories
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Categories group your projects. Deleting a category removes its
            projects and requests (cascade).
          </p>
        </div>
        <Button onClick={openCreate} className={ctaClass}>
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New category
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {(error as Error).message}
        </p>
      )}

      <DashboardDataTable
        columns={columns}
        data={data}
        isLoading={isPending}
        searchPlaceholder="Search categories by name…"
        emptyMessage="No categories yet. Create one to get started."
        pageSize={8}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-md"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>
              {editing ? "Edit category" : "New category"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid gap-2">
              <Label htmlFor="cat-name">Name</Label>
              <Input
                id="cat-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Enterprise Software"
                className="rounded-xl"
              />
            </div>
          </div>
          <SheetFooter className="flex-row justify-end gap-2 border-t bg-muted/30 px-6 py-4 sm:justify-end">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => saveMu.mutate()}
              disabled={!name.trim() || saveMu.isPending}
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
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all projects and requests in this category.
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
