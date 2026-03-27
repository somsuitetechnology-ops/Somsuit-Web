"use client";

import { useQuery } from "@tanstack/react-query";
import { cmsApi } from "@/lib/cms-api";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardOverviewCharts } from "@/components/dashboard/DashboardOverviewCharts";
import {
  Tags,
  Layers3,
  ListTodo,
  AlertCircle,
  Users,
  ScrollText,
  CircleDollarSign,
  FileText,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DashboardOverviewPage() {
  const categories = useQuery({
    queryKey: ["cms", "categories"],
    queryFn: () => cmsApi.listCategories(),
  });
  const projects = useQuery({
    queryKey: ["cms", "projects"],
    queryFn: () => cmsApi.listProjects(),
  });
  const requests = useQuery({
    queryKey: ["cms", "requests"],
    queryFn: () => cmsApi.listRequests(),
  });
  const employees = useQuery({
    queryKey: ["cms", "employees"],
    queryFn: () => cmsApi.listEmployees(),
  });
  const contracts = useQuery({
    queryKey: ["cms", "digital-contracts"],
    queryFn: () => cmsApi.listDigitalContracts(),
  });
  const salaries = useQuery({
    queryKey: ["cms", "salaries", "all"],
    queryFn: () => cmsApi.listSalaries(),
  });
  const quotations = useQuery({
    queryKey: ["cms", "quotations"],
    queryFn: () => cmsApi.listQuotations(),
  });

  const err =
    categories.error ||
    projects.error ||
    requests.error ||
    employees.error ||
    contracts.error ||
    salaries.error ||
    quotations.error;
  const loading =
    categories.isPending ||
    projects.isPending ||
    requests.isPending ||
    employees.isPending ||
    contracts.isPending ||
    salaries.isPending ||
    quotations.isPending;

  const statItems = [
    {
      title: "Categories",
      value: categories.data?.length ?? 0,
      icon: Tags,
    },
    {
      title: "Projects",
      value: projects.data?.length ?? 0,
      icon: Layers3,
    },
    {
      title: "Requests",
      value: requests.data?.length ?? 0,
      icon: ListTodo,
    },
    {
      title: "Employees",
      value: employees.data?.length ?? 0,
      icon: Users,
    },
    {
      title: "Contracts",
      value: contracts.data?.length ?? 0,
      icon: ScrollText,
    },
    {
      title: "Salaries",
      value: salaries.data?.length ?? 0,
      icon: CircleDollarSign,
    },
    {
      title: "Quotations",
      value: quotations.data?.length ?? 0,
      icon: FileText,
    },
  ] as const;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="relative">
        <div
          className="pointer-events-none absolute -left-4 top-0 h-16 w-1 rounded-full bg-[hsl(var(--brand-accent))] opacity-90 shadow-[0_0_24px_hsl(var(--brand-accent)/0.55)]"
          aria-hidden
        />
        <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--brand-primary))] md:text-3xl dark:text-white">
          Overview
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[hsl(var(--brand-primary)/0.62)] md:text-base dark:text-zinc-400">
          Summary of your CMS content — branded workspace for{" "}
          <span className="font-semibold text-[hsl(var(--brand-accent-muted))] dark:text-[hsl(var(--brand-accent))]">
            Somsuite
          </span>
          .
        </p>
      </div>

      {err != null && (
        <Alert
          variant="destructive"
          className="rounded-2xl border-destructive/50"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API error</AlertTitle>
          <AlertDescription>
            {(err as Error).message}. Is the backend running and CORS allowing
            this origin?
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statItems.map((item, index) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            loading={loading}
            icon={item.icon}
            alternate={index % 2 === 1}
          />
        ))}
      </div>

      <DashboardOverviewCharts
        categories={categories.data ?? []}
        projects={projects.data ?? []}
        requests={requests.data ?? []}
        loading={loading}
      />
    </div>
  );
}
