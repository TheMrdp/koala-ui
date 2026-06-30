import type { CSSProperties } from "react"
import { Megaphone, Sparkle, ArrowRight, Confetti, Rocket, Lightning } from "@phosphor-icons/react/ssr"
import VE from "country-flag-icons/react/3x2/VE"

import {
  Banner,
  BannerIcon,
  BannerContent,
  BannerAction,
  BannerOrnament,
} from "@/components/ui/banner"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { DismissibleBannerDemo } from "./demos"

export const metadata = {
  title: "Banner",
}

export default function BannerDocsPage() {
  return (
    <>
      <DocHeader
        title="Banner"
        description="A full-bleed announcement bar for promos, release notes, and site-wide notices. Soft tones tint the background, message, icon, and action from one semantic token, so the whole bar reads as a single hue and re-themes across every theme. Sits above the navbar or atop any page region."
      />

      <ComponentPreview
        previewClassName="flex-col items-stretch gap-3 p-6"
        code={`<Banner variant="purple">
  <BannerIcon>
    <Megaphone />
  </BannerIcon>
  <BannerContent>Koala UI now available for Mobile Apps!</BannerContent>
  <BannerAction href="#">
    Check it out
    <ArrowRight />
  </BannerAction>
</Banner>`}
      >
        <Banner variant="purple" className="rounded-lg">
          <BannerIcon>
            <Megaphone />
          </BannerIcon>
          <BannerContent>Koala UI now available for Mobile Apps!</BannerContent>
          <BannerAction href="#">
            Check it out
            <ArrowRight />
          </BannerAction>
        </Banner>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="banner" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Banner,
  BannerIcon,
  BannerContent,
  BannerAction,
} from "@/components/ui/banner"

export function Example() {
  return (
    <Banner variant="purple" dismissible>
      <BannerIcon>
        <Megaphone />
      </BannerIcon>
      <BannerContent>Koala UI now available for Mobile Apps!</BannerContent>
      <BannerAction href="#">Check it out</BannerAction>
    </Banner>
  )
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          Soft tones tint the background from a single semantic token and color the icon, action,
          and message to match. The message takes a deep, tone-tinted ink (a dark blue, dark
          purple, ...) on light themes and lifts to a bright tint on dark ones, so it stays
          readable while the icon and action keep the pure hue. Every tone re-themes across light,
          dark, cream, and moonlight.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-3 p-6"
          code={`<Banner variant="brand">…</Banner>
<Banner variant="purple">…</Banner>
<Banner variant="info">…</Banner>
<Banner variant="success">…</Banner>
<Banner variant="warning">…</Banner>
<Banner variant="default">…</Banner>`}
        >
          <Banner variant="brand" className="rounded-lg">
            <BannerIcon>
              <Rocket />
            </BannerIcon>
            <BannerContent>Koala UI v2.0 is here.</BannerContent>
            <BannerAction href="#">Read the release notes</BannerAction>
          </Banner>
          <Banner variant="purple" className="rounded-lg">
            <BannerIcon>
              <Sparkle />
            </BannerIcon>
            <BannerContent>Introducing the new AI components.</BannerContent>
            <BannerAction href="#">Explore</BannerAction>
          </Banner>
          <Banner variant="info" className="rounded-lg">
            <BannerIcon>
              <Lightning />
            </BannerIcon>
            <BannerContent>Scheduled maintenance this Sunday at 02:00 UTC.</BannerContent>
            <BannerAction href="#">Status page</BannerAction>
          </Banner>
          <Banner variant="success" className="rounded-lg">
            <BannerIcon>
              <Confetti />
            </BannerIcon>
            <BannerContent>Your account has been upgraded to Pro.</BannerContent>
            <BannerAction href="#">View benefits</BannerAction>
          </Banner>
          <Banner variant="warning" className="rounded-lg">
            <BannerIcon>
              <Lightning />
            </BannerIcon>
            <BannerContent>Your trial ends in 3 days.</BannerContent>
            <BannerAction href="#">Upgrade now</BannerAction>
          </Banner>
          <Banner variant="default" className="rounded-lg">
            <BannerIcon>
              <Megaphone />
            </BannerIcon>
            <BannerContent>We refreshed our docs. Take a look around.</BannerContent>
            <BannerAction href="#">What&apos;s new</BannerAction>
          </Banner>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Solid">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">appearance=&quot;solid&quot;</code> for a
          filled bar. Solid is designed for two theme-stable surfaces: the{" "}
          <code className="font-mono text-sm">default</code> inverse bar (flips with the theme)
          and the <code className="font-mono text-sm">brand</code> accent bar. The soft tones
          stay tinted because the hue tokens shift lightness per theme.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-3 p-6"
          code={`<Banner appearance="solid" variant="default">
  <BannerIcon>
    <Megaphone />
  </BannerIcon>
  <BannerContent>Black Friday: 40% off all plans this week.</BannerContent>
  <BannerAction href="#">Get the deal</BannerAction>
</Banner>

<Banner appearance="solid" variant="brand">
  <BannerIcon>
    <Rocket />
  </BannerIcon>
  <BannerContent>Koala UI v2.0 is live.</BannerContent>
  <BannerAction href="#">See what's new</BannerAction>
</Banner>`}
        >
          <Banner appearance="solid" variant="default" className="rounded-lg">
            <BannerIcon>
              <Megaphone />
            </BannerIcon>
            <BannerContent>Black Friday: 40% off all plans this week.</BannerContent>
            <BannerAction href="#">
              Get the deal
              <ArrowRight />
            </BannerAction>
          </Banner>
          <Banner appearance="solid" variant="brand" className="rounded-lg">
            <BannerIcon>
              <Rocket />
            </BannerIcon>
            <BannerContent>Koala UI v2.0 is live.</BannerContent>
            <BannerAction href="#">
              See what&apos;s new
              <ArrowRight />
            </BannerAction>
          </Banner>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Festive">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">appearance=&quot;festive&quot;</code> for a
          playful celebration bar: a multi-stop gradient drifts slowly behind white text, the
          natural home for launches, milestones, and holidays. The drift is an ambient,
          reduced-motion-aware loop, and it ignores the tone{" "}
          <code className="font-mono text-sm">variant</code>. Theme it by overriding three CSS
          variables, <code className="font-mono text-sm">--banner-festive-from</code>,{" "}
          <code className="font-mono text-sm">--banner-festive-via</code>, and{" "}
          <code className="font-mono text-sm">--banner-festive-to</code>, with brand or flag colors.
          Keep the stops deep and saturated so the white text stays legible across every theme.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-3 p-6"
          code={`<Banner appearance="festive">
  <BannerIcon>
    <Confetti />
  </BannerIcon>
  <BannerContent>We just shipped v2.0. Thanks for celebrating with us.</BannerContent>
  <BannerAction href="#">See what's new</BannerAction>
</Banner>

// Theme the gradient with any palette (here, a flag-inspired set)
<Banner
  appearance="festive"
  style={{
    "--banner-festive-from": "oklch(0.66 0.14 85)",
    "--banner-festive-via": "oklch(0.45 0.17 252)",
    "--banner-festive-to": "oklch(0.52 0.21 25)",
  }}
>
  <BannerIcon>
    <Sparkle />
  </BannerIcon>
  <BannerContent>Drive the bar with your own colors.</BannerContent>
  <BannerAction href="#">Join the celebration</BannerAction>
</Banner>`}
        >
          <Banner appearance="festive" className="rounded-lg">
            <BannerIcon>
              <Confetti />
            </BannerIcon>
            <BannerContent>We just shipped v2.0. Thanks for celebrating with us.</BannerContent>
            <BannerAction href="#">
              See what&apos;s new
              <ArrowRight />
            </BannerAction>
          </Banner>
          <Banner
            appearance="festive"
            className="rounded-lg"
            style={
              {
                "--banner-festive-from": "oklch(0.66 0.14 85)",
                "--banner-festive-via": "oklch(0.45 0.17 252)",
                "--banner-festive-to": "oklch(0.52 0.21 25)",
              } as CSSProperties
            }
          >
            <BannerIcon>
              <Sparkle />
            </BannerIcon>
            <BannerContent>Drive the bar with your own colors.</BannerContent>
            <BannerAction href="#">
              Join the celebration
              <ArrowRight />
            </BannerAction>
          </Banner>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Interactive (confetti)">
        <p className="mt-4 text-pretty text-muted-foreground">
          Add <code className="font-mono text-sm">confetti</code> to a festive bar to make it
          playful: it bursts once on mount and again on every click, and the icon gives a little
          pop. The pieces are themed by the <code className="font-mono text-sm">--banner-confetti-*</code>{" "}
          tokens, which derive from the festive palette, so they re-tint with it (set flag colors
          and both the gradient and the confetti follow). It is decorative and fully honors
          reduced-motion. Click the bars below.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-3 p-6"
          code={`<Banner appearance="festive" confetti>
  <BannerIcon>
    <Confetti />
  </BannerIcon>
  <BannerContent>We just hit 10,000 stars. Tap to celebrate!</BannerContent>
  <BannerAction href="#">Star the repo</BannerAction>
</Banner>

// Same interaction, themed with a flag-inspired palette
<Banner
  appearance="festive"
  confetti
  style={{
    "--banner-festive-from": "oklch(0.66 0.14 85)",
    "--banner-festive-via": "oklch(0.45 0.17 252)",
    "--banner-festive-to": "oklch(0.52 0.21 25)",
  }}
>
  <BannerIcon>
    <Confetti />
  </BannerIcon>
  <BannerContent>Drive the gradient and the confetti with your own colors.</BannerContent>
  <BannerAction href="#">Join in</BannerAction>
</Banner>`}
        >
          <Banner appearance="festive" confetti className="rounded-lg">
            <BannerIcon>
              <Confetti />
            </BannerIcon>
            <BannerContent>We just hit 10,000 stars. Tap to celebrate!</BannerContent>
            <BannerAction href="#">
              Star the repo
              <ArrowRight />
            </BannerAction>
          </Banner>
          <Banner
            appearance="festive"
            confetti
            className="rounded-lg"
            style={
              {
                "--banner-festive-from": "oklch(0.66 0.14 85)",
                "--banner-festive-via": "oklch(0.45 0.17 252)",
                "--banner-festive-to": "oklch(0.52 0.21 25)",
              } as CSSProperties
            }
          >
            <BannerIcon>
              <Confetti />
            </BannerIcon>
            <BannerContent>Drive the gradient and the confetti with your own colors.</BannerContent>
            <BannerAction href="#">
              Join in
              <ArrowRight />
            </BannerAction>
          </Banner>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Ornaments">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drop a <code className="font-mono text-sm">BannerOrnament</code> in to peek a decorative
          flag, mascot, or emoji in from an edge. It clips to the bar and sits behind the message,
          tilting away from its side. Below, two Venezuela flags (rounded 16px, not circular) peek
          from the corners of a flat solid bar, with the confetti tinted to the flag&apos;s yellow
          and red. The flag itself is any element you like, sized and rounded however you want.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-6"
          code={`import VE from "country-flag-icons/react/3x2/VE"

<Banner
  appearance="solid"
  variant="brand"
  confetti
  style={{
    backgroundColor: "oklch(0.45 0.18 258)",
    "--banner-festive-via": "oklch(0.78 0.16 92)", // flag yellow → confetti
    "--banner-festive-to": "oklch(0.55 0.2 27)", // flag red → confetti
  }}
>
  <BannerOrnament side="left">
    <span className="block overflow-hidden rounded-lg ring-1 ring-black/10 dark:ring-white/10">
      <VE className="block h-14 w-auto max-w-none" />
    </span>
  </BannerOrnament>
  <BannerIcon>
    <Confetti />
  </BannerIcon>
  <BannerContent>We're celebrating with Venezuela today.</BannerContent>
  <Button size="sm" variant="secondary" asChild>
    <a href="#">Get full access</a>
  </Button>
  <BannerOrnament side="right">
    <span className="block overflow-hidden rounded-lg ring-1 ring-black/10 dark:ring-white/10">
      <VE className="block h-14 w-auto max-w-none" />
    </span>
  </BannerOrnament>
</Banner>`}
        >
          <Banner
            appearance="solid"
            variant="brand"
            confetti
            className="rounded-lg"
            style={
              {
                backgroundColor: "oklch(0.45 0.18 258)",
                "--banner-festive-via": "oklch(0.78 0.16 92)",
                "--banner-festive-to": "oklch(0.55 0.2 27)",
              } as CSSProperties
            }
          >
            <BannerOrnament side="left">
              <span className="block overflow-hidden rounded-lg ring-1 ring-black/10 dark:ring-white/10">
                <VE className="block h-14 w-auto max-w-none" />
              </span>
            </BannerOrnament>
            <BannerIcon>
              <Confetti />
            </BannerIcon>
            <BannerContent>We&apos;re celebrating with Venezuela today.</BannerContent>
            <Button size="sm" variant="secondary" asChild>
              <a href="#">Get full access</a>
            </Button>
            <BannerOrnament side="right">
              <span className="block overflow-hidden rounded-lg ring-1 ring-black/10 dark:ring-white/10">
                <VE className="block h-14 w-auto max-w-none" />
              </span>
            </BannerOrnament>
          </Banner>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Alignment">
        <p className="mt-4 text-pretty text-muted-foreground">
          The default <code className="font-mono text-sm">align=&quot;center&quot;</code>{" "}
          centers the message. Switch to{" "}
          <code className="font-mono text-sm">align=&quot;between&quot;</code> to pin the
          message left and the action right, the natural home for a{" "}
          <code className="font-mono text-sm">Button</code> CTA.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-3 p-6"
          code={`<Banner align="between" variant="info">
  <BannerIcon>
    <Lightning />
  </BannerIcon>
  <BannerContent>You have 14 days left in your free trial.</BannerContent>
  <Button size="sm">Upgrade</Button>
</Banner>

<Banner align="between" appearance="solid" variant="brand">
  <BannerIcon>
    <Sparkle />
  </BannerIcon>
  <BannerContent>Try the new AI components, free during beta.</BannerContent>
  <Button size="sm" variant="secondary" asChild>
    <a href="#">Get a demo</a>
  </Button>
</Banner>`}
        >
          <Banner align="between" variant="info" className="rounded-lg">
            <BannerIcon>
              <Lightning />
            </BannerIcon>
            <BannerContent>You have 14 days left in your free trial.</BannerContent>
            <Button size="sm" asChild>
              <a href="#">Upgrade</a>
            </Button>
          </Banner>
          <Banner align="between" appearance="solid" variant="brand" className="rounded-lg">
            <BannerIcon>
              <Sparkle />
            </BannerIcon>
            <BannerContent>Try the new AI components, free during beta.</BannerContent>
            <Button size="sm" variant="secondary" asChild>
              <a href="#">Get a demo</a>
            </Button>
          </Banner>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Dismissible">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">dismissible</code> to render a trailing
          close button. Uncontrolled by default (the banner hides itself); pass{" "}
          <code className="font-mono text-sm">open</code> /{" "}
          <code className="font-mono text-sm">onOpenChange</code> to control it, and always
          give a descriptive <code className="font-mono text-sm">dismissLabel</code>.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-6"
          code={`<Banner
  variant="purple"
  dismissible
  dismissLabel="Dismiss announcement"
>
  <BannerIcon>
    <Megaphone />
  </BannerIcon>
  <BannerContent>Koala UI now available for Mobile Apps!</BannerContent>
  <BannerAction href="#">
    Check it out
    <ArrowRight />
  </BannerAction>
</Banner>`}
        >
          <DismissibleBannerDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="As child action">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use <code className="font-mono text-sm">asChild</code> on{" "}
          <code className="font-mono text-sm">BannerAction</code> to render the link styles
          onto a framework link (e.g. Next.js{" "}
          <code className="font-mono text-sm">&lt;Link&gt;</code>) via Radix Slot, keeping
          client-side navigation.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-6"
          code={`import Link from "next/link"

<Banner variant="teal">
  <BannerIcon>
    <Sparkle />
  </BannerIcon>
  <BannerContent>Read the 2.0 changelog.</BannerContent>
  <BannerAction asChild>
    <Link href="/changelog">
      See what's new
      <ArrowRight />
    </Link>
  </BannerAction>
</Banner>`}
        >
          <Banner variant="teal" className="rounded-lg">
            <BannerIcon>
              <Sparkle />
            </BannerIcon>
            <BannerContent>Read the 2.0 changelog.</BannerContent>
            <BannerAction asChild>
              <a href="#">
                See what&apos;s new
                <ArrowRight />
              </a>
            </BannerAction>
          </Banner>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Prop</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Default</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="[&_td]:px-4 [&_td]:py-2 [&_tr]:border-t [&_tr]:border-border">
              <tr>
                <td className="font-mono">variant</td>
                <td className="font-mono text-muted-foreground">
                  default | brand | purple | pink | teal | orange | info | success | warning |
                  destructive
                </td>
                <td className="font-mono text-muted-foreground">default</td>
                <td className="text-muted-foreground">Tone of the bar.</td>
              </tr>
              <tr>
                <td className="font-mono">appearance</td>
                <td className="font-mono text-muted-foreground">soft | solid | festive</td>
                <td className="font-mono text-muted-foreground">soft</td>
                <td className="text-muted-foreground">
                  Fill style. solid supports default (inverse) and brand; festive is a drifting
                  gradient bar themed by the --banner-festive-* vars.
                </td>
              </tr>
              <tr>
                <td className="font-mono">align</td>
                <td className="font-mono text-muted-foreground">center | between</td>
                <td className="font-mono text-muted-foreground">center</td>
                <td className="text-muted-foreground">
                  Centered message, or message-left / action-right.
                </td>
              </tr>
              <tr>
                <td className="font-mono">dismissible</td>
                <td className="font-mono text-muted-foreground">boolean</td>
                <td className="font-mono text-muted-foreground">false</td>
                <td className="text-muted-foreground">Render a trailing close button.</td>
              </tr>
              <tr>
                <td className="font-mono">confetti</td>
                <td className="font-mono text-muted-foreground">boolean</td>
                <td className="font-mono text-muted-foreground">false</td>
                <td className="text-muted-foreground">
                  Burst confetti on mount and on click (pairs with festive); honors reduced-motion.
                </td>
              </tr>
              <tr>
                <td className="font-mono">open</td>
                <td className="font-mono text-muted-foreground">boolean</td>
                <td className="font-mono text-muted-foreground">-</td>
                <td className="text-muted-foreground">Controlled visibility.</td>
              </tr>
              <tr>
                <td className="font-mono">defaultOpen</td>
                <td className="font-mono text-muted-foreground">boolean</td>
                <td className="font-mono text-muted-foreground">true</td>
                <td className="text-muted-foreground">Uncontrolled initial visibility.</td>
              </tr>
              <tr>
                <td className="font-mono">onOpenChange</td>
                <td className="font-mono text-muted-foreground">{`(open: boolean) => void`}</td>
                <td className="font-mono text-muted-foreground">-</td>
                <td className="text-muted-foreground">Fires when dismissed.</td>
              </tr>
              <tr>
                <td className="font-mono">dismissLabel</td>
                <td className="font-mono text-muted-foreground">string</td>
                <td className="font-mono text-muted-foreground">Dismiss</td>
                <td className="text-muted-foreground">Accessible label for the close button.</td>
              </tr>
              <tr>
                <td className="font-mono">className</td>
                <td className="font-mono text-muted-foreground">string</td>
                <td className="font-mono text-muted-foreground">-</td>
                <td className="text-muted-foreground">Merged onto the root, last.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-pretty text-muted-foreground">
          Parts: <code className="font-mono text-sm">Banner</code>,{" "}
          <code className="font-mono text-sm">BannerIcon</code>,{" "}
          <code className="font-mono text-sm">BannerContent</code>,{" "}
          <code className="font-mono text-sm">BannerAction</code> (accepts{" "}
          <code className="font-mono text-sm">asChild</code>), and{" "}
          <code className="font-mono text-sm">BannerOrnament</code> (decorative edge peek, takes{" "}
          <code className="font-mono text-sm">side</code>). Each forwards its native props
          and merges <code className="font-mono text-sm">className</code> last.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I use a Banner instead of an Alert?",
              a: "Banner is a site-wide, full-bleed announcement bar - promos, release notes, maintenance notices - typically pinned above the navbar. Alert is an inline, in-page status message scoped to a section or form. If it spans the whole viewport width and speaks for the whole site, it's a Banner.",
            },
            {
              q: "How do I keep a banner dismissed across reloads?",
              a: "Control it: render the banner with open/onOpenChange, persist the dismissed state yourself (localStorage, a cookie, or user settings), and read that value to set the initial open. The built-in uncontrolled mode only remembers within the current page session.",
            },
            {
              q: "Will the tones adapt to dark and the other themes?",
              a: "Yes. Every tone tints from a semantic token (bg-<role>/10) and colors the icon/action from the same role, so banners re-theme automatically across light, dark, cream, and moonlight. The message text stays foreground for contrast.",
            },
            {
              q: "Can the action be a client-side route?",
              a: "Yes: set asChild on BannerAction and pass a single link element (a Next.js <Link>, for instance). The action renders its styles onto that element via Radix Slot, so you keep client-side navigation and valid markup.",
            },
            {
              q: "How do I theme the festive gradient (brand or flag colors)?",
              a: "Override --banner-festive-from, --banner-festive-via, and --banner-festive-to on the banner (a className or an inline style), or globally on a parent for a consistent palette. The defaults are a deep violet/fuchsia/coral set chosen so white text holds contrast across all four themes; keep your custom stops similarly deep and saturated. The festive bar ignores the tone variant, so the gradient is the only color source.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
