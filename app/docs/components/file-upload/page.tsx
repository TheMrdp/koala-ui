import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  ShowcaseDemo,
  AnatomyDemo,
  BrowseButtonDemo,
  ImageGridDemo,
  AvatarDemo,
  ValidationDemo,
  DensityDemo,
  DisabledDemo,
} from "./file-upload-demos"

export const metadata = { title: "File Upload" }

export default function FileUploadDocsPage() {
  return (
    <>
      <DocHeader
        title="File Upload"
        description="The uploading experience - a drag-and-drop dropzone, a browse trigger, and built-in accept/size/count validation. Pairs with File Card for the resulting rows and per-file progress; composes into upload trays, image grids, and avatar pickers."
      />

      <ComponentPreview previewClassName="block" code={SHOWCASE_CODE}>
        <ShowcaseDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation
          component="file-upload"
          dependencies="npm install @phosphor-icons/react radix-ui tailwind-variants tailwind-merge"
        />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          File Upload owns <em>selection</em>: it emits accepted files through{" "}
          <code className="font-mono text-sm">onFiles</code> and rejections through{" "}
          <code className="font-mono text-sm">onReject</code>, and you own the list. Render the
          resulting rows with{" "}
          <a href="/docs/components/file-card" className="underline underline-offset-4">File Card</a>{" "}
          inside a <code className="font-mono text-sm">FileUploadList</code> - the two compose into
          the full experience.
        </p>
        <CodeSnippet filename="uploader.tsx" className="mt-4" code={USAGE_CODE} />
      </DocSection>

      <DocSection title="Anatomy">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">FileUpload</code> root holds a hidden file input
          and the shared state; the <code className="font-mono text-sm">FileUploadDropzone</code> is
          the dashed drop surface (click or Enter/Space opens the picker, dragging a file over it
          brand-tints the panel), filled with a{" "}
          <code className="font-mono text-sm">FileUploadIcon</code>,{" "}
          <code className="font-mono text-sm">FileUploadTitle</code>,{" "}
          <code className="font-mono text-sm">FileUploadDescription</code>, and a{" "}
          <code className="font-mono text-sm">FileUploadTrigger</code>.
        </p>
        <ComponentPreview previewClassName="block" code={ANATOMY_CODE}>
          <AnatomyDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Browse button">
        <p className="mt-4 text-pretty text-muted-foreground">
          No room for a dropzone? Drop a <code className="font-mono text-sm">FileUploadTrigger</code>{" "}
          on its own - it opens the same picker, so an attach action is a single button. The trigger
          reuses the DS{" "}
          <a href="/docs/components/button" className="underline underline-offset-4">Button</a>, so it
          inherits every variant, size, and the press scale.
        </p>
        <ComponentPreview code={BROWSE_BUTTON_CODE}>
          <BrowseButtonDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Image uploader">
        <p className="mt-4 text-pretty text-muted-foreground">
          Constrain <code className="font-mono text-sm">accept</code> to{" "}
          <code className="font-mono text-sm">image/*</code> and render the selected files as a
          thumbnail grid for a gallery-style uploader. Each preview rides an object URL, with a
          remove control that fades in on hover.
        </p>
        <ComponentPreview previewClassName="block" code={IMAGE_GRID_CODE}>
          <ImageGridDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Avatar picker">
        <p className="mt-4 text-pretty text-muted-foreground">
          Compose the trigger with an{" "}
          <a href="/docs/components/avatar" className="underline underline-offset-4">Avatar</a> for a
          profile-photo picker: a single-file <code className="font-mono text-sm">image/*</code>{" "}
          upload that swaps the avatar in place, with a “Change photo” / “Remove” pair.
        </p>
        <ComponentPreview code={AVATAR_CODE}>
          <AvatarDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Validation">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">accept</code>,{" "}
          <code className="font-mono text-sm">maxSize</code> (bytes), and{" "}
          <code className="font-mono text-sm">multiple</code>, and dropped or picked files are split
          for you: <code className="font-mono text-sm">onFiles</code> gets the keepers,{" "}
          <code className="font-mono text-sm">onReject</code> gets the rest with a{" "}
          <code className="font-mono text-sm">reason</code> (
          <code className="font-mono text-sm">type</code>,{" "}
          <code className="font-mono text-sm">size</code>, or{" "}
          <code className="font-mono text-sm">count</code>) so you can surface a precise message.
        </p>
        <ComponentPreview previewClassName="block" code={VALIDATION_CODE}>
          <ValidationDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Density is Koala&rsquo;s cross-cutting spacing axis (see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>).
          For File Upload it tunes the dropzone padding and the icon tile.{" "}
          <code className="font-mono text-sm">comfortable</code> is the roomy default;{" "}
          <code className="font-mono text-sm">compact</code> tightens it for app shells and dense
          forms. Set it per-instance or for a whole subtree with{" "}
          <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview previewClassName="block" code={DENSITY_CODE}>
          <DensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">disabled</code> to the root and the whole control
          goes inert - the dropzone stops accepting drops and clicks, the trigger disables, and the
          surface dims.
        </p>
        <ComponentPreview previewClassName="block" code={DISABLED_CODE}>
          <DisabledDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">FileUpload</code> forwards{" "}
          <code className="font-mono text-sm">div</code> props and adds{" "}
          <code className="font-mono text-sm">accept</code>,{" "}
          <code className="font-mono text-sm">multiple</code>,{" "}
          <code className="font-mono text-sm">maxSize</code> (bytes),{" "}
          <code className="font-mono text-sm">disabled</code>,{" "}
          <code className="font-mono text-sm">density</code> (
          <code className="font-mono text-sm">comfortable | compact</code>),{" "}
          <code className="font-mono text-sm">onFiles(files)</code>, and{" "}
          <code className="font-mono text-sm">onReject(rejections)</code> (each rejection is{" "}
          <code className="font-mono text-sm">{`{ file, reason }`}</code>).{" "}
          <code className="font-mono text-sm">FileUploadDropzone</code> forwards{" "}
          <code className="font-mono text-sm">div</code> props and renders a keyboard-navigable
          drop surface. <code className="font-mono text-sm">FileUploadTrigger</code> extends{" "}
          <a href="/docs/components/button" className="underline underline-offset-4">Button</a>{" "}
          (defaults to <code className="font-mono text-sm">outline</code>) and opens the picker.{" "}
          <code className="font-mono text-sm">FileUploadIcon</code>,{" "}
          <code className="font-mono text-sm">FileUploadTitle</code>,{" "}
          <code className="font-mono text-sm">FileUploadDescription</code>, and{" "}
          <code className="font-mono text-sm">FileUploadList</code> forward their element props. The
          helper <code className="font-mono text-sm">formatBytes(bytes)</code> renders a human file
          size for the meta line. Every part accepts{" "}
          <code className="font-mono text-sm">className</code>, merged last.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "Does File Upload store the selected files for me?", a: "No. It owns selection only: accepted files arrive through `onFiles` and rejections through `onReject`, and you keep the list in your own state. Render that list with File Card inside `FileUploadList`." },
            { q: "How do I reject files that are too big or the wrong type?", a: "Pass `accept`, `maxSize` (in bytes), and `multiple` to the `FileUpload` root and dropped or picked files are split for you. The keepers go to `onFiles`; the rest go to `onReject` as `{ file, reason }` where reason is `type`, `size`, or `count`." },
            { q: "Can I use a single button instead of the full dropzone?", a: "Yes. Drop a `FileUploadTrigger` on its own without a `FileUploadDropzone`. It opens the same picker and extends our Button, so it inherits every variant and size (it defaults to `outline`)." },
            { q: "Is the dropzone keyboard accessible?", a: "Yes. `FileUploadDropzone` is a keyboard-navigable drop surface: focus it and press Enter or Space to open the file picker, the same as clicking it." },
            { q: "How do I make the whole control inert?", a: "Pass `disabled` to the `FileUpload` root. The dropzone stops accepting drops and clicks, the trigger disables, and the surface dims." },
            { q: "How do I tune the dropzone padding for a dense form?", a: "Set `density` to `compact` on the root (the default is `comfortable`), which tightens the dropzone padding and icon tile. Set it per instance or for a whole subtree with `DensityProvider`." },
          ]}
        />
      </DocSection>
    </>
  )
}

/* ------------------------------------------------------------ code blocks --- */

const SHOWCASE_CODE = `<FileUpload multiple accept="image/*,.pdf,.zip" onFiles={addItems}>
  <FileUploadDropzone>
    <FileUploadIcon />
    <div className="flex flex-col gap-1">
      <FileUploadTitle>Drag & drop files here</FileUploadTitle>
      <FileUploadDescription>or click to browse · up to 10 MB each</FileUploadDescription>
    </div>
    <FileUploadTrigger size="sm">Browse files</FileUploadTrigger>
  </FileUploadDropzone>

  <FileUploadList>
    {items.map((it) => (
      <FileCard key={it.id} state={it.status}>
        <FileCardIcon type={it.type} />
        <FileCardContent>
          <FileCardName>{it.name}</FileCardName>
          {it.status === "uploading" ? (
            <FileCardProgress value={it.progress} label="Uploading…" />
          ) : (
            <FileCardMeta>{formatBytes(it.size)} · Uploaded</FileCardMeta>
          )}
        </FileCardContent>
        <FileCardActions>
          <FileCardStatus />
          <Button variant="ghost" size="sm" iconOnly aria-label="Remove" onClick={() => removeItem(it.id)}>
            <Trash />
          </Button>
        </FileCardActions>
      </FileCard>
    ))}
  </FileUploadList>
</FileUpload>`

const USAGE_CODE = `import {
  FileUpload,
  FileUploadDropzone,
  FileUploadIcon,
  FileUploadTitle,
  FileUploadDescription,
  FileUploadTrigger,
  FileUploadList,
  formatBytes,
} from "@/components/ui/file-upload"
import {
  FileCard,
  FileCardIcon,
  FileCardContent,
  FileCardName,
  FileCardMeta,
  fileTypeFromName,
} from "@/components/ui/file-card"

export function Uploader() {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <FileUpload multiple onFiles={(f) => setFiles((prev) => [...prev, ...f])}>
      <FileUploadDropzone>
        <FileUploadIcon />
        <FileUploadTitle>Drag & drop files here</FileUploadTitle>
        <FileUploadDescription>or click to browse</FileUploadDescription>
        <FileUploadTrigger size="sm">Browse files</FileUploadTrigger>
      </FileUploadDropzone>

      <FileUploadList>
        {files.map((file, i) => (
          <FileCard key={i}>
            <FileCardIcon type={fileTypeFromName(file.name)} />
            <FileCardContent>
              <FileCardName>{file.name}</FileCardName>
              <FileCardMeta>{formatBytes(file.size)}</FileCardMeta>
            </FileCardContent>
          </FileCard>
        ))}
      </FileUploadList>
    </FileUpload>
  )
}`

const ANATOMY_CODE = `<FileUpload onFiles={handleFiles}>
  <FileUploadDropzone>
    <FileUploadIcon />
    <div className="flex flex-col gap-1">
      <FileUploadTitle>Drag & drop files here</FileUploadTitle>
      <FileUploadDescription>or click to browse · up to 10 MB each</FileUploadDescription>
    </div>
    <FileUploadTrigger size="sm">Browse files</FileUploadTrigger>
  </FileUploadDropzone>
</FileUpload>`

const BROWSE_BUTTON_CODE = `<FileUpload accept=".pdf,.doc,.docx" onFiles={(f) => setName(f[0]?.name)}>
  <div className="flex items-center gap-3">
    <FileUploadTrigger><Paperclip />Attach a file</FileUploadTrigger>
    <span className="text-sm text-muted-foreground">{name ?? "No file selected"}</span>
  </div>
</FileUpload>`

const IMAGE_GRID_CODE = `<FileUpload multiple accept="image/*" density="compact" onFiles={addImages}>
  <FileUploadDropzone>
    <FileUploadIcon><ImageSquare /></FileUploadIcon>
    <FileUploadTitle>Add images</FileUploadTitle>
    <FileUploadDescription>PNG, JPG or GIF · drop or browse</FileUploadDescription>
  </FileUploadDropzone>

  <div className="grid grid-cols-4 gap-3">
    {images.map((img) => (
      <div key={img.id} className="group/tile relative aspect-square overflow-hidden rounded-lg bg-muted ring-1 ring-inset ring-black/10">
        <img src={img.url} alt={img.name} className="size-full object-cover" />
        <Button variant="secondary" size="sm" iconOnly aria-label="Remove"
          onClick={() => removeImage(img.id)}
          className="absolute right-1.5 top-1.5 size-7 rounded-full opacity-0 group-hover/tile:opacity-100">
          <X />
        </Button>
      </div>
    ))}
  </div>
</FileUpload>`

const AVATAR_CODE = `<FileUpload accept="image/*" onFiles={pick}>
  <div className="flex items-center gap-4">
    <AvatarRoot size="xl">
      {url && <AvatarImage src={url} alt="Profile photo" />}
      <AvatarFallback>JC</AvatarFallback>
    </AvatarRoot>
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <FileUploadTrigger size="sm">{url ? "Change photo" : "Upload photo"}</FileUploadTrigger>
        {url && <Button variant="ghost" size="sm" onClick={remove}>Remove</Button>}
      </div>
      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 2 MB max.</p>
    </div>
  </div>
</FileUpload>`

const VALIDATION_CODE = `<FileUpload
  accept=".pdf"
  maxSize={2 * 1024 * 1024}
  onFiles={(accepted) => setFiles((prev) => [...prev, ...accepted])}
  onReject={(rejections) => {
    const r = rejections[0]
    setError(
      r.reason === "size" ? \`\${r.file.name} is too large - 2 MB max.\`
      : r.reason === "type" ? \`\${r.file.name} isn't a PDF.\`
      : "Only one file at a time.",
    )
  }}
>
  <FileUploadDropzone>
    <FileUploadIcon><FilePdf /></FileUploadIcon>
    <FileUploadTitle>Upload a PDF</FileUploadTitle>
    <FileUploadDescription>Single PDF file, up to 2 MB</FileUploadDescription>
  </FileUploadDropzone>
  {error && <p className="text-xs text-destructive">{error}</p>}
</FileUpload>`

const DENSITY_CODE = `<FileUpload density="comfortable">…</FileUpload>
<FileUpload density="compact">…</FileUpload>`

const DISABLED_CODE = `<FileUpload disabled>
  <FileUploadDropzone>
    <FileUploadIcon />
    <FileUploadTitle>Uploads paused</FileUploadTitle>
    <FileUploadDescription>You've reached your storage limit</FileUploadDescription>
    <FileUploadTrigger size="sm">Browse files</FileUploadTrigger>
  </FileUploadDropzone>
</FileUpload>`
