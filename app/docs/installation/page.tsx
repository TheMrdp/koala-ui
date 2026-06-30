import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { InstallCommand } from "@/components/docs/install-command"

export const metadata = {
  title: "Installation",
}

const stepClass =
  "flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-muted-foreground"

const USAGE = `import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Get started</Button>
}`

const MANUAL_DEPS = "npm install clsx tailwind-merge tailwind-variants tw-animate-css"

export default function InstallationPage() {
  return (
    <>
      <DocHeader
        title="Installation"
        description="Add Koala UI to your React app. Run the one-time setup, add the components you need, then import them like any local module."
      />

      <p className="text-pretty text-muted-foreground">
        Koala UI ships <strong className="text-foreground">owned source</strong>: the CLI copies
        each component into your repo under{" "}
        <code className="font-mono text-sm">components/ui/</code>, so you own and edit the code, no
        runtime dependency on us. The fastest path is the CLI; you can also copy any component by
        hand from its docs page.
      </p>

      <DocSection title="Quick start">
        <ol className="mt-6 flex flex-col gap-8">
          <li className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className={stepClass} aria-hidden>
                1
              </span>
              <h3 className="font-medium">Run the setup</h3>
            </div>
            <div className="ml-9 flex flex-col gap-3">
              <p className="text-pretty text-muted-foreground">
                <code className="font-mono text-sm">init</code> authenticates the CLI against the
                registry, drops the shared helpers (<code className="font-mono text-sm">cn</code>,
                the <code className="font-mono text-sm">tv</code> wrapper,{" "}
                <code className="font-mono text-sm">createContext</code>) into{" "}
                <code className="font-mono text-sm">lib/</code>, and wires the Tailwind theme
                tokens into your <code className="font-mono text-sm">globals.css</code>.
              </p>
              <InstallCommand command="koalaui init" />
            </div>
          </li>

          <li className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className={stepClass} aria-hidden>
                2
              </span>
              <h3 className="font-medium">Add components</h3>
            </div>
            <div className="ml-9 flex flex-col gap-3">
              <p className="text-pretty text-muted-foreground">
                Pass one or more component slugs. Each lands in{" "}
                <code className="font-mono text-sm">components/ui/&lt;name&gt;/</code> with its
                dependencies pulled along.
              </p>
              <InstallCommand command="koalaui add button card dialog" />
            </div>
          </li>

          <li className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className={stepClass} aria-hidden>
                3
              </span>
              <h3 className="font-medium">Import and use</h3>
            </div>
            <div className="ml-9 flex flex-col gap-3">
              <p className="text-pretty text-muted-foreground">
                Import from the path the CLI wrote to. Every component is a named export, themed
                through tokens, and accepts <code className="font-mono text-sm">className</code>.
              </p>
              <CodeSnippet lang="tsx" code={USAGE} />
            </div>
          </li>
        </ol>
      </DocSection>

      <DocSection title="Manual installation">
        <p className="mt-4 text-pretty text-muted-foreground">
          Prefer to copy by hand? Install the shared dependencies once, then copy any component
          source straight from its docs page.
        </p>
        <ol className="mt-6 flex flex-col gap-8">
          <li className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className={stepClass} aria-hidden>
                1
              </span>
              <h3 className="font-medium">Install the dependencies</h3>
            </div>
            <div className="ml-9">
              <CodeSnippet lang="bash" code={MANUAL_DEPS} />
            </div>
          </li>
          <li className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className={stepClass} aria-hidden>
                2
              </span>
              <h3 className="font-medium">Copy the source</h3>
            </div>
            <p className="ml-9 text-pretty text-muted-foreground">
              Paste a component into{" "}
              <code className="font-mono text-sm">components/ui/&lt;name&gt;/</code> and point its
              imports at your project: components pull{" "}
              <code className="font-mono text-sm">cn</code> from{" "}
              <code className="font-mono text-sm">lib/utils</code>, the{" "}
              <code className="font-mono text-sm">tv</code> wrapper from{" "}
              <code className="font-mono text-sm">lib/tv</code>, and (for multi-part components){" "}
              <code className="font-mono text-sm">createContext</code> from{" "}
              <code className="font-mono text-sm">lib/create-context</code>.
            </p>
          </li>
        </ol>
      </DocSection>

      <DocSection title="Requirements">
        <ul className="mt-4 flex flex-col gap-2 text-pretty text-muted-foreground">
          <li>
            <strong className="text-foreground">React 19</strong> — components use{" "}
            <code className="font-mono text-sm">ref</code> as a regular prop (no{" "}
            <code className="font-mono text-sm">forwardRef</code>).
          </li>
          <li>
            <strong className="text-foreground">Tailwind CSS v4</strong> — tokens live in the{" "}
            <code className="font-mono text-sm">@theme</code> layer of your{" "}
            <code className="font-mono text-sm">globals.css</code>.
          </li>
          <li>
            <strong className="text-foreground">Next.js App Router</strong> recommended — the
            named-export, server-component-friendly structure is built for it, but any React 19 +
            Tailwind v4 setup works.
          </li>
        </ul>
      </DocSection>
    </>
  )
}
