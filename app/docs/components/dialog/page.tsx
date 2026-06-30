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
import { Faq } from "@/components/docs/faq"
import { UnsavedChangesDemo, FormDialogDemo } from "./unsaved-changes-demo"
import { DialogSizesShowcase } from "./sizes-demo"
import { DialogVariantsShowcase } from "./variants-demo"
import { WizardDialogDemo } from "./wizard-demo"
import {
  FeedbackDialog,
  TwoFactorDialog,
  SelectableCardsDialog,
} from "./figma-patterns-demo"

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
          Every pattern the library ships, all composed over the single{" "}
          <code className="font-mono text-sm">dialogVariants</code> recipe and painted
          inline so you can see them at a glance (these previews are static; the demo at
          the top of the page opens a live, interactive dialog). The richer patterns add two
          optional parts: a leading{" "}
          <code className="font-mono text-sm">DialogIcon</code> above the title, and
          a <code className="font-mono text-sm">bordered</code> footer for a
          full-bleed divider with a helper on the left and split actions on the
          right.
        </p>
        <ComponentPreview
          code={`{/* Default: neutral, ghost + primary footer */}
<DialogContent>…</DialogContent>

{/* Confirmation: destructive, no close button */}
<DialogContent size="sm" showClose={false}>…</DialogContent>

{/* Compact: tighter padding for application UI */}
<DialogContent density="compact" size="sm">…</DialogContent>

{/* Share: leading icon + composed Input parts */}
<DialogContent>
  <DialogIcon><LinkSimple /></DialogIcon>
  <DialogHeader>…</DialogHeader>
  {/* InputLabel + InputRoot/InputField rows */}
</DialogContent>

{/* Announcement: leading icon, hero, bordered split footer */}
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
          Place labelled form fields inside the dialog body, between{" "}
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
          For create flows that span several screens, put a vertical{" "}
          <a href="/docs/components/stepper" className="underline underline-offset-4">Stepper</a>{" "}
          in a left rail (<code className="font-mono text-sm">variant=&quot;solid&quot;</code> gives
          the bold, brand-filled circles) and swap the active step&apos;s form on the right. The
          Stepper owns no state: drive its{" "}
          <code className="font-mono text-sm">value</code> from your own step state and move{" "}
          <code className="font-mono text-sm">setStep</code> from Back / Next. Mark future steps{" "}
          <code className="font-mono text-sm">disabled</code> so the user can&apos;t skip ahead, and
          flip the active step to <code className="font-mono text-sm">loading</code> while it submits.
          Wrap the body in a <code className="font-mono text-sm">Stagger</code> keyed by step so each
          screen&apos;s fields cascade in on the swap, and give it a{" "}
          <code className="font-mono text-sm">min-h</code> so the dialog holds its height instead of
          jumping between steps.
        </p>
        <ComponentPreview
          previewClassName="py-12"
          code={`const [step, setStep] = React.useState(1)

<DialogContent size="lg" density="compact">
  <DialogHeader>
    <DialogTitle>Create project</DialogTitle>
    <DialogDescription>Set up your workspace in a few steps.</DialogDescription>
  </DialogHeader>

  <div className="grid grid-cols-[auto_1fr] items-start gap-8">
    {/* Left rail: vertical stepper with solid, brand-filled indicators and no connectors. */}
    <Stepper value={step} onValueChange={setStep} orientation="vertical"
      variant="solid" density="comfortable" className="pr-2">
      {STEPS.map((s, i) => (
        // No connectors → tighten the per-step reserve for a compact list (a11y hit area intact).
        <StepperItem key={s.title} step={i + 1} disabled={i + 1 > step}
          className="[&:not(:last-child)]:min-h-[2.75rem]">
          <StepperTrigger className="items-center">
            <StepperIndicator />
            <StepperTitle className="font-semibold">{s.title}</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      ))}
    </Stepper>

    {/* key={step} replays the entrance per step; min-h sets the dialog's height. */}
    <Stagger key={step} className="grid min-h-[18rem] content-start gap-3">
      {step === 1 && <ProjectFields />}
      {step === 2 && <InviteFields />}
      {step === 3 && <ReviewSummary />}
    </Stagger>
  </div>

  <DialogFooter bordered className="sm:justify-between">
    <Button variant="ghost" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
      <ArrowLeft /> Back
    </Button>
    {step === STEPS.length
      ? <Button onClick={create} loading={submitting}>Create project</Button>
      : <Button onClick={() => setStep((s) => s + 1)}>Next <ArrowRight /></Button>}
  </DialogFooter>
</DialogContent>`}
        >
          <WizardDialogDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Feedback">
        <p className="mt-4 text-pretty text-muted-foreground">
          A rating prompt: a leading{" "}
          <code className="font-mono text-sm">DialogIcon</code>, a single-select{" "}
          <a href="/docs/components/toggle-group" className="underline underline-offset-4">ToggleGroup</a>{" "}
          for the score, and a{" "}
          <a href="/docs/components/textarea" className="underline underline-offset-4">Textarea</a>{" "}
          with a live character count. The primary action stays disabled until a score is picked, and
          the <code className="font-mono text-sm">bordered</code> footer carries a help link on the
          left with the actions on the right.
        </p>
        <ComponentPreview
          code={`const [rating, setRating] = React.useState("")

<DialogContent size="sm">
  <DialogIcon><Star /></DialogIcon>
  <DialogHeader>
    <DialogTitle>Help us improve!</DialogTitle>
    <DialogDescription>Share your experience with us so we can make it better.</DialogDescription>
  </DialogHeader>

  <div className="grid gap-4">
    <div className="grid gap-2">
      <Label id="rating-label" required>Rate your experience</Label>
      <ToggleGroup type="single" size="sm" value={rating} onValueChange={setRating}
        aria-labelledby="rating-label" className="w-full">
        {["1", "2", "3", "4", "5"].map((n) => (
          <ToggleGroupItem key={n} value={n} aria-label={\`\${n} out of 5\`} className="flex-1">{n}</ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
    <div className="grid gap-2">
      <TextareaLabel htmlFor="feedback-message">Your message</TextareaLabel>
      <TextareaRoot>
        <TextareaField id="feedback-message" placeholder="Write your message here..." rows={4} maxLength={500} showCount />
      </TextareaRoot>
    </div>
  </div>

  <DialogFooter bordered className="sm:items-center sm:justify-between">
    {/* help link on the left */}
    <div className="flex flex-col-reverse gap-2 sm:flex-row">
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <DialogClose asChild><Button disabled={!rating}>Submit</Button></DialogClose>
    </div>
  </DialogFooter>
</DialogContent>`}
        >
          <FeedbackDialog />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Two-factor (2FA)">
        <p className="mt-4 text-pretty text-muted-foreground">
          A verification flow: a live{" "}
          <a href="/docs/components/qr-code" className="underline underline-offset-4">QR Code</a>{" "}
          on a nested surface (so it takes a <strong>concentric</strong> radius one step inside
          the dialog) above an{" "}
          <a href="/docs/components/otp-input" className="underline underline-offset-4">OTP Input</a>.
          Focus lands straight on the first code slot via{" "}
          <code className="font-mono text-sm">onOpenAutoFocus</code>, and{" "}
          <code className="font-mono text-sm">Verify</code> enables only once all six digits are in.
        </p>
        <ComponentPreview
          code={`const [code, setCode] = React.useState("")

<DialogContent size="sm" onOpenAutoFocus={(e) => e.preventDefault()}>
  <DialogIcon><ShieldCheck /></DialogIcon>
  <DialogHeader>
    <DialogTitle>Enable two-factor authentication</DialogTitle>
    <DialogDescription>
      Scan the QR code with your authentication app, then enter the 6-digit code to verify and activate 2FA.
    </DialogDescription>
  </DialogHeader>

  {/* Concentric radius: rounded-lg panel nested inside the rounded-xl content */}
  <div className="flex items-center justify-center rounded-lg border border-border bg-accent p-6">
    <QRCode value="otpauth://totp/Koala:esteban?secret=...&issuer=Koala" level="Q"
      size={176} margin={2} className="rounded-md p-3 shadow-xs" />
  </div>

  <OTPInput label="Introduce code" required length={6} autoFocus value={code} onChange={setCode} />

  <DialogFooter bordered className="sm:items-center sm:justify-between">
    {/* help link on the left */}
    <div className="flex flex-col-reverse gap-2 sm:flex-row">
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <DialogClose asChild><Button disabled={code.length < 6}>Verify</Button></DialogClose>
    </div>
  </DialogFooter>
</DialogContent>`}
        >
          <TwoFactorDialog />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Selectable cards">
        <p className="mt-4 text-pretty text-muted-foreground">
          A single choice from a small set, rendered as cards rather than bare dots:{" "}
          wrap each option in a <code className="font-mono text-sm">&lt;label&gt;</code> around a{" "}
          <a href="/docs/components/radio-group" className="underline underline-offset-4">RadioGroup</a>{" "}
          item and let CSS{" "}
          <code className="font-mono text-sm">:has([data-state=checked])</code> light the selected
          card (border, tint, and the leading icon) with no extra state. The whole card is the hit
          target.
        </p>
        <ComponentPreview
          code={`const [theme, setTheme] = React.useState("light")

const THEMES = [
  { value: "light", title: "Light theme", hint: "For a clean and minimal look.", icon: Sun },
  { value: "dark", title: "Dark theme", hint: "Perfect for working in low-light conditions.", icon: Moon },
  { value: "system", title: "System", hint: "Automatically adapts to your device's settings.", icon: Desktop },
]

<DialogContent size="sm">
  <DialogIcon><Palette /></DialogIcon>
  <DialogHeader>
    <DialogTitle>Change theme</DialogTitle>
    <DialogDescription>Choose your preferred theme to customize your experience.</DialogDescription>
  </DialogHeader>

  <div className="grid gap-2">
    <Label id="theme-label" required>Choose your theme</Label>
    <RadioGroup value={theme} onValueChange={setTheme} aria-labelledby="theme-label">
      {THEMES.map(({ value, title, hint, icon: Icon }) => (
        <label key={value} htmlFor={\`theme-\${value}\`}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3.5 transition-colors duration-fast ease-out has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:[&_[data-slot=theme-card-icon]]:text-primary">
          <Icon data-slot="theme-card-icon" aria-hidden className="size-5 shrink-0 text-muted-foreground transition-colors duration-fast ease-out" />
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="text-sm font-medium leading-none">{title}</span>
            <span className="text-sm text-muted-foreground">{hint}</span>
          </span>
          <RadioGroupItem id={\`theme-\${value}\`} value={value} />
        </label>
      ))}
    </RadioGroup>
  </div>

  <DialogFooter bordered className="sm:items-center sm:justify-between">
    {/* help link on the left */}
    <div className="flex flex-col-reverse gap-2 sm:flex-row">
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <DialogClose asChild><Button>Apply</Button></DialogClose>
    </div>
  </DialogFooter>
</DialogContent>`}
        >
          <SelectableCardsDialog />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">size</code> on{" "}
          <code className="font-mono text-sm">DialogContent</code> caps the <em>max width</em>.
          The dialog still shrinks to fit narrow viewports, so the value is a ceiling, not a fixed
          width. Height always hugs the content; for long bodies, scroll the body rather than the
          whole dialog (see <a href="#scrollable-body" className="underline underline-offset-4">Scrollable body</a>).
          Four steps, each mapping to a Tailwind width token:
        </p>
        <ul className="mt-4 flex flex-col gap-1.5 text-sm text-muted-foreground">
          <li>
            <code className="font-mono text-foreground">sm</code>: <code className="font-mono">max-w-sm</code> (384px). Confirmations and short prompts.
          </li>
          <li>
            <code className="font-mono text-foreground">md</code>: <code className="font-mono">max-w-lg</code> (512px). The <strong>default</strong>; most forms and messages.
          </li>
          <li>
            <code className="font-mono text-foreground">lg</code>: <code className="font-mono">max-w-2xl</code> (672px). Denser forms with side-by-side fields.
          </li>
          <li>
            <code className="font-mono text-foreground">xl</code>: <code className="font-mono">max-w-4xl</code> (896px). Rich content: tables, multi-column layouts.
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
          <code className="font-mono text-sm">DensityProvider</code>; see{" "}
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
          attempt (the ✕ button, clicking the scrim, pressing Escape, or the
          Cancel button) opens a nested confirmation dialog instead.
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

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I reach for Dialog versus Drawer or Popover?",
              a: "Use Dialog for a focused, blocking task that needs a focus trap and scrim, like a confirmation, a short form, or terms you must accept. Reach for Drawer when the content is a side panel or a long task on mobile, and Popover for a small non-modal surface anchored to a trigger that does not lock the page.",
            },
            {
              q: "What does the size prop on DialogContent actually control?",
              a: "size sets the max width only (sm is max-w-sm, md is max-w-lg by default, lg is max-w-2xl, xl is max-w-4xl); the dialog still shrinks to fit narrow viewports, so it is a ceiling, not a fixed width. Height always hugs the content, so for long bodies scroll an inner max-h container rather than the whole dialog.",
            },
            {
              q: "How do I compose the named parts, and why import them instead of using dot notation?",
              a: "Nest DialogHeader (holding DialogTitle and DialogDescription) and DialogFooter inside DialogContent, with DialogTrigger and DialogClose using asChild to wrap your own buttons. Each part is a named export rather than Dialog.Header because dot-notation accessors break the server-to-client boundary in React Server Components.",
            },
            {
              q: "How do I land focus on the first field instead of the dialog container when it opens?",
              a: "Radix moves focus onto the content container on open for screen-reader announcement, so pass onOpenAutoFocus to DialogContent, call e.preventDefault(), and focus your input ref instead. Escape and clicking the scrim close the dialog for free, and a focus trap plus scroll lock come from Radix.",
            },
            {
              q: "How does density flow through the dialog, and how should I set it?",
              a: "density on DialogContent tightens padding, gaps and the title size, and the content resolves it once and re-provides it so DialogHeader, body and DialogFooter all stay in sync without prop-drilling. Prefer driving it once via DensityProvider so the dialog matches the surrounding application UI.",
            },
            {
              q: "Why does Escape or clicking outside still close my dialog when I have unsaved changes?",
              a: "By default those dismissals are uncontrolled, so wire a controlled open and onOpenChange pair and intercept onInteractOutside and onEscapeKeyDown, calling e.preventDefault() to route every close attempt through your guard. For an explicit-choice confirmation, also set showClose={false} so there is no quiet escape hatch in the top-right corner.",
            },
          ]}
        />
      </DocSection>

    </>
  )
}
