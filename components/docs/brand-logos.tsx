import * as React from "react"

import { cn } from "@/lib/utils"
import { GithubLogo, DiscordLogo } from "@/components/ui/auth-form/brand-logos"

/**
 * Real brand marks as inline SVG, for the "I need an actual customer's logo" case (e.g. dropping the
 * Spotify mark onto a "works with" wall). This is the deliberate counterpart to the fictional
 * {@link file://./placeholder-logos.tsx placeholder logos}: every mark here is a registered trademark
 * owned by its company. Koala UI ships the vector as a convenience only and claims no rights to it,
 * so each entry also carries a link to the brand and to that brand's OWN trademark / brand-asset
 * guidelines, which you must read and follow before using the logo. The legal notice and the links
 * are surfaced on `/docs/logos`.
 *
 * The marks are faithful single-path glyphs (from the brands' published assets) that paint with
 * `currentColor`, so they are NOT redrawn or optically rescaled the way the placeholders are: brand
 * guidelines forbid altering a logo's proportions. Color is the one knob:
 *   - `tone: "color"` paints the mark in the official brand color (applied at the call site).
 *   - `tone: "mono"` paints it in the theme foreground, so a near-black brand (GitHub, Vercel) stays
 *     visible on the dark and moonlight themes instead of vanishing.
 * Either way the Copy / Download export bakes the literal brand `color` in. Literal brand hex is the
 * same documented exception to the tokens-only rule as the OAuth marks in `auth-form/brand-logos.tsx`
 * (which is where the GitHub and Discord marks below are reused from).
 *
 * To add a brand: drop a `{ name, domain, color, tone?, href, guidelinesHref, Mark }` entry below.
 * Keep the mark a faithful single-path glyph and point `guidelinesHref` at the brand's official
 * usage page. Keep the count a multiple of the grid columns (4) so the gallery stays a full block.
 */

type MarkProps = React.SVGProps<SVGSVGElement>

/** Spotify mark: the three-arc "soundwave" glyph in its circle. Trademark of Spotify AB. */
function SpotifyMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

/** Stripe mark: the "S" monogram. Trademark of Stripe, Inc. */
function StripeMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
    </svg>
  )
}

/** Figma mark: the stacked rounded shapes. Trademark of Figma, Inc. */
function FigmaMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
    </svg>
  )
}

/** Dropbox mark: the open-box glyph. Trademark of Dropbox, Inc. */
function DropboxMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z" />
    </svg>
  )
}

/** Linear mark: the converging-lines glyph. Trademark of Linear Orbit, Inc. */
function LinearMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z" />
    </svg>
  )
}

/** Vercel mark: the triangle. Trademark of Vercel, Inc. */
function VercelMark(props: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="m12 1.608 12 20.784H0Z" />
    </svg>
  )
}

export interface BrandLogoEntry {
  /** Brand name, used as the card label and accessible name. */
  name: string
  /** The brand's domain, shown as the muted caption (like the placeholder gallery). */
  domain: string
  /** Official brand color (literal hex: the documented brand-mark exception to tokens-only). */
  color: string
  /**
   * `color` paints the live mark in the brand color; `mono` paints it in the theme foreground so a
   * near-black/white brand stays visible on every theme. The export always bakes the literal color.
   */
  tone?: "color" | "mono"
  /** The brand's home page. */
  href: string
  /** The brand's own trademark / brand-asset guidelines. Read this before using the mark. */
  guidelinesHref: string
  /** The trademark glyph as inline `<svg>`, painting with `currentColor`. */
  Mark: React.ComponentType<MarkProps>
}

/**
 * Real brand logos available to copy or download. Each is a trademark of its owner; the linked
 * guidelines are authoritative. Ordered for a varied wall and kept a multiple of the 4-column grid.
 */
export const BRAND_LOGOS: BrandLogoEntry[] = [
  {
    name: "Spotify",
    domain: "spotify.com",
    color: "#1ED760",
    href: "https://www.spotify.com",
    guidelinesHref: "https://developer.spotify.com/documentation/design",
    Mark: SpotifyMark,
  },
  {
    name: "Stripe",
    domain: "stripe.com",
    color: "#635BFF",
    href: "https://stripe.com",
    guidelinesHref: "https://stripe.com/legal/marks",
    Mark: StripeMark,
  },
  {
    name: "Figma",
    domain: "figma.com",
    color: "#F24E1E",
    href: "https://www.figma.com",
    guidelinesHref: "https://www.figma.com/using-the-figma-brand/",
    Mark: FigmaMark,
  },
  {
    name: "Dropbox",
    domain: "dropbox.com",
    color: "#0061FF",
    href: "https://www.dropbox.com",
    guidelinesHref: "https://brand.dropbox.com",
    Mark: DropboxMark,
  },
  {
    name: "Linear",
    domain: "linear.app",
    color: "#5E6AD2",
    href: "https://linear.app",
    guidelinesHref: "https://linear.app/brand",
    Mark: LinearMark,
  },
  {
    name: "Discord",
    domain: "discord.com",
    color: "#5865F2",
    href: "https://discord.com",
    guidelinesHref: "https://discord.com/branding",
    Mark: DiscordLogo,
  },
  {
    name: "GitHub",
    domain: "github.com",
    color: "#181717",
    tone: "mono",
    href: "https://github.com",
    guidelinesHref: "https://github.com/logos",
    Mark: GithubLogo,
  },
  {
    name: "Vercel",
    domain: "vercel.com",
    color: "#000000",
    tone: "mono",
    href: "https://vercel.com",
    guidelinesHref: "https://vercel.com/geist/brands",
    Mark: VercelMark,
  },
]

/**
 * Render a brand mark at a standard size. `color` brands paint in their official color; `mono` brands
 * paint in the theme foreground (so they survive dark themes). The symbol is decorative (`aria-hidden`
 * via the mark itself); pair it with the visible brand name for the accessible label.
 */
export function BrandLogo({
  brand,
  className,
}: {
  brand: BrandLogoEntry
  className?: string
}) {
  const { Mark, color, tone } = brand
  return (
    <Mark
      style={tone === "mono" ? undefined : { color }}
      className={cn("size-9", tone === "mono" && "text-foreground", className)}
    />
  )
}
