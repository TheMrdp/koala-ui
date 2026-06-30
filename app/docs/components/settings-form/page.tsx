import { ComponentPreview } from "@/components/docs/component-preview"
import { PremiumCode } from "@/components/docs/premium-code"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import { SettingsFormDemo } from "./demos"

export const metadata = { title: "Settings Form" }

export default function SettingsFormDocsPage() {
  return (
    <>
      <DocHeader
        title="Settings Form"
        description="An account-profile editing block: an avatar with change and remove controls, a name row, a prefixed username, email, and a bio with a live count, closed by a Cancel and Save footer. It owns its field state and confirms inline once saved."
      />

      <ComponentPreview
        locked
        previewClassName="items-start"
        code={`<SettingsForm defaultValues={user} onSave={(data) => save(data)} />`}
      >
        <SettingsFormDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="settings-form" />
      </DocSection>

      <DocSection title="Usage">
        <PremiumCode className="mt-4" />
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">SettingsForm</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              Composes{" "}
              <a href="/docs/components/avatar" className="underline underline-offset-4">Avatar</a>,{" "}
              <a href="/docs/components/field" className="underline underline-offset-4">Field</a>,{" "}
              <a href="/docs/components/input" className="underline underline-offset-4">Input</a>, and{" "}
              <a href="/docs/components/textarea" className="underline underline-offset-4">Textarea</a>.
              The root is a <code className="font-mono text-sm">&lt;form&gt;</code> that forwards all
              its props.
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">defaultValues</code>:{" "}
                <code className="font-mono text-sm">{`Partial<{ firstName, lastName, username, email, bio }>`}</code>.
              </li>
              <li>
                <code className="font-mono text-sm">onSave</code>:{" "}
                <code className="font-mono text-sm">(data: SettingsFormData) =&gt; void | Promise&lt;void&gt;</code>;{" "}
                <code className="font-mono text-sm">onCancel</code>:{" "}
                <code className="font-mono text-sm">() =&gt; void</code>.
              </li>
              <li>
                <code className="font-mono text-sm">avatarSrc</code>,{" "}
                <code className="font-mono text-sm">usernamePrefix</code> (default{" "}
                <code className="font-mono text-sm">&quot;koala.ui/&quot;</code>),{" "}
                <code className="font-mono text-sm">title</code>,{" "}
                <code className="font-mono text-sm">description</code>.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "When should I use SettingsForm versus building my own form?", a: "Reach for `SettingsForm` when you need the standard account-profile editing block: avatar with change/remove, name, a prefixed username, email, and a bio with a live count, closed by a Cancel and Save footer. It owns its field state and confirms inline once saved, so you do not hand-wire those pieces." },
            { q: "How do I seed and read the form's values?", a: "Pass `defaultValues` (a `Partial` of `{ firstName, lastName, username, email, bio }`) to prefill the fields, and handle `onSave`, which receives the full `SettingsFormData`. `onSave` may return a Promise, so the block can show its saving state while you persist." },
            { q: "What does usernamePrefix do?", a: "`usernamePrefix` renders a static prefix before the username input (defaulting to `koala.ui/`), so the row reads as a full handle. Override it with your own domain or namespace." },
            { q: "How do I customize the heading and the avatar?", a: "Set `title` and `description` to change the block's heading copy, and `avatarSrc` to seed the current avatar image used by the change and remove controls." },
            { q: "What components does it compose, and can I restyle it?", a: "The root is a `<form>` that composes `Avatar`, `Field`, `Input`, and `Textarea`, so it inherits their theming and accessibility. It forwards all `<form>` props and accepts `className` for layout tweaks, but the internal field set is fixed." },
          ]}
        />
      </DocSection>
    </>
  )
}
