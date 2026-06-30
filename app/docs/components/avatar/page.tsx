import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
  AvatarBadge,
} from "@/components/ui/avatar"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
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

const COLORS = [
  { color: "default", initials: "KO" },
  { color: "brand", initials: "EA" },
  { color: "purple", initials: "MJ" },
  { color: "pink", initials: "AL" },
  { color: "teal", initials: "RT" },
  { color: "orange", initials: "SD" },
] as const

// Brand marks for the logo specimens. The simpleicons CDN serves single-color SVGs in each
// brand's hue; these read cleanly on both the light and dark `bg-background` plate.
const LOGOS = [
  { name: "Stripe", src: "https://cdn.simpleicons.org/stripe", initials: "S" },
  { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", initials: "F" },
  { name: "Spotify", src: "https://cdn.simpleicons.org/spotify", initials: "S" },
  { name: "Dropbox", src: "https://cdn.simpleicons.org/dropbox", initials: "D" },
  { name: "Airbnb", src: "https://cdn.simpleicons.org/airbnb", initials: "A" },
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
        <p className="mt-6 text-pretty text-muted-foreground">
          The fallback adapts to the box. A small avatar (
          <code className="font-mono text-sm">xs</code>/
          <code className="font-mono text-sm">sm</code>) shows a single initial so the glyph never
          crowds the silhouette; <code className="font-mono text-sm">md</code> and up show two. Pass
          the same two-letter string everywhere and let the size decide, or override per instance
          with <code className="font-mono text-sm">maxInitials</code>.
        </p>
        <ComponentPreview
          previewClassName="items-end"
          code={`{/* one initial on small boxes, two from md up, no per-size string needed */}
<Avatar size="xs"><AvatarFallback>EA</AvatarFallback></Avatar>
<Avatar size="sm"><AvatarFallback>EA</AvatarFallback></Avatar>
<Avatar size="md"><AvatarFallback>EA</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>EA</AvatarFallback></Avatar>
<Avatar size="xl"><AvatarFallback>EA</AvatarFallback></Avatar>`}
        >
          {SIZES.map(({ size, px }) => (
            <Specimen key={size} label={size} meta={px}>
              <Avatar size={size}>
                <AvatarFallback>EA</AvatarFallback>
              </Avatar>
            </Specimen>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection title="Color">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">color</code> tints the initials fallback with a soft
          background and strong text from a single categorical token - the same palette as the{" "}
          <a href="/docs/components/badge#categorical" className="underline underline-offset-4">
            Badge
          </a>{" "}
          hues, so it re-themes across all four themes. Use it to distribute initials across users,
          teams, or tags. It only paints the fallback; an image, when present, covers it.
        </p>
        <ComponentPreview
          previewClassName="gap-6"
          code={`<Avatar color="brand"><AvatarFallback>EA</AvatarFallback></Avatar>
<Avatar color="purple"><AvatarFallback>MJ</AvatarFallback></Avatar>
<Avatar color="pink"><AvatarFallback>AL</AvatarFallback></Avatar>
<Avatar color="teal"><AvatarFallback>RT</AvatarFallback></Avatar>
<Avatar color="orange"><AvatarFallback>SD</AvatarFallback></Avatar>`}
        >
          {COLORS.map(({ color, initials }) => (
            <Specimen key={color} label={color}>
              <Avatar size="lg" color={color}>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Specimen>
          ))}
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

      <DocSection title="Logo badge">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">AvatarBadge</code> is the same corner overlay as{" "}
          <code className="font-mono text-sm">AvatarStatus</code>, but it holds a brand or app mark
          instead of a presence dot. Drop an <code className="font-mono text-sm">{`<img>`}</code> or
          icon inside and it fits the coin, which carries a{" "}
          <code className="font-mono text-sm">ring-background</code> gap so it reads off the photo
          behind it. Use it to tag who someone is on another platform, an org badge, or a verified
          mark.
        </p>
        <ComponentPreview
          previewClassName="gap-10"
          code={`<Avatar size="lg">
  <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
  <AvatarFallback>EA</AvatarFallback>
  <AvatarBadge>
    <img src="https://cdn.simpleicons.org/figma" alt="Figma" />
  </AvatarBadge>
</Avatar>`}
        >
          {LOGOS.slice(0, 4).map(({ name, src, initials }, i) => (
            <Specimen key={name} label={name}>
              <Avatar size="lg">
                <AvatarImage src={`https://i.pravatar.cc/160?img=${[12, 5, 32, 8][i]}`} alt="" />
                <AvatarFallback>{initials}</AvatarFallback>
                <AvatarBadge>
                  <img src={src} alt={name} />
                </AvatarBadge>
              </Avatar>
            </Specimen>
          ))}
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          The coin&apos;s <code className="font-mono text-sm">shape</code> is its own, independent
          of the avatar: keep the round coin or set{" "}
          <code className="font-mono text-sm">{`shape="square"`}</code> for the classic app-icon
          look.
        </p>
        <ComponentPreview
          previewClassName="gap-10"
          code={`<Avatar size="lg">
  <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
  <AvatarFallback>EA</AvatarFallback>
  <AvatarBadge shape="circle">
    <img src="https://cdn.simpleicons.org/dropbox" alt="Dropbox" />
  </AvatarBadge>
</Avatar>

<Avatar size="lg">
  <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
  <AvatarFallback>EA</AvatarFallback>
  <AvatarBadge shape="square">
    <img src="https://cdn.simpleicons.org/dropbox" alt="Dropbox" />
  </AvatarBadge>
</Avatar>`}
        >
          <Specimen label="circle" meta="default">
            <Avatar size="lg">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
              <AvatarBadge shape="circle">
                <img src="https://cdn.simpleicons.org/dropbox" alt="Dropbox" />
              </AvatarBadge>
            </Avatar>
          </Specimen>
          <Specimen label="square" meta="App icon">
            <Avatar size="lg">
              <AvatarImage src={SRC} alt="" />
              <AvatarFallback>EA</AvatarFallback>
              <AvatarBadge shape="square">
                <img src="https://cdn.simpleicons.org/dropbox" alt="Dropbox" />
              </AvatarBadge>
            </Avatar>
          </Specimen>
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          It scales with the avatar and takes the same{" "}
          <code className="font-mono text-sm">position</code> prop as the status dot, so you can
          move it off the default <code className="font-mono text-sm">bottom-right</code> corner.
        </p>
        <ComponentPreview
          previewClassName="items-end gap-10"
          code={`<Avatar size="xl">
  <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
  <AvatarFallback>EA</AvatarFallback>
  <AvatarBadge position="top-right">
    <img src="https://cdn.simpleicons.org/spotify" alt="Spotify" />
  </AvatarBadge>
</Avatar>`}
        >
          {SIZES.map(({ size, px }) => (
            <Specimen key={size} label={size} meta={px}>
              <Avatar size={size}>
                <AvatarImage src={SRC} alt="" />
                <AvatarFallback>EA</AvatarFallback>
                <AvatarBadge>
                  <img src="https://cdn.simpleicons.org/spotify" alt="Spotify" />
                </AvatarBadge>
              </Avatar>
            </Specimen>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection title="Stack">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">AvatarGroup</code> stacks collaborators into one
          cluster. It owns the overlap, the{" "}
          <code className="font-mono text-sm">ring-background</code> separation, and the hover
          lift, so the children stay plain <code className="font-mono text-sm">Avatar</code>s with
          no per-instance ring or z-index. Cap the visible count with{" "}
          <code className="font-mono text-sm">max</code> and the rest collapse into a{" "}
          <code className="font-mono text-sm">+N</code> chip; pass{" "}
          <code className="font-mono text-sm">total</code> when the real count exceeds the avatars
          you render. Match the group&apos;s <code className="font-mono text-sm">size</code> to its
          children; the overlap tightens as the box grows.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-start gap-8"
          code={`<AvatarGroup size="md" max={4} total={9}>
  {team.map(({ img, name }) => (
    <Tooltip key={img} content={name}>
      <Avatar size="md">
        <AvatarImage src={\`/avatars/\${img}.jpg\`} alt={name} />
        <AvatarFallback>{initials(name)}</AvatarFallback>
      </Avatar>
    </Tooltip>
  ))}
</AvatarGroup>`}
        >
          <AvatarStackDemo />
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          Reach for <code className="font-mono text-sm">renderOverflow</code> to swap the default
          chip for a richer affordance, like a <code className="font-mono text-sm">Tooltip</code>{" "}
          that names the people the stack hides. See the full API on the{" "}
          <a href="/docs/components/avatar-group" className="underline underline-offset-4">
            Avatar Group
          </a>{" "}
          page.
        </p>
      </DocSection>

      <DocSection title="Examples">
        <p className="mt-4 text-pretty text-muted-foreground">
          Common patterns where avatars appear in product UI - combined with other components.
        </p>
        <ComponentPreview
          previewClassName="gap-8 items-start flex-wrap"
          code={`<div className="flex w-64 flex-col items-center gap-4 text-center">
  <Avatar size="xl">
    <AvatarImage src="/esteban.jpg" alt="Esteban Alonso" />
    <AvatarFallback>EA</AvatarFallback>
    <AvatarStatus variant="online" />
  </Avatar>
  <div className="space-y-1">
    <p className="font-semibold leading-none">Esteban Alonso</p>
    <p className="text-sm text-muted-foreground">Product Designer</p>
  </div>
  <Badge variant="info" size="sm" dot>Admin</Badge>
  <div className="flex w-full gap-2">
    <Button size="sm" className="flex-1">Follow</Button>
    <Button size="sm" variant="outline" className="flex-1">Message</Button>
  </div>
</div>`}
        >
          <ProfileCardDemo />
        </ComponentPreview>

        <ComponentPreview
          previewClassName="gap-8 items-start flex-wrap"
          code={`<div className="w-80">
  <div className="flex items-center justify-between">
    <h3 className="font-semibold">Team members</h3>
    <Button size="sm" variant="ghost" className="-mr-2">Invite</Button>
  </div>
  <List variant="plain" className="mt-2 border-t border-border">
    {members.map((m) => (
      <ListItem key={m.name}>
        <ListItemMedia>
          <Avatar size="sm">
            <AvatarImage src={m.src} alt={m.name} />
            <AvatarFallback>{initials(m.name)}</AvatarFallback>
            <AvatarStatus variant={m.status} />
          </Avatar>
        </ListItemMedia>
        <ListItemContent>
          <ListItemTitle>{m.name}</ListItemTitle>
          <ListItemDescription>{m.email}</ListItemDescription>
        </ListItemContent>
        <ListItemMeta>
          <Badge variant={roleVariant[m.role]} size="sm" dot>{m.role}</Badge>
          <DropdownMenu>…</DropdownMenu>
        </ListItemMeta>
      </ListItem>
    ))}
  </List>
</div>`}
        >
          <TeamListDemo />
        </ComponentPreview>

        <ComponentPreview
          code={`<ActivityFeed>
  {comments.map((c) => (
    <ActivityItem key={c.name}>
      <ActivityMarker>
        <Avatar size="sm">
          <AvatarImage src={c.src} alt={c.name} />
          <AvatarFallback>{initials(c.name)}</AvatarFallback>
        </Avatar>
      </ActivityMarker>
      <ActivityContent>
        <ActivityHeader>
          <ActivityActor>{c.name}</ActivityActor>
          <ActivityTime dateTime={c.dateTime}>{c.time}</ActivityTime>
        </ActivityHeader>
        <ActivityBody>{c.text}</ActivityBody>
        <div className="-ml-2.5 mt-1 flex gap-0.5">
          <Button variant="ghost" size="sm"><Heart />Like</Button>
          <Button variant="ghost" size="sm"><ChatCircle />Reply</Button>
        </div>
      </ActivityContent>
    </ActivityItem>
  ))}
</ActivityFeed>`}
        >
          <CommentThreadDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "Why does AvatarFallback sometimes show one initial and sometimes two?",
              a: "The fallback reads the resolved `size` from context and caps initials to fit the box: `xs` and `sm` show one initial so the glyph never crowds the silhouette, while `md` and up show two. Pass the same two-letter string everywhere and let size decide, or override per instance with `maxInitials`.",
            },
            {
              q: "How does the fallback know when to replace the image?",
              a: "Avatar is built on Radix Avatar, which tracks image load state and swaps in `AvatarFallback` when no image is set or it fails to load. Use the `delayMs` prop on the fallback to avoid a flash of initials while a valid image is still loading.",
            },
            {
              q: "How do I put a brand or app logo on an avatar?",
              a: "Add an `AvatarBadge` as a child and drop an `<img>` (or icon) inside it. It is the same corner overlay as `AvatarStatus`, a `background` coin with a `ring-background` gap, but big enough to hold a mark, and it fits whatever you put in it. It scales with the avatar `size` and takes the same `position` prop (`bottom-right` by default, plus the other three corners). Its own `shape` is independent of the avatar: keep the round coin or set `shape=\"square\"` for an app-icon look. Use it to tag the platform someone is on, an org badge, or a verified mark.",
            },
            {
              q: "What does the color prop tint, and when should I use it?",
              a: "color tints only the initials fallback with a soft background and strong text (`brand`, `purple`, `pink`, `teal`, `orange`, or neutral `default`), using the same categorical palette as Badge so it re-themes across all four themes. An image, when present, covers it, so use color to distinguish users or teams that fall back to initials.",
            },
            {
              q: "How do I move the presence dot off the bottom-right corner?",
              a: "Set the `position` prop on `AvatarStatus` to `top-right`, `bottom-left`, or `top-left`. This is useful when another element already occupies the default `bottom-right` corner. The `variant` prop (`online`, `away`, `busy`, `offline`) sets the dot color from the status tokens.",
            },
            {
              q: "How do size and shape reach AvatarImage, AvatarFallback, and AvatarStatus?",
              a: "Set `size` and `shape` once on the `Avatar` root and they flow to every part through React Context, so you never repeat them on the children. The shape lives on the root and the image and fallback inherit it via `rounded-[inherit]`, which is what lets the status dot sit outside the silhouette.",
            },
            {
              q: "How do I build an overlapping avatar stack?",
              a: "Wrap the avatars in `AvatarGroup`. It owns the overlap, the `ring-background` separation, and the hover lift, so the children stay plain `Avatar`s. Cap the visible count with `max` and the rest collapse into a `+N` chip; pass `total` when more people exist than you render, and `renderOverflow` to replace the chip with a Tooltip that names them. Set the group's `size` to match the children.",
            },
          ]}
        />
      </DocSection>

    </>
  )
}
