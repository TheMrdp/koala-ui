"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeSnippet } from "./code-snippet"

/**
 * A package-manager-tabbed command block, the way Tailwind / shadcn docs show install lines.
 * Pass the bare `koalaui …` command; each tab prefixes it with that manager's package runner
 * (`npx`, `pnpm dlx`, `yarn dlx`, `bunx`). Drop one inside a numbered installation step.
 */
const RUNNERS = [
  { value: "npm", label: "npm", run: "npx" },
  { value: "pnpm", label: "pnpm", run: "pnpm dlx" },
  { value: "yarn", label: "yarn", run: "yarn dlx" },
  { value: "bun", label: "bun", run: "bunx" },
] as const

export function InstallCommand({ command }: { command: string }) {
  return (
    <Tabs defaultValue="npm">
      <TabsList>
        {RUNNERS.map((runner) => (
          <TabsTrigger key={runner.value} value={runner.value}>
            {runner.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {RUNNERS.map((runner) => (
        <TabsContent key={runner.value} value={runner.value}>
          <CodeSnippet lang="bash" code={`${runner.run} ${command}`} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
