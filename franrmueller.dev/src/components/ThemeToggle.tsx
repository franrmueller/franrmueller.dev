"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";
type Size = "sm" | "md" | "lg";

export default function ThemeToggle({
  size = "sm",
  className = "",
}: {
  size?: Size;
  className?: string;
}) {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem("theme") as ThemeMode) || "system"; // ← same key as in layout
    setMode(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(next: ThemeMode) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = next === "dark" || (next === "system" && prefersDark);

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light"; // ← keep native UI in sync
    localStorage.setItem("theme", next);                // ← persist using the SAME key
  }

  const preset =
    {
      sm: { container: "h-8 p-1 gap-1 rounded-xl", btn: "h-6 w-6", icon: "h-3.5 w-3.5" },
      md: { container: "h-10 p-1.5 gap-1.5 rounded-2xl", btn: "h-8 px-2", icon: "h-4 w-4" },
      lg: { container: "h-12 p-2 gap-2 rounded-3xl", btn: "h-10 px-3", icon: "h-5 w-5" },
    }[size];

  const options: ThemeMode[] = ["light", "system", "dark"];

  return (
    <div
      className={`inline-flex items-center border border-white/15 bg-black/20 backdrop-blur ${preset.container} ${className}`}
      role="group"
      aria-label="Theme"
    >
      {options.map((opt) => (
        <button
          key={opt}
          aria-label={opt}
          onClick={() => {
            setMode(opt);
            applyTheme(opt);
          }}
          className={`grid place-items-center rounded-full transition
            ${preset.btn}
            ${mode === opt ? "bg-white/10 ring-1 ring-white/20" : "opacity-70 hover:opacity-100"}`}
        >
          {opt === "light" && <Sun className={preset.icon} />}
          {/* {opt === "system" && <Monitor className={preset.icon} />} */}
          {opt === "dark" && <Moon className={preset.icon} />}
        </button>
      ))}
    </div>
  );
}