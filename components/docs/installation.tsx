"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeSnippet } from "./code-snippet"

/**
 * Installation — the "CLI or manually" block every component page carries, modeled on
 * AlignUI/Untitled UI: a registry one-liner (CLI) and the copy-the-source steps (Manual).
 * Koala ships source in-repo, so Manual is the source of truth; the CLI tab mirrors the
 * structure the references use. Drop it inside a `<DocSection title="Installation">`.
 */

const stepClass =
  "flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-muted-foreground"

interface InstallationProps {
  /** Component slug — the folder under `components/ui/` and the CLI `add` target. */
  component: string
  /** Dependency install command shown in the Manual tab. */
  dependencies?: string
}

export function Installation({
  component,
  dependencies = "npm install radix-ui tailwind-variants tailwind-merge",
}: InstallationProps) {
  return (
    <Tabs defaultValue="cli" className="mt-4">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>

      <TabsContent value="cli">
        <CodeSnippet
          lang="bash"
          code={`# One-time setup (tokens + lib helpers)\nnpx koalaui init\n\n# Add this component (its dependencies come along)\nnpx koalaui add ${component}`}
        />
      </TabsContent>

      <TabsContent value="manual">
        <ol className="flex flex-col gap-5">
          <li className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className={stepClass} aria-hidden>
                1
              </span>
              <p className="text-pretty text-muted-foreground">Install the dependencies.</p>
            </div>
            <div className="ml-9">
              <CodeSnippet lang="bash" code={dependencies} />
            </div>
          </li>
          <li className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className={stepClass} aria-hidden>
                2
              </span>
              <p className="text-pretty text-muted-foreground">
                Copy the source into{" "}
                <code className="font-mono text-sm">components/ui/{component}/</code> and adjust
                the import paths to your project. Components pull{" "}
                <code className="font-mono text-sm">cn</code> from{" "}
                <code className="font-mono text-sm">lib/utils</code>, the{" "}
                <code className="font-mono text-sm">tv</code> wrapper from{" "}
                <code className="font-mono text-sm">lib/tv</code>, and — for multi-part
                components — <code className="font-mono text-sm">createContext</code> from{" "}
                <code className="font-mono text-sm">lib/create-context</code>.
              </p>
            </div>
          </li>
        </ol>
      </TabsContent>
    </Tabs>
  )
}
