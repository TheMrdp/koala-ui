"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { docsNav } from "./nav"

export function SidebarNav() {
  const pathname = usePathname()
  const navRef = React.useRef<HTMLElement>(null)
  const [pill, setPill] = React.useState<{ top: number; height: number } | null>(null)
  const isFirstNavEffect = React.useRef(true)

  function measureActive() {
    const nav = navRef.current
    if (!nav) return null
    const activeEl = nav.querySelector<HTMLElement>('[aria-current="page"]')
    if (!activeEl) return null
    const navRect = nav.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()
    return { top: elRect.top - navRect.top, height: elRect.height }
  }

  // Synchronous initial position — fires before first paint so pill never slides in from 0
  React.useLayoutEffect(() => {
    const pos = measureActive()
    if (pos) setPill(pos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animate to new position on navigation, skip the initial mount run
  React.useEffect(() => {
    if (isFirstNavEffect.current) { isFirstNavEffect.current = false; return }
    const pos = measureActive()
    if (pos) setPill(pos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <nav ref={navRef} className="relative flex flex-col gap-6 text-sm">
      {pill && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 rounded-md bg-accent will-change-transform"
          style={{
            top: 0,
            height: pill.height,
            transform: `translateY(${pill.top}px)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0, 1)",
          }}
        />
      )}
      {docsNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-1">
          <p className="px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {section.title}
          </p>
          {section.items.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center justify-between rounded-md px-3 py-1.5 transition-colors duration-fast ease-out",
                  active
                    ? "font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <item.icon
                    aria-hidden
                    weight="regular"
                    className="size-4 shrink-0"
                  />
                  {item.title}
                </span>
                {item.soon && (
                  <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                    Soon
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
