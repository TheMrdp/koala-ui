import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  AvatarGroupHeroDemo,
  AvatarGroupSizesDemo,
  AvatarGroupFallbacksDemo,
  AvatarGroupOverflowDemo,
  AvatarGroupCustomOverflowDemo,
} from "./avatar-group-demo"

export const metadata = { title: "Avatar Group" }

export default function AvatarGroupDocsPage() {
  return (
    <>
      <DocHeader
        title="Avatar Group"
        description="An overlapping stack of avatars with built-in overflow. Cap how many show and the rest fold into a +N chip, so a group of collaborators reads as one cluster without blowing out its row. The group owns the overlap, the ring separation, and the hover lift; the children stay plain Avatars."
      />

      <ComponentPreview code={HERO_CODE}>
        <AvatarGroupHeroDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="avatar-group" />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap your{" "}
          <a href="/docs/components/avatar" className="underline underline-offset-4">Avatar</a>{" "}
          children in <code className="font-mono text-sm">AvatarGroup</code> and set{" "}
          <code className="font-mono text-sm">max</code>. The group owns only the layout and the
          overflow chip: the avatars stay plain <code className="font-mono text-sm">Avatar</code>s
          with no per-instance ring or z-index. Match the group&apos;s{" "}
          <code className="font-mono text-sm">size</code> to its children.
        </p>
        <CodeSnippet filename="team.tsx" className="mt-4" code={USAGE_CODE} />
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">size</code> on the group to match the avatars; it
          sizes the <code className="font-mono text-sm">+N</code> chip and tightens the overlap as
          the box grows, so the stack stays a single cluster at every size.
        </p>
        <ComponentPreview previewClassName="block" code={SIZES_CODE}>
          <AvatarGroupSizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Fallbacks">
        <p className="mt-4 text-pretty text-muted-foreground">
          With no image the avatar shows its initials. Inside a group, give each fallback a{" "}
          <code className="font-mono text-sm">color</code> so the stack reads as distinct people
          instead of a row of identical gray chips: pass one of the Avatar{" "}
          <code className="font-mono text-sm">color</code> hues per child and stride-mix them so no
          two neighbours share a tint. The neutral gray default is fine for a lone avatar, not for
          a cluster. The <code className="font-mono text-sm">+N</code> chip stays neutral since
          it&apos;s a count, not initials.
        </p>
        <ComponentPreview code={FALLBACKS_CODE}>
          <AvatarGroupFallbacksDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Overflow">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">max</code> caps the avatars shown; everything past it
          collapses into a single <code className="font-mono text-sm">+N</code> chip. Pass{" "}
          <code className="font-mono text-sm">total</code> when more people exist than you render
          (e.g. a server count) so the chip reflects the real number. Omit{" "}
          <code className="font-mono text-sm">max</code> to show every avatar.
        </p>
        <ComponentPreview previewClassName="block" code={OVERFLOW_CODE}>
          <AvatarGroupOverflowDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Custom overflow">
        <p className="mt-4 text-pretty text-muted-foreground">
          Take over the chip with{" "}
          <code className="font-mono text-sm">renderOverflow</code>, which receives the overflow
          count. Return any node: here the chip is a{" "}
          <a href="/docs/components/tooltip" className="underline underline-offset-4">Tooltip</a>{" "}
          that names the people the stack hides.
        </p>
        <ComponentPreview code={CUSTOM_OVERFLOW_CODE}>
          <AvatarGroupCustomOverflowDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">AvatarGroup</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              A <code className="font-mono text-sm">&lt;div&gt;</code> that lays out its{" "}
              <code className="font-mono text-sm">Avatar</code> children as an overlapping stack and
              appends the overflow chip. Forwards all native div props;{" "}
              <code className="font-mono text-sm">className</code> is merged last.
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">size</code> — <code className="font-mono text-sm">xs | sm | md | lg | xl</code>{" "}
                (default <code className="font-mono text-sm">md</code>). Sizes the chip and the
                overlap; pass the same value you set on the children.
              </li>
              <li>
                <code className="font-mono text-sm">max</code> — cap the visible avatars; the rest
                fold into the <code className="font-mono text-sm">+N</code> chip.
              </li>
              <li>
                <code className="font-mono text-sm">total</code> — the real count when it exceeds the
                rendered avatars, so <code className="font-mono text-sm">+N</code> reflects it.
              </li>
              <li>
                <code className="font-mono text-sm">renderOverflow</code> —{" "}
                <code className="font-mono text-sm">{`(overflow: number) => ReactNode`}</code>; replace
                the default chip with a custom affordance.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I reach for AvatarGroup instead of laying out Avatars myself?",
              a: "Use AvatarGroup whenever you stack collaborators: it owns the overlap, the `ring-background` separation, and the hover lift, and adds a `+N` overflow chip via `max`. Hand-rolling those classes on each Avatar drifts the moment the recipe changes, which is exactly what this component prevents.",
            },
            {
              q: "Does AvatarGroup style my avatars for me?",
              a: "It adds the ring, overlap, and hover lift to each child through descendant utilities, so you don't repeat `ring-2 ring-background` per Avatar. The avatars keep their own `size`, `shape`, `color`, image, and fallback. Only the default `+N` chip is rendered by the group.",
            },
            {
              q: "What is the difference between max and total?",
              a: "`max` caps how many avatars render inline. `total` tells the chip how many people exist overall, even ones you never render, so `+N` can read `+614` while you only show four avatars. Use `total` for server counts; without it the chip just counts the hidden children.",
            },
            {
              q: "How do I name each person on hover?",
              a: "Wrap each Avatar in a Tooltip. Tooltip clones its trigger and portals the bubble out, so the Avatar stays the direct child of the group and the overlap and ring still apply. For the hidden people, pass `renderOverflow` and put the names in a single Tooltip on the chip.",
            },
            {
              q: "Why is the size prop on the group as well as the avatars?",
              a: "The group needs a size to render the `+N` chip and to pick the overlap amount, since it can't read the children's individual sizes. Pass the same `size` to both so the chip matches the avatars and the overlap looks right.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}

/* ------------------------------------------------------------ code blocks --- */

const HERO_CODE = `<AvatarGroup size="md" max={4} total={9}>
  {team.map(({ img, name }) => (
    <Tooltip key={img} content={name}>
      <Avatar size="md">
        <AvatarImage src={\`/avatars/\${img}.jpg\`} alt={name} />
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    </Tooltip>
  ))}
</AvatarGroup>`

const USAGE_CODE = `import { AvatarGroup } from "@/components/ui/avatar-group"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Team({ members }: { members: Member[] }) {
  return (
    <AvatarGroup size="md" max={4} total={members.length}>
      {members.slice(0, 4).map((m) => (
        <Avatar key={m.id} size="md">
          <AvatarImage src={m.avatar} alt={m.name} />
          <AvatarFallback>{m.initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  )
}`

const SIZES_CODE = `<AvatarGroup size="sm" max={4} total={9}>{avatars}</AvatarGroup>
<AvatarGroup size="md" max={4} total={9}>{avatars}</AvatarGroup>
<AvatarGroup size="lg" max={4} total={9}>{avatars}</AvatarGroup>`

// In a group, fallbacks always carry a color, stride-mixed so neighbours never share a hue.
const FALLBACKS_CODE = `<AvatarGroup size="md">
  {team.map(({ name, color }) => (
    <Tooltip key={name} content={name}>
      <Avatar size="md" color={color}>
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    </Tooltip>
  ))}
</AvatarGroup>`

const OVERFLOW_CODE = `// max caps the inline avatars; total counts everyone, even those not rendered.
<AvatarGroup max={2} total={9}>{avatars}</AvatarGroup>
<AvatarGroup max={3} total={9}>{avatars}</AvatarGroup>
<AvatarGroup total={9}>{avatars}</AvatarGroup> {/* no max: show all */}`

const CUSTOM_OVERFLOW_CODE = `<AvatarGroup
  size="md"
  max={4}
  total={9}
  renderOverflow={(overflow) => (
    <Tooltip interactive content={<NamesList names={hidden} />}>
      <Avatar size="md" tabIndex={0}>
        <AvatarFallback maxInitials={4} className="tabular-nums">
          {\`+\${overflow}\`}
        </AvatarFallback>
      </Avatar>
    </Tooltip>
  )}
>
  {avatars}
</AvatarGroup>`
