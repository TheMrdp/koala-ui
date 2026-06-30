import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import { PricingComparisonDemo, PricingComparisonPlainDemo } from "./demos"

export const metadata = { title: "Pricing Comparison" }

export default function PricingComparisonDocsPage() {
  return (
    <>
      <DocHeader
        title="Pricing Comparison"
        description="A feature-by-feature pricing matrix: rows are features, columns are plans, and each cell is a check, a minus, or a value. The companion to the card-based Pricing table for when buyers need to compare line by line. Group rows into labelled sections, highlight the recommended plan as a tinted column, and hang a tooltip off any row for the fine print."
      />

      <ComponentPreview
        previewClassName="block"
        code={`<PricingComparison featured={1}>
  <PricingComparisonHeader label="Compare plans">
    <PricingComparisonPlan name="Starter" price="$0" period="/mo">
      <Button variant="outline" size="sm">Get started</Button>
    </PricingComparisonPlan>
    <PricingComparisonPlan
      name="Pro"
      price="$29"
      period="/mo"
      badge={<Badge variant="orange" dot pill size="sm">Popular</Badge>}
    >
      <Button size="sm">Start free trial</Button>
    </PricingComparisonPlan>
    <PricingComparisonPlan name="Enterprise" price="Custom">
      <Button variant="outline" size="sm">Contact sales</Button>
    </PricingComparisonPlan>
  </PricingComparisonHeader>

  <PricingComparisonSection title="Projects & team">
    <PricingComparisonRow label="Projects">
      <PricingComparisonCell>5</PricingComparisonCell>
      <PricingComparisonCell>Unlimited</PricingComparisonCell>
      <PricingComparisonCell>Unlimited</PricingComparisonCell>
    </PricingComparisonRow>
    <PricingComparisonRow label="Team members" hint="A seat is one active member per month.">
      <PricingComparisonCell>3</PricingComparisonCell>
      <PricingComparisonCell>Unlimited</PricingComparisonCell>
      <PricingComparisonCell>Unlimited</PricingComparisonCell>
    </PricingComparisonRow>
    <PricingComparisonRow label="Storage" hint="Pooled across the whole team, not per seat.">
      <PricingComparisonCell>1 GB</PricingComparisonCell>
      <PricingComparisonCell>100 GB</PricingComparisonCell>
      <PricingComparisonCell>1 TB</PricingComparisonCell>
    </PricingComparisonRow>
  </PricingComparisonSection>

  <PricingComparisonSection title="Support & security">
    <PricingComparisonRow label="Community support">
      <PricingComparisonCell included />
      <PricingComparisonCell included />
      <PricingComparisonCell included />
    </PricingComparisonRow>
    <PricingComparisonRow label="Priority support" hint="One-hour response on business days.">
      <PricingComparisonCell included={false} />
      <PricingComparisonCell included />
      <PricingComparisonCell included />
    </PricingComparisonRow>
    <PricingComparisonRow label="SSO & SAML">
      <PricingComparisonCell included={false} />
      <PricingComparisonCell included={false} />
      <PricingComparisonCell included />
    </PricingComparisonRow>
    <PricingComparisonRow label="Dedicated manager">
      <PricingComparisonCell included={false} />
      <PricingComparisonCell included={false} />
      <PricingComparisonCell included />
    </PricingComparisonRow>
  </PricingComparisonSection>
</PricingComparison>`}
      >
        <PricingComparisonDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation
          component="pricing-comparison"
          dependencies="npm install @phosphor-icons/react tailwind-variants tailwind-merge"
        />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          className="mt-4"
          code={`import {
  PricingComparison,
  PricingComparisonHeader,
  PricingComparisonPlan,
  PricingComparisonSection,
  PricingComparisonRow,
  PricingComparisonCell,
} from "@/components/ui/pricing-comparison"
import { Button } from "@/components/ui/button"

// \`featured\` is the 0-based index of the highlighted plan column.
<PricingComparison featured={1}>
  <PricingComparisonHeader label="Compare plans">
    <PricingComparisonPlan name="Starter" price="$0" period="/mo">
      <Button variant="outline" size="sm">Get started</Button>
    </PricingComparisonPlan>
    <PricingComparisonPlan name="Pro" price="$29" period="/mo" badge={<Badge variant="orange" dot pill size="sm">Popular</Badge>}>
      <Button size="sm">Start free trial</Button>
    </PricingComparisonPlan>
  </PricingComparisonHeader>

  <PricingComparisonSection title="Projects & team">
    <PricingComparisonRow label="Projects">
      <PricingComparisonCell>5</PricingComparisonCell>
      <PricingComparisonCell>Unlimited</PricingComparisonCell>
    </PricingComparisonRow>
    <PricingComparisonRow label="Priority support" hint="One-hour response on business days.">
      <PricingComparisonCell included={false} />
      <PricingComparisonCell included />
    </PricingComparisonRow>
  </PricingComparisonSection>
</PricingComparison>`}
        />
      </DocSection>

      <DocSection title="Cell states">
        <p className="mt-4 text-pretty text-muted-foreground">
          A <code className="font-mono text-sm">PricingComparisonCell</code> is one of three
          things. Pass a value as children for a literal like{" "}
          <code className="font-mono text-sm">100 GB</code> or{" "}
          <code className="font-mono text-sm">Unlimited</code> (rendered{" "}
          <code className="font-mono text-sm">tabular-nums</code> so columns align). With no
          children it draws a success check, or a muted minus when{" "}
          <code className="font-mono text-sm">included={"{false}"}</code>. Every glyph cell also
          carries an SR-only &quot;Included&quot; / &quot;Not included&quot; label.
        </p>
        <ComponentPreview
          previewClassName="block"
          code={`<PricingComparison>
  <PricingComparisonHeader>
    <PricingComparisonPlan name="Monthly" price="$29" period="/mo">
      <Button variant="outline" size="sm">Choose monthly</Button>
    </PricingComparisonPlan>
    <PricingComparisonPlan name="Annual" price="$23" period="/mo">
      <Button size="sm">Choose annual</Button>
    </PricingComparisonPlan>
  </PricingComparisonHeader>

  <PricingComparisonSection>
    <PricingComparisonRow label="Billed">
      <PricingComparisonCell>Monthly</PricingComparisonCell>
      <PricingComparisonCell>Yearly</PricingComparisonCell>
    </PricingComparisonRow>
    <PricingComparisonRow label="Effective price" hint="Annual is billed once at $276/yr.">
      <PricingComparisonCell>$348/yr</PricingComparisonCell>
      <PricingComparisonCell>$276/yr</PricingComparisonCell>
    </PricingComparisonRow>
    <PricingComparisonRow label="Cancel anytime">
      <PricingComparisonCell included />
      <PricingComparisonCell included />
    </PricingComparisonRow>
    <PricingComparisonRow label="Price lock">
      <PricingComparisonCell included={false} />
      <PricingComparisonCell included />
    </PricingComparisonRow>
  </PricingComparisonSection>
</PricingComparison>`}
        >
          <PricingComparisonPlainDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Row hints">
        <p className="mt-4 text-pretty text-muted-foreground">
          Add a <code className="font-mono text-sm">hint</code> to any{" "}
          <code className="font-mono text-sm">PricingComparisonRow</code> to append an info glyph
          beside the feature name. It reveals the detail in a tooltip on hover or focus, so terse
          row labels stay scannable while the caveats and limits stay one hover away. Set{" "}
          <code className="font-mono text-sm">hintLabel</code> to name the trigger for assistive
          tech (defaults to <code className="font-mono text-sm">&quot;More information&quot;</code>).
        </p>
        <CodeSnippet
          className="mt-4"
          code={`<PricingComparisonRow label="Storage" hint="Pooled across the whole team, not per seat.">
  <PricingComparisonCell>1 GB</PricingComparisonCell>
  <PricingComparisonCell>100 GB</PricingComparisonCell>
  <PricingComparisonCell>1 TB</PricingComparisonCell>
</PricingComparisonRow>`}
        />
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">PricingComparison</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              The matrix root (a scrollable <code className="font-mono text-sm">&lt;table&gt;</code>
              ). <code className="font-mono text-sm">featured</code> is the 0-based index of the
              plan column to highlight (the single source of truth: the header cap and the body
              column tint both derive from it). Omit it for no highlight.
            </p>
          </div>
          <div>
            <h3 className="font-mono font-semibold">PricingComparisonHeader · PricingComparisonPlan</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              The sticky plan-header row and its column cells. Header takes an optional{" "}
              <code className="font-mono text-sm">label</code> for the empty top-left corner. Each
              Plan takes <code className="font-mono text-sm">name</code>,{" "}
              <code className="font-mono text-sm">price</code>,{" "}
              <code className="font-mono text-sm">period</code>, and an optional{" "}
              <code className="font-mono text-sm">badge</code>; its children are the CTA, stretched
              full-width and pinned to the bottom so buttons line up across columns.
            </p>
          </div>
          <div>
            <h3 className="font-mono font-semibold">PricingComparisonSection</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              A labelled group of rows (a <code className="font-mono text-sm">&lt;tbody&gt;</code>).
              The <code className="font-mono text-sm">title</code> renders as a full-width band above
              its rows. Omit the title for an ungrouped block.
            </p>
          </div>
          <div>
            <h3 className="font-mono font-semibold">PricingComparisonRow · PricingComparisonCell</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              A feature row and its per-plan cells. Row takes a{" "}
              <code className="font-mono text-sm">label</code> (the leading row header) and an
              optional <code className="font-mono text-sm">hint</code> /{" "}
              <code className="font-mono text-sm">hintLabel</code> for an info tooltip. Each Cell
              renders its children as a value, or a check / muted minus by{" "}
              <code className="font-mono text-sm">included</code> when empty. Order the cells to match
              the plan columns.
            </p>
          </div>
        </div>
      </DocSection>

      <Faq
        items={[
          {
            q: "When do I use this instead of Pricing?",
            a: "Reach for Pricing (the card table) for the marketing moment: a handful of plans, each selling itself with a short feature list and a CTA. Reach for Pricing Comparison when buyers are deciding between plans and need to compare line by line: it lays every feature out as a row so differences are obvious at a glance. Many sites use both, the cards up top and the full matrix below.",
          },
          {
            q: "How do I highlight the recommended plan?",
            a: "Set `featured` on the root to the 0-based index of that plan's column (e.g. `featured={1}` for the second plan). The header cell gets a brand cap and the whole column gets a soft tint, top to bottom. It's the single source of truth, so you never mark the column in two places.",
          },
          {
            q: "Do the cells have to be checks and minuses?",
            a: "No. A cell renders whatever you pass as children, so mix glyphs with real values: `5`, `100 GB`, `Unlimited`, or a Badge. Leave a cell empty to get the success check, or `included={false}` for the muted minus.",
          },
          {
            q: "Is the header really sticky?",
            a: "The plan header is `position: sticky`, so it stays in view while you scan a long matrix when the table scrolls within a bounded height. Give the component a `max-h-*` (or let it scroll inside a constrained container) and the header pins to the top as the rows scroll under it.",
          },
        ]}
      />
    </>
  )
}
