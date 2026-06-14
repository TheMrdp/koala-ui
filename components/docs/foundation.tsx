import { cn } from "@/lib/utils"

/**
 * A color-role swatch. `surface` is a bg-* utility (e.g. "bg-card"); the chip is
 * theme-aware, so switching themes in the header updates every swatch live.
 */
export function Swatch({
  surface,
  token,
  description,
  bordered,
}: {
  surface: string
  token: string
  description?: string
  /** Add a border so near-background surfaces stay visible. */
  bordered?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "size-12 shrink-0 rounded-lg",
          surface,
          bordered && "border border-border",
        )}
      />
      <div className="min-w-0">
        <p className="font-mono text-xs text-foreground">{token}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

/** A labelled grid of swatches under a sub-heading. */
export function SwatchGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}

/**
 * A captioned specimen for grid galleries — a centered sample above a calm, two-tier
 * caption: a monospace identifier and an optional muted meta line. One visual language for
 * every "here are the variants" gallery (radius, shadows, avatar sizes/shape/status…), so
 * specimens read consistently across the docs. `<figure>`/`<figcaption>` ties the label to
 * its sample for assistive tech; `tabular-nums` keeps numeric metas aligned across a row.
 */
export function Specimen({
  label,
  meta,
  children,
}: {
  label: React.ReactNode
  meta?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center">{children}</div>
      <figcaption className="flex flex-col items-center gap-1">
        <span className="font-mono text-xs text-foreground">{label}</span>
        {meta && (
          <span className="text-[11px] leading-none text-muted-foreground tabular-nums">
            {meta}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

/**
 * A single row in a token scale: name + usage utility + value + a visual sample.
 * Used by the spacing, radius, shadow and type-scale pages.
 *
 * `detail` renders a right-aligned, muted column for a derived/secondary value
 * (e.g. a resolved line-height or a px equivalent). It is hidden on narrow
 * viewports so the sample never gets crowded. `align` top-aligns the label
 * column for multi-line samples (leading demos).
 */
export function ScaleRow({
  name,
  meta,
  detail,
  align = "center",
  children,
}: {
  name: string
  meta?: string
  detail?: React.ReactNode
  align?: "center" | "start"
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex gap-4 border-b border-border py-3 last:border-0",
        align === "start" ? "items-start" : "items-center",
      )}
    >
      <div className="w-28 shrink-0">
        <p className="font-mono text-xs text-foreground">{name}</p>
        {meta && (
          <p className="font-mono text-[11px] text-muted-foreground tabular-nums">{meta}</p>
        )}
      </div>
      <div className="min-w-0 flex-1">{children}</div>
      {detail && (
        <p className="hidden w-32 shrink-0 text-right font-mono text-[11px] text-muted-foreground tabular-nums sm:block">
          {detail}
        </p>
      )}
    </div>
  )
}
