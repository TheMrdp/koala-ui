import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
} from "@/components/ui/avatar"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Specimen } from "@/components/docs/foundation"
import { AvatarStackDemo } from "./avatar-stack-demo"
import {
  ProfileCardDemo,
  TeamListDemo,
  CommentThreadDemo,
} from "./avatar-examples-demo"

export const metadata = {
  title: "Avatar",
}

const SRC = "https://i.pravatar.cc/160?img=12"

const SIZES = [
  { size: "xs", px: "24px" },
  { size: "sm", px: "32px" },
  { size: "md", px: "40px" },
  { size: "lg", px: "48px" },
  { size: "xl", px: "64px" },
] as const

const STATUSES = [
  { variant: "online", hint: "Active now" },
  { variant: "away", hint: "Idle" },
  { variant: "busy", hint: "Do not disturb" },
  { variant: "offline", hint: "Last seen earlier" },
] as const

export default function AvatarDocsPage() {
  return (
    <>
      <DocHeader
        title="Avatar"
        description="Represents a user with an image, initials fallback, and optional presence status. Multi-part over Radix Avatar; size and shape flow to every part through Context."
      />

      <ComponentPreview
        code={`<Avatar size="lg">
  <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
  <AvatarFallback>EA</AvatarFallback>
  <AvatarStatus variant="online" />
</Avatar>`}
      >
        <Avatar size="lg">
          <AvatarImage src={SRC} alt="Esteban Alonso" />
          <AvatarFallback>EA</AvatarFallback>
          <AvatarStatus variant="online" />
        </Avatar>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="avatar" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
      <AvatarFallback>EA</AvatarFallback>
    </Avatar>
  )
}`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Five fixed sizes, from <code className="font-mono text-sm">xs</code> (24px) to{" "}
          <code className="font-mono text-sm">xl</code> (64px). The status dot and fallback
          text scale with the box.
        </p>
        <ComponentPreview
          previewClassName="items-end"
          code={`<Avatar size="xs">…</Avatar>
<Avatar size="sm">…</Avatar>
<Avatar size="md">…</Avatar>
<Avatar size="lg">…</Avatar>
<Avatar size="xl">…</Avatar>`}
        >
          {SIZES.map(({ size, px }) => (
            <Specimen key={size} label={size} meta={px}>
              <Avatar size={size}>
                <AvatarImage src={SRC} alt="" />
                <AvatarFallback>EA</AvatarFallback>
              </Avatar>
            </Specimen>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection title="Shape">
        <p className="mt-4 text-pretty text-muted-foreground">
          Circular by default; set{" "}
          <code className="font-mono text-sm">{`shape="square"`}</code> for a
          rounded-square avatar (e.g. organizations).
        </p>
        <ComponentPreview
          previewClassName="gap-8"
          code={`<Avatar shape="circle">…</Avatar>
<Avatar shape="square">…</Avatar>`}
        >
          <Specimen label="circle" meta="People">
            <Avatar shape="circle" size="lg">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
            </Avatar>
          </Specimen>
          <Specimen label="square" meta="Organizations">
            <Avatar shape="square" size="lg">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
            </Avatar>
          </Specimen>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Fallback">
        <p className="mt-4 text-pretty text-muted-foreground">
          When no image is provided or it fails to load, Radix shows the fallback. Use{" "}
          <code className="font-mono text-sm">delayMs</code> to avoid a flash while a valid
          image loads.
        </p>
        <ComponentPreview
          code={`<Avatar>
  <AvatarImage src="/missing.jpg" alt="Esteban Alonso" />
  <AvatarFallback delayMs={600}>EA</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>KO</AvatarFallback>
</Avatar>`}
        >
          <Avatar size="lg">
            <AvatarImage src="/missing.jpg" alt="Esteban Alonso" />
            <AvatarFallback>EA</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>KO</AvatarFallback>
          </Avatar>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Status">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">AvatarStatus</code> adds a presence dot that
          sits outside the silhouette and reuses the status tokens
          (online/away/busy/offline).
        </p>
        <ComponentPreview
          previewClassName="gap-10"
          code={`{(["online", "away", "busy", "offline"] as const).map((variant) => (
  <Avatar key={variant} size="lg">
    <AvatarImage src="/esteban.jpg" alt="Esteban" />
    <AvatarFallback>EA</AvatarFallback>
    <AvatarStatus variant={variant} />
  </Avatar>
))}`}
        >
          {STATUSES.map(({ variant, hint }) => (
            <Specimen key={variant} label={variant} meta={hint}>
              <Avatar size="lg">
                <AvatarImage src={SRC} alt="" />
                <AvatarFallback>EA</AvatarFallback>
                <AvatarStatus variant={variant} />
              </Avatar>
            </Specimen>
          ))}
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">position</code> prop controls which corner
          the dot occupies - useful when another element (icon, badge) already occupies the
          default bottom-right corner.
        </p>
        <ComponentPreview
          previewClassName="gap-10"
          code={`<Avatar size="lg">
  <AvatarFallback>EA</AvatarFallback>
  <AvatarStatus variant="online" position="bottom-right" />
</Avatar>

<Avatar size="lg">
  <AvatarFallback>EA</AvatarFallback>
  <AvatarStatus variant="busy" position="top-right" />
</Avatar>`}
        >
          <Specimen label="bottom-right" meta="default">
            <Avatar size="lg" shape="circle">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
              <AvatarStatus variant="online" position="bottom-right" />
            </Avatar>
          </Specimen>
          <Specimen label="top-right">
            <Avatar size="lg" shape="circle">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
              <AvatarStatus variant="busy" position="top-right" />
            </Avatar>
          </Specimen>
          <Specimen label="bottom-left">
            <Avatar size="lg" shape="circle">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
              <AvatarStatus variant="away" position="bottom-left" />
            </Avatar>
          </Specimen>
          <Specimen label="top-left">
            <Avatar size="lg" shape="circle">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
              <AvatarStatus variant="offline" position="top-left" />
            </Avatar>
          </Specimen>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Stack">
        <p className="mt-4 text-pretty text-muted-foreground">
          Overlap avatars with a negative gap and a{" "}
          <code className="font-mono text-sm">ring-background</code> to separate them - useful
          for a group of collaborators. Wrap each in a{" "}
          <code className="font-mono text-sm">Tooltip</code> so hovering names the person, and
          add <code className="font-mono text-sm">hover:z-10</code> so the hovered avatar lifts
          clear of its neighbours. The stack works at any size; the overlap tightens as the box
          grows.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-start gap-8"
          code={`<div className="flex -space-x-3">
  {team.map(({ img, name }) => (
    <Tooltip key={img} content={name}>
      <Avatar size="md" className="ring-2 ring-background hover:z-10">
        <AvatarImage src={\`/avatars/\${img}.jpg\`} alt={name} />
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    </Tooltip>
  ))}
</div>`}
        >
          <AvatarStackDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Examples">
        <p className="mt-4 text-pretty text-muted-foreground">
          Common patterns where avatars appear in product UI - combined with other components.
        </p>
        <ComponentPreview
          previewClassName="gap-8 items-start flex-wrap"
          code={`<Card className="w-64">
  <CardContent className="flex flex-col items-center gap-4 pt-8 pb-6 text-center">
    <Avatar size="xl">
      <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
      <AvatarFallback>EA</AvatarFallback>
      <AvatarStatus variant="online" />
    </Avatar>
    <div>
      <p className="font-semibold">Esteban Alonso</p>
      <p className="text-sm text-muted-foreground">Product Designer</p>
    </div>
    <Badge variant="secondary" size="sm">Admin</Badge>
    <div className="flex w-full gap-2">
      <Button size="sm" className="flex-1">Follow</Button>
      <Button size="sm" variant="outline" className="flex-1">Message</Button>
    </div>
  </CardContent>
</Card>`}
        >
          <ProfileCardDemo />
        </ComponentPreview>

        <ComponentPreview
          previewClassName="gap-8 items-start flex-wrap"
          code={`<Card className="w-80">
  <CardHeader>
    <CardTitle>Team members</CardTitle>
    <CardAction>
      <Button size="sm" variant="ghost">Invite</Button>
    </CardAction>
  </CardHeader>
  <CardContent className="p-0">
    {members.map((m) => (
      <div key={m.name} className="flex items-center gap-3 px-4 py-2.5 border-t border-border first:border-t-0">
        <Avatar size="sm">
          <AvatarImage src={m.src} alt={m.name} />
          <AvatarFallback>{initials(m.name)}</AvatarFallback>
          <AvatarStatus variant={m.status} />
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{m.name}</p>
          <p className="text-xs text-muted-foreground truncate">{m.email}</p>
        </div>
        <Badge size="sm">{m.role}</Badge>
        <DropdownMenu>…</DropdownMenu>
      </div>
    ))}
  </CardContent>
</Card>`}
        >
          <TeamListDemo />
        </ComponentPreview>

        <ComponentPreview
          code={`<div className="flex gap-3">
  <Avatar size="sm">
    <AvatarImage src="/marie.jpg" alt="Marie Dubois" />
    <AvatarFallback>MD</AvatarFallback>
  </Avatar>
  <div>
    <span className="text-sm font-medium">Marie Dubois</span>
    <span className="text-xs text-muted-foreground ml-2">1m ago</span>
    <p className="mt-1 text-sm text-muted-foreground">The shadow scale is exactly what the cards needed.</p>
  </div>
</div>`}
        >
          <CommentThreadDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
