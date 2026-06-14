"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogStepper,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InputRoot, InputField, InputLabel } from "@/components/ui/input"
import {
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperSeparator,
} from "@/components/ui/stepper"

const STEPS = [
  { title: "Details", description: "Name your project" },
  { title: "Members", description: "Invite your team" },
  { title: "Review", description: "Confirm and create" },
] as const

/** A multi-step create flow: DialogStepper as the wizard header, body swapped per step. */
export function WizardDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [submitting, setSubmitting] = React.useState(false)
  const isLast = step === STEPS.length
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      // Reset once the close animation has settled, so the body doesn't flash back mid-exit.
      timer.current = setTimeout(() => {
        setStep(1)
        setSubmitting(false)
      }, 200)
    }
  }

  function create() {
    setSubmitting(true)
    timer.current = setTimeout(() => handleOpenChange(false), 1200)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create project</Button>
      </DialogTrigger>
      <DialogContent size="lg" density="compact">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>{STEPS[step - 1].description}.</DialogDescription>
        </DialogHeader>

        <DialogStepper value={step} onValueChange={setStep}>
          {STEPS.map((s, i) => {
            const n = i + 1
            return (
              <StepperItem key={s.title} step={n} disabled={submitting || n > step} loading={submitting && n === step}>
                <StepperTrigger>
                  <StepperIndicator />
                  <StepperTitle>{s.title}</StepperTitle>
                </StepperTrigger>
                {n < STEPS.length && <StepperSeparator />}
              </StepperItem>
            )
          })}
        </DialogStepper>

        <div className="grid gap-3">
          {step === 1 && (
            <>
              <div className="grid gap-1.5">
                <InputLabel htmlFor="wz-name">Project name</InputLabel>
                <InputRoot>
                  <InputField id="wz-name" placeholder="Apollo" autoFocus />
                </InputRoot>
              </div>
              <div className="grid gap-1.5">
                <InputLabel htmlFor="wz-key">Project key</InputLabel>
                <InputRoot>
                  <InputField id="wz-key" placeholder="APO" />
                </InputRoot>
              </div>
            </>
          )}
          {step === 2 && (
            <div className="grid gap-1.5">
              <InputLabel htmlFor="wz-invite">Invite by email</InputLabel>
              <InputRoot>
                <InputField id="wz-invite" type="email" placeholder="teammate@acme.com" autoFocus />
              </InputRoot>
            </div>
          )}
          {step === 3 && (
            <p className="text-sm text-pretty text-muted-foreground">
              You&apos;re all set. Create <span className="font-medium text-foreground">Apollo</span>{" "}
              and invite your team — you can change everything later in settings.
            </p>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="ghost"
            disabled={step === 1 || submitting}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
          >
            <ArrowLeft /> Back
          </Button>
          {isLast ? (
            <Button onClick={create} disabled={submitting}>
              {submitting ? "Creating…" : "Create project"}
            </Button>
          ) : (
            <Button onClick={() => setStep((s) => s + 1)}>
              Next <ArrowRight />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
