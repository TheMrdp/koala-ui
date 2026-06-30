"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface StaggerProps extends React.ComponentProps<"div"> {
  /** Delay between each child's entrance, in ms. @default 70 */
  step?: number
  /** Add a 4px → 0 defocus to the entrance (matches a SectionHeader's `staggerBlur`). @default false */
  blur?: boolean
  /**
   * Wait until the group scrolls into view before cascading, instead of playing on mount. Reach for
   * it on content below the fold so it reveals as the reader reaches it, and to match a
   * SectionHeader set to `staggerTrigger="inView"` above it. @default false
   */
  inView?: boolean
}

/**
 * Stagger: plays a small rise+fade entrance across its direct children, each delayed one `step`
 * further than the last, so a list or grid cascades in rather than appearing as one block
 * (polish). The DS's motion foundation made reusable: the animation itself
 * lives in the token layer (`--animate-stagger-in` / `--animate-stagger-in-blur` in globals.css,
 * `animate-stagger-in[-blur]` utilities), so consumers never hand-roll per-item `transitionDelay`.
 *
 * By default it animates on **mount**, which is the right gate for "load" cascades: with stable
 * keys, reordering (e.g. a table re-sort) reuses the same DOM and does *not* replay; genuinely new
 * content (filter matches, a fresh page, a layout switch) mounts and cascades. Pass `inView` to gate
 * it on scrolling into view instead (an IntersectionObserver holds the cascade at its start via
 * `animation-play-state: paused` + the keyframe's `both` fill, so nothing flashes, then runs it on
 * intersect). Honors `prefers-reduced-motion` (children simply appear). Direct children must forward
 * `className` and `style`: every Koala component does; raw text/fragments pass through unanimated.
 *
 * Only each *direct* child is shallow-cloned (to attach the entrance class and its delay), never
 * descendants, so it doesn't trip the recursive-clone rule the DS forbids. The delay is set inline
 * via an `animation-delay` longhand that beats the `animation` shorthand's reset regardless of
 * stylesheet order.
 */
export function Stagger({
  step = 70,
  blur = false,
  inView = false,
  ref,
  children,
  ...props
}: StaggerProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  // Plays on mount unless `inView` arms it; then it starts paused and flips on intersect.
  const [visible, setVisible] = React.useState(!inView)

  React.useEffect(() => {
    if (!inView || visible) return
    const el = rootRef.current
    if (!el) return
    // Set state from the observer callback (not synchronously in the effect body) to stay clear of
    // the repo's strict react-hooks rules.
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
  }, [inView, visible])

  const paused = inView && !visible

  // Keep the observer target while honoring a forwarded ref (no merge util in the repo, so compose
  // inline in the commit-phase callback, never during render).
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node
    },
    [ref],
  )

  const entrance = cn(
    blur ? "animate-stagger-in-blur" : "animate-stagger-in",
    paused && "[animation-play-state:paused]",
    "motion-reduce:animate-none",
  )

  return (
    <div ref={setRef} data-slot="stagger" {...props}>
      {React.Children.map(children, (child, index) => {
        if (
          !React.isValidElement<{ className?: string; style?: React.CSSProperties }>(child)
        ) {
          return child
        }
        return React.cloneElement(child, {
          className: cn(entrance, child.props.className),
          style: { animationDelay: `${index * step}ms`, ...child.props.style },
        })
      })}
    </div>
  )
}
