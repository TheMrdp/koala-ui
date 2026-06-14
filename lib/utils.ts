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
    },
  },
}

const twMerge = extendTailwindMerge(twMergeConfig)

/** Conditionally join class names and resolve Tailwind conflicts (last wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
