"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
}

/**
 * On-this-page navigation for docs. Scans the rendered `<h2 id>` headings (emitted by
 * DocSection), then scroll-spies them with an IntersectionObserver to highlight the
 * active section. Re-scans on route change since the docs layout persists.
 *
 * It owns its own sticky right rail (the column + width). When the page has no sections it
 * still reserves that column (an empty spacer) instead of vanishing, so the content column
 * keeps the exact same measure and position on every page: without it, heading-less pages
 * (introduction, catalog) would widen and recenter, making the content "jump" on navigation.
 * The rail only paints at `xl` and up.
 */
export function TableOfContents({ className }: { className?: string }) {
  const pathname = usePathname()
  const [items, setItems] = React.useState<TocItem[]>([])
  const [activeId, setActiveId] = React.useState<string>("")
  const listRef = React.useRef<HTMLUListElement>(null)
  const itemRefs = React.useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [indicator, setIndicator] = React.useState<{
    top: number
    height: number
  } | null>(null)

  React.useEffect(() => {
    let observer: IntersectionObserver | undefined
    let onScroll: (() => void) | undefined

    // Defer to a frame so the new route's headings are painted, and so we don't call
    // setState synchronously inside the effect body.
    const raf = requestAnimationFrame(() => {
      const headings = Array.from(
        document.querySelectorAll<HTMLHeadingElement>("main h2[id]"),
      )
      setItems(headings.map((h) => {
        const clone = h.cloneNode(true) as HTMLHeadingElement
        clone.querySelectorAll("a").forEach((a) => a.remove())
        return { id: h.id, text: clone.textContent?.trim() ?? "" }
      }))
      setActiveId(headings[0]?.id ?? "")

      if (headings.length === 0) return

      const lastId = headings[headings.length - 1].id
      // The last sections can't reach the activation band before the page runs out of
      // scroll, so once we hit the bottom the final heading should win.
      const isAtBottom = () =>
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      observer = new IntersectionObserver(
        (entries) => {
          // At the bottom the scroll handler owns the active id; don't let a still-
          // intersecting earlier heading override it.
          if (isAtBottom()) {
            setActiveId(lastId)
            return
          }
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (visible[0]) setActiveId(visible[0].target.id)
        },
        // Activate a heading once it crosses into the top third of the viewport.
        { rootMargin: "-80px 0px -70% 0px" },
      )
      headings.forEach((h) => observer!.observe(h))

      // The observer goes quiet when no heading crosses the band (e.g. parked at the
      // very bottom), so a scroll listener pins the last heading there.
      onScroll = () => {
        if (isAtBottom()) setActiveId(lastId)
      }
      window.addEventListener("scroll", onScroll, { passive: true })
      onScroll()
    })

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
      if (onScroll) window.removeEventListener("scroll", onScroll)
    }
  }, [pathname])

  // Slide the accent line to the active item's position.
  React.useEffect(() => {
    if (!activeId) return
    const el = itemRefs.current.get(activeId)
    const list = listRef.current
    if (!el || !list) return
    const listRect = list.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    setIndicator({ top: elRect.top - listRect.top, height: elRect.height })
  }, [activeId, items])

  // No headings: keep the rail's footprint (width + gap) so the content column doesn't widen
  // or recenter on this page. Matches the TOC nav's `w-56`, xl-only, shrink-0 footprint.
  if (items.length === 0) {
    return <div aria-hidden className={cn("hidden w-56 shrink-0 xl:block", className)} />
  }

  return (
    <nav
      aria-label="On this page"
      className={cn(
        // The rail: a sticky column pinned below the h-14 header, shown only at `xl` and up
        // (below that it's display:none, so the shell reads as two columns). `shrink-0` holds
        // its width against the flex-1 content; when there are no headings the whole component
        // returns null above, so neither this column nor the layout gap is rendered at all.
        "sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 flex-col gap-3 overflow-y-auto py-10 text-sm xl:flex",
        className,
      )}
    >
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      <ul ref={listRef} className="relative flex flex-col gap-1 border-l border-border">
        {indicator && (
          <div
            aria-hidden
            className="pointer-events-none absolute -left-px w-px bg-foreground"
            style={{
              top: indicator.top,
              height: indicator.height,
              transition:
                "top 0.25s cubic-bezier(0.2, 0, 0, 1), height 0.25s cubic-bezier(0.2, 0, 0, 1)",
            }}
          />
        )}
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el)
                  else itemRefs.current.delete(item.id)
                }}
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block py-1 pl-4 transition-colors duration-fast ease-out",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
