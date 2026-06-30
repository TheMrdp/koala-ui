"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/** The three Koala UI themes. `light`/`dark` are also the system-preference targets. */
export const THEMES = ["light", "dark", "moonlight"] as const;
export type Theme = (typeof THEMES)[number];

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // The marketing landing ("/") is locked to light: it must never reflect a stored dark
  // theme or expose a theme switch. `forcedTheme` makes next-themes ignore the stored
  // value and pin light there, while the docs ("/docs/...") keep full theme switching.
  // pathname is known at SSR for client components, so light is applied before paint (no
  // flash) even when arriving with a dark preference saved.
  const pathname = usePathname();
  const forcedTheme = pathname === "/" ? "light" : undefined;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      themes={[...THEMES]}
      disableTransitionOnChange
      forcedTheme={forcedTheme}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
