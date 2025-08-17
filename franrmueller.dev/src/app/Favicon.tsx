"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

function addLink(rel: string, attrs: Record<string, string>) {
  const link = document.createElement("link");
  link.rel = rel;
  Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
  document.head.appendChild(link);
}

export default function Favicon() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const isDark = resolvedTheme === "dark";
    const ts = Date.now(); // cache-buster

    // 1) Remove ALL existing icon links so the browser can't reuse old nodes
    document
      .querySelectorAll<HTMLLinkElement>("link[rel*='icon'], link[rel='apple-touch-icon']")
      .forEach((el) => el.parentNode?.removeChild(el));

    // 2) Re-add fresh links with a changing query string
    const faviconHref = (isDark ? "/sherlock-white.png" : "/sherlock-black.png") + `?v=${ts}`;
    const appleHref = (isDark ? "/apple-touch-icon-white.png" : "/apple-touch-icon-black.png") + `?v=${ts}`;

    // Standard favicon
    addLink("icon", { href: faviconHref, type: "image/png", sizes: "32x32" });
    // Legacy shortcut icon (helps some browsers)
    addLink("shortcut icon", { href: faviconHref, type: "image/png" });
    // Apple touch icon
    addLink("apple-touch-icon", { href: appleHref, sizes: "180x180" });

    // 3) Title tickle: toggling the title prompts some browsers to refresh the tab UI
    const original = document.title;
    document.title = original + "\u2009"; // narrow no-break space
    // restore on next frame
    requestAnimationFrame(() => {
      document.title = original;
    });
  }, [resolvedTheme, mounted]);

  return null;
}