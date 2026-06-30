import type { ComponentType } from "react"
import Link from "next/link"

import { Megaphone, ArrowRight, Rocket, Lightning } from "@phosphor-icons/react/ssr"

import { Badge } from "@/components/ui/badge"
import { Banner, BannerIcon, BannerContent, BannerAction } from "@/components/ui/banner"
import { Button } from "@/components/ui/button"
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderHeading,
  SectionHeaderDescription,
  SectionHeaderActions,
} from "@/components/ui/section-header"
import { BannerCountdownSection } from "@/app/docs/components/banner/demos"
import { BentoDemo } from "@/app/docs/components/bento/demos"
import {
  FooterDemo,
  FooterOverlayDemo,
  FooterNewsletterStripDemo,
  FooterNewsletterCardDemo,
  FooterCenteredDemo,
} from "@/app/docs/components/footer/demos"
import {
  GalleryDemo,
  GalleryMarqueeDemo,
  GalleryTabbedDemo,
  GalleryRingDemo,
} from "@/app/docs/components/gallery/demos"
import {
  HeroDemo,
  HeroSpotlightDemo,
  HeroSplitDemo,
  HeroLogoWallDemo,
} from "@/app/docs/components/hero/demos"
import { NavbarDemo } from "@/app/docs/components/navbar/demos"
import { TestimonialsDemo } from "@/app/docs/components/testimonials/demos"
import { PricingDemo } from "@/app/docs/components/pricing/demos"
import { ShowcaseGallery } from "@/components/landing/showcase-gallery"
import {
  VideoShowcaseFrame,
  HeroTestimonialsContent,
  FeatureGridContent,
  StatsContent,
  StatsSpotlightContent,
  StatsTrendsContent,
  StatsSplitContent,
  StatsCaptionTopContent,
  StatsCenteredContent,
  FaqContent,
  ChangelogContent,
  InstallCliContent,
  CtaBandContent,
  LogoCloudContent,
  LogoMarqueeContent,
  LogoBorderedGridContent,
  LogoSplitContent,
  LogoBentoContent,
} from "@/components/docs/section-demos"

/**
 * Docs-facing registry of marketing/application **sections** and **pages** (the organism- and
 * page-level tiers of the atomic ladder; see memory `site-ia-tiers`). Distinct from the
 * CLI-facing `registry.json` (built by scripts/build-registry.mjs, metadata only): this maps a
 * slug to a LIVE React component + its source, the single source of truth read by BOTH the
 * iframe render-target (app/preview/sections/[slug]) and the docs page (app/marketing/...).
 *
 * It MUST stay a server module (no "use client"): a lookup table exported from a client module
 * arrives at the server route as a client-reference proxy and indexes to `undefined` (the same
 * trap documented in app/preview/auth-form/page.tsx). The referenced components may themselves
 * be client components, which the server route renders as children just fine. Each section reuses
 * the flagship demo from the matching component docs page, so the slab stays in lockstep with the
 * component (the engine) it is built from.
 */
export interface SectionEntry {
  /** Display name (sidebar + DocHeader). */
  title: string
  /** One-line lead shown under the title. */
  description: string
  /** Which catalog this belongs to. */
  domain: "marketing" | "application"
  /** Atomic tier: a composed slab (`section`) or a full stacked page (`page`). */
  level: "section" | "page"
  /** The live slab, rendered both in the iframe preview and (later) the docs hero. */
  component: ComponentType
  /** Source shown under the "Code" tab (or copied by the toolbar when `locked`). */
  code: string
  /** Gate the source behind the PRO "Get full code" lock while keeping the live preview. */
  locked?: boolean
  /**
   * Render full-bleed and pinned to the top of a short page region instead of inside the
   * centered marketing gutter. For thin site-wide bars (Banner) that span edge to edge and sit
   * atop a page rather than as a centered card. See the render target.
   */
  bleed?: boolean
  /**
   * The slab is already its own band: it brings its own vertical rhythm (its own `py`, e.g. Hero).
   * Composers (the home page, the preview render target) then skip the band's vertical padding so
   * the page rhythm keeps a SINGLE owner and the slab is never double-padded.
   */
  ownsPadding?: boolean
}

const BANNER_SOFT_CODE = `<Banner variant="purple" dismissible>
  <BannerIcon>
    <Megaphone />
  </BannerIcon>
  <BannerContent>Koala UI now available for Mobile Apps!</BannerContent>
  <BannerAction href="#">
    Check it out
    <ArrowRight />
  </BannerAction>
</Banner>`

const BANNER_BRAND_CODE = `<Banner appearance="solid" variant="brand" dismissible>
  <BannerIcon>
    <Rocket />
  </BannerIcon>
  <BannerContent>Koala UI v2.0 is here.</BannerContent>
  <BannerAction href="#">
    Read the release notes
    <ArrowRight />
  </BannerAction>
</Banner>`

const BANNER_DARK_CODE = `<Banner appearance="solid" variant="default" dismissible>
  <BannerIcon>
    <Megaphone />
  </BannerIcon>
  <BannerContent>GeneriCon 2026 · Join us in Denver from June 7 to 9.</BannerContent>
  <BannerAction href="#">
    Register now
    <ArrowRight />
  </BannerAction>
</Banner>`

const BANNER_CTA_CODE = `<Banner align="between" variant="info" dismissible>
  <BannerIcon>
    <Lightning />
  </BannerIcon>
  <BannerContent>You have 14 days left in your free trial.</BannerContent>
  <Button size="sm" asChild>
    <a href="#">Upgrade</a>
  </Button>
</Banner>`

const BANNER_COUNTDOWN_CODE = `"use client"

import * as React from "react"
import { Tag, ArrowRight } from "@phosphor-icons/react"

import { Banner, BannerIcon, BannerContent, BannerAction } from "@/components/ui/banner"

// 2 days, 14 hours, 53 minutes, 9 seconds. A constant initial value keeps the first server and
// client renders identical (no hydration mismatch); the effect re-anchors to a real deadline.
const SALE_DURATION_MS = ((2 * 24 + 14) * 60 + 53) * 60_000 + 9_000

function useCountdown(durationMs: number) {
  const [remaining, setRemaining] = React.useState(durationMs)

  React.useEffect(() => {
    const deadline = Date.now() + durationMs
    function tick() {
      setRemaining(Math.max(0, deadline - Date.now()))
    }
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [durationMs])

  const s = Math.floor(remaining / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

const pad = (n: number) => n.toString().padStart(2, "0")

function BannerCountdown() {
  const { days, hours, minutes, seconds } = useCountdown(SALE_DURATION_MS)
  const units: Array<[number, string]> = [
    [days, "d"],
    [hours, "h"],
    [minutes, "m"],
    [seconds, "s"],
  ]
  const label =
    days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds remaining"

  return (
    <span role="timer" aria-label={label} className="inline-flex items-center gap-1">
      {units.map(([value, unit]) => (
        <span
          key={unit}
          aria-hidden
          className="inline-flex items-baseline gap-0.5 rounded-md border border-foreground/10 bg-foreground/5 px-1.5 py-0.5 leading-none"
        >
          <span className="text-sm font-semibold tabular-nums">{pad(value)}</span>
          <span className="text-xs font-medium text-muted-foreground">{unit}</span>
        </span>
      ))}
    </span>
  )
}

export function SaleCountdownBanner() {
  return (
    <Banner variant="orange" dismissible dismissLabel="Dismiss announcement">
      <BannerIcon>
        <Tag />
      </BannerIcon>
      <BannerContent>Summer sale ends in</BannerContent>
      <BannerCountdown />
      <BannerAction href="#">
        Shop the sale
        <ArrowRight />
      </BannerAction>
    </Banner>
  )
}`

const BENTO_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="purple" dot pill>Features</Badge>
    <SectionHeaderHeading>Everything you need to ship</SectionHeaderHeading>
    <SectionHeaderDescription>
      A complete toolkit of polished components, theming, and assets.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<Bento>
  {/* Top row: two wide tiles. */}
  <BentoItem size="md" tone="brand">
    <BentoItemIcon><Storefront /></BentoItemIcon>
    <BentoItemTitle>Store templates</BentoItemTitle>
    <BentoItemDescription>
      Crafted layouts that highlight product benefits, build trust, and drive conversion.
    </BentoItemDescription>
    <BentoItemImage src="/bento/store.svg" alt="Storefront template preview" />
  </BentoItem>

  <BentoItem size="md" tone="teal">
    <BentoItemIcon><ChartLineUp /></BentoItemIcon>
    <BentoItemTitle>High-converting experience</BentoItemTitle>
    <BentoItemDescription>Structures built for maximum conversion.</BentoItemDescription>
    <BentoItemImage src="/bento/checkout.svg" alt="Checkout flow preview" />
  </BentoItem>

  {/* Bottom row: three tiles. */}
  <BentoItem size="sm" tone="purple">
    <BentoItemIcon><Palette /></BentoItemIcon>
    <BentoItemTitle>Maximum personalization</BentoItemTitle>
    <BentoItemDescription>Customize the components so each project is unique.</BentoItemDescription>
    <BentoItemImage src="/bento/personalize.svg" alt="Personalization preview" />
  </BentoItem>

  <BentoItem size="sm" tone="orange">
    <BentoItemIcon><BookOpen /></BentoItemIcon>
    <BentoItemTitle>Detailed documentation</BentoItemTitle>
    <BentoItemDescription>Maintain consistency with extensive documentation.</BentoItemDescription>
    <BentoItemImage src="/bento/docs.svg" alt="Documentation preview" />
  </BentoItem>

  <BentoItem size="sm" tone="pink">
    <BentoItemIcon><Stack /></BentoItemIcon>
    <BentoItemTitle>All assets in 1 place</BentoItemTitle>
    <BentoItemDescription>Avatars, flags, and every asset, centralized.</BentoItemDescription>
    <BentoItemImage src="/bento/assets.svg" alt="Asset library preview" />
  </BentoItem>
</Bento>`

const FEATURE_SECTION_2_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="info" dot pill>See it in motion</Badge>
    <SectionHeaderHeading>Never start from scratch ever again</SectionHeaderHeading>
    <SectionHeaderDescription>
      Quickly generate multiple concepts thanks to all the components and sections we have
      carefully designed for you.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

{/* Concentric radius: rounded-2xl frame over the player's rounded-xl surface. */}
<div className="mx-auto w-full max-w-4xl rounded-2xl border border-border bg-card p-2 shadow-xl">
  <VideoPlayer className="rounded-xl" revealOn="hover">
    <Video src={src} poster={poster} autoPlay loop muted preload="auto" />
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
</div>`

const HERO_SECTION_2_CODE = `<div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
  {testimonials.map((t) => (
    <Testimonial key={t.name} variant="bare" className="gap-3">
      <TestimonialLogo>{t.logo}</TestimonialLogo>
      <TestimonialQuote className="font-semibold text-foreground">{t.headline}</TestimonialQuote>
      <p className="text-sm text-pretty text-muted-foreground">{t.body}</p>
      <TestimonialFooter>
        <Avatar><AvatarFallback>{initials(t.name)}</AvatarFallback></Avatar>
        <TestimonialAuthor>
          <TestimonialName>{t.name}</TestimonialName>
          <TestimonialTitle>{t.title}</TestimonialTitle>
        </TestimonialAuthor>
      </TestimonialFooter>
    </Testimonial>
  ))}
</div>`

const FEATURE_SECTION_1_CODE = `<SectionHeader align="center" stagger staggerTrigger="inView">
  <SectionHeaderText>
    <Badge variant="purple" dot pill>Components</Badge>
    <SectionHeaderHeading>60+ components, ready to use</SectionHeaderHeading>
    <SectionHeaderDescription>
      These are live, not screenshots. Toggle, drag, and open them right here.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

{/* A CSS-multicolumn masonry of real components dropped straight in: no tile chrome,
    no caption, no docs link. Self-contained surfaces (Stat, LoginForm, Chart, Ranking,
    Pricing, Table) interleaved with bare interactive clusters (Slider, Switch, Accordion,
    ToggleGroup, OTPInput, ColorPicker). */}
<div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
  {items.map((item, i) => (
    <div key={i} className="mb-6 break-inside-avoid">{item}</div>
  ))}
</div>

<Button asChild variant="outline" size="lg">
  <a href="/docs">See all components <ArrowRight /></a>
</Button>`

const FEATURE_SECTION_4_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="orange" dot pill>Why Koala UI</Badge>
    <SectionHeaderHeading>Never start from scratch again</SectionHeaderHeading>
    <SectionHeaderDescription>
      A foundation that handles the hard parts, so your team spends its time on the product.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {features.map((feature) => (
    <Card key={feature.title} density="comfortable">
      <CardHeader>
        <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
          <feature.Icon />
        </span>
        <CardTitle>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
    </Card>
  ))}
</div>`

const STATS_SECTION_1_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="info" dot pill>By the numbers</Badge>
    <SectionHeaderHeading>The system at a glance</SectionHeaderHeading>
  </SectionHeaderText>
</SectionHeader>

{/* Minimal ruled grid: only the 1px rules between figures (the bg-border parent through a gap-px),
    no container, frame, or cell fill. The Stats run flush. */}
<div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
  {metrics.map((metric) => (
    <Stat
      key={metric.label}
      density="comfortable"
      className="items-center gap-1.5 rounded-none border-0 bg-background p-8 text-center shadow-none"
    >
      <StatValue className="text-3xl sm:text-4xl">{metric.value}</StatValue>
      <StatLabel>{metric.label}</StatLabel>
    </Stat>
  ))}
</div>`

const STATS_SECTION_2_CODE = `<SectionHeader align="left" orientation="split">
  <SectionHeaderText>
    <Badge variant="purple" dot pill>By the numbers</Badge>
    <SectionHeaderHeading>It's like onboarding a design team overnight</SectionHeaderHeading>
    <SectionHeaderDescription>
      Teams that adopt Koala UI ship polished, accessible interfaces in a fraction of the time,
      on one consistent system across every surface.
    </SectionHeaderDescription>
  </SectionHeaderText>
  <SectionHeaderActions>
    <Button size="lg">Get started<ArrowRight /></Button>
  </SectionHeaderActions>
</SectionHeader>

<div className="flex flex-col gap-8 border-t border-border pt-10">
  <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border">
    {metrics.map((metric) => (
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
  <p className="text-sm text-muted-foreground">
    *from the 2026 Koala UI design systems survey.{" "}
    <a className="font-medium text-foreground underline-offset-4 hover:underline">Read the report</a>
  </p>
</div>`

const STATS_SECTION_3_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="info" dot pill>Momentum</Badge>
    <SectionHeaderHeading>Trusted by teams shipping every day</SectionHeaderHeading>
    <SectionHeaderDescription>A look at how the library is growing, quarter over quarter.</SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
  {metrics.map((metric) => {
    const Icon = metric.icon
    return (
      <Stat
        key={metric.label}
        density="comfortable"
        className="items-center gap-3 border-0 bg-transparent p-0 shadow-none"
      >
        <StatIcon className="size-12 rounded-full bg-brand/10 text-brand"><Icon /></StatIcon>
        <StatValue className="text-4xl">{metric.value}</StatValue>
        <StatLabel>{metric.label}</StatLabel>
        <StatTrend direction={metric.direction} inverted={metric.inverted}>{metric.delta}</StatTrend>
      </Stat>
    )
  })}
</div>`

const STATS_SECTION_4_CODE = `<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
  <SectionHeader align="left">
    <SectionHeaderText>
      <Badge variant="info" dot pill>Coverage</Badge>
      <SectionHeaderHeading>Everything you need, counted</SectionHeaderHeading>
      <SectionHeaderDescription>
        One system, measured. Every number below is something you get the day you install.
      </SectionHeaderDescription>
    </SectionHeaderText>
  </SectionHeader>

  <div className="grid grid-cols-2 gap-x-8 gap-y-10">
    {metrics.map((metric) => (
      <Stat key={metric.label} density="comfortable" className="gap-1 border-0 bg-transparent p-0 shadow-none">
        <StatValue className="text-4xl sm:text-5xl">{metric.value}</StatValue>
        <StatLabel>{metric.label}</StatLabel>
      </Stat>
    ))}
  </div>
</div>`

const STATS_SECTION_5_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="info" dot pill>By the numbers</Badge>
    <SectionHeaderHeading>Quality you can measure</SectionHeaderHeading>
    <SectionHeaderDescription>Adoption, reach, and the time it takes to ship, counted across teams building on Koala UI.</SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<div className="grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border">
  {metrics.map((metric) => (
    <Stat
      key={metric.caption}
      density="comfortable"
      className="min-h-44 gap-4 border-0 bg-transparent p-0 shadow-none lg:px-8 lg:first:pl-0 lg:last:pr-0"
    >
      <StatCaption>{metric.caption}</StatCaption>
      <StatValue className="mt-auto text-4xl sm:text-5xl">{metric.value}</StatValue>
    </Stat>
  ))}
</div>`

const STATS_SECTION_6_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="info" dot pill>Why teams stay</Badge>
    <SectionHeaderHeading>Built to support real products</SectionHeaderHeading>
    <SectionHeaderDescription>The things that matter once a design system is in production, not just on launch day.</SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<div className="grid gap-12 text-center sm:grid-cols-3 sm:gap-10">
  {metrics.map((metric) => (
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
</div>`

const PRICING_SECTION_1_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="purple" dot pill>Pricing</Badge>
    <SectionHeaderHeading>Pay once, and use forever</SectionHeaderHeading>
    <SectionHeaderDescription>
      No subscriptions. Choose the design kit, the code library, or both, and own it for good.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<Pricing>
  {tiers.map((tier) => (
    <PricingTier key={tier.id} featured={tier.featured}>
      <PricingName>{tier.name}</PricingName>
      <PricingPrice>{tier.price}</PricingPrice>
      <PricingFeatures>{/* PricingFeature × N */}</PricingFeatures>
      <PricingAction>{tier.cta.label}</PricingAction>
    </PricingTier>
  ))}
</Pricing>`

const FAQ_SECTION_1_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="info" dot pill>FAQ</Badge>
    <SectionHeaderHeading>Have a question? We have answers</SectionHeaderHeading>
    <SectionHeaderDescription>Everything you might want to know before you install.</SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<Accordion type="single" collapsible variant="separated" className="mx-auto max-w-3xl">
  {faq.map((item, i) => (
    <AccordionItem key={item.question} value={\`item-\${i}\`}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`

const CHANGELOG_SECTION_1_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="success" dot pill>Changelog</Badge>
    <SectionHeaderHeading>New month, new updates</SectionHeaderHeading>
    <SectionHeaderDescription>The library ships improvements every month.</SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<div className="mx-auto flex max-w-3xl flex-col gap-4">
  {changelog.map((entry) => (
    <article key={entry.version} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6 sm:flex-row sm:gap-6">
      <div className="flex shrink-0 items-center gap-2 sm:w-40 sm:flex-col sm:items-start">
        <Badge variant="info" dot pill>{entry.version}</Badge>
        <time className="text-sm text-muted-foreground tabular-nums">{entry.date}</time>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{entry.title}</h3>
        <p className="text-sm text-pretty text-muted-foreground">{entry.description}</p>
      </div>
    </article>
  ))}
</div>`

const CTA_SECTION_1_CODE = `<div className="grid items-center gap-12 lg:grid-cols-2">
  <div className="flex flex-col gap-6">
    <SectionHeader align="left">
      <SectionHeaderText>
        <Badge variant="info" dot pill>Install</Badge>
        <SectionHeaderHeading>One command. You own the code.</SectionHeaderHeading>
        <SectionHeaderDescription>
          The koalaui CLI copies real component source into your project.
        </SectionHeaderDescription>
      </SectionHeaderText>
    </SectionHeader>
    <ul>{/* benefit checklist with Check icons */}</ul>
  </div>

  <div className="flex flex-col gap-4">
    <CodeSnippet code={install} lang="bash" filename="Terminal" dots />
    <CodeSnippet code={usage} lang="tsx" filename="cta.tsx" />
  </div>
</div>`

const CTA_SECTION_2_CODE = `<div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-lg sm:px-12 sm:py-20">
  {/* The closing panel reveals part by part, with a soft focus pull, as it scrolls into view. */}
  <SectionHeader
    align="center"
    stagger
    staggerBlur
    staggerTrigger="inView"
    className="relative mx-auto max-w-2xl"
  >
    <SectionHeaderText>
      <Badge variant="info" dot pill>Get started</Badge>
      <SectionHeaderHeading>Build polished products, starting today</SectionHeaderHeading>
      <SectionHeaderDescription>
        Install the free tier in minutes, or unlock the full Figma and React system.
      </SectionHeaderDescription>
    </SectionHeaderText>
    <SectionHeaderActions>
      <Button size="lg">Get Koala UI <ArrowRight /></Button>
      <Button size="lg" variant="outline">Read the docs</Button>
    </SectionHeaderActions>
  </SectionHeader>
</div>`

const SOCIAL_PROOF_SECTION_1_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="info" dot pill>Social proof</Badge>
    <SectionHeaderHeading>Trusted by the teams behind great products</SectionHeaderHeading>
    <SectionHeaderDescription>
      The companies building their interfaces on Koala UI, from fast-moving startups to the
      Fortune 500.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

{/* Logos are wordmarks: muted by default, lifting to the foreground on hover. */}
<ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
  {brands.map(({ name, Icon }) => (
    <li key={name}>
      <span className="flex items-center gap-2 text-muted-foreground transition-colors duration-base ease-out hover:text-foreground">
        <Icon className="size-6 shrink-0" aria-hidden />
        <span className="text-lg font-semibold tracking-tight">{name}</span>
      </span>
    </li>
  ))}
</ul>`

const SOCIAL_PROOF_SECTION_2_CODE = `<div className="flex flex-col items-center gap-8">
  <p className="text-sm font-medium text-muted-foreground">
    Trusted by more than 10,000 product teams worldwide
  </p>

  {/* The set is rendered twice so the -50% translate loops with no seam. Pauses on hover and
      stops under prefers-reduced-motion. */}
  <div className="group/marquee relative w-full overflow-hidden fade-x [--fade-size:8%]">
    <ul className="flex w-max animate-marquee items-center gap-x-14 pr-14 [--marquee-duration:180s] group-hover/marquee:[animation-play-state:paused] motion-reduce:[animation:none]">
      {[...brands, ...brands].map(({ name, Icon }, i) => (
        <li key={\`\${name}-\${i}\`} className="shrink-0" aria-hidden={i >= brands.length}>
          <span className="flex items-center gap-2 text-muted-foreground transition-colors duration-base ease-out hover:text-foreground">
            <Icon className="size-6 shrink-0" aria-hidden />
            <span className="text-lg font-semibold tracking-tight">{name}</span>
          </span>
        </li>
      ))}
    </ul>
  </div>
</div>`

const SOCIAL_PROOF_SECTION_3_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="purple" dot pill>Customers</Badge>
    <SectionHeaderHeading>Powering products at companies of every size</SectionHeaderHeading>
    <SectionHeaderDescription>
      A system trusted in production, from the first commit all the way to global scale.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

{/* Minimal ruled grid: only the 1px rules between cells (the bg-border parent through a gap-px),
    no enclosing frame, rounding, or cell fill. Crisp at any column count. */}
<ul className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
  {brands.map(({ name, Icon }) => (
    <li key={name} className="flex min-h-28 items-center justify-center bg-background p-8">
      <span className="flex items-center gap-2 text-muted-foreground transition-colors duration-base ease-out hover:text-foreground">
        <Icon className="size-6 shrink-0" aria-hidden />
        <span className="text-lg font-semibold tracking-tight">{name}</span>
      </span>
    </li>
  ))}
</ul>`

const SOCIAL_PROOF_SECTION_4_CODE = `<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
  <SectionHeader align="left">
    <SectionHeaderText>
      <Badge variant="success" dot pill>Customers</Badge>
      <SectionHeaderHeading>
        Join <span className="tabular-nums">10,000+</span> teams building on Koala UI
      </SectionHeaderHeading>
      <SectionHeaderDescription>
        From seed-stage startups to the Fortune 500, product teams ship on one consistent system.
      </SectionHeaderDescription>
    </SectionHeaderText>
  </SectionHeader>

  <ul className="grid grid-cols-2 gap-x-8 gap-y-8">
    {brands.map(({ name, Icon }) => (
      <li key={name}>
        <span className="flex items-center gap-2 text-muted-foreground transition-colors duration-base ease-out hover:text-foreground">
          <Icon className="size-6 shrink-0" aria-hidden />
          <span className="text-lg font-semibold tracking-tight">{name}</span>
        </span>
      </li>
    ))}
  </ul>
</div>`

const SOCIAL_PROOF_SECTION_5_CODE = `{/* A minimal bento: 1px gridlines (the frame's bg-border through gap-px) carry the structure,
    with the lone dark media tile as the only filled surface. No near-identical card fills. */}
<div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-6 lg:grid-rows-2">
  {/* Lede + report link, on the plain surface */}
  <div className="col-span-2 flex flex-col justify-center bg-background p-6 lg:col-span-2 lg:row-span-2 lg:p-8">
    <SectionHeader align="left" size="sm">
      <SectionHeaderText>
        <SectionHeaderHeading>Join 50,000 of the most ambitious product teams</SectionHeaderHeading>
        <SectionHeaderDescription>Teams ship 3.2x faster on one consistent system.</SectionHeaderDescription>
      </SectionHeaderText>
      <SectionHeaderActions>
        <Button variant="link" size="sm" className="px-0">Read the report <ArrowRight /></Button>
      </SectionHeaderActions>
    </SectionHeader>
  </div>

  {/* Logo wall: flat cells, separated by the gridlines */}
  {brands.slice(0, 4).map(({ name, Icon }) => (
    <div key={name} className="flex min-h-24 items-center justify-center bg-background">
      <span className="flex items-center gap-2 text-muted-foreground"><Icon className="size-6" /> {name}</span>
    </div>
  ))}

  {/* Featured customer card: the one dark image placeholder + stat overlay */}
  <div className="relative col-span-2 min-h-56 overflow-hidden bg-black p-5 text-white lg:col-span-2 lg:col-start-5 lg:row-span-2">
    <div className="flex h-full flex-col justify-end gap-1">
      <span className="text-sm font-semibold text-white/90">Quanta</span>
      <p className="text-4xl font-semibold tabular-nums">128 <span className="text-2xl text-white/60">hrs</span></p>
      <p className="text-sm text-white/70">Saved every release on UI QA</p>
    </div>
  </div>
</div>`

// Sketches for the PRO (locked) sections: the Code tab shows the PremiumCode lock, so these only
// back the toolbar's copy affordance. They show the composition shape, not the full source.
const FOOTER_CODE = `<Footer>
  <FooterTop>
    <FooterBrand>
      <BrandMark />
      <FooterTagline>The commercial React design system.</FooterTagline>
      <FooterSocial>{/* X · Instagram · LinkedIn · GitHub · YouTube */}</FooterSocial>
    </FooterBrand>
    <FooterColumns>
      <FooterColumn title="Product">{/* links */}</FooterColumn>
      <FooterColumn title="Company">{/* links */}</FooterColumn>
      <FooterColumn title="Resources">{/* links */}</FooterColumn>
    </FooterColumns>
  </FooterTop>
  <FooterBottom>
    <FooterCopyright>© 2026 Koala UI. All rights reserved.</FooterCopyright>
    <FooterLegal>{/* Privacy · Terms · Cookies */}</FooterLegal>
  </FooterBottom>
</Footer>`

const FOOTER_SECTION_2_CODE = `{/* A full-bleed image becomes the backdrop; the nav rides on top (Duna / Poly). Swap the
    <img> src for your own illustration / photo; the scrim keeps the white text legible. */}
<div className="relative isolate overflow-hidden border-t border-border">
  <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
    <img src="/footer-landscape.jpg" alt="" className="size-full object-cover" />
    {/* Scrim: darkens the top (columns) and bottom (legal bar) so the white text reads. */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/55" />
  </div>

  {/* Transparent root so the media reads; column titles ride white via the data-slot override. */}
  <Footer className="border-t-0 bg-transparent [&_[data-slot=footer-column-title]]:text-white">
    <FooterColumns className="w-full lg:grid lg:grid-cols-5 lg:gap-8">
      <FooterColumn title="Product">
        <FooterLink href="#" className="text-white/75 hover:text-white">Components</FooterLink>
        {/* …more links */}
      </FooterColumn>
      <FooterColumn title="Solutions">{/* links */}</FooterColumn>
      <FooterColumn title="Resources">{/* links */}</FooterColumn>
      <FooterColumn title="Company">{/* links */}</FooterColumn>
      <FooterColumn title="Support">{/* links */}</FooterColumn>
    </FooterColumns>

    {/* Open scenic band where the image shows through. */}
    <div aria-hidden className="h-44 sm:h-56 lg:h-64" />

    <FooterBottom className="mt-0 border-t-0 pt-0 sm:justify-start sm:gap-x-8">
      <FooterCopyright className="text-white/75">© 2026 Koala UI</FooterCopyright>
      <FooterLegal>
        <FooterLink href="#" className="text-white/75 hover:text-white">Privacy</FooterLink>
        <FooterLink href="#" className="text-white/75 hover:text-white">Terms</FooterLink>
        <FooterLink href="#" className="text-white/75 hover:text-white">Security</FooterLink>
      </FooterLegal>
    </FooterBottom>
  </Footer>
</div>`

const FOOTER_SECTION_3_CODE = `{/* Newsletter-strip footer: an email-capture band on top, then a wide link grid. The signup is
    the canonical NewsletterForm in its inline layout (ships the loading → success flow). */}
<Footer>
  <div className="flex flex-col gap-6 pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
    <div className="flex flex-col gap-1.5">
      <h3 className="text-lg font-semibold tracking-tight text-balance text-foreground">Stay in the loop</h3>
      <p className="max-w-md text-sm text-pretty text-muted-foreground">
        Product updates, design tips, and the occasional deep dive. No spam, unsubscribe anytime.
      </p>
    </div>
    <NewsletterForm variant="inline" action="Subscribe" className="w-full lg:max-w-md" />
  </div>

  <FooterTop className="border-t border-border pt-10">
    <FooterBrand>
      <BrandMark />
      <FooterTagline>The commercial React design system for teams that ship fast.</FooterTagline>
      <FooterSocial>{/* X · Instagram · LinkedIn · GitHub · YouTube */}</FooterSocial>
    </FooterBrand>
    <FooterColumns>
      <FooterColumn title="Product">{/* links */}</FooterColumn>
      <FooterColumn title="Resources">{/* links */}</FooterColumn>
      <FooterColumn title="Company">{/* links */}</FooterColumn>
      <FooterColumn title="Legal">{/* links */}</FooterColumn>
    </FooterColumns>
  </FooterTop>

  <FooterBottom>
    <FooterCopyright>© 2026 Koala UI. All rights reserved.</FooterCopyright>
    <FooterLegal>{/* Privacy · Terms · Cookies */}</FooterLegal>
  </FooterBottom>
</Footer>`

const FOOTER_SECTION_4_CODE = `{/* Newsletter-card footer: brand + link columns on the left, a self-contained NewsletterForm
    card on the right. The card brings its own concentric surface + the --surface contract. */}
<Footer>
  <FooterTop className="lg:items-start lg:gap-16">
    <div className="flex flex-col gap-10 lg:flex-1 lg:flex-row lg:gap-16">
      <FooterBrand>
        <BrandMark />
        <FooterTagline>The commercial React design system for teams that ship fast.</FooterTagline>
        <FooterSocial>{/* X · Instagram · LinkedIn · GitHub · YouTube */}</FooterSocial>
      </FooterBrand>
      <FooterColumns>
        <FooterColumn title="Product">{/* links */}</FooterColumn>
        <FooterColumn title="Company">{/* links */}</FooterColumn>
        <FooterColumn title="Resources">{/* links */}</FooterColumn>
      </FooterColumns>
    </div>
    <NewsletterForm
      variant="card"
      title="Subscribe to our newsletter"
      description="The latest components, templates, and design tips, straight to your inbox."
      fineprint="No spam. Unsubscribe anytime."
      className="w-full shrink-0 lg:max-w-sm"
    />
  </FooterTop>
  <FooterBottom>
    <FooterCopyright>© 2026 Koala UI. All rights reserved.</FooterCopyright>
    <FooterLegal>{/* Privacy · Terms · Cookies */}</FooterLegal>
  </FooterBottom>
</Footer>`

const FOOTER_SECTION_5_CODE = `{/* Minimal centered footer: a centered brand mark, an inline nav row, a capped inline
    newsletter, the social row, and a centered legal line. */}
<Footer>
  <div className="flex flex-col items-center gap-8 text-center">
    <BrandMark />
    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
      <FooterLink href="#">Components</FooterLink>
      {/* Templates · Pricing · Docs · Blog · Changelog */}
    </nav>
    <NewsletterForm variant="inline" action="Subscribe" className="w-full max-w-md" />
    <FooterSocial>{/* X · Instagram · LinkedIn · GitHub · YouTube */}</FooterSocial>
  </div>
  <FooterBottom className="items-center justify-center text-center sm:justify-center">
    <FooterCopyright>© 2026 Koala UI. All rights reserved.</FooterCopyright>
  </FooterBottom>
</Footer>`

const GALLERY_CODE = `<Gallery>
  <Tabs defaultValue="home">
    <GalleryHeader>
      <SectionHeader align="center">
        <SectionHeaderText>
          <SectionHeaderHeading>Create concepts in seconds</SectionHeaderHeading>
          <SectionHeaderDescription>Pre-designed sections and templates.</SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <TabsList>{/* Home · Blog · About · Pricing · Careers */}</TabsList>
    </GalleryHeader>
    <TabsContent value="home">
      <Lightbox images={images}>
        <GalleryMasonry>
          <LightboxTrigger index={0} asChild>
            <GalleryItem action="See image">
              <GalleryImage src="…" alt="…" />
            </GalleryItem>
          </LightboxTrigger>
          {/* … */}
        </GalleryMasonry>
      </Lightbox>
    </TabsContent>
  </Tabs>
</Gallery>`

const GALLERY_MARQUEE_CODE = `<Gallery>
  <GalleryHeader>
    <SectionHeader align="center">
      <SectionHeaderText>
        <Badge variant="purple" dot pill>Gallery section</Badge>
        <SectionHeaderHeading>Jambo Team Gallery</SectionHeaderHeading>
        <SectionHeaderDescription>A living wall of moments, drifting past in two directions.</SectionHeaderDescription>
      </SectionHeaderText>
    </SectionHeader>
  </GalleryHeader>

  <Lightbox images={images}>
    <div className="mt-12 flex flex-col gap-4 overflow-hidden">
      {/* Row drifts left; the set is rendered twice so the marquee loops with no seam. */}
      <div className="group/marquee relative flex overflow-hidden fade-x [--fade-size:3%]">
        <div className="flex w-max animate-marquee gap-4 pr-4 group-hover/marquee:[animation-play-state:paused]">
          {[...row, ...row].map((preview, i) => (
            <LightboxTrigger key={i} index={i % row.length} asChild aria-hidden={i >= row.length}>
              <GalleryItem action="See image" className="mb-0 w-80 shrink-0 sm:w-[28rem]">
                <GalleryImage src={preview.src} alt={preview.alt} className="h-56 sm:h-72" />
              </GalleryItem>
            </LightboxTrigger>
          ))}
        </div>
      </div>
      {/* A second row adds [animation-direction:reverse] to drift the other way. */}
    </div>
  </Lightbox>

  <div className="flex justify-center pb-20 pt-14">
    <Button size="lg" className="rounded-full">Read all FAQs</Button>
  </div>
</Gallery>`

const GALLERY_TABBED_CODE = `<Gallery>
  <Tabs defaultValue="home">
    <GalleryHeader>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="purple" dot pill>Gallery section</Badge>
          <SectionHeaderHeading>Create concepts in seconds</SectionHeaderHeading>
          <SectionHeaderDescription>Switch categories with the tabs, then open any frame full-screen.</SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <TabsList>{/* Home · Blog · About · Pricing · Careers */}</TabsList>
    </GalleryHeader>
    <TabsContent value="home">
      <Lightbox images={images}>
        {/* Device-width band with a horizontal fade that dissolves the tiles into the background at
            both edges, so the bleed fades smoothly instead of hard-clipping at the frame. */}
        <div className="relative w-full fade-x [--fade-size:6%]">
          {/* Bleed past the frame (120vw, centered) so the outer columns spill off both edges,
              up to a fifth column on xl. */}
          <GalleryMasonry className="relative left-1/2 w-[120vw] max-w-none -translate-x-1/2 px-0 pb-0 sm:pb-0 xl:columns-5">
            <LightboxTrigger index={0} asChild>
              <GalleryItem action="See image">
                <GalleryImage src="…" alt="…" />
              </GalleryItem>
            </LightboxTrigger>
            {/* … */}
          </GalleryMasonry>
        </div>
      </Lightbox>
    </TabsContent>
  </Tabs>

  <div className="flex justify-center pb-20 pt-14">
    <Button size="lg" className="rounded-full">Browse all templates</Button>
  </div>
</Gallery>`

const GALLERY_RING_CODE = `// 16 frames evenly distributed (~22.5° apart) so none overlap — the lede is far narrower than the
// ring is wide, so frames clear the headline even at 3 and 9 o'clock. Large frames sit every 4th
// slot (never adjacent); side frames carry a larger radius + hideOnMobile to stay clear of the text.
const RING = [
  { id: "1486312338219-…", alt: "Landing page concept", angle: 359, r: 1.0, tilt: -8, size: "size-14 sm:size-24" },
  { id: "1517694712202-…", alt: "Product homepage", angle: 23, r: 0.98, tilt: 7, size: "size-14 sm:size-20" },
  { id: "1467232004584-…", alt: "Minimal hero layout", angle: 44, r: 1.02, tilt: -10, size: "size-12 sm:size-16" },
  { id: "1455390582262-…", alt: "Writing setup", angle: 68, r: 1.04, tilt: 9, size: "size-14 sm:size-20", hideOnMobile: true },
  // …16 frames around the ring; the six near 3 & 9 o'clock carry hideOnMobile.
]

const RX = 44, RY = 40 // ellipse radii as a share of the stage box (wider than tall)
function ringStyle(tile, i) {
  const rad = (tile.angle * Math.PI) / 180
  return {
    left: \`\${50 + RX * tile.r * Math.sin(rad)}%\`,
    top: \`\${50 - RY * tile.r * Math.cos(rad)}%\`,
    // standalone props, so they don't clobber the entrance keyframe's transform
    translate: "-50% -50%",
    rotate: \`\${tile.tilt}deg\`,
    animationDelay: \`\${i * 55}ms\`,
  }
}

const images = RING.map((t) => ({ src: ringFull(t.id), alt: t.alt }))

<Gallery>
  <Lightbox images={images}>
    <div className="relative mx-auto w-full max-w-[90rem] px-6 py-12 sm:py-16">
      {/* Stage: explicit height gives the ring room; overflow-hidden clips frames that spill off.
          Taller on mobile so the top/bottom frames clear the headline once the side frames drop. */}
      <div className="relative mx-auto h-[42rem] w-full sm:h-[42rem] lg:h-[46rem]">
        {/* Orbiting layer: ring-orbit rotates it with scroll (pure CSS, reduced-motion safe); the
            sweep is tuned here via custom props so the utility stays untouched. */}
        <div className="ring-orbit pointer-events-none absolute inset-0 [--ring-orbit-from:-14deg] [--ring-orbit-to:14deg]">
          {RING.map((tile, i) => (
            <LightboxTrigger key={tile.id} index={i} asChild>
              <GalleryItem
                action={<MagnifyingGlassPlus />}
                className={cn("pointer-events-auto absolute m-0 animate-stagger-in-blur motion-reduce:animate-none", tile.size, tile.hideOnMobile && "hidden sm:block")}
                style={ringStyle(tile, i)}
              >
                <GalleryImage src={ringThumb(tile.id)} alt={tile.alt} className="h-full" />
              </GalleryItem>
            </LightboxTrigger>
          ))}
        </div>

        {/* Centered lede, above the ring and never rotating. */}
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-4">
          <div className="pointer-events-auto w-full max-w-md">
            <SectionHeader align="center" stagger staggerBlur staggerTrigger="inView">
              <SectionHeaderText>
                <Badge variant="purple" dot pill>Gallery</Badge>
                <SectionHeaderHeading>Built with Koala, <em className="italic">from every angle.</em></SectionHeaderHeading>
                <SectionHeaderDescription>A ring of real interfaces shipped with the system. Scroll to set them orbiting, or click any frame to open it full-screen.</SectionHeaderDescription>
              </SectionHeaderText>
              <SectionHeaderActions>
                <Button size="lg">Explore the gallery<ArrowRight /></Button>
              </SectionHeaderActions>
            </SectionHeader>
          </div>
        </div>
      </div>
    </div>
  </Lightbox>
</Gallery>`

const HERO_CODE = `<Hero>
  <HeroContent>
    <Badge variant="orange" dot pill>Koala UI v11 is here!</Badge>
    <HeroTitle>A Design System built for AI-Powered Products</HeroTitle>
    <HeroSubtitle>Ship MVPs fast.</HeroSubtitle>
    <HeroActions>
      <Button size="lg">Buy now</Button>
      <Button size="lg" variant="outline">Preview Desktop</Button>
    </HeroActions>
    <HeroFeatures>{/* HeroFeature × N */}</HeroFeatures>
    <HeroSocialProof>{/* AvatarGroup + rating */}</HeroSocialProof>
  </HeroContent>
</Hero>`

const HERO_SECTION_3_CODE = `<Hero>
  <HeroContent className="max-w-5xl gap-8">
    <Badge variant="orange" dot pill>Koala UI 2.0 is live</Badge>
    <HeroTitle className="max-w-3xl leading-[1.2]">
      Bring your product into{" "}
      <HeroHighlight rotate={["every decision", "every workflow", "every release", "every roadmap"]}>
        every decision
      </HeroHighlight>
    </HeroTitle>
    <HeroSubtitle>Ship polished, accessible interfaces from the first commit.</HeroSubtitle>
    <HeroActions>
      <Button size="lg">Start for free</Button>
      <Button size="lg" variant="outline">Book a demo</Button>
    </HeroActions>
    {/* trusted-by logo row */}
    <HeroMedia className="mt-6 max-w-5xl">{/* image placeholder */}</HeroMedia>
  </HeroContent>
</Hero>`

const HERO_SECTION_4_CODE = `<Hero layout="split">
  <HeroContent>
    <HeroColumn>
      <Badge variant="info" dot pill>Now in public beta</Badge>
      <HeroTitle>Analytics your whole team actually uses</HeroTitle>
      <HeroSubtitle>Real-time dashboards with no setup.</HeroSubtitle>
      <HeroActions>
        <Button size="lg">Get started</Button>
        <Button size="lg" variant="outline">Live demo</Button>
      </HeroActions>
      <HeroSocialProof>{/* AvatarGroup + rating */}</HeroSocialProof>
    </HeroColumn>
    <HeroMedia>{/* image placeholder */}</HeroMedia>
  </HeroContent>
</Hero>`

const HERO_SECTION_5_CODE = `<Hero layout="split">
  <HeroContent>
    <HeroColumn>
      <Badge variant="info" dot pill>10,000+ teams and counting</Badge>
      <HeroTitle>
        The platform powering the world's <HeroHighlight>best teams</HeroHighlight>
      </HeroTitle>
      <HeroSubtitle>Product teams ship on Koala UI, from startups to the Fortune 500.</HeroSubtitle>
      <HeroActions>
        <Button size="lg">Start building</Button>
        <Button size="lg" variant="outline">Contact sales</Button>
      </HeroActions>
    </HeroColumn>
    <HeroMedia>{/* borderless grid of logo lockups */}</HeroMedia>
  </HeroContent>
</Hero>`

const NAVBAR_CODE = `<Navbar>
  <NavbarInner>
    <NavbarBrand href="/">Koala</NavbarBrand>
    <NavbarNav>
      <NavbarLink href="#" active>Features</NavbarLink>
      {/* Home · About · Blog · Pricing */}
    </NavbarNav>
    <NavbarSpacer />
    <NavbarActions>
      <Button size="sm" variant="ghost">Sign in</Button>
      <Button size="sm">Sign up</Button>
    </NavbarActions>
    <NavbarMobileToggle />
  </NavbarInner>
  <NavbarMobileMenu>{/* NavbarMobileLink × N */}</NavbarMobileMenu>
</Navbar>`

const TESTIMONIALS_CODE = `<SectionHeader align="center">
  <SectionHeaderText>
    <Badge variant="success" dot pill>Testimonials</Badge>
    <SectionHeaderHeading>Loved by teams who ship</SectionHeaderHeading>
    <SectionHeaderDescription>
      Thousands of product teams build their interfaces on Koala UI.
    </SectionHeaderDescription>
  </SectionHeaderText>
</SectionHeader>

<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <Testimonial>
    <TestimonialQuote>We replaced our in-house kit in a weekend.</TestimonialQuote>
    <TestimonialFooter>
      <Avatar><AvatarFallback>AR</AvatarFallback></Avatar>
      <TestimonialAuthor>
        <TestimonialName>Alex Rivera</TestimonialName>
        <TestimonialTitle>Founder, Lumen</TestimonialTitle>
      </TestimonialAuthor>
    </TestimonialFooter>
  </Testimonial>
  {/* … two more */}
</div>`

/**
 * Section slabs that lead with a `SectionHeader` lede. The render target wraps each `component` in
 * a `SectionContainer` (a flex column with the canonical 56px gap), so a slab that returns the
 * header followed by the content lands the lede 56px above the block for free, no per-slab margin.
 * Sections that already lead with their own heading (Hero, Gallery) or are page chrome (Navbar,
 * Footer) keep their bare demo. The copy here is real marketing copy (not the docs description),
 * since the docs page already shows that above the frame.
 */
/**
 * Banner variants render BARE and full-bleed (no SectionHeader, no rounding): each is its own
 * labeled preview on the docs page, pinned to the top of a short page region by the `bleed`
 * render path, so it reads as a real site-wide bar sitting atop a page. `Banner` owns its own
 * dismiss state, so these stay plain server-rendered compositions. The exception is the live
 * countdown bar (`banner-countdown`), which needs a ticking client clock and so is imported from
 * the banner demos island as `BannerCountdownSection`.
 */
function BannerSoftSection() {
  return (
    <Banner variant="purple" dismissible dismissLabel="Dismiss announcement">
      <BannerIcon>
        <Megaphone />
      </BannerIcon>
      <BannerContent>Koala UI now available for Mobile Apps!</BannerContent>
      <BannerAction href="#">
        Check it out
        <ArrowRight />
      </BannerAction>
    </Banner>
  )
}

function BannerBrandSection() {
  return (
    <Banner appearance="solid" variant="brand" dismissible dismissLabel="Dismiss announcement">
      <BannerIcon>
        <Rocket />
      </BannerIcon>
      <BannerContent>Koala UI v2.0 is here.</BannerContent>
      <BannerAction href="#">
        Read the release notes
        <ArrowRight />
      </BannerAction>
    </Banner>
  )
}

function BannerDarkSection() {
  return (
    <Banner appearance="solid" variant="default" dismissible dismissLabel="Dismiss announcement">
      <BannerIcon>
        <Megaphone />
      </BannerIcon>
      <BannerContent>GeneriCon 2026 · Join us in Denver from June 7 to 9.</BannerContent>
      <BannerAction href="#">
        Register now
        <ArrowRight />
      </BannerAction>
    </Banner>
  )
}

function BannerCtaSection() {
  return (
    <Banner align="between" variant="info" dismissible dismissLabel="Dismiss announcement">
      <BannerIcon>
        <Lightning />
      </BannerIcon>
      <BannerContent>You have 14 days left in your free trial.</BannerContent>
      <Button size="sm" asChild>
        <a href="#">Upgrade</a>
      </Button>
    </Banner>
  )
}

function BentoSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="purple" dot pill>
            Features
          </Badge>
          <SectionHeaderHeading>Everything you need to ship</SectionHeaderHeading>
          <SectionHeaderDescription>
            A complete toolkit of polished components, theming, and assets, so you can go from idea
            to production without sweating the details.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <BentoDemo />
    </>
  )
}

function VideoShowcaseSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            See it in motion
          </Badge>
          <SectionHeaderHeading>Never start from scratch ever again</SectionHeaderHeading>
          <SectionHeaderDescription>
            Quickly generate multiple concepts thanks to all the components and sections we have
            carefully designed for you.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <VideoShowcaseFrame />
    </>
  )
}

function TestimonialsSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="success" dot pill>
            Testimonials
          </Badge>
          <SectionHeaderHeading>Loved by teams who ship</SectionHeaderHeading>
          <SectionHeaderDescription>
            Thousands of product teams build their interfaces on Koala UI. Here is what a few of
            them have to say.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <TestimonialsDemo />
    </>
  )
}

function HeroSocialProofSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="success" dot pill>
            Social proof
          </Badge>
          <SectionHeaderHeading>Backed by teams shipping real products</SectionHeaderHeading>
          <SectionHeaderDescription>
            Logo-led proof that sits right under the hero: founders and engineers who build on
            Koala UI every day.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <HeroTestimonialsContent />
    </>
  )
}

function ComponentShowcaseSection() {
  return (
    <>
      <SectionHeader align="center" stagger staggerTrigger="inView">
        <SectionHeaderText>
          <Badge variant="purple" dot pill>
            Components
          </Badge>
          <SectionHeaderHeading>60+ components, ready to use</SectionHeaderHeading>
          <SectionHeaderDescription>
            These are live, not screenshots. Toggle, drag, and open them right here, then drop the
            same source into your project.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      {/* Group the gallery and its trailing CTA so the container's 56px gap only sits above the
          header, not between the wall and the button. */}
      <div className="flex flex-col gap-10">
        <ShowcaseGallery />
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/docs">
              See all components
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

function FeatureGridSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="orange" dot pill>
            Why Koala UI
          </Badge>
          <SectionHeaderHeading>Never start from scratch again</SectionHeaderHeading>
          <SectionHeaderDescription>
            A foundation that handles the hard parts, so your team spends its time on the product,
            not the primitives.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <FeatureGridContent />
    </>
  )
}

function StatsSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            By the numbers
          </Badge>
          <SectionHeaderHeading>The system at a glance</SectionHeaderHeading>
          <SectionHeaderDescription>
            Everything the library ships with, counted, banded into one segmented surface.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <StatsContent />
    </>
  )
}

function StatsSpotlightSection() {
  return (
    <>
      <SectionHeader align="left" orientation="split">
        <SectionHeaderText>
          <Badge variant="purple" dot pill>
            By the numbers
          </Badge>
          <SectionHeaderHeading>It&apos;s like onboarding a design team overnight</SectionHeaderHeading>
          <SectionHeaderDescription>
            Teams that adopt Koala UI ship polished, accessible interfaces in a fraction of the time,
            on one consistent system across every surface.
          </SectionHeaderDescription>
        </SectionHeaderText>
        <SectionHeaderActions>
          <Button asChild size="lg">
            <Link href="#">
              Get started
              <ArrowRight />
            </Link>
          </Button>
        </SectionHeaderActions>
      </SectionHeader>
      <StatsSpotlightContent />
    </>
  )
}

function StatsTrendsSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            Momentum
          </Badge>
          <SectionHeaderHeading>Trusted by teams shipping every day</SectionHeaderHeading>
          <SectionHeaderDescription>
            A look at how the library is growing, quarter over quarter.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <StatsTrendsContent />
    </>
  )
}

function StatsCaptionTopSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            By the numbers
          </Badge>
          <SectionHeaderHeading>Quality you can measure</SectionHeaderHeading>
          <SectionHeaderDescription>
            Adoption, reach, and the time it takes to ship, counted across teams building on Koala UI.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <StatsCaptionTopContent />
    </>
  )
}

function StatsCenteredSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            Why teams stay
          </Badge>
          <SectionHeaderHeading>Built to support real products</SectionHeaderHeading>
          <SectionHeaderDescription>
            The things that matter once a design system is in production, not just on launch day.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <StatsCenteredContent />
    </>
  )
}

function PricingSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="purple" dot pill>
            Pricing
          </Badge>
          <SectionHeaderHeading>Pay once, and use forever</SectionHeaderHeading>
          <SectionHeaderDescription>
            No subscriptions. Choose the design kit, the code library, or both, and own it for good.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <PricingDemo />
    </>
  )
}

function FaqSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            FAQ
          </Badge>
          <SectionHeaderHeading>Have a question? We have answers</SectionHeaderHeading>
          <SectionHeaderDescription>
            Everything you might want to know before you install.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <FaqContent />
    </>
  )
}

function ChangelogSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="success" dot pill>
            Changelog
          </Badge>
          <SectionHeaderHeading>New month, new updates</SectionHeaderHeading>
          <SectionHeaderDescription>
            The library ships improvements every month. Here is what landed recently.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <ChangelogContent />
    </>
  )
}

function LogoCloudSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="info" dot pill>
            Social proof
          </Badge>
          <SectionHeaderHeading>Trusted by the teams behind great products</SectionHeaderHeading>
          <SectionHeaderDescription>
            The companies building their interfaces on Koala UI, from fast-moving startups to the
            Fortune 500.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <LogoCloudContent />
    </>
  )
}

function LogoGridSection() {
  return (
    <>
      <SectionHeader align="center">
        <SectionHeaderText>
          <Badge variant="purple" dot pill>
            Customers
          </Badge>
          <SectionHeaderHeading>Powering products at companies of every size</SectionHeaderHeading>
          <SectionHeaderDescription>
            A system trusted in production, from the first commit all the way to global scale.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>
      <LogoBorderedGridContent />
    </>
  )
}

export const SECTIONS: Record<string, SectionEntry> = {
  banner: {
    title: "Soft tones",
    description:
      "A soft-tinted announcement bar: the tone tints the background while the icon and action carry the hue, so it re-themes across every theme.",
    domain: "marketing",
    level: "section",
    component: BannerSoftSection,
    code: BANNER_SOFT_CODE,
    bleed: true,
  },
  "banner-brand": {
    title: "On brand",
    description:
      "A solid brand bar. The brand accent is constant across themes, so white text stays legible on every surface.",
    domain: "marketing",
    level: "section",
    component: BannerBrandSection,
    code: BANNER_BRAND_CODE,
    bleed: true,
  },
  "banner-dark": {
    title: "On dark",
    description:
      "A solid inverse bar: dark-on-light or light-on-dark, flipping with the theme for a high-contrast site-wide notice.",
    domain: "marketing",
    level: "section",
    component: BannerDarkSection,
    code: BANNER_DARK_CODE,
    bleed: true,
  },
  "banner-cta": {
    title: "With a CTA button",
    description:
      "Message pinned left, a Button call to action pinned right (align=between), the natural home for a primary action.",
    domain: "marketing",
    level: "section",
    component: BannerCtaSection,
    code: BANNER_CTA_CODE,
    bleed: true,
  },
  "banner-countdown": {
    title: "Countdown timer",
    description:
      "A limited-time promo bar with a live countdown ticking between the message and the CTA. The days, hours, minutes, and seconds segments use tabular figures so the bar never reflows as it counts down, and the soft tone re-themes across every theme.",
    domain: "marketing",
    level: "section",
    component: BannerCountdownSection,
    code: BANNER_COUNTDOWN_CODE,
    bleed: true,
  },
  "feature-section-3": {
    title: "Bento",
    description:
      "An asymmetric marketing grid of feature tiles: tinted icons, balanced titles, and screenshots that peek up from the bottom edge. The grid collapses from six columns to one as the frame narrows.",
    domain: "marketing",
    level: "section",
    component: BentoSection,
    code: BENTO_CODE,
  },
  "feature-section-2": {
    title: "Video showcase",
    description:
      "A centered lede over a full-width product video, played through Koala's own VideoPlayer in a concentric-radius frame. Controls stay hidden until you hover, and the clip autoplays muted and loops for the cinematic feel.",
    domain: "marketing",
    level: "section",
    component: VideoShowcaseSection,
    code: FEATURE_SECTION_2_CODE,
    locked: true,
  },
  footer: {
    title: "Footer",
    description:
      "A composable site footer: a brand column with social links, grouped link columns, and a legal bottom bar. Pure layout that drops onto any marketing or product page.",
    domain: "marketing",
    level: "section",
    component: FooterDemo,
    code: FOOTER_CODE,
    locked: true,
  },
  "footer-section-2": {
    title: "Image overlay",
    description:
      "An image-led footer where a full-bleed photo becomes the backdrop and the nav rides on top: five link columns at the top, an open scenic band through the middle, and a minimal copyright + legal bar at the bottom. A scrim keeps the white text legible; swap the image src for your own art.",
    domain: "marketing",
    level: "section",
    component: FooterOverlayDemo,
    code: FOOTER_SECTION_2_CODE,
    locked: true,
    bleed: true,
  },
  "footer-section-3": {
    title: "Newsletter strip",
    description:
      "A newsletter-led footer: an email-capture band leads on top, a hairline splits it from a wide four-column link grid, and the brand, social, and legal bar close it. The signup is the canonical NewsletterForm in its inline layout, shipping the loading-to-success flow out of the box.",
    domain: "marketing",
    level: "section",
    component: FooterNewsletterStripDemo,
    code: FOOTER_SECTION_3_CODE,
    locked: true,
  },
  "footer-section-4": {
    title: "Newsletter card",
    description:
      "A footer with the signup as a self-contained card: the brand and link columns sit on the left, and a NewsletterForm card (heading, lead, and fine print) anchors the right. The card brings its own concentric surface so the nested input blends with the panel.",
    domain: "marketing",
    level: "section",
    component: FooterNewsletterCardDemo,
    code: FOOTER_SECTION_4_CODE,
    locked: true,
  },
  "footer-section-5": {
    title: "Minimal centered",
    description:
      "A compact, centered footer for simpler pages: a centered brand mark, a single inline nav row, a capped inline newsletter, the social row, and a centered legal line. A lighter alternative to the mega link grid.",
    domain: "marketing",
    level: "section",
    component: FooterCenteredDemo,
    code: FOOTER_SECTION_5_CODE,
    locked: true,
  },
  "gallery-section-1": {
    title: "Gallery",
    description:
      "A marketing concepts wall: a balanced headline, an optional tab rail to switch categories, and a full-bleed fake-masonry of framed preview tiles with a built-in lightbox.",
    domain: "marketing",
    level: "section",
    component: GalleryDemo,
    code: GALLERY_CODE,
    locked: true,
  },
  "gallery-section-2": {
    title: "Gallery",
    description:
      "A two-direction marquee wall: framed previews drift past in opposite rows (pause on hover), each opening a built-in full-screen lightbox, capped with a centered CTA.",
    domain: "marketing",
    level: "section",
    component: GalleryMarqueeDemo,
    code: GALLERY_MARQUEE_CODE,
    locked: true,
    bleed: true,
  },
  "gallery-section-3": {
    title: "Gallery",
    description:
      "The tabbed fake-masonry wall with chrome: a badge eyebrow and a balanced headline up top, a tab rail to switch categories, then a full-bleed lightbox-backed masonry that spans edge to edge (its outer columns clip at the section edges), capped with a centered CTA below.",
    domain: "marketing",
    level: "section",
    component: GalleryTabbedDemo,
    code: GALLERY_TABBED_CODE,
    locked: true,
    bleed: true,
  },
  "gallery-section-4": {
    title: "Gallery",
    description:
      "A floating ring of framed previews orbiting a centered lede: the eyebrow, headline, and CTA sit at the heart of the band while the photos scatter around them on an ellipse. The whole ring slowly rotates as the section scrolls through the viewport (a pure-CSS scroll-driven animation, reduced-motion safe), and every frame opens the shared full-screen lightbox.",
    domain: "marketing",
    level: "section",
    component: GalleryRingDemo,
    code: GALLERY_RING_CODE,
    locked: true,
    bleed: true,
  },
  "hero-section-1": {
    title: "Hero",
    description:
      "A centered marketing hero: an announcement eyebrow, a balanced headline and subtitle, a CTA row, a feature checklist, and integrated social proof.",
    domain: "marketing",
    level: "section",
    component: HeroDemo,
    code: HERO_CODE,
    locked: true,
    // The Hero is its own full-bleed band and owns its vertical rhythm, so composers skip the
    // page band's padding (single owner; no double-padding).
    ownsPadding: true,
  },
  navbar: {
    title: "Navbar",
    description:
      "A composable top navigation bar for marketing, product, and ecommerce shells. A spacer pushes groups apart, and a hamburger menu takes over below the md breakpoint.",
    domain: "marketing",
    level: "section",
    component: NavbarDemo,
    code: NAVBAR_CODE,
    locked: true,
  },
  "testimonials-section-1": {
    title: "Testimonials",
    description:
      "A social-proof wall of quote cards: the quote, an author row, and an optional company logo, laid out as a responsive grid that collapses from three columns to one.",
    domain: "marketing",
    level: "section",
    component: TestimonialsSection,
    code: TESTIMONIALS_CODE,
    locked: true,
  },
  "hero-section-2": {
    title: "Social proof",
    description:
      "Logo-led social proof that sits directly under a hero: three container-less testimonials, each with the company logo (a colored symbol beside the name) on top, a bold headline, supporting body, and an author byline.",
    domain: "marketing",
    level: "section",
    component: HeroSocialProofSection,
    code: HERO_SECTION_2_CODE,
    locked: true,
  },
  "hero-section-3": {
    title: "Spotlight hero",
    description:
      "A centered, product-led hero: an announcement eyebrow, a headline whose highlighted keyword rotates through phrases with a per-character stagger inside a wash that hugs each word and recolors per phrase, a CTA pair, a trusted-by logo strip, and an image placeholder anchored below, ready for a product screenshot.",
    domain: "marketing",
    level: "section",
    component: HeroSpotlightDemo,
    code: HERO_SECTION_3_CODE,
    locked: true,
    ownsPadding: true,
  },
  "hero-section-4": {
    title: "Split hero",
    description:
      "A two-column hero: a left-aligned copy column (eyebrow, headline, subtitle, CTA pair, and avatar social proof) beside an image placeholder ready for a product screenshot. Folds to a single stacked column below the lg breakpoint.",
    domain: "marketing",
    level: "section",
    component: HeroSplitDemo,
    code: HERO_SECTION_4_CODE,
    locked: true,
    ownsPadding: true,
  },
  "hero-section-5": {
    title: "Logo wall hero",
    description:
      "An editorial split hero where the social proof is the visual: a compact copy column beside a borderless wall of customer logos, each a colored symbol beside an invented wordmark, in full brand color. Folds to one column on mobile.",
    domain: "marketing",
    level: "section",
    component: HeroLogoWallDemo,
    code: HERO_SECTION_5_CODE,
    locked: true,
    ownsPadding: true,
  },
  "feature-section-1": {
    title: "Component showcase",
    description:
      "A masonry wall of real, interactive components dropped straight in, not screenshots: toggle a Switch, drag a Slider, open an Accordion. No tile chrome or labels, just the system in use, with a CTA to the full catalog below.",
    domain: "marketing",
    level: "section",
    component: ComponentShowcaseSection,
    code: FEATURE_SECTION_1_CODE,
    locked: true,
  },
  "feature-section-4": {
    title: "Feature grid",
    description:
      "A balanced three-up grid of feature cards, one per real differentiator: a tinted icon chip, a title, and a supporting line. Collapses from three columns to one as the frame narrows.",
    domain: "marketing",
    level: "section",
    component: FeatureGridSection,
    code: FEATURE_SECTION_4_CODE,
    locked: true,
  },
  "stats-section-1": {
    title: "Stats",
    description:
      "The library at a glance: a four-up band of metrics, minimal with no container, separated by nothing but thin hairline rules, with tabular figures that keep the row steady. Collapses to a two-up grid on mobile.",
    domain: "marketing",
    level: "section",
    component: StatsSection,
    code: STATS_SECTION_1_CODE,
    locked: true,
  },
  "stats-section-2": {
    title: "Spotlight",
    description:
      "A split lede with a CTA over a minimal row of metrics: just a top hairline and thin vertical rules, with each column carrying an accent eyebrow, an oversized figure, and a supporting line pinned to the bottom so the captions stay aligned. A footnote with a source link closes it.",
    domain: "marketing",
    level: "section",
    component: StatsSpotlightSection,
    code: STATS_SECTION_2_CODE,
    locked: true,
  },
  "stats-section-3": {
    title: "Trends",
    description:
      "A centered lede over a four-up row of minimal metrics, each stacking a soft circular icon, a tabular figure, a label, and a directional trend chip on whitespace alone. Collapses from four columns to one as the frame narrows.",
    domain: "marketing",
    level: "section",
    component: StatsTrendsSection,
    code: STATS_SECTION_3_CODE,
    locked: true,
  },
  "stats-section-4": {
    title: "Split",
    description:
      "A left-aligned lede beside a flat two-up grid of oversized figures, with no panel or cards: the numbers read as type and whitespace on the page. Folds to a single column on mobile.",
    domain: "marketing",
    level: "section",
    component: StatsSplitContent,
    code: STATS_SECTION_4_CODE,
    locked: true,
  },
  "stats-section-5": {
    title: "Caption top",
    description:
      "A centered lede over a minimal row that inverts the spotlight: a small supporting line sits on top and the oversized figure is pinned to a shared baseline below. Only a top hairline and thin vertical rules frame it.",
    domain: "marketing",
    level: "section",
    component: StatsCaptionTopSection,
    code: STATS_SECTION_5_CODE,
    locked: true,
  },
  "stats-section-6": {
    title: "Centered",
    description:
      "A centered, pure-type row with no cards or icons: each metric stacks an oversized figure, a bold title, and a supporting line on whitespace alone. Collapses from three columns to one as the frame narrows.",
    domain: "marketing",
    level: "section",
    component: StatsCenteredSection,
    code: STATS_SECTION_6_CODE,
    locked: true,
  },
  "pricing-section-1": {
    title: "Pricing",
    description:
      "A three-tier pricing table with a highlighted plan: tabular prices, a feature checklist of included and excluded items, and a bottom-pinned CTA on each card. The featured tier carries a brand ring.",
    domain: "marketing",
    level: "section",
    component: PricingSection,
    code: PRICING_SECTION_1_CODE,
    locked: true,
  },
  "faq-section-1": {
    title: "FAQ",
    description:
      "A single-open, separated accordion of the product's common questions. Only one panel is open at a time, and the section caps its width so the questions stay easy to scan.",
    domain: "marketing",
    level: "section",
    component: FaqSection,
    code: FAQ_SECTION_1_CODE,
    locked: true,
  },
  "changelog-section-1": {
    title: "Changelog",
    description:
      "The recent release log as a simple timeline of version cards: a pill version, a tabular date, and a short note per entry, with a CTA to the full docs below.",
    domain: "marketing",
    level: "section",
    component: ChangelogSection,
    code: CHANGELOG_SECTION_1_CODE,
    locked: true,
  },
  "cta-section-1": {
    title: "Install",
    description:
      "The CLI and source-ownership story: a left-aligned lede and benefit checklist beside two stacked code snippets (the install command and a usage example). Stacks to one column on mobile.",
    domain: "marketing",
    level: "section",
    component: InstallCliContent,
    code: CTA_SECTION_1_CODE,
    locked: true,
  },
  "cta-section-2": {
    title: "Closing CTA",
    description:
      "A brand-lit closing panel that funnels to pricing and the docs: a centered lede over a primary and a secondary action, with a token-driven brand glow that tracks the active accent.",
    domain: "marketing",
    level: "section",
    component: CtaBandContent,
    code: CTA_SECTION_2_CODE,
    locked: true,
  },
  "social-proof-section-1": {
    title: "Logo cloud",
    description:
      "The classic trusted-by strip: a centered lede over a wrapping row of customer logos, each a colored symbol beside the company name. The wall quietly rotates through the set, and the row reflows from one line to several as the frame narrows.",
    domain: "marketing",
    level: "section",
    component: LogoCloudSection,
    code: SOCIAL_PROOF_SECTION_1_CODE,
    locked: true,
  },
  "social-proof-section-2": {
    title: "Logo marquee",
    description:
      "A minimal caption over an infinite, edge-masked logo strip that drifts on the shared marquee token. The set is rendered twice so the loop returns with no seam, it pauses on hover, and it stops entirely under prefers-reduced-motion.",
    domain: "marketing",
    level: "section",
    component: LogoMarqueeContent,
    code: SOCIAL_PROOF_SECTION_2_CODE,
    locked: true,
  },
  "social-proof-section-3": {
    title: "Bordered grid",
    description:
      "Logos seated in a concentric rounded frame, each in its own cell. The hairline gridlines are the frame's background showing through a one-pixel gap, so the rules stay crisp as the grid collapses from four columns to two.",
    domain: "marketing",
    level: "section",
    component: LogoGridSection,
    code: SOCIAL_PROOF_SECTION_3_CODE,
    locked: true,
  },
  "social-proof-section-4": {
    title: "Split with count",
    description:
      "An editorial split: a left-aligned lede with the headline count in tabular figures, beside a borderless two-up grid of logos as the visual. Folds to a single stacked column below the lg breakpoint.",
    domain: "marketing",
    level: "section",
    component: LogoSplitContent,
    code: SOCIAL_PROOF_SECTION_4_CODE,
    locked: true,
  },
  "social-proof-section-5": {
    title: "Bento with case study",
    description:
      "An asymmetric bento mixing text, logos, and image: a lede with a report link and a featured customer card (a headline stat over an image placeholder) book-end the rotating logo wall. Everything stacks to one column on a phone.",
    domain: "marketing",
    level: "section",
    component: LogoBentoContent,
    code: SOCIAL_PROOF_SECTION_5_CODE,
    locked: true,
  },
}
