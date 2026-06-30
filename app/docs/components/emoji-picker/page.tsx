import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  EmojiPickerInlineDemo,
  EmojiPickerPopoverDemo,
  EmojiPickerDensityDemo,
  EmojiPickerMinimalDemo,
} from "./demos"

export const metadata = {
  title: "Emoji Picker",
}

export default function EmojiPickerDocsPage() {
  return (
    <>
      <DocHeader
        title="Emoji Picker"
        description="A complete picker: searchable, with a scroll-spy category nav, a pinned “frequently used” preset row, persisted recents, and a hovered-emoji preview. Categories mount lazily as you scroll, so a large set never paints all at once."
      />

      <ComponentPreview
        previewClassName="py-12"
        code={`<EmojiPicker onEmojiSelect={(char) => setEmoji(char)} />`}
      >
        <EmojiPickerInlineDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="emoji-picker" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { EmojiPicker } from "@/components/ui/emoji-picker"

export function Example() {
  return <EmojiPicker onEmojiSelect={(char, datum) => console.log(char, datum.name)} />
}`}
        />
      </DocSection>

      <DocSection title="In a popover">
        <p className="mt-4 text-pretty text-muted-foreground">
          The most common flow: a trigger opens the picker in a Radix popover that closes on
          select. Compose <code className="font-mono text-sm">EmojiPickerPopover</code>,{" "}
          <code className="font-mono text-sm">EmojiPickerTrigger</code> (use{" "}
          <code className="font-mono text-sm">asChild</code> to keep your own button), and{" "}
          <code className="font-mono text-sm">EmojiPickerContent</code>.
        </p>
        <ComponentPreview
          code={`<EmojiPickerPopover>
  <EmojiPickerTrigger asChild>
    <Button variant="outline">
      <Smiley /> Add emoji
    </Button>
  </EmojiPickerTrigger>
  <EmojiPickerContent onEmojiSelect={(char) => setEmoji(char)} />
</EmojiPickerPopover>`}
        >
          <EmojiPickerPopoverDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Recents & presets">
        <p className="mt-4 text-pretty text-muted-foreground">
          The picker tracks a <strong>recently used</strong> row automatically and persists it
          to <code className="font-mono text-sm">localStorage</code> (set{" "}
          <code className="font-mono text-sm">storageKey</code>, or pass{" "}
          <code className="font-mono text-sm">null</code> to disable). For full control, drive{" "}
          <code className="font-mono text-sm">recent</code> /{" "}
          <code className="font-mono text-sm">onRecentChange</code> yourself. The{" "}
          <strong>presets</strong> row is a fixed quick-pick list pinned above the categories;
          override it with the <code className="font-mono text-sm">presets</code> prop.
        </p>
        <CodeSnippet
          filename="recents-presets.tsx"
          className="mt-4"
          code={`<EmojiPicker
  presets={["👍", "❤️", "😂", "🎉", "🚀"]}
  recent={recent}
  onRecentChange={setRecent}
  recentLimit={16}
/>`}
        />
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Density retunes the panel width, viewport height, grid gap, and glyph size, never
          color or radius. <code className="font-mono text-sm">comfortable</code> is the
          marketing default; <code className="font-mono text-sm">compact</code> tightens it for
          application UI. It also resolves from a surrounding{" "}
          <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview
          previewClassName="py-12"
          code={`<EmojiPicker density="comfortable" />
<EmojiPicker density="compact" />`}
        >
          <EmojiPickerDensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Minimal">
        <p className="mt-4 text-pretty text-muted-foreground">
          Every region is toggleable. Drop the preview footer and the recents/presets rows with{" "}
          <code className="font-mono text-sm">showPreview</code>,{" "}
          <code className="font-mono text-sm">showRecent</code>, and{" "}
          <code className="font-mono text-sm">showPresets</code> for a lean search-and-grid.
        </p>
        <ComponentPreview
          previewClassName="py-12"
          code={`<EmojiPicker
  showPreview={false}
  showRecent={false}
  showPresets={false}
/>`}
        >
          <EmojiPickerMinimalDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Performance">
        <p className="mt-4 text-pretty text-muted-foreground">
          Categories mount in batches. Only{" "}
          <code className="font-mono text-sm">categoriesPerPage</code> are in the DOM at first,
          and a bottom sentinel reveals the next batch as you scroll (search results stream the
          same way). Counts only ever grow, so scroll height never jitters. Lower the value for
          a lighter first paint, or pass your own fuller dataset via{" "}
          <code className="font-mono text-sm">data</code> without changing the component.
        </p>
        <CodeSnippet
          filename="performance.tsx"
          className="mt-4"
          code={`// Mount two categories per scroll batch instead of three.
<EmojiPicker categoriesPerPage={2} data={myFullUnicodeSet} />`}
        />
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I use the bare EmojiPicker versus the EmojiPickerPopover trio?",
              a: "Render the bare `EmojiPicker` when the panel lives permanently in the layout, for example a sidebar or a reaction tray. Use `EmojiPickerPopover` with `EmojiPickerTrigger` and `EmojiPickerContent` for the common click-a-button-then-pick flow, since the content closes the popover on select by default.",
            },
            {
              q: "Why isn't there a kit of fine-grained parts like the search row or grid?",
              a: "The search, category nav, viewport, and footer share scroll position, active section, and roving focus, so they are too tightly coupled to expose as loose parts. The public surface is the configured `EmojiPicker` plus the thin Radix Popover trio.",
            },
            {
              q: "How do recents get persisted, and how do I take control of them?",
              a: "By default the picker tracks a recently-used row and persists it to localStorage under the `storageKey` (default \"koala-emoji-recent\"); pass `null` to disable persistence. For full control, drive `recent` and `onRecentChange` yourself and tune the cap with `recentLimit`.",
            },
            {
              q: "How do I strip it down to just a search box and grid?",
              a: "Every region is toggleable. Set `showPreview`, `showRecent`, and `showPresets` to false for a lean search-and-grid, and `showSearch` to false if you do not need the search row at all.",
            },
            {
              q: "What keyboard navigation does the grid support?",
              a: "The viewport has roving focus: arrow keys move by one (left/right) or by a row of eight (up/down), and Home/End jump to the first or last emoji. Pressing ArrowDown from the search field focuses the first emoji, and each button carries an `aria-label` of the emoji name.",
            },
            {
              q: "Can I swap in the full Unicode set without rewriting the component?",
              a: "Yes. Pass your own categorized dataset to the `data` prop; it defaults to a curated set. Categories mount in batches of `categoriesPerPage` (3 by default) via a scroll sentinel, so a large set never paints all at once.",
            },
          ]}
        />
      </DocSection>

    </>
  )
}
