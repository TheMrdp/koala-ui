import { notFound } from "next/navigation"

import { SECTIONS } from "@/components/docs/sections-registry"
import { SectionContainer } from "@/components/ui/section"

export const metadata = { title: "Section preview" }

// Allowlists inlined as plain literals on purpose: this is a SERVER component, and the canonical
// THEMES/ACCENTS arrays live in "use client" modules (theme-provider / accent-provider). Importing
// their runtime VALUES here yields a client-reference proxy (`THEMES.includes` is not a function),
// the same trap as a client-exported registry. Keep these in sync with those providers.
const THEME_NAMES = ["light", "dark", "moonlight"] as const
const ACCENT_NAMES = [
  "orange",
  "red",
  "amber",
  "green",
  "teal",
  "blue",
  "violet",
  "pink",
] as const
const DEFAULT_ACCENT: Accent = "orange"

type Theme = (typeof THEME_NAMES)[number]
type Accent = (typeof ACCENT_NAMES)[number]

function asTheme(value: string | undefined): Theme {
  return (THEME_NAMES as readonly string[]).includes(value ?? "") ? (value as Theme) : "light"
}

function asAccent(value: string | undefined): Accent {
  return (ACCENT_NAMES as readonly string[]).includes(value ?? "") ? (value as Accent) : DEFAULT_ACCENT
}

/**
 * Isolated render target for a single section/page, the body of the docs PreviewFrame's iframe.
 * It inherits only the root layout (no docs chrome), so the slab's own `sm:`/`md:`/`lg:`
 * utilities respond to the IFRAME width, not the browser viewport: the whole reason the preview
 * can show real responsive behavior. Theme/accent are forced from query params onto a wrapper
 * (theme = a class, accent = `data-accent`, both cascade-safe) so the preview re-themes without
 * any next-themes client state. The lookup runs server-side; see sections-registry.tsx.
 */
export default async function SectionPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ theme?: string; accent?: string }>
}) {
  const { slug } = await params
  const { theme: themeParam, accent: accentParam } = await searchParams

  const entry = SECTIONS[slug]
  if (!entry) notFound()

  const theme = asTheme(themeParam)
  const accent = asAccent(accentParam)
  const Demo = entry.component

  return (
    <div
      className={theme}
      data-accent={accent}
      style={{ colorScheme: theme === "light" ? "light" : "dark" }}
    >
      {/* No min-height from the document itself: it grows to the content so the PreviewFrame can
          size its iframe to the content's `scrollHeight` without a measurement feedback loop.
          `bleed` slabs (full-bleed bars like Banner) skip the gutter and the vertical padding and
          pin to the very top of a short page region, so the preview reads as "a banner sitting atop
          a page" rather than a centered card. Everything else sits in the canonical marketing
          gutter (SectionContainer: 1440px cap + 32px padding), matching a real page. */}
      {entry.bleed ? (
        <div data-preview-content className="min-h-[13rem] bg-background text-foreground">
          <Demo />
        </div>
      ) : (
        // A self-padded slab (a Hero) brings its own vertical rhythm, so drop the wrapper's `py-10`
        // (single owner; no double-padding). Everything else gets the band padding here.
        <div
          data-preview-content
          className={
            entry.ownsPadding
              ? "bg-background text-foreground"
              : "bg-background py-10 text-foreground"
          }
        >
          <SectionContainer>
            <Demo />
          </SectionContainer>
        </div>
      )}
    </div>
  )
}
