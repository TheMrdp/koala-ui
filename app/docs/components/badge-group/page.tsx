import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  BadgeGroupHeroDemo,
  BadgeGroupOverflowDemo,
  BadgeGroupWrapDemo,
  BadgeGroupOverflowChipDemo,
  BadgeGroupInteractiveDemo,
  BadgeGroupCustomOverflowDemo,
} from "./badge-group-demo"

export const metadata = { title: "Badge Group" }

export default function BadgeGroupDocsPage() {
  return (
    <>
      <DocHeader
        title="Badge Group"
        description="A cluster of badges with built-in overflow. Cap how many show inline and the rest fold into a +N chip that reveals the full list in a tooltip on hover or focus, so a long set of tags, labels, or categories never blows out its row."
      />

      <ComponentPreview code={HERO_CODE}>
        <BadgeGroupHeroDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="badge-group" />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap your <a href="/docs/components/badge" className="underline underline-offset-4">Badge</a>{" "}
          children in <code className="font-mono text-sm">BadgeGroup</code> and set{" "}
          <code className="font-mono text-sm">max</code>. The group owns only the layout and the
          overflow affordance: the badges stay plain <code className="font-mono text-sm">Badge</code>s,
          styled however you like. The reveal rides the shared{" "}
          <a href="/docs/components/tooltip" className="underline underline-offset-4">Tooltip</a>.
        </p>
        <CodeSnippet filename="skills.tsx" className="mt-4" code={USAGE_CODE} />
      </DocSection>

      <DocSection title="Overflow">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">max</code> caps the badges shown inline; everything
          past it collapses into a single <code className="font-mono text-sm">+N</code> chip. Hover
          or focus the chip to reveal the whole list in a tooltip. Omit{" "}
          <code className="font-mono text-sm">max</code> to show every badge.
        </p>
        <ComponentPreview previewClassName="block" code={OVERFLOW_CODE}>
          <BadgeGroupOverflowDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Wrap">
        <p className="mt-4 text-pretty text-muted-foreground">
          Without a cap, set <code className="font-mono text-sm">wrap</code> to let a long set flow
          onto multiple lines instead of staying on one. Constrain the width and the badges wrap to
          fit.
        </p>
        <ComponentPreview code={WRAP_CODE}>
          <BadgeGroupWrapDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Overflow chip">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">+N</code> chip defaults to a small{" "}
          <code className="font-mono text-sm">outline</code> badge. Match it to the badges it stands
          in for with <code className="font-mono text-sm">overflowVariant</code> and{" "}
          <code className="font-mono text-sm">overflowSize</code>.
        </p>
        <ComponentPreview previewClassName="block" code={OVERFLOW_CHIP_CODE}>
          <BadgeGroupOverflowChipDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Interactive overflow">
        <p className="mt-4 text-pretty text-muted-foreground">
          When the badges carry links or a dismiss button, pass{" "}
          <code className="font-mono text-sm">interactive</code> so the tooltip stays open while the
          pointer moves into it, so you can click the contents. Here each tag is dismissible; remove a
          few and the <code className="font-mono text-sm">+N</code> recounts.
        </p>
        <ComponentPreview code={INTERACTIVE_CODE}>
          <BadgeGroupInteractiveDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Custom overflow">
        <p className="mt-4 text-pretty text-muted-foreground">
          Take over the tooltip body with{" "}
          <code className="font-mono text-sm">renderOverflow</code>, which receives the full list and
          the hidden slice. Return any node: a titled section, a grid, a different layout for just
          the hidden badges.
        </p>
        <ComponentPreview code={CUSTOM_OVERFLOW_CODE}>
          <BadgeGroupCustomOverflowDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I reach for BadgeGroup instead of just laying out Badges myself?",
              a: "Use BadgeGroup when a tag set can overflow its row and you want a clean cap: set `max` and the extras fold into a single `+N` chip that reveals the full list on hover or focus. If you just want a plain row that never overflows, a flex container of `Badge`s is enough.",
            },
            {
              q: "Does BadgeGroup style my badges for me?",
              a: "No. It owns only the layout and the overflow affordance, so your children stay plain `Badge`s with whatever `variant`, `size`, or `pill` you give them. Only the `+N` chip is styled by the group, via `overflowVariant` and `overflowSize`.",
            },
            {
              q: "What is the difference between max and wrap?",
              a: "`max` caps how many badges show inline and collapses the rest into the `+N` chip, keeping everything on one line. `wrap` instead lets the full set flow onto multiple lines. You can combine them: `wrap` with a `max` still hard-caps the count.",
            },
            {
              q: "How do I make the overflow chip match my badges?",
              a: "The chip defaults to a small `outline` badge. Set `overflowVariant` and `overflowSize` to mirror the badges it stands in for, for example `overflowVariant=\"secondary\"` with `overflowSize=\"md\"`.",
            },
            {
              q: "My hidden badges have links or remove buttons but the tooltip closes before I can click them. What gives?",
              a: "Pass `interactive` so the reveal tooltip stays open while the pointer moves into it, letting you click links or dismiss buttons inside. The chip is also focusable with `tabIndex={0}`, so the list is reachable by keyboard, and removing badges makes the `+N` count recompute.",
            },
            {
              q: "Can I customize what the tooltip shows instead of the default stacked list?",
              a: "Yes. Pass `renderOverflow`, which receives the full `items` array and the `hidden` slice and returns any node, so you can show only the hidden badges, a titled section, or a grid layout.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}

/* ------------------------------------------------------------ code blocks --- */

const HERO_CODE = `<BadgeGroup max={3}>
  {skills.map((skill) => (
    <Badge key={skill} variant="secondary" size="sm">
      {skill}
    </Badge>
  ))}
</BadgeGroup>`

const USAGE_CODE = `import { BadgeGroup } from "@/components/ui/badge-group"
import { Badge } from "@/components/ui/badge"

export function Skills({ skills }: { skills: string[] }) {
  return (
    <BadgeGroup max={3}>
      {skills.map((skill) => (
        <Badge key={skill} variant="secondary" size="sm">
          {skill}
        </Badge>
      ))}
    </BadgeGroup>
  )
}`

const OVERFLOW_CODE = `// max caps the inline badges; the rest fold into a tooltipped "+N".
<BadgeGroup max={2}>{badges}</BadgeGroup>
<BadgeGroup max={4}>{badges}</BadgeGroup>
<BadgeGroup>{badges}</BadgeGroup> {/* no max: show all */}`

const WRAP_CODE = `<BadgeGroup wrap className="max-w-xs">
  {skills.map((skill) => (
    <Badge key={skill} variant="outline" size="sm">
      <Tag /> {skill}
    </Badge>
  ))}
</BadgeGroup>`

const OVERFLOW_CHIP_CODE = `<BadgeGroup max={2} overflowVariant="secondary">
  {badges /* secondary, sm */}
</BadgeGroup>

<BadgeGroup max={2} overflowVariant="purple" overflowSize="md">
  {badges /* purple, md */}
</BadgeGroup>`

const INTERACTIVE_CODE = `<BadgeGroup max={3} interactive overflowVariant="secondary">
  {tags.map((tag) => (
    <Badge
      key={tag}
      variant="secondary"
      size="sm"
      pill
      onRemove={() => remove(tag)}
      removeLabel={\`Remove \${tag}\`}
    >
      {tag}
    </Badge>
  ))}
</BadgeGroup>`

const CUSTOM_OVERFLOW_CODE = `<BadgeGroup
  max={3}
  renderOverflow={(all, hidden) => (
    <div className="flex flex-col gap-1.5 p-1 text-left">
      <span className="text-xs font-medium text-muted-foreground">
        {hidden.length} more skills
      </span>
      <div className="grid grid-cols-2 gap-1">{hidden}</div>
    </div>
  )}
>
  {badges}
</BadgeGroup>`
