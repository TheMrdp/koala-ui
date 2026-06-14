import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { UnsavedChangesDemo, FormDialogDemo } from "./unsaved-changes-demo"
import { DialogSizesShowcase } from "./sizes-demo"
import { DialogVariantsShowcase } from "./variants-demo"
import { WizardDialogDemo } from "./wizard-demo"

export const metadata = {
  title: "Dialog",
}

export default function DialogDocsPage() {
  return (
    <>
      <DocHeader
        title="Dialog"
        description="A modal window over the page. Built on Radix Dialog for focus trap, scroll lock, and a11y; styled with one tv slots recipe and animated with interruptible enter/exit."
      />

      <ComponentPreview
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="dialog" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogFooter, DialogTitle, DialogDescription, DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          The patterns the library ships, all composed over the single{" "}
          <code className="font-mono text-sm">dialogVariants</code> recipe. The
          richer patterns add two optional parts: a leading{" "}
          <code className="font-mono text-sm">DialogIcon</code> above the title, and
          a <code className="font-mono text-sm">bordered</code> footer for a
          full-bleed divider with a helper on the left and split actions on the
          right. Each trigger opens a representative dialog.
        </p>
        <ComponentPreview
          code={`{/* Default — neutral, ghost + primary footer */}
<DialogContent>…</DialogContent>

{/* Confirmation — destructive, no close button */}
<DialogContent size="sm" showClose={false}>…</DialogContent>

{/* Compact — tighter padding for application UI */}
<DialogContent density="compact" size="sm">…</DialogContent>

{/* Share — leading icon + composed Input parts */}
<DialogContent>
  <DialogIcon><LinkSimple /></DialogIcon>
  <DialogHeader>…</DialogHeader>
  {/* InputLabel + InputRoot/InputField rows */}
</DialogContent>

{/* Announcement — leading icon, hero, bordered split footer */}
<DialogContent>
  <DialogIcon><Megaphone /></DialogIcon>
  <DialogHeader>…</DialogHeader>
  {/* hero + body */}
  <DialogFooter bordered className="sm:justify-between">
    <span>Need some help?</span>
    <div>{/* Cancel + Create */}</div>
  </DialogFooter>
</DialogContent>`}
        >
          <DialogVariantsShowcase />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Form">
        <p className="mt-4 text-pretty text-muted-foreground">
          Place labelled form fields inside the dialog body - between{" "}
          <code className="font-mono text-sm">DialogHeader</code> and{" "}
          <code className="font-mono text-sm">DialogFooter</code>. Inline
          validation feedback appears below each field on submit.
        </p>
        <ComponentPreview
          code={`function InviteDialog() {
  const nameRef = React.useRef<HTMLInputElement>(null)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [nameError, setNameError] = React.useState("")
  const [emailError, setEmailError] = React.useState("")

  function handleSubmit() {
    if (!name.trim()) { setNameError("Name is required."); return }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address."); return
    }
    // submit…
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Invite member</Button>
      </DialogTrigger>
      <DialogContent
        size="sm"
        onOpenAutoFocus={(e) => {
          // Land focus on the first field instead of the dialog container.
          e.preventDefault()
          nameRef.current?.focus()
        }}
      >
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>
            Enter the details below. An invitation will be sent by email.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <InputLabel htmlFor="name">Full name</InputLabel>
            <InputRoot hasError={!!nameError}>
              <InputField ref={nameRef} id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </InputRoot>
            {nameError && <InputHint hasError>{nameError}</InputHint>}
          </div>
          <div className="grid gap-1.5">
            <InputLabel htmlFor="email">Email address</InputLabel>
            <InputRoot hasError={!!emailError}>
              <InputField id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </InputRoot>
            {emailError && <InputHint hasError>{emailError}</InputHint>}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
        >
          <FormDialogDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Multi-step (wizard)">
        <p className="mt-4 text-pretty text-muted-foreground">
          For create flows that span several screens, drop a{" "}
          <code className="font-mono text-sm">DialogStepper</code> right after the{" "}
          <code className="font-mono text-sm">DialogHeader</code>. It places a{" "}
          <a href="/docs/components/stepper" className="underline underline-offset-4">Stepper</a>{" "}
          full-bleed with a divider beneath, inheriting the dialog&apos;s density. It owns no
          state — drive its <code className="font-mono text-sm">value</code> from your own step
          state, swap the body per step, and move <code className="font-mono text-sm">setStep</code>{" "}
          from Back / Next. Mark future steps <code className="font-mono text-sm">disabled</code> so
          the user can&apos;t skip ahead, and flip the active step to{" "}
          <code className="font-mono text-sm">loading</code> while it submits.
        </p>
        <ComponentPreview
          previewClassName="py-12"
          code={`const [step, setStep] = React.useState(1)

<DialogContent size="lg" density="compact">
  <DialogHeader>
    <DialogTitle>Create project</DialogTitle>
    <DialogDescription>{STEPS[step - 1].description}.</DialogDescription>
  </DialogHeader>

  <DialogStepper value={step} onValueChange={setStep}>
    {STEPS.map((s, i) => (
      <StepperItem key={s.title} step={i + 1} disabled={i + 1 > step}>
        <StepperTrigger>
          <StepperIndicator />
          <StepperTitle>{s.title}</StepperTitle>
        </StepperTrigger>
        {i < STEPS.length - 1 && <StepperSeparator />}
      </StepperItem>
    ))}
  </DialogStepper>

  {step === 1 && <ProjectFields />}
  {step === 2 && <InviteFields />}
  {step === 3 && <ReviewSummary />}

  <DialogFooter className="sm:justify-between">
    <Button variant="ghost" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
      <ArrowLeft /> Back
    </Button>
    {step === STEPS.length
      ? <Button onClick={create}>Create project</Button>
      : <Button onClick={() => setStep((s) => s + 1)}>Next <ArrowRight /></Button>}
  </DialogFooter>
</DialogContent>`}
        >
          <WizardDialogDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">size</code> on{" "}
          <code className="font-mono text-sm">DialogContent</code> caps the <em>max width</em> —
          the dialog still shrinks to fit narrow viewports, so the value is a ceiling, not a fixed
          width. Height always hugs the content; for long bodies, scroll the body rather than the
          whole dialog (see <a href="#scrollable-body" className="underline underline-offset-4">Scrollable body</a>).
          Four steps, each mapping to a Tailwind width token:
        </p>
        <ul className="mt-4 flex flex-col gap-1.5 text-sm text-muted-foreground">
          <li>
            <code className="font-mono text-foreground">sm</code> — <code className="font-mono">max-w-sm</code> (384px). Confirmations and short prompts.
          </li>
          <li>
            <code className="font-mono text-foreground">md</code> — <code className="font-mono">max-w-lg</code> (512px). The <strong>default</strong>; most forms and messages.
          </li>
          <li>
            <code className="font-mono text-foreground">lg</code> — <code className="font-mono">max-w-2xl</code> (672px). Denser forms with side-by-side fields.
          </li>
          <li>
            <code className="font-mono text-foreground">xl</code> — <code className="font-mono">max-w-4xl</code> (896px). Rich content: tables, multi-column layouts.
          </li>
        </ul>
        <p className="mt-4 text-pretty text-muted-foreground">
          The previews below are the real <code className="font-mono text-sm">DialogContent</code>{" "}
          rendered inline (no need to open anything) so you can compare the widths directly:
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch"
          code={`<DialogContent size="sm">…</DialogContent>
<DialogContent size="md">…</DialogContent>  {/* default */}
<DialogContent size="lg">…</DialogContent>
<DialogContent size="xl">…</DialogContent>`}
        >
          <DialogSizesShowcase />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> on{" "}
          <code className="font-mono text-sm">DialogContent</code> tightens padding, gaps and
          the title for application UI; it re-provides itself to the header, body and footer so
          every part stays in sync. Best driven once via{" "}
          <code className="font-mono text-sm">DensityProvider</code> - see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>.
        </p>
        <ComponentPreview
          code={`<DialogContent density="compact">…</DialogContent>`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open compact</Button>
            </DialogTrigger>
            <DialogContent density="compact" size="sm">
              <DialogHeader>
                <DialogTitle>Compact dialog</DialogTitle>
                <DialogDescription>
                  Tighter padding and a 1rem title for dense application UI.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Got it</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Confirmation">
        <p className="mt-4 text-pretty text-muted-foreground">
          A destructive confirmation: no header close button (
          <code className="font-mono text-sm">showClose=&#123;false&#125;</code>) forces an
          explicit choice.
        </p>
        <ComponentPreview
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </DialogTrigger>
  <DialogContent size="sm" showClose={false}>
    <DialogHeader>
      <DialogTitle>Delete account?</DialogTitle>
      <DialogDescription>
        This permanently deletes your account and all data. This cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="destructive">Delete</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete account</Button>
            </DialogTrigger>
            <DialogContent size="sm" showClose={false}>
              <DialogHeader>
                <DialogTitle>Delete account?</DialogTitle>
                <DialogDescription>
                  This permanently deletes your account and all data. This cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Scrollable body">
        <p className="mt-4 text-pretty text-muted-foreground">
          For tall content (terms, changelogs, lists) wrap the body in a{" "}
          <code className="font-mono text-sm">max-h / overflow-y-auto</code> container
          so the header and footer stay pinned while the middle scrolls.
        </p>
        <ComponentPreview
          code={`<DialogContent>
  <DialogHeader>
    <DialogTitle>Terms of service</DialogTitle>
    <DialogDescription>Please read the full terms before accepting.</DialogDescription>
  </DialogHeader>
  {/* Scrollable body */}
  <div className="max-h-96 overflow-y-auto rounded-lg border border-border p-4 text-sm text-muted-foreground [scrollbar-width:thin]">
    {/* …long content… */}
  </div>
  <DialogFooter>
    <DialogClose asChild><Button variant="ghost">Decline</Button></DialogClose>
    <DialogClose asChild><Button>Accept</Button></DialogClose>
  </DialogFooter>
</DialogContent>`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View terms</Button>
            </DialogTrigger>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Terms of service</DialogTitle>
                <DialogDescription>
                  Please read the full terms before accepting.
                </DialogDescription>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto rounded-lg border border-border p-4 text-sm text-muted-foreground [scrollbar-width:thin]">
                <p className="mb-3">
                  By using this service, you agree to be bound by these Terms of
                  Service. Please read them carefully before proceeding.
                </p>
                <p className="mb-3">
                  <strong className="text-foreground">1. Acceptance.</strong>{" "}
                  Your access to and use of the service is conditioned on your
                  acceptance of and compliance with these Terms. These Terms apply
                  to all visitors, users, and others who access or use the Service.
                </p>
                <p className="mb-3">
                  <strong className="text-foreground">2. Accounts.</strong> When
                  you create an account with us, you must provide information that
                  is accurate, complete, and current at all times. Failure to do so
                  constitutes a breach of the Terms, which may result in immediate
                  termination of your account.
                </p>
                <p className="mb-3">
                  <strong className="text-foreground">3. Intellectual property.</strong>{" "}
                  The Service and its original content, features, and functionality
                  are and will remain the exclusive property of the company and its
                  licensors. Our trademarks and trade dress may not be used in
                  connection with any product or service without the prior written
                  consent of the company.
                </p>
                <p className="mb-3">
                  <strong className="text-foreground">4. Termination.</strong> We
                  may terminate or suspend access to our Service immediately,
                  without prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
                <p>
                  <strong className="text-foreground">5. Governing law.</strong>{" "}
                  These Terms shall be governed and construed in accordance with
                  applicable law, without regard to its conflict of law provisions.
                </p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Decline</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Accept</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Unsaved changes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use a controlled{" "}
          <code className="font-mono text-sm">open</code> /{" "}
          <code className="font-mono text-sm">onOpenChange</code> pair and
          intercept{" "}
          <code className="font-mono text-sm">onInteractOutside</code> +{" "}
          <code className="font-mono text-sm">onEscapeKeyDown</code> to guard
          against accidental data loss. When the form is dirty, every close
          attempt - the ✕ button, clicking the scrim, pressing Escape, or the
          Cancel button - opens a nested confirmation dialog instead.
        </p>
        <ComponentPreview
          code={`"use client"

const [open, setOpen] = React.useState(false)
const [discardOpen, setDiscardOpen] = React.useState(false)
const isDirty = title.trim().length > 0 || body.trim().length > 0

function attemptClose() {
  if (isDirty) setDiscardOpen(true)
  else setOpen(false)
}

{/* Main dialog */}
<Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : attemptClose())}>
  <DialogTrigger asChild>
    <Button variant="outline">New post</Button>
  </DialogTrigger>
  <DialogContent
    onInteractOutside={(e) => { e.preventDefault(); attemptClose() }}
    onEscapeKeyDown={(e) => { e.preventDefault(); attemptClose() }}
  >
    {/* form fields */}
    <DialogFooter>
      <Button variant="ghost" onClick={attemptClose}>Cancel</Button>
      <Button onClick={save}>Publish</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Discard confirmation */}
<Dialog open={discardOpen} onOpenChange={setDiscardOpen}>
  <DialogContent size="sm" showClose={false}>
    <DialogHeader>
      <DialogTitle>Discard changes?</DialogTitle>
      <DialogDescription>
        You have unsaved content. Closing now will permanently lose your changes.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setDiscardOpen(false)}>Keep editing</Button>
      <Button variant="destructive" onClick={confirmDiscard}>Discard changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <UnsavedChangesDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
