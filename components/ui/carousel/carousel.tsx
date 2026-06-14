"use client"

import * as React from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { createContext } from "@/lib/create-context"
import { tv } from "@/lib/tv"
import { Button } from "@/components/ui/button"

/**
 * Carousel — a horizontal slide viewer with clickable indicator dots ("pagination bullets").
 * Pattern: one `tv` recipe with `slots`, shared state (active index, slide count) flowing to
 * every part through React Context — never prop-drilled. See docs/ARCHITECTURE.md §2.
 *
 * Controlled (`index` + `onIndexChange`) or uncontrolled (`defaultIndex`). The track is a
 * single flex row translated by `index * 100%`; ArrowLeft/Right step it while the region is
 * focused. Distinct from {@link Pagination}, which is the data-table page toolbar.
 */
export const carouselVariants = tv({
  slots: {
    // `group` lets the overlay arrows reveal on hover of the whole carousel; `relative`
    // anchors the overlay arrows and (when `overlay`) the indicators to the image bounds.
    root: "group relative flex flex-col gap-3",
    // Concentric with the surface it sits on; clips the sliding track.
    viewport: "overflow-hidden rounded-lg",
    // Specific transition (never `transition: all`); honors reduced-motion.
    track: "flex transition-transform duration-base ease-out motion-reduce:transition-none",
    slide: "min-w-0 shrink-0 grow-0 basis-full",
    indicators: "flex items-center justify-center gap-1.5",
    // A dot that morphs into a pill when active. 1.5px tall; width animates between states.
    indicator: [
      "h-1.5 cursor-pointer rounded-full bg-border",
      "transition-[width,background-color] duration-base ease-out",
      "hover:bg-muted-foreground/40",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // polish: a 40px-tall transparent hit target. Extends vertically
      // into free space; horizontally it fills only to the gap midpoint (half of gap-1.5 = 3px
      // each side) so the whole row is clickable with no dead zones and adjacent dots never overlap.
      "relative before:absolute before:-inset-x-[3px] before:top-1/2 before:h-10 before:-translate-y-1/2 before:content-['']",
    ],
    // Overlay-only overrides layered onto an icon-only <Button>: position it on the image edge,
    // make it a circle, and swap the variant fill for a translucent blurred surface that stays
    // legible on any photo. Behavior (press scale, focus ring, 40px hit, icon sizing) all comes
    // from Button. Sits OUTSIDE the viewport's clip (root child) so it never gets cropped.
    arrow: [
      "absolute top-1/2 z-10 -translate-y-1/2 rounded-full",
      "bg-background/80 text-foreground shadow-md backdrop-blur-sm",
      "hover:bg-background hover:text-foreground",
    ],
  },
  variants: {
    active: {
      true: { indicator: "w-5 bg-foreground hover:bg-foreground" },
      false: { indicator: "w-1.5" },
    },
    side: {
      left: { arrow: "left-2" },
      right: { arrow: "right-2" },
    },
    // Pointer-drag affordance: a grab cursor and `touch-action: pan-y` so the browser keeps
    // vertical page scrolling while we own the horizontal axis. `select-none` stops text/image
    // selection from fighting the drag.
    draggable: {
      true: { viewport: "cursor-grab touch-pan-y select-none" },
      false: {},
    },
    // While the finger/pointer is down we translate the track 1:1, so the snap transition must
    // be off (it re-enables on release to animate the settle). Cursor flips to grabbing.
    dragging: {
      true: { viewport: "cursor-grabbing", track: "transition-none" },
      false: {},
    },
    // Float the dots over the bottom-right of the image instead of below it. Over arbitrary
    // photos the theme tokens can vanish, so the overlay dots switch to fixed white (same
    // rationale as the dialog scrim) — see the compounds below.
    overlay: {
      true: { indicators: "absolute right-3 bottom-3 z-10" },
      false: {},
    },
  },
  compoundVariants: [
    { overlay: true, active: true, class: { indicator: "bg-white shadow-sm hover:bg-white" } },
    { overlay: true, active: false, class: { indicator: "bg-white/50 shadow-sm hover:bg-white/70" } },
  ],
})

type CarouselSlots = ReturnType<typeof carouselVariants>

type CarouselContextValue = {
  index: number
  count: number
  setIndex: (i: number) => void
  slots: CarouselSlots
}

const [CarouselProvider, useCarouselContext] =
  createContext<CarouselContextValue>("Carousel")

/** Count the slides by finding the CarouselContent child and measuring its children. */
function countSlides(children: React.ReactNode): number {
  let count = 0
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === CarouselContent) {
      const content = child as React.ReactElement<CarouselContentProps>
      count = React.Children.toArray(content.props.children).length
    }
  })
  return count
}

// ─── Carousel (root) ────────────────────────────────────────────────────────────

export interface CarouselProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Controlled active slide, 0-based. */
  index?: number
  /** Initial slide when uncontrolled. @default 0 */
  defaultIndex?: number
  /** Called with the next (clamped) index on navigation. */
  onIndexChange?: (index: number) => void
  /** Accessible label for the carousel region. @default "Carousel" */
  label?: string
}

export function Carousel({
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  label = "Carousel",
  className,
  children,
  ...props
}: CarouselProps) {
  // Count slides synchronously from the CarouselContent child so the dots render on the
  // server too (an effect-set count would leave SSR with zero dots until hydration).
  const count = React.useMemo(() => countSlides(children), [children])
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const isControlled = indexProp != null
  const index = isControlled ? indexProp : uncontrolled

  const setIndex = React.useCallback(
    (i: number) => {
      const max = Math.max(count - 1, 0)
      const clamped = Math.min(Math.max(i, 0), max)
      if (!isControlled) setUncontrolled(clamped)
      onIndexChange?.(clamped)
    },
    [count, isControlled, onIndexChange],
  )

  const slots = carouselVariants()

  return (
    <CarouselProvider index={index} count={count} setIndex={setIndex} slots={slots}>
      <div
        data-slot="carousel"
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        className={slots.root({ className })}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            setIndex(index - 1)
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            setIndex(index + 1)
          }
        }}
        {...props}
      >
        {children}
      </div>
    </CarouselProvider>
  )
}

// ─── CarouselContent — viewport + sliding track ──────────────────────────────────

export interface CarouselContentProps extends React.ComponentProps<"div"> {
  /** Enable mouse/touch drag-to-swipe. @default true */
  draggable?: boolean
}

/**
 * Clips the track and translates it to the active slide. Children must be `CarouselSlide`s.
 *
 * Drag-to-swipe (when `draggable`): Pointer Events on the stationary viewport (so the moving
 * track never loses the pointer) with `setPointerCapture`. We wait for ~8px of mostly-horizontal
 * travel before claiming the gesture — vertical drags stay scrolls. The track follows the finger
 * 1:1 (transition off); past a width-relative threshold on release we step a slide, otherwise it
 * snaps back. Rubber-band resistance past the first/last slide signals the bound. A real drag
 * suppresses the trailing click so a swipe never fires a link inside a slide.
 */
export function CarouselContent({ className, children, draggable = true, ...props }: CarouselContentProps) {
  const { slots, index, count, setIndex } = useCarouselContext("CarouselContent")
  const [dragging, setDragging] = React.useState(false)
  const [offset, setOffset] = React.useState(0)
  // Transient gesture bookkeeping — read/written only in handlers, never during render.
  const drag = React.useRef<{
    pointerId: number
    startX: number
    startY: number
    width: number
    offset: number
    active: boolean
  } | null>(null)
  const didDrag = React.useRef(false)

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Ignore secondary/middle buttons and single-slide carousels; let those clicks through.
    if (!draggable || count <= 1 || (e.pointerType === "mouse" && e.button !== 0)) return
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      width: e.currentTarget.getBoundingClientRect().width,
      offset: 0,
      active: false,
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.pointerId !== e.pointerId) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.active) {
      // Not yet committed: bail until the gesture reads as a horizontal swipe, leaving
      // vertical/ambiguous moves to the browser's scroll.
      if (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy)) return
      d.active = true
      didDrag.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    // Rubber-band: only a third of the travel registers when dragging past either end.
    const overscroll = (index <= 0 && dx > 0) || (index >= count - 1 && dx < 0)
    d.offset = overscroll ? dx * 0.35 : dx
    setOffset(d.offset)
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.pointerId !== e.pointerId) return
    drag.current = null
    if (d.active) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
      const threshold = Math.max(40, d.width * 0.15)
      if (d.offset <= -threshold) setIndex(index + 1)
      else if (d.offset >= threshold) setIndex(index - 1)
    }
    setDragging(false)
    setOffset(0)
  }

  function suppressDragClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!didDrag.current) return
    // A completed swipe lands on a child (image/link) — swallow the synthetic click it triggers.
    e.preventDefault()
    e.stopPropagation()
    didDrag.current = false
  }

  return (
    <div
      data-slot="carousel-viewport"
      className={slots.viewport({ draggable, dragging })}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={suppressDragClick}
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        data-slot="carousel-track"
        className={slots.track({ dragging, className })}
        style={{
          transform: dragging
            ? `translate3d(calc(${-index * 100}% + ${offset}px), 0, 0)`
            : `translateX(${-index * 100}%)`,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

// ─── CarouselSlide ────────────────────────────────────────────────────────────────

export type CarouselSlideProps = React.ComponentProps<"div">

export function CarouselSlide({ className, ...props }: CarouselSlideProps) {
  const { slots } = useCarouselContext("CarouselSlide")
  return (
    <div
      data-slot="carousel-slide"
      role="group"
      aria-roledescription="slide"
      className={slots.slide({ className })}
      {...props}
    />
  )
}

// ─── CarouselPrevious / CarouselNext — overlay nav arrows ────────────────────────

export type CarouselArrowProps = Omit<
  React.ComponentProps<typeof Button>,
  "iconOnly" | "size" | "variant"
>

// Reveal-on-hover (and on keyboard focus, for a11y). At a bound the arrow stays inert and
// hidden; `disabled:opacity-0` beats Button's own `disabled:opacity-50` (same variant prefix,
// merged last) for a clean disappear instead of a half-faded dead arrow.
function arrowReveal(disabled: boolean) {
  return disabled
    ? "disabled:opacity-0"
    : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
}

export function CarouselPrevious({ className, ...props }: CarouselArrowProps) {
  const { slots, index, setIndex } = useCarouselContext("CarouselPrevious")
  const disabled = index <= 0
  return (
    <Button
      data-slot="carousel-previous"
      variant="secondary"
      size="lg"
      iconOnly
      tooltip={false}
      aria-label="Previous slide"
      disabled={disabled}
      onClick={() => setIndex(index - 1)}
      className={slots.arrow({ side: "left", className: cn(arrowReveal(disabled), className) })}
      {...props}
    >
      <CaretLeft />
    </Button>
  )
}

export function CarouselNext({ className, ...props }: CarouselArrowProps) {
  const { slots, index, count, setIndex } = useCarouselContext("CarouselNext")
  const disabled = index >= count - 1
  return (
    <Button
      data-slot="carousel-next"
      variant="secondary"
      size="lg"
      iconOnly
      tooltip={false}
      aria-label="Next slide"
      disabled={disabled}
      onClick={() => setIndex(index + 1)}
      className={slots.arrow({ side: "right", className: cn(arrowReveal(disabled), className) })}
      {...props}
    >
      <CaretRight />
    </Button>
  )
}

// ─── CarouselIndicators — the clickable dots ─────────────────────────────────────

export interface CarouselIndicatorsProps extends React.ComponentProps<"div"> {
  /** Builds each dot's accessible label. @default i => `Go to slide ${i + 1}` */
  dotLabel?: (index: number) => string
  /** Float the dots over the bottom-right of the image (white dots) instead of below it. */
  overlay?: boolean
}

export function CarouselIndicators({
  className,
  dotLabel = (i) => `Go to slide ${i + 1}`,
  overlay = false,
  ...props
}: CarouselIndicatorsProps) {
  const { slots, count, index, setIndex } = useCarouselContext("CarouselIndicators")
  if (count <= 1) return null
  return (
    <div
      data-slot="carousel-indicators"
      className={slots.indicators({ overlay, className })}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => {
        const active = i === index
        return (
          <button
            key={i}
            type="button"
            aria-label={dotLabel(i)}
            aria-current={active || undefined}
            onClick={() => setIndex(i)}
            className={slots.indicator({ active, overlay })}
          />
        )
      })}
    </div>
  )
}
