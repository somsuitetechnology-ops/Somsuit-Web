"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
  cmsApi,
  CmsApiError,
  type Project,
  type ProjectUpsertBody,
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

const filterSelectClass =
  "h-10 w-full min-w-[200px] rounded-xl dark:border-white/10 dark:bg-[hsl(var(--card))]";

const DEFAULT_COVER_PLACEHOLDER =
  "https://placehold.co/800x450/e8e4f0/6b21d8?text=Project";

function parseUrlLines(raw: string): string[] {
  return raw
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseTags(raw: string): string[] {
  return raw
    .split(/[,;\n]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function ProjectsPage() {
  const qc = useQueryClient();
  const { data: categories = [] } = useQuery({
    queryKey: ["cms", "categories"],
    queryFn: () => cmsApi.listCategories(),
  });
  const { data = [], isPending, error } = useQuery({
    queryKey: ["cms", "projects"],
    queryFn: () => cmsApi.listProjects(),
  });

  const [categoryFilter, setCategoryFilter] = useState<string>("__all__");

  const filteredData = useMemo(() => {
    if (categoryFilter === "__all__") return data;
    return data.filter((p) => p.categoryId === categoryFilter);
  }, [data, categoryFilter]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [galleryUrlsRaw, setGalleryUrlsRaw] = useState("");
  const [tagsRaw, setTagsRaw] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [badge, setBadge] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const saveMu = useMutation({
    mutationFn: async () => {
      const body: ProjectUpsertBody = {
        name: name.trim(),
        description: description.trim(),
        coverImage: coverImage.trim() || DEFAULT_COVER_PLACEHOLDER,
        galleryImages: parseUrlLines(galleryUrlsRaw),
        tags: parseTags(tagsRaw),
        categoryId,
        projectLink: projectLink.trim(),
        badge: badge.trim(),
        iconUrl: iconUrl.trim(),
        displayType: displayType.trim(),
      };
      if (editing) {
        return cmsApi.updateProject(editing.id, body);
      }
      return cmsApi.createProject(body);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", "projects"] });
      toast.success(editing ? "Project updated" : "Project created");
      setDialogOpen(false);
      setEditing(null);
      resetForm();
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Save failed");
    },
  });

  const deleteMu = useMutation({
    mutationFn: (id: string) => cmsApi.deleteProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms"] });
      toast.success("Project deleted");
      setDeleteId(null);
    },
    onError: (e) => {
      toast.error(e instanceof CmsApiError ? e.message : "Delete failed");
    },
  });

  function resetForm() {
    setName("");
    setDescription("");
    setCoverImage("");
    setGalleryUrlsRaw("");
    setTagsRaw("");
    setProjectLink("");
    setBadge("");
    setIconUrl("");
    setDisplayType("");
    setCategoryId(categories[0]?.id ?? "");
  }

  const openCreate = () => {
    setEditing(null);
    resetForm();
    if (categories.length && !categoryId) setCategoryId(categories[0].id);
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setName(p.name);
    setDescription(p.description);
    setCoverImage(p.coverImage || p.image || "");
    setGalleryUrlsRaw((p.galleryImages ?? []).join("\n"));
    setTagsRaw((p.tags ?? []).join(", "));
    setProjectLink(p.projectLink ?? "");
    setBadge(p.badge ?? "");
    setIconUrl(p.iconUrl ?? "");
    setDisplayType(p.displayType ?? "");
    setCategoryId(p.categoryId);
    setDialogOpen(true);
  };

  const columns: ColumnDef<Project>[] = [
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
      id: "categoryName",
      accessorFn: (row) => row.category?.name ?? "—",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground dark:text-zinc-400">
          {row.original.category?.name ?? "—"}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => (
        <span className="hidden max-w-md truncate text-muted-foreground dark:text-zinc-500 md:inline">
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
    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
      <SelectTrigger className={filterSelectClass}>
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all__">All categories</SelectItem>
        {categories.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground dark:text-white">
            Projects
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground dark:text-zinc-400">
            Each project belongs to a category and can have many service
            requests.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className={ctaClass}
          disabled={categories.length === 0}
        >
          <Plus className="mr-2 h-4 w-4" strokeWidth={1.75} />
          New project
        </Button>
      </div>

      {categories.length === 0 && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Create at least one category before adding projects.
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">{(error as Error).message}</p>
      )}

      <DashboardDataTable
        columns={columns}
        data={filteredData}
        isLoading={isPending}
        searchPlaceholder="Search name, category, description…"
        toolbarRight={filterToolbar}
        emptyMessage={
          data.length === 0
            ? "No projects yet."
            : "No projects match your filters."
        }
        pageSize={8}
        resetPaginationKey={categoryFilter}
      />

      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetContent
          side="right"
          className="flex h-full w-full flex-col gap-0 border-l p-0 sm:max-w-lg"
        >
          <SheetHeader className="space-y-1 border-b px-6 pb-4 pr-14 pt-6 text-left">
            <SheetTitle>{editing ? "Edit project" : "New project"}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-name">Name</Label>
                <Input
                  id="p-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-desc">Description</Label>
                <Textarea
                  id="p-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-cover">Cover image URL</Label>
                <Input
                  id="p-cover"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://… (shown on portfolio card)"
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use a placeholder image when saving.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-gallery">Gallery image URLs</Label>
                <Textarea
                  id="p-gallery"
                  value={galleryUrlsRaw}
                  onChange={(e) => setGalleryUrlsRaw(e.target.value)}
                  rows={4}
                  placeholder={"One URL per line\nhttps://…\nhttps://…"}
                  className="rounded-xl font-mono text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-tags">Tags</Label>
                <Input
                  id="p-tags"
                  value={tagsRaw}
                  onChange={(e) => setTagsRaw(e.target.value)}
                  placeholder="ERP, Enterprise, Cloud"
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-link">Project link (Visit button)</Label>
                <Input
                  id="p-link"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="https://example.com"
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-badge">Badge (top-right pill)</Label>
                <Input
                  id="p-badge"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="ERP System"
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-icon">Icon image URL</Label>
                <Input
                  id="p-icon"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="Optional — small circle on card"
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-display">Display type (footer label)</Label>
                <Input
                  id="p-display"
                  value={displayType}
                  onChange={(e) => setDisplayType(e.target.value)}
                  placeholder="Website, Mobile App, ERP System…"
                  className="rounded-xl"
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
              disabled={!name.trim() || !categoryId || saveMu.isPending}
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
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              All requests under this project will be removed.
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
