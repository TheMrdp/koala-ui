"use client"

import * as React from "react"

import { createContext } from "@/lib/create-context"
import { useDensity } from "@/lib/density"
import { tv, type VariantProps } from "@/lib/tv"
import { cn } from "@/lib/utils"

/**
 * Layout — the SaaS app-shell pattern. A multi-part component: one `tv` recipe with
 * `slots`, density flowing to every part through React Context (see docs/ARCHITECTURE.md §2).
 *
 * The headline idea is the **sidebar indent**: the content sits inside an elevated,
 * rounded panel (`LayoutContent`) inset from the page canvas on every side, so the
 * `bg-background` page reads as a gutter framing the panel — the sidebar lives in that
 * gutter. Inside the panel, `LayoutContainer` centers a max-width column whose
 * `LayoutHeader` carries the breadcrumbs.
 *
 *   <Layout>
 *     <LayoutSidebar>…nav…</LayoutSidebar>
 *     <LayoutContent>           // the inset, rounded, elevated panel ("the indent")
 *       <LayoutContainer>       // centered max-width column
 *         <LayoutHeader>        // breadcrumbs row at the top
 *           <Breadcrumb>…</Breadcrumb>
 *         </LayoutHeader>
 *         …page content…
 *       </LayoutContainer>
 *     </LayoutContent>
 *   </Layout>
 *
 * Height: defaults to `min-h-svh` so the shell fills the viewport and grows with the
 * page. For a panel that scrolls independently (sidebar pinned), give the root a fixed
 * height: `<Layout className="h-svh overflow-hidden">`.
 */
export const layoutVariants = tv({
  slots: {
    root: "flex min-h-svh w-full bg-background",
    // The rail lives in the canvas gutter and pins to the viewport so it stays put while
    // the content panel scrolls. Hidden below `lg` — drive a mobile drawer from there.
    sidebar: "sticky top-0 hidden h-svh w-64 shrink-0 flex-col lg:flex",
    // The indent: an elevated card surface inset from the canvas. `lg:ml-0` drops the
    // left inset so the panel sits flush against the sidebar's own padding. `min-h-0`
    // lets it become a scroll container when the root is given a fixed height.
    // polish: shadow over a hard border for depth (ring is the
    // hairline that keeps it crisp where colors tie, e.g. white-on-white in light).
    //
    // `--surface` is the DS contract for "what surface am I sitting on" (same one Dialog
    // sets to `--popover`). Declaring it as `--card` here makes every opaque, surface-aware
    // child — Input, Select, a minimal DataTable — rebase onto the panel and read as
    // transparent instead of painting a `--background` block over the lighter card.
    content:
      "m-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto rounded-2xl bg-card text-card-foreground shadow-sm ring-1 ring-border [--surface:var(--card)] lg:ml-0",
    // The max-width column. Width is a local prop on LayoutContainer (see below).
    container: "mx-auto w-full",
    // The top row of the column — breadcrumbs on the left, optional actions on the right.
    header: "flex items-center justify-between gap-4",
  },
  variants: {
    // Density is Koala's cross-cutting spacing axis (lib/density.tsx). Here it tunes the
    // rail padding, the column's inner padding, and the header's bottom gap. `compact` is
    // the Koala default (app UI); `comfortable` is the roomier marketing alternative.
    //
    // The column's *horizontal* padding is responsive (the canonical `px-4 sm:px-6 lg:px-8`
    // idiom) so content hugs the edges on phones and breathes on wide desktops; the gutter
    // grows with the viewport instead of being a single fixed value. Vertical padding stays
    // constant per density to keep a steady reading rhythm down the page.
    density: {
      compact: { sidebar: "gap-1 p-3", container: "px-4 py-6 sm:px-6 lg:px-8", header: "mb-6" },
      comfortable: {
        sidebar: "gap-1 p-4",
        container: "px-6 py-10 sm:px-8 lg:px-10",
        header: "mb-8",
      },
    },
  },
  defaultVariants: {
    density: "compact",
  },
})

type LayoutSlots = ReturnType<typeof layoutVariants>
const [LayoutProvider, useLayoutContext] = createContext<{ slots: LayoutSlots }>("Layout")

export interface LayoutProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof layoutVariants> {}

/**
 * Parts are exported individually (not as `Layout.Sidebar` dot-notation) because
 * namespaced statics don't survive the RSC server→client boundary — only named exports
 * do. Density resolves once at the root (prop > provider > "compact") and the computed
 * slots flow to every part through context.
 */
export function Layout({ className, density, ...props }: LayoutProps) {
  const slots = layoutVariants({ density: useDensity(density) })
  return (
    <LayoutProvider slots={slots}>
      <div data-slot="layout" className={slots.root({ className })} {...props} />
    </LayoutProvider>
  )
}

export function LayoutSidebar({ className, ...props }: React.ComponentProps<"aside">) {
  const { slots } = useLayoutContext("LayoutSidebar")
  return <aside data-slot="layout-sidebar" className={slots.sidebar({ className })} {...props} />
}

export function LayoutContent({ className, ...props }: React.ComponentProps<"main">) {
  const { slots } = useLayoutContext("LayoutContent")
  return <main data-slot="layout-content" className={slots.content({ className })} {...props} />
}

/** The centered max-width column. `width` is a part-local axis, so it stays out of the
 * shared recipe; the values are complete class strings the Tailwind compiler can see. */
const layoutContainerWidths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const

export interface LayoutContainerProps extends React.ComponentProps<"div"> {
  /** Max width of the content column. @default "default" */
  width?: keyof typeof layoutContainerWidths
}

export function LayoutContainer({
  className,
  width = "default",
  ...props
}: LayoutContainerProps) {
  const { slots } = useLayoutContext("LayoutContainer")
  return (
    <div
      data-slot="layout-container"
      className={slots.container({ className: cn(layoutContainerWidths[width], className) })}
      {...props}
    />
  )
}

export function LayoutHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useLayoutContext("LayoutHeader")
  return <div data-slot="layout-header" className={slots.header({ className })} {...props} />
}
