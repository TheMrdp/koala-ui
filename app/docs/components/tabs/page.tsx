import { House, ActivityIcon, Gear } from "@phosphor-icons/react/ssr"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = { title: "Tabs" }

function DemoPanel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

export default function TabsDocsPage() {
  return (
    <>
      <DocHeader
        title="Tabs"
        description="Switch between related panels. Built on Radix Tabs for behavior and a11y, styled with one tv slots recipe. The active state is a single indicator measured in JS and slid with transform."
      />

      <ComponentPreview
        previewClassName="block"
        code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="activity">…</TabsContent>
  <TabsContent value="settings">…</TabsContent>
</Tabs>`}
      >
        <Tabs defaultValue="overview" className="mx-auto w-full max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <DemoPanel>Your project at a glance.</DemoPanel>
          </TabsContent>
          <TabsContent value="activity">
            <DemoPanel>Recent activity across the team.</DemoPanel>
          </TabsContent>
          <TabsContent value="settings">
            <DemoPanel>Manage preferences and access.</DemoPanel>
          </TabsContent>
        </Tabs>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="tabs" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs"

export function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="password">Password panel</TabsContent>
    </Tabs>
  )
}`}
        />
      </DocSection>

      <DocSection title="Pill (default)">
        <ComponentPreview
          previewClassName="block"
          code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="activity">…</TabsContent>
  <TabsContent value="settings">…</TabsContent>
</Tabs>`}
        >
          <Tabs defaultValue="overview" className="mx-auto w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <DemoPanel>Your project at a glance.</DemoPanel>
            </TabsContent>
            <TabsContent value="activity">
              <DemoPanel>Recent activity across the team.</DemoPanel>
            </TabsContent>
            <TabsContent value="settings">
              <DemoPanel>Manage preferences and access.</DemoPanel>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Underline">
        <ComponentPreview
          previewClassName="block"
          code={`<Tabs defaultValue="overview" variant="underline">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  …
</Tabs>`}
        >
          <Tabs defaultValue="overview" variant="underline" className="mx-auto w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <DemoPanel>The bar slides between triggers.</DemoPanel>
            </TabsContent>
            <TabsContent value="activity">
              <DemoPanel>Recent activity across the team.</DemoPanel>
            </TabsContent>
            <TabsContent value="settings">
              <DemoPanel>Manage preferences and access.</DemoPanel>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Folder">
        <ComponentPreview
          previewClassName="block"
          code={`<Tabs defaultValue="overview" variant="folder">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  …
</Tabs>`}
        >
          <Tabs defaultValue="overview" variant="folder" className="mx-auto w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <DemoPanel>Active tab shows a pill background and a sliding underline.</DemoPanel>
            </TabsContent>
            <TabsContent value="activity">
              <DemoPanel>Recent activity across the team.</DemoPanel>
            </TabsContent>
            <TabsContent value="settings">
              <DemoPanel>Manage preferences and access.</DemoPanel>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Icons">
        <ComponentPreview
          previewClassName="block"
          code={`import { House, ActivityIcon, Gear } from "@phosphor-icons/react/ssr"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview"><House />Overview</TabsTrigger>
    <TabsTrigger value="activity"><ActivityIcon />Activity</TabsTrigger>
    <TabsTrigger value="settings"><Gear />Settings</TabsTrigger>
  </TabsList>
  …
</Tabs>`}
        >
          <Tabs defaultValue="overview" className="mx-auto w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview"><House />Overview</TabsTrigger>
              <TabsTrigger value="activity"><ActivityIcon />Activity</TabsTrigger>
              <TabsTrigger value="settings"><Gear />Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <DemoPanel>Your project at a glance.</DemoPanel>
            </TabsContent>
            <TabsContent value="activity">
              <DemoPanel>Recent activity across the team.</DemoPanel>
            </TabsContent>
            <TabsContent value="settings">
              <DemoPanel>Manage preferences and access.</DemoPanel>
            </TabsContent>
          </Tabs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview
          previewClassName="flex-col items-start gap-6"
          code={`<Tabs size="sm" defaultValue="a">…</Tabs>
<Tabs size="md" defaultValue="a">…</Tabs>`}
        >
          {(["sm", "md"] as const).map((s) => (
            <Tabs key={s} size={s} defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">First</TabsTrigger>
                <TabsTrigger value="b">Second</TabsTrigger>
              </TabsList>
            </Tabs>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> tightens the pill chrome for
          application UI - a snugger container and tighter concentric radii, while{" "}
          <code className="font-mono text-sm">size</code> stays the height tier. Set it per
          tabs or for a whole subtree with{" "}
          <code className="font-mono text-sm">DensityProvider</code> - see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-start gap-6"
          code={`<Tabs density="comfortable" defaultValue="a">…</Tabs>
<Tabs density="compact" defaultValue="a">…</Tabs>`}
        >
          {(["comfortable", "compact"] as const).map((d) => (
            <Tabs key={d} density={d} defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">First</TabsTrigger>
                <TabsTrigger value="b">Second</TabsTrigger>
              </TabsList>
            </Tabs>
          ))}
        </ComponentPreview>
      </DocSection>

    </>
  )
}
