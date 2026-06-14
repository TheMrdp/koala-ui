"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { useToastStore } from "./use-toast"
import { ToastItem } from "./toast"

/**
 * Toaster — renders the fixed toast viewport and orchestrates the stacking interaction.
 *
 * Stacking model (newest toast is index 0, rendered at the front/bottom):
 *
 *   Collapsed (default, ≥2 toasts):
 *     toast[0]  translateY(0)      scale(1)     — fully visible
 *     toast[1]  translateY(-16px)  scale(0.96)  — peeks behind
 *     toast[2]  translateY(-32px)  scale(0.92)  — barely peeks
 *     toast[3+] hidden (opacity 0, pointer-events none)
 *
 *   Expanded (hover/focus):
 *     toast[0]  translateY(0)
 *     toast[1]  translateY(-(h₀ + gap))
 *     toast[2]  translateY(-(h₀ + h₁ + 2·gap))
 *     …all toasts visible at full size with 12px gaps
 *
 * Transitions: expand uses ease-out-expo (fast start, settles smoothly).
 *              collapse uses ease-in-out (snappy return).
 *              All transition props live in inline styles so they are never
 *              overridden by a Tailwind utility class.
 *
 * Place <Toaster /> once in your root layout — outside any scroll container.
 */

const MAX_COLLAPSED_VISIBLE = 3
const COLLAPSED_OFFSET = 16  // px per level in collapsed mode
const COLLAPSED_SCALE = 0.04 // scale reduction per level
const EXPANDED_GAP = 16      // px between toasts in expanded mode
// Used before ResizeObserver fires. Matches a title-only toast (p-4 top/bottom + ~20px line).
const FALLBACK_H = 56

// Easing curves — principle #4 (interruptible CSS transitions, never keyframes here).
// Expand is fast (220ms) so the stack opens immediately on hover, not after a noticeable delay.
// Collapse is slightly slower (200ms) — exits softer than enters (principle #6).
const EXPAND_TRANSITION   = "transform 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease-out"
const COLLAPSE_TRANSITION = "transform 200ms cubic-bezier(0.4, 0, 0.6, 1), opacity 150ms ease-out"
const SNAP_TRANSITION     = "opacity 100ms ease-out, transform 100ms ease-out"

export function Toaster() {
  const toasts = useToastStore()
  const [expanded, setExpanded] = React.useState(false)
  const [heights, setHeights] = React.useState<Record<string, number>>({})
  const collapseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Expand immediately; collapse after a short delay so moving between
  // toasts (where there is a brief gap) does not flash the collapsed state.
  const handleExpand = React.useCallback(() => {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current)
      collapseTimer.current = null
    }
    setExpanded(true)
  }, [])

  const handleCollapse = React.useCallback(() => {
    collapseTimer.current = setTimeout(() => setExpanded(false), 100)
  }, [])

  React.useEffect(() => () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current)
  }, [])

  const handleHeightChange = React.useCallback((id: string, h: number | null) => {
    setHeights(prev => {
      if (h === null) {
        if (!(id in prev)) return prev
        const next = { ...prev }
        delete next[id]
        return next
      }
      if (prev[id] === h) return prev
      return { ...prev, [id]: h }
    })
  }, [])

  function getStackStyle(index: number): React.CSSProperties {
    // Overflow toasts: snap to the back of the visible stack, invisible.
    if (!expanded && index >= MAX_COLLAPSED_VISIBLE) {
      const backY     = (MAX_COLLAPSED_VISIBLE - 1) * COLLAPSED_OFFSET
      const backScale = 1 - (MAX_COLLAPSED_VISIBLE - 1) * COLLAPSED_SCALE
      return {
        transform: `translateY(-${backY}px) scale(${backScale})`,
        opacity: 0,
        pointerEvents: "none",
        zIndex: 30 - index,
        transition: SNAP_TRANSITION,
      }
    }

    if (!expanded) {
      return {
        transform: `translateY(-${index * COLLAPSED_OFFSET}px) scale(${1 - index * COLLAPSED_SCALE})`,
        // Fade back toasts so their shadows don't bleed through the front toast.
        opacity: index === 0 ? 1 : 1 - index * 0.15,
        zIndex: 30 - index,
        transition: COLLAPSE_TRANSITION,
      }
    }

    // Expanded: fan toasts upward, each above the previous by its height + gap.
    let y = 0
    for (let i = 0; i < index; i++) {
      y += (heights[toasts[i]?.id] ?? FALLBACK_H) + EXPANDED_GAP
    }
    return {
      transform: `translateY(-${y}px) scale(1)`,
      zIndex: 30 - index,
      transition: EXPAND_TRANSITION,
    }
  }

  const viewportHeight = React.useMemo(() => {
    if (toasts.length === 0) return 0
    if (!expanded) {
      const frontH  = heights[toasts[0]?.id] ?? FALLBACK_H
      const peeking = Math.min(toasts.length - 1, MAX_COLLAPSED_VISIBLE - 1)
      return frontH + peeking * COLLAPSED_OFFSET
    }
    return toasts.reduce(
      (sum, t, i) => sum + (heights[t.id] ?? FALLBACK_H) + (i > 0 ? EXPANDED_GAP : 0),
      0,
    )
  }, [toasts, heights, expanded])

  if (toasts.length === 0) return null

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map((t, index) => (
        <ToastItem
          key={t.id}
          toast={t}
          stackStyle={getStackStyle(index)}
          onHeightChange={handleHeightChange}
          onExpand={handleExpand}
          onCollapse={handleCollapse}
        />
      ))}

      {/*
       * Viewport is the fixed anchor. Toast.Root items portal themselves into it.
       * Height is driven by viewportHeight so the hover area covers the full stack.
       */}
      <ToastPrimitive.Viewport
        onMouseEnter={handleExpand}
        onMouseMove={handleExpand}
        onMouseLeave={handleCollapse}
        onFocus={handleExpand}
        onBlur={() => setExpanded(false)}
        style={{
          height: viewportHeight > 0 ? viewportHeight : undefined,
          // Expand: instant resize so the hover target is already correct from frame 0
          // and there's no height/transform de-sync while the stack opens.
          // Collapse: match the toast collapse easing so everything shrinks together.
          transition: expanded ? undefined : "height 250ms cubic-bezier(0.4, 0, 0.6, 1)",
        }}
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]",
          "w-[380px] max-w-[calc(100vw-2rem)]",
          "m-0 list-none p-0 outline-none",
        )}
      />
    </ToastPrimitive.Provider>
  )
}
