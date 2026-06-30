import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { QRCode } from "@/components/ui/qr-code"

export const metadata = { title: "QR Code" }

const LEVELS = [
  { level: "L", pct: "~7%" },
  { level: "M", pct: "~15%" },
  { level: "Q", pct: "~25%" },
  { level: "H", pct: "~30%" },
] as const

export default function QRCodeDocsPage() {
  return (
    <>
      <DocHeader
        title="QR Code"
        description="A QR code rendered as crisp, dependency-free SVG. The matrix is generated in-house (byte mode, ECC levels L through H, automatic version and mask selection), so there is no runtime dependency to vendor. Modules paint in the current text color over a background quiet zone, so the code keeps high contrast and re-themes across all four themes."
      />

      <ComponentPreview
        code={`<QRCode value="https://koalaui.com" size={200} />`}
      >
        <QRCode value="https://koalaui.com" size={200} className="p-3 shadow-xs" />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="qr-code" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { QRCode } from "@/components/ui/qr-code"

export function Example() {
  return <QRCode value="https://koalaui.com" />
}`}
        />
      </DocSection>

      <DocSection title="Error correction">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">level</code> sets how much of the code can be
          damaged or covered while still scanning. Higher levels add redundancy, so the same
          data needs a denser grid. Use <code className="font-mono text-sm">H</code> when a logo
          sits on top or the code is printed small; <code className="font-mono text-sm">M</code>{" "}
          (the default) is right for screens.
        </p>
        <ComponentPreview
          code={`<QRCode value="https://koalaui.com" level="L" />
<QRCode value="https://koalaui.com" level="M" /> {/* default */}
<QRCode value="https://koalaui.com" level="Q" />
<QRCode value="https://koalaui.com" level="H" />`}
        >
          <div className="flex flex-wrap items-end justify-center gap-6">
            {LEVELS.map(({ level, pct }) => (
              <div key={level} className="flex flex-col items-center gap-2">
                <QRCode
                  value="https://koalaui.com"
                  level={level}
                  size={120}
                  className="p-2 shadow-xs"
                />
                <span className="text-sm text-muted-foreground">
                  <code className="font-mono text-foreground">{level}</code> · {pct}
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizing">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">size</code> sets the rendered width and height in
          pixels. The SVG is resolution-independent, so it stays sharp at any size; drive it
          per breakpoint with <code className="font-mono text-sm">className</code> if you need a
          responsive code.
        </p>
        <ComponentPreview
          code={`<QRCode value="https://koalaui.com" size={96} />
<QRCode value="https://koalaui.com" size={144} />
<QRCode value="https://koalaui.com" size={192} />`}
        >
          <div className="flex flex-wrap items-end justify-center gap-6">
            {[96, 144, 192].map((s) => (
              <QRCode
                key={s}
                value="https://koalaui.com"
                size={s}
                className="p-2 shadow-xs"
              />
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Quiet zone">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">margin</code> is the light border around the code,
          measured in modules. The spec asks for at least <strong>4</strong> for reliable
          scanning; drop it lower only when the surrounding surface already supplies light
          padding (as the panel below does).
        </p>
        <ComponentPreview
          code={`{/* full 4-module quiet zone, baked in */}
<QRCode value="https://koalaui.com" margin={4} />

{/* tighter, because the panel adds its own padding */}
<div className="rounded-xl border border-border bg-accent p-6">
  <QRCode value="https://koalaui.com" margin={1} className="p-3" />
</div>`}
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <QRCode value="https://koalaui.com" margin={4} size={140} className="shadow-xs" />
            <div className="rounded-xl border border-border bg-accent p-6">
              <QRCode
                value="https://koalaui.com"
                margin={1}
                size={140}
                className="p-3 shadow-xs"
              />
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Color & theming">
        <p className="mt-4 text-pretty text-muted-foreground">
          Modules paint in <code className="font-mono text-sm">currentColor</code> over the
          component&apos;s background, so a code re-themes by default. You can recolor it with
          any text token, but keep the contrast high: scanners need the modules clearly darker
          (or clearly lighter) than the quiet zone. The brand-tinted example below still reads
          because <code className="font-mono text-sm">text-brand</code> stays well clear of the
          card background.
        </p>
        <ComponentPreview
          code={`{/* default: foreground modules on the page background */}
<QRCode value="https://koalaui.com" />

{/* brand-tinted modules on a card surface */}
<QRCode value="https://koalaui.com" className="bg-card text-brand p-3 shadow-xs" />`}
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <QRCode value="https://koalaui.com" size={140} className="p-3 shadow-xs" />
            <QRCode
              value="https://koalaui.com"
              size={140}
              className="bg-card text-brand p-3 shadow-xs"
            />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Module shape">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">moduleRadius</code> rounds each module, as a
          fraction of its size: <code className="font-mono text-sm">0</code> (the default) for
          sharp squares, <code className="font-mono text-sm">0.3</code> for a soft look, up to{" "}
          <code className="font-mono text-sm">0.5</code> for full dots. Keep it modest, heavy
          rounding eats into the modules and can hurt scanning.
        </p>
        <ComponentPreview
          code={`<QRCode value="https://koalaui.com" moduleRadius={0} /> {/* default */}
<QRCode value="https://koalaui.com" moduleRadius={0.3} />
<QRCode value="https://koalaui.com" moduleRadius={0.5} />`}
        >
          <div className="flex flex-wrap items-end justify-center gap-6">
            {[
              { r: 0, label: "0 · default" },
              { r: 0.3, label: "0.3 · soft" },
              { r: 0.5, label: "0.5 · dots" },
            ].map(({ r, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <QRCode
                  value="https://koalaui.com"
                  moduleRadius={r}
                  size={120}
                  className="p-2 shadow-xs"
                />
                <span className="text-sm text-muted-foreground">
                  <code className="font-mono text-foreground">{label}</code>
                </span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="In a dialog">
        <p className="mt-4 text-pretty text-muted-foreground">
          A QR code pairs naturally with a verification flow. See the{" "}
          <a href="/docs/components/dialog#two-factor-2fa" className="underline underline-offset-4">
            two-factor (2FA) Dialog
          </a>{" "}
          for a full example: a <code className="font-mono text-sm">QRCode</code> on a nested
          panel above an{" "}
          <a href="/docs/components/otp-input" className="underline underline-offset-4">OTP Input</a>.
        </p>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Prop</th>
                <th className="py-2 pr-4 font-medium">Type</th>
                <th className="py-2 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs [&_td]:py-2 [&_td]:pr-4 [&_tr]:border-b [&_tr]:border-border/60">
              <tr>
                <td className="text-foreground">value</td>
                <td className="text-muted-foreground">string</td>
                <td className="text-muted-foreground">required</td>
              </tr>
              <tr>
                <td className="text-foreground">level</td>
                <td className="text-muted-foreground">&quot;L&quot; | &quot;M&quot; | &quot;Q&quot; | &quot;H&quot;</td>
                <td className="text-muted-foreground">&quot;M&quot;</td>
              </tr>
              <tr>
                <td className="text-foreground">size</td>
                <td className="text-muted-foreground">number</td>
                <td className="text-muted-foreground">160</td>
              </tr>
              <tr>
                <td className="text-foreground">margin</td>
                <td className="text-muted-foreground">number</td>
                <td className="text-muted-foreground">4</td>
              </tr>
              <tr>
                <td className="text-foreground">moduleRadius</td>
                <td className="text-muted-foreground">number</td>
                <td className="text-muted-foreground">0</td>
              </tr>
              <tr>
                <td className="text-foreground">title</td>
                <td className="text-muted-foreground">string</td>
                <td className="text-muted-foreground">&quot;QR code&quot;</td>
              </tr>
              <tr>
                <td className="text-foreground">className</td>
                <td className="text-muted-foreground">string</td>
                <td className="text-muted-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-pretty text-sm text-muted-foreground">
          All other native <code className="font-mono">svg</code> props are forwarded to the root
          element.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "Does this pull in a QR library?",
              a: "No. The encoder is hand-rolled and dependency-free, matching the rest of Koala's hard primitives like Chart, Calendar, and the Command palette. It supports byte mode (UTF-8), which covers URLs, plain text, and otpauth:// URIs, and selects the smallest version and the lowest-penalty mask automatically.",
            },
            {
              q: "Will it scan in dark mode?",
              a: "Yes. Modules use the current text color over the component's own background, so in every theme the code keeps a high-contrast light-vs-dark relationship. Modern scanners read inverted (light-on-dark) codes fine. For print or when you set a custom color, keep the modules clearly distinct from the quiet zone.",
            },
            {
              q: "How much data can it hold?",
              a: "Up to QR version 40. At the default M level that is roughly 2300 bytes; level L holds more, level H less. The component throws if the value is too long to encode, so cap or shorten very large payloads (a short URL almost always fits in a small, dense-free code).",
            },
            {
              q: "Can I put a logo in the middle?",
              a: "Overlay one yourself with an absolutely-positioned element centered over the code, and bump level to H so the redundancy covers the occluded modules. Keep the logo under about 25% of the area so enough of the matrix survives to scan.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
