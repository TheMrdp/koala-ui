"use client"

import * as React from "react"
import type { ComponentType } from "react"
import Link from "next/link"
import {
  Atom,
  PersonArmsSpread,
  Swatches,
  Rows,
  Code,
  FileTs,
  Check,
  ArrowRight,
  UsersThree,
  Cube,
  RocketLaunch,
  Timer,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import {
  PLACEHOLDER_BRANDS,
  PLACEHOLDER_BRANDS_VARIED,
  PlaceholderLogo,
  type PlaceholderBrand,
} from "@/components/docs/placeholder-logos"

import {
  VideoPlayer,
  Video,
  VideoControls,
  VideoBar,
  VideoPlayButton,
  VideoSeek,
  VideoTime,
  VideoVolume,
  VideoFullscreen,
  VideoSpinner,
} from "@/components/ui/video-player"
import {
  Testimonial,
  TestimonialQuote,
  TestimonialFooter,
  TestimonialAuthor,
  TestimonialName,
  TestimonialTitle,
  TestimonialLogo,
} from "@/components/ui/testimonials"
import { AvatarRoot, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Stat,
  StatLabel,
  StatValue,
  StatCaption,
  StatIcon,
  StatTrend,
} from "@/components/ui/stat"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderHeading,
  SectionHeaderDescription,
  SectionHeaderActions,
} from "@/components/ui/section-header"
import { CodeSnippet } from "@/components/docs/code-snippet"
import {
  FEATURES,
  type Feature,
  HERO_TESTIMONIALS,
  METRICS,
  FAQ,
  CHANGELOG,
} from "@/components/landing/data"

/**
 * Client demos for the marketing **section** slabs (the organism tier; see memory `site-ia-tiers`).
 * These are the isolated, copy-pasteable compositions the docs sections render: a clean demo per
 * section, NOT the landing component itself (which carries the full-bleed `Section` band + the
 * scroll-in `Reveal`). Where a section leads with a centered lede, the matching `SectionHeader` is
 * composed in `sections-registry.tsx` and each export here is the content that sits below it; the
 * two side-by-side sections (Install, CTA panel) embed their own lede. Content is shared with the
 * landing via `components/landing/data` (pure data, no JSX) so the catalog stays in lockstep with
 * the home page. Kept in one "use client" module so the server registry can compose the
 * interactive parts (Radix/stateful) without becoming a client module itself.
 */

// ── feature-section-2 ──────────────────────────────────────────────────────────────────────────
// Openly-hosted sample clip (W3C's canonical HTML5 media host, has audio so the volume control is
// meaningful) so the preview plays with no bundled project assets. The old Google
// `gtv-videos-bucket` sample now 403s.
const VIDEO_SRC = "https://media.w3.org/2010/05/sintel/trailer.mp4"
const VIDEO_POSTER = "https://media.w3.org/2010/05/sintel/poster.png"

/**
 * feature-section-2 — the framed product video below the "See it in motion" lede. A concentric
 * radius (rounded-2xl frame over the player's rounded-xl surface) lifts the player off the band;
 * controls stay hidden until hover (`revealOn="hover"`) for the cinematic feel. Autoplay is
 * browser-gated on muted playback, so it starts muted and loops.
 */
export function VideoShowcaseFrame() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-border bg-card p-2 shadow-xl">
        <VideoPlayer className="rounded-xl" revealOn="hover">
          <Video src={VIDEO_SRC} poster={VIDEO_POSTER} autoPlay loop muted preload="auto" />
          <VideoSpinner />
          <VideoControls>
            <VideoBar>
              <VideoPlayButton />
              <VideoSeek />
              <VideoTime />
              <VideoVolume />
              <VideoFullscreen />
            </VideoBar>
          </VideoControls>
        </VideoPlayer>
      </div>
    </div>
  )
}

// ── hero-section-2 ─────────────────────────────────────────────────────────────────────────────
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
}

/**
 * hero-section-2 — logo-led social proof that sits directly under a hero: three container-less
 * testimonials (`bare`), each with the colored company logo on top, a bold headline, supporting
 * body, and an author byline.
 */
export function HeroTestimonialsContent() {
  return (
    <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
      {HERO_TESTIMONIALS.map((t) => (
        <Testimonial key={t.name} variant="bare" className="gap-3">
          {/* Colored logo on top: reset the footer's trailing-edge defaults to lead the card. */}
          <TestimonialLogo className="ml-0">
            <PlaceholderLogo
              brand={PLACEHOLDER_BRANDS.find((b) => b.name === t.brand) ?? PLACEHOLDER_BRANDS[0]}
              variant="lockup"
            />
          </TestimonialLogo>
          <TestimonialQuote className="font-semibold text-foreground">{t.headline}</TestimonialQuote>
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{t.body}</p>
          <TestimonialFooter className="mt-4">
            <AvatarRoot size="md">
              <AvatarFallback>{initials(t.name)}</AvatarFallback>
            </AvatarRoot>
            <TestimonialAuthor>
              <TestimonialName>{t.name}</TestimonialName>
              <TestimonialTitle>{t.title}</TestimonialTitle>
            </TestimonialAuthor>
          </TestimonialFooter>
        </Testimonial>
      ))}
    </div>
  )
}

// ── feature-section-4 ──────────────────────────────────────────────────────────────────────────
const FEATURE_ICONS: Record<Feature["icon"], ComponentType<{ className?: string }>> = {
  react: Atom,
  accessibility: PersonArmsSpread,
  themes: Swatches,
  density: Rows,
  source: Code,
  typescript: FileTs,
}

/** feature-section-4 — one Card per real differentiator, a balanced three-up feature grid. */
export function FeatureGridContent() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => {
        const Icon = FEATURE_ICONS[feature.icon]
        return (
          <Card key={feature.title} density="comfortable" variant="default">
            <CardHeader>
              <span className="mb-2 grid size-11 place-items-center rounded-xl bg-brand/10 text-brand [&>svg]:size-6">
                <Icon />
              </span>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}

// ── stats-section-1 ────────────────────────────────────────────────────────────────────────────
/**
 * stats-section-1 — the library at a glance: minimal, no container. A ruled grid (the `bg-border`
 * parent showing through a `gap-px`) separates the figures with nothing but thin 1px rules, on both
 * axes and at any column count, so it reads as bare type on the page rather than a boxed band. The
 * Stats run flush (chrome stripped) and collapse from four columns to a two-up grid on mobile.
 */
export function StatsContent() {
  return (
    <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
      {METRICS.map((metric) => (
        <Stat
          key={metric.label}
          density="comfortable"
          className="items-center gap-1.5 rounded-none border-0 bg-background p-8 text-center shadow-none"
        >
          <StatValue className="text-3xl sm:text-4xl">{metric.value}</StatValue>
          <StatLabel>{metric.label}</StatLabel>
        </Stat>
      ))}
    </div>
  )
}

// ── stats-section-2 ────────────────────────────────────────────────────────────────────────────
const SPOTLIGHT_METRICS = [
  {
    eyebrow: "Ship speed",
    value: "3.4×",
    caption:
      "Teams ship new screens over three times faster once the system is in place, with no design debt left behind.",
  },
  {
    eyebrow: "Less boilerplate",
    value: "92%",
    caption:
      "Less hand-written UI code, since every component arrives styled, accessible, and ready to compose.",
  },
  {
    eyebrow: "Hours saved",
    value: "41,000",
    caption:
      "Engineering hours recaptured in the first year, no longer spent rebuilding the same primitives from scratch.",
  },
  {
    eyebrow: "Time to theme",
    value: "<1 day",
    caption: "To re-skin an entire product for a new brand, driven by a single layer of semantic tokens.",
  },
] as const

/**
 * stats-section-2 — the spotlight row: minimal, no card. A top hairline and thin vertical rules (lg
 * `divide-x`) are the only chrome; each metric carries an accent eyebrow, an oversized figure, and a
 * supporting line pinned to the bottom (`mt-auto`) so the captions align across columns. The Stats
 * run bare (chrome stripped) so the figures read as type on the page, not as a strip of tiles. A
 * footnote with a source link closes it.
 */
export function StatsSpotlightContent() {
  return (
    <div className="flex flex-col gap-8 border-t border-border pt-10">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border">
        {SPOTLIGHT_METRICS.map((metric) => (
          <Stat
            key={metric.eyebrow}
            density="comfortable"
            className="min-h-44 gap-3 border-0 bg-transparent p-0 shadow-none lg:px-8 lg:first:pl-0 lg:last:pr-0"
          >
            <StatLabel className="text-xs font-semibold uppercase tracking-wider text-brand">
              {metric.eyebrow}
            </StatLabel>
            <StatValue className="text-4xl sm:text-5xl">{metric.value}</StatValue>
            <StatCaption className="mt-auto pt-6">{metric.caption}</StatCaption>
          </Stat>
        ))}
      </div>
      <p className="text-sm text-pretty text-muted-foreground">
        *from the 2026 Koala UI design systems survey.{" "}
        <Link href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
          Read the report
        </Link>
      </p>
    </div>
  )
}

// ── stats-section-3 ────────────────────────────────────────────────────────────────────────────
const TREND_METRICS = [
  { label: "Active teams", value: "12,400", delta: "+24%", icon: UsersThree, direction: "up", inverted: false },
  { label: "Components installed", value: "1.8M", delta: "+38%", icon: Cube, direction: "up", inverted: false },
  { label: "Projects shipped", value: "47,200", delta: "+19%", icon: RocketLaunch, direction: "up", inverted: false },
  { label: "Avg. setup time", value: "6 min", delta: "-31%", icon: Timer, direction: "down", inverted: true },
] as const

/**
 * stats-section-3 — centered icon stats: minimal, no cards. Each metric stacks a soft circular icon,
 * a tabular figure, a label, and a directional trend chip, separated by whitespace alone. The
 * setup-time metric uses `inverted` so a falling number still reads as the good outcome (green),
 * while its arrow keeps pointing the honest way.
 */
export function StatsTrendsContent() {
  return (
    <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
      {TREND_METRICS.map((metric) => {
        const Icon = metric.icon
        return (
          <Stat
            key={metric.label}
            density="comfortable"
            className="items-center gap-3 border-0 bg-transparent p-0 shadow-none"
          >
            <StatIcon className="size-12 rounded-full bg-brand/10 text-brand">
              <Icon />
            </StatIcon>
            <StatValue className="text-4xl">{metric.value}</StatValue>
            <StatLabel>{metric.label}</StatLabel>
            <StatTrend direction={metric.direction} inverted={metric.inverted}>
              {metric.delta}
            </StatTrend>
          </Stat>
        )
      })}
    </div>
  )
}

// ── stats-section-4 ────────────────────────────────────────────────────────────────────────────
const SPLIT_METRICS = [
  { value: "240+", label: "Variants and recipes" },
  { value: "98", label: "Lighthouse accessibility" },
  { value: "0", label: "Uneditable dependencies" },
  { value: "12k+", label: "GitHub stars" },
] as const

/**
 * stats-section-4 — the split layout: minimal, no panel. A left-aligned lede sits beside a flat
 * two-up grid of oversized figures (it folds to one column on mobile). The numbers run as bare Stats
 * on the page background, so the section reads as type and whitespace rather than a boxed band. The
 * lede lives in the left column, so the registry renders this directly with no outer SectionHeader.
 */
export function StatsSplitContent() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <SectionHeader align="left">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            Coverage
          </Badge>
          <SectionHeaderHeading>Everything you need, counted</SectionHeaderHeading>
          <SectionHeaderDescription>
            One system, measured. Every number below is something you get the day you install.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <div className="grid grid-cols-2 gap-x-8 gap-y-10">
        {SPLIT_METRICS.map((metric) => (
          <Stat
            key={metric.label}
            density="comfortable"
            className="gap-1 border-0 bg-transparent p-0 shadow-none"
          >
            <StatValue className="text-4xl sm:text-5xl">{metric.value}</StatValue>
            <StatLabel>{metric.label}</StatLabel>
          </Stat>
        ))}
      </div>
    </div>
  )
}

// ── stats-section-5 ────────────────────────────────────────────────────────────────────────────
const MEASURE_METRICS = [
  { caption: "Production teams building with the library", value: "3,800+" },
  { caption: "Component installs from the registry each week", value: "21k" },
  { caption: "Theme and accent combinations out of the box", value: "24" },
  { caption: "From install to a themed, accessible screen", value: "1 day" },
] as const

/**
 * stats-section-5 — caption-led: minimal, no card. The inverse of the spotlight row, so the small
 * supporting line sits on top and the oversized figure is pinned to the bottom (`mt-auto`) and lands
 * on a shared baseline. Only a top hairline and thin vertical rules (lg `divide-x`) frame it.
 */
export function StatsCaptionTopContent() {
  return (
    <div className="grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border">
      {MEASURE_METRICS.map((metric) => (
        <Stat
          key={metric.caption}
          density="comfortable"
          className="min-h-44 gap-4 border-0 bg-transparent p-0 shadow-none lg:px-8 lg:first:pl-0 lg:last:pr-0"
        >
          <StatCaption>{metric.caption}</StatCaption>
          <StatValue className="mt-auto text-4xl sm:text-5xl">{metric.value}</StatValue>
        </Stat>
      ))}
    </div>
  )
}

// ── stats-section-6 ────────────────────────────────────────────────────────────────────────────
const SUPPORT_METRICS = [
  {
    value: "24/7",
    title: "Help when you need it",
    caption:
      "Docs, runnable examples, and a community that answers, so you are never stuck on an integration.",
  },
  {
    value: "100%",
    title: "Accessible by default",
    caption:
      "Every component ships with keyboard, focus, and screen-reader behavior handled by Radix primitives.",
  },
  {
    value: "1 click",
    title: "Re-theme everything",
    caption: "Swap the whole system to a new brand from a single layer of semantic tokens.",
  },
] as const

/**
 * stats-section-6 — centered, pure type: minimal, no cards or icons. Each metric stacks an oversized
 * figure, a bold title, and a supporting line, centered and separated by whitespace alone. The
 * StatLabel is restyled into the title so the typography still flows from the canonical component.
 */
export function StatsCenteredContent() {
  return (
    <div className="grid gap-12 text-center sm:grid-cols-3 sm:gap-10">
      {SUPPORT_METRICS.map((metric) => (
        <Stat
          key={metric.title}
          density="comfortable"
          className="items-center gap-2 border-0 bg-transparent p-0 shadow-none"
        >
          <StatValue className="text-4xl sm:text-5xl">{metric.value}</StatValue>
          <StatLabel className="text-base font-semibold text-foreground">{metric.title}</StatLabel>
          <StatCaption className="mt-1 max-w-xs">{metric.caption}</StatCaption>
        </Stat>
      ))}
    </div>
  )
}

// ── faq-section-1 ──────────────────────────────────────────────────────────────────────────────
/** faq-section-1 — a single-open separated accordion of the product's common questions. */
export function FaqContent() {
  return (
    <Accordion type="single" collapsible variant="separated" className="mx-auto max-w-3xl">
      {FAQ.map((item, i) => (
        <AccordionItem key={item.question} value={`item-${i}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

// ── changelog-section-1 ────────────────────────────────────────────────────────────────────────
/** changelog-section-1 — the recent release log as a simple timeline of version cards. */
export function ChangelogContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {CHANGELOG.map((entry) => (
          <article
            key={entry.version}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs sm:flex-row sm:items-start sm:gap-6"
          >
            <div className="flex shrink-0 items-center gap-2 sm:w-40 sm:flex-col sm:items-start">
              <Badge variant="info" dot pill>
                {entry.version}
              </Badge>
              <time className="text-sm text-muted-foreground tabular-nums">{entry.date}</time>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">{entry.title}</h3>
              <p className="text-sm text-pretty text-muted-foreground">{entry.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center">
        <Button asChild variant="ghost">
          <Link href="/docs">
            Read the docs
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  )
}

// ── cta-section-1 (Install) ────────────────────────────────────────────────────────────────────
const INSTALL = `# add components straight into your project
npx koalaui add button card dialog

# they land as editable source you own
components/ui/button/button.tsx`

const USAGE = `import { Button } from "@/components/ui/button"

export function Cta() {
  return <Button size="lg">Get started</Button>
}`

const POINTS = [
  "Source copied into your repo, not a black-box package",
  "No runtime dependency you cannot read or edit",
  "Built on Radix primitives and Tailwind v4 tokens",
  "Free tier needs no auth, PRO is token-gated",
]

/**
 * cta-section-1 — the CLI + source-ownership story. A two-column slab: a left-aligned lede and
 * benefit checklist beside two stacked code snippets. The lede is embedded here (not added in the
 * registry) because it sits inside the left column rather than centered on top.
 */
export function InstallCliContent() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <SectionHeader align="left">
          <SectionHeaderText>
            <Badge variant="info" dot pill>
              Install
            </Badge>
            <SectionHeaderHeading>One command. You own the code.</SectionHeaderHeading>
            <SectionHeaderDescription>
              The koalaui CLI copies real component source into your project. Tweak any recipe, and
              it still matches the rest of the system.
            </SectionHeaderDescription>
          </SectionHeaderText>
        </SectionHeader>
        <ul className="flex flex-col gap-3">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                <Check weight="bold" className="size-3" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <CodeSnippet code={INSTALL} lang="bash" filename="Terminal" dots />
        <CodeSnippet code={USAGE} lang="tsx" filename="cta.tsx" />
      </div>
    </div>
  )
}

// ── cta-section-2 (closing CTA panel) ──────────────────────────────────────────────────────────
/**
 * cta-section-2 — the closing CTA: a brand-lit panel that funnels to pricing and the docs. The
 * lede is embedded (centered inside the panel) and composes `SectionHeader` like every other band.
 */
export function CtaBandContent() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-lg sm:px-12 sm:py-20">
      <SectionHeader
        align="center"
        stagger
        staggerBlur
        staggerTrigger="inView"
        className="relative mx-auto max-w-2xl"
      >
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            Get started
          </Badge>
          <SectionHeaderHeading>Build polished products, starting today</SectionHeaderHeading>
          <SectionHeaderDescription>
            Install the free tier in minutes, or unlock the full Figma and React system. Pay once,
            and use it forever.
          </SectionHeaderDescription>
        </SectionHeaderText>
        <SectionHeaderActions>
          <Button asChild size="lg">
            <Link href="#">
              Get Koala UI
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#">Read the docs</Link>
          </Button>
        </SectionHeaderActions>
      </SectionHeader>
    </div>
  )
}

// ── social-proof sections ────────────────────────────────────────────────────────────────────────
/**
 * Company logos drawn from the shared placeholder set: a colored inline-SVG symbol beside an
 * invented wordmark, the canonical fake-customer logos documented at `/docs/logos`. They render in
 * full brand color, so the wall reads as a real, varied customer list rather than a desaturated
 * type-only strip. `PLACEHOLDER_BRANDS_VARIED` is the hue-interleaved order (the module owns the
 * permutation), so every row mixes warm and cool and a rotation swaps to a differently-hued logo.
 * One source of order for every variant below (cloud, grid, split, bento, marquee). See memory
 * `placeholder-logos-canonical`.
 */
const BRANDS = PLACEHOLDER_BRANDS_VARIED

// A rotating slot i cross-fades between BRANDS[i] and BRANDS[i + SLOT_COUNT]; the two halves are
// disjoint, so no two slots ever show the same brand at once. SLOT_COUNT keeps the grid layouts a
// clean 2x4; the marquee (below) drifts through the whole set.
const SLOT_COUNT = 8
// The whole wall swaps together every HOLD ms: one synchronized cross-fade, not per-slot flicker.
const ROTATE_HOLD = 5600

// The two layers stack in one grid cell, so the slot is sized to the wider wordmark and a swap never
// shifts layout. Motion is a directional vertical roll from the logo-roll keyframes (globals.css):
// `roll-out` lifts the outgoing logo up + blurs it away, `roll-in` rises the incoming one from below
// into focus, at the same time. Alternating the two each swap restarts the animation (the name
// changes), and `both` fill holds each end state between swaps; at rest (swap 0) the hidden layer is
// just faded out, so nothing animates on load.
const LOGO_LAYER = "col-start-1 row-start-1 motion-reduce:animate-none"

function swapLayer(swap: number, visible: boolean) {
  if (swap === 0) return visible ? "" : "pointer-events-none opacity-0"
  return visible ? "animate-logo-roll-in" : "pointer-events-none animate-logo-roll-out"
}

/**
 * Drives a logo wall on ONE shared counter so every slot rolls in the same frame: a synchronized
 * swap reads far calmer than per-slot flicker. Holds the at-rest set for the first HOLD ms (nothing
 * animates on load), then ticks every HOLD. Honors `prefers-reduced-motion` by never starting.
 */
function useLogoSwap() {
  const [swap, setSwap] = React.useState(0)
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setSwap((n) => n + 1), ROTATE_HOLD)
    return () => clearInterval(id)
  }, [])
  return swap
}

/**
 * One logo slot: rolls between its two brands as the shared `swap` counter ticks, the rotating
 * "trusted by" wall. Both layers stay mounted (no layout shift), the visible one rolls up from below
 * as the other rolls up and out, and the hidden brand is taken out of the a11y tree.
 */
function RotatingBrandLogo({
  index,
  swap,
  align = "center",
}: {
  index: number
  swap: number
  align?: "center" | "start"
}) {
  const first = BRANDS[index]
  const second = BRANDS[index + SLOT_COUNT]
  const firstVisible = swap % 2 === 0
  return (
    <span
      className={cn(
        "inline-grid",
        align === "start" ? "justify-items-start" : "justify-items-center",
      )}
    >
      <span aria-hidden={!firstVisible} className={cn(LOGO_LAYER, swapLayer(swap, firstVisible))}>
        <PlaceholderLogo brand={first} variant="lockup" />
      </span>
      <span aria-hidden={firstVisible} className={cn(LOGO_LAYER, swapLayer(swap, !firstVisible))}>
        <PlaceholderLogo brand={second} variant="lockup" />
      </span>
    </span>
  )
}

/**
 * social-proof-section-1 — the logo cloud: a centered, airy grid of logos below the lede, the strip
 * that usually sits right under a hero. A grid (not flex-wrap) with a column count that divides the
 * logo count keeps the rows always balanced (2-up on a phone, 4-up above), never a full row over a
 * lone orphan.
 */
export function LogoCloudContent() {
  const swap = useLogoSwap()
  return (
    <ul className="grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-8 sm:grid-cols-4 sm:gap-x-14">
      {Array.from({ length: SLOT_COUNT }, (_, i) => (
        <li key={i}>
          <RotatingBrandLogo index={i} swap={swap} />
        </li>
      ))}
    </ul>
  )
}

/**
 * social-proof-section-2 — the marquee: a minimal caption over an infinite, edge-masked logo strip
 * that drifts on the shared `--animate-marquee` token. The set is rendered twice so the loop returns
 * with no seam, it pauses on hover, and it stops entirely under `prefers-reduced-motion`.
 */
export function LogoMarqueeContent() {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        Trusted by more than 10,000 product teams worldwide
      </p>
      <div className="group/marquee relative w-full overflow-hidden fade-x [--fade-size:8%]">
        <ul className="flex w-max animate-marquee items-center gap-x-14 pr-14 [--marquee-duration:180s] group-hover/marquee:[animation-play-state:paused] motion-reduce:[animation:none]">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <li key={`${brand.name}-${i}`} className="shrink-0" aria-hidden={i >= BRANDS.length}>
              <PlaceholderLogo brand={brand} variant="lockup" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/**
 * social-proof-section-3 — the ruled grid: logos aligned in a grid with nothing but thin 1px rules
 * between them (the `bg-border` parent showing through a `gap-px`). No enclosing frame, rounding, or
 * cell fill, so it reads as a minimal lattice rather than a boxed container; the rules stay crisp at
 * any column count as the grid collapses from four columns to two.
 */
export function LogoBorderedGridContent() {
  const swap = useLogoSwap()
  return (
    <ul className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
      {Array.from({ length: SLOT_COUNT }, (_, i) => (
        <li key={i} className="flex min-h-28 items-center justify-center bg-background p-8">
          <RotatingBrandLogo index={i} swap={swap} />
        </li>
      ))}
    </ul>
  )
}

/**
 * social-proof-section-4 — the split: a left-aligned lede with the headline count carried in
 * tabular figures, beside a borderless two-up grid of logos as the visual. Folds to a single
 * stacked column below the lg breakpoint. The lede lives in the left column, so the registry renders
 * this directly with no outer SectionHeader.
 */
export function LogoSplitContent() {
  const swap = useLogoSwap()
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <SectionHeader align="left">
        <SectionHeaderText>
          <Badge variant="success" dot pill>
            Customers
          </Badge>
          <SectionHeaderHeading>
            Join <span className="tabular-nums">10,000+</span> teams building on Koala UI
          </SectionHeaderHeading>
          <SectionHeaderDescription>
            From seed-stage startups to the Fortune 500, product teams ship on one consistent system.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-8">
        {Array.from({ length: SLOT_COUNT }, (_, i) => (
          <li key={i}>
            <RotatingBrandLogo index={i} swap={swap} align="start" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * social-proof-section-5 — the bento: the lede, a rotating logo wall, and a featured customer card
 * with a headline stat, combined in one asymmetric grid (a text + logos + image mix). The lede and
 * the media card book-end the wall on lg; everything stacks on a phone. The media card is an image
 * PLACEHOLDER (a fixed dark surface with the stat overlaid, theme-independent so the white overlay
 * always reads) so the section stays dependency-free; drop an <img> behind the overlay for a real
 * case-study photo. The lede lives inside the grid, so the registry renders this with no outer header.
 */
export function LogoBentoContent() {
  const swap = useLogoSwap()
  // The featured customer: pulled from outside the 4 wall slots (which show brands 0-3 and 8-11), so
  // the same logo never appears twice in this section.
  const study: PlaceholderBrand = BRANDS[12]
  const StudyMark = study.Mark

  return (
    // Minimal: no nested fills to tell apart. One hairline frame, 1px gridlines (the frame's
    // bg-border showing through gap-px) carry the structure, and the lone dark media tile is the
    // section's only filled surface, so it reads as the deliberate focal point.
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-6 lg:grid-rows-2">
      {/* Lede: heading + report link, on the plain surface, set off only by the gridlines. */}
      <div className="col-span-2 flex flex-col justify-center bg-background p-6 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:p-8">
        <SectionHeader align="left" size="sm">
          <SectionHeaderText>
            <SectionHeaderHeading>
              Join <span className="tabular-nums">50,000</span> of the most ambitious product teams
            </SectionHeaderHeading>
            <SectionHeaderDescription>
              Teams ship{" "}
              <span className="font-medium text-foreground tabular-nums">3.2x</span> faster on one
              consistent system.
            </SectionHeaderDescription>
          </SectionHeaderText>
          <SectionHeaderActions>
            <Button variant="link" size="sm" className="px-0">
              Read the report <ArrowRight />
            </Button>
          </SectionHeaderActions>
        </SectionHeader>
      </div>

      {/* Rotating logo wall: flat cells on the page surface (fills the center on lg, a 2-up block
          on a phone); the gridlines do the separating, no card fill needed. */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex min-h-24 items-center justify-center bg-background">
          <RotatingBrandLogo index={i} swap={swap} />
        </div>
      ))}

      {/* Featured customer card: the one dark image placeholder, with the stat overlaid at the foot. */}
      <div className="relative col-span-2 min-h-56 overflow-hidden bg-black lg:col-span-2 lg:col-start-5 lg:row-span-2 lg:row-start-1">
        {/* A soft top highlight keeps the surface from reading flat; a faint oversized customer
            glyph stands in for photo texture. Both purely decorative. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
        <StudyMark
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-8 size-44 text-white/[0.06]"
        />
        <div className="relative flex h-full flex-col justify-end gap-1 p-5">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-white/90">
            <StudyMark className="size-4" aria-hidden /> {study.name}
          </span>
          <p className="text-4xl font-semibold tracking-tight text-white tabular-nums">
            128 <span className="text-2xl font-medium text-white/60">hrs</span>
          </p>
          <p className="text-sm text-white/70">Saved every release on UI QA</p>
        </div>
      </div>
    </div>
  )
}
