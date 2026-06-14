import * as React from "react"
import { Separator } from "radix-ui"

import { tv, type VariantProps } from "@/lib/tv"

/**
 * Divider — a thin rule that separates content, optionally with a centered label.
 * Single-element like Badge: one `tv` recipe, semantic tokens only, `className`
 * merged last.
 *
 * Behavior/a11y comes from Radix `Separator` (role="separator" + aria-orientation,
 * or role="none" when `decorative`). The labeled form wraps two decorative lines
 * around a label so the a11y tree still exposes exactly one separator.
 *
 * Stroke styles (`solid`/`dashed`/`dotted`) ride the `border-*` utilities so they
 * track `--border` across all four themes; `gradient` fades a hairline out at both
 * ends via the theme's border color. No raw hex / px — all tokens.
 */
export const dividerVariants = tv({
  slots: {
    root: "flex items-center",
    // The visible rule. Width/height on the main axis is added per-context (full
    // span when plain, `flex-1` when flanking a label).
    line: "shrink-0 border-border",
    label: "shrink-0 text-xs font-medium text-muted-foreground",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "w-full flex-row",
        line: "w-full border-t",
        label: "px-3",
      },
      vertical: {
        root: "h-full flex-col",
        line: "h-full self-stretch border-l",
        label: "py-3",
      },
    },
    variant: {
      solid: {},
      dashed: { line: "border-dashed" },
      dotted: { line: "border-dotted" },
      // Drop the hard border; the gradient hairline is drawn below per-axis.
      gradient: { line: "border-0" },
    },
  },
  compoundVariants: [
    {
      variant: "gradient",
      orientation: "horizontal",
      class: { line: "h-px bg-gradient-to-r from-transparent via-border to-transparent" },
    },
    {
      variant: "gradient",
      orientation: "vertical",
      class: { line: "w-px bg-gradient-to-b from-transparent via-border to-transparent" },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
  },
})

export interface DividerProps
  extends Omit<React.ComponentProps<"div">, "children">,
    VariantProps<typeof dividerVariants> {
  /** Optional centered label (text or icon). Horizontal orientation only. */
  children?: React.ReactNode
  /** Where the label sits when present. Ignored without children. */
  labelPosition?: "start" | "center" | "end"
  /** Render as purely visual — drops the separator role from the a11y tree. */
  decorative?: boolean
}

export function Divider({
  className,
  orientation = "horizontal",
  variant = "solid",
  labelPosition = "center",
  decorative = false,
  children,
  ...props
}: DividerProps) {
  const slots = dividerVariants({ orientation, variant })

  // Plain rule — a single Radix Separator carries the stroke and owns the role.
  // Labels are a horizontal-only affordance, so a vertical divider ignores them.
  if (children == null || orientation === "vertical") {
    return (
      <Separator.Root
        data-slot="divider"
        orientation={orientation}
        decorative={decorative}
        className={slots.line({ className })}
        {...props}
      />
    )
  }

  // Labeled rule — the wrapper carries separator semantics; the flanking lines are
  // aria-hidden so there's exactly one separator in the a11y tree. `start`/`end`
  // drop the line on that side so the label hugs the edge.
  const showStart = labelPosition !== "start"
  const showEnd = labelPosition !== "end"
  return (
    <div
      data-slot="divider"
      role={decorative ? "none" : "separator"}
      aria-orientation="horizontal"
      className={slots.root({ className })}
      {...props}
    >
      {showStart && <span aria-hidden className={slots.line({ className: "w-auto flex-1" })} />}
      <span data-slot="divider-label" className={slots.label()}>
        {children}
      </span>
      {showEnd && <span aria-hidden className={slots.line({ className: "w-auto flex-1" })} />}
    </div>
  )
}
