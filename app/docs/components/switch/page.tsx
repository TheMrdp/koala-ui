import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  SwitchDemo,
  StatesDemo,
  SettingsRowDemo,
  ControlledDemo,
} from "./switch-examples-demo"

export const metadata = { title: "Switch" }

export default function SwitchDocsPage() {
  return (
    <>
      <DocHeader
        title="Switch"
        description="A toggle for an instant, self-applying boolean, built on Radix Switch. Use it for settings that take effect immediately (notifications, airplane mode); reach for a Checkbox when the choice is submitted with a form."
      />

      <ComponentPreview code={HERO_CODE}>
        <SwitchDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="switch" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Switch } from "@/components/ui/switch"

export function Example() {
  return (
    <label htmlFor="airplane" className="flex items-center gap-2.5">
      <Switch id="airplane" defaultChecked />
      Airplane mode
    </label>
  )
}`}
        />
      </DocSection>

      <DocSection title="States">
        <p className="mt-4 text-pretty text-muted-foreground">
          Off rests on the <code className="font-mono text-sm">input</code> fill; on slides the
          thumb across a <code className="font-mono text-sm">brand</code> (accent) track. The thumb
          carries a shadow so it reads on both states in every theme.
        </p>
        <ComponentPreview code={STATES_CODE}>
          <StatesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Controlled">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drive the switch from state with{" "}
          <code className="font-mono text-sm">checked</code> and{" "}
          <code className="font-mono text-sm">onCheckedChange</code>, or leave it uncontrolled
          with <code className="font-mono text-sm">defaultChecked</code>.
        </p>
        <ComponentPreview code={CONTROLLED_CODE}>
          <ControlledDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="In a settings list">
        <p className="mt-4 text-pretty text-muted-foreground">
          The common shell: a label and description on the left, the switch trailing right. The
          whole row is the label, so the full width is the hit target.
        </p>
        <ComponentPreview previewClassName="block" code={SETTINGS_CODE}>
          <SettingsRowDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "When should I use a Switch instead of a Checkbox?", a: "Use a Switch for an instant, self-applying boolean that takes effect immediately, like notifications or airplane mode. Reach for a Checkbox when the choice is only submitted later with a form." },
            { q: "How do I control a Switch from state?", a: "Drive it with `checked` and `onCheckedChange`, both passed straight through to Radix Switch. Leave it uncontrolled with `defaultChecked` if you do not need to own the value." },
            { q: "The Switch renders no label. How do I give it an accessible name?", a: "It deliberately renders only the control, so wrap it in a `<label htmlFor>` matching the switch's `id`. That also makes the whole row a hit target, which is the pattern used in the settings list example." },
            { q: "What does the static prop do?", a: "It neutralizes the tactile scale-on-press animation (the `active:scale-[0.96]`) for places where that motion would distract. The visual track and thumb are unchanged." },
            { q: "The track is only 20px tall. Is the tap target really that small?", a: "No. A transparent pseudo-element extends the vertical click area to 40px without changing the visual, so the control stays comfortably tappable while looking compact." },
          ]}
        />
      </DocSection>

    </>
  )
}

const HERO_CODE = `<label htmlFor="airplane" className="flex items-center gap-2.5">
  <Switch id="airplane" defaultChecked />
  Airplane mode
</label>`

const STATES_CODE = `<Switch checked={false} />
<Switch checked />
<Switch disabled />
<Switch disabled checked />`

const CONTROLLED_CODE = `const [enabled, setEnabled] = useState(true)

<Switch checked={enabled} onCheckedChange={setEnabled} />`

const SETTINGS_CODE = `<label htmlFor="notifications" className="flex items-start gap-3 p-4">
  <BellSimple className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
  <div className="flex flex-1 flex-col gap-0.5">
    <span className="text-sm font-medium leading-none">Push notifications</span>
    <span className="text-sm text-muted-foreground">
      Get notified when someone mentions you or replies to a thread.
    </span>
  </div>
  <Switch id="notifications" defaultChecked className="mt-0.5" />
</label>`
