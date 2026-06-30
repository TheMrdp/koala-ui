import { cn } from "@/lib/utils"

/**
 * A color-role swatch. `surface` is a bg-* utility (e.g. "bg-card"); the chip is
 * theme-aware, so switching themes in the header updates every swatch live.
 *
 * A role has two names worth showing: the `token` a component writes
 * (`bg-background`) and the `variable` it resolves to (`--background`). Passing
 * `variable` documents the token→variable hop right on the swatch, so the
 * "semantic role" layer and the "CSS variable" layer read as one chain.
 */
export function Swatch({
  surface,
  token,
  variable,
  description,
  bordered,
}: {
  surface: string
  token: string
  /** The CSS variable the token resolves to, e.g. "--background". */
  variable?: string
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
        {variable && (
          <p className="font-mono text-[11px] text-muted-foreground">{variable}</p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

/**
 * A literal-color swatch: the bottom layer, a raw value that does NOT respond to
 * theming. `value` is any CSS color string (a hex like "#F84416", an `oklch(…)`, or
 * a Tailwind palette utility's resolved color); it is painted inline so the chip shows
 * the literal, theme-independent color. Use for the "here's the raw value" galleries
 * (the brand hex, the Tailwind palette), never for documenting a role.
 */
export function HexSwatch({
  value,
  name,
  description,
}: {
  /** A literal CSS color, painted as-is (e.g. "#F84416", "oklch(0.648 0.222 34.2)"). */
  value: string
  /** The label shown in mono: usually the literal value itself or a palette name. */
  name: string
  description?: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-12 shrink-0 rounded-lg border border-border"
        style={{ background: value }}
      />
      <div className="min-w-0">
        <p className="font-mono text-xs text-foreground">{name}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

/**
 * The full Tailwind palette as a table: a shared shade header (50→950) over one row
 * per color family, each cell a literal-color chip. Like {@link HexSwatch}, every chip
 * is painted inline from a raw value, so the whole grid is theme-blind. The native
 * `title` carries the family-shade name and its oklch value for hover inspection.
 *
 * Horizontally scrollable on narrow viewports (11 columns + a label never fits a phone),
 * with a min-width so the chips never crush below a tappable size.
 */
export function PaletteTable({
  shades,
  families,
}: {
  shades: readonly number[]
  families: { name: string; values: string[] }[]
}) {
  const cols = `5rem repeat(${shades.length}, minmax(0, 1fr))`
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[44rem] gap-y-2.5" role="table">
        {/* Shade header: the columns every family row aligns to. */}
        <div className="grid items-center gap-1.5" style={{ gridTemplateColumns: cols }} role="row">
          <span />
          {shades.map((shade) => (
            <span
              key={shade}
              className="text-center font-mono text-[11px] text-muted-foreground tabular-nums"
              role="columnheader"
            >
              {shade}
            </span>
          ))}
        </div>
        {families.map((family) => (
          <div
            key={family.name}
            className="grid items-center gap-1.5"
            style={{ gridTemplateColumns: cols }}
            role="row"
          >
            <span className="truncate pr-2 font-mono text-xs text-foreground" role="rowheader">
              {family.name}
            </span>
            {family.values.map((value, i) => (
              <div
                key={shades[i]}
                className="h-9 rounded-md border border-border/40"
                style={{ background: value }}
                title={`${family.name}-${shades[i]} · ${value}`}
                role="cell"
              />
            ))}
          </div>
        ))}
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
 * A captioned specimen for grid galleries: a centered sample above a calm, two-tier
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
