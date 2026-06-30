import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import { BentoDemo, BentoSizesDemo } from "./demos"

export const metadata = { title: "Bento" }

export default function BentoDocsPage() {
  return (
    <>
      <DocHeader
        title="Bento"
        description="An asymmetric marketing grid of feature tiles. Named parts you assemble: a tinted icon, a balanced title, a muted description, and a bottom-aligned media region for a visual. Each tile claims a size (how many cells it spans) and a tone (the icon tint), and the grid collapses gracefully from six columns to one."
      />

      <ComponentPreview
        previewClassName="block"
        code={`<Bento>
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
</Bento>`}
      >
        <BentoDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="bento" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          className="mt-4"
          code={`import {
  Bento,
  BentoItem,
  BentoItemIcon,
  BentoItemTitle,
  BentoItemDescription,
  BentoItemImage,
  BentoItemMedia,
} from "@/components/ui/bento"

<Bento>
  <BentoItem size="md" tone="brand">
    <BentoItemIcon><Storefront /></BentoItemIcon>
    <BentoItemTitle>Store templates</BentoItemTitle>
    <BentoItemDescription>Crafted layouts that drive conversion.</BentoItemDescription>
    {/* A screenshot that peeks up from the bottom edge. */}
    <BentoItemImage src="/store.png" alt="Storefront template preview" />
  </BentoItem>
</Bento>`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Each <code className="font-mono text-sm">BentoItem</code> picks a{" "}
          <code className="font-mono text-sm">size</code>:{" "}
          <code className="font-mono text-sm">sm</code> (2 cols),{" "}
          <code className="font-mono text-sm">md</code> (3 cols),{" "}
          <code className="font-mono text-sm">lg</code> (4 cols),{" "}
          <code className="font-mono text-sm">feature</code> (4 cols × 2 rows, the anchor tile),
          and <code className="font-mono text-sm">full</code> (the whole row). Below the{" "}
          <code className="font-mono text-sm">lg</code> breakpoint the grid collapses to two
          columns, then one, so every tile stays legible on mobile.
        </p>
        <ComponentPreview
          previewClassName="block"
          code={`<Bento>
  <BentoItem size="feature" tone="brand">…</BentoItem>
  <BentoItem size="sm" tone="purple">…</BentoItem>
  <BentoItem size="sm" tone="teal">…</BentoItem>
  <BentoItem size="full" tone="orange">…</BentoItem>
</Bento>`}
        >
          <BentoSizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">Bento</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              The grid container: one column on mobile, two at{" "}
              <code className="font-mono text-sm">sm</code>, six at{" "}
              <code className="font-mono text-sm">lg</code>. Forwards native{" "}
              <code className="font-mono text-sm">&lt;div&gt;</code> props and{" "}
              <code className="font-mono text-sm">className</code>.
            </p>
          </div>
          <div>
            <h3 className="font-mono font-semibold">BentoItem</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              One tile. <code className="font-mono text-sm">size</code> is{" "}
              <code className="font-mono text-sm">&quot;sm&quot;</code> (default),{" "}
              <code className="font-mono text-sm">&quot;md&quot;</code>,{" "}
              <code className="font-mono text-sm">&quot;lg&quot;</code>,{" "}
              <code className="font-mono text-sm">&quot;feature&quot;</code>, or{" "}
              <code className="font-mono text-sm">&quot;full&quot;</code>;{" "}
              <code className="font-mono text-sm">tone</code> is{" "}
              <code className="font-mono text-sm">&quot;brand&quot;</code> (default),{" "}
              <code className="font-mono text-sm">&quot;purple&quot;</code>,{" "}
              <code className="font-mono text-sm">&quot;teal&quot;</code>,{" "}
              <code className="font-mono text-sm">&quot;orange&quot;</code>, or{" "}
              <code className="font-mono text-sm">&quot;pink&quot;</code> and tints the icon. Pass{" "}
              <code className="font-mono text-sm">asChild</code> to render the whole tile as a
              link.
            </p>
          </div>
          <div>
            <h3 className="font-mono font-semibold">
              BentoItemIcon · BentoItemTitle · BentoItemDescription
            </h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              The tinted icon chip (pass one Phosphor icon as the child, tone inherited from the
              tile), the balanced <code className="font-mono text-sm">&lt;h3&gt;</code> title, and
              the muted <code className="font-mono text-sm">&lt;p&gt;</code> description.
            </p>
          </div>
          <div>
            <h3 className="font-mono font-semibold">BentoItemImage</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              A screenshot that peeks up from the bottom of the tile and is clipped at its edge.
              Built on <code className="font-mono text-sm">next/image</code> (
              <code className="font-mono text-sm">fill</code>), so pass{" "}
              <code className="font-mono text-sm">src</code> and{" "}
              <code className="font-mono text-sm">alt</code>; its height follows the tile{" "}
              <code className="font-mono text-sm">size</code> and is overridable via{" "}
              <code className="font-mono text-sm">frameClassName</code>.
            </p>
          </div>
          <div>
            <h3 className="font-mono font-semibold">BentoItemMedia</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              A freeform bottom-aligned region (<code className="font-mono text-sm">mt-auto</code>)
              for anything that isn&apos;t a peeking image: a stat, a swatch row, or custom
              markup. Media edges line up across tiles in a row.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "How do I make the asymmetric layout?",
              a: "Give each BentoItem a `size`. The grid is six columns at the `lg` breakpoint, so `feature` (4×2), `sm` (2), `md` (3), `lg` (4), and `full` (6) tile together into a bento. The default arrangement pairs one `feature` tile with two `sm` tiles and a `full` closing band.",
            },
            {
              q: "Where do the visuals inside the tiles come from?",
              a: "You provide them. Use `BentoItemImage` for a screenshot that peeks up from the bottom edge (it wraps next/image, so pass src and alt and swap the placeholder for a real capture), or `BentoItemMedia` for any freeform bottom-aligned visual: a Chart, a Stat, or custom markup. Keep purely decorative visuals aria-hidden.",
            },
            {
              q: "Can a whole tile be a link?",
              a: "Yes. Pass `asChild` to `BentoItem` and render an `<a>` (or a Next `<Link>`) as its child; the tile keeps its hover lift and the link covers the full surface.",
            },
            {
              q: "What does tone change?",
              a: "Only the icon chip's tint. It maps to the theme's hue roles (brand, purple, teal, orange, pink) as a soft 10% background with a solid foreground, so it reads on every theme.",
            },
            {
              q: "Is it responsive?",
              a: "Yes. The grid is one column on mobile, two at `sm`, and six at `lg`, and every `size` resolves its spans only at `lg`, so tiles stack cleanly on small screens.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
