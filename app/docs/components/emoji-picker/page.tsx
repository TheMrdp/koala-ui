import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

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
          <strong>presets</strong> row is a fixed quick-pick list pinned above the categories —
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
          Density retunes the panel width, viewport height, grid gap, and glyph size — never
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
          Categories mount in batches — only{" "}
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

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">EmojiPicker</code> forwards native{" "}
          <code className="font-mono text-sm">{`<div>`}</code> props, plus:
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Prop</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="[&_td]:px-4 [&_td]:py-2 [&_td]:align-top [&_tr]:border-t [&_tr]:border-border [&_code]:font-mono [&_code]:text-sm">
              <tr>
                <td><code>onEmojiSelect</code></td>
                <td><code>(emoji, datum) =&gt; void</code></td>
                <td><code>—</code></td>
              </tr>
              <tr>
                <td><code>data</code></td>
                <td><code>EmojiCategory[]</code></td>
                <td><code>emojiCategories</code></td>
              </tr>
              <tr>
                <td><code>presets</code></td>
                <td><code>string[]</code></td>
                <td><code>defaultEmojiPresets</code></td>
              </tr>
              <tr>
                <td><code>recent</code> / <code>onRecentChange</code></td>
                <td><code>string[]</code> / <code>(r) =&gt; void</code></td>
                <td><code>—</code></td>
              </tr>
              <tr>
                <td><code>defaultRecent</code></td>
                <td><code>string[]</code></td>
                <td><code>[]</code></td>
              </tr>
              <tr>
                <td><code>recentLimit</code></td>
                <td><code>number</code></td>
                <td><code>24</code></td>
              </tr>
              <tr>
                <td><code>storageKey</code></td>
                <td><code>string | null</code></td>
                <td><code>{`"koala-emoji-recent"`}</code></td>
              </tr>
              <tr>
                <td><code>categoriesPerPage</code></td>
                <td><code>number</code></td>
                <td><code>3</code></td>
              </tr>
              <tr>
                <td><code>showSearch</code> / <code>showPreview</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
              </tr>
              <tr>
                <td><code>showRecent</code> / <code>showPresets</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
              </tr>
              <tr>
                <td><code>density</code></td>
                <td><code>{`"comfortable" | "compact"`}</code></td>
                <td><code>{`"comfortable"`}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">EmojiPickerContent</code> additionally takes{" "}
          <code className="font-mono text-sm">closeOnSelect</code> (default{" "}
          <code className="font-mono text-sm">true</code>) plus Radix Popover{" "}
          <code className="font-mono text-sm">Content</code> props like{" "}
          <code className="font-mono text-sm">side</code>,{" "}
          <code className="font-mono text-sm">align</code>, and{" "}
          <code className="font-mono text-sm">sideOffset</code>.
        </p>
      </DocSection>
    </>
  )
}
