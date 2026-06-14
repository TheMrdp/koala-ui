import { OTPInput } from "@/components/ui/otp-input"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "OTP Input",
}

export default function OTPInputDocsPage() {
  return (
    <>
      <DocHeader
        title="OTP Input"
        description="A numeric one-time-passcode field. Auto-advances on entry, distributes pasted codes across slots, and supports SMS autofill on mobile. Configure the digit count, size, and error state with plain props."
      />

      <ComponentPreview
        code={`<OTPInput
  length={6}
  placeholder="0"
  label="Verification code"
  hint="Enter the 6-digit code we sent to your phone."
/>`}
      >
        <OTPInput
          length={6}
          placeholder="0"
          label="Verification code"
          hint="Enter the 6-digit code we sent to your phone."
        />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="otp-input" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { OTPInput } from "@/components/ui/otp-input"

export function Example() {
  return (
    <OTPInput
      length={6}
      onComplete={(code) => verify(code)}
    />
  )
}`}
        />
      </DocSection>

      <DocSection title="Length">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>length</code> sets the number of digit slots — defaults to{" "}
          <code>6</code>. Four-digit PINs and longer codes use the same
          component; paste a full code into any slot and it spreads across the
          rest.
        </p>
        <ComponentPreview
          code={`<OTPInput length={4} placeholder="0" />

<OTPInput length={6} placeholder="0" />`}
        >
          <div className="flex w-full flex-col items-center gap-5">
            <OTPInput length={4} label="4 digits" placeholder="0" />
            <OTPInput length={6} label="6 digits" placeholder="0" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Label & hint">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code>label</code> to caption the field and <code>hint</code> for
          helper text below it. The label wires up as the group&rsquo;s{" "}
          <code>aria-labelledby</code> (clicking it focuses the first slot) and
          the hint as its <code>aria-describedby</code>. Add <code>required</code>{" "}
          for a destructive asterisk.
        </p>
        <ComponentPreview
          code={`<OTPInput
  length={6}
  required
  label="Verification code"
  hint="Check your authenticator app."
/>`}
        >
          <OTPInput
            length={6}
            required
            label="Verification code"
            hint="Check your authenticator app."
          />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Three sizes — <code>sm</code> (40 px slots), <code>md</code> (48 px,
          the default), and <code>lg</code> (56 px). Each stays at or above the
          40 px minimum touch target.
        </p>
        <ComponentPreview
          code={`<OTPInput size="sm" length={4} label="Small" placeholder="0" />

<OTPInput size="md" length={4} label="Medium" placeholder="0" />

<OTPInput size="lg" length={4} label="Large" placeholder="0" />`}
        >
          <div className="flex w-full flex-col items-center gap-5">
            <OTPInput size="sm" length={4} label="Small" placeholder="0" />
            <OTPInput size="md" length={4} label="Medium" placeholder="0" />
            <OTPInput size="lg" length={4} label="Large" placeholder="0" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Separators">
        <p className="mt-4 text-pretty text-muted-foreground">
          Split the slots into groups with <code>separator</code>:{" "}
          <code>&quot;dash&quot;</code> draws a short divider line,{" "}
          <code>&quot;dot&quot;</code> renders a centered <code>·</code>, or pass
          any node for a custom mark. Groups default to two even halves; override
          with <code>groupSize</code>.
        </p>
        <ComponentPreview
          code={`<OTPInput length={6} separator="dash" placeholder="0" />

<OTPInput length={6} separator="dot" placeholder="0" />

<OTPInput length={6} separator="dash" groupSize={2} placeholder="0" />`}
        >
          <div className="flex w-full flex-col items-center gap-5">
            <OTPInput length={6} separator="dash" label="Dash" placeholder="0" />
            <OTPInput length={6} separator="dot" label="Dot" placeholder="0" />
            <OTPInput
              length={6}
              separator="dash"
              groupSize={2}
              label="Groups of 2"
              placeholder="0"
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Validation & errors">
        <p className="mt-4 text-pretty text-muted-foreground">
          Input is numeric-only by construction — non-digit characters (and
          non-numeric pasted content) are stripped before they ever reach a
          slot, so you never validate the format yourself. For a{" "}
          <em>wrong code</em>, pass <code>hasError</code> to switch every slot to
          the destructive border and ring and set <code>aria-invalid</code>;
          pair it with a message below the field. Use <code>onComplete</code> to
          run verification the moment the last slot fills, and{" "}
          <code>onChange</code> for keystroke-level state. When{" "}
          <code>hasError</code> is set, the <code>hint</code> turns destructive
          so it doubles as the error message.
        </p>
        <ComponentPreview
          code={`<OTPInput
  length={6}
  hasError
  defaultValue="123456"
  label="Verification code"
  hint="That code didn't match. Try again."
/>`}
        >
          <OTPInput
            length={6}
            hasError
            defaultValue="123456"
            label="Verification code"
            hint="That code didn’t match. Try again."
          />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled">
        <ComponentPreview code={`<OTPInput length={6} disabled defaultValue="12" />`}>
          <OTPInput length={6} disabled defaultValue="12" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>OTPInput</code> is a single self-contained component. It is
          controllable (<code>value</code> + <code>onChange</code>) or
          uncontrolled (<code>defaultValue</code>), and forwards any extra props
          to the wrapper <code>div</code>.
        </p>
        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <div>
            <code className="text-foreground">length</code> — number of digit
            slots. Default <code>6</code>.
          </div>
          <div>
            <code className="text-foreground">size</code> — <code>sm</code> /{" "}
            <code>md</code> / <code>lg</code>. Default <code>md</code>.
          </div>
          <div>
            <code className="text-foreground">hasError</code> — destructive
            border/ring and <code>aria-invalid</code> on every slot.
          </div>
          <div>
            <code className="text-foreground">disabled</code> — dims the field
            and blocks interaction.
          </div>
          <div>
            <code className="text-foreground">label</code> — caption above the
            slots, wired as the group&rsquo;s <code>aria-labelledby</code>.
          </div>
          <div>
            <code className="text-foreground">hint</code> — helper text below
            the slots; turns destructive when <code>hasError</code> is set.
          </div>
          <div>
            <code className="text-foreground">required</code> — appends a
            destructive asterisk to the label.
          </div>
          <div>
            <code className="text-foreground">value</code> /{" "}
            <code className="text-foreground">defaultValue</code> — the
            concatenated digits, controlled or uncontrolled.
          </div>
          <div>
            <code className="text-foreground">onChange(value)</code> — fires on
            every edit with the concatenated digits.
          </div>
          <div>
            <code className="text-foreground">onComplete(value)</code> — fires
            once when the final empty slot is filled.
          </div>
          <div>
            <code className="text-foreground">name</code> — renders a hidden
            input so the value submits with a native form.
          </div>
          <div>
            <code className="text-foreground">placeholder</code> — single
            character shown in empty slots.
          </div>
          <div>
            <code className="text-foreground">separator</code> —{" "}
            <code>dash</code> / <code>dot</code> / custom node drawn between
            groups of slots.
          </div>
          <div>
            <code className="text-foreground">groupSize</code> — slots per group
            before a separator. Default <code>Math.ceil(length / 2)</code>.
          </div>
          <div>
            <code className="text-foreground">slotClassName</code> — class
            applied to each digit slot.
          </div>
        </div>
      </DocSection>
    </>
  )
}
