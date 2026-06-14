"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface StaggerProps extends React.ComponentProps<"div"> {
  /** Delay between each child's entrance, in ms. @default 70 */
  step?: number
}

/**
 * Stagger — plays a small rise+fade entrance across its direct children, each delayed one `step`
 * further than the last, so a list or grid cascades in rather than appearing as one block
 * (make-interfaces-feel-better #5). The DS's motion foundation made reusable: the animation itself
 * lives in the token layer (`--animate-stagger-in` in globals.css, `animate-stagger-in` utility),
 * so consumers never hand-roll per-item `transitionDelay`.
 *
 * It animates on **mount**, which is the right gate for "load" cascades: with stable keys,
 * reordering (e.g. a table re-sort) reuses the same DOM and does *not* replay; genuinely new
 * content — filter matches, a fresh page, a layout switch — mounts and cascades. Honors
 * `prefers-reduced-motion` (children simply appear). Direct children must forward `className` and
 * `style` — every Koala component does; raw text/fragments pass through unanimated.
 *
 * Only each *direct* child is shallow-cloned (to attach the entrance class and its delay), never
 * descendants, so it doesn't trip the recursive-clone rule the DS forbids. The delay is set inline
 * — an `animation-delay` longhand that beats the `animation` shorthand's reset regardless of
 * stylesheet order.
 */
export function Stagger({ step = 70, children, ...props }: StaggerProps) {
  return (
    <div data-slot="stagger" {...props}>
      {React.Children.map(children, (child, index) => {
        if (
          !React.isValidElement<{ className?: string; style?: React.CSSProperties }>(child)
        ) {
          return child
        }
        return React.cloneElement(child, {
          className: cn(
            "animate-stagger-in motion-reduce:animate-none",
            child.props.className,
          ),
          style: { animationDelay: `${index * step}ms`, ...child.props.style },
        })
      })}
    </div>
  )
}
