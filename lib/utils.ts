import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge config extended for Koala's custom token scales, so conflicting
 * classes resolve correctly (e.g. `duration-fast` + `duration-base` → last wins).
 * Shared between `cn` (below) and `tv` (lib/tv.ts) so both merge identically.
 *
 * Standard scales (radius-*, shadow-*, color tokens) are already understood by
 * tailwind-merge; only our non-standard utilities need to be declared here.
 */
export const twMergeConfig = {
  extend: {
    classGroups: {
      "font-family": [{ font: ["heading"] }],
      "transition-duration": [{ duration: ["fast", "base", "slow"] }],
      // The canonical section-heading size utility (app/globals.css). Joins the font-size group so
      // a `text-*` passed via className still overrides it (last wins), exactly as two text sizes
      // would dedupe.
      "font-size": ["section-heading"],
      // The canonical ring utilities (app/globals.css). One group so they dedupe like the
      // box-shadow they replace: when a control carries both (base brand ring + invalid
      // destructive ring on the same state), the later one (the error ring) wins.
      "koala-ring": ["brand-ring", "destructive-ring"],
      // The fade edge-mask utilities (app/globals.css): the static `fade-*` family and its
      // scroll-aware `scroll-fade-*` sibling. One group so every variant is mutually exclusive
      // (each writes mask-image): a `fade-x` or `scroll-fade-t` passed after `fade` wins, exactly
      // as two conflicting mask utilities should dedupe.
      "koala-fade": [
        "fade",
        "fade-x",
        "fade-t",
        "fade-b",
        "fade-l",
        "fade-r",
        "scroll-fade",
        "scroll-fade-x",
        "scroll-fade-t",
        "scroll-fade-b",
        "scroll-fade-l",
        "scroll-fade-r",
      ],
    },
  },
}

const twMerge = extendTailwindMerge(twMergeConfig)

/** Conditionally join class names and resolve Tailwind conflicts (last wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
