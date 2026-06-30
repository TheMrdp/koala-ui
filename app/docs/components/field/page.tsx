import { Field, FieldLabel, FieldHint, FieldRow } from "@/components/ui/field"
import { FieldDialogDemo } from "./field-dialog-demo"
import {
  InputRoot,
  InputField,
  PasswordInput,
} from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

export const metadata = {
  title: "Field",
}

export default function FieldDocsPage() {
  return (
    <>
      <DocHeader
        title="Field"
        description="The wrapper that turns any control into a labelled form field. Field generates the id, htmlFor, and aria-describedby wiring for you and cascades error/disabled state to the control inside, so a field is a label, a control, and an optional hint, with nothing to wire by hand."
      />

      <ComponentPreview
        code={`<Field>
  <FieldLabel>Email</FieldLabel>
  <InputRoot>
    <InputField placeholder="you@example.com" type="email" />
  </InputRoot>
  <FieldHint>We'll only use it for account notifications.</FieldHint>
</Field>`}
      >
        <Field className="max-w-sm">
          <FieldLabel>Email</FieldLabel>
          <InputRoot>
            <InputField placeholder="you@example.com" type="email" />
          </InputRoot>
          <FieldHint>We&apos;ll only use it for account notifications.</FieldHint>
        </Field>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="field" />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drop a control between <code>FieldLabel</code> and <code>FieldHint</code>.
          You never touch <code>id</code>, <code>htmlFor</code>, or{" "}
          <code>aria-describedby</code> - <code>Field</code> generates them with{" "}
          <code>useId</code> and hands them to the control through context.
          Clicking the label focuses the control, and screen readers announce the
          hint.
        </p>
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { InputRoot, InputField } from "@/components/ui/input"

export function Example() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <InputRoot>
        <InputField type="email" />
      </InputRoot>
      <FieldHint>We'll only use it for account notifications.</FieldHint>
    </Field>
  )
}`}
        />
      </DocSection>

      <DocSection title="Required & error">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code>required</code> to append a destructive asterisk to the label.
          Set <code>hasError</code> on the <code>Field</code> - it cascades to the
          control’s border, sets <code>aria-invalid</code>, and turns the hint into
          the destructive error message. You set it in one place, not on every part.
        </p>
        <ComponentPreview
          code={`<Field required>
  <FieldLabel>Email</FieldLabel>
  <InputRoot>
    <InputField defaultValue="wrong@" type="email" />
  </InputRoot>
</Field>

<Field hasError required>
  <FieldLabel>Email</FieldLabel>
  <InputRoot>
    <InputField defaultValue="wrong@" type="email" />
  </InputRoot>
  <FieldHint>Enter a valid email address.</FieldHint>
</Field>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Field required>
              <FieldLabel>Email</FieldLabel>
              <InputRoot>
                <InputField defaultValue="wrong@" type="email" />
              </InputRoot>
            </Field>
            <Field hasError required>
              <FieldLabel>Email</FieldLabel>
              <InputRoot>
                <InputField defaultValue="wrong@" type="email" />
              </InputRoot>
              <FieldHint>Enter a valid email address.</FieldHint>
            </Field>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Any control">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>Field</code> is control-agnostic. Because Input, Select, and
          PasswordInput all forward native props, the same wrapper labels any of
          them - the wiring lands on the right element automatically.
        </p>
        <ComponentPreview
          code={`<Field>
  <FieldLabel>Country</FieldLabel>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="es">Spain</SelectItem>
      <SelectItem value="fr">France</SelectItem>
      <SelectItem value="de">Germany</SelectItem>
    </SelectContent>
  </Select>
</Field>

<Field>
  <FieldLabel>Password</FieldLabel>
  <PasswordInput placeholder="Create a password" />
  <FieldHint>At least 8 characters.</FieldHint>
</Field>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Field>
              <FieldLabel>Country</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <PasswordInput placeholder="Create a password" />
              <FieldHint>At least 8 characters.</FieldHint>
            </Field>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Two fields per row">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>FieldRow</code> places sibling fields side by side and stacks them
          on narrow viewports - the answer to <em>Name · Surname</em> pairs.
          It is pure layout, so it composes with any number of fields.
        </p>
        <ComponentPreview
          code={`<FieldRow>
  <Field>
    <FieldLabel>First name</FieldLabel>
    <InputRoot><InputField placeholder="Ada" /></InputRoot>
  </Field>
  <Field>
    <FieldLabel>Last name</FieldLabel>
    <InputRoot><InputField placeholder="Lovelace" /></InputRoot>
  </Field>
</FieldRow>`}
        >
          <FieldRow className="w-full max-w-md">
            <Field>
              <FieldLabel>First name</FieldLabel>
              <InputRoot>
                <InputField placeholder="Ada" />
              </InputRoot>
            </Field>
            <Field>
              <FieldLabel>Last name</FieldLabel>
              <InputRoot>
                <InputField placeholder="Lovelace" />
              </InputRoot>
            </Field>
          </FieldRow>
        </ComponentPreview>
      </DocSection>

      <DocSection title="A whole form">
        <p className="mt-4 text-pretty text-muted-foreground">
          Stack fields in a <code>form</code> with a consistent gap, reach for{" "}
          <code>FieldRow</code> where two values belong together, and let each{" "}
          <code>Field</code> own its own wiring. This is a full registration form -
          name pair, email, country, and a password pair - with nothing wired by
          hand.
        </p>
        <ComponentPreview
          code={`<form className="flex flex-col gap-5">
  <FieldRow>
    <Field required>
      <FieldLabel>First name</FieldLabel>
      <InputRoot><InputField placeholder="Ada" /></InputRoot>
    </Field>
    <Field required>
      <FieldLabel>Last name</FieldLabel>
      <InputRoot><InputField placeholder="Lovelace" /></InputRoot>
    </Field>
  </FieldRow>

  <Field required>
    <FieldLabel>Email</FieldLabel>
    <InputRoot><InputField placeholder="ada@example.com" type="email" /></InputRoot>
    <FieldHint>We'll send a confirmation link here.</FieldHint>
  </Field>

  <Field required>
    <FieldLabel>Country</FieldLabel>
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">Spain</SelectItem>
        <SelectItem value="fr">France</SelectItem>
        <SelectItem value="de">Germany</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
      </SelectContent>
    </Select>
  </Field>

  <FieldRow>
    <Field required>
      <FieldLabel>Password</FieldLabel>
      <PasswordInput placeholder="Create a password" />
    </Field>
    <Field required>
      <FieldLabel>Confirm password</FieldLabel>
      <PasswordInput placeholder="Repeat it" />
    </Field>
  </FieldRow>

  <Button type="submit" className="mt-1 w-full">Create account</Button>
</form>`}
        >
          <form className="flex w-full max-w-md flex-col gap-5">
            <FieldRow>
              <Field required>
                <FieldLabel>First name</FieldLabel>
                <InputRoot>
                  <InputField placeholder="Ada" />
                </InputRoot>
              </Field>
              <Field required>
                <FieldLabel>Last name</FieldLabel>
                <InputRoot>
                  <InputField placeholder="Lovelace" />
                </InputRoot>
              </Field>
            </FieldRow>

            <Field required>
              <FieldLabel>Email</FieldLabel>
              <InputRoot>
                <InputField placeholder="ada@example.com" type="email" />
              </InputRoot>
              <FieldHint>We&apos;ll send a confirmation link here.</FieldHint>
            </Field>

            <Field required>
              <FieldLabel>Country</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spain</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <FieldRow>
              <Field required>
                <FieldLabel>Password</FieldLabel>
                <PasswordInput placeholder="Create a password" />
              </Field>
              <Field required>
                <FieldLabel>Confirm password</FieldLabel>
                <PasswordInput placeholder="Repeat it" />
              </Field>
            </FieldRow>

            <Button type="submit" className="mt-1 w-full">
              Create account
            </Button>
          </form>
        </ComponentPreview>
      </DocSection>

      <DocSection title="In a Dialog">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>Field</code> composes straight into a Dialog. The wiring flows
          through Radix&apos;s Portal because React context follows the component
          tree, not the DOM - so <code>htmlFor</code>, <code>aria-describedby</code>,
          and the <code>hasError</code> cascade all still work. The modal&apos;s own{" "}
          name comes from <code>DialogTitle</code> / <code>DialogDescription</code>{" "}
          (Radix), independent of the per-field labels. Try submitting with an
          invalid email to see the error cascade.
        </p>
        <ComponentPreview
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Create account</Button>
  </DialogTrigger>
  <DialogContent size="md">
    <DialogHeader>
      <DialogTitle>Create your account</DialogTitle>
      <DialogDescription>It takes less than a minute.</DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-5">
      <FieldRow>
        <Field required>
          <FieldLabel>First name</FieldLabel>
          <InputRoot><InputField placeholder="Ada" /></InputRoot>
        </Field>
        <Field required>
          <FieldLabel>Last name</FieldLabel>
          <InputRoot><InputField placeholder="Lovelace" /></InputRoot>
        </Field>
      </FieldRow>

      <Field required hasError={!!emailError}>
        <FieldLabel>Email</FieldLabel>
        <InputRoot><InputField type="email" value={email} onChange={…} /></InputRoot>
        <FieldHint>{emailError ?? "We'll send a confirmation link here."}</FieldHint>
      </Field>

      <Field required>
        <FieldLabel>Country</FieldLabel>
        <Select>
          <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
          <SelectContent>{/* …items */}</SelectContent>
        </Select>
      </Field>

      <Field required>
        <FieldLabel>Password</FieldLabel>
        <PasswordInput placeholder="Create a password" />
        <FieldHint>At least 8 characters.</FieldHint>
      </Field>
    </div>

    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button>Create account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <FieldDialogDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>disabled</code> on the <code>Field</code> dims the label and
          disables the control inside.
        </p>
        <ComponentPreview
          code={`<Field disabled>
  <FieldLabel>Email</FieldLabel>
  <InputRoot>
    <InputField placeholder="you@example.com" />
  </InputRoot>
</Field>`}
        >
          <Field disabled className="max-w-sm">
            <FieldLabel>Email</FieldLabel>
            <InputRoot>
              <InputField placeholder="you@example.com" />
            </InputRoot>
          </Field>
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "What wiring does Field actually generate for me?",
              a: "Field calls useId to mint stable ids and hands them through context to its parts: FieldLabel gets the matching htmlFor, the control gets the id, and FieldHint gets pointed at by aria-describedby. You never set id, htmlFor, or aria-describedby yourself.",
            },
            {
              q: "How does a control opt into the Field context?",
              a: "Controls read the Field context to receive their id, aria, and error or disabled state, which is why Input, Select, and PasswordInput just work inside a Field. Field never inspects child types across the server to client boundary, so any control that consumes the context picks up the wiring automatically.",
            },
            {
              q: "Where do I set the error state, on the Field or on each part?",
              a: "Set `hasError` once on the Field. It cascades to the control's border, sets aria-invalid on the control, and turns the FieldHint into a destructive error message, so you never repeat the flag on every part.",
            },
            {
              q: "What do the required and disabled props do?",
              a: "`required` appends a destructive asterisk to the FieldLabel. `disabled` dims the label and disables the control inside, again set in one place on the Field rather than on each part.",
            },
            {
              q: "Why is aria-describedby only present when there is a hint?",
              a: "FieldHint registers itself on mount, so Field only advertises aria-describedby when a hint is actually rendered and never points the control at a missing node. Because it registers on mount rather than by inspecting child types, SSR and the first client render agree and there is no hydration mismatch.",
            },
            {
              q: "Does Field still wire correctly inside a Dialog or other portal?",
              a: "Yes. React context follows the component tree, not the DOM, so htmlFor, aria-describedby, and the hasError cascade all keep working through Radix's Portal. The dialog's own accessible name comes from DialogTitle and DialogDescription, independent of the per-field labels.",
            },
            {
              q: "How do I place two fields side by side?",
              a: "Wrap sibling Fields in FieldRow. It is pure layout with no context, laying fields out in a grid that stacks to one column on narrow viewports, so it composes with any number of fields.",
            },
          ]}
        />
      </DocSection>

    </>
  )
}
