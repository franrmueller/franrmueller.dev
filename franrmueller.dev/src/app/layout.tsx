import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Favicon from "./Favicon";

export const metadata: Metadata = {
  title: "Your Site",
  description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var m = localStorage.getItem('theme') || 'system';
                var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var dark = (m === 'dark') || (m === 'system' && sysDark);
                var root = document.documentElement;
                root.classList.toggle('dark', dark);
                root.style.colorScheme = dark ? 'dark' : 'light';
              } catch (_) {}
            })();
          `}
        </Script>

        {/* Make browser UI match page bg */}
        <meta name="theme-color" content="#FCFCFC" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0E1117" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
          <Favicon />
          <Header />
          <main className="mx-auto max-w-5xl px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}