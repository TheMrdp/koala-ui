"use client"

import * as React from "react"
import { Slot } from "radix-ui"
import { CaretUpDown } from "@phosphor-icons/react"

import { createContext } from "@/lib/create-context"
import { useDensity, type Density } from "@/lib/density"
import { tv, type VariantProps } from "@/lib/tv"

/**
 * Sidebar — the application navigation rail. A multi-part component: one `tv` recipe with
 * `slots`, density flowing to every part through React Context (see docs/ARCHITECTURE.md §2).
 *
 * It is composition, not configuration — you stack the parts in the order you want:
 *
 *   <Sidebar>
 *     <SidebarHeader>                  // workspace switcher lives here
 *       <DropdownMenu>…<SidebarSwitcher title="Acme" subtitle="Enterprise" />…</DropdownMenu>
 *     </SidebarHeader>
 *
 *     <SidebarContent>                 // the scroll region: primary nav, then sections
 *       <SidebarGroup>                 // primary actions/pages — first, unlabeled
 *         <SidebarItem active>…</SidebarItem>
 *       </SidebarGroup>
 *       <SidebarGroup>
 *         <SidebarGroupLabel>Favorites</SidebarGroupLabel>
 *         <SidebarItem>…</SidebarItem>
 *       </SidebarGroup>
 *     </SidebarContent>
 *
 *     <SidebarFooter>                  // profile switcher lives here
 *       <DropdownMenu>…<SidebarSwitcher title="Mara" subtitle="mara@acme.io" />…</DropdownMenu>
 *     </SidebarFooter>
 *   </Sidebar>
 *
 * The two switchers (workspace at the top, profile at the bottom) are the same
 * `SidebarSwitcher` trigger, composed with the DS `DropdownMenu` for the menu behavior —
 * Radix owns the keyboard/focus/ARIA, the Sidebar owns the chrome.
 *
 * Behavior (links vs. buttons) is yours: every `SidebarItem` is a `<button>` by default and
 * `asChild` to wrap an `<a>` / Next `<Link>`. Density resolves once at the root (prop >
 * provider > "compact") and the computed slots flow to every part through context.
 */
export const sidebarVariants = tv({
  slots: {
    // The rail itself: a full-height card surface separated from the content by a hairline.
    // `overflow-hidden` so a rounded override (a floating sidebar) clips its children.
    root: [
      "flex h-full w-64 shrink-0 flex-col overflow-hidden",
      "border-r border-border bg-card text-card-foreground",
    ],
    // Top zone — holds the workspace switcher. Hairline below separates it from the scroll.
    header: "flex shrink-0 flex-col gap-1 border-b border-border",
    // The scroll region. `min-h-0` lets it actually become the flex scroll container;
    // `gap` opens air between sections.
    content: "flex min-h-0 flex-1 flex-col overflow-y-auto",
    // Bottom zone — holds the profile switcher. Hairline above mirrors the header.
    footer: "flex shrink-0 flex-col gap-1 border-t border-border",
    // A labeled section ("clear sections"). Items stack tight inside.
    group: "flex flex-col gap-0.5",
    // The small, muted section heading.
    groupLabel:
      "flex items-center font-medium uppercase tracking-wider text-muted-foreground",
    // A nav row. `group/item` lets the icon track the row's hover/active state. The active
    // row reads as a filled accent chip; inactive rows are muted and lift to foreground on
    // hover. make-interfaces-feel-better: specific transition (#14).
    item: [
      "group/item relative flex w-full cursor-pointer select-none items-center gap-3",
      "rounded-md text-sm font-medium text-muted-foreground",
      "outline-none transition duration-fast ease-out",
      "hover:bg-accent hover:text-accent-foreground",
      "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-card",
      "data-[active=true]:bg-accent data-[active=true]:font-semibold data-[active=true]:text-accent-foreground",
      "disabled:pointer-events-none disabled:opacity-50",
      // Leading glyph: a touch larger than text for optical weight; never shrinks.
      "[&>svg]:size-[1.125rem] [&>svg]:shrink-0",
    ],
    // The switcher trigger — an identity row (avatar/logo · title/subtitle · caret) that
    // opens a DropdownMenu. `data-[state=open]` keeps it lit while the menu is open. The
    // gap, hover fill, and padding are set by the `variant` axis below (default vs minimal).
    switcher: [
      "group/switcher relative flex w-full cursor-pointer items-center text-left",
      "rounded-md outline-none transition duration-fast ease-out",
      "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-card",
      "data-[state=open]:bg-accent",
    ],
    switcherText: "flex min-w-0 flex-1 flex-col",
    switcherTitle: "truncate text-sm font-medium text-foreground",
    switcherSubtitle: "truncate text-xs text-muted-foreground",
    switcherCaret: "ml-auto size-4 shrink-0 text-muted-foreground",
    // A divider between groups inside the scroll region.
    separator: "h-px shrink-0 bg-border",
  },
  variants: {
    // Density is Koala's cross-cutting spacing axis (lib/density.tsx). It tunes the zone
    // padding, the inter-section gap, the row height, and the switcher padding — never the
    // radius or color. `compact` is the Koala default (app UI); `comfortable` is roomier.
    density: {
      comfortable: {
        header: "p-3",
        content: "gap-5 p-3",
        footer: "p-3",
        groupLabel: "px-3 pb-1.5 pt-1 text-xs",
        item: "px-3 py-2",
        separator: "-mx-3 my-1",
      },
      compact: {
        header: "p-2",
        content: "gap-4 p-2",
        footer: "p-2",
        groupLabel: "px-2.5 pb-1 pt-0.5 text-xs",
        item: "px-2.5 py-1.5",
        separator: "-mx-2 my-1",
      },
    },
    // Switcher chrome. `default` is the full identity row (logo/avatar · title/subtitle ·
    // caret) with a filled hover. `minimal` is smaller and lighter: a tighter gap, a small
    // muted caret, and reduced padding — pair it with a smaller `leading` (e.g. an
    // `Avatar size="xs"`) for the most compact trigger. Only touches the switcher slots, so
    // the rest of the rail is unaffected. (Switcher padding scales with density too — set
    // in compoundVariants below.)
    variant: {
      default: {
        switcher: "gap-3 hover:bg-accent",
      },
      minimal: {
        switcher: "gap-2 hover:bg-accent",
        switcherCaret: "size-3.5 opacity-70",
      },
    },
  },
  compoundVariants: [
    // Switcher padding = variant × density. `minimal` sits one step tighter than `default`
    // at each density, so it always reads as the smaller trigger.
    { variant: "default", density: "comfortable", class: { switcher: "p-2" } },
    { variant: "default", density: "compact", class: { switcher: "p-1.5" } },
    { variant: "minimal", density: "comfortable", class: { switcher: "p-1.5" } },
    { variant: "minimal", density: "compact", class: { switcher: "p-1" } },
  ],
  defaultVariants: {
    density: "compact",
    variant: "default",
  },
})

type SidebarSlots = ReturnType<typeof sidebarVariants>
// The resolved density rides along in context so a `SidebarSwitcher` can recompute its own
// slots for a per-instance `variant` (the top and bottom switchers can differ).
const [SidebarProvider, useSidebarContext] = createContext<{
  slots: SidebarSlots
  density: Density
}>("Sidebar")

export interface SidebarProps
  extends React.ComponentProps<"aside">,
    // `variant` is a per-switcher axis, not a root one — omit it here.
    Omit<VariantProps<typeof sidebarVariants>, "variant"> {}

/**
 * Parts are exported individually (not as `Sidebar.Header` dot-notation) because namespaced
 * statics don't survive the RSC server→client boundary — only named exports do. Renders an
 * `<aside>` complementary landmark; pass `aria-label` to name it.
 */
export function Sidebar({ className, density, ...props }: SidebarProps) {
  const resolved = useDensity(density)
  const slots = sidebarVariants({ density: resolved })
  return (
    <SidebarProvider slots={slots} density={resolved}>
      <aside data-slot="sidebar" className={slots.root({ className })} {...props} />
    </SidebarProvider>
  )
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useSidebarContext("SidebarHeader")
  return <div data-slot="sidebar-header" className={slots.header({ className })} {...props} />
}

export function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useSidebarContext("SidebarContent")
  return <div data-slot="sidebar-content" className={slots.content({ className })} {...props} />
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useSidebarContext("SidebarFooter")
  return <div data-slot="sidebar-footer" className={slots.footer({ className })} {...props} />
}

/** A clear section. Wraps a `<nav>` so each group is a discrete navigation landmark; name
 * it with `aria-label` (or let `SidebarGroupLabel` describe it). */
export function SidebarGroup({ className, ...props }: React.ComponentProps<"nav">) {
  const { slots } = useSidebarContext("SidebarGroup")
  return <nav data-slot="sidebar-group" className={slots.group({ className })} {...props} />
}

export function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useSidebarContext("SidebarGroupLabel")
  return (
    <div data-slot="sidebar-group-label" className={slots.groupLabel({ className })} {...props} />
  )
}

export interface SidebarItemProps extends React.ComponentProps<"button"> {
  /** Render the child element as the row (Radix Slot) — e.g. an `<a>` or Next `<Link>`. */
  asChild?: boolean
  /** Mark this as the current page: fills the row and sets `aria-current="page"`. */
  active?: boolean
}

/**
 * A nav row. Default `<button>`; pass `asChild` to wrap a link. Lay the children out as
 * `<Icon /> Label`, with an optional trailing element (a `<Badge>` or count) pushed right
 * with `ml-auto`.
 */
export function SidebarItem({
  className,
  asChild = false,
  active = false,
  ...props
}: SidebarItemProps) {
  const { slots } = useSidebarContext("SidebarItem")
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="sidebar-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      // type only applies to the native button; Slot forwards nothing it doesn't own.
      type={asChild ? undefined : "button"}
      className={slots.item({ className })}
      {...props}
    />
  )
}

export interface SidebarSwitcherProps
  // `title` is overridden below to take rich content, not the native string tooltip attr.
  extends Omit<React.ComponentProps<"button">, "title"> {
  /** Leading visual — an `Avatar`, a logo tile, or an icon. */
  leading?: React.ReactNode
  /** Primary line: the workspace or profile name. */
  title: React.ReactNode
  /** Secondary line: plan, email, or role. */
  subtitle?: React.ReactNode
  /** Show the trailing up/down caret affordance. @default true */
  caret?: boolean
  /**
   * Chrome treatment. `default` is the full identity row; `minimal` is smaller and lighter
   * (tighter gap, small muted caret, reduced padding) for a secondary or inline switcher.
   * @default "default"
   */
  variant?: VariantProps<typeof sidebarVariants>["variant"]
}

/**
 * The switcher trigger — an identity row used for both the workspace switcher (top) and the
 * profile switcher (bottom). Renders a real `<button>`, so it drops straight into a
 * `DropdownMenuTrigger asChild`; the menu's `data-state` keeps it lit while open.
 *
 * Slots are recomputed here (not read from the shared context) so each switcher can carry
 * its own `variant`; density still flows from the root through context.
 */
export function SidebarSwitcher({
  className,
  leading,
  title,
  subtitle,
  caret = true,
  variant,
  ...props
}: SidebarSwitcherProps) {
  const { density } = useSidebarContext("SidebarSwitcher")
  const slots = sidebarVariants({ density, variant })
  return (
    <button
      data-slot="sidebar-switcher"
      type="button"
      className={slots.switcher({ className })}
      {...props}
    >
      {leading}
      <span className={slots.switcherText()}>
        <span className={slots.switcherTitle()}>{title}</span>
        {subtitle ? <span className={slots.switcherSubtitle()}>{subtitle}</span> : null}
      </span>
      {caret ? <CaretUpDown data-slot="sidebar-switcher-caret" className={slots.switcherCaret()} /> : null}
    </button>
  )
}

export function SidebarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  const { slots } = useSidebarContext("SidebarSeparator")
  return (
    <div
      data-slot="sidebar-separator"
      role="separator"
      className={slots.separator({ className })}
      {...props}
    />
  )
}
