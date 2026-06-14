import { CodeSnippet } from "@/components/docs/code-snippet"
import { ComponentPreview } from "@/components/docs/component-preview"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  VideoPlayerDemo,
  VideoPlayerSeekPreviewDemo,
  VideoPlayerMinimalDemo,
} from "./demos"

export const metadata = {
  title: "Video Player",
}

const fullCode = `<VideoPlayer>
  <Video src={src} poster={poster} preload="metadata" />
  <VideoSpinner />
  <VideoControls>
    <VideoBar>
      <VideoPlayButton />
      <VideoSeek />
      <VideoTime />
      <VideoVolume />
      <VideoFullscreen />
    </VideoBar>
  </VideoControls>
</VideoPlayer>`

const minimalCode = `<VideoPlayer>
  <Video src={src} poster={poster} preload="metadata" />
  <VideoControls>
    <VideoBar>
      <VideoPlayButton />
      <VideoSeek />
      <VideoTime />
    </VideoBar>
  </VideoControls>
</VideoPlayer>`

export default function VideoPlayerDocsPage() {
  return (
    <>
      <DocHeader
        title="Video Player"
        description="A native way to play media — a real <video> element wrapped in a composable control surface. The scrubber and volume bar are Radix Sliders (keyboard + ARIA for free), the controls auto-hide during playback, and they render light-on-a-dark scrim so they stay legible over any frame in every theme."
      />

      <ComponentPreview code={fullCode} previewClassName="p-6">
        <VideoPlayerDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="video-player" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  VideoPlayer,
  Video,
  VideoControls,
  VideoBar,
  VideoPlayButton,
  VideoSeek,
  VideoTime,
  VideoVolume,
  VideoFullscreen,
  VideoSpinner,
} from "@/components/ui/video-player"

export function Example() {
  return (
    <VideoPlayer>
      <Video src="/clip.mp4" poster="/clip.jpg" preload="metadata" />
      <VideoSpinner />
      <VideoControls>
        <VideoBar>
          <VideoPlayButton />
          <VideoSeek />
          <VideoTime />
          <VideoVolume />
          <VideoFullscreen />
        </VideoBar>
      </VideoControls>
    </VideoPlayer>
  )
}`}
        />
      </DocSection>

      <DocSection title="Anatomy">
        <p className="mt-4 text-pretty text-muted-foreground">
          The player is composed from named parts, never dot-notation. Drop in only the
          controls you need and arrange them however you like — every part reads the shared
          playback state from <code className="font-mono text-sm">VideoPlayer</code>&apos;s
          context, so order and grouping are entirely up to you.
        </p>
        <CodeSnippet filename="anatomy.tsx" className="mt-4" code={fullCode} />
      </DocSection>

      <DocSection title="Minimal">
        <p className="mt-4 text-pretty text-muted-foreground">
          Nothing is required but <code className="font-mono text-sm">VideoPlayer</code> and{" "}
          <code className="font-mono text-sm">Video</code>. Here&apos;s a stripped-back bar
          with just play, scrubber, and timecode on a single row.
        </p>
        <ComponentPreview code={minimalCode} previewClassName="p-6">
          <VideoPlayerMinimalDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Scrub preview">
        <p className="mt-4 text-pretty text-muted-foreground">
          Hover (or drag) the scrubber and a timecode bubble rides the cursor, showing the
          moment you&apos;d land on before you commit — so you can see where you&apos;re heading
          and, against the total in <code className="font-mono text-sm">VideoTime</code>, how
          much is left. It&apos;s built into{" "}
          <code className="font-mono text-sm">VideoSeek</code> — no extra props. With{" "}
          <code className="font-mono text-sm">preload=&quot;metadata&quot;</code> the duration
          is known up front, so it works before you ever press play.
        </p>
        <ComponentPreview code={fullCode} previewClassName="p-6">
          <VideoPlayerSeekPreviewDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Keyboard">
        <p className="mt-4 text-pretty text-muted-foreground">
          Click the video to focus the player, then drive it from the keyboard. The Radix
          scrubber and volume slider keep their own arrow-key handling when focused, so the
          shortcuts below only fire when the player frame itself holds focus.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-2 font-medium">Key</th>
                <th className="px-4 py-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2 font-mono">Space / K</td>
                <td className="px-4 py-2 text-muted-foreground">Play / pause</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">← / →</td>
                <td className="px-4 py-2 text-muted-foreground">Seek 5 seconds</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">↑ / ↓</td>
                <td className="px-4 py-2 text-muted-foreground">Volume up / down</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">M</td>
                <td className="px-4 py-2 text-muted-foreground">Mute / unmute</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">F</td>
                <td className="px-4 py-2 text-muted-foreground">Toggle fullscreen</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">VideoPlayer</code> is the root: it owns the{" "}
          <code className="font-mono text-sm">{`<video>`}</code> ref, broadcasts playback
          state to every part through context, runs the auto-hide timer, and forwards every
          native <code className="font-mono text-sm">{`<div>`}</code> prop plus{" "}
          <code className="font-mono text-sm">hideDelay</code> (idle ms before the controls
          hide during playback — default <code className="font-mono text-sm">2600</code>).
        </p>
        <ul className="mt-4 flex flex-col gap-2 text-pretty text-muted-foreground">
          <li>
            <code className="font-mono text-sm">Video</code> — the media element. Forwards
            every native <code className="font-mono text-sm">{`<video>`}</code> prop
            (<code className="font-mono text-sm">src</code>,{" "}
            <code className="font-mono text-sm">poster</code>,{" "}
            <code className="font-mono text-sm">preload</code>, …); click toggles playback.
          </li>
          <li>
            <code className="font-mono text-sm">VideoControls</code> /{" "}
            <code className="font-mono text-sm">VideoBar</code> — the auto-hiding scrim and a
            control row inside it.
          </li>
          <li>
            <code className="font-mono text-sm">VideoPlayButton</code>,{" "}
            <code className="font-mono text-sm">VideoVolume</code>,{" "}
            <code className="font-mono text-sm">VideoFullscreen</code> — toggle controls that
            read and drive the shared state.
          </li>
          <li>
            <code className="font-mono text-sm">VideoSeek</code> /{" "}
            <code className="font-mono text-sm">VideoVolume</code> wrap{" "}
            <a
              href="https://www.radix-ui.com/primitives/docs/components/slider"
              className="underline underline-offset-4"
            >
              Radix Slider
            </a>{" "}
            and forward its props; <code className="font-mono text-sm">VideoSeek</code> also
            paints a buffered-ahead indicator and a hover scrub preview.
          </li>
          <li>
            <code className="font-mono text-sm">VideoTime</code> — elapsed / total timecode in{" "}
            <code className="font-mono text-sm">tabular-nums</code>.{" "}
            <code className="font-mono text-sm">VideoSpinner</code> renders only while the
            media is buffering.
          </li>
        </ul>
        <p className="mt-4 text-pretty text-muted-foreground">
          Every part accepts <code className="font-mono text-sm">className</code>, merged last
          through the recipe.
        </p>
      </DocSection>
    </>
  )
}
