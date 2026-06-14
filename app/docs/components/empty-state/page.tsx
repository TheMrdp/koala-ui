import {
  MagnifyingGlass,
  FolderOpen,
  Plus,
  UploadSimple,
  WarningCircle,
  ArrowClockwise,
  CheckCircle,
  Users,
  Bell,
} from "@phosphor-icons/react/ssr"

import {
  EmptyState,
  EmptyStateMedia,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "Empty State",
}

export default function EmptyStateDocsPage() {
  return (
    <>
      <DocHeader
        title="Empty State"
        description="The zero-data, no-results, and first-run placeholder. A tinted icon surface, a balanced title, a readable description, and a primary action — composed from named parts, with soft media tints that re-theme everywhere and a density axis for in-panel use."
      />

      <ComponentPreview
        code={`<EmptyState>
  <EmptyStateMedia>
    <FolderOpen />
  </EmptyStateMedia>
  <EmptyStateTitle>No projects yet</EmptyStateTitle>
  <EmptyStateDescription>
    Create your first project to start organizing work, inviting teammates, and shipping.
  </EmptyStateDescription>
  <EmptyStateActions>
    <Button variant="outline"><UploadSimple /> Import</Button>
    <Button><Plus /> New project</Button>
  </EmptyStateActions>
</EmptyState>`}
      >
        <EmptyState>
          <EmptyStateMedia>
            <FolderOpen />
          </EmptyStateMedia>
          <EmptyStateTitle>No projects yet</EmptyStateTitle>
          <EmptyStateDescription>
            Create your first project to start organizing work, inviting teammates, and
            shipping.
          </EmptyStateDescription>
          <EmptyStateActions>
            <Button variant="outline">
              <UploadSimple /> Import
            </Button>
            <Button>
              <Plus /> New project
            </Button>
          </EmptyStateActions>
        </EmptyState>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="empty-state" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  EmptyState,
  EmptyStateMedia,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { MagnifyingGlass } from "@phosphor-icons/react/ssr"

export function Example() {
  return (
    <EmptyState>
      <EmptyStateMedia>
        <MagnifyingGlass />
      </EmptyStateMedia>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        Try adjusting your search or filters to find what you&apos;re looking for.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="outline">Clear filters</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code>variant</code> prop tints the media surface from a single semantic
          token via opacity — the same soft pattern as Badge — so a search, error, or
          success state stays legible across all four themes. Set it on the root and every
          part picks it up through context.
        </p>
        <ComponentPreview
          previewClassName="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch"
          code={`<EmptyState variant="info">
  <EmptyStateMedia><MagnifyingGlass /></EmptyStateMedia>
  <EmptyStateTitle>No results</EmptyStateTitle>
  <EmptyStateDescription>Nothing matched that search.</EmptyStateDescription>
</EmptyState>

<EmptyState variant="destructive">
  <EmptyStateMedia><WarningCircle /></EmptyStateMedia>
  <EmptyStateTitle>Couldn't load data</EmptyStateTitle>
  <EmptyStateDescription>Something went wrong on our end.</EmptyStateDescription>
  <EmptyStateActions>
    <Button variant="outline"><ArrowClockwise /> Retry</Button>
  </EmptyStateActions>
</EmptyState>

<EmptyState variant="success">
  <EmptyStateMedia><CheckCircle /></EmptyStateMedia>
  <EmptyStateTitle>All caught up</EmptyStateTitle>
  <EmptyStateDescription>You&apos;ve cleared your inbox.</EmptyStateDescription>
</EmptyState>`}
        >
          <EmptyState variant="info">
            <EmptyStateMedia>
              <MagnifyingGlass />
            </EmptyStateMedia>
            <EmptyStateTitle>No results</EmptyStateTitle>
            <EmptyStateDescription>Nothing matched that search.</EmptyStateDescription>
          </EmptyState>
          <EmptyState variant="destructive">
            <EmptyStateMedia>
              <WarningCircle />
            </EmptyStateMedia>
            <EmptyStateTitle>Couldn&apos;t load data</EmptyStateTitle>
            <EmptyStateDescription>Something went wrong on our end.</EmptyStateDescription>
            <EmptyStateActions>
              <Button variant="outline">
                <ArrowClockwise /> Retry
              </Button>
            </EmptyStateActions>
          </EmptyState>
          <EmptyState variant="success">
            <EmptyStateMedia>
              <CheckCircle />
            </EmptyStateMedia>
            <EmptyStateTitle>All caught up</EmptyStateTitle>
            <EmptyStateDescription>You&apos;ve cleared your inbox.</EmptyStateDescription>
          </EmptyState>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>density</code> retunes padding, the media and icon size, the title size,
          and the description measure — never color or the rounded brand corners.{" "}
          <code>comfortable</code> (the default) suits a full page or marketing surface;{" "}
          <code>compact</code> fits an in-panel placeholder. It also reads from a{" "}
          <code>DensityProvider</code>, so an app shell can set it once.
        </p>
        <ComponentPreview
          previewClassName="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch"
          code={`<EmptyState density="comfortable">
  <EmptyStateMedia><Bell /></EmptyStateMedia>
  <EmptyStateTitle>No notifications</EmptyStateTitle>
  <EmptyStateDescription>You&apos;re all caught up — new alerts land here.</EmptyStateDescription>
</EmptyState>

<EmptyState density="compact">
  <EmptyStateMedia><Bell /></EmptyStateMedia>
  <EmptyStateTitle>No notifications</EmptyStateTitle>
  <EmptyStateDescription>You&apos;re all caught up — new alerts land here.</EmptyStateDescription>
</EmptyState>`}
        >
          <EmptyState density="comfortable" className="rounded-xl border border-border">
            <EmptyStateMedia>
              <Bell />
            </EmptyStateMedia>
            <EmptyStateTitle>No notifications</EmptyStateTitle>
            <EmptyStateDescription>
              You&apos;re all caught up — new alerts land here.
            </EmptyStateDescription>
          </EmptyState>
          <EmptyState density="compact" className="rounded-xl border border-border">
            <EmptyStateMedia>
              <Bell />
            </EmptyStateMedia>
            <EmptyStateTitle>No notifications</EmptyStateTitle>
            <EmptyStateDescription>
              You&apos;re all caught up — new alerts land here.
            </EmptyStateDescription>
          </EmptyState>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Without actions">
        <p className="mt-4 text-pretty text-muted-foreground">
          The action row is optional — drop <code>EmptyStateActions</code> for a purely
          informational placeholder.
        </p>
        <ComponentPreview
          code={`<EmptyState variant="primary">
  <EmptyStateMedia><Users /></EmptyStateMedia>
  <EmptyStateTitle>No team members</EmptyStateTitle>
  <EmptyStateDescription>
    Invitations you send will show up here until they&apos;re accepted.
  </EmptyStateDescription>
</EmptyState>`}
        >
          <EmptyState variant="primary">
            <EmptyStateMedia>
              <Users />
            </EmptyStateMedia>
            <EmptyStateTitle>No team members</EmptyStateTitle>
            <EmptyStateDescription>
              Invitations you send will show up here until they&apos;re accepted.
            </EmptyStateDescription>
          </EmptyState>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          Compose from named parts (not <code>EmptyState.Media</code> dot-notation) so they
          survive the RSC server→client boundary.
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-pretty text-muted-foreground">
          <li>
            <code>EmptyState</code> — root. Forwards every native{" "}
            <code>{`<div>`}</code> prop, plus <code>variant</code> (
            <code>default</code>, <code>primary</code>, <code>success</code>,{" "}
            <code>warning</code>, <code>info</code>, <code>destructive</code>),{" "}
            <code>density</code> (<code>comfortable</code> / <code>compact</code>, also read
            from a <code>DensityProvider</code>), and <code>asChild</code>.
          </li>
          <li>
            <code>EmptyStateMedia</code> — the tinted icon surface. Marked{" "}
            <code>aria-hidden</code> (decorative); supports <code>asChild</code>.
          </li>
          <li>
            <code>EmptyStateTitle</code> — the headline (balanced wrapping).
          </li>
          <li>
            <code>EmptyStateDescription</code> — supporting copy, constrained to a readable
            measure.
          </li>
          <li>
            <code>EmptyStateActions</code> — optional row for one or more{" "}
            <code>Button</code>s. Author them secondary-first so the primary action lands on
            the right, matching dialog footers (DOM order is also the tab order).
          </li>
        </ul>
        <p className="mt-4 text-pretty text-muted-foreground">
          Every part accepts <code>className</code>, merged last via the recipe.
        </p>
      </DocSection>
    </>
  )
}
