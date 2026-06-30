"use client"

import { Image as ImageIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import {
  PLACEHOLDER_BRANDS_VARIED,
  PlaceholderLogo,
} from "@/components/docs/placeholder-logos"
import {
  Hero,
  HeroContent,
  HeroColumn,
  HeroTitle,
  HeroHighlight,
  HeroSubtitle,
  HeroActions,
  HeroFeatures,
  HeroFeature,
  HeroSocialProof,
  HeroRating,
  HeroMedia,
} from "@/components/ui/hero"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AvatarRoot, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Tooltip } from "@/components/ui/tooltip"

// Marketing-section heroes show real photos (pravatar, the repo's avatar-image pattern). The
// colored `color` + initials stay as the fallback so a failed image still lands on a colored
// chip, never gray, the same stride-mixed order as the landing hero's fallback stack.
const FACES = [
  { initials: "AR", name: "Ana Ruiz", color: "brand", img: 12 },
  { initials: "PN", name: "Pedro Núñez", color: "purple", img: 5 },
  { initials: "TB", name: "Tom Becker", color: "teal", img: 32 },
  { initials: "ML", name: "María López", color: "orange", img: 47 },
  { initials: "DO", name: "Diego Ortega", color: "pink", img: 8 },
  { initials: "JS", name: "Julia Santos", color: "brand", img: 11 },
] as const

export function HeroDemo() {
  return (
    <Hero className="rounded-lg">
      <HeroContent>
        <Badge variant="orange" dot pill>
          Koala UI v11 is here!
        </Badge>

        <HeroTitle>A Design System built for AI-Powered Products</HeroTitle>

        <HeroSubtitle>
          A Design System for builders of AI assistants, copilots and intelligent tools. Ship
          MVPs fast.
        </HeroSubtitle>

        <HeroActions>
          <Button size="lg">Buy now &amp; use forever</Button>
          <Button size="lg" variant="outline">Preview Desktop</Button>
          <Button size="lg" variant="outline">Preview Mobile</Button>
        </HeroActions>

        <HeroFeatures>
          <HeroFeature>Build &amp; ideate fast</HeroFeature>
          <HeroFeature>Light, Dark &amp; Moonlight themes at 1 click</HeroFeature>
          <HeroFeature>+3,200 Components</HeroFeature>
          <HeroFeature>New updates every month</HeroFeature>
          <HeroFeature>Consistent responsive</HeroFeature>
          <HeroFeature>Never start from 0 again</HeroFeature>
        </HeroFeatures>

        <HeroSocialProof>
          <AvatarGroup size="sm">
            {FACES.map(({ initials, name, color, img }) => (
              <Tooltip key={initials} content={name}>
                <AvatarRoot size="sm" color={color}>
                  <AvatarImage src={`https://i.pravatar.cc/160?img=${img}`} alt={name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </AvatarRoot>
              </Tooltip>
            ))}
          </AvatarGroup>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-balance text-sm font-medium text-foreground">
              +620 Designers have joined already
            </span>
            <HeroRating>
              <span className="font-medium text-foreground">5.0 Ratings</span>
            </HeroRating>
          </div>
        </HeroSocialProof>
      </HeroContent>
    </Hero>
  )
}

export function HeroMinimalDemo() {
  return (
    <Hero className="rounded-lg">
      <HeroContent className="py-16 sm:py-20">
        <Badge variant="info" dot pill>
          New: Koala UI for React
        </Badge>
        <HeroTitle>Build polished products, faster</HeroTitle>
        <HeroSubtitle>
          A production-ready component library you can install with one command and own
          forever.
        </HeroSubtitle>
        <HeroActions>
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            Browse components
          </Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  )
}

// A lean hero that shows the rotating highlight on its own (no media/social proof), so the docs page
// can isolate the behavior. The keyword wash hugs each phrase, tweening its width as the word
// swaps; `leading-[1.2]` keeps the wash off the line above it.
const ROTATING_PHRASES = ["every decision", "every workflow", "every release", "every roadmap"]

export function HeroRotatingDemo() {
  return (
    <Hero className="rounded-lg">
      <HeroContent className="py-16 sm:py-20">
        <Badge variant="orange" dot pill>
          Koala UI 2.0 is live
        </Badge>
        <HeroTitle className="max-w-3xl leading-[1.2]">
          Bring your product into <HeroHighlight rotate={ROTATING_PHRASES}>every decision</HeroHighlight>
        </HeroTitle>
        <HeroSubtitle>
          The highlight wash hugs each word, resizing as it rotates, paints each phrase in its own
          color, and the letters arrive with a per-character stagger, so the headline stays alive on
          its own.
        </HeroSubtitle>
        <HeroActions>
          <Button size="lg">Start for free</Button>
          <Button size="lg" variant="outline">
            Book a demo
          </Button>
        </HeroActions>
      </HeroContent>
    </Hero>
  )
}

/* ───────────────────────────────── shared media ─────────────────────────────────────────────── */

/**
 * A neutral media placeholder that holds the space where a product image goes, so the hero reads
 * finished without shipping a fake product mock. Drop a real `<img>` / next `<Image>` into
 * `HeroMedia` to replace it. The dashed hairline and muted wash signal an intentional empty slot;
 * the centered icon chip is a concentric card (rounded-xl inside the rounded-2xl frame). The aspect
 * ratio reserves the layout footprint, so the column never collapses while the image is missing.
 */
function HeroMediaPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/40",
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-xl border border-border bg-card text-muted-foreground shadow-xs">
        <ImageIcon aria-hidden className="size-7" />
      </span>
      <span className="text-sm font-medium text-muted-foreground">Your image here</span>
    </div>
  )
}

// The trusted-by strip in the spotlight hero renders the placeholder logo set in full color, in
// hue-interleaved order so the row varies (not a run of reds then oranges).
const ROW_BRANDS = PLACEHOLDER_BRANDS_VARIED.slice(0, 6)

/** A horizontal trusted-by strip of colored logo lockups for the spotlight hero. */
function HeroLogoRow({ label }: { label?: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {ROW_BRANDS.map((brand) => (
          <PlaceholderLogo key={brand.name} brand={brand} variant="lockup" />
        ))}
      </div>
    </div>
  )
}

/**
 * Customer logos for the editorial logo-wall hero, drawn from the shared placeholder set
 * (`PLACEHOLDER_BRANDS`, documented at /docs/logos): a colored symbol beside an invented wordmark,
 * the same lockup as the social-proof sections. No container and no card, each logo sits directly on
 * the section, in full brand color. Invented brands keep the public repo free of real marks.
 * Hue-interleaved order so the wall varies (not all warm or all cool).
 */
const WALL_BRANDS = PLACEHOLDER_BRANDS_VARIED.slice(0, 8)

/** A borderless two-up grid of colored logo lockups: the "logos as media" half of the split hero. */
function HeroLogoWall() {
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-8">
      {WALL_BRANDS.map((brand) => (
        <li key={brand.name}>
          <PlaceholderLogo brand={brand} variant="lockup" />
        </li>
      ))}
    </ul>
  )
}

/* ─────────────────────────────── hero-section-3 (Spotlight) ──────────────────────────────────── */

// The rotating keyword cycles the spotlight headline through a wash that hugs each phrase. All
// phrases lead with "every " so the left edge stays put behind "into"; the right edge resizes.
const SPOTLIGHT_PHRASES = ["every decision", "every workflow", "every release", "every roadmap"]

/**
 * Centered, product-led hero (Dovetail / Craft pattern): an announcement eyebrow, a headline with a
 * highlighted keyword, a CTA pair, a trusted-by logo strip, and an image placeholder anchored below.
 * The keyword is a rotating zone: `leading-[1.2]` opens the line so the wash clears the line above.
 */
export function HeroSpotlightDemo() {
  return (
    <Hero className="rounded-lg">
      <HeroContent className="max-w-5xl gap-8">
        <Badge variant="orange" dot pill>
          Koala UI 2.0 is live
        </Badge>

        <HeroTitle className="max-w-3xl leading-[1.2]">
          Bring your product into <HeroHighlight rotate={SPOTLIGHT_PHRASES}>every decision</HeroHighlight>
        </HeroTitle>

        <HeroSubtitle>
          The component library and design tokens behind fast-moving product teams. Ship polished,
          accessible interfaces from the very first commit.
        </HeroSubtitle>

        <HeroActions>
          <Button size="lg">Start for free</Button>
          <Button size="lg" variant="outline">
            Book a demo
          </Button>
        </HeroActions>

        <HeroLogoRow label="Trusted by teams at" />

        <HeroMedia className="mx-auto mt-6 max-w-5xl">
          <HeroMediaPlaceholder className="aspect-video" />
        </HeroMedia>
      </HeroContent>
    </Hero>
  )
}

/* ──────────────────────────────── hero-section-4 (Split) ─────────────────────────────────────── */

/**
 * Two-column hero (Clay / ClickUp / Lyssna pattern): a left-aligned copy column (eyebrow, headline,
 * subtitle, CTA pair, social proof) beside an image placeholder. Folds to a single stacked column
 * below the lg breakpoint.
 */
export function HeroSplitDemo() {
  return (
    <Hero layout="split" className="rounded-lg">
      <HeroContent>
        <HeroColumn>
          <Badge variant="info" dot pill>
            Now in public beta
          </Badge>

          <HeroTitle>Analytics your whole team actually uses</HeroTitle>

          <HeroSubtitle className="max-w-xl">
            Real-time dashboards with no setup. Connect a source and watch the numbers land in
            seconds, on every device.
          </HeroSubtitle>

          <HeroActions>
            <Button size="lg">Get started</Button>
            <Button size="lg" variant="outline">
              Live demo
            </Button>
          </HeroActions>

          <HeroSocialProof className="pt-2">
            <AvatarGroup size="sm">
              {FACES.slice(0, 4).map(({ initials, name, color, img }) => (
                <Tooltip key={initials} content={name}>
                  <AvatarRoot size="sm" color={color}>
                    <AvatarImage src={`https://i.pravatar.cc/160?img=${img}`} alt={name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </AvatarRoot>
                </Tooltip>
              ))}
            </AvatarGroup>
            <HeroRating>
              <span className="font-medium text-foreground">Loved by 2,000+ teams</span>
            </HeroRating>
          </HeroSocialProof>
        </HeroColumn>

        <HeroMedia>
          <HeroMediaPlaceholder />
        </HeroMedia>
      </HeroContent>
    </Hero>
  )
}

/* ─────────────────────────────── hero-section-5 (Logo wall) ──────────────────────────────────── */

/**
 * Editorial split hero (Frontify / Vercel / Mural pattern): a compact copy column beside a wall of
 * customer logos, so the social proof *is* the visual. Folds to a single stacked column on mobile.
 */
export function HeroLogoWallDemo() {
  return (
    <Hero layout="split" className="rounded-lg">
      <HeroContent>
        <HeroColumn>
          <Badge variant="info" dot pill>
            10,000+ teams and counting
          </Badge>

          <HeroTitle>
            The platform powering the world&apos;s <HeroHighlight>best teams</HeroHighlight>
          </HeroTitle>

          <HeroSubtitle className="max-w-xl">
            From seed-stage startups to the Fortune 500, product teams ship on Koala UI. Join them and
            build faster on a system that scales with you.
          </HeroSubtitle>

          <HeroActions>
            <Button size="lg">Start building</Button>
            <Button size="lg" variant="outline">
              Contact sales
            </Button>
          </HeroActions>
        </HeroColumn>

        <HeroMedia>
          <HeroLogoWall />
        </HeroMedia>
      </HeroContent>
    </Hero>
  )
}
