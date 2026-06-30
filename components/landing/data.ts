/**
 * Landing-page content. Pure data (no JSX, no icons) so it stays serializable and can be
 * imported by both server and client section components. Icons live in the section files.
 *
 * Numbers flagged `// TBD` are placeholders pulled from the live marketing site; swap them
 * for real figures before launch.
 */

/**
 * Top navigation, mirroring the original site order: Product, Solutions, Pricing,
 * Templates, University (Soon), Resources. Entries with `items` render as dropdown menus;
 * the rest are plain links. Hrefs point at anchors/docs where one exists, else placeholders.
 */
export interface NavEntry {
  label: string
  href?: string
  soon?: boolean
  items?: { label: string; href: string }[]
}

export const NAV: NavEntry[] = [
  {
    label: "Product",
    items: [
      { label: "Changelog", href: "#changelog" },
      { label: "Success Stories", href: "#testimonials" },
      { label: "FAQs", href: "#faq" },
      { label: "Roadmap", href: "#" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Marketing", href: "#" },
      { label: "Product Applications", href: "#" },
      { label: "Ecommerce", href: "#" },
      { label: "Mobile App", href: "#" },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "Templates", href: "/docs" },
  { label: "University", href: "#", soon: true },
  {
    label: "Resources",
    items: [
      { label: "Free Kit", href: "#" },
      { label: "Illustrations", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Partner Program", href: "#" },
    ],
  },
]

/** Hero feature checklist (6 items, 2 rows). Content mirrors the original hero. */
export const HERO_FEATURES = [
  "Build & ideate fast",
  "Light, Dark & Moonlight themes at 1 click",
  "+3,200 Components",
  "New updates every month",
  "Consistent responsive",
  "Never start from 0 again",
] as const

/** Top announcement bar content. */
export const ANNOUNCEMENT = {
  text: "Koala UI now available for Mobile Apps!",
  linkLabel: "Check it out",
  href: "#",
} as const

/** Feature deep-dive cards ("Never start from scratch"). `icon` resolved in feature-grid. */
export interface Feature {
  icon:
    | "react"
    | "accessibility"
    | "themes"
    | "density"
    | "source"
    | "typescript"
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: "react",
    title: "React 19 + Tailwind v4",
    description:
      "Built on the modern stack: Next.js App Router, Tailwind v4 tokens, and tailwind-variants recipes. No legacy patterns to unlearn.",
  },
  {
    icon: "accessibility",
    title: "Accessible by default",
    description:
      "Behavior, focus, and keyboard support come from Radix primitives, so every component ships with a11y handled, not bolted on.",
  },
  {
    icon: "themes",
    title: "3 themes, 8 accents",
    description:
      "Light, dark, and moonlight themes plus eight accent colors, all driven by semantic CSS variables. Re-theme the whole system from one token.",
  },
  {
    icon: "density",
    title: "Comfortable and compact",
    description:
      "A single density knob retunes padding, gaps, and control heights, so the same components serve marketing pages and dense app shells.",
  },
  {
    icon: "source",
    title: "You own the source",
    description:
      "The CLI copies real component source into your project. No black-box package, no runtime dependency you cannot edit.",
  },
  {
    icon: "typescript",
    title: "Typed, end to end",
    description:
      "Every component is written in TypeScript with fully typed variants and props, so your editor guides you as you compose.",
  },
]

/** Quality / library metrics band. */
export interface Metric {
  value: string
  label: string
}

export const METRICS: Metric[] = [
  { value: "60+", label: "React components" },
  { value: "3", label: "Themes" },
  { value: "8", label: "Accent colors" },
  { value: "100%", label: "TypeScript" },
]

/** Social-proof testimonials. `avatar` omitted on purpose: the card uses initials. */
export interface Testimonial {
  quote: string
  name: string
  title: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We replaced our half-finished in-house kit with Koala UI in a weekend. Everything just felt consistent, down to the focus rings.",
    name: "Alex Rivera",
    title: "Founder, Lumen",
  },
  {
    quote:
      "Owning the source is the killer feature. We copy a component in, tweak the recipe, and it still matches the rest of the system.",
    name: "Priya Nair",
    title: "Staff Engineer, Northwind",
  },
  {
    quote:
      "The theming is genuinely one click. Our dark mode shipped the same afternoon we installed it.",
    name: "Tomas Berg",
    title: "Design Engineer, Field",
  },
  {
    quote:
      "Radix under the hood means I stopped worrying about keyboard and screen-reader bugs. They are just handled.",
    name: "Mei Lin",
    title: "Frontend Lead, Cadence",
  },
  {
    quote:
      "It looks finished out of the box. The polish on hover and press states is what sold our designers.",
    name: "Daniel Okafor",
    title: "Co-founder, Relay",
  },
]

/**
 * Hero social proof: three logo-led testimonials that sit directly under the hero
 * (logo on top, bold headline, supporting body, author byline). `brand` names an entry in
 * `PLACEHOLDER_BRANDS`, rendered as a colored logo lockup in `TestimonialLogo`.
 */
export interface HeroTestimonial {
  brand: string
  headline: string
  body: string
  name: string
  title: string
}

export const HERO_TESTIMONIALS: HeroTestimonial[] = [
  {
    brand: "Halcyon",
    headline: "The UI kit looks fantastic, incredibly extensive.",
    body: "Especially impressed that it's all there from day one, so you get a huge head start in building your next product.",
    name: "Liam McCabe",
    title: "Founder, Halcyon",
  },
  {
    brand: "Forge",
    headline: "We've built an entire app in 1 week.",
    body: "Thanks to all the +3,200 components and pre-made sections, we've been able to complete a 120-screen project in 1 week.",
    name: "Jordi Espinosa",
    title: "Founder, Forge",
  },
  {
    brand: "Quanta",
    headline: "There's simply no comparison.",
    body: "Dark and cream mode, top-notch components, and an abundance of templates. It's every designer's dream, all in one place.",
    name: "Carlos Gerónimo",
    title: "Product Lead, Quanta",
  },
]

/** Social-proof headline counts. */
export const SOCIAL_PROOF = {
  builders: 620, // TBD
  rating: "5.0", // TBD
} as const

/** Pricing tiers: Free, Figma, and the premium Figma + React bundle. */
export interface PricingTier {
  id: string
  name: string
  price: string
  cadence: string
  description: string
  cta: { label: string; href: string }
  features: string[]
  featured?: boolean
  badge?: string
}

export const PRICING: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    price: "€0",
    cadence: "forever",
    description: "The full React component library, free to use in any project.",
    cta: { label: "Start for free", href: "/docs" },
    features: [
      "60+ React components",
      "Design tokens and 3 themes",
      "CLI access (free tier)",
      "Lifetime updates",
      "1 developer",
    ],
  },
  {
    id: "figma",
    name: "Figma",
    price: "€124.99",
    cadence: "one-time",
    description: "The complete Figma design system that mirrors the code.",
    cta: { label: "Get the Figma kit", href: "#" },
    features: [
      "Full Figma design system",
      "4 themes and modes",
      "200+ marketing sections",
      "Auto Layout 5.0",
      "Figma variables",
    ],
  },
  {
    id: "figma-react",
    name: "Figma + React",
    price: "€199.99", // TBD
    cadence: "one-time",
    description: "Everything in Figma plus the premium React library and PRO blocks.",
    cta: { label: "Get Figma + React", href: "#" },
    featured: true,
    badge: "Best value",
    features: [
      "Everything in Figma",
      "PRO React sections and templates",
      "Token-gated CLI access",
      "Priority updates",
      "Private Discord community",
    ],
  },
]

/** FAQ entries, rewritten for the React + CLI product. */
export interface FaqItem {
  question: string
  answer: string
}

export const FAQ: FaqItem[] = [
  {
    question: "How is Koala UI delivered?",
    answer:
      "Through a CLI. Running npx koalaui add <component> copies real, readable source into your project. You own the code from that moment, so you can edit any recipe without fighting a package.",
  },
  {
    question: "Do I need a license or token?",
    answer:
      "The free tier needs no authentication. The PRO tier (premium marketing sections and templates) is gated by a GitHub token with read access to the private repository.",
  },
  {
    question: "What is the difference between Free and PRO?",
    answer:
      "Free gives you the entire component library, design tokens, and three themes. PRO adds composed marketing sections, full page templates, and priority updates.",
  },
  {
    question: "Which frameworks does it support?",
    answer:
      "React 19 with the Next.js App Router and Tailwind CSS v4. Components rely on Radix primitives and tailwind-variants, with a @/* path alias.",
  },
  {
    question: "How many themes are there?",
    answer:
      "Three themes (light, dark, and moonlight) plus eight accent colors. Everything is driven by semantic CSS variables, so switching is a single token change.",
  },
  {
    question: "How often is it updated?",
    answer:
      "New components and refinements ship every month. Updates are free for the lifetime of your plan.",
  },
  {
    question: "Is it a one-time payment or a subscription?",
    answer:
      "Pay once and use it forever. There is no recurring subscription for the design system.",
  },
  {
    question: "Do you offer a student discount?",
    answer:
      "Yes. Students get 50% off with a valid academic email.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "There is a 14-day money-back guarantee. If it is not the right fit, request a refund within two weeks.",
  },
]

/** Changelog / "New month, new updates". Dates and notes are placeholders. */
export interface ChangelogEntry {
  version: string
  date: string
  title: string
  description: string
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v1.0",
    date: "Dec 13, 2025", // TBD
    title: "Koala UI for React",
    description:
      "The full React library lands: 60+ components, three themes, eight accents, and the koalaui CLI.",
  },
  {
    version: "v0.9",
    date: "Nov 9, 2025", // TBD
    title: "Data display family",
    description:
      "Charts, data tables, stats, and rankings join the library, all dependency-light and themeable.",
  },
  {
    version: "v0.8",
    date: "Oct 14, 2025", // TBD
    title: "Forms blocks",
    description:
      "Composed form blocks for auth, contact, payment, and more, each with built-in state and success flows.",
  },
  {
    version: "v0.7",
    date: "Sep 9, 2025", // TBD
    title: "Accessibility pass",
    description:
      "A full sweep across every component for keyboard, focus, and screen-reader behavior on top of Radix.",
  },
]

/** Footer link columns. */
export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/docs/components/button" },
      { label: "Foundations", href: "/docs/foundations/theming" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Architecture", href: "/docs/architecture" },
      { label: "Patterns", href: "/docs/patterns" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
      { label: "License", href: "#" },
    ],
  },
] as const
