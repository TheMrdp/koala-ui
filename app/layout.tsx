import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AccentProvider } from "@/components/accent-provider";
import { Toaster } from "@/components/ui/toast";

// Apply the saved accent to <html> before first paint so there's no flash of the default
// accent. Mirrors next-themes' own anti-FOUC script; key matches ACCENT_STORAGE_KEY.
const accentScript = `(function(){try{var a=localStorage.getItem("koala-accent");if(a)document.documentElement.setAttribute("data-accent",a)}catch(e){}})()`;

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Koala UI - React",
    template: "%s - Koala UI",
  },
  description:
    "A custom React component library and design system, built with Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <AccentProvider>{children}</AccentProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
