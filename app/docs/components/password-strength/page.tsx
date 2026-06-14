import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  PasswordStrengthDemo,
  PasswordStrengthRequirementsDemo,
  PasswordStrengthFieldDemo,
  PasswordStrengthCustomDemo,
} from "./demos"

export const metadata = {
  title: "Password Strength",
}

export default function PasswordStrengthDocsPage() {
  return (
    <>
      <DocHeader
        title="Password Strength"
        description="A live strength meter for password fields - a segmented bar that climbs red → green as the password gets stronger, a one-word verdict, and an optional requirements checklist. It scores the value against a rule set you control and stays a separate concern from the input, so it drops in below any PasswordInput."
      />

      <ComponentPreview
        code={`const [value, setValue] = React.useState("")

<PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
<PasswordStrength value={value}>
  <PasswordStrengthMeter />
  <div className="flex items-center justify-between gap-2">
    <span className="text-sm text-muted-foreground">Password strength</span>
    <PasswordStrengthLabel placeholder="—" />
  </div>
</PasswordStrength>`}
      >
        <PasswordStrengthDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="password-strength" />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Hold the password in state and hand the same value to both the{" "}
          <code>PasswordInput</code> and <code>PasswordStrength</code>. The root
          scores the value against its rule set and exposes the result to the
          parts through context - compose <code>PasswordStrengthMeter</code>,{" "}
          <code>PasswordStrengthLabel</code>, and{" "}
          <code>PasswordStrengthList</code> in any arrangement.
        </p>
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`"use client"
import * as React from "react"
import { PasswordInput } from "@/components/ui/input"
import {
  PasswordStrength,
  PasswordStrengthMeter,
  PasswordStrengthLabel,
} from "@/components/ui/password-strength"

export function Example() {
  const [value, setValue] = React.useState("")
  return (
    <>
      <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
      <PasswordStrength value={value}>
        <PasswordStrengthMeter />
        <PasswordStrengthLabel placeholder="—" />
      </PasswordStrength>
    </>
  )
}`}
        />
      </DocSection>

      <DocSection title="With requirements">
        <p className="mt-4 text-pretty text-muted-foreground">
          Add <code>PasswordStrengthList</code> to spell out the policy. Each
          requirement cross-fades from a dot to a check the moment the password
          satisfies it, so the user always knows what is left.
        </p>
        <ComponentPreview
          code={`<PasswordStrength value={value}>
  <PasswordStrengthMeter />
  <PasswordStrengthList />
</PasswordStrength>`}
        >
          <PasswordStrengthRequirementsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Inside a Field">
        <p className="mt-4 text-pretty text-muted-foreground">
          It composes straight into a <code>Field</code>, sitting where the hint
          would - the label and input keep their auto-wiring while the meter
          reports on the value below them.
        </p>
        <ComponentPreview
          code={`<Field>
  <FieldLabel>Password</FieldLabel>
  <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
  <PasswordStrength value={value}>
    <PasswordStrengthMeter />
  </PasswordStrength>
</Field>`}
        >
          <PasswordStrengthFieldDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Custom policy">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code>rules</code> to replace the default policy. Each rule is an{" "}
          <code>{`{ id, label, test }`}</code> - the meter normalises however many
          you supply onto its four segments, and the list renders one row per
          rule.
        </p>
        <ComponentPreview
          code={`const corporateRules = [
  { id: "length", label: "At least 12 characters", test: (v) => v.length >= 12 },
  { id: "case", label: "Upper & lowercase letters", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: "number", label: "At least one number", test: (v) => /\\d/.test(v) },
  { id: "symbol", label: "At least one symbol (!@#$…)", test: (v) => /[^A-Za-z0-9]/.test(v) },
  { id: "no-spaces", label: "No spaces", test: (v) => v.length > 0 && !/\\s/.test(v) },
]

<PasswordStrength value={value} rules={corporateRules}>
  <div className="flex items-center justify-between gap-2">
    <PasswordStrengthMeter className="max-w-[60%]" />
    <PasswordStrengthLabel placeholder="—" />
  </div>
  <PasswordStrengthList />
</PasswordStrength>`}
        >
          <PasswordStrengthCustomDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
