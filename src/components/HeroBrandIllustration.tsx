"use client";

/**
 * Cartoon tech hero art — Somsuite brand (#4191c3 / #1d1d1d). Inline SVG, no external assets.
 */
export function HeroBrandIllustration() {
  return (
    <div className="hero-illustration-float relative mx-auto w-full max-w-[min(100%,520px)] select-none">
      <div
        className="pointer-events-none absolute -inset-10 rounded-[45%] bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-accent)/0.2),transparent_70%)] blur-3xl dark:bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-accent)/0.16),transparent_72%)]"
        aria-hidden
      />

      <svg
        viewBox="0 0 520 408"
        className="relative z-[1] h-auto w-full drop-shadow-[0_24px_56px_-16px_hsl(var(--brand-accent)/0.4)]"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Somsuite cartoon technology illustration"
      >
        <defs>
          <linearGradient id="hb-cart-brand" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(204 55% 58%)" />
            <stop offset="50%" stopColor="hsl(204 51% 51%)" />
            <stop offset="100%" stopColor="hsl(204 45% 42%)" />
          </linearGradient>
          <linearGradient id="hb-cart-brand-soft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(204 55% 62%)" />
            <stop offset="100%" stopColor="hsl(204 48% 48%)" />
          </linearGradient>
          <linearGradient id="hb-cart-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(0 0% 22%)" />
            <stop offset="100%" stopColor="hsl(0 0% 11%)" />
          </linearGradient>
          <linearGradient id="hb-cart-screen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(204 45% 96%)" />
            <stop offset="100%" stopColor="hsl(204 35% 90%)" />
          </linearGradient>
          <filter id="hb-cart-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="hsl(204 51% 51%)" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Ground glow */}
        <ellipse
          cx="260"
          cy="360"
          rx="210"
          ry="28"
          fill="hsl(var(--brand-accent))"
          opacity="0.12"
        />

        {/* Sparkles */}
        {[
          [64, 72, 14],
          [448, 56, 11],
          [92, 300, 10],
          [420, 280, 12],
        ].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path
              d={`M0 ${-s} L${s * 0.35} ${-s * 0.35} L${s} 0 L${s * 0.35} ${s * 0.35} L0 ${s} L${-s * 0.35} ${s * 0.35} L${-s} 0 L${-s * 0.35} ${-s * 0.35} Z`}
              fill="hsl(var(--brand-accent))"
              opacity={0.45 + i * 0.08}
            />
          </g>
        ))}

        {/* Wavy connection cables (cartoon) */}
        <path
          d="M 92 248 Q 160 200 220 230 Q 280 260 340 220"
          fill="none"
          stroke="url(#hb-cart-brand)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M 380 248 Q 320 290 260 265 Q 200 240 145 275"
          fill="none"
          stroke="hsl(var(--brand-accent))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 10"
          opacity="0.4"
        />

        {/* —— Laptop (cartoon) —— */}
        <g filter="url(#hb-cart-shadow)">
          <rect x="48" y="218" width="168" height="12" rx="4" fill="url(#hb-cart-dark)" />
          <path
            d="M 56 218 L 72 248 L 192 248 L 208 218 Z"
            fill="hsl(0 0% 18%)"
            stroke="hsl(var(--brand-accent))"
            strokeWidth="2"
            strokeOpacity="0.35"
          />
          <rect
            x="58"
            y="128"
            width="176"
            height="102"
            rx="14"
            fill="url(#hb-cart-dark)"
            stroke="hsl(var(--brand-accent))"
            strokeWidth="3"
          />
          <rect
            x="68"
            y="138"
            width="156"
            height="78"
            rx="8"
            fill="url(#hb-cart-screen)"
            stroke="hsl(var(--brand-accent))"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />
          {/* Screen: happy chart */}
          <path
            d="M 88 198 L 108 182 L 132 190 L 158 158 L 182 168 L 208 148"
            fill="none"
            stroke="url(#hb-cart-brand)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="208" cy="148" r="5" fill="hsl(var(--brand-accent))" />
          {/* Smiley on screen */}
          <circle cx="118" cy="168" r="4" fill="hsl(0 0% 11%)" />
          <circle cx="178" cy="168" r="4" fill="hsl(0 0% 11%)" />
          <path
            d="M 128 186 Q 148 198 168 186"
            fill="none"
            stroke="hsl(0 0% 11%)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* —— Kawaii cloud (cartoon) —— */}
        <g>
          <ellipse cx="260" cy="118" rx="92" ry="48" fill="url(#hb-cart-brand-soft)" opacity="0.95" />
          <ellipse cx="200" cy="128" rx="52" ry="44" fill="url(#hb-cart-brand-soft)" opacity="0.95" />
          <ellipse cx="318" cy="128" rx="54" ry="44" fill="url(#hb-cart-brand-soft)" opacity="0.95" />
          <ellipse cx="238" cy="98" rx="44" ry="38" fill="url(#hb-cart-brand-soft)" opacity="0.98" />
          <ellipse cx="288" cy="98" rx="42" ry="36" fill="url(#hb-cart-brand-soft)" opacity="0.98" />
          {/* Cloud shine */}
          <ellipse cx="230" cy="108" rx="22" ry="12" fill="white" opacity="0.35" />
          {/* Eyes */}
          <ellipse cx="228" cy="120" rx="10" ry="12" fill="white" stroke="hsl(0 0% 11%)" strokeWidth="2" />
          <ellipse cx="292" cy="120" rx="10" ry="12" fill="white" stroke="hsl(0 0% 11%)" strokeWidth="2" />
          <circle cx="232" cy="122" r="5" fill="hsl(0 0% 11%)" />
          <circle cx="296" cy="122" r="5" fill="hsl(0 0% 11%)" />
          <circle cx="234" cy="120" r="2" fill="white" />
          <circle cx="298" cy="120" r="2" fill="white" />
          {/* Smile */}
          <path
            d="M 232 148 Q 260 168 288 148"
            fill="none"
            stroke="hsl(0 0% 11%)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Rosy cheeks */}
          <circle cx="210" cy="138" r="8" fill="hsl(350 80% 75%)" opacity="0.55" />
          <circle cx="310" cy="138" r="8" fill="hsl(350 80% 75%)" opacity="0.55" />
        </g>

        {/* —— Shield badge —— */}
        <g transform="translate(352 168)">
          <path
            d="M 52 8 C 52 8 8 28 8 52 L 8 88 C 8 108 52 132 52 132 C 52 132 96 108 96 88 L 96 52 C 96 28 52 8 52 8 Z"
            fill="url(#hb-cart-brand)"
            stroke="white"
            strokeWidth="4"
            filter="url(#hb-cart-shadow)"
          />
          <path
            d="M 32 70 L 48 88 L 76 50"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.98"
          />
          <circle cx="52" cy="68" r="24" fill="none" stroke="white" strokeWidth="2.5" opacity="0.35" />
        </g>

        {/* —— Server stack (cute blocks) —— */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(350 ${302 + i * 32})`}>
            <rect
              x="0"
              y="0"
              width="112"
              height="28"
              rx="10"
              fill={i % 2 === 0 ? "url(#hb-cart-dark)" : "hsl(0 0% 16%)"}
              stroke="hsl(var(--brand-accent))"
              strokeWidth="2"
            />
            <rect x="12" y="9" width="36" height="10" rx="3" fill="hsl(var(--brand-accent))" opacity="0.85" />
            <circle cx="92" cy="14" r="4" fill="hsl(142 60% 48%)" />
            <circle cx="78" cy="14" r="3" fill="hsl(var(--brand-accent))" opacity="0.5" />
          </g>
        ))}

        {/* Floating orbs */}
        <circle cx="72" cy="168" r="9" fill="hsl(var(--brand-accent))" opacity="0.55" />
        <circle cx="468" cy="188" r="7" fill="hsl(var(--brand-accent))" opacity="0.45" />
      </svg>
    </div>
  );
}
