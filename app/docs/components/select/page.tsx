import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  SelectDishDemo,
  SelectCountryDemo,
  SelectTimezoneDemo,
  SelectPlanDemo,
  SelectDensityDemo,
} from "./demos"

export const metadata = {
  title: "Select",
}

export default function SelectDocsPage() {
  return (
    <>
      <DocHeader
        title="Select"
        description="A dropdown for picking one value from a list. Built on Radix Select for keyboard navigation, type-ahead, and a11y; styled with a tv slots recipe and animated with interruptible enter/exit."
      />

      <ComponentPreview
        code={`import { Pizza, Hamburger, Fish, Egg, Coffee } from "@phosphor-icons/react"

<Select>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Select a dish" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="coffee">
      <span className="flex items-center gap-2"><Coffee /> Coffee</span>
    </SelectItem>
    <SelectItem value="egg">
      <span className="flex items-center gap-2"><Egg /> Eggs benedict</span>
    </SelectItem>
    <SelectItem value="fish">
      <span className="flex items-center gap-2"><Fish /> Grilled fish</span>
    </SelectItem>
    <SelectItem value="burger">
      <span className="flex items-center gap-2"><Hamburger /> Hamburger</span>
    </SelectItem>
    <SelectItem value="pizza">
      <span className="flex items-center gap-2"><Pizza /> Pizza</span>
    </SelectItem>
  </SelectContent>
</Select>`}
      >
        <SelectDishDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="select" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Pizza, Hamburger } from "@phosphor-icons/react"
import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectItem, SelectGroup, SelectLabel, SelectSeparator,
} from "@/components/ui/select"

export function Example() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a dish" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pizza">
          <span className="flex items-center gap-2"><Pizza /> Pizza</span>
        </SelectItem>
        <SelectItem value="burger">
          <span className="flex items-center gap-2"><Hamburger /> Hamburger</span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}`}
        />
      </DocSection>

      <DocSection title="Groups and labels">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use <code className="font-mono text-sm">SelectGroup</code> and{" "}
          <code className="font-mono text-sm">SelectLabel</code> to group related options. Add{" "}
          <code className="font-mono text-sm">SelectSeparator</code> between groups for visual
          clarity.
        </p>
        <ComponentPreview
          code={`import { Clock } from "@phosphor-icons/react"

<Select>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="cet">
        <span className="flex items-center gap-2"><Clock /> Central European Time (CET)</span>
      </SelectItem>
      <SelectItem value="gmt">
        <span className="flex items-center gap-2"><Clock /> Greenwich Mean Time (GMT)</span>
      </SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="cst">
        <span className="flex items-center gap-2"><Clock /> Central Standard Time (CST)</span>
      </SelectItem>
      <SelectItem value="est">
        <span className="flex items-center gap-2"><Clock /> Eastern Standard Time (EST)</span>
      </SelectItem>
      <SelectItem value="pst">
        <span className="flex items-center gap-2"><Clock /> Pacific Standard Time (PST)</span>
      </SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        >
          <SelectTimezoneDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Country select">
        <p className="mt-4 text-pretty text-muted-foreground">
          For country pickers, lead each option with a flag. Cropping the 3:2 flag into a circle
          with a small{" "}
          <code className="font-mono text-sm">CircleFlag</code> wrapper keeps the leading edge
          aligned with the text icons used elsewhere.
        </p>
        <ComponentPreview
          code={`import CA from "country-flag-icons/react/3x2/CA"
import FR from "country-flag-icons/react/3x2/FR"
// ...one import per country

// Crop a 3:2 flag into a circle that lines up with other leading icons
function CircleFlag({ flag: Flag }) {
  return (
    <span className="inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-inset ring-border">
      <Flag className="h-full w-auto max-w-none" />
    </span>
  )
}

<Select>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Select a country" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ca">
      <span className="flex items-center gap-2"><CircleFlag flag={CA} /> Canada</span>
    </SelectItem>
    <SelectItem value="fr">
      <span className="flex items-center gap-2"><CircleFlag flag={FR} /> France</span>
    </SelectItem>
    {/* ...one SelectItem per country, sorted A→Z */}
  </SelectContent>
</Select>`}
        >
          <SelectCountryDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled items">
        <ComponentPreview
          code={`import { Gift, Lightning, Buildings } from "@phosphor-icons/react"

<Select>
  <SelectTrigger className="w-56">
    <SelectValue placeholder="Select a plan" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="enterprise" disabled>
      <span className="flex items-center gap-2"><Buildings /> Enterprise (contact us)</span>
    </SelectItem>
    <SelectItem value="free">
      <span className="flex items-center gap-2"><Gift /> Free</span>
    </SelectItem>
    <SelectItem value="pro">
      <span className="flex items-center gap-2"><Lightning /> Pro</span>
    </SelectItem>
  </SelectContent>
</Select>`}
        >
          <SelectPlanDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> on{" "}
          <code className="font-mono text-sm">SelectTrigger</code> switches between{" "}
          <code className="font-mono text-sm">comfortable</code> (h-10, generous items) and{" "}
          <code className="font-mono text-sm">compact</code> (h-8, tight items) - pass the same
          prop to <code className="font-mono text-sm">SelectContent</code> or drive both from a
          parent <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview
          code={`import { Circle } from "@phosphor-icons/react"

<Select>
  <SelectTrigger className="w-48" density="compact">
    <SelectValue placeholder="Compact" />
  </SelectTrigger>
  <SelectContent density="compact">
    <SelectItem value="a">
      <span className="flex items-center gap-2"><Circle /> Option A</span>
    </SelectItem>
    <SelectItem value="b">
      <span className="flex items-center gap-2"><Circle /> Option B</span>
    </SelectItem>
  </SelectContent>
</Select>`}
        >
          <SelectDensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">SelectTrigger</code> and{" "}
          <code className="font-mono text-sm">SelectContent</code> add a{" "}
          <code className="font-mono text-sm">density</code> prop on top of the{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/components/select"
            className="underline underline-offset-4"
          >
            Radix Select
          </a>{" "}
          primitives. All Radix props - including{" "}
          <code className="font-mono text-sm">value</code>,{" "}
          <code className="font-mono text-sm">onValueChange</code>,{" "}
          <code className="font-mono text-sm">defaultValue</code>, and{" "}
          <code className="font-mono text-sm">disabled</code> - pass through unchanged.{" "}
          <code className="font-mono text-sm">Select</code>,{" "}
          <code className="font-mono text-sm">SelectGroup</code>, and{" "}
          <code className="font-mono text-sm">SelectValue</code> are direct re-exports of the
          Radix primitives.
        </p>
      </DocSection>
    </>
  )
}
