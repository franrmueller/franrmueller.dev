import React, { useEffect, useMemo, useState } from "react";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";

/**
 * Production‑ready header with brand, nav and a 3‑way theme toggle (light/dark/system).
 * - Persists user choice to localStorage
 * - Responds to OS changes while in System mode
 * - Applies `dark` class to <html> for Tailwind's class strategy
 * - Accessible: uses <button>s with aria-pressed and labels
 */

const BRAND = "ordep.dev"; // change to your brand
const NAV = [
  { href: "/writing", label: "Writing" },
  { href: "/reading", label: "Reading" },
  { href: "/talks", label: "Talks" },
  { href: "/about", label: "About" },
];

type ThemeMode = "light" | "dark" | "system";

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement; // <html>
  if (mode === "system") {
    const dark = getSystemPrefersDark();
    root.classList.toggle("dark", dark);
  } else {
    root.classList.toggle("dark", mode === "dark");
  }
}

function loadTheme(): ThemeMode {
  const saved = (localStorage.getItem("theme-mode") as ThemeMode | null) || "system";
  return saved;
}

function saveTheme(mode: ThemeMode) {
  localStorage.setItem("theme-mode", mode);
}

export default function Header() {
  const [mode, setMode] = useState<ThemeMode>(() => (typeof window === "undefined" ? "system" : loadTheme()));

  // Apply theme on first mount and whenever mode changes
  useEffect(() => {
    applyTheme(mode);
    saveTheme(mode);
  }, [mode]);

  // React to system changes while in System mode
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (mode === "system") applyTheme("system");
    };
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [mode]);

  const buttons = useMemo(
    () => [
      { key: "light", icon: Sun, label: "Light" },
      { key: "system", icon: Monitor, label: "Auto" },
      { key: "dark", icon: Moon, label: "Dark" },
    ] as const,
    []
  );

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-b from-[#141521] to-[#171827] text-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <a href="/" className="font-semibold tracking-tight text-slate-100 hover:opacity-90">{BRAND}</a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="uppercase text-[12px] tracking-wider text-slate-200/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Theme toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle mode={mode} onChange={setMode} />

            {/* optional mobile menu placeholder */}
            <button aria-label="Open menu" className="md:hidden p-2 rounded-xl hover:bg-white/5">
              <ChevronDown className="h-5 w-5 text-slate-200" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}

function ThemeToggle({ mode, onChange }: { mode: ThemeMode; onChange: (m: ThemeMode) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">Theme</span>
      <div
        role="group"
        aria-label="Theme toggle"
        className="relative flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur supports-[backdrop-filter]:bg-white/5"
      >
        {(["light", "system", "dark"] as ThemeMode[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            onClick={() => onChange(key)}
            className={`group relative inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-wider text-slate-200 transition ${
              mode === key ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            {key === "light" && <Sun className="h-4 w-4" />}
            {key === "system" && <Monitor className="h-4 w-4" />}
            {key === "dark" && <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{key === "system" ? "Auto" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Example page wrapper to preview the header and demonstrate dark mode styles
export function PageDemo() {
  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-[#0b0c14] dark:text-slate-100">
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold">Hello!</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Toggle the theme on the right. In System mode, the header follows your OS setting automatically.
        </p>
      </main>
    </div>
  );
}
