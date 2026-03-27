"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          "text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-zinc-500",
          className
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn(
        "-ml-2 h-8 gap-1 px-2 text-xs font-semibold uppercase tracking-wider",
        "text-muted-foreground hover:text-foreground dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-[hsl(var(--brand-accent))]",
        className
      )}
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === "asc")
      }
    >
      {title}
      {column.getIsSorted() === "desc" ? (
        <ArrowDown className="h-3.5 w-3.5" />
      ) : column.getIsSorted() === "asc" ? (
        <ArrowUp className="h-3.5 w-3.5" />
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
      )}
    </Button>
  );
}
