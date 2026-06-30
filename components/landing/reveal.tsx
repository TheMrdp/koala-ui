"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Reveal: a scroll-triggered fade-and-rise wrapper. Uses an IntersectionObserver (state is
 * set from the observer callback, never synchronously in the effect body, so it stays clear
 * of the repo's strict react-hooks rules) and animates with a specific
 * `transition-[opacity,transform]` (never `transition: all`). All motion is gated behind
 * `motion-safe`, so reduced-motion users see the content immediately, fully visible.
 *
 * Pass a `delay` to stagger siblings (~75ms steps read as one cascade, not a queue). The
 * text stays in the DOM at full opacity-0 (not display:none), so SSR and crawlers still see
 * it.
 */
export interface RevealProps extends React.ComponentProps<"div"> {
  /** Stagger offset in ms, applied as a transition delay. */
  delay?: number
}

export function Reveal({ delay = 0, className, style, children, ...props }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out",
        visible
          ? "opacity-100 translate-y-0"
          : "motion-safe:translate-y-4 motion-safe:opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
