import * as React from "react"
import { Slot } from "radix-ui"
import { X } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { tv, type VariantProps } from "@/lib/tv"

/**
 * Badge — a single-element component (like Button): one `tv` recipe, semantic tokens
 * only, `className` merged last. Status variants (success/warning/info/destructive) are
 * "soft": a tinted background + colored text derived from one status token via opacity,
 * so they re-theme across all four themes. See docs/ARCHITECTURE.md.
 */
export const badgeVariants = tv({
  base: [
    "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
    // Border always present (transparent by default) so soft variants can add a hairline
    // ring without shifting layout.
    "rounded-md border border-transparent font-medium",
    "transition duration-fast ease-out",
  ],
  variants: {
    variant: {
      default: "bg-muted text-muted-foreground",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "border-border text-foreground",
      success: "border-success/20 bg-success/10 text-success",
      warning: "border-warning/20 bg-warning/10 text-warning",
      info: "border-info/20 bg-info/10 text-info",
      destructive: "border-destructive/20 bg-destructive/10 text-destructive",
      purple: "border-purple/20 bg-purple/10 text-purple",
      pink: "border-pink/20 bg-pink/10 text-pink",
      teal: "border-teal/20 bg-teal/10 text-teal",
      orange: "border-orange/20 bg-orange/10 text-orange",
    },
    size: {
      sm: "gap-1 px-1.5 py-0.5 text-xs [&>svg]:size-3",
      md: "gap-1.5 px-2 py-1 text-xs [&>svg]:size-3.5",
      lg: "gap-1.5 px-2.5 py-1 text-sm [&>svg]:size-4",
    },
    pill: {
      true: "rounded-full",
    },
    dot: {
      true: "",
    },
  },
  compoundVariants: [
    {
      dot: true,
      variant: ["default", "primary", "secondary", "success", "warning", "info", "destructive", "purple", "pink", "teal", "orange"],
      class: "bg-transparent",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  /** Render the child element as the badge (Radix Slot). Ignores `dot`/`onRemove`. */
  asChild?: boolean
  /** Show a leading status dot in the current text color. */
  dot?: boolean
  /** When set, renders a trailing dismiss button that calls this handler. */
  onRemove?: () => void
  /** Accessible label for the dismiss button. */
  removeLabel?: string
}

export function Badge({
  className,
  variant,
  size,
  pill,
  asChild = false,
  dot = false,
  onRemove,
  removeLabel = "Remove",
  children,
  ...props
}: BadgeProps) {
  const classes = badgeVariants({ variant, size, pill, dot, className })

  // asChild composes the styles onto a consumer element (e.g. a link); the dot/dismiss
  // affordances require our own element, so they're omitted in that mode.
  if (asChild) {
    return (
      <Slot.Root data-slot="badge" className={classes} {...props}>
        {children}
      </Slot.Root>
    )
  }

  return (
    <span data-slot="badge" className={classes} {...props}>
      {dot && (
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
      )}
      {dot ? (
        <span className="text-muted-foreground">{children}</span>
      ) : (
        children
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          // polish: the visual is small, but `before` extends the
          // hit area beyond the glyph without enlarging the badge.
          className={cn(
            "relative -mr-0.5 grid size-3.5 shrink-0 place-items-center rounded-full",
            "text-current/60 transition-colors duration-fast ease-out",
            "hover:bg-current/15 hover:text-current",
            "outline-none focus-visible:ring-2 focus-visible:ring-current/40",
            "before:absolute before:-inset-1 before:content-['']",
            "[&>svg]:size-3 [&>svg]:pointer-events-none",
          )}
        >
          <X weight="bold" />
        </button>
      )}
    </span>
  )
}
