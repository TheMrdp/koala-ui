import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from "@/components/ui/stepper"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { NavigableStepperDemo, WizardDialogDemo } from "./stepper-demos"

export const metadata = {
  title: "Stepper",
}

export default function StepperDocsPage() {
  return (
    <>
      <DocHeader
        title="Stepper"
        description="A progress indicator for sequential flows — onboarding, checkout, and multi-step dialogs. Each step derives completed/active/inactive from a single active value; the connecting line fills as you advance, with no JS measurement."
      />

      <ComponentPreview
        previewClassName="py-14"
        code={`const [step, setStep] = React.useState(1)

<Stepper value={step} onValueChange={setStep}>
  {["Your details", "Company", "Confirm"].map((title, i) => (
    <StepperItem key={title} step={i + 1}>
      <StepperTrigger>
        <StepperIndicator />
        <StepperTitle>{title}</StepperTitle>
      </StepperTrigger>
      {i < 2 && <StepperSeparator />}
    </StepperItem>
  ))}
</Stepper>

{/* drive setStep from your Back / Next buttons */}`}
      >
        <NavigableStepperDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="stepper" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`"use client"

import * as React from "react"
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperSeparator,
} from "@/components/ui/stepper"

export function Example() {
  const [step, setStep] = React.useState(1)
  return (
    <Stepper value={step} onValueChange={setStep}>
      <StepperItem step={1}>
        <StepperTrigger>
          <StepperIndicator />
          <StepperTitle>Account</StepperTitle>
        </StepperTrigger>
        <StepperSeparator />
      </StepperItem>
      <StepperItem step={2}>
        <StepperTrigger>
          <StepperIndicator />
          <StepperTitle>Confirm</StepperTitle>
        </StepperTrigger>
      </StepperItem>
    </Stepper>
  )
}`}
        />
      </DocSection>

      <DocSection title="Orientation">
        <p className="mt-4 text-pretty text-muted-foreground">
          Orientation is set on the root. <code className="font-mono text-sm">horizontal</code>{" "}
          lays steps in a row with a flexible connector; <code className="font-mono text-sm">vertical</code>{" "}
          stacks them with the connector running down the indicator column.
        </p>
        <ComponentPreview
          previewClassName="gap-16 py-14"
          code={`<Stepper defaultValue={2}>
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Cart</StepperTitle>
    </StepperTrigger>
    <StepperSeparator />
  </StepperItem>
  <StepperItem step={2}>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Shipping</StepperTitle>
    </StepperTrigger>
    <StepperSeparator />
  </StepperItem>
  <StepperItem step={3}>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Payment</StepperTitle>
    </StepperTrigger>
  </StepperItem>
</Stepper>

<Stepper defaultValue={2} orientation="vertical">
  {/* …same items… */}
</Stepper>`}
        >
          <Stepper defaultValue={2} className="w-full max-w-md">
            <StepperItem step={1}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Cart</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={2}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Shipping</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={3}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Payment</StepperTitle>
              </StepperTrigger>
            </StepperItem>
          </Stepper>

          <Stepper defaultValue={2} orientation="vertical">
            <StepperItem step={1}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Cart</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={2}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Shipping</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={3}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Payment</StepperTitle>
              </StepperTrigger>
            </StepperItem>
          </Stepper>
        </ComponentPreview>
      </DocSection>

      <DocSection title="With descriptions">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pair each <code className="font-mono text-sm">StepperTitle</code> with a{" "}
          <code className="font-mono text-sm">StepperDescription</code> in a vertical stack.
          Vertical orientation gives the supporting copy room to breathe.
        </p>
        <ComponentPreview
          previewClassName="py-12"
          code={`<Stepper defaultValue={2} orientation="vertical">
  <StepperItem step={1}>
    <StepperTrigger>
      <StepperIndicator />
      <span className="flex flex-col gap-0.5">
        <StepperTitle>Account</StepperTitle>
        <StepperDescription>Your login details</StepperDescription>
      </span>
    </StepperTrigger>
    <StepperSeparator />
  </StepperItem>
  {/* …more items… */}
</Stepper>`}
        >
          <Stepper defaultValue={2} orientation="vertical">
            <StepperItem step={1}>
              <StepperTrigger>
                <StepperIndicator />
                <span className="flex flex-col gap-0.5">
                  <StepperTitle>Account</StepperTitle>
                  <StepperDescription>Your login details</StepperDescription>
                </span>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={2}>
              <StepperTrigger>
                <StepperIndicator />
                <span className="flex flex-col gap-0.5">
                  <StepperTitle>Profile</StepperTitle>
                  <StepperDescription>Name, photo, and bio</StepperDescription>
                </span>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={3}>
              <StepperTrigger>
                <StepperIndicator />
                <span className="flex flex-col gap-0.5">
                  <StepperTitle>Review</StepperTitle>
                  <StepperDescription>Confirm and finish</StepperDescription>
                </span>
              </StepperTrigger>
            </StepperItem>
          </Stepper>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Density retunes the indicator size, connector geometry, and text — without touching
          color or radius. <code className="font-mono text-sm">comfortable</code> suits onboarding;{" "}
          <code className="font-mono text-sm">compact</code> fits dense app UI and dialogs.
        </p>
        <ComponentPreview
          previewClassName="gap-12 py-12"
          code={`<Stepper defaultValue={2} density="comfortable">…</Stepper>
<Stepper defaultValue={2} density="compact">…</Stepper>`}
        >
          <Stepper defaultValue={2} density="comfortable" className="w-full max-w-md">
            <StepperItem step={1}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Plan</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={2}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Billing</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={3}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Done</StepperTitle>
              </StepperTrigger>
            </StepperItem>
          </Stepper>

          <Stepper defaultValue={2} density="compact" className="w-full max-w-md">
            <StepperItem step={1}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Plan</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={2}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Billing</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={3}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Done</StepperTitle>
              </StepperTrigger>
            </StepperItem>
          </Stepper>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Loading & disabled">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">loading</code> on the active step to swap its
          number for a spinner while it validates or submits. Mark unreachable steps{" "}
          <code className="font-mono text-sm">disabled</code> to block selection and mute them.
        </p>
        <ComponentPreview
          previewClassName="py-14"
          code={`<Stepper defaultValue={2}>
  <StepperItem step={1}>…</StepperItem>
  <StepperItem step={2} loading>…</StepperItem>
  <StepperItem step={3} disabled>…</StepperItem>
</Stepper>`}
        >
          <Stepper defaultValue={2} className="w-full max-w-md">
            <StepperItem step={1}>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Details</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={2} loading>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Verifying</StepperTitle>
              </StepperTrigger>
              <StepperSeparator />
            </StepperItem>
            <StepperItem step={3} disabled>
              <StepperTrigger>
                <StepperIndicator />
                <StepperTitle>Finish</StepperTitle>
              </StepperTrigger>
            </StepperItem>
          </Stepper>
        </ComponentPreview>
      </DocSection>

      <DocSection title="In a dialog">
        <p className="mt-4 text-pretty text-muted-foreground">
          The headline use case. Reach for{" "}
          <code className="font-mono text-sm">DialogStepper</code> (from{" "}
          <code className="font-mono text-sm">@/components/ui/dialog</code>) — it places the stepper
          full-bleed with a divider beneath and inherits the dialog&apos;s density. Drive its{" "}
          <code className="font-mono text-sm">value</code> from the dialog&apos;s own step state and
          swap the body per step; future steps are{" "}
          <code className="font-mono text-sm">disabled</code> so the user can&apos;t skip ahead.
        </p>
        <ComponentPreview
          previewClassName="py-12"
          code={`const [step, setStep] = React.useState(1)

<DialogContent size="lg" density="compact">
  <DialogHeader>…</DialogHeader>

  <DialogStepper value={step} onValueChange={setStep}>
    {WIZARD.map((s, i) => (
      <StepperItem key={s.title} step={i + 1} disabled={i + 1 > step}>
        <StepperTrigger>
          <StepperIndicator />
          <StepperTitle>{s.title}</StepperTitle>
        </StepperTrigger>
        {i < WIZARD.length - 1 && <StepperSeparator />}
      </StepperItem>
    ))}
  </DialogStepper>

  {/* swap the body on \`step\`; Back/Next move setStep */}
  <DialogFooter className="sm:justify-between">…</DialogFooter>
</DialogContent>`}
        >
          <WizardDialogDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
