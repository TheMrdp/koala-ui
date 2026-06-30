"use client"

import * as React from "react"
import Image, { type ImageProps } from "next/image"
import { Slot } from "radix-ui"

import { createContext } from "@/lib/create-context"
import { tv, type VariantProps } from "@/lib/tv"

/**
 * Bento: an asymmetric marketing grid of feature tiles (the "deliver fast without sacrificing
 * quality" board). Multi-part like Card/Hero: one `tv` recipe with `slots`, shared through a
 * typed React Context so every part of a tile reads the same styles (never prop-drilled or
 * cloned). See docs/ARCHITECTURE.md §2.
 *
 * `Bento` is the responsive grid (1 col → 2 on sm → 6 on lg). Each `BentoItem` claims a
 * `size` (how many cells it spans) and a `tone` (the icon tint), then composes a tinted
 * `BentoItemIcon`, a `BentoItemTitle`, a `BentoItemDescription`, and either a
 * `BentoItemImage` (a screenshot that peeks up from the bottom and is clipped by the tile
 * edge) or a freeform `BentoItemMedia`. Marketing is comfortable by nature, so there's no
 * density axis.
 */
export const bentoVariants = tv({
  slots: {
    // The grid. 6 lg columns give room for asymmetric spans; tiles stack on small screens.
    root: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6",
    // One tile: a static card surface (no hover motion or state change by design).
    // `overflow-hidden` is what clips a peeking BentoItemImage at the tile's rounded edge.
    item: "relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs",
    // The tinted icon chip; the glyph is sized via the direct-child selector.
    icon: "grid size-11 place-items-center rounded-xl [&>svg]:size-6",
    title: "text-lg font-semibold leading-snug text-balance",
    description: "text-pretty text-muted-foreground",
    // Freeform visual region: pushed to the bottom so tiles in a row align their media edges.
    media: "mt-auto",
    // A screenshot window that peeks up from the bottom: bled to the tile's bottom edge
    // (-mb-6 cancels the tile padding) and clipped there by the tile's own overflow-hidden.
    // Stays inset from the sides by the tile padding for the floating-window look.
    imageFrame:
      "relative mt-auto -mb-6 w-full overflow-hidden rounded-t-xl border border-b-0 border-border bg-muted shadow-md",
    // object-top shows the top of the shot; the rest is cropped by the frame height.
    image: "object-cover object-top",
  },
  variants: {
    // How many cells the tile claims, plus how tall its peeking image is. `feature` is the
    // tall hero tile (2 rows), `full` spans the whole row as a closing band.
    size: {
      sm: { item: "lg:col-span-2", imageFrame: "h-52" },
      md: { item: "lg:col-span-3", imageFrame: "h-72" },
      lg: { item: "sm:col-span-2 lg:col-span-4", imageFrame: "h-72" },
      feature: { item: "sm:col-span-2 lg:col-span-4 lg:row-span-2", imageFrame: "h-96" },
      full: { item: "sm:col-span-2 lg:col-span-6", imageFrame: "h-72" },
    },
    // Icon tint only: every theme ships these hue roles as soft 10%/solid pairs.
    tone: {
      brand: { icon: "bg-brand/10 text-brand" },
      purple: { icon: "bg-purple/10 text-purple" },
      teal: { icon: "bg-teal/10 text-teal" },
      orange: { icon: "bg-orange/10 text-orange" },
      pink: { icon: "bg-pink/10 text-pink" },
    },
  },
  defaultVariants: {
    size: "sm",
    tone: "brand",
  },
})

type BentoSlots = ReturnType<typeof bentoVariants>
const [BentoItemProvider, useBentoItemContext] = createContext<{ slots: BentoSlots }>("BentoItem")

export type BentoProps = React.ComponentProps<"div">

/**
 * The grid container. Parts are exported individually (not `Bento.Item` dot-notation):
 * namespaced statics don't survive the RSC server→client boundary. Compose as
 * `<Bento><BentoItem><BentoItemIcon>…`.
 */
export function Bento({ className, ...props }: BentoProps) {
  const { root } = bentoVariants()
  return <div data-slot="bento" className={root({ className })} {...props} />
}

export interface BentoItemProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof bentoVariants> {
  /** Render the tile as its child (e.g. an `<a>`) so the whole card becomes one link. */
  asChild?: boolean
}

/** One tile. Owns the `size`/`tone` for itself and its parts via Context. */
export function BentoItem({
  className,
  size,
  tone,
  asChild = false,
  ...props
}: BentoItemProps) {
  const slots = bentoVariants({ size, tone })
  const Comp = asChild ? Slot.Root : "div"
  return (
    <BentoItemProvider slots={slots}>
      <Comp data-slot="bento-item" className={slots.item({ className })} {...props} />
    </BentoItemProvider>
  )
}

/** The tinted icon chip. Pass a single Phosphor icon as the child. */
export function BentoItemIcon({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useBentoItemContext("BentoItemIcon")
  return <div data-slot="bento-item-icon" className={slots.icon({ className })} {...props} />
}

export function BentoItemTitle({ className, ...props }: React.ComponentProps<"h3">) {
  const { slots } = useBentoItemContext("BentoItemTitle")
  return <h3 data-slot="bento-item-title" className={slots.title({ className })} {...props} />
}

export function BentoItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { slots } = useBentoItemContext("BentoItemDescription")
  return (
    <p data-slot="bento-item-description" className={slots.description({ className })} {...props} />
  )
}

/** The bottom-aligned freeform visual region (a stat, a swatch row, custom markup). */
export function BentoItemMedia({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useBentoItemContext("BentoItemMedia")
  return <div data-slot="bento-item-media" className={slots.media({ className })} {...props} />
}

export interface BentoItemImageProps extends Omit<ImageProps, "fill"> {
  /** Extra classes for the framed window (height, side bleed, etc.). */
  frameClassName?: string
}

/**
 * A screenshot/preview that peeks up from the bottom of the tile and is clipped at the tile
 * edge. Built on `next/image` (`fill`), so pass `src`/`alt` and swap the placeholder for a
 * real capture later. Height comes from the tile `size`; override via `frameClassName`.
 */
export function BentoItemImage({
  className,
  frameClassName,
  sizes,
  alt,
  ...props
}: BentoItemImageProps) {
  const { slots } = useBentoItemContext("BentoItemImage")
  return (
    <div data-slot="bento-item-image" className={slots.imageFrame({ className: frameClassName })}>
      <Image
        fill
        alt={alt}
        sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
        className={slots.image({ className })}
        {...props}
      />
    </div>
  )
}
