import { Check } from "@phosphor-icons/react/ssr"

import { CodeSnippet } from "@/components/docs/code-snippet"
import { Section, SectionHeading } from "@/components/landing/section"

const INSTALL = `# add components straight into your project
npx koalaui add button card dialog

# they land as editable source you own
components/ui/button/button.tsx`

const USAGE = `import { Button } from "@/components/ui/button"

export function Cta() {
  return <Button size="lg">Get started</Button>
}`

const POINTS = [
  "Source copied into your repo, not a black-box package",
  "No runtime dependency you cannot read or edit",
  "Built on Radix primitives and Tailwind v4 tokens",
  "Free tier needs no auth, PRO is token-gated",
]

/** The CLI + source-ownership story. Replaces the live site's Figma/Webflow sync section. */
export function InstallCli() {
  return (
    <Section id="install">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading
            centered={false}
            eyebrow="Install"
            title="One command. You own the code."
            description="The koalaui CLI copies real component source into your project. Tweak any recipe, and it still matches the rest of the system."
          />
          <ul className="flex flex-col gap-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check weight="bold" className="size-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <CodeSnippet code={INSTALL} lang="bash" filename="Terminal" dots />
          <CodeSnippet code={USAGE} lang="tsx" filename="cta.tsx" />
        </div>
      </div>
    </Section>
  )
}
