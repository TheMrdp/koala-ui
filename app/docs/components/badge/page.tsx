import {
  ArrowsClockwise,
  Check,
  Clock,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Lightning,
  Lock,
  Minus,
  Package,
  Rocket,
  Star,
  Tag,
  X,
} from "@phosphor-icons/react/ssr"

import { Badge } from "@/components/ui/badge"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { DismissibleDemo } from "./dismissible-demo"

export const metadata = {
  title: "Badge",
}

export default function BadgeDocsPage() {
  return (
    <>
      <DocHeader
        title="Badge"
        description="A compact label for status, counts, and categories. Single-element like Button; status variants are soft tints derived from semantic tokens, so they re-theme everywhere."
      />

      <ComponentPreview
        code={`<Badge variant="success" dot pill>Online</Badge>
<Badge variant="purple" pill><Lightning /> Beta</Badge>
<Badge variant="info" pill>v2.4.0</Badge>
<Badge variant="outline"><GitBranch /> main</Badge>`}
      >
        <Badge variant="success" dot pill>
          Online
        </Badge>
        <Badge variant="purple" pill>
          <Lightning /> Beta
        </Badge>
        <Badge variant="info" pill>
          v2.4.0
        </Badge>
        <Badge variant="outline">
          <GitBranch /> main
        </Badge>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="badge" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Badge } from "@/components/ui/badge"

export function Example() {
  return <Badge>New</Badge>
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <ComponentPreview
          code={`<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>`}
        >
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Status">
        <p className="mt-4 text-pretty text-muted-foreground">
          Soft status variants tint a background and text from a single semantic token
          (<code className="font-mono text-sm">--success</code>,{" "}
          <code className="font-mono text-sm">--warning</code>,{" "}
          <code className="font-mono text-sm">--info</code>), so they stay legible across
          all four themes.
        </p>
        <ComponentPreview
          code={`<Badge variant="success"><GitMerge /> Merged</Badge>
<Badge variant="info"><GitPullRequest /> In review</Badge>
<Badge variant="warning"><Clock /> Pending</Badge>
<Badge variant="destructive"><X /> Failed</Badge>
<Badge variant="secondary"><ArrowsClockwise /> Running</Badge>
<Badge variant="default"><Minus /> Skipped</Badge>`}
        >
          <Badge variant="success">
            <GitMerge /> Merged
          </Badge>
          <Badge variant="info">
            <GitPullRequest /> In review
          </Badge>
          <Badge variant="warning">
            <Clock /> Pending
          </Badge>
          <Badge variant="destructive">
            <X /> Failed
          </Badge>
          <Badge variant="secondary">
            <ArrowsClockwise /> Running
          </Badge>
          <Badge variant="default">
            <Minus /> Skipped
          </Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Categorical">
        <p className="mt-4 text-pretty text-muted-foreground">
          Four extra hues for labeling categories, feature flags, and tags. All follow the
          same soft-tint pattern and re-theme across all four themes.
        </p>
        <ComponentPreview
          code={`<Badge variant="purple"><Lightning /> Beta</Badge>
<Badge variant="purple"><Rocket /> New</Badge>
<Badge variant="pink"><Star /> Featured</Badge>
<Badge variant="pink"><Tag /> Design</Badge>
<Badge variant="teal">Engineering</Badge>
<Badge variant="teal">Frontend</Badge>
<Badge variant="orange">Deprecated</Badge>
<Badge variant="orange"><Package /> v1 Legacy</Badge>`}
        >
          <Badge variant="purple">
            <Lightning /> Beta
          </Badge>
          <Badge variant="purple">
            <Rocket /> New
          </Badge>
          <Badge variant="pink">
            <Star /> Featured
          </Badge>
          <Badge variant="pink">
            <Tag /> Design
          </Badge>
          <Badge variant="teal">Engineering</Badge>
          <Badge variant="teal">Frontend</Badge>
          <Badge variant="orange">Deprecated</Badge>
          <Badge variant="orange">
            <Package /> v1 Legacy
          </Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With dot">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">dot</code> prop adds a leading status
          dot in the variant color - ideal for presence and at-a-glance state. The
          background is stripped so only the dot carries the color.
        </p>
        <ComponentPreview
          code={`<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Away</Badge>
<Badge variant="destructive" dot>Busy</Badge>
<Badge variant="default" dot>Offline</Badge>
<Badge variant="info" dot>In a call</Badge>
<Badge variant="purple" dot>Focused</Badge>
<Badge variant="teal" dot>On break</Badge>
<Badge variant="pink" dot>Do not disturb</Badge>`}
        >
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Away</Badge>
          <Badge variant="destructive" dot>Busy</Badge>
          <Badge variant="default" dot>Offline</Badge>
          <Badge variant="info" dot>In a call</Badge>
          <Badge variant="purple" dot>Focused</Badge>
          <Badge variant="teal" dot>On break</Badge>
          <Badge variant="pink" dot>Do not disturb</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview
          code={`<Badge variant="success" size="sm" dot>Online</Badge>
<Badge variant="success" size="md" dot>Online</Badge>
<Badge variant="success" size="lg" dot>Online</Badge>
<Badge variant="info" size="sm" pill>v2.4.0</Badge>
<Badge variant="info" size="md" pill>v2.4.0</Badge>
<Badge variant="info" size="lg" pill>v2.4.0</Badge>`}
        >
          <Badge variant="success" size="sm" dot>Online</Badge>
          <Badge variant="success" size="md" dot>Online</Badge>
          <Badge variant="success" size="lg" dot>Online</Badge>
          <Badge variant="info" size="sm" pill>v2.4.0</Badge>
          <Badge variant="info" size="md" pill>v2.4.0</Badge>
          <Badge variant="info" size="lg" pill>v2.4.0</Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Pill">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">pill</code> for fully rounded edges -
          pairs well with dot and icon badges.
        </p>
        <ComponentPreview
          code={`<Badge pill>Default</Badge>
<Badge variant="success" pill dot>Online</Badge>
<Badge variant="purple" pill><Lightning /> Beta</Badge>
<Badge variant="info" pill>v2.4.0</Badge>`}
        >
          <Badge pill>Default</Badge>
          <Badge variant="success" pill dot>
            Online
          </Badge>
          <Badge variant="purple" pill>
            <Lightning /> Beta
          </Badge>
          <Badge variant="info" pill>
            v2.4.0
          </Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With icon">
        <ComponentPreview
          code={`<Badge variant="success"><Check /> Verified</Badge>
<Badge variant="purple"><Lightning /> Beta</Badge>
<Badge variant="orange"><Rocket /> New</Badge>
<Badge variant="info"><Star /> Featured</Badge>
<Badge variant="outline"><Lock /> Private</Badge>
<Badge variant="outline"><GitBranch /> feature/auth</Badge>`}
        >
          <Badge variant="success">
            <Check /> Verified
          </Badge>
          <Badge variant="purple">
            <Lightning /> Beta
          </Badge>
          <Badge variant="orange">
            <Rocket /> New
          </Badge>
          <Badge variant="info">
            <Star /> Featured
          </Badge>
          <Badge variant="outline">
            <Lock /> Private
          </Badge>
          <Badge variant="outline">
            <GitBranch /> feature/auth
          </Badge>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Dismissible">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">onRemove</code> to render a trailing
          dismiss button. Give each a descriptive{" "}
          <code className="font-mono text-sm">removeLabel</code> for screen readers.
        </p>
        <ComponentPreview
          code={`<Badge
  variant="secondary"
  pill
  onRemove={() => remove(tag)}
  removeLabel={\`Remove \${tag}\`}
>
  {tag}
</Badge>`}
        >
          <DismissibleDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="As child">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use <code className="font-mono text-sm">asChild</code> to render the badge
          styles on another element - e.g. a link - via Radix Slot.
        </p>
        <ComponentPreview
          code={`<Badge asChild variant="info">
  <a href="/changelog">What's new</a>
</Badge>`}
        >
          <Badge asChild variant="info">
            <a href="/changelog">What&apos;s new</a>
          </Badge>
        </ComponentPreview>
      </DocSection>

    </>
  )
}
