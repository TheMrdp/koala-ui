"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { X } from "@phosphor-icons/react"

import { DensityProvider, useDensity } from "@/lib/density"
import { cn } from "@/lib/utils"
import { tv, type VariantProps } from "@/lib/tv"
import { Stepper, type StepperProps } from "@/components/ui/stepper"

/**
 * Dialog — a multi-part component over Radix Dialog (focus trap, scroll lock, a11y, exit
 * animations via Presence). Pattern: one `tv` recipe with `slots`. `size` affects the
 * content width; `density` (lib/density.tsx) tightens padding/gaps/title for application
 * UI. DialogContent resolves density once and re-provides it to its children, so every
 * part stays in sync — no Context plumbing of our own. See docs/ARCHITECTURE.md §2.
 *
 * Centering is done with a flex wrapper rather than a `-translate-1/2` so the `zoom-in`
 * enter/exit (a `transform: scale`) doesn't fight the positioning transform.
 *
 * Convention: when a dialog contains a form input, autofocus the first input on open
 * (`autoFocus` on the field, or `onOpenAutoFocus` to target it) so the user can type
 * immediately without a click. Radix moves focus into the content on open; point it at the
 * input rather than letting it rest on the container.
 */

export const dialogVariants = tv({
  slots: {
    // Scrim is intentionally a fixed dark wash (not a theme token): it must darken behind
    // the dialog in every theme, light or dark.
    overlay: [
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "duration-base ease-out",
    ],
    // The flex wrapper that centers and scrolls the content.
    positioner: "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4",
    // Density-tunable values (gap, p, size, title text) live in the `density` variant below.
    content: [
      "relative grid w-full rounded-xl border border-border-soft bg-popover text-popover-foreground shadow-lg",
      // Expose this surface so nested inputs blend with it (bg matches the dialog, not the page).
      "[--surface:var(--popover)]",
      // Radix focuses the content container on open (tabIndex -1, never a Tab stop) for SR
      // announcement — suppress its focus ring so the whole modal doesn't get outlined.
      "outline-none",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "duration-base ease-out",
    ],
    close: [
      "absolute top-4 right-4 inline-flex cursor-pointer items-center justify-center rounded-md",
      "text-muted-foreground transition-colors duration-fast ease-out",
      "hover:bg-accent hover:text-foreground active:scale-[0.96]",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    ],
    header: "flex flex-col text-center sm:text-left",
    // Full-bleed band for a Stepper in a wizard dialog: the negative margins cancel the
    // content's horizontal padding so the divider beneath spans edge-to-edge (both densities
    // pad 16px). Vertical padding tracks density; the divider itself is opt-out in DialogStepper.
    stepper: "-mx-4 px-4",
    footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    // (footer top spacing lives in the `density` variant below)
    title: "leading-none font-semibold tracking-tight",
    description: "text-sm text-pretty text-muted-foreground",
    // A leading icon above the title (share, announcement, feedback…). Muted by default so
    // it reads as a quiet category marker, not a hero illustration. Size tracks density.
    icon: "text-muted-foreground [&_svg]:shrink-0",
  },
  variants: {
    size: {
      sm: { content: "max-w-sm" },
      md: { content: "max-w-lg" },
      lg: { content: "max-w-2xl" },
      xl: { content: "max-w-4xl" },
    },
    // Density is Koala's cross-cutting spacing axis (see lib/density.tsx). `comfortable`
    // is the marketing default; `compact` tightens padding/gaps for application UI.
    density: {
      comfortable: { content: "gap-4 px-4 pt-6 pb-4", header: "gap-1.5", stepper: "pb-4", footer: "mt-4", title: "text-lg", close: "size-7", icon: "[&_svg]:size-6" },
      compact: { content: "gap-3 p-4", header: "gap-1", stepper: "pb-3", footer: "mt-2", title: "text-base", close: "size-6", icon: "[&_svg]:size-5" },
    },
    // Full-bleed top divider on the footer + bottom-flush padding, for footers carrying a
    // helper on the left and split actions on the right (announcements, checkout, task
    // creation). The negative margins cancel the content's padding so the divider spans
    // edge-to-edge; the exact values track density (both pad 16px), hence the compounds.
    bordered: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      bordered: true,
      density: "comfortable",
      class: { footer: "mt-0 -mx-4 -mb-4 border-t border-border px-4 pt-4 pb-4" },
    },
    {
      bordered: true,
      density: "compact",
      class: { footer: "mt-0 -mx-4 -mb-4 border-t border-border px-4 pt-3 pb-4" },
    },
  ],
  defaultVariants: {
    size: "md",
    density: "comfortable",
    bordered: false,
  },
})

/** Root — controls open state. Pass-through to Radix (supports `open`/`onOpenChange`). */
export const Dialog = DialogPrimitive.Root

/** Trigger — use with `asChild` to make any element open the dialog. */
export const DialogTrigger = DialogPrimitive.Trigger

/** Close — use with `asChild` on footer buttons to dismiss the dialog. */
export const DialogClose = DialogPrimitive.Close

export interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogVariants> {
  /** Hide the built-in top-right close button. */
  showClose?: boolean
  /** Accessible label for the built-in close button. */
  closeLabel?: string
}

export function DialogContent({
  className,
  children,
  size,
  density,
  showClose = true,
  closeLabel = "Close",
  style,
  ...props
}: DialogContentProps) {
  // Resolve density once (prop > provider > "comfortable") and re-provide it to the
  // children, so DialogHeader/Title/Footer stay in sync without prop-drilling.
  const resolvedDensity = useDensity(density)
  const slots = dialogVariants({ size, density: resolvedDensity })

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={slots.overlay()} />
      <div className={slots.positioner()}>
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={slots.content({ className })}
          style={style}
          {...props}
        >
          <DensityProvider density={resolvedDensity}>{children}</DensityProvider>
          {showClose && (
            <DialogPrimitive.Close aria-label={closeLabel} className={slots.close()}>
              <X />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  )
}

/**
 * DialogIcon — an optional leading icon above the title. Place it as the first child of
 * DialogContent (the content's gap spaces it from the header). Muted and density-sized; the
 * top-right close button sits clear of it. Pass any Phosphor icon as the child.
 */
export function DialogIcon({ className, ...props }: React.ComponentProps<"div">) {
  const slots = dialogVariants({ density: useDensity() })
  return <div data-slot="dialog-icon" className={slots.icon({ className })} {...props} />
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  const slots = dialogVariants({ density: useDensity() })
  return <div data-slot="dialog-header" className={slots.header({ className })} {...props} />
}

export interface DialogStepperProps extends StepperProps {
  /** Full-bleed divider beneath the stepper, separating it from the body. Defaults to `true`. */
  bordered?: boolean
}

/**
 * DialogStepper — the dialog-flavored placement of a Stepper for multi-step (wizard) dialogs.
 * Drop it right after DialogHeader: it spans the content full-bleed with a divider beneath,
 * inherits the dialog's density, and defaults to horizontal. It owns no state — drive its
 * `value`/`onValueChange` from your own step state and swap the body per step. Compose the
 * StepperItem/StepperTrigger/StepperIndicator/StepperTitle parts (from `@/components/ui/stepper`)
 * inside it exactly as you would a standalone Stepper.
 */
export function DialogStepper({
  className,
  bordered = true,
  density,
  orientation = "horizontal",
  ...props
}: DialogStepperProps) {
  const resolvedDensity = useDensity(density)
  const slots = dialogVariants({ density: resolvedDensity })
  return (
    <Stepper
      data-slot="dialog-stepper"
      orientation={orientation}
      density={resolvedDensity}
      className={slots.stepper({ className: cn(bordered && "border-b border-border", className) })}
      {...props}
    />
  )
}

export interface DialogFooterProps extends React.ComponentProps<"div"> {
  /**
   * Full-bleed top divider + bottom-flush padding, for footers with a helper on the left
   * and split actions on the right. Pair with `className="sm:justify-between"` to spread them.
   */
  bordered?: boolean
}

export function DialogFooter({ className, bordered, ...props }: DialogFooterProps) {
  const slots = dialogVariants({ density: useDensity(), bordered })
  return <div data-slot="dialog-footer" className={slots.footer({ className })} {...props} />
}

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const slots = dialogVariants({ density: useDensity() })
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={slots.title({ className })}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const slots = dialogVariants({ density: useDensity() })
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={slots.description({ className })}
      {...props}
    />
  )
}
