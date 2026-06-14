import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

import {
  CheckboxDemo,
  StatesDemo,
  SizesDemo,
  WithLabelDemo,
  GroupDemo,
} from "./checkbox-examples-demo"

export const metadata = { title: "Checkbox" }

export default function CheckboxDocsPage() {
  return (
    <>
      <DocHeader
        title="Checkbox"
        description="A control for a binary or tri-state choice, built on Radix Checkbox. Supports the indeterminate state a “select all” needs — it's the same control the DataTable uses for row selection."
      />

      <ComponentPreview code={HERO_CODE}>
        <CheckboxDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="checkbox" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Checkbox } from "@/components/ui/checkbox"

export function Example() {
  return (
    <label htmlFor="terms" className="flex items-center gap-2.5">
      <Checkbox id="terms" defaultChecked />
      Accept terms and conditions
    </label>
  )
}`}
        />
      </DocSection>

      <DocSection title="States">
        <p className="mt-4 text-pretty text-muted-foreground">
          Checked and indeterminate both fill with the primary color; indeterminate shows a
          minus rather than a check. Drive the tri-state by passing{" "}
          <code className="font-mono text-sm">checked=&quot;indeterminate&quot;</code>.
        </p>
        <ComponentPreview code={STATES_CODE}>
          <StatesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">sm</code> (16px) sits inside dense tables;{" "}
          <code className="font-mono text-sm">md</code> (20px) is the default for forms. The
          indicator scales with the box.
        </p>
        <ComponentPreview code={SIZES_CODE}>
          <SizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With a label">
        <p className="mt-4 text-pretty text-muted-foreground">
          Checkbox renders only the box — pair it with a{" "}
          <code className="font-mono text-sm">{`<label htmlFor>`}</code> for an accessible name
          and a larger hit target. With a description, nudge the box to the first line.
        </p>
        <ComponentPreview previewClassName="block" code={WITH_LABEL_CODE}>
          <WithLabelDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Select all (indeterminate)">
        <p className="mt-4 text-pretty text-muted-foreground">
          A parent checkbox reads <code className="font-mono text-sm">true</code> when all
          children are checked, <code className="font-mono text-sm">&quot;indeterminate&quot;</code>{" "}
          on a partial selection, and <code className="font-mono text-sm">false</code> when none
          are — the same pattern the{" "}
          <a href="/docs/components/data-table" className="underline underline-offset-4">DataTable</a>{" "}
          header uses.
        </p>
        <ComponentPreview previewClassName="block" code={GROUP_CODE}>
          <GroupDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}

const HERO_CODE = `<label htmlFor="terms" className="flex items-center gap-2.5">
  <Checkbox id="terms" defaultChecked />
  Accept terms and conditions
</label>`

const STATES_CODE = `<Checkbox checked={false} />
<Checkbox checked />
<Checkbox checked="indeterminate" />
<Checkbox disabled />
<Checkbox disabled checked />`

const SIZES_CODE = `<Checkbox size="sm" defaultChecked />
<Checkbox size="md" defaultChecked />`

const WITH_LABEL_CODE = `<div className="flex items-start gap-3">
  <Checkbox id="notify" defaultChecked className="mt-0.5" />
  <label htmlFor="notify" className="flex flex-col gap-0.5">
    <span className="text-sm font-medium">Email notifications</span>
    <span className="text-sm text-muted-foreground">
      Get notified when someone mentions you.
    </span>
  </label>
</div>`

const GROUP_CODE = `const ITEMS = ["Engineering", "Design", "Marketing"]
const [checked, setChecked] = useState({ Design: true })

const selected = ITEMS.filter((i) => checked[i])
const allChecked = selected.length === ITEMS.length
const someChecked = selected.length > 0 && !allChecked

<Checkbox
  checked={allChecked ? true : someChecked ? "indeterminate" : false}
  onCheckedChange={(v) =>
    setChecked(Object.fromEntries(ITEMS.map((i) => [i, !!v])))
  }
/>`
