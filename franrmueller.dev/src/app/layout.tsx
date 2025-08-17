import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Favicon from "./Favicon";

export const metadata: Metadata = {
  title: "Your Site",
  description: "Description",
  // removed static icons so the dynamic one takes over
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
      </head>
      <body className="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
          {/* This updates favicon immediately when theme changes */}
          <Favicon />
          <Header />
          <main className="mx-auto max-w-5xl px-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}