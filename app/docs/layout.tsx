import Link from "next/link"

import { SidebarNav } from "@/components/docs/sidebar-nav"
import { TableOfContents } from "@/components/docs/toc"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { AccentSwitcher } from "@/components/docs/accent-switcher"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span
              aria-hidden
              className="inline-flex size-7 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-xs"
            >
              K
            </span>
            Koala UI
          </Link>
          <div className="flex items-center gap-2">
            <AccentSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex gap-10 px-6">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-border py-8 md:block">
          <SidebarNav />
        </aside>
        <main className="min-w-0 flex-1 py-10">
          <div className="px-8">
            <div className="mx-auto max-w-[60rem]">{children}</div>
          </div>
        </main>
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 xl:block">
          <TableOfContents />
        </aside>
      </div>
    </div>
  )
}
