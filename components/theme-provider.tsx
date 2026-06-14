"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/** The four Koala UI themes. `light`/`dark` are also the system-preference targets. */
export const THEMES = ["light", "dark", "cream", "moonlight"] as const;
export type Theme = (typeof THEMES)[number];

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      themes={[...THEMES]}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
