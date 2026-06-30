import Link from "next/link"
import Image from "next/image"

import {
  Layout,
  LayoutSidebar,
  LayoutContent,
  LayoutContainer,
  LayoutHeader,
} from "@/components/ui/layout"
import { SidebarNav } from "@/components/docs/sidebar-nav"
import { TableOfContents } from "@/components/docs/toc"
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb"
import { ThemeSwitcher } from "@/components/docs/theme-switcher"
import { AccentSwitcher } from "@/components/docs/accent-switcher"
import { DocsCommandMenu } from "@/components/docs/command-menu"

/**
 * The documentation chrome: sticky header (logo + search + theme/accent switchers) over the
 * three-column body (nav sidebar / content / on-this-page TOC). Extracted from the docs layout
 * so every top-level docs tree shares one shell: `/docs/*`, `/marketing/*`, and (later)
 * `/application/*` all render through this, and `SidebarNav` reads the single `docsNav` tree, so
 * the same global navigation appears under any route. See memory `site-ia-tiers`.
 */
export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/koala-logo.webp"
              alt=""
              aria-hidden
              width={28}
              height={28}
              className="size-7 rounded-lg shadow-xs"
            />
            Koala UI
          </Link>
          <div className="flex items-center gap-2">
            <DocsCommandMenu />
            <AccentSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Body: the docs site dogfoods the DS Layout in its flat variant. The shell is a clean
          two-column reader: the nav rail on the left, the breadcrumb header + page content on
          the right. An optional third rail (the on-this-page TOC) only paints at `xl` on pages
          that have sections; `TableOfContents` owns that column and returns null otherwise, so
          pages without headings (e.g. the introduction) collapse to two columns with no empty
          gutter. Columns are pinned below the h-14 header. LayoutSidebar is a plain <div> (its
          content, the DS Sidebar, is the nav landmark). */}
      <Layout variant="flat" className="min-h-[calc(100svh-3.5rem)] gap-10">
        <LayoutSidebar className="top-14 hidden h-[calc(100vh-3.5rem)] w-56 overflow-y-auto p-0 py-8 md:flex">
          <SidebarNav />
        </LayoutSidebar>

        <LayoutContent>
          {/* mx-auto centers the column within the content region (between the nav rail and the
              TOC rail), so the reading measure floats in the middle of the available space rather
              than hugging the sidebar. The part default is already mx-auto; we keep it explicit
              alongside the max-w + py overrides. */}
          <LayoutContainer width="full" className="mx-auto max-w-[72rem] py-10">
            <LayoutHeader>
              <DocsBreadcrumb />
            </LayoutHeader>
            {children}
          </LayoutContainer>
        </LayoutContent>

        <TableOfContents />
      </Layout>
    </div>
  )
}
