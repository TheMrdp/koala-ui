/**
 * Motion tokens — single source of truth for JS-driven animation.
 *
 * These MUST stay in sync with the CSS custom properties defined in `app/globals.css`
 * (`--ease-*`, `--duration-*`). For CSS/Tailwind, prefer the utilities backed by those
 * variables (e.g. `ease-out`, `duration-base`). Use these constants only when animating
 * from JS (Web Animations API, Framer Motion, GSAP). Never inline raw cubic-bezier values.
 */

/** Easing curves. Keys match the `--ease-*` CSS variables. */
export const easing = {
  /** UI enter/exit (Emil Kowalski curve). `--ease-out` */
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  /** On-screen movement. `--ease-in-out` */
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  /** Sheets / drawers. `--ease-drawer` */
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

/** Easing curves as cubic-bezier point arrays, for libraries that want tuples (e.g. Framer Motion). */
export const easingPoints = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1],
} as const;

/** Durations in milliseconds. Keys match the `--duration-*` CSS variables. */
export const duration = {
  fast: 160,
  base: 300,
  slow: 450,
} as const;

export type Easing = keyof typeof easing;
export type Duration = keyof typeof duration;
