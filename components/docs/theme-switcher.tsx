"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Coffee, Moon, MoonStars, Sun } from "@phosphor-icons/react/ssr"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import { THEMES, type Theme } from "@/components/theme-provider"

const THEME_ICONS: Record<Theme, React.ElementType> = {
  light: Sun,
  dark: Moon,
  cream: Coffee,
  moonlight: MoonStars,
}

/** Compact theme switcher for the docs header. Dogfoods ButtonGroup. */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  // The active theme is unknown during SSR; only reflect it after hydration.
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  return (
    <ButtonGroup size="sm" variant="ghost" attached>
      {THEMES.map((t) => {
        const Icon = THEME_ICONS[t]
        const isActive = mounted && theme === t
        return (
          <ButtonGroupItem
            key={t}
            iconOnly
            aria-label={t}
            aria-pressed={isActive}
            variant={isActive ? "secondary" : "ghost"}
            onClick={() => setTheme(t)}
          >
            <Icon />
          </ButtonGroupItem>
        )
      })}
    </ButtonGroup>
  )
}
