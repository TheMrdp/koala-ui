import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  ShowcaseDemo,
  SimpleDemo,
  MarkersDemo,
  AttachmentsDemo,
  CommentDemo,
  DensityDemo,
} from "./activity-feed-demos"

export const metadata = { title: "Activity Feed" }

export default function ActivityFeedDocsPage() {
  return (
    <>
      <DocHeader
        title="Activity Feed"
        description="A vertical timeline of what happened: comments, mentions, status changes, uploads, reactions, members joining. One rail threads every event, while each row varies its marker (a tinted icon, an avatar, or a low-emphasis dot) and its body (a one-liner, a quoted comment card, or image and file attachments). Composed from named parts, so a feed scales from a terse audit log to a rich inbox."
      />

      <ComponentPreview code={SHOWCASE_CODE}>
        <ShowcaseDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation
          component="activity-feed"
          dependencies="npm install @phosphor-icons/react radix-ui tailwind-variants tailwind-merge"
        />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Activity Feed is composed from named parts, like{" "}
          <a href="/docs/components/ranking" className="underline underline-offset-4">Ranking</a>.
          The <code className="font-mono text-sm">ActivityFeed</code> root is a semantic{" "}
          <code className="font-mono text-sm">&lt;ol&gt;</code> that owns density and the
          connecting rail; each <code className="font-mono text-sm">ActivityItem</code> pairs an{" "}
          <code className="font-mono text-sm">ActivityMarker</code> (drop an{" "}
          <code className="font-mono text-sm">ActivityIcon</code>, an{" "}
          <a href="/docs/components/avatar" className="underline underline-offset-4">Avatar</a>, or
          an <code className="font-mono text-sm">ActivityDot</code> inside it) with an{" "}
          <code className="font-mono text-sm">ActivityContent</code> body. The rail is drawn
          automatically and closes itself on the last event.
        </p>
        <CodeSnippet filename="activity.tsx" className="mt-4" code={USAGE_CODE} />
        <div className="mt-4">
          <ComponentPreview code={SIMPLE_CODE}>
            <SimpleDemo />
          </ComponentPreview>
        </div>
      </DocSection>

      <DocSection title="Markers">
        <p className="mt-4 text-pretty text-muted-foreground">
          The marker carries the type of event. <code className="font-mono text-sm">ActivityIcon</code>{" "}
          is a soft tinted tile: pass a Phosphor glyph and a{" "}
          <code className="font-mono text-sm">tone</code> (<code className="font-mono text-sm">brand</code>,{" "}
          <code className="font-mono text-sm">success</code>, <code className="font-mono text-sm">info</code>,{" "}
          <code className="font-mono text-sm">destructive</code>, <code className="font-mono text-sm">purple</code>,{" "}
          and more). For people, drop an <code className="font-mono text-sm">Avatar</code> in the
          same slot; for minor events, <code className="font-mono text-sm">ActivityDot</code> is a
          low-emphasis dot. All three share a 32px footprint, so the rail stays aligned whichever
          you use.
        </p>
        <ComponentPreview code={MARKERS_CODE}>
          <MarkersDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Attachments">
        <p className="mt-4 text-pretty text-muted-foreground">
          Events carry payloads, and the feed composes them from existing components rather than
          re-rolling chips. Stack them in{" "}
          <code className="font-mono text-sm">ActivityAttachments</code>: drop a{" "}
          <a href="/docs/components/file-card" className="underline underline-offset-4">File Card</a>{" "}
          row in for each file (it already ships the type-tinted icon, name, and meta) and lay{" "}
          <code className="font-mono text-sm">ActivityImage</code> thumbnails out in a{" "}
          <code className="font-mono text-sm">flex flex-wrap</code> row for an image gallery. For an
          upload-in-progress state, use File Card&rsquo;s{" "}
          <code className="font-mono text-sm">FileCardProgress</code>; to collect the files in the
          first place, see{" "}
          <a href="/docs/components/file-upload" className="underline underline-offset-4">File Upload</a>.
        </p>
        <ComponentPreview code={ATTACHMENTS_CODE}>
          <AttachmentsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Quoted comments">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">ActivityCard</code> is a nested surface for quoted
          content: a posted comment, a review, a changelog note. Its radius steps down
          concentrically from the Card the feed usually sits in. For a short, muted one-liner under
          the header, use <code className="font-mono text-sm">ActivityBody</code> instead.
        </p>
        <ComponentPreview code={COMMENT_CODE}>
          <CommentDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Without the rail">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">connector={"{false}"}</code> on the feed for a
          plain list of events with no connecting line, useful for a single notification, a
          digest, or a card where the timeline framing would be too heavy.
        </p>
        <ComponentPreview code={PLAIN_CODE}>
          <CommentDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Density is Koala&rsquo;s cross-cutting spacing axis (see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>).
          For the feed it tunes the gap to the rail and the per-event rhythm; the marker size stays
          fixed so the rail aligns identically at both densities.{" "}
          <code className="font-mono text-sm">comfortable</code> is the default;{" "}
          <code className="font-mono text-sm">compact</code> tightens it for dense app timelines. Set
          it per-feed or for a whole subtree with{" "}
          <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview previewClassName="block" code={DENSITY_CODE}>
          <DensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">ActivityFeed</code> renders an{" "}
          <code className="font-mono text-sm">&lt;ol&gt;</code> and adds{" "}
          <code className="font-mono text-sm">density</code> (
          <code className="font-mono text-sm">comfortable | compact</code>) and{" "}
          <code className="font-mono text-sm">connector</code> (
          <code className="font-mono text-sm">boolean</code>, default{" "}
          <code className="font-mono text-sm">true</code>).{" "}
          <code className="font-mono text-sm">ActivityItem</code> renders an{" "}
          <code className="font-mono text-sm">&lt;li&gt;</code>.{" "}
          <code className="font-mono text-sm">ActivityIcon</code> and{" "}
          <code className="font-mono text-sm">ActivityDot</code> take a{" "}
          <code className="font-mono text-sm">tone</code> (
          <code className="font-mono text-sm">default | brand | success | warning | info | destructive | purple | pink | teal | orange</code>).{" "}
          <code className="font-mono text-sm">ActivityActor</code> accepts{" "}
          <code className="font-mono text-sm">asChild</code>;{" "}
          <code className="font-mono text-sm">ActivityTime</code> renders a{" "}
          <code className="font-mono text-sm">&lt;time&gt;</code> (pass{" "}
          <code className="font-mono text-sm">dateTime</code>);{" "}
          <code className="font-mono text-sm">ActivityImage</code> requires{" "}
          <code className="font-mono text-sm">alt</code>. The rest ({" "}
          <code className="font-mono text-sm">ActivityMarker</code>,{" "}
          <code className="font-mono text-sm">ActivityContent</code>,{" "}
          <code className="font-mono text-sm">ActivityHeader</code>,{" "}
          <code className="font-mono text-sm">ActivityBody</code>,{" "}
          <code className="font-mono text-sm">ActivityCard</code>,{" "}
          <code className="font-mono text-sm">ActivityAttachments</code>) forward their element
          props. Attachments compose existing components (
          <a href="/docs/components/file-card" className="underline underline-offset-4">File Card</a>{" "}
          for files). Every part accepts <code className="font-mono text-sm">className</code>, merged last.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "How do I choose between ActivityIcon, an Avatar, and ActivityDot for a marker?",
              a: "Use `ActivityIcon` with a tone for typed events (a status change, an upload), an `Avatar` when a specific person acted, and `ActivityDot` for low-emphasis minor events like a field edit. All three share a fixed footprint inside `ActivityMarker`, so the rail stays aligned whichever you pick.",
            },
            {
              q: "What tones can ActivityIcon and ActivityDot take?",
              a: "Both accept a `tone` of `default`, `brand`, `success`, `warning`, `info`, `destructive`, `purple`, `pink`, `teal`, or `orange`. The icon renders a soft tinted tile (border/bg/text in that role) and the dot renders a solid fill, and every tone re-themes across all palettes.",
            },
            {
              q: "Do I have to draw the connecting line between events myself?",
              a: "No. The rail is pure layout with no JS: each `ActivityMarker` stretches and appends a connector that fills down to the next marker. The feed automatically hides the connector on the last list item and zeroes its bottom padding so the line always stops cleanly at the final event.",
            },
            {
              q: "How do I render a single notification or digest without the timeline line?",
              a: "Pass `connector={false}` on the `ActivityFeed` root for a plain list of events with no connecting rail. It is useful when the timeline framing would feel too heavy, such as one notification or a card-bound digest.",
            },
            {
              q: "When should I use ActivityCard versus ActivityBody for an event's text?",
              a: "Use `ActivityBody` for a short muted one-liner under the header, and `ActivityCard` for quoted content like a posted comment, a review, or a changelog note. `ActivityCard` is a nested surface whose radius steps down concentrically from the Card the feed usually sits in.",
            },
            {
              q: "How should I attach files and images to an event?",
              a: "Wrap them in `ActivityAttachments`. For files, drop a `FileCard` row in rather than re-rolling a chip, since it already ships the type-tinted icon, name, and meta; for images, lay `ActivityImage` thumbnails out in a `flex flex-wrap` row. Note `ActivityImage` requires an `alt`, and `ActivityTime` should get a `dateTime` ISO string.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}

/* ------------------------------------------------------------ code blocks --- */

const SHOWCASE_CODE = `<ActivityFeed>
  {/* A posted comment: avatar marker, quoted in a card */}
  <ActivityItem>
    <ActivityMarker>
      <Avatar size="sm">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </ActivityMarker>
    <ActivityContent>
      <ActivityHeader>
        <ActivityActor>Sarah Chen</ActivityActor>
        commented
        <ActivityTime dateTime="2026-06-15T12:30:00Z">2h ago</ActivityTime>
      </ActivityHeader>
      <ActivityCard>Love the new onboarding flow…</ActivityCard>
    </ActivityContent>
  </ActivityItem>

  {/* A mention: tinted icon marker */}
  <ActivityItem>
    <ActivityMarker>
      <ActivityIcon tone="purple"><At /></ActivityIcon>
    </ActivityMarker>
    <ActivityContent>
      <ActivityHeader>
        <ActivityActor>Marcus Lee</ActivityActor>
        mentioned you
        <ActivityTime dateTime="2026-06-15T11:05:00Z">3h ago</ActivityTime>
      </ActivityHeader>
      <ActivityBody>“@you can you own the migration checklist?”</ActivityBody>
    </ActivityContent>
  </ActivityItem>

  {/* An upload: image gallery + a reused FileCard row */}
  <ActivityItem>
    <ActivityMarker>
      <ActivityIcon tone="teal"><UploadSimple /></ActivityIcon>
    </ActivityMarker>
    <ActivityContent>
      <ActivityHeader>
        <ActivityActor>Priya Nair</ActivityActor>
        uploaded 2 files
        <ActivityTime dateTime="2026-06-15T09:48:00Z">5h ago</ActivityTime>
      </ActivityHeader>
      <ActivityAttachments>
        <div className="flex flex-wrap gap-2">
          <ActivityImage src={shot} alt="Brand exploration" />
        </div>
        <FileCard>
          <FileCardIcon type="pdf" />
          <FileCardContent>
            <FileCardName>Brand-guidelines.pdf</FileCardName>
            <FileCardMeta>2.4 MB · PDF document</FileCardMeta>
          </FileCardContent>
        </FileCard>
      </ActivityAttachments>
    </ActivityContent>
  </ActivityItem>

  {/* A status change: success icon + Badge */}
  <ActivityItem>
    <ActivityMarker>
      <ActivityIcon tone="success"><CheckCircle /></ActivityIcon>
    </ActivityMarker>
    <ActivityContent>
      <ActivityHeader>
        <ActivityActor>Marcus Lee</ActivityActor>
        changed status to <Badge size="sm" variant="success">Done</Badge>
        <ActivityTime dateTime="2026-06-15T08:20:00Z">6h ago</ActivityTime>
      </ActivityHeader>
    </ActivityContent>
  </ActivityItem>

  {/* A minor edit: low-emphasis dot closes the rail */}
  <ActivityItem>
    <ActivityMarker><ActivityDot /></ActivityMarker>
    <ActivityContent>
      <ActivityHeader>
        <ActivityActor>Priya Nair</ActivityActor>
        changed the due date to <span className="text-foreground">Jun 20</span>
        <ActivityTime dateTime="2026-06-14T16:30:00Z">Yesterday</ActivityTime>
      </ActivityHeader>
    </ActivityContent>
  </ActivityItem>
</ActivityFeed>`

const USAGE_CODE = `import {
  ActivityFeed,
  ActivityItem,
  ActivityMarker,
  ActivityIcon,
  ActivityContent,
  ActivityHeader,
  ActivityActor,
  ActivityTime,
} from "@/components/ui/activity-feed"
import { GitMerge } from "@phosphor-icons/react"

export function Timeline() {
  return (
    <ActivityFeed>
      <ActivityItem>
        <ActivityMarker>
          <ActivityIcon tone="success"><GitMerge /></ActivityIcon>
        </ActivityMarker>
        <ActivityContent>
          <ActivityHeader>
            <ActivityActor>Alex Rivera</ActivityActor>
            merged the pull request
            <ActivityTime dateTime="2026-06-15T10:30:00Z">30m ago</ActivityTime>
          </ActivityHeader>
        </ActivityContent>
      </ActivityItem>
    </ActivityFeed>
  )
}`

const SIMPLE_CODE = `<ActivityFeed>
  <ActivityItem>
    <ActivityMarker>
      <ActivityIcon tone="info"><ChatCircle /></ActivityIcon>
    </ActivityMarker>
    <ActivityContent>
      <ActivityHeader>
        <ActivityActor>Alex Rivera</ActivityActor>
        opened the issue
        <ActivityTime dateTime="2026-06-15T10:00:00Z">1h ago</ActivityTime>
      </ActivityHeader>
    </ActivityContent>
  </ActivityItem>
  <ActivityItem>
    <ActivityMarker>
      <ActivityIcon tone="success"><GitMerge /></ActivityIcon>
    </ActivityMarker>
    <ActivityContent>
      <ActivityHeader>
        <ActivityActor>Alex Rivera</ActivityActor>
        merged the pull request
        <ActivityTime dateTime="2026-06-15T10:30:00Z">30m ago</ActivityTime>
      </ActivityHeader>
    </ActivityContent>
  </ActivityItem>
</ActivityFeed>`

const MARKERS_CODE = `{/* Avatar: for people */}
<ActivityMarker>
  <Avatar size="sm">
    <AvatarImage src={user.avatar} alt={user.name} />
    <AvatarFallback>JP</AvatarFallback>
  </Avatar>
</ActivityMarker>

{/* Tinted icon: for typed events */}
<ActivityMarker>
  <ActivityIcon tone="orange"><UserPlus /></ActivityIcon>
</ActivityMarker>

{/* Dot: for minor events */}
<ActivityMarker>
  <ActivityDot />
</ActivityMarker>`

const ATTACHMENTS_CODE = `<ActivityAttachments>
  {/* an image gallery */}
  <div className="flex flex-wrap gap-2">
    <ActivityImage src={poster} alt="Poster concept" />
    <ActivityImage src={study} alt="Color study" />
  </div>
  {/* files reuse the FileCard component, no custom chip */}
  <FileCard>
    <FileCardIcon type="archive" />
    <FileCardContent>
      <FileCardName>source-assets.zip</FileCardName>
      <FileCardMeta>18 MB · Archive</FileCardMeta>
    </FileCardContent>
  </FileCard>
</ActivityAttachments>`

const COMMENT_CODE = `<ActivityContent>
  <ActivityHeader>
    <ActivityActor>Dana Wu</ActivityActor>
    left a review
    <ActivityTime dateTime="2026-06-15T07:10:00Z">8h ago</ActivityTime>
  </ActivityHeader>
  <ActivityCard>
    The motion polish is great, but the empty-state illustration feels a
    touch heavy against the cream theme. Maybe drop it to 80% opacity?
  </ActivityCard>
</ActivityContent>`

const PLAIN_CODE = `// connector={false} drops the connecting rail entirely.
<ActivityFeed connector={false}>
  <ActivityItem>
    <ActivityMarker>
      <Avatar size="sm">…</Avatar>
    </ActivityMarker>
    <ActivityContent>…</ActivityContent>
  </ActivityItem>
</ActivityFeed>`

const DENSITY_CODE = `// "comfortable" (default) or "compact"
<ActivityFeed density="comfortable">…</ActivityFeed>
<ActivityFeed density="compact">…</ActivityFeed>`
