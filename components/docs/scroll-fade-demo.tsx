"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/**
 * Live demos for the Scroll Fade foundation page. Each scroll container nests inside a
 * bordered, `overflow-hidden` frame: the frame owns the border + rounded corners (so the
 * stroke stays crisp), the inner element owns `overflow` + the `scroll-fade-*` mask (so only
 * the content fades into the edge). Scroll any of them - the edge nearest unseen content
 * fades; the edge you reach sharpens. Scrollbars are hidden site-wide, so the fade is the cue.
 */

const NOTIFICATIONS = [
  { title: "Mara deployed api-gateway to production", meta: "2 minutes ago" },
  { title: "Build #2847 passed on main", meta: "11 minutes ago" },
  { title: "Theo commented on “Density tokens”", meta: "26 minutes ago" },
  { title: "New sign-up: northwind.co", meta: "About an hour ago" },
  { title: "Weekly usage report is ready", meta: "3 hours ago" },
  { title: "Priya invited 4 teammates", meta: "Yesterday, 18:40" },
  { title: "Billing: invoice #0231 settled", meta: "Yesterday, 09:12" },
  { title: "Backup completed for eu-west-1", meta: "2 days ago" },
  { title: "Domain koalaui.com renewed", meta: "3 days ago" },
  { title: "Lin closed 6 issues in “Polish”", meta: "4 days ago" },
  { title: "API key rotated by automation", meta: "5 days ago" },
  { title: "Region us-east-2 came back online", meta: "Last week" },
]

const TAGS = [
  "Overview",
  "Activity",
  "Deployments",
  "Analytics",
  "Members",
  "Integrations",
  "Billing",
  "Security",
  "Webhooks",
  "Audit log",
  "Settings",
]

const LINES = [
  "Aurora",
  "Bennett",
  "Cassidy",
  "Delphine",
  "Emerson",
  "Florian",
  "Greer",
  "Halcyon",
  "Indra",
  "Jovan",
  "Kestrel",
  "Lowell",
]

/** The bordered frame every demo container sits in: crisp stroke, clipped corners. */
function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
      {children}
    </div>
  )
}

/** Interactive hero: a vertical list with a live `--scroll-fade-size` knob. */
const SIZES = [
  { label: "Subtle", value: "1.5rem" },
  { label: "Default", value: "2.5rem" },
  { label: "Deep", value: "4rem" },
]

export function ScrollFadeShowcase() {
  const [size, setSize] = React.useState("2.5rem")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Fade depth</span>
        <ToggleGroup
          type="single"
          size="sm"
          value={size}
          onValueChange={(v) => v && setSize(v)}
          aria-label="Fade depth"
        >
          {SIZES.map((s) => (
            <ToggleGroupItem key={s.value} value={s.value}>
              {s.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Frame>
        <ul
          className="scroll-fade h-72 overflow-y-auto p-2"
          style={{ "--scroll-fade-size": size } as React.CSSProperties}
        >
          {NOTIFICATIONS.map((n) => (
            <li
              key={n.title}
              className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-fast ease-out hover:bg-accent"
            >
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
              <span className="min-w-0">
                <span className="block truncate text-sm text-foreground">{n.title}</span>
                <span className="block text-xs text-muted-foreground tabular-nums">{n.meta}</span>
              </span>
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  )
}

/** Horizontal chip row faded at both ends. */
export function ScrollFadeHorizontal() {
  return (
    <Frame className="p-2">
      <div className="scroll-fade-x flex gap-2 overflow-x-auto px-2 py-1">
        {TAGS.map((t) => (
          <span
            key={t}
            className="shrink-0 rounded-full bg-muted px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </Frame>
  )
}

/** A minimal vertical list used to contrast single-edge utilities. */
function MiniList({ fade }: { fade: string }) {
  return (
    <Frame>
      <ul className={cn("h-56 overflow-y-auto p-2", fade)}>
        {LINES.map((l) => (
          <li key={l} className="rounded-md px-3 py-2 text-sm text-foreground">
            {l}
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/** Side-by-side `scroll-fade-t` (top only) vs `scroll-fade-b` (bottom only). */
export function ScrollFadeEdges() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <figure className="flex flex-col gap-2">
        <MiniList fade="scroll-fade-t" />
        <figcaption className="text-center font-mono text-xs text-muted-foreground">
          scroll-fade-t
        </figcaption>
      </figure>
      <figure className="flex flex-col gap-2">
        <MiniList fade="scroll-fade-b" />
        <figcaption className="text-center font-mono text-xs text-muted-foreground">
          scroll-fade-b
        </figcaption>
      </figure>
    </div>
  )
}
