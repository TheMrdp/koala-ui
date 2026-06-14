import { House } from "@phosphor-icons/react/ssr"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  BreadcrumbDropdownDemo,
  BreadcrumbGroupedDemo,
  BreadcrumbSiblingDemo,
} from "./dropdown-demo"

export const metadata = {
  title: "Breadcrumb",
}

export default function BreadcrumbDocsPage() {
  return (
    <>
      <DocHeader
        title="Breadcrumb"
        description="Shows the user's location within a site hierarchy. A multi-part navigation landmark built from semantic HTML with no shared state between parts."
      />

      <ComponentPreview
        code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="breadcrumb" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`}
        />
      </DocSection>

      <DocSection title="Custom separator">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass any content to <code className="font-mono text-sm">BreadcrumbSeparator</code> to
          replace the default caret - a text slash, a custom icon, or any node.
        </p>
        <ComponentPreview
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Collapsed">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use <code className="font-mono text-sm">BreadcrumbEllipsis</code> inside a{" "}
          <code className="font-mono text-sm">BreadcrumbItem</code> to indicate hidden ancestors -
          a static indicator. To let users open the collapsed segments, swap it for the{" "}
          <a href="#dropdown" className="underline underline-offset-4">dropdown</a>{" "}
          below.
        </p>
        <ComponentPreview
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Dropdown">
        <p className="mt-4 text-pretty text-muted-foreground">
          Make the collapsed segment interactive: drop a{" "}
          <a href="/docs/components/dropdown-menu" className="underline underline-offset-4">
            DropdownMenu
          </a>{" "}
          into the <code className="font-mono text-sm">BreadcrumbItem</code> so the ellipsis
          opens a menu of the hidden ancestors - full keyboard navigation and focus management
          come from the underlying Radix primitive. The trigger keeps the tight ellipsis
          footprint with a 40px tap target.
        </p>
        <ComponentPreview
          code={`import { DotsThree } from "@phosphor-icons/react"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger aria-label="Show more pages" className="...ellipsis + hit area">
      <DotsThree weight="bold" className="size-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem asChild>
        <a href="#">Documentation</a>
      </DropdownMenuItem>
      {/* …more items */}
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`}
        >
          <BreadcrumbDropdownDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sibling navigation">
        <p className="mt-4 text-pretty text-muted-foreground">
          Turn the current crumb into the trigger: its label plus a caret that rotates on open,
          dropping a menu of sibling pages so users can jump sideways without going back up.
        </p>
        <ComponentPreview
          code={`<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger className="group flex items-center gap-1 font-medium text-foreground …">
      Breadcrumb
      <CaretDown className="size-3.5 transition-transform group-data-[state=open]:rotate-180" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem asChild><a href="#">Avatar</a></DropdownMenuItem>
      {/* …more siblings */}
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`}
        >
          <BreadcrumbSiblingDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Grouped menu">
        <p className="mt-4 text-pretty text-muted-foreground">
          Compose the menu&rsquo;s parts inside a breadcrumb - a{" "}
          <code className="font-mono text-sm">DropdownMenuLabel</code>, a{" "}
          <code className="font-mono text-sm">DropdownMenuSeparator</code>, and items that lead
          with an icon (auto-sized to <code className="font-mono text-sm">size-4</code>).
        </p>
        <ComponentPreview
          code={`<DropdownMenuContent align="start">
  <DropdownMenuLabel>Jump to</DropdownMenuLabel>
  <DropdownMenuItem asChild>
    <a href="#"><House /> Home</a>
  </DropdownMenuItem>
  <DropdownMenuItem asChild>
    <a href="#"><Folder /> Documentation</a>
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem asChild>
    <a href="#"><FileText /> Components</a>
  </DropdownMenuItem>
</DropdownMenuContent>`}
        >
          <BreadcrumbGroupedDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With icon">
        <p className="mt-4 text-pretty text-muted-foreground">
          Lead a crumb with an icon - keep it inline with the label and sized to the text
          (<code className="font-mono text-sm">size-4</code>) so the row stays on one baseline.
        </p>
        <ComponentPreview
          code={`<BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
  <House className="size-4" /> Home
</BreadcrumbLink>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="inline-flex items-center gap-1.5">
                  <House className="size-4" /> Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ComponentPreview>
      </DocSection>

      <DocSection title="As child">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use <code className="font-mono text-sm">asChild</code> on{" "}
          <code className="font-mono text-sm">BreadcrumbLink</code> to merge its styles onto a
          different element - e.g. a Next.js{" "}
          <code className="font-mono text-sm">Link</code> - via{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/utilities/slot"
            className="underline underline-offset-4"
          >
            Radix Slot
          </a>
          , with no extra wrapper.
        </p>
        <CodeSnippet
          filename="with-link.tsx"
          className="mt-4"
          code={`import Link from "next/link"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`}
        />
      </DocSection>

    </>
  )
}
