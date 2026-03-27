"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import type { Category, Project, RequestItem } from "@/lib/cms-api";

const FALLBACK_CHART = [
  "hsl(204 51% 51%)",
  "hsl(204 40% 42%)",
  "hsl(199 55% 45%)",
  "hsl(215 25% 48%)",
  "hsl(0 0% 45%)",
];

function useChartColors(): string[] {
  const [colors, setColors] = useState(FALLBACK_CHART);
  useLayoutEffect(() => {
    const root = document.documentElement;
    const next = [1, 2, 3, 4, 5].map((i) => {
      const raw = getComputedStyle(root)
        .getPropertyValue(`--chart-${i}`)
        .trim();
      return raw ? `hsl(${raw})` : FALLBACK_CHART[i - 1];
    });
    setColors(next);
  }, []);
  return colors;
}

function ChartShell({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 p-4 shadow-sm md:p-5",
        "border-[hsl(var(--brand-accent)/0.2)] bg-gradient-to-b from-white to-[hsl(var(--brand-accent)/0.03)]",
        "shadow-[0_12px_48px_-36px_hsl(var(--brand-primary)/0.25)]",
        "dark:border-white/10 dark:from-[hsl(var(--card))] dark:to-[hsl(var(--background-secondary))] dark:shadow-none",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--brand-accent)/0.55)] to-transparent opacity-80" />
      <div className="flex items-start gap-3">
        <span
          className="mt-1.5 h-6 w-1 shrink-0 rounded-full bg-[hsl(var(--brand-accent))] shadow-[0_0_12px_hsl(var(--brand-accent)/0.5)]"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold tracking-tight text-[hsl(var(--brand-primary))] dark:text-white">
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-[hsl(var(--brand-primary)/0.52)] dark:text-zinc-400">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="mt-4 h-[280px] w-full min-h-[240px] md:h-[300px]">
        {children}
      </div>
    </div>
  );
}

const tooltipStyle: React.CSSProperties = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "12px",
  fontSize: "12px",
  color: "hsl(var(--card-foreground))",
  boxShadow: "0 12px 40px -12px rgba(0,0,0,0.35)",
};

export function DashboardOverviewCharts({
  categories,
  projects,
  requests,
  loading,
}: {
  categories: Category[];
  projects: Project[];
  requests: RequestItem[];
  loading: boolean;
}) {
  const colors = useChartColors();

  const projectsByCategory = useMemo(() => {
    return categories.map((c) => {
      const n = projects.filter((p) => p.categoryId === c.id).length;
      const short = c.name.length > 12 ? `${c.name.slice(0, 11)}…` : c.name;
      return { name: short, full: c.name, count: n };
    });
  }, [categories, projects]);

  const pieData = useMemo(() => {
    if (requests.length > 0) {
      const m = new Map<string, number>();
      requests.forEach((r) => {
        m.set(r.service, (m.get(r.service) ?? 0) + 1);
      });
      return Array.from(m.entries()).map(([name, value]) => ({ name, value }));
    }
    return categories.map((c) => ({
      name: c.name.length > 16 ? `${c.name.slice(0, 15)}…` : c.name,
      value: 1,
    }));
  }, [requests, categories]);

  const radarData = useMemo(() => {
    const c = categories.length;
    const p = projects.length;
    const r = requests.length;
    const max = Math.max(c, p, r, 1) * 1.35;
    return [
      { subject: "Categories", value: c, max },
      { subject: "Projects", value: p, max },
      { subject: "Requests", value: r, max },
    ];
  }, [categories.length, projects.length, requests.length]);

  const areaData = useMemo(() => {
    const base = categories.length + projects.length + requests.length;
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return labels.map((day, i) => ({
      day,
      activity: Math.max(
        0,
        Math.round(base * (0.35 + i * 0.11) + (i % 3) * 2)
      ),
    }));
  }, [categories.length, projects.length, requests.length]);

  if (loading) {
    return (
      <div className="grid gap-5 lg:grid-cols-2">
        {[1, 2, 3, 4].map((k) => (
          <div
            key={k}
            className="h-[360px] animate-pulse rounded-2xl border-2 border-[hsl(var(--brand-accent)/0.15)] bg-[hsl(var(--brand-accent)/0.06)] dark:border-white/10 dark:bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <ChartShell
        title="Projects by category"
        subtitle="Distribution across your taxonomy"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={projectsByCategory}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              strokeOpacity={0.55}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              allowDecimals={false}
              width={36}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.12 }}
              contentStyle={tooltipStyle}
              formatter={(v: number) => [v, "Projects"]}
              labelFormatter={(_, payload) =>
                (payload?.[0]?.payload as { full?: string })?.full ??
                (payload?.[0]?.payload as { name?: string })?.name ??
                ""
              }
            />
            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              fill={colors[0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell
        title={
          requests.length ? "Requests by service" : "Category footprint"
        }
        subtitle={
          requests.length
            ? "Volume per service type"
            : "Placeholder split until requests exist"
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={88}
              paddingAngle={2}
              stroke="hsl(var(--background))"
              strokeWidth={2}
            >
              {pieData.map((_, i) => (
                <Cell
                  key={i}
                  fill={colors[i % colors.length]}
                  className="outline-none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: number, n: string) => [v, n]}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell
        title="Entity balance"
        subtitle="Categories, projects, and requests at a glance"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="75%"
            data={radarData}
          >
            <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.6} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, radarData[0]?.max ?? 10]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Count"
              dataKey="value"
              stroke={colors[1]}
              fill={colors[1]}
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartShell>

      <ChartShell
        title="Activity rhythm"
        subtitle="Trend from current totals (illustrative)"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={areaData}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
          >
            <defs>
              <linearGradient id="dashAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[2]} stopOpacity={0.45} />
                <stop offset="100%" stopColor={colors[2]} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              strokeOpacity={0.45}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              width={36}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="activity"
              stroke={colors[2]}
              strokeWidth={2.5}
              fill="url(#dashAreaFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartShell>
    </div>
  );
}
