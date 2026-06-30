import { DocsShell } from "@/components/docs/docs-shell"

/**
 * The `/marketing` tree (sections + pages) shares the exact docs chrome, so the global sidebar,
 * search, and theme/accent switchers are identical to `/docs`. Greenfield alongside `/docs` for
 * now; the top-level migration that drops `/docs` is a later phase (see memory `site-ia-tiers`).
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsShell>{children}</DocsShell>
}
