import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  SearchGroupDemo,
  AddonsDemo,
  InviteGroupDemo,
  AmountGroupDemo,
  SizesDemo,
  StatesDemo,
} from "./demos"

export const metadata = {
  title: "Input Group",
}

export default function InputGroupDocsPage() {
  return (
    <>
      <DocHeader
        title="Input Group"
        description="Joins several controls - a field, a Select, a Button, a static affix - into one seamless segmented shell. The group owns the border and focus ring; each segment goes chromeless and melts in. It is to the input family what Button Group is to Button."
      />

      <ComponentPreview
        code={`<InputGroup>
  <InputRoot>
    <InputPrefix>
      <MagnifyingGlass />
    </InputPrefix>
    <InputField placeholder="Search components" aria-label="Search" />
  </InputRoot>
  <Button>Search</Button>
</InputGroup>`}
      >
        <SearchGroupDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="input-group" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { InputRoot, InputField } from "@/components/ui/input"

export function Example() {
  return (
    <InputGroup>
      <InputGroupAddon>https://</InputGroupAddon>
      <InputRoot>
        <InputField placeholder="yourcompany" />
      </InputRoot>
      <InputGroupAddon>.com</InputGroupAddon>
    </InputGroup>
  )
}`}
        />
      </DocSection>

      <DocSection title="When to reach for it">
        <p className="mt-4 text-pretty text-muted-foreground">
          An <code className="font-mono text-sm">Input</code> already handles adornments{" "}
          <em>inside a single field</em> - a leading icon (
          <code className="font-mono text-sm">InputPrefix</code>), a divided label (
          <code className="font-mono text-sm">InputPrefixLabel</code>), a trailing button (
          <code className="font-mono text-sm">InputSuffixButton</code>). Reach for{" "}
          <code className="font-mono text-sm">InputGroup</code> only when you need to{" "}
          <em>join several distinct controls</em> - a Select, a Button, another field, a
          static affix - into one unit. One shell, one focus ring, one set of rounded
          corners.
        </p>
      </DocSection>

      <DocSection title="Text affixes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">InputGroupAddon</code> is a static,
          non-interactive segment for a unit, protocol, or symbol. It shares the shell
          background and reads as a muted label, on either side of the field.
        </p>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupAddon>https://</InputGroupAddon>
  <InputRoot>
    <InputField placeholder="yourcompany" aria-label="Subdomain" />
  </InputRoot>
  <InputGroupAddon>.com</InputGroupAddon>
</InputGroup>

<InputGroup>
  <InputGroupAddon>@</InputGroupAddon>
  <InputRoot>
    <InputField placeholder="username" aria-label="Username" />
  </InputRoot>
</InputGroup>`}
        >
          <AddonsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With a Select">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drop a real <code className="font-mono text-sm">Select</code> in as a segment and
          it melts into the shell - its own border, ring, and background are stripped while
          its menu, keyboard nav, and ARIA stay intact. The field flexes to fill the row; the
          trailing <code className="font-mono text-sm">Button</code> keeps its fill and caps
          the group.
        </p>
        <ComponentPreview
          code={`<InputGroup>
  <Select defaultValue="member">
    <SelectTrigger aria-label="Role">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin"><ShieldCheck /> Admin</SelectItem>
      <SelectItem value="member"><User /> Member</SelectItem>
      <SelectItem value="viewer"><Eye /> Viewer</SelectItem>
    </SelectContent>
  </Select>
  <InputRoot>
    <InputField type="email" placeholder="teammate@company.com" aria-label="Email to invite" />
  </InputRoot>
  <Button>Invite</Button>
</InputGroup>`}
        >
          <InviteGroupDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Amount + currency">
        <p className="mt-4 text-pretty text-muted-foreground">
          A symbol affix, the flexible amount field, and a trailing currency Select - the
          classic money input as one joined control.
        </p>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupAddon>$</InputGroupAddon>
  <InputRoot>
    <InputField inputMode="decimal" placeholder="0.00" className="tabular-nums" aria-label="Amount" />
  </InputRoot>
  <Select defaultValue="usd">
    <SelectTrigger aria-label="Currency">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="usd"><CurrencyDollar /> USD</SelectItem>
      <SelectItem value="eur"><CurrencyEur /> EUR</SelectItem>
      <SelectItem value="gbp"><CurrencyGbp /> GBP</SelectItem>
    </SelectContent>
  </Select>
</InputGroup>`}
        >
          <AmountGroupDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">size</code> prop sets the shell height
          (<code className="font-mono text-sm">sm</code> 32,{" "}
          <code className="font-mono text-sm">md</code> 36,{" "}
          <code className="font-mono text-sm">lg</code> 40px) and the affix scale. Give the
          inner controls the matching size so every segment lines up.
        </p>
        <ComponentPreview
          code={`<InputGroup size="sm">
  <InputRoot size="sm">{/* ... */}</InputRoot>
  <Button size="sm">Search</Button>
</InputGroup>

<InputGroup size="md">{/* ... */}</InputGroup>
<InputGroup size="lg">{/* ... */}</InputGroup>`}
        >
          <SizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="States">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">hasError</code> paints the whole shell red and
          turns the focus ring destructive; <code className="font-mono text-sm">disabled</code>{" "}
          dims and locks the row. Inside a <code className="font-mono text-sm">Field</code>,
          both cascade automatically. For form semantics, also disable the inner control so
          it is excluded from submission.
        </p>
        <ComponentPreview
          code={`<InputGroup hasError>
  <InputGroupAddon>@</InputGroupAddon>
  <InputRoot>
    <InputField defaultValue="not an email" aria-label="Email" />
  </InputRoot>
</InputGroup>

<InputGroup disabled>
  <InputGroupAddon>https://</InputGroupAddon>
  <InputRoot>
    <InputField defaultValue="acme" disabled aria-label="Subdomain" />
  </InputRoot>
  <InputGroupAddon>.com</InputGroupAddon>
</InputGroup>`}
        >
          <StatesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Prop</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">Default</th>
                <th className="px-4 py-2.5 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs">size</td>
                <td className="px-4 py-2.5 font-mono text-xs">{`"sm" | "md" | "lg"`}</td>
                <td className="px-4 py-2.5 font-mono text-xs">{`"md"`}</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Shell height + affix sizing. Match it on the inner controls.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs">hasError</td>
                <td className="px-4 py-2.5 font-mono text-xs">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">-</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Error styling. Cascades from a surrounding Field.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs">disabled</td>
                <td className="px-4 py-2.5 font-mono text-xs">boolean</td>
                <td className="px-4 py-2.5 font-mono text-xs">-</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Dim and lock the shell. Cascades from a surrounding Field.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-xs">...divProps</td>
                <td className="px-4 py-2.5 font-mono text-xs">{`ComponentProps<"div">`}</td>
                <td className="px-4 py-2.5 font-mono text-xs">-</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Forwarded to the shell. <code className="font-mono text-xs">className</code>{" "}
                  merges last.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">InputGroupAddon</code> is a plain{" "}
          <code className="font-mono text-sm">span</code> segment and accepts every native
          span prop plus <code className="font-mono text-sm">className</code>.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When do I use InputGroup vs the Input adornments?",
              a: "Input already covers adornments inside one field: a leading icon (InputPrefix), a divided label (InputPrefixLabel), a trailing button (InputSuffixButton). Use InputGroup only when you are joining several distinct controls - a Select, a Button, another field, a static affix - into one shell. If everything lives in a single field, you do not need InputGroup.",
            },
            {
              q: "How does it join controls without the borders doubling up?",
              a: "The group owns the single border, radius, focus ring, and background. Each known segment (input-root, select-trigger, button) is stripped of its own frame via data-slot selectors and the seams are redrawn as one 1px divider per junction. It is the same approach Button Group uses, adapted so the whole shell shares one focus ring.",
            },
            {
              q: "Do Select and Button still work normally inside it?",
              a: "Yes. They are the real components - only their chrome is neutralized for layout. The Select keeps its menu, keyboard navigation, and ARIA; the Button keeps its fill, hover, and click. NumberInput and PhoneInput compose too, since they render an input-root.",
            },
            {
              q: "How do I keep every segment the same height?",
              a: "Set the same size on the group and on each inner control (e.g. size=\"lg\" on InputGroup, InputRoot, and Button). The shell governs the height via items-stretch, so even mismatched controls align, but matching the size keeps text and padding consistent too.",
            },
            {
              q: "Does it wire up to Field?",
              a: "Yes. Like InputRoot, InputGroup reads the Field context, so hasError and disabled cascade from a surrounding Field and you set them once. A prop on the group always wins over the field default.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
