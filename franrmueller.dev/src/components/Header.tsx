"use client";

import { ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const BRAND = "franrmueller";
const NAV = [
  { href: "/writing", label: "Writing" },
  { href: "/reading", label: "Reading" },
];

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 text-sm
      bg-white/90 dark:bg-gradient-to-b dark:from-[#141521] dark:to-[#171827]
      backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Home/logo */}
          <a href="/" className="flex items-center hover:opacity-90" aria-label={BRAND}>
            <span className="sr-only">{BRAND}</span>

            {/* Light UI → black logo */}
            <img
              src="/sherlock-black.png"
              alt=""
              className="h-8 w-8 dark:hidden"
              width={32}
              height={32}
            />
            {/* Dark UI → white logo */}
            <img
              src="/sherlock-white.png"
              alt=""
              className="h-8 w-8 hidden dark:block"
              width={32}
              height={32}
            />
          </a>

          {/* Primary nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="uppercase text-[12px] tracking-wider
                  text-zinc-700 hover:text-zinc-900
                  dark:text-slate-200/90 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle size="sm" />
            <button aria-label="Open menu" className="md:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5">
              <ChevronDown className="h-5 w-5 text-zinc-800 dark:text-slate-200" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
    </header>
  );
}