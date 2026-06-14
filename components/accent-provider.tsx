"use client"

import * as React from "react"

/**
 * Accent ("color mode") — Koala's second theming axis, orthogonal to light/dark.
 * Each name maps to a `[data-accent="…"]` preset in globals.css that sets a single
 * `--brand` token; every component reads the accent through that token, so switching
 * here recolors the entire system. Keep this list in sync with the presets in
 * app/globals.css (add an entry in both places to introduce a new accent).
 */
export const ACCENTS = [
  "orange",
  "red",
  "amber",
  "green",
  "teal",
  "blue",
  "violet",
  "pink",
] as const
export type Accent = (typeof ACCENTS)[number]

/** Matches the `:root` default and `[data-accent="orange"]` preset (#F84416). */
export const DEFAULT_ACCENT: Accent = "orange"

/** Shared with the no-FOUC inline script in app/layout.tsx — keep both in sync. */
export const ACCENT_STORAGE_KEY = "koala-accent"

interface AccentContextValue {
  accent: Accent
  setAccent: (accent: Accent) => void
}

const AccentContext = React.createContext<AccentContextValue | null>(null)

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = React.useState<Accent>(DEFAULT_ACCENT)

  // The inline script already applied the saved accent to <html> before paint; reflect it
  // into React state after hydration so the active swatch renders correctly.
  React.useEffect(() => {
    const current = document.documentElement.dataset.accent
    if (current && (ACCENTS as readonly string[]).includes(current)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccentState(current as Accent)
    }
  }, [])

  const setAccent = React.useCallback((next: Accent) => {
    setAccentState(next)
    document.documentElement.dataset.accent = next
    try {
      localStorage.setItem(ACCENT_STORAGE_KEY, next)
    } catch {
      // Private mode / disabled storage — the choice just won't persist across reloads.
    }
  }, [])

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  )
}

export function useAccent() {
  const ctx = React.useContext(AccentContext)
  if (!ctx) {
    throw new Error("useAccent must be used within an AccentProvider")
  }
  return ctx
}
