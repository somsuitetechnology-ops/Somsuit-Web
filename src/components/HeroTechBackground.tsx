"use client";

/**
 * Layered tech background for the marketing hero — dots, grid, mesh, brand glows.
 */
export function HeroTechBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(204_42%_100%)] via-white to-[hsl(204_28%_96%)] dark:from-background dark:via-background-secondary dark:to-background" />
      {/* Animated soft mesh */}
      <div
        className="hero-mesh absolute inset-0 opacity-90 dark:opacity-70"
        aria-hidden
      />
      {/* Dot matrix */}
      <div
        className="absolute inset-0 opacity-[0.55] dark:opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at center, hsl(var(--brand-accent) / 0.14) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Tech grid + diagonal accent */}
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-multiply dark:opacity-[0.22] dark:mix-blend-soft-light"
        style={{
          backgroundImage: `
            linear-gradient(90deg, hsl(var(--brand-accent) / 0.07) 1px, transparent 1px),
            linear-gradient(hsl(var(--brand-accent) / 0.07) 1px, transparent 1px),
            linear-gradient(135deg, transparent 40%, hsl(var(--brand-accent) / 0.04) 40%, hsl(var(--brand-accent) / 0.04) 41%, transparent 41%)
          `,
          backgroundSize: "56px 56px, 56px 56px, 24px 24px",
        }}
      />
      {/* Circuit-style faint lines */}
      <svg
        viewBox="0 0 900 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2] dark:opacity-[0.12]"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-circuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--brand-accent))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--brand-accent))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--brand-accent))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 120 Q 180 80 360 140 T 720 100"
          fill="none"
          stroke="url(#hero-circuit)"
          strokeWidth="1.5"
        />
        <path
          d="M0 280 Q 220 320 440 260 T 900 300"
          fill="none"
          stroke="url(#hero-circuit)"
          strokeWidth="1"
          opacity="0.7"
        />
      </svg>
      {/* Brand glow orbs */}
      <div
        className="absolute -right-[20%] top-[8%] h-[min(520px,75vw)] w-[min(520px,75vw)] rounded-full bg-[radial-gradient(circle,hsl(var(--brand-accent)/0.18),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,hsl(var(--brand-accent)/0.22),transparent_65%)]"
        aria-hidden
      />
      <div
        className="absolute -left-[15%] bottom-[5%] h-80 w-80 rounded-full bg-[radial-gradient(circle,hsl(var(--brand-primary)/0.06),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,hsl(var(--brand-accent)/0.08),transparent_70%)]"
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-1/3 h-[min(400px,60vw)] w-[min(400px,60vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--brand-accent)/0.06),transparent_62%)] blur-[100px]"
        aria-hidden
      />
    </>
  );
}
