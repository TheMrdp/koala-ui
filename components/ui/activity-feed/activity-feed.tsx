"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { createContext } from "@/lib/create-context"
import { useDensity } from "@/lib/density"
import { tv, type VariantProps } from "@/lib/tv"

/**
 * ActivityFeed: a vertical timeline of activity events: comments, mentions, status
 * changes, uploads, reactions, members joining… Built like Card/Ranking/FileCard, one
 * `tv` recipe with `slots`, shared state (density + whether the connecting rail shows)
 * flowing to every part through React Context, never prop-drilled or cloned. Compose the
 * named parts; an event is as small as an actor + a line of text, or as rich as a quoted
 * comment card with image and file attachments. See docs/ARCHITECTURE.md §2.
 *
 * The connecting rail is pure layout, no JS: each item's marker column `self-stretch`es to
 * the item height and an `ActivityConnector` (a `flex-1` hairline) fills the space below the
 * marker down to the next one. The feed root hides the connector on its last `<li>` and
 * collapses that item's bottom padding, so the rail always stops cleanly at the final event.
 */
export const activityFeedVariants = tv({
  slots: {
    // The timeline is a semantic ordered list (most-recent first reads top-down). The two
    // child selectors close the rail on the final event: drop its connector, and zero its
    // content padding so the column doesn't leave a tail of empty rail below the last marker.
    root: [
      "flex flex-col",
      "[&>li:last-child_[data-slot=activity-connector]]:hidden",
      "[&>li:last-child_[data-slot=activity-content]]:pb-0",
    ],
    // align-items: stretch (the flex default) is load-bearing: it lets the marker column
    // grow to the full item height so the connector can reach the next marker.
    item: "relative flex",
    // The marker column is a FIXED-WIDTH rail anchor (w-8 = the largest marker, an Avatar sm), so
    // the connector sits at the same x for every event regardless of what the marker holds.
    // `self-stretch` makes it as tall as the content; the head + connector stack vertically in it.
    marker: "relative flex w-8 shrink-0 flex-col items-center self-stretch",
    // The head is a FIXED-HEIGHT box (h-8) that vertically centers the marker, so a 28px icon
    // tile, a 32px round Avatar, and a dot all share one optical center, and that center lines up
    // with the header's first line (same min-height). This is what keeps a single-line event's
    // marker and text aligned.
    markerHead: "flex h-8 items-center justify-center",
    // The tinted/avatar tile. Concentric, circular by default so a status glyph and a round Avatar
    // share the same silhouette. Small glyph (size-3.5): the tint ring carries the category, the
    // glyph is secondary.
    icon: "grid shrink-0 place-items-center rounded-full border [&>svg]:size-3.5",
    // A low-emphasis marker for minor events: a small dot centered in the head's footprint.
    dot: "grid shrink-0 place-items-center",
    dotInner: "size-2 rounded-full ring-4 ring-background",
    // The rail: a hairline that grows to fill the column below the head. `mt-1` keeps a small,
    // consistent gap between the marker and the line. Runtime-free.
    connector: "mt-1 w-px flex-1 bg-border",
    // The event body. min-w-0 lets long text/attachments wrap instead of blowing out the row;
    // pb sets the vertical rhythm (and the rail length) and is tuned by density below.
    content: "flex min-w-0 flex-1 flex-col",
    // The lead line: actor + action + timestamp. `min-h-8` matches the marker head so a single
    // line of text centers against the marker; it wraps gracefully on narrow widths.
    header: "flex min-h-8 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm leading-snug text-muted-foreground",
    actor: "font-medium text-foreground",
    // tabular-nums so a live "2m ago → 3m ago" tick never reflows the line.
    time: "text-xs tabular-nums text-muted-foreground",
    // A muted prose block for descriptions / one-liners under the header.
    body: "mt-1 text-pretty text-sm text-muted-foreground",
    // A nested surface for quoted content (a comment, a review). Concentric radius: the feed
    // usually sits inside a rounded-xl Card, so the quote steps down to lg.
    card: "mt-2 rounded-lg border bg-muted/40 px-3 py-2.5 text-sm text-foreground",
    // Attachments stack vertically: drop FileCard rows in for files (don't re-roll the chip), and
    // an ActivityImage gallery row for images. `mt-1.5` since it follows the header's own padding.
    attachments: "mt-1.5 flex flex-col gap-2",
    // A small image thumbnail for galleries. The inset ring is the "image outline" polish: pure
    // black/white at low alpha so the edge reads on any surface without looking like a tinted border.
    image:
      "relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-inset ring-black/10 dark:ring-white/10 [&>img]:size-full [&>img]:object-cover",
  },
  variants: {
    // Density is Koala's cross-cutting spacing axis (see lib/density.tsx). For the feed it
    // tunes the gap to the rail and the per-event rhythm (which also sets the rail's length).
    // `comfortable` is the default marketing/inbox spacing; `compact` tightens it for dense
    // app timelines. Marker footprint stays fixed so the rail aligns identically at both densities.
    density: {
      comfortable: { item: "gap-3", content: "pb-5", icon: "size-7", dot: "size-7" },
      compact: { item: "gap-2.5", content: "pb-4", icon: "size-7", dot: "size-7" },
    },
  },
  defaultVariants: {
    density: "comfortable",
  },
})

type ActivityFeedSlots = ReturnType<typeof activityFeedVariants>

const [ActivityFeedProvider, useActivityFeedContext] = createContext<{
  slots: ActivityFeedSlots
  connector: boolean
}>("ActivityFeed")

/* ----------------------------------------------------------------------- tones --- */

/** The soft color a marker carries: pick one that matches the kind of event. */
export type ActivityTone =
  | "default"
  | "brand"
  | "success"
  | "warning"
  | "info"
  | "destructive"
  | "purple"
  | "pink"
  | "teal"
  | "orange"

/** Soft tile tint per tone, following the Badge pattern (`border-<role>/20 bg-<role>/10
 *  text-<role>`) so every tone re-themes across all four palettes. */
const ICON_TONES: Record<ActivityTone, string> = {
  default: "border-transparent bg-muted text-muted-foreground",
  brand: "border-brand/20 bg-brand/10 text-brand",
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-warning/10 text-warning",
  info: "border-info/20 bg-info/10 text-info",
  destructive: "border-destructive/20 bg-destructive/10 text-destructive",
  purple: "border-purple/20 bg-purple/10 text-purple",
  pink: "border-pink/20 bg-pink/10 text-pink",
  teal: "border-teal/20 bg-teal/10 text-teal",
  orange: "border-orange/20 bg-orange/10 text-orange",
}

/** Solid dot fill per tone for the low-emphasis `ActivityDot` marker. */
const DOT_TONES: Record<ActivityTone, string> = {
  default: "bg-border",
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  destructive: "bg-destructive",
  purple: "bg-purple",
  pink: "bg-pink",
  teal: "bg-teal",
  orange: "bg-orange",
}

/* ------------------------------------------------------------------------ parts --- */

export interface ActivityFeedProps
  extends React.ComponentProps<"ol">,
    VariantProps<typeof activityFeedVariants> {
  /** Draw the vertical rail connecting markers. Set `false` for a plain list of events. @default true */
  connector?: boolean
}

/**
 * Parts are exported individually (not `ActivityFeed.Item` dot-notation) because namespaced
 * statics don't survive the RSC server→client boundary; only named exports do. Compose as
 * `<ActivityFeed><ActivityItem><ActivityMarker>…</ActivityMarker><ActivityContent>…`.
 */
export function ActivityFeed({
  className,
  density,
  connector = true,
  ...props
}: ActivityFeedProps) {
  const slots = activityFeedVariants({ density: useDensity(density) })
  return (
    <ActivityFeedProvider slots={slots} connector={connector}>
      <ol data-slot="activity-feed" className={slots.root({ className })} {...props} />
    </ActivityFeedProvider>
  )
}

export function ActivityItem({ className, ...props }: React.ComponentProps<"li">) {
  const { slots } = useActivityFeedContext("ActivityItem")
  return <li data-slot="activity-item" className={slots.item({ className })} {...props} />
}

/**
 * ActivityMarker: the rail column. Drop an {@link ActivityIcon}, {@link ActivityDot}, or an
 * `Avatar` inside as the visual; the connecting rail is appended automatically (and hidden on
 * the feed's last item, or whenever the feed's `connector` is `false`).
 */
export function ActivityMarker({ className, children, ...props }: React.ComponentProps<"div">) {
  const { slots, connector } = useActivityFeedContext("ActivityMarker")
  return (
    <div data-slot="activity-marker" className={slots.marker({ className })} {...props}>
      {/* Fixed-height head vertically centers whatever marker is dropped in, so its center lines
          up with the header's first line and with every other event's marker. */}
      <div data-slot="activity-marker-head" className={slots.markerHead()}>
        {children}
      </div>
      {connector && (
        <span data-slot="activity-connector" aria-hidden className={slots.connector()} />
      )}
    </div>
  )
}

export interface ActivityIconProps extends React.ComponentProps<"div"> {
  /** Soft tint matching the event kind. @default "default" */
  tone?: ActivityTone
}

/**
 * ActivityIcon: the tinted tile marker. Pass a Phosphor glyph as `children` and a `tone`
 * that matches the event (e.g. `info` for a comment, `teal` for an upload, `destructive` for
 * a deletion). A 28px tile centered in the marker head, so it aligns with avatar and dot markers.
 */
export function ActivityIcon({ tone = "default", className, ...props }: ActivityIconProps) {
  const { slots } = useActivityFeedContext("ActivityIcon")
  return (
    <div
      data-slot="activity-icon"
      aria-hidden
      className={slots.icon({ className: cn(ICON_TONES[tone], className) })}
      {...props}
    />
  )
}

export interface ActivityDotProps extends React.ComponentProps<"div"> {
  /** Solid dot color. @default "default" */
  tone?: ActivityTone
}

/**
 * ActivityDot: a low-emphasis marker for minor events (a field edit, a view). The dot is
 * centered in the same head footprint as {@link ActivityIcon}, so swapping between them keeps
 * the rail perfectly aligned. A background-colored ring lifts it off the rail behind it.
 */
export function ActivityDot({ tone = "default", className, ...props }: ActivityDotProps) {
  const { slots } = useActivityFeedContext("ActivityDot")
  return (
    <div data-slot="activity-dot" aria-hidden className={slots.dot({ className })} {...props}>
      <span className={cn(slots.dotInner(), DOT_TONES[tone])} />
    </div>
  )
}

export function ActivityContent({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useActivityFeedContext("ActivityContent")
  return <div data-slot="activity-content" className={slots.content({ className })} {...props} />
}

export function ActivityHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useActivityFeedContext("ActivityHeader")
  return <div data-slot="activity-header" className={slots.header({ className })} {...props} />
}

export interface ActivityActorProps extends React.ComponentProps<"span"> {
  /** Render the actor as a child element (e.g. a profile link) via Radix Slot. */
  asChild?: boolean
}

/** ActivityActor: the person/thing that acted. `asChild` to make it a profile link. */
export function ActivityActor({ className, asChild = false, ...props }: ActivityActorProps) {
  const { slots } = useActivityFeedContext("ActivityActor")
  const Comp = asChild ? Slot.Root : "span"
  return <Comp data-slot="activity-actor" className={slots.actor({ className })} {...props} />
}

export type ActivityTimeProps = React.ComponentProps<"time">

/**
 * ActivityTime: the muted, tabular timestamp. Pass `dateTime` (an ISO string) for the machine
 * value and a friendly relative label as children ("2h ago"). Renders a real `<time>` element.
 */
export function ActivityTime({ className, ...props }: ActivityTimeProps) {
  const { slots } = useActivityFeedContext("ActivityTime")
  return <time data-slot="activity-time" className={slots.time({ className })} {...props} />
}

export function ActivityBody({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useActivityFeedContext("ActivityBody")
  return <div data-slot="activity-body" className={slots.body({ className })} {...props} />
}

/**
 * ActivityCard: a nested surface for quoted content: a posted comment, a review, a changelog
 * note. Steps the radius down concentrically from the Card the feed usually lives in.
 */
export function ActivityCard({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useActivityFeedContext("ActivityCard")
  return <div data-slot="activity-card" className={slots.card({ className })} {...props} />
}

/**
 * ActivityAttachments: a vertical stack for an event's payload. Drop {@link FileCard} rows in
 * for files (reuse the canonical component, don't re-roll a chip), and an {@link ActivityImage}
 * gallery row for images. `FileCard` already ships the type-tinted icon, name, and meta in a
 * compact density, so a feed stays consistent with the rest of the file UI.
 */
export function ActivityAttachments({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useActivityFeedContext("ActivityAttachments")
  return (
    <div data-slot="activity-attachments" className={slots.attachments({ className })} {...props} />
  )
}

export interface ActivityImageProps extends React.ComponentProps<"img"> {
  alt: string
}

/**
 * ActivityImage: a small image attachment thumbnail, clipped to the concentric radius with the
 * house image-outline ring. Lay several out in a `flex flex-wrap gap-2` row for a gallery. Sized
 * 56px by default; override with `className`. Always give a meaningful `alt`.
 */
export function ActivityImage({ className, alt, ...props }: ActivityImageProps) {
  const { slots } = useActivityFeedContext("ActivityImage")
  return (
    <div data-slot="activity-image" className={slots.image({ className })}>
      {/* Native img: feed attachments are commonly remote/object URLs next/image can't optimize. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt={alt} {...props} />
    </div>
  )
}
