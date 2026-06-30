import { ChatCircleDots } from "@phosphor-icons/react/ssr"

import {
  Faqs,
  FaqsHeader,
  FaqsTitle,
  FaqsDescription,
  FaqsList,
  FaqsItem,
  FaqsFooter,
} from "@/components/ui/faqs"
import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

export const metadata = {
  title: "FAQs",
}

// Data-driven source for the "Composition" example: a plain array mapped into FaqsItems.
const PLAN_FAQS = [
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade at any time from your dashboard, and changes are prorated to the day.",
  },
  {
    q: "Do you offer team seats?",
    a: "Team and Enterprise plans include shared seats with centralized billing and role-based access.",
  },
  {
    q: "What happens when my trial ends?",
    a: "Your workspace moves to the free tier. Nothing is deleted, and you can upgrade whenever you are ready.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "All major cards through our payment processor, plus invoicing on annual Enterprise plans.",
  },
]

export default function FaqsDocsPage() {
  return (
    <>
      <DocHeader
        title="FAQs"
        description="A marketing-ready frequently-asked-questions section, built on top of the Accordion. It pairs a header (title + description) with a single-expand Q&A list and an optional contact CTA, in a centered stacked layout or a sticky two-column split. All of the Accordion's keyboard, ARIA, and height-tween behavior comes along for free."
      />

      <ComponentPreview
        previewClassName="flex-col items-stretch p-8"
        code={`<Faqs>
  <FaqsHeader>
    <FaqsTitle>Frequently asked questions</FaqsTitle>
    <FaqsDescription>
      Everything you need to know about the product and how it works.
    </FaqsDescription>
  </FaqsHeader>
  <FaqsList defaultValue="item-1">
    <FaqsItem value="item-1" question="Is Koala UI free to use?">
      The core library is free under a permissive license. A paid PRO tier adds marketing
      sections, full pages, and priority support.
    </FaqsItem>
    <FaqsItem question="Which frameworks does it support?">
      Koala UI targets React 19 and the Next.js App Router out of the box, and drops into any
      React setup running Tailwind CSS v4.
    </FaqsItem>
    <FaqsItem question="Can I restyle the components?">
      Yes. Every component is built on semantic tokens and tailwind-variants, and accepts a
      className that merges last, so you can re-theme globally or override one instance.
    </FaqsItem>
    <FaqsItem question="How do I install a component?">
      Run npx koalaui add &lt;component&gt;, or copy the source straight from the docs. There is
      no runtime package to lock you in.
    </FaqsItem>
  </FaqsList>
</Faqs>`}
      >
        <Faqs>
          <FaqsHeader>
            <FaqsTitle>Frequently asked questions</FaqsTitle>
            <FaqsDescription>
              Everything you need to know about the product and how it works.
            </FaqsDescription>
          </FaqsHeader>
          <FaqsList defaultValue="item-1">
            <FaqsItem value="item-1" question="Is Koala UI free to use?">
              The core library is free under a permissive license. A paid PRO tier adds
              marketing sections, full pages, and priority support.
            </FaqsItem>
            <FaqsItem question="Which frameworks does it support?">
              Koala UI targets React 19 and the Next.js App Router out of the box, and drops
              into any React setup running Tailwind CSS v4.
            </FaqsItem>
            <FaqsItem question="Can I restyle the components?">
              Yes. Every component is built on semantic tokens and tailwind-variants, and
              accepts a className that merges last, so you can re-theme globally or override one
              instance.
            </FaqsItem>
            <FaqsItem question="How do I install a component?">
              Run npx koalaui add &lt;component&gt;, or copy the source straight from the docs.
              There is no runtime package to lock you in.
            </FaqsItem>
          </FaqsList>
        </Faqs>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="faqs" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Faqs,
  FaqsHeader,
  FaqsTitle,
  FaqsDescription,
  FaqsList,
  FaqsItem,
  FaqsFooter,
} from "@/components/ui/faqs"

export function Example() {
  return (
    <Faqs>
      <FaqsHeader>
        <FaqsTitle>Frequently asked questions</FaqsTitle>
        <FaqsDescription>Everything you need to know.</FaqsDescription>
      </FaqsHeader>
      <FaqsList>
        <FaqsItem question="Is Koala UI free to use?">
          The core library is free under a permissive license.
        </FaqsItem>
      </FaqsList>
    </Faqs>
  )
}`}
        />
      </DocSection>

      <DocSection title="Stacked layout">
        <p className="mt-4 text-pretty text-muted-foreground">
          The default <code className="font-mono text-sm">layout=&quot;stacked&quot;</code>{" "}
          centers the header above a width-constrained list. It is the classic centered FAQ,
          ideal at the foot of a landing page. Set a{" "}
          <code className="font-mono text-sm">defaultValue</code> on{" "}
          <code className="font-mono text-sm">FaqsList</code> (matching a{" "}
          <code className="font-mono text-sm">FaqsItem</code> value) to open the first answer so
          the section never reads as an empty stack of triggers.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-8"
          code={`<Faqs layout="stacked">
  <FaqsHeader>
    <FaqsTitle>Frequently asked questions</FaqsTitle>
    <FaqsDescription>
      Short answers to the questions we hear most often.
    </FaqsDescription>
  </FaqsHeader>
  <FaqsList defaultValue="s-1">
    <FaqsItem value="s-1" question="Do you ship a Figma kit?">
      A Figma library mirroring the token set ships with the PRO tier, kept in sync with each
      release.
    </FaqsItem>
    <FaqsItem question="How do I get updates?">
      Re-run the CLI to pull the latest source for any component, or watch the changelog for
      release notes.
    </FaqsItem>
    <FaqsItem question="Is there a dark mode?">
      Yes. Every component re-themes across light, dark, cream, and moonlight from a single set
      of semantic tokens.
    </FaqsItem>
  </FaqsList>
</Faqs>`}
        >
          <Faqs layout="stacked">
            <FaqsHeader>
              <FaqsTitle>Frequently asked questions</FaqsTitle>
              <FaqsDescription>
                Short answers to the questions we hear most often.
              </FaqsDescription>
            </FaqsHeader>
            <FaqsList defaultValue="s-1">
              <FaqsItem value="s-1" question="Do you ship a Figma kit?">
                A Figma library mirroring the token set ships with the PRO tier, kept in sync
                with each release.
              </FaqsItem>
              <FaqsItem question="How do I get updates?">
                Re-run the CLI to pull the latest source for any component, or watch the
                changelog for release notes.
              </FaqsItem>
              <FaqsItem question="Is there a dark mode?">
                Yes. Every component re-themes across light, dark, cream, and moonlight from a
                single set of semantic tokens.
              </FaqsItem>
            </FaqsList>
          </Faqs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Split layout">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">layout=&quot;split&quot;</code> for a
          two-column grid: a header column that stays{" "}
          <code className="font-mono text-sm">sticky</code> while the list scrolls beside it
          (the Stripe / Linear FAQ). The columns stack on mobile, and{" "}
          <code className="font-mono text-sm">FaqsFooter</code> spans both columns underneath.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-8"
          code={`<Faqs layout="split">
  <FaqsHeader>
    <FaqsTitle>Billing and plans</FaqsTitle>
    <FaqsDescription>
      Short answers about pricing, seats, and renewals.
    </FaqsDescription>
  </FaqsHeader>
  <FaqsList defaultValue="b-1">
    <FaqsItem value="b-1" question="Can I change plans later?">
      Yes. Upgrade or downgrade at any time from your dashboard, and changes are prorated to
      the day.
    </FaqsItem>
    <FaqsItem question="Do you offer team seats?">
      Team and Enterprise plans include shared seats with centralized billing and role-based
      access.
    </FaqsItem>
    <FaqsItem question="What happens when my trial ends?">
      Your workspace moves to the free tier. Nothing is deleted, and you can upgrade whenever
      you are ready.
    </FaqsItem>
  </FaqsList>
  <FaqsFooter>
    Still have questions?
    <Button size="sm" asChild>
      <a href="#">
        <ChatCircleDots />
        Contact support
      </a>
    </Button>
  </FaqsFooter>
</Faqs>`}
        >
          <Faqs layout="split">
            <FaqsHeader>
              <FaqsTitle>Billing and plans</FaqsTitle>
              <FaqsDescription>
                Short answers about pricing, seats, and renewals.
              </FaqsDescription>
            </FaqsHeader>
            <FaqsList defaultValue="b-1">
              <FaqsItem value="b-1" question="Can I change plans later?">
                Yes. Upgrade or downgrade at any time from your dashboard, and changes are
                prorated to the day.
              </FaqsItem>
              <FaqsItem question="Do you offer team seats?">
                Team and Enterprise plans include shared seats with centralized billing and
                role-based access.
              </FaqsItem>
              <FaqsItem question="What happens when my trial ends?">
                Your workspace moves to the free tier. Nothing is deleted, and you can upgrade
                whenever you are ready.
              </FaqsItem>
            </FaqsList>
            <FaqsFooter>
              Still have questions?
              <Button size="sm" asChild>
                <a href="#">
                  <ChatCircleDots />
                  Contact support
                </a>
              </Button>
            </FaqsFooter>
          </Faqs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="List style">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">FaqsList</code> forwards straight to the
          Accordion, so its <code className="font-mono text-sm">variant</code> controls the
          chrome: <code className="font-mono text-sm">card</code> (the default contained
          surface), <code className="font-mono text-sm">minimal</code> (borderless rows divided
          by hairlines), or <code className="font-mono text-sm">separated</code> (each item its
          own card).
        </p>
        <ComponentPreview
          previewClassName="grid grid-cols-1 items-start gap-8 p-8 lg:grid-cols-3"
          code={`{/* Default: one contained surface */}
<FaqsList variant="card" defaultValue="c-1">…</FaqsList>

{/* Borderless rows */}
<FaqsList variant="minimal" defaultValue="m-1">…</FaqsList>

{/* Each item its own card */}
<FaqsList variant="separated" defaultValue="p-1">…</FaqsList>`}
        >
          <Faqs>
            <p className="mb-3 text-sm font-medium text-foreground">card</p>
            <FaqsList variant="card" defaultValue="c-1">
              <FaqsItem value="c-1" question="What is included?">
                The full component source, tokens, and docs.
              </FaqsItem>
              <FaqsItem question="Can I cancel anytime?">
                Yes, with no questions asked.
              </FaqsItem>
            </FaqsList>
          </Faqs>
          <Faqs>
            <p className="mb-3 text-sm font-medium text-foreground">minimal</p>
            <FaqsList variant="minimal" defaultValue="m-1">
              <FaqsItem value="m-1" question="What is included?">
                The full component source, tokens, and docs.
              </FaqsItem>
              <FaqsItem question="Can I cancel anytime?">
                Yes, with no questions asked.
              </FaqsItem>
            </FaqsList>
          </Faqs>
          <Faqs>
            <p className="mb-3 text-sm font-medium text-foreground">separated</p>
            <FaqsList variant="separated" defaultValue="p-1">
              <FaqsItem value="p-1" question="What is included?">
                The full component source, tokens, and docs.
              </FaqsItem>
              <FaqsItem question="Can I cancel anytime?">
                Yes, with no questions asked.
              </FaqsItem>
            </FaqsList>
          </Faqs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Helpful feedback">
        <p className="mt-4 text-pretty text-muted-foreground">
          For a help-center / knowledge-base FAQ, set{" "}
          <code className="font-mono text-sm">iconPosition=&quot;leading&quot;</code> on{" "}
          <code className="font-mono text-sm">FaqsList</code> to move the caret ahead of the
          question, and add <code className="font-mono text-sm">feedback</code> to a{" "}
          <code className="font-mono text-sm">FaqsItem</code> to mount a Helpful / Not helpful
          voting row beneath its answer. The chosen pill stays emphasized while the other dims,
          and an acknowledgement fades in. For full control (custom labels, an{" "}
          <code className="font-mono text-sm">onVote</code> handler), drop a{" "}
          <code className="font-mono text-sm">FaqsFeedback</code> into the answer yourself.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-8"
          code={`<Faqs>
  <FaqsList variant="separated" iconPosition="leading" defaultValue="h-1">
    <FaqsItem
      value="h-1"
      feedback
      question="What sets your interior design agency apart from others in the industry?"
    >
      At our agency, we take pride in our distinctive personalized approach, meticulous
      attention to detail, and our unwavering commitment to delivering unparalleled designs
      that surpass client expectations.
    </FaqsItem>
    <FaqsItem feedback question="How long does a typical project take?">
      Most residential projects run six to twelve weeks from brief to install, depending on
      scope and lead times on custom pieces.
    </FaqsItem>
    <FaqsItem feedback question="Do you work with existing furniture?">
      Absolutely. We design around the pieces you love and fill the gaps, so the result feels
      collected rather than bought all at once.
    </FaqsItem>
  </FaqsList>
</Faqs>`}
        >
          <Faqs>
            <FaqsList variant="separated" iconPosition="leading" defaultValue="h-1">
              <FaqsItem
                value="h-1"
                feedback
                question="What sets your interior design agency apart from others in the industry?"
              >
                At our agency, we take pride in our distinctive personalized approach,
                meticulous attention to detail, and our unwavering commitment to delivering
                unparalleled designs that surpass client expectations.
              </FaqsItem>
              <FaqsItem feedback question="How long does a typical project take?">
                Most residential projects run six to twelve weeks from brief to install,
                depending on scope and lead times on custom pieces.
              </FaqsItem>
              <FaqsItem feedback question="Do you work with existing furniture?">
                Absolutely. We design around the pieces you love and fill the gaps, so the
                result feels collected rather than bought all at once.
              </FaqsItem>
            </FaqsList>
          </Faqs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Footer call to action">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">FaqsFooter</code> is an optional closing row for a
          contact prompt. Drop a line of copy beside one of our{" "}
          <code className="font-mono text-sm">Button</code> components; it centers in the stacked
          layout and spans both columns in the split layout.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-8"
          code={`<Faqs>
  <FaqsHeader>
    <FaqsTitle>Frequently asked questions</FaqsTitle>
  </FaqsHeader>
  <FaqsList defaultValue="f-1">
    <FaqsItem value="f-1" question="How do I reach support?">
      Email the team or open a thread from your dashboard. We reply within one business day.
    </FaqsItem>
    <FaqsItem question="Where can I report a bug?">
      Open an issue from the docs footer and include a reproduction; we triage daily.
    </FaqsItem>
  </FaqsList>
  <FaqsFooter>
    Can&apos;t find what you&apos;re looking for?
    <Button size="sm" variant="secondary" asChild>
      <a href="#">
        <ChatCircleDots />
        Talk to us
      </a>
    </Button>
  </FaqsFooter>
</Faqs>`}
        >
          <Faqs>
            <FaqsHeader>
              <FaqsTitle>Frequently asked questions</FaqsTitle>
            </FaqsHeader>
            <FaqsList defaultValue="f-1">
              <FaqsItem value="f-1" question="How do I reach support?">
                Email the team or open a thread from your dashboard. We reply within one
                business day.
              </FaqsItem>
              <FaqsItem question="Where can I report a bug?">
                Open an issue from the docs footer and include a reproduction; we triage daily.
              </FaqsItem>
            </FaqsList>
            <FaqsFooter>
              Can&apos;t find what you&apos;re looking for?
              <Button size="sm" variant="secondary" asChild>
                <a href="#">
                  <ChatCircleDots />
                  Talk to us
                </a>
              </Button>
            </FaqsFooter>
          </Faqs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Composition">
        <p className="mt-4 text-pretty text-muted-foreground">
          The parts are plain composition, so a list of questions maps cleanly into{" "}
          <code className="font-mono text-sm">FaqsItem</code>s. Give each one a stable{" "}
          <code className="font-mono text-sm">value</code> when you want to target it with{" "}
          <code className="font-mono text-sm">defaultValue</code>; omit it and a unique id is
          generated for you.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch p-8"
          code={`const PLAN_FAQS = [
  { q: "Can I change plans later?", a: "Yes, changes are prorated to the day." },
  { q: "Do you offer team seats?", a: "Team and Enterprise plans include shared seats." },
  // …
]

<Faqs>
  <FaqsHeader>
    <FaqsTitle>Billing and plans</FaqsTitle>
  </FaqsHeader>
  <FaqsList defaultValue="plan-0">
    {PLAN_FAQS.map((item, i) => (
      <FaqsItem key={i} value={\`plan-\${i}\`} question={item.q}>
        {item.a}
      </FaqsItem>
    ))}
  </FaqsList>
</Faqs>`}
        >
          <Faqs>
            <FaqsHeader>
              <FaqsTitle>Billing and plans</FaqsTitle>
            </FaqsHeader>
            <FaqsList defaultValue="plan-0">
              {PLAN_FAQS.map((item, i) => (
                <FaqsItem key={i} value={`plan-${i}`} question={item.q}>
                  {item.a}
                </FaqsItem>
              ))}
            </FaqsList>
          </Faqs>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Prop</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Default</th>
                <th className="px-4 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="[&_td]:px-4 [&_td]:py-2 [&_tr]:border-t [&_tr]:border-border">
              <tr>
                <td className="font-mono">Faqs.layout</td>
                <td className="font-mono text-muted-foreground">stacked | split</td>
                <td className="font-mono text-muted-foreground">stacked</td>
                <td className="text-muted-foreground">
                  Centered header above the list, or a sticky two-column grid.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsList.variant</td>
                <td className="font-mono text-muted-foreground">card | minimal | separated</td>
                <td className="font-mono text-muted-foreground">card</td>
                <td className="text-muted-foreground">
                  Forwarded to Accordion: the list chrome.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsList.type</td>
                <td className="font-mono text-muted-foreground">single | multiple</td>
                <td className="font-mono text-muted-foreground">single</td>
                <td className="text-muted-foreground">
                  Forwarded to Accordion: one open answer, or many.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsList.collapsible</td>
                <td className="font-mono text-muted-foreground">boolean</td>
                <td className="font-mono text-muted-foreground">true</td>
                <td className="text-muted-foreground">
                  Forwarded to Accordion (single only): allow closing the open item.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsList.defaultValue</td>
                <td className="font-mono text-muted-foreground">string | string[]</td>
                <td className="font-mono text-muted-foreground">-</td>
                <td className="text-muted-foreground">
                  Forwarded to Accordion: the item(s) open on mount.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsList.density</td>
                <td className="font-mono text-muted-foreground">comfortable | compact</td>
                <td className="font-mono text-muted-foreground">comfortable</td>
                <td className="text-muted-foreground">
                  Forwarded to Accordion: row height and content inset.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsList.iconPosition</td>
                <td className="font-mono text-muted-foreground">leading | trailing</td>
                <td className="font-mono text-muted-foreground">trailing</td>
                <td className="text-muted-foreground">
                  Forwarded to Accordion: caret before or after the question.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsItem.question</td>
                <td className="font-mono text-muted-foreground">ReactNode</td>
                <td className="font-mono text-muted-foreground">-</td>
                <td className="text-muted-foreground">The question shown in the trigger row.</td>
              </tr>
              <tr>
                <td className="font-mono">FaqsItem.value</td>
                <td className="font-mono text-muted-foreground">string</td>
                <td className="font-mono text-muted-foreground">auto</td>
                <td className="text-muted-foreground">
                  Unique item id. A stable id is generated when omitted.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsItem.feedback</td>
                <td className="font-mono text-muted-foreground">boolean | FaqsFeedbackProps</td>
                <td className="font-mono text-muted-foreground">false</td>
                <td className="text-muted-foreground">
                  Mount a Helpful / Not helpful voting row beneath the answer.
                </td>
              </tr>
              <tr>
                <td className="font-mono">FaqsFeedback.onVote</td>
                <td className="font-mono text-muted-foreground">(v: &quot;up&quot; | &quot;down&quot;) =&gt; void</td>
                <td className="font-mono text-muted-foreground">-</td>
                <td className="text-muted-foreground">
                  Called with the chosen vote when the reader rates the answer.
                </td>
              </tr>
              <tr>
                <td className="font-mono">className</td>
                <td className="font-mono text-muted-foreground">string</td>
                <td className="font-mono text-muted-foreground">-</td>
                <td className="text-muted-foreground">
                  Accepted by every part, merged last.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-pretty text-muted-foreground">
          Parts: <code className="font-mono text-sm">Faqs</code>,{" "}
          <code className="font-mono text-sm">FaqsHeader</code>,{" "}
          <code className="font-mono text-sm">FaqsTitle</code>,{" "}
          <code className="font-mono text-sm">FaqsDescription</code>,{" "}
          <code className="font-mono text-sm">FaqsList</code>,{" "}
          <code className="font-mono text-sm">FaqsItem</code>,{" "}
          <code className="font-mono text-sm">FaqsFeedback</code>,{" "}
          <code className="font-mono text-sm">FaqsFooter</code>.{" "}
          <code className="font-mono text-sm">FaqsList</code> forwards all{" "}
          <code className="font-mono text-sm">Accordion</code> props; each part forwards its
          native props and merges <code className="font-mono text-sm">className</code> last.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "How is FAQs different from Accordion?",
              a: "FAQs is a marketing section built on top of Accordion. Accordion is the generic disclosure list; FAQs adds the section composition around it - a header (title + description), the Q&A list with sensible marketing defaults, an optional contact CTA, and a stacked or split layout. Reach for Accordion for in-app disclosure, and FAQs for a landing-page question section.",
            },
            {
              q: "Do I have to give every FaqsItem a value?",
              a: "No. FaqsItem generates a stable, SSR-safe id when you omit value. Pass an explicit value only when you want to open it via the list's defaultValue, or otherwise target it.",
            },
            {
              q: "Can more than one answer be open at once?",
              a: "Yes. FaqsList forwards to Accordion, so set type=\"multiple\" (and drop collapsible, which only applies to single) to let several answers stay open together.",
            },
            {
              q: "How do I make the contact prompt live in the header instead of the footer?",
              a: "Because the parts are plain composition, just place your prompt and Button inside FaqsHeader rather than using FaqsFooter. In the split layout that keeps the call to action in the sticky left column beside the title.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
