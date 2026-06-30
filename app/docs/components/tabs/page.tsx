import { House, ActivityIcon, Gear } from "@phosphor-icons/react/ssr"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

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

      <DocSection title="Line">
        <ComponentPreview
          previewClassName="block"
          code={`<Tabs defaultValue="overview" variant="line">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  …
</Tabs>`}
        >
          <Tabs defaultValue="overview" variant="line" className="mx-auto w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <DemoPanel>No container, just the active label and a bar that lights up in the accent color.</DemoPanel>
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

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "How are TabsTrigger and TabsContent wired together?", a: "Each `TabsTrigger` and its matching `TabsContent` share the same `value` string, and the active tab comes from `defaultValue` (uncontrolled) or `value` with `onValueChange` (controlled). It is Radix Tabs underneath, so they pair purely by value." },
            { q: "What is the difference between the pill, folder, and line variants?", a: "`pill` (the default) is a contained segmented control with a sliding background. `folder` keeps a pill background on the active tab plus a sliding bar on a bottom rule. `line` drops the container entirely and shows only the accent-colored underline bar." },
            { q: "How is the difference between size and density?", a: "`size` (`sm` or `md`) sets the height and text tier of the triggers, while `density` tightens the pill chrome, the container padding and concentric radii, for application UI without changing the height. You can set density per Tabs or for a subtree via `DensityProvider`." },
            { q: "How does the active indicator slide?", a: "A single indicator element is measured in JS (offset box of the active trigger) and moved with `transform`. It re-measures on selection change, resize, and font shifts, and the transition only switches on after the first paint so it never animates in from the origin on load." },
            { q: "Do I get keyboard navigation for free?", a: "Yes. Because Tabs is built on Radix Tabs you get arrow-key roving focus, Home and End, and the correct tab and tabpanel ARIA roles without any extra wiring." },
            { q: "How do I add an icon to a trigger?", a: "Drop a Phosphor icon as a child of `TabsTrigger` alongside the label. The recipe already sizes any nested svg to 16px and spaces it from the text, so no extra classes are needed." },
          ]}
        />
      </DocSection>

    </>
  )
}
