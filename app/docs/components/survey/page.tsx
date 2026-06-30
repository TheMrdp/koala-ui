import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  SurveyDemo,
  TypesDemo,
  QuestionTypesDemo,
  ScaleDemo,
  RatingDemo,
  DescriptionDemo,
  DensityDemo,
  ControlledDemo,
} from "./survey-examples-demo"

export const metadata = { title: "Survey" }

export default function SurveyDocsPage() {
  return (
    <>
      <DocHeader
        title="Survey"
        description="Google-Forms-style question cards: an eyebrow, a title with an optional required asterisk, and an answer. Survey owns the layout and semantics; the controls are the real DS components, so a single choice composes RadioGroup, multiple composes Checkbox, and short-answer / paragraph / dropdown / linear-scale questions compose Input, Textarea, Select, and RadioGroup respectively."
      />

      <ComponentPreview previewClassName="block" code={HERO_CODE}>
        <div className="flex justify-center">
          <SurveyDemo />
        </div>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="survey" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  SurveyQuestion,
  SurveyHeader,
  SurveyEyebrow,
  SurveyTitle,
  SurveyOptions,
  SurveyOption,
} from "@/components/ui/survey"

export function Example() {
  return (
    <SurveyQuestion required>
      <SurveyHeader>
        <SurveyEyebrow>Pregunta 1</SurveyEyebrow>
        <SurveyTitle>¿Qué es el metagaming?</SurveyTitle>
      </SurveyHeader>
      <SurveyOptions defaultValue="ooc">
        <SurveyOption value="ooc">Usar información OOC dentro del rol IC</SurveyOption>
        <SurveyOption value="sessions">Jugar varias sesiones seguidas</SurveyOption>
      </SurveyOptions>
    </SurveyQuestion>
  )
}`}
        />
      </DocSection>

      <DocSection title="Single &amp; multiple choice">
        <p className="mt-4 text-pretty text-muted-foreground">
          Without a prop, <code className="font-mono text-sm">SurveyOptions</code> is a single
          choice: the DS <code className="font-mono text-sm">RadioGroup</code> with its canonical
          dot and roving focus, reporting a <code className="font-mono text-sm">string</code>. Add{" "}
          <code className="font-mono text-sm">multiple</code> and each row becomes a DS{" "}
          <code className="font-mono text-sm">Checkbox</code> reporting a{" "}
          <code className="font-mono text-sm">string[]</code>. The controls aren&apos;t re-styled;
          they&apos;re the same radio and checkbox you&apos;d use anywhere else.
        </p>
        <ComponentPreview previewClassName="block" code={TYPES_CODE}>
          <TypesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Text, paragraph &amp; dropdown">
        <p className="mt-4 text-pretty text-muted-foreground">
          A question doesn&apos;t have to be a choice.{" "}
          <code className="font-mono text-sm">SurveyShortAnswer</code> composes the DS{" "}
          <code className="font-mono text-sm">Input</code>,{" "}
          <code className="font-mono text-sm">SurveyParagraph</code> the auto-growing{" "}
          <code className="font-mono text-sm">Textarea</code> (with an optional counter), and{" "}
          <code className="font-mono text-sm">SurveyDropdown</code> the{" "}
          <code className="font-mono text-sm">Select</code> for long option lists. Each is labelled
          by the question title automatically.
        </p>
        <ComponentPreview previewClassName="block" code={QUESTION_TYPES_CODE}>
          <QuestionTypesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Linear scale">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">SurveyScale</code> is a 1-to-N rating row built on{" "}
          <code className="font-mono text-sm">RadioGroup</code>. Set{" "}
          <code className="font-mono text-sm">min</code>/<code className="font-mono text-sm">max</code>{" "}
          and optional <code className="font-mono text-sm">minLabel</code>/
          <code className="font-mono text-sm">maxLabel</code> captions for the ends.
        </p>
        <ComponentPreview previewClassName="block" code={SCALE_CODE}>
          <div className="flex justify-center">
            <ScaleDemo />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Rating">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">SurveyRating</code> composes the DS{" "}
          <code className="font-mono text-sm">Rating</code> for a star score, labelled by the
          question title. It forwards every <code className="font-mono text-sm">Rating</code> prop:{" "}
          <code className="font-mono text-sm">max</code>, <code className="font-mono text-sm">size</code>
          , <code className="font-mono text-sm">icon</code>, <code className="font-mono text-sm">readOnly</code>.
        </p>
        <ComponentPreview previewClassName="block" code={RATING_CODE}>
          <div className="flex justify-center">
            <RatingDemo />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Description &amp; disabled options">
        <p className="mt-4 text-pretty text-muted-foreground">
          Add a <code className="font-mono text-sm">SurveyDescription</code> under the title for
          context, and disable any single <code className="font-mono text-sm">SurveyOption</code>:
          keyboard navigation skips it and its row dims.
        </p>
        <ComponentPreview previewClassName="block" code={DESCRIPTION_CODE}>
          <div className="flex justify-center">
            <DescriptionDemo />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">{`density="compact"`}</code> tightens the card padding,
          gaps, and row height for embedded, information-dense forms; radius and color never
          change. Defaults to <code className="font-mono text-sm">comfortable</code>, or set it once
          on a <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview previewClassName="block" code={DENSITY_CODE}>
          <div className="flex justify-center">
            <DensityDemo />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Controlled">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">value</code> and{" "}
          <code className="font-mono text-sm">onValueChange</code> to own the selection. For a{" "}
          <code className="font-mono text-sm">multiple</code> group the value is a{" "}
          <code className="font-mono text-sm">string[]</code>.
        </p>
        <ComponentPreview previewClassName="block" code={CONTROLLED_CODE}>
          <div className="flex justify-center">
            <ControlledDemo />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "How do I switch SurveyOptions between single and multiple choice?", a: "Leave SurveyOptions bare for a single choice: it renders the DS RadioGroup and reports a `string`. Add the `multiple` prop and each row becomes a DS Checkbox reporting a `string[]`. The controls are the real DS components, not restyled copies." },
            { q: "Which part do I use for free text instead of choices?", a: "`SurveyShortAnswer` composes the DS Input for one line, `SurveyParagraph` the auto-growing Textarea (pass `showCount` and `maxLength` for a counter), and `SurveyDropdown` the Select for long option lists. Each is labelled by the question title automatically." },
            { q: "What is the difference between SurveyScale and SurveyRating?", a: "`SurveyScale` is a 1-to-N linear scale built on RadioGroup: set `min` and `max` and optional `minLabel` and `maxLabel` captions for the ends. `SurveyRating` composes the DS Rating for a star score and forwards Rating props like `max`, `size`, `icon`, and `readOnly`." },
            { q: "How do I mark a question as required?", a: "Pass `required` to `SurveyQuestion` and the title renders a destructive asterisk plus an sr-only (required) note. You can override the inherited state on an individual `SurveyTitle` with its own `required` prop." },
            { q: "Are the answer controls wired to the question title for screen readers?", a: "Yes. SurveyQuestion generates a title id, and every answer part (options, short answer, paragraph, dropdown, scale, rating) is given `aria-labelledby` pointing at it, so you do not label the controls again." },
            { q: "How do I make a survey card denser?", a: "Set `density=\"compact\"` on `SurveyQuestion` to tighten padding, gaps, and row height for embedded forms, or set it once on a `DensityProvider` for a whole subtree. Radius and color never change." },
          ]}
        />
      </DocSection>
    </>
  )
}

const HERO_CODE = `<SurveyQuestion required className="max-w-xl">
  <SurveyHeader>
    <SurveyEyebrow>Pregunta 1</SurveyEyebrow>
    <SurveyTitle>¿Qué es el metagaming?</SurveyTitle>
  </SurveyHeader>
  <SurveyOptions defaultValue="ooc">
    <SurveyOption value="ooc">Usar información OOC dentro del rol IC</SurveyOption>
    <SurveyOption value="sessions">Jugar varias sesiones seguidas</SurveyOption>
    <SurveyOption value="interact">Interactuar con otros roleplayers en el servidor</SurveyOption>
    <SurveyOption value="repeat">Repetir una misión para obtener más recompensas</SurveyOption>
  </SurveyOptions>
</SurveyQuestion>`

const TYPES_CODE = `// Single choice: circular controls, reports a string
<SurveyOptions value={choice} onValueChange={setChoice}>
  <SurveyOption value="monthly">Monthly</SurveyOption>
  <SurveyOption value="yearly">Yearly (save 20%)</SurveyOption>
</SurveyOptions>

// Multiple choice: square controls, reports a string[]
<SurveyOptions multiple value={perks} onValueChange={setPerks}>
  <SurveyOption value="api">API access</SurveyOption>
  <SurveyOption value="sso">Single sign-on</SurveyOption>
  <SurveyOption value="audit">Audit logs</SurveyOption>
</SurveyOptions>`

const QUESTION_TYPES_CODE = `// Short answer: composes the DS Input
<SurveyQuestion required>
  <SurveyHeader>
    <SurveyEyebrow>Pregunta 5</SurveyEyebrow>
    <SurveyTitle>¿Cuál es tu nombre de personaje?</SurveyTitle>
  </SurveyHeader>
  <SurveyShortAnswer placeholder="Ej. Marcus Vega" />
</SurveyQuestion>

// Paragraph: composes the auto-growing DS Textarea
<SurveyParagraph placeholder="Escribe su trasfondo…" showCount maxLength={280} />

// Dropdown: composes the DS Select
<SurveyDropdown
  options={[
    { value: "police", label: "Policía" },
    { value: "medic", label: "Servicios médicos" },
    { value: "civilian", label: "Civil" },
  ]}
  placeholder="Elige una facción…"
/>`

const SCALE_CODE = `const [rating, setRating] = useState("4")

<SurveyQuestion required>
  <SurveyHeader>
    <SurveyEyebrow>Pregunta 8</SurveyEyebrow>
    <SurveyTitle>¿Qué tan claras te parecieron las reglas?</SurveyTitle>
  </SurveyHeader>
  <SurveyScale
    min={1}
    max={5}
    minLabel="Nada claras"
    maxLabel="Muy claras"
    value={rating}
    onValueChange={setRating}
    name="clarity"
  />
</SurveyQuestion>`

const RATING_CODE = `const [stars, setStars] = useState(4)

<SurveyQuestion required>
  <SurveyHeader>
    <SurveyEyebrow>Pregunta 9</SurveyEyebrow>
    <SurveyTitle>¿Cómo calificarías tu experiencia?</SurveyTitle>
  </SurveyHeader>
  <SurveyRating value={stars} onValueChange={setStars} size="lg" />
</SurveyQuestion>`

const DESCRIPTION_CODE = `<SurveyQuestion required>
  <SurveyHeader>
    <SurveyEyebrow>Pregunta 4</SurveyEyebrow>
    <SurveyTitle>Choose your deployment region</SurveyTitle>
    <SurveyDescription>
      Data residency follows your selection. The EU region is temporarily at capacity.
    </SurveyDescription>
  </SurveyHeader>
  <SurveyOptions defaultValue="us">
    <SurveyOption value="us">US East (N. Virginia)</SurveyOption>
    <SurveyOption value="eu" disabled>EU West (Ireland), at capacity</SurveyOption>
    <SurveyOption value="ap">Asia Pacific (Singapore)</SurveyOption>
  </SurveyOptions>
</SurveyQuestion>`

const DENSITY_CODE = `<SurveyQuestion density="compact">
  <SurveyHeader>
    <SurveyEyebrow>Question 2</SurveyEyebrow>
    <SurveyTitle>How did you hear about us?</SurveyTitle>
  </SurveyHeader>
  <SurveyOptions defaultValue="search">
    <SurveyOption value="search">Search engine</SurveyOption>
    <SurveyOption value="social">Social media</SurveyOption>
    <SurveyOption value="friend">A friend or colleague</SurveyOption>
  </SurveyOptions>
</SurveyQuestion>`

const CONTROLLED_CODE = `const [values, setValues] = useState(["realism"])

<SurveyOptions multiple value={values} onValueChange={setValues}>
  <SurveyOption value="realism">Realismo en las acciones</SurveyOption>
  <SurveyOption value="nopowergaming">No hacer powergaming</SurveyOption>
  <SurveyOption value="nometagaming">No hacer metagaming</SurveyOption>
  <SurveyOption value="respect">Respeto fuera de personaje</SurveyOption>
</SurveyOptions>`
