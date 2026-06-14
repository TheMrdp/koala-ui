import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { DismissibleDemo } from "./dismissible-demo"

export const metadata = {
  title: "Alert",
}

export default function AlertDocsPage() {
  return (
    <>
      <DocHeader
        title="Alert"
        description="An inline status banner for page-level messages, validation summaries, and contextual feedback. Five semantic variants, optional icon, actions, and a dismiss button."
      />

      <ComponentPreview
        code={`<Alert variant="success">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Deployment successful</AlertTitle>
    <AlertDescription>
      Your application has been deployed to production.
    </AlertDescription>
  </AlertContent>
</Alert>`}
      >
        <div className="w-full max-w-lg">
          <Alert variant="success">
            <AlertIcon />
            <AlertContent>
              <AlertTitle>Deployment successful</AlertTitle>
              <AlertDescription>
                Your application has been deployed to production.
              </AlertDescription>
            </AlertContent>
          </Alert>
        </div>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="alert" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertActions,
} from "@/components/ui/alert"

export function Example() {
  return (
    <Alert variant="info">
      <AlertIcon />
      <AlertContent>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>This action cannot be undone.</AlertDescription>
      </AlertContent>
    </Alert>
  )
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          Five semantic variants using soft tints derived from a single token
          (<code className="font-mono text-sm">--success</code>,{" "}
          <code className="font-mono text-sm">--warning</code>, etc.), so they
          re-theme across all four Koala themes automatically.
        </p>
        <ComponentPreview
          code={`<Alert variant="default">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Default</AlertTitle>
    <AlertDescription>A neutral, non-semantic message.</AlertDescription>
  </AlertContent>
</Alert>
<Alert variant="info">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Info</AlertTitle>
    <AlertDescription>Informational context for the user.</AlertDescription>
  </AlertContent>
</Alert>
<Alert variant="success">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>The operation completed successfully.</AlertDescription>
  </AlertContent>
</Alert>
<Alert variant="warning">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>Review before proceeding.</AlertDescription>
  </AlertContent>
</Alert>
<Alert variant="destructive">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
  </AlertContent>
</Alert>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="default">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>A neutral, non-semantic message.</AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="info">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>Informational context for the user.</AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="success">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>The operation completed successfully.</AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="warning">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Review before proceeding.</AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="destructive">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </AlertContent>
            </Alert>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview
          code={`<Alert variant="info" size="sm">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Small alert</AlertTitle>
    <AlertDescription>Compact size for dense UIs.</AlertDescription>
  </AlertContent>
</Alert>
<Alert variant="info" size="md">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Medium alert</AlertTitle>
    <AlertDescription>Default size for most contexts.</AlertDescription>
  </AlertContent>
</Alert>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="info" size="sm">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Small alert</AlertTitle>
                <AlertDescription>Compact size for dense UIs.</AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="info" size="md">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Medium alert</AlertTitle>
                <AlertDescription>Default size for most contexts.</AlertDescription>
              </AlertContent>
            </Alert>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With icon">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">AlertIcon</code> auto-selects the
          matching Phosphor icon for the current variant when no children are given.
          Pass children to use a custom icon instead.
        </p>
        <ComponentPreview
          code={`{/* Auto icon from variant */}
<Alert variant="warning">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Auto icon</AlertTitle>
  </AlertContent>
</Alert>

{/* Custom icon */}
<Alert variant="warning">
  <AlertIcon><Rocket weight="fill" /></AlertIcon>
  <AlertContent>
    <AlertTitle>Custom icon</AlertTitle>
  </AlertContent>
</Alert>

{/* No icon */}
<Alert variant="warning">
  <AlertContent>
    <AlertTitle>No icon</AlertTitle>
  </AlertContent>
</Alert>`}
        >
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Alert variant="warning">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Auto icon from variant</AlertTitle>
              </AlertContent>
            </Alert>
            <Alert variant="warning">
              <AlertContent>
                <AlertTitle>No icon</AlertTitle>
                <AlertDescription>Omit AlertIcon entirely to go icon-free.</AlertDescription>
              </AlertContent>
            </Alert>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With actions">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use <code className="font-mono text-sm">AlertActions</code> inside{" "}
          <code className="font-mono text-sm">AlertContent</code> to add a row of
          action buttons below the description.
        </p>
        <ComponentPreview
          code={`<Alert variant="warning">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Unsaved changes</AlertTitle>
    <AlertDescription>
      You have unsaved changes that will be lost if you leave.
    </AlertDescription>
    <AlertActions>
      <Button size="sm" variant="outline">Discard</Button>
      <Button size="sm">Save changes</Button>
    </AlertActions>
  </AlertContent>
</Alert>`}
        >
          <div className="w-full max-w-lg">
            <Alert variant="warning">
              <AlertIcon />
              <AlertContent>
                <AlertTitle>Unsaved changes</AlertTitle>
                <AlertDescription>
                  You have unsaved changes that will be lost if you leave.
                </AlertDescription>
                <AlertActions>
                  <Button size="sm" variant="outline">Discard</Button>
                  <Button size="sm">Save changes</Button>
                </AlertActions>
              </AlertContent>
            </Alert>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Dismissible">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">onDismiss</code> to render a
          close button. The component is uncontrolled - the consumer manages
          visibility. Use{" "}
          <code className="font-mono text-sm">dismissLabel</code> to provide a
          screen-reader accessible label (defaults to{" "}
          <code className="font-mono text-sm">&quot;Dismiss&quot;</code>).
        </p>
        <ComponentPreview
          code={`const [open, setOpen] = React.useState(true)

{open && (
  <Alert variant="info" onDismiss={() => setOpen(false)}>
    <AlertIcon />
    <AlertContent>
      <AlertTitle>New update available</AlertTitle>
      <AlertDescription>Version 2.4.0 is ready to install.</AlertDescription>
    </AlertContent>
  </Alert>
)}`}
        >
          <DismissibleDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Alert</code> forwards all native{" "}
          <code className="font-mono text-sm">{`<div>`}</code> props and adds{" "}
          <code className="font-mono text-sm">variant</code> (
          <code className="font-mono text-sm">
            default | success | warning | destructive | info
          </code>
          ), <code className="font-mono text-sm">size</code> (
          <code className="font-mono text-sm">sm | md</code>),{" "}
          <code className="font-mono text-sm">onDismiss</code>, and{" "}
          <code className="font-mono text-sm">dismissLabel</code>. The root renders
          with <code className="font-mono text-sm">role=&quot;alert&quot;</code> for
          screen-reader announcements. Compose content with{" "}
          <code className="font-mono text-sm">AlertIcon</code>,{" "}
          <code className="font-mono text-sm">AlertContent</code>,{" "}
          <code className="font-mono text-sm">AlertTitle</code>,{" "}
          <code className="font-mono text-sm">AlertDescription</code>, and{" "}
          <code className="font-mono text-sm">AlertActions</code> - all accept{" "}
          <code className="font-mono text-sm">className</code> for overrides.
        </p>
      </DocSection>
    </>
  )
}
