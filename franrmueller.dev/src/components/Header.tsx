"use client";

import NextLink from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const BRAND = "franrmueller";
const NAV = [
  { href: "/writing", label: "Writing" },
  { href: "/reading", label: "Reading" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Background blur layer (behind content) */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-background/60
          backdrop-blur
          supports-[backdrop-filter]:bg-background/60
        "
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Home / logo */}
          <NextLink href="/" className="flex items-center hover:opacity-90" aria-label={BRAND}>
            <span className="sr-only">{BRAND}</span>

            {/* Light UI → black logo */}
            <Image
              src="/sherlock-black.png"
              alt={`${BRAND} logo`}
              className="h-8 w-8 dark:hidden"
              width={32}
              height={32}
              priority
            />
            {/* Dark UI → white logo */}
            <Image
              src="/sherlock-white.png"
              alt={`${BRAND} logo`}
              className="h-8 w-8 hidden dark:block"
              width={32}
              height={32}
              priority
            />
          </NextLink>

          {/* Primary nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                className="uppercase text-[12px] tracking-wider text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </NextLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle size="sm" />
            <button
              aria-label="Open menu"
              className="md:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
            >
              <ChevronDown className="h-5 w-5 text-foreground/90" />
            </button>
          </div>
        </div>
      </div>

      {/* optional separator */}
      {/* <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" /> */}
    </header>
  );
}