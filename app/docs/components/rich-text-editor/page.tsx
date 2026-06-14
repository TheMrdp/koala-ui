import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  RichTextEditorDemo,
  RichTextEditorEmptyDemo,
  RichTextEditorComposerDemo,
  RichTextEditorBubbleMenuDemo,
  RichTextEditorBubbleOnlyDemo,
  RichTextEditorCompactDemo,
  RichTextEditorReadOnlyDemo,
  RichTextEditorCustomToolbarDemo,
} from "./demos"

export const metadata = {
  title: "Rich Text Editor",
}

export default function RichTextEditorDocsPage() {
  return (
    <>
      <DocHeader
        title="Rich Text Editor"
        description="A WYSIWYG editor for formatted prose — headings, bold/italic/underline, links, and lists. Built on Tiptap (ProseMirror) for selection, undo, and paste, with every pixel of UI owned as a Koala tv recipe. Like Tooltip wrapping Tippy.js, it's the considered exception to Radix-first."
      />

      <ComponentPreview
        previewClassName="justify-stretch"
        code={`<RichTextEditor defaultValue="<h2>Release notes</h2>…">
  <RichTextEditorToolbar />
  <RichTextEditorContent />
</RichTextEditor>`}
      >
        <RichTextEditorDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation
          component="rich-text-editor"
          dependencies="npm install @tiptap/react @tiptap/starter-kit @tiptap/pm @tiptap/extensions radix-ui tailwind-variants tailwind-merge"
        />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  RichTextEditor,
  RichTextEditorToolbar,
  RichTextEditorContent,
} from "@/components/ui/rich-text-editor"

export function Example() {
  return (
    <RichTextEditor
      defaultValue="<p>Hello, world.</p>"
      onChange={(html) => console.log(html)}
    >
      <RichTextEditorToolbar />
      <RichTextEditorContent />
    </RichTextEditor>
  )
}`}
        />
      </DocSection>

      <DocSection title="Placeholder">
        <p className="mt-4 text-pretty text-muted-foreground">
          An empty editor shows muted ghost text. Set it with the{" "}
          <code className="font-mono text-sm">placeholder</code> prop.
        </p>
        <ComponentPreview
          previewClassName="justify-stretch"
          code={`<RichTextEditor placeholder="Write a description…">
  <RichTextEditorToolbar />
  <RichTextEditorContent />
</RichTextEditor>`}
        >
          <RichTextEditorEmptyDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="A complete composer">
        <p className="mt-4 text-pretty text-muted-foreground">
          Everything together: a seeded document, the full toolbar, the on-selection bubble,
          a scrollable writing area, and a status bar that lives inside the editor surface —
          live word/character counts (<code className="font-mono text-sm">tabular-nums</code>,
          so they never reflow) and a save action with transient confirmation. The status bar
          is just a child that reads the editor via{" "}
          <code className="font-mono text-sm">useRichTextEditor</code>.
        </p>
        <ComponentPreview
          previewClassName="justify-stretch"
          code={`function ComposerStatusBar() {
  const editor = useRichTextEditor()
  const { words, chars } = useEditorState({
    editor,
    selector: ({ editor }) => {
      const text = editor?.getText().trim() ?? ""
      return {
        words: text ? text.split(/\\s+/).length : 0,
        chars: editor?.getText().length ?? 0,
      }
    },
  }) ?? { words: 0, chars: 0 }

  return (
    <div className="flex items-center justify-between border-t border-border px-3 py-2">
      <p className="text-xs text-muted-foreground">
        <span className="tabular-nums">{words}</span> words ·{" "}
        <span className="tabular-nums">{chars}</span> characters
      </p>
      <Button size="sm" onClick={saveDraft}><FloppyDisk /> Save draft</Button>
    </div>
  )
}

<RichTextEditor defaultValue={doc}>
  <RichTextEditorToolbar />
  <RichTextEditorBubbleMenu />
  <RichTextEditorContent className="max-h-80 overflow-y-auto" />
  <ComposerStatusBar />
</RichTextEditor>`}
        >
          <RichTextEditorComposerDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Selection bubble menu">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drop in <code className="font-mono text-sm">RichTextEditorBubbleMenu</code> and a
          floating toolbar surfaces over the current selection — <strong>double-click a word</strong>{" "}
          or drag across a phrase and it appears above it (Medium / Notion style). It pairs with
          the top toolbar or replaces it entirely. Its link control expands{" "}
          <em>inline</em> so the selection-driven bubble never dismisses while you type the URL.
        </p>
        <ComponentPreview
          previewClassName="justify-stretch"
          code={`<RichTextEditor defaultValue="<p>Select any of this text…</p>">
  <RichTextEditorToolbar />
  <RichTextEditorBubbleMenu />
  <RichTextEditorContent />
</RichTextEditor>`}
        >
          <RichTextEditorBubbleMenuDemo />
        </ComponentPreview>

        <p className="mt-2 text-pretty text-muted-foreground">
          Or go chromeless — omit the top toolbar and let the bubble be the only formatting UI.
        </p>
        <ComponentPreview
          previewClassName="justify-stretch"
          code={`<RichTextEditor defaultValue="<p>A clean canvas…</p>">
  <RichTextEditorBubbleMenu />
  <RichTextEditorContent />
</RichTextEditor>`}
        >
          <RichTextEditorBubbleOnlyDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Like the rest of Koala, the editor honors{" "}
          <code className="font-mono text-sm">density</code> — <code className="font-mono text-sm">compact</code>{" "}
          tightens the toolbar and writing-area padding for dense app surfaces. Set it per
          instance or once with a <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview
          previewClassName="justify-stretch"
          code={`<DensityProvider density="compact">
  <RichTextEditor defaultValue="<p>Compact density…</p>">
    <RichTextEditorToolbar />
    <RichTextEditorContent />
  </RichTextEditor>
</DensityProvider>`}
        >
          <RichTextEditorCompactDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Read-only">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">editable={`{false}`}</code> and omit the
          toolbar to render stored content as styled prose — useful for previews and feeds.
        </p>
        <ComponentPreview
          previewClassName="justify-stretch"
          code={`<RichTextEditor editable={false} defaultValue={savedHtml}>
  <RichTextEditorContent />
</RichTextEditor>`}
        >
          <RichTextEditorReadOnlyDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Custom toolbar">
        <p className="mt-4 text-pretty text-muted-foreground">
          With no children the toolbar renders the essential controls. For a custom set,
          pass <code className="font-mono text-sm">RichTextEditorButton</code>s and reach the
          live editor with the <code className="font-mono text-sm">useRichTextEditor</code>{" "}
          hook (pair it with Tiptap&apos;s{" "}
          <code className="font-mono text-sm">useEditorState</code> to reflect active
          formatting).
        </p>
        <ComponentPreview
          previewClassName="justify-stretch"
          code={`function CustomToolbar() {
  const editor = useRichTextEditor()
  const s = useEditorState({
    editor,
    selector: ({ editor }) => ({ bold: !!editor?.isActive("bold") }),
  })
  return (
    <RichTextEditorToolbar>
      <RichTextEditorButton
        tooltip="Bold"
        pressed={s?.bold}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <TextB />
      </RichTextEditorButton>
    </RichTextEditorToolbar>
  )
}`}
        >
          <RichTextEditorCustomToolbarDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
