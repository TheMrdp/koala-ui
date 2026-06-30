"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"
import { CheckCircle, Warning, XCircle, Info, X } from "@phosphor-icons/react"

import { tv } from "@/lib/tv"
import { cn } from "@/lib/utils"
import { type ToastData, startDismiss } from "./use-toast"

/**
 * Toast: a multi-part component over Radix Toast (swipe-to-dismiss, keyboard, a11y).
 * Stacking logic lives in Toaster; this file owns the visual recipe and the per-toast item.
 *
 * Architecture: the <li> (Toast.Root) is a transparent positioner. Its transform and
 * opacity are driven by the Toaster's stacking engine via inline style. The inner <div>
 * (surface) owns all visible styling and the enter/exit animations, keeping both axes of
 * motion independent so they never fight each other.
 *
 * polish applied:
 *   #1 : concentric radius: viewport rounded-xl, surface rounded-xl (viewport is not visible so no nesting issue)
 *   #3 : layered box-shadow instead of a plain border for natural depth
 *   #5 : staggered enter: icon, title, description each start slightly offset (via CSS delay)
 *   #6 : subtle exit: slides right (direction-hinting) with a shorter implicit 200 ms
 *   #11 : inner 1 px inset ring (light: black/7%, dark: white/8%) instead of a solid border
 *   #12 : close button uses active:scale-[0.96]
 *   #14 : transition specifies exact properties, never "all"
 */
export const toastVariants = tv({
  slots: {
    // Transparent positioner <li>: stacking transform plus opacity-on-exit live here.
    // Transition is fully owned by getStackStyle inline styles (never Tailwind class)
    // so there is no specificity conflict between the two.
    root: [
      "absolute bottom-0 left-0 right-0",
    ],
    // Visible card surface <div>.
    surface: [
      "relative flex w-full items-start gap-3 rounded-xl bg-background p-4",
      // polish/#11: layered shadow + inset ring (no solid border)
      "[box-shadow:0_8px_24px_-4px_oklch(0_0_0/0.12),0_2px_8px_-2px_oklch(0_0_0/0.08),inset_0_0_0_1px_oklch(0_0_0/0.07)]",
      "dark:[box-shadow:0_8px_24px_-4px_oklch(0_0_0/0.4),0_2px_8px_-2px_oklch(0_0_0/0.3),inset_0_0_0_1px_oklch(1_0_0/0.08)]",
      // Enter/exit animation only on translate + opacity (never "all").
      "transition-[opacity,translate] duration-300 ease-out",
    ],
    iconWrap: "mt-px shrink-0 [&_svg]:size-[18px]",
    content: "flex min-w-0 flex-1 flex-col gap-0.5 pr-5",
    title: "text-sm font-semibold leading-snug",
    description: "text-sm text-pretty leading-snug text-muted-foreground",
    close: [
      "absolute top-3 right-3",
      "grid size-6 shrink-0 place-items-center rounded-md",
      "text-muted-foreground/60",
      "transition-[color,background-color] duration-fast ease-out",
      // polish
      "active:scale-[0.96]",
      "hover:bg-accent hover:text-foreground",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1",
      "[&_svg]:size-3.5 [&_svg]:pointer-events-none",
    ],
    action: [
      "mt-2 inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium",
      "transition-[color,background-color] duration-fast ease-out",
      "active:scale-[0.96]",
    ],
  },
  variants: {
    variant: {
      default: {
        surface: "",
        iconWrap: "text-muted-foreground",
        action: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      success: {
        surface:
          "[box-shadow:0_8px_24px_-4px_oklch(0_0_0/0.1),0_2px_8px_-2px_oklch(0_0_0/0.06),inset_0_0_0_1px_oklch(var(--success)/0.2)]",
        iconWrap: "text-success",
        action: "bg-success/10 text-success hover:bg-success/20",
      },
      warning: {
        surface:
          "[box-shadow:0_8px_24px_-4px_oklch(0_0_0/0.1),0_2px_8px_-2px_oklch(0_0_0/0.06),inset_0_0_0_1px_oklch(var(--warning)/0.2)]",
        iconWrap: "text-warning",
        action: "bg-warning/10 text-warning hover:bg-warning/20",
      },
      destructive: {
        surface:
          "[box-shadow:0_8px_24px_-4px_oklch(0_0_0/0.1),0_2px_8px_-2px_oklch(0_0_0/0.06),inset_0_0_0_1px_oklch(var(--destructive)/0.2)]",
        iconWrap: "text-destructive",
        action: "bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      info: {
        surface:
          "[box-shadow:0_8px_24px_-4px_oklch(0_0_0/0.1),0_2px_8px_-2px_oklch(0_0_0/0.06),inset_0_0_0_1px_oklch(var(--info)/0.2)]",
        iconWrap: "text-info",
        action: "bg-info/10 text-info hover:bg-info/20",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const VARIANT_ICONS = {
  success: CheckCircle,
  warning: Warning,
  destructive: XCircle,
  info: Info,
} satisfies Partial<Record<NonNullable<ToastData["variant"]>, React.ElementType>>

export interface ToastItemProps {
  toast: ToastData
  /** Inline style containing the stack transform and z-index. */
  stackStyle: React.CSSProperties
  /** Fired on mount, resize, and unmount (null = cleanup). */
  onHeightChange: (id: string, height: number | null) => void
  /** Called when the cursor enters this toast: expands the stack. */
  onExpand: () => void
  /** Called when the cursor leaves this toast: starts the collapse timer. */
  onCollapse: () => void
  /** Optional ref to the positioner <li>. React 19: ref is a regular prop. */
  ref?: React.Ref<HTMLLIElement>
}

export function ToastItem({
  toast,
  stackStyle,
  onHeightChange,
  onExpand,
  onCollapse,
  ref,
}: ToastItemProps) {
  // polish: trigger enter animation after first paint.
  const [entered, setEntered] = React.useState(false)
  const surfaceRef = React.useRef<HTMLDivElement>(null)

  // Report surface height so Toaster can compute expanded-stack offsets.
  React.useLayoutEffect(() => {
    const el = surfaceRef.current
    if (!el) return
    onHeightChange(toast.id, el.offsetHeight)
    const ro = new ResizeObserver(() => onHeightChange(toast.id, el.offsetHeight))
    ro.observe(el)
    return () => {
      ro.disconnect()
      onHeightChange(toast.id, null)
    }
  }, [toast.id, onHeightChange])

  React.useLayoutEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const slots = toastVariants({ variant: toast.variant })
  const Icon = toast.variant && toast.variant !== "default" ? VARIANT_ICONS[toast.variant] : null

  return (
    <ToastPrimitive.Root
      ref={ref}
      open={toast.open}
      onOpenChange={open => {
        // Fires when Radix wants to close (duration elapsed or Close clicked).
        if (!open) startDismiss(toast.id)
      }}
      duration={toast.duration ?? 5000}
      onMouseEnter={onExpand}
      onMouseLeave={onCollapse}
      className={cn(
        slots.root(),
        // Exit: fade the positioner so Radix Presence detects transitionend (300 ms)
        // and the outer layer dissolves while the surface slides right.
        !toast.open && "opacity-0",
      )}
      style={stackStyle}
    >
      {/*
       * Surface <div>: handles the enter slide-up and exit slide-right independently
       * from the stacking transform on the <li> above.
       */}
      <div
        ref={surfaceRef}
        className={cn(
          slots.surface(),
          // Enter: start slightly below + transparent, then transition to resting state.
          !entered && "translate-y-2 opacity-0",
          // polish: exit slides right (directional cue).
          !toast.open && "translate-x-full",
        )}
      >
        {Icon && (
          <div className={slots.iconWrap()}>
            <Icon weight="fill" />
          </div>
        )}
        <div className={slots.content()}>
          {toast.title && (
            <ToastPrimitive.Title className={slots.title()}>
              {toast.title}
            </ToastPrimitive.Title>
          )}
          {toast.description && (
            <ToastPrimitive.Description className={slots.description()}>
              {toast.description}
            </ToastPrimitive.Description>
          )}
          {toast.action && (
            <ToastPrimitive.Action
              altText={toast.action.label}
              onClick={toast.action.onClick}
              className={slots.action()}
            >
              {toast.action.label}
            </ToastPrimitive.Action>
          )}
        </div>
        <ToastPrimitive.Close data-slot="toast-close" className={slots.close()}>
          <X weight="bold" />
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
  )
}
