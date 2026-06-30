"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { TrendUp, TrendDown, Minus } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { createContext } from "@/lib/create-context"
import { useDensity, type Density } from "@/lib/density"
import { tv, type VariantProps } from "@/lib/tv"
import { Chart, ChartArea, ChartLine, ChartTooltip } from "@/components/ui/chart"

/**
 * Stat: the Data Display KPI/metric card. A multi-part component built like Card:
 * one `tv` recipe with `slots`, shared variants flowing to every part through React
 * Context (never prop-drilled or cloned). Compose the parts (`StatLabel`,
 * `StatValue`, `StatTrend`, `StatIcon`, `StatSparkline`) to assemble a dashboard tile.
 * See docs/ARCHITECTURE.md §2.
 */
export const statVariants = tv({
  slots: {
    root: "flex flex-col rounded-xl border bg-card text-card-foreground",
    // Header is a row so the label sits left and an icon/action rides top-right.
    header: "flex items-start justify-between gap-3",
    label: "text-sm font-medium text-muted-foreground",
    // tabular-nums so a live-updating figure never reflows its own width.
    value: "font-semibold leading-none tracking-tight tabular-nums text-foreground",
    // Soft chip; the directional tone (success/destructive/muted) is applied per
    // instance in StatTrend, since each trend carries its own direction.
    trend:
      "inline-flex w-fit items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs font-medium tabular-nums [&>svg]:size-3.5",
    caption: "text-sm text-pretty text-muted-foreground",
    footer: "flex items-center gap-2",
    // Concentric radius: the card is rounded-xl (16px), so the inner tile drops to lg.
    icon: "grid shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground [&>svg]:size-5",
    sparkline: "w-full",
  },
  variants: {
    variant: {
      // polish: prefer shadow for depth over hard borders.
      default: { root: "border-border shadow-xs" },
      outline: { root: "border-border shadow-none" },
      elevated: { root: "border-transparent shadow-lg" },
    },
    // Density is Koala's cross-cutting spacing axis (see lib/density.tsx). For Stat it
    // governs padding, gap, value size, and the icon tile. `compact` is the dashboard
    // default; `comfortable` is the roomier marketing alternative.
    density: {
      compact: { root: "gap-2.5 p-4", value: "text-2xl", icon: "size-9" },
      comfortable: { root: "gap-3 p-5", value: "text-3xl", icon: "size-10" },
    },
    // When the whole tile is a link/button, add affordance: pointer, hover lift, and a
    // focus ring. Display tiles stay inert (a KPI card is data, not a control).
    interactive: {
      true: {
        // A full tile scaling 0.96 reads janky; 0.98 gives press feedback on a large
        // surface while staying above the 0.95 floor. Transition only the two properties
        // that actually move (the hover shadow and the press scale), never the catch-all.
        root: "cursor-pointer transition-[box-shadow,transform] duration-fast ease-out hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      },
    },
    // Set automatically when a tile sits inside a StatGroup. The group owns the one
    // shared border, radius, and shadow, so each tile drops its own chrome and lies
    // flush, keeping bg-card so it paints over the group's hairline-divider backdrop.
    // (border-width, not border-color: border-0 wins regardless of the variant's color.)
    grouped: {
      true: { root: "rounded-none border-0 shadow-none" },
    },
  },
  defaultVariants: {
    variant: "default",
    density: "compact",
  },
})

type StatSlots = ReturnType<typeof statVariants>
const [StatProvider, useStatContext] = createContext<{
  slots: StatSlots
  density: Density
}>("Stat")

/**
 * Ambient flag a {@link StatGroup} sets so every nested {@link Stat} renders flush
 * (no own border/radius/shadow). A plain Context with a safe `false` default (not the
 * typed factory) because this is an *optional* signal: a Stat is perfectly valid on its
 * own, so it must read `false` outside a group rather than throw.
 */
const StatGroupContext = React.createContext(false)

export interface StatProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statVariants> {
  asChild?: boolean
}

/**
 * Parts are exported individually (not `Stat.Value` dot-notation) because namespaced
 * statics don't survive the RSC server→client boundary; only named exports do.
 * Compose as `<Stat><StatLabel>…`.
 */
export function Stat({
  className,
  variant,
  density,
  interactive,
  asChild = false,
  ...props
}: StatProps) {
  // Density resolves prop > provider > "compact"; compute the slots once, every part
  // reads them from context. The resolved density is shared too, so StatSparkline can
  // bleed past the exact card padding.
  const resolvedDensity = useDensity(density)
  // Inside a StatGroup the tile sheds its own chrome; standalone it keeps it.
  const grouped = React.useContext(StatGroupContext)
  const slots = statVariants({ variant, interactive, density: resolvedDensity, grouped })
  const Comp = asChild ? Slot.Root : "div"
  return (
    <StatProvider slots={slots} density={resolvedDensity}>
      <Comp data-slot="stat" className={slots.root({ className })} {...props} />
    </StatProvider>
  )
}

export function StatHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useStatContext("StatHeader")
  return <div data-slot="stat-header" className={slots.header({ className })} {...props} />
}

export function StatLabel({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useStatContext("StatLabel")
  return <div data-slot="stat-label" className={slots.label({ className })} {...props} />
}

export function StatValue({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useStatContext("StatValue")
  return <div data-slot="stat-value" className={slots.value({ className })} {...props} />
}

export function StatCaption({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useStatContext("StatCaption")
  return <div data-slot="stat-caption" className={slots.caption({ className })} {...props} />
}

export function StatFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useStatContext("StatFooter")
  return <div data-slot="stat-footer" className={slots.footer({ className })} {...props} />
}

export function StatIcon({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useStatContext("StatIcon")
  return <div data-slot="stat-icon" aria-hidden className={slots.icon({ className })} {...props} />
}

/** Maps each direction to its arrow + tone. `inverted` flips only the color meaning
 *  (for metrics where down is the good outcome: refunds, churn, bounce rate) while
 *  the arrow keeps pointing the honest way. */
const TREND_ARROW = { up: TrendUp, down: TrendDown, neutral: Minus } as const
const TREND_TONE = {
  positive: "border-success/20 bg-success/10 text-success",
  negative: "border-destructive/20 bg-destructive/10 text-destructive",
  neutral: "border-border bg-muted text-muted-foreground",
} as const

export interface StatTrendProps extends React.ComponentProps<"span"> {
  /** Arrow direction. Drives the glyph and, by default, the color. */
  direction?: "up" | "down" | "neutral"
  /** Flip the color meaning without flipping the arrow (down-is-good metrics). */
  inverted?: boolean
}

export function StatTrend({
  className,
  direction = "up",
  inverted = false,
  children,
  ...props
}: StatTrendProps) {
  const { slots } = useStatContext("StatTrend")
  const Arrow = TREND_ARROW[direction]
  const tone =
    direction === "neutral"
      ? "neutral"
      : (direction === "up") !== inverted
        ? "positive"
        : "negative"

  return (
    <span
      data-slot="stat-trend"
      data-direction={direction}
      className={slots.trend({ className: cn(TREND_TONE[tone], className) })}
      {...props}
    >
      <Arrow aria-hidden />
      {children}
    </span>
  )
}

/** Cancel the card's bottom (and side) padding so the trend bleeds to the edge,
 *  matched exactly to the resolved density. */
const SPARKLINE_BLEED: Record<Density, string> = {
  compact: "-mx-4 -mb-4 rounded-b-xl",
  comfortable: "-mx-5 -mb-5 rounded-b-xl",
}

export interface StatSparklineProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** The series to plot. Rendered as a soft area fill under a trend line. */
  data: number[]
  /** Stroke width in px. */
  strokeWidth?: number
  /** Show a gliding tooltip with the value at each point on hover. */
  tooltip?: boolean
  /** Format each point's value in the tooltip. */
  valueFormatter?: (value: number) => string
}

/**
 * StatSparkline: a chromeless trend built on {@link Chart} in `sparkline` mode. It
 * paints in `currentColor`, so set the hue with a text utility (e.g.
 * `className="text-success"`) and it themes for free. It bleeds to the bottom and side
 * edges of the tile (no padding gap under the line); pass `tooltip` to light up each
 * point on hover with Koala's gliding {@link Tooltip}.
 */
export function StatSparkline({
  data,
  strokeWidth = 2,
  tooltip = false,
  valueFormatter,
  className,
  ...props
}: StatSparklineProps) {
  const { slots, density } = useStatContext("StatSparkline")
  return (
    <Chart
      data={data}
      sparkline
      data-slot="stat-sparkline"
      // Decorative: the figure already lives in StatValue, so the chart stays hidden from
      // assistive tech. The tooltip is a mouse-only enhancement.
      aria-hidden
      // w-auto (not w-full) so the negative side margins actually stretch it edge-to-edge.
      className={slots.sparkline({
        className: cn("h-14 w-auto overflow-hidden", SPARKLINE_BLEED[density], className),
      })}
      {...props}
    >
      <ChartArea />
      <ChartLine strokeWidth={strokeWidth} hideActiveDot={!tooltip} />
      {tooltip && (
        <ChartTooltip valueFormatter={valueFormatter} labelFormatter={(i) => `Point ${i}`} />
      )}
    </Chart>
  )
}

/**
 * StatGroup: fuses a row of {@link Stat} tiles into one segmented surface, the way a
 * dashboard header bands several KPIs together instead of floating them as separate
 * cards. The group owns the single border, radius, and shadow; nested tiles read the
 * {@link StatGroupContext} flag and shed their own chrome to lie flush.
 *
 * The dividers are the trick: the container paints `bg-border` under a `gap-px` grid,
 * and each tile keeps `bg-card` on top, so all that shows through the seams is a
 * hairline. Unlike `divide-x`/`divide-y`, this stays clean across both axes and when
 * tiles wrap to a new row. `overflow-hidden` clips the square tile corners to the
 * group's radius.
 */
export const statGroupVariants = tv({
  base: "grid gap-px overflow-hidden rounded-xl bg-border",
  variants: {
    variant: {
      // Mirror Stat's own variants so a group reads as one big tile.
      default: "border border-border shadow-xs",
      outline: "border border-border shadow-none",
      elevated: "border-0 shadow-lg",
    },
    // Columns at the widest breakpoint; everything steps down to 1→2 below it so the
    // band never crushes its tiles on narrow screens.
    columns: {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    variant: "default",
    columns: 4,
  },
})

export interface StatGroupProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statGroupVariants> {
  asChild?: boolean
}

export function StatGroup({
  className,
  variant,
  columns,
  asChild = false,
  ...props
}: StatGroupProps) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <StatGroupContext.Provider value={true}>
      <Comp
        data-slot="stat-group"
        className={statGroupVariants({ variant, columns, className })}
        {...props}
      />
    </StatGroupContext.Provider>
  )
}
