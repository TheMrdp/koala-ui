"use client"

import * as React from "react"

import {
  SurveyQuestion,
  SurveyHeader,
  SurveyEyebrow,
  SurveyTitle,
  SurveyDescription,
  SurveyOptions,
  SurveyOption,
  SurveyShortAnswer,
  SurveyParagraph,
  SurveyDropdown,
  SurveyScale,
  SurveyRating,
} from "@/components/ui/survey"

/** Hero: the reference question, a single choice with a required title and a filled-check control. */
const METAGAMING = [
  { value: "ooc", label: "Usar información OOC dentro del rol IC" },
  { value: "sessions", label: "Jugar varias sesiones seguidas" },
  { value: "interact", label: "Interactuar con otros roleplayers en el servidor" },
  { value: "repeat", label: "Repetir una misión para obtener más recompensas" },
] as const

export function SurveyDemo() {
  return (
    <SurveyQuestion required className="w-full max-w-xl">
      <SurveyHeader>
        <SurveyEyebrow>Pregunta 1</SurveyEyebrow>
        <SurveyTitle>¿Qué es el metagaming?</SurveyTitle>
      </SurveyHeader>
      <SurveyOptions defaultValue="ooc">
        {METAGAMING.map(({ value, label }) => (
          <SurveyOption key={value} value={value}>
            {label}
          </SurveyOption>
        ))}
      </SurveyOptions>
    </SurveyQuestion>
  )
}

/** Single vs. multiple: circular controls for one choice, square for many; both report their value. */
export function TypesDemo() {
  const [choice, setChoice] = React.useState("monthly")
  const [perks, setPerks] = React.useState<string[]>(["api"])
  return (
    <div className="grid w-full gap-5 lg:grid-cols-2">
      <SurveyQuestion>
        <SurveyHeader>
          <SurveyEyebrow>Single choice</SurveyEyebrow>
          <SurveyTitle>Billing period</SurveyTitle>
        </SurveyHeader>
        <SurveyOptions value={choice} onValueChange={setChoice}>
          <SurveyOption value="monthly">Monthly</SurveyOption>
          <SurveyOption value="yearly">Yearly (save 20%)</SurveyOption>
        </SurveyOptions>
      </SurveyQuestion>

      <SurveyQuestion>
        <SurveyHeader>
          <SurveyEyebrow>Multiple choice</SurveyEyebrow>
          <SurveyTitle>Which features matter most?</SurveyTitle>
        </SurveyHeader>
        <SurveyOptions multiple value={perks} onValueChange={setPerks}>
          <SurveyOption value="api">API access</SurveyOption>
          <SurveyOption value="sso">Single sign-on</SurveyOption>
          <SurveyOption value="audit">Audit logs</SurveyOption>
        </SurveyOptions>
      </SurveyQuestion>
    </div>
  )
}

/** A description adds context under the title, and an option can be individually disabled. */
export function DescriptionDemo() {
  return (
    <SurveyQuestion required className="w-full max-w-xl">
      <SurveyHeader>
        <SurveyEyebrow>Pregunta 4</SurveyEyebrow>
        <SurveyTitle>Choose your deployment region</SurveyTitle>
        <SurveyDescription>
          Data residency follows your selection. The EU region is temporarily at capacity.
        </SurveyDescription>
      </SurveyHeader>
      <SurveyOptions defaultValue="us">
        <SurveyOption value="us">US East (N. Virginia)</SurveyOption>
        <SurveyOption value="eu" disabled>
          EU West (Ireland), at capacity
        </SurveyOption>
        <SurveyOption value="ap">Asia Pacific (Singapore)</SurveyOption>
      </SurveyOptions>
    </SurveyQuestion>
  )
}

/** Compact density tightens the card padding and rows for embedded, information-dense forms. */
export function DensityDemo() {
  return (
    <SurveyQuestion density="compact" className="w-full max-w-md">
      <SurveyHeader>
        <SurveyEyebrow>Question 2</SurveyEyebrow>
        <SurveyTitle>How did you hear about us?</SurveyTitle>
      </SurveyHeader>
      <SurveyOptions defaultValue="search">
        <SurveyOption value="search">Search engine</SurveyOption>
        <SurveyOption value="social">Social media</SurveyOption>
        <SurveyOption value="friend">A friend or colleague</SurveyOption>
      </SurveyOptions>
    </SurveyQuestion>
  )
}

/** Beyond choices: short answer (Input), paragraph (Textarea), and a dropdown (Select). */
export function QuestionTypesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-5">
      <SurveyQuestion required>
        <SurveyHeader>
          <SurveyEyebrow>Pregunta 5</SurveyEyebrow>
          <SurveyTitle>¿Cuál es tu nombre de personaje?</SurveyTitle>
        </SurveyHeader>
        <SurveyShortAnswer placeholder="Ej. Marcus Vega" />
      </SurveyQuestion>

      <SurveyQuestion>
        <SurveyHeader>
          <SurveyEyebrow>Pregunta 6</SurveyEyebrow>
          <SurveyTitle>Describe la historia de tu personaje</SurveyTitle>
        </SurveyHeader>
        <SurveyParagraph placeholder="Escribe su trasfondo…" showCount maxLength={280} />
      </SurveyQuestion>

      <SurveyQuestion>
        <SurveyHeader>
          <SurveyEyebrow>Pregunta 7</SurveyEyebrow>
          <SurveyTitle>¿Qué facción prefieres?</SurveyTitle>
        </SurveyHeader>
        <SurveyDropdown
          options={[
            { value: "police", label: "Policía" },
            { value: "medic", label: "Servicios médicos" },
            { value: "mechanic", label: "Mecánicos" },
            { value: "civilian", label: "Civil" },
          ]}
          placeholder="Elige una facción…"
        />
      </SurveyQuestion>
    </div>
  )
}

/** Rating question: composes the DS Rating for a star score. */
export function RatingDemo() {
  const [stars, setStars] = React.useState(4)
  return (
    <SurveyQuestion required className="w-full max-w-xl">
      <SurveyHeader>
        <SurveyEyebrow>Pregunta 9</SurveyEyebrow>
        <SurveyTitle>¿Cómo calificarías tu experiencia en el servidor?</SurveyTitle>
      </SurveyHeader>
      <SurveyRating value={stars} onValueChange={setStars} size="lg" />
    </SurveyQuestion>
  )
}

/** Linear-scale question: a 1-to-N rating row with optional end captions. */
export function ScaleDemo() {
  const [rating, setRating] = React.useState("4")
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-4">
      <SurveyQuestion required className="w-full">
        <SurveyHeader>
          <SurveyEyebrow>Pregunta 8</SurveyEyebrow>
          <SurveyTitle>¿Qué tan claras te parecieron las reglas del servidor?</SurveyTitle>
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
      </SurveyQuestion>
      <span className="text-xs text-muted-foreground">
        Rating: <span className="font-medium text-foreground">{rating}</span> / 5
      </span>
    </div>
  )
}

/** Controlled multiple-choice that reports the live selection back to the consumer. */
export function ControlledDemo() {
  const [values, setValues] = React.useState<string[]>(["realism"])
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-4">
      <SurveyQuestion className="w-full">
        <SurveyHeader>
          <SurveyEyebrow>Pregunta 3</SurveyEyebrow>
          <SurveyTitle>¿Qué reglas de rol consideras esenciales?</SurveyTitle>
        </SurveyHeader>
        <SurveyOptions multiple value={values} onValueChange={setValues}>
          <SurveyOption value="realism">Realismo en las acciones</SurveyOption>
          <SurveyOption value="nopowergaming">No hacer powergaming</SurveyOption>
          <SurveyOption value="nometagaming">No hacer metagaming</SurveyOption>
          <SurveyOption value="respect">Respeto fuera de personaje</SurveyOption>
        </SurveyOptions>
      </SurveyQuestion>
      <span className="text-xs text-muted-foreground">
        Selected:{" "}
        <span className="font-medium text-foreground">
          {values.length ? values.join(", ") : "none"}
        </span>
      </span>
    </div>
  )
}
