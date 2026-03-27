"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DashboardDataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  toolbarRight?: React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
  getRowId?: (originalRow: TData, index: number) => string;
  /** When this value changes, pagination resets to page 1 (e.g. external filters). */
  resetPaginationKey?: string | number;
};

export function DashboardDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  searchPlaceholder = "Search table…",
  toolbarRight,
  emptyMessage = "No rows to display.",
  pageSize = 8,
  getRowId,
  resetPaginationKey,
}: DashboardDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize,
  });

  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [globalFilter, resetPaginationKey]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      if (!filterValue) return true;
      const q = String(filterValue).toLowerCase();
      return row.getVisibleCells().some((cell) => {
        if (cell.column.id === "actions") return false;
        const v = cell.getValue();
        if (v == null) return false;
        return String(v).toLowerCase().includes(q);
      });
    },
    getRowId:
      getRowId ??
      ((row, i) => {
        const r = row as { id?: string };
        return r.id ?? String(i);
      }),
  });

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-lg",
        "border-border bg-card",
        "dark:border-white/[0.08] dark:bg-[hsl(var(--card))]/90 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_24px_64px_-32px_rgba(0,0,0,0.75)]"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
          "border-border dark:border-white/[0.06] dark:bg-white/[0.02]"
        )}
      >
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground dark:text-zinc-500"
            strokeWidth={1.75}
          />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className={cn(
              "h-10 rounded-xl border pl-9",
              "bg-background dark:border-white/10 dark:bg-[hsl(var(--card))] dark:placeholder:text-zinc-500",
              "focus-visible:ring-[hsl(var(--brand-accent)/0.35)]"
            )}
          />
        </div>
        {toolbarRight ? (
          <div className="flex flex-wrap items-center gap-2">{toolbarRight}</div>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="border-b dark:border-white/[0.06] hover:bg-transparent"
              >
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-12 bg-muted/40 dark:bg-white/[0.03] dark:text-zinc-400"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground dark:text-zinc-500"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[hsl(var(--brand-accent)/0.3)] border-t-[hsl(var(--brand-accent))]" />
                    <span className="text-sm">Loading…</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground dark:text-zinc-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "border-b transition-colors dark:border-white/[0.05]",
                    "dark:hover:bg-white/[0.04]",
                    i % 2 === 1 && "dark:bg-white/[0.015]"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-3.5 align-middle dark:text-zinc-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div
        className={cn(
          "flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
          "border-border dark:border-white/[0.06] dark:bg-black/20"
        )}
      >
        <p className="text-xs text-muted-foreground dark:text-zinc-500">
          {isLoading
            ? "—"
            : `${table.getFilteredRowModel().rows.length} row(s) · Page ${pageIndex + 1} of ${Math.max(pageCount, 1)}`}
        </p>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg dark:border-white/10 dark:bg-transparent dark:hover:bg-white/10"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg dark:border-white/10 dark:bg-transparent dark:hover:bg-white/10"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg dark:border-white/10 dark:bg-transparent dark:hover:bg-white/10"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg dark:border-white/10 dark:bg-transparent dark:hover:bg-white/10"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage() || isLoading}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
