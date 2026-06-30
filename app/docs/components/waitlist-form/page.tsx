import { ComponentPreview } from "@/components/docs/component-preview"
import { PremiumCode } from "@/components/docs/premium-code"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import { WaitlistFormDemo } from "./demos"

export const metadata = { title: "Waitlist Form" }

export default function WaitlistFormDocsPage() {
  return (
    <>
      <DocHeader
        title="Waitlist Form"
        description="A centered waitlist block: a headline, a one-row email capture, and a social-proof footer with overlapping avatars and a running count. On submit it flips to a confirmed state. It owns its email and status, so wire onJoin to your list."
      />

      <ComponentPreview
        locked
        code={`<WaitlistForm count={1284} onJoin={(email) => join(email)} />`}
      >
        <WaitlistFormDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="waitlist-form" />
      </DocSection>

      <DocSection title="Usage">
        <PremiumCode className="mt-4" />
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">WaitlistForm</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              Composes{" "}
              <a href="/docs/components/input" className="underline underline-offset-4">Input</a>,{" "}
              <a href="/docs/components/button" className="underline underline-offset-4">Button</a>, and{" "}
              <a href="/docs/components/avatar" className="underline underline-offset-4">Avatar</a>.
              Forwards all <code className="font-mono text-sm">&lt;div&gt;</code> props.
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">onJoin</code>:{" "}
                <code className="font-mono text-sm">(email: string) =&gt; void | Promise&lt;void&gt;</code>.
              </li>
              <li>
                <code className="font-mono text-sm">count</code>: people already joined, shown
                beside the avatars (<code className="font-mono text-sm">tabular-nums</code>).
              </li>
              <li>
                <code className="font-mono text-sm">avatars</code>:{" "}
                <code className="font-mono text-sm">{`{ src?, fallback, alt? }[]`}</code> for the
                proof stack.
              </li>
              <li>
                <code className="font-mono text-sm">badge</code>,{" "}
                <code className="font-mono text-sm">title</code>,{" "}
                <code className="font-mono text-sm">description</code>,{" "}
                <code className="font-mono text-sm">placeholder</code>,{" "}
                <code className="font-mono text-sm">action</code>: override the copy.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "How do I connect the form to my list?", a: "Wire `onJoin`, which is called with the entered email on a valid submit. It accepts `(email: string) => void | Promise<void>`; the form owns its own email and status, so all you do is hand the email to your backend or email provider." },
            { q: "Does it show a loading spinner while my submit runs?", a: "Yes, if you return a promise from `onJoin`. The form awaits it to drive the spinner, then flips to its confirmed success state once it resolves." },
            { q: "How do I customize the avatars and the joined count?", a: "Pass `count` for the running number shown beside the stack (rendered with `tabular-nums` so it does not reflow), and `avatars` as an array of `{ src?, fallback, alt? }` for the social-proof stack. It composes Avatar, Input, and Button under the hood." },
            { q: "How do I change the headline and button copy?", a: "Override the copy props: `badge`, `title`, `description`, `placeholder`, and `action` (the join button label). Pass `badge={null}` to hide the pill above the headline entirely." },
            { q: "How does spacing change with density?", a: "The `density` prop sets the padding, outer gap, and title size: `compact` (16px) is the default and `comfortable` is 24px. If you omit it the form falls back to the nearest DensityProvider." },
            { q: "Why does the nested email input blend into the card?", a: "The root declares `[--surface:var(--card)]` so the nested Input reads the card color instead of painting a `--background` block. This is the surface contract; keep it if you restyle the root so the input keeps blending with the panel." },
          ]}
        />
      </DocSection>
    </>
  )
}
