"use client"

import * as React from "react"
import { Check, Copy } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * CodeSnippet — a Supabase-style code block: rounded surface, optional window chrome,
 * copy-on-hover, and lightweight syntax highlighting driven by the `--syntax-*` theme
 * tokens (so it re-themes across all four themes). The highlighter is a small, self-
 * contained tokenizer scoped to TS/TSX and shell — no external dependency.
 */
type TokenType =
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "function"
  | "tag"
  | "flag"

// Complete class strings (Tailwind can't see concatenated names) selected by a map.
const TOKEN_CLASS: Record<TokenType, string> = {
  comment: "text-syntax-comment italic",
  string: "text-syntax-string",
  keyword: "text-syntax-keyword",
  number: "text-syntax-number",
  function: "text-syntax-function",
  tag: "text-syntax-tag",
  flag: "text-syntax-keyword",
}

// Ordered grammars — earlier patterns win at a given position (e.g. keyword before
// function, so `return(` highlights as a keyword, not a call). No capturing groups
// inside the patterns: each is wrapped in one group so its index maps to its type.
const GRAMMARS: Record<"tsx" | "bash" | "css", [TokenType, RegExp][]> = {
  tsx: [
    ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
    ["string", /`(?:\\[\s\S]|[^\\`])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/],
    [
      "keyword",
      /\b(?:import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|implements|interface|type|enum|namespace|async|await|yield|of|in|instanceof|typeof|keyof|as|satisfies|public|private|protected|readonly|static|get|set|true|false|null|undefined|void|never|this|super)\b/,
    ],
    ["number", /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/],
    ["function", /\b[A-Za-z_$][\w$]*(?=\s*\()/],
    ["tag", /\b[A-Z][\w$]*\b/],
  ],
  bash: [
    ["comment", /#[^\n]*/],
    ["string", /"(?:\\.|[^"\\])*"|'[^']*'/],
    ["flag", /(?<=\s)--?[A-Za-z][\w-]*/],
  ],
  // Scoped to the kind of CSS the docs actually show — token blocks and at-rules. Functions
  // (oklch(), var(), color-mix()) read as calls; lengths, percentages and hex read as numbers.
  css: [
    ["comment", /\/\*[\s\S]*?\*\//],
    ["string", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/],
    ["keyword", /@[\w-]+|:root\b|::?[\w-]+/],
    ["function", /[A-Za-z][\w-]*(?=\()/],
    ["number", /#[0-9a-fA-F]{3,8}\b|-?\b\d+(?:\.\d+)?(?:rem|px|em|%|deg|m?s|fr|vh|vw)?\b/],
  ],
}

type Token = { type?: TokenType; value: string }

function tokenize(code: string, lang: "tsx" | "bash"): Token[] {
  const grammar = GRAMMARS[lang]
  const master = new RegExp(
    grammar.map(([, re]) => `(${re.source})`).join("|"),
    "g",
  )
  const tokens: Token[] = []
  let last = 0
  let match: RegExpExecArray | null

  while ((match = master.exec(code))) {
    if (match.index > last) {
      tokens.push({ value: code.slice(last, match.index) })
    }
    const groupIndex = grammar.findIndex((_, i) => match![i + 1] !== undefined)
    tokens.push({ type: grammar[groupIndex][0], value: match[0] })
    last = match.index + match[0].length
    if (match[0].length === 0) master.lastIndex++ // guard against zero-width loops
  }
  if (last < code.length) tokens.push({ value: code.slice(last) })
  return tokens
}

const LANG_LABEL: Record<string, string> = {
  tsx: "TSX",
  ts: "TS",
  js: "JS",
  bash: "Bash",
  sh: "Shell",
}

export interface CodeSnippetProps {
  code: string
  /** Source language for highlighting. Defaults to `tsx`. */
  lang?: "tsx" | "ts" | "js" | "bash" | "sh"
  /** Filename chip shown in the header (also enables the header bar). */
  filename?: string
  /** Show macOS-style window dots in the header. */
  dots?: boolean
  /** Render a line-number gutter. */
  showLineNumbers?: boolean
  className?: string
}

export function CodeSnippet({
  code,
  lang = "tsx",
  filename,
  dots = false,
  showLineNumbers = false,
  className,
}: CodeSnippetProps) {
  const [copied, setCopied] = React.useState(false)
  const grammar = lang === "bash" || lang === "sh" ? "bash" : "tsx"
  const tokens = React.useMemo(() => tokenize(code, grammar), [code, grammar])
  const lineCount = code.replace(/\n+$/, "").split("\n").length

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  const showHeader = Boolean(filename) || dots

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card shadow-xs",
        className,
      )}
    >
      {showHeader && (
        <div className="flex items-center gap-3 border-b border-border/70 px-4 py-2.5">
          {dots && (
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-muted-foreground/25" />
              <span className="size-2.5 rounded-full bg-muted-foreground/25" />
              <span className="size-2.5 rounded-full bg-muted-foreground/25" />
            </span>
          )}
          {filename && (
            <span className="font-mono text-xs text-muted-foreground">
              {filename}
            </span>
          )}
          <span className="ml-auto font-mono text-[10px] font-medium tracking-wide text-muted-foreground/60 uppercase">
            {LANG_LABEL[lang] ?? lang}
          </span>
        </div>
      )}

      <div className="relative">
        <Button
          iconOnly
          variant="outline"
          size="sm"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          tooltipPlacement="left"
          className={cn(
            "absolute top-3 right-3 z-10 size-7 bg-background/80 backdrop-blur",
            "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
          )}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>

        <div className="flex text-sm leading-relaxed">
          {showLineNumbers && (
            <div
              aria-hidden
              className="shrink-0 border-r border-border/60 py-4 pr-4 pl-4 text-right font-mono text-muted-foreground/40 tabular-nums select-none"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <pre className="min-w-0 flex-1 overflow-x-auto py-4 pr-12 pl-4">
            <code className="font-mono text-card-foreground">
              {tokens.map((tok, i) =>
                tok.type ? (
                  <span key={i} className={TOKEN_CLASS[tok.type]}>
                    {tok.value}
                  </span>
                ) : (
                  <span key={i}>{tok.value}</span>
                ),
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
