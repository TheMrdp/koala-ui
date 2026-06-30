"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { docsNav } from "./nav"

/**
 * The /docs navigation rail, now the DS `Sidebar` itself (dogfooding the library). The root
 * chrome (width, card fill, right border, full height) is neutralized so it sits transparently
 * inside the layout's sticky scroll column; `indicator` turns on the sliding brand pill that
 * glides to the active row on navigation. Active state is derived from the route via
 * `usePathname`, and the pill follows it automatically (SidebarContent measures the
 * `[data-active]` row), so there's no bespoke measurement code here anymore.
 */
export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Sidebar
      aria-label="Documentation"
      indicator
      className="h-auto w-full shrink-0 overflow-visible border-r-0 bg-transparent"
    >
      <SidebarContent className="gap-6 overflow-visible px-2 py-0">
        {docsNav.map((section) => (
          <SidebarGroup key={section.title} aria-label={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            {section.items.map((item) => (
              <SidebarItem key={item.href} asChild active={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon aria-hidden />
                  {item.title}
                  {item.soon && (
                    <Badge size="sm" className="ml-auto uppercase tracking-wide">
                      Soon
                    </Badge>
                  )}
                </Link>
              </SidebarItem>
            ))}
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
