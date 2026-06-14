"use client"

import * as React from "react"
import tippy from "tippy.js/headless"
import { createPortal } from "react-dom"
import Tippy, { useSingleton } from "@tippyjs/react/headless"
import type { Instance } from "tippy.js"
import type { TippyProps } from "@tippyjs/react"

import { tv } from "@/lib/tv"

/**
 * Tooltip — a small text hint shown on hover/focus. Positioning, hover-intent and a11y come
 * from Tippy.js in **headless** mode, so Koala owns the markup: the bubble is a `tv` recipe
 * built from our tokens, not Tippy's default theme (no `tippy.js/dist/tippy.css` needed).
 * This is the one place Koala uses a non-Radix behavior primitive. See docs/ARCHITECTURE.md.
 *
 * Enter/exit is an interruptible CSS transition (polish) driven by a
 * `data-state` flip. In headless mode Tippy won't auto-unmount with `animation`, so we wait
 * for the exit `transitionend` before calling `instance.unmount()`, and cancel that wait if
 * a re-hover interrupts the exit.
 *
 * Wrap a set of tooltips in {@link TooltipGroup} to share ONE bubble that *glides* between
 * triggers (Tippy singleton) — the smooth way to tooltip a toolbar or an avatar stack.
 */
export const tooltipVariants = tv({
  base: [
    // Spec: flex, centered, gap 4px, padding 2px 6px.
    "flex items-center justify-center gap-1 px-1.5 py-0.5",
    // 12px label on the popover surface, hairline + soft shadow for depth.
    "rounded-md border border-border bg-popover text-popover-foreground text-xs",
    "max-w-xs text-pretty shadow-md select-none",
    // Interruptible transition — `transition` names opacity+scale+translate (never `transition: all`).
    "transition duration-fast ease-out",
    "data-[state=hidden]:opacity-0",
    "data-[state=visible]:opacity-100",
    // Grow out of the edge nearest the trigger.
    "data-[placement^=top]:origin-bottom data-[placement^=bottom]:origin-top",
    "data-[placement^=left]:origin-right data-[placement^=right]:origin-left",
  ],
  variants: {
    transition: {
      // ShiftAway: scale down + slide away from the trigger on exit.
      default: [
        "data-[state=hidden]:scale-95 data-[state=visible]:scale-100",
        "data-[placement^=top]:data-[state=hidden]:-translate-y-1",
        "data-[placement^=bottom]:data-[state=hidden]:translate-y-1",
        "data-[placement^=left]:data-[state=hidden]:-translate-x-1",
        "data-[placement^=right]:data-[state=hidden]:translate-x-1",
      ],
      // Singleton: opacity-only — the `moveTransition` glide handles spatial motion.
      singleton: ["scale-100"],
    },
  },
  defaultVariants: {
    transition: "default",
  },
})

/** Stash the in-flight exit cleanup on the instance so a re-show can cancel it. */
type TooltipInstance = Instance & { _koalaCancelExit?: () => void }

function box(instance: Instance): HTMLElement | null {
  return instance.popper.firstElementChild as HTMLElement | null
}

/** Fade+scale the bubble in once Tippy has mounted/positioned it. */
function handleMount(instance: Instance) {
  ;(instance as TooltipInstance)._koalaCancelExit?.()
  const el = box(instance)
  if (!el) return
  // Stamp the Popper.js-computed placement so CSS origin/translate rules fire correctly.
  const p = (
    instance as unknown as { popperInstance?: { state?: { placement?: string } } }
  ).popperInstance?.state?.placement
  if (p) el.setAttribute("data-placement", p)
  requestAnimationFrame(() => el.setAttribute("data-state", "visible"))
}

/** Fade+scale the bubble out, then unmount once the exit transition ends. */
function handleHide(instance: Instance) {
  const el = box(instance)
  if (!el) return instance.unmount()
  el.setAttribute("data-state", "hidden")
  const onEnd = (event: TransitionEvent) => {
    if (event.target !== el || event.propertyName !== "opacity") return
    cancel()
    instance.unmount()
  }
  const cancel = () => el.removeEventListener("transitionend", onEnd)
  ;(instance as TooltipInstance)._koalaCancelExit = cancel
  el.addEventListener("transitionend", onEnd)
}

/** The bubble itself — shared by the standalone tooltip and the singleton group. */
function TooltipBubble({
  attrs,
  className,
  transition,
  children,
}: {
  attrs: Record<string, unknown>
  className?: string
  transition?: "default" | "singleton"
  children: React.ReactNode
}) {
  return (
    <div
      role="tooltip"
      data-slot="tooltip"
      data-state="hidden"
      tabIndex={-1}
      className={tooltipVariants({ className, transition })}
      {...attrs}
    >
      {children}
    </div>
  )
}

// The nearest singleton target, if this tooltip is inside a <TooltipGroup>.
type Singleton = ReturnType<typeof useSingleton>[number]
const TooltipGroupContext = React.createContext<Singleton | null>(null)

export interface TooltipProps {
  /** The hint contents — text, or text plus a small leading glyph (the 4px gap). */
  content: React.ReactNode
  /** The trigger. Must be a single element that forwards its ref to a DOM node. */
  children: React.ReactElement
  placement?: TippyProps["placement"]
  /** Hover-intent delay in ms: `[open, close]` or a single number for both. Ignored in a group. */
  delay?: TippyProps["delay"]
  /** Distance from the trigger as `[skidding, distance]`. Ignored in a group. */
  offset?: TippyProps["offset"]
  /** Keep the tooltip open while hovered — for tooltips with links/actions. */
  interactive?: boolean
  /**
   * Space-separated event names that open the tooltip. Defaults to `"mouseenter focus"`.
   * Use `"mouseenter"` to suppress focus-triggered tooltips (e.g. inside dialogs where
   * Radix auto-focuses the first interactive element on open).
   */
  trigger?: string
  disabled?: boolean
  className?: string
}

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = [150, 0],
  offset = [0, 6],
  interactive,
  trigger,
  disabled,
  className,
}: TooltipProps) {
  const singleton = React.useContext(TooltipGroupContext)

  // Inside a group: a lightweight target that feeds the shared, gliding bubble.
  // Still uses @tippyjs/react; this path produces a React 19 deprecation warning
  // (not a crash) and is left on the library until it ships a React 19 update.
  if (singleton) {
    return (
      <Tippy singleton={singleton} content={content} placement={placement} disabled={disabled}>
        {children}
      </Tippy>
    )
  }

  // Standalone: bypass @tippyjs/react entirely to avoid the React 19 element.ref crash.
  return (
    <StandaloneTooltip
      content={content}
      placement={placement}
      delay={delay}
      offset={offset}
      interactive={interactive}
      trigger={trigger}
      disabled={disabled}
      className={className}
    >
      {children}
    </StandaloneTooltip>
  )
}

/**
 * Direct tippy.js implementation of the standalone (non-group) tooltip.
 *
 * @tippyjs/react 4.x reads the deprecated `element.ref` getter when it clones the trigger
 * child in React 19, which crashes in headless-with-render-prop mode. This component owns
 * the trigger ref directly — via `children.props.ref` (the React 19 API) — and drives
 * tippy.js imperatively in a `useEffect`, so the React wrapper never touches `element.ref`.
 */
function StandaloneTooltip({
  content,
  children,
  placement = "top",
  delay = [150, 0],
  offset = [0, 6],
  interactive,
  trigger,
  disabled,
  className,
}: TooltipProps) {
  const [triggerEl, setTriggerEl] = React.useState<HTMLElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const instanceRef = React.useRef<Instance | null>(null)
  const [mounted, setMounted] = React.useState(false)

  // Mutable ref so the stable refCallback can forward the original child ref without
  // capturing a stale closure over `children`.
  const childOrigRefRef = React.useRef<React.Ref<unknown> | undefined>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childOrigRefRef.current = (children as React.ReactElement<any>).props?.ref

  // Stable ref callback: captures the trigger DOM node and forwards any original child ref.
  // Reads `children.props.ref` (React 19 way) — never accesses the deprecated `element.ref`.
  const triggerRefCallback = React.useCallback((node: HTMLElement | null) => {
    setTriggerEl(node)
    const origRef = childOrigRefRef.current
    if (typeof origRef === "function") {
      ;(origRef as (node: HTMLElement | null) => void)(node)
    } else if (origRef != null && typeof origRef === "object") {
      ;(origRef as React.MutableRefObject<HTMLElement | null>).current = node
    }
  }, [])

  // Create the tippy.js instance once the trigger element mounts.
  // Only re-runs when the trigger DOM element itself is replaced.
  // Prop changes are handled by the sync effect below.
  React.useEffect(() => {
    if (!triggerEl) return
    const container = document.createElement("div")
    containerRef.current = container
    const instance = tippy(triggerEl, {
      render: () => ({ popper: container }),
      placement,
      delay: delay as TippyProps["delay"],
      offset: offset as [number, number],
      interactive: interactive ?? false,
      trigger: trigger ?? "mouseenter focus",
      animation: true,
      onMount: handleMount,
      onHide: handleHide,
    }) as Instance
    if (disabled) instance.disable()
    instanceRef.current = instance
    setMounted(true)
    return () => {
      instance.destroy()
      instanceRef.current = null
      containerRef.current = null
      setMounted(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerEl])

  // Keep tippy in sync with prop changes without recreating the instance.
  React.useEffect(() => {
    const inst = instanceRef.current
    if (!inst) return
    inst.setProps({
      placement,
      delay: delay as TippyProps["delay"],
      offset: offset as [number, number],
      interactive: interactive ?? false,
      trigger: trigger ?? "mouseenter focus",
    })
    if (disabled) inst.disable()
    else inst.enable()
  }, [placement, delay, offset, interactive, trigger, disabled])

  // Pass our stable ref callback to the trigger child.
  // `cloneElement` here only SETS `ref` — it never reads `element.ref`, so no React 19 warning.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const triggerNode = React.cloneElement(children as React.ReactElement<any>, { ref: triggerRefCallback })

  return (
    <>
      {triggerNode}
      {mounted &&
        containerRef.current &&
        createPortal(
          // attrs is empty here; handleMount stamps data-placement on this element
          // from the Popper.js-computed placement so CSS origin/translate rules fire correctly.
          <TooltipBubble attrs={{}} className={className}>
            {content}
          </TooltipBubble>,
          containerRef.current,
        )}
    </>
  )
}

export interface TooltipGroupProps {
  children: React.ReactNode
  /** Hover-intent delay shared by the group, in ms: `[open, close]` or a single number. */
  delay?: TippyProps["delay"]
  /** Distance from each trigger as `[skidding, distance]`. */
  offset?: TippyProps["offset"]
  disabled?: boolean
  /** Classes merged onto the shared bubble. */
  className?: string
}

/**
 * TooltipGroup — share a single bubble across many {@link Tooltip} triggers so it *glides*
 * from one to the next (Tippy singleton) instead of each fading out and in with its own
 * delay. The smooth choice for an avatar stack, a toolbar, or a segmented control.
 */
export function TooltipGroup({
  children,
  delay = [150, 0],
  offset = [0, 6],
  disabled,
  className,
}: TooltipGroupProps) {
  const [source, target] = useSingleton({ disabled })
  return (
    <TooltipGroupContext.Provider value={target}>
      <Tippy
        singleton={source}
        delay={delay}
        offset={offset}
        animation
        // The glide: animate the popper's move between triggers (named prop, not `all`).
        moveTransition="transform var(--duration-fast) var(--ease-out)"
        onMount={handleMount}
        onHide={handleHide}
        render={(attrs, content) => (
          <TooltipBubble attrs={attrs} className={className} transition="singleton">
            {content}
          </TooltipBubble>
        )}
      />
      {children}
    </TooltipGroupContext.Provider>
  )
}
