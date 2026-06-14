"use client"

// Kbd has no hooks/state of its own, but it's meant to live inside slots that client
// components render lazily on the client — most notably Tooltip `content` (Tippy renders
// it client-side) and menu shortcut rows. A server-only component placed in such a slot
// resolves to `undefined` on the client ("Element type is invalid"), so Kbd opts into the
// client graph to stay embeddable anywhere.
import * as React from "react"
import { Slot } from "radix-ui"

import { tv, type VariantProps } from "@/lib/tv"

/**
 * Kbd — a keyboard key indicator. A single-element component (like Badge): one `tv`
 * recipe, semantic tokens only, `className` merged last. Renders a native `<kbd>` so it
 * carries the right semantics for assistive tech and document outlines.
 *
 * The default variant reads as a raised keycap — a tinted surface, a hairline border, and
 * a soft `shadow-xs` — so it stays legible across all four themes. Compose shortcuts by
 * placing several side by side: `<Kbd>⌘</Kbd><Kbd>K</Kbd>`. See docs/ARCHITECTURE.md.
 */
export const kbdVariants = tv({
  base: [
    "inline-flex items-center justify-center shrink-0 whitespace-nowrap select-none",
    // Square-ish even for a single glyph: min-width tracks height so "K" and "Esc"
    // share a baseline. `font-mono` keeps multi-key rows mechanically aligned.
    "rounded-md border font-mono font-medium tabular-nums",
    "transition duration-fast ease-out",
  ],
  variants: {
    variant: {
      // Raised keycap — the default. Soft shadow + hairline border read as depth.
      default: "border-border bg-muted text-muted-foreground shadow-xs",
      // Flat hairline outline, transparent fill — for dense inline help text.
      outline: "border-border bg-transparent text-muted-foreground",
      // Inverted, high-contrast cap — for callouts and onboarding hints.
      solid: "border-transparent bg-foreground text-background shadow-xs",
    },
    size: {
      sm: "h-5 min-w-5 gap-0.5 px-1 text-xs [&>svg]:size-3",
      md: "h-6 min-w-6 gap-1 px-1.5 text-xs [&>svg]:size-3.5",
      lg: "h-7 min-w-7 gap-1 px-2 text-sm [&>svg]:size-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface KbdProps
  extends React.ComponentProps<"kbd">,
    VariantProps<typeof kbdVariants> {
  /** Render the child element as the key (Radix Slot) — e.g. to wrap a button. */
  asChild?: boolean
}

export function Kbd({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: KbdProps) {
  const Comp = asChild ? Slot.Root : "kbd"

  return (
    <Comp
      data-slot="kbd"
      className={kbdVariants({ variant, size, className })}
      {...props}
    />
  )
}
