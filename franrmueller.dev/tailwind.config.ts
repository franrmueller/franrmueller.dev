// // tailwind.config.ts
// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: "class",
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./content/**/*.{md,mdx}",
//     "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // semantic tokens (read from CSS variables at runtime)
//         background: "var(--color-background)",
//         foreground: "var(--color-foreground)",
//         border: "var(--color-border)",
//         muted: "var(--color-muted)",
//         // your existing palette
//         accent: {
//           DEFAULT: "#CC785C",
//           hover: "#B8644B",
//           alt: "#DA7756",
//           ring: "#CC785C66",
//         },
//         neutral: {
//           light: "#F8F7FF",
//           gray: "#828179",
//           dark: "#111111",
//         },
//       },
//     },
//   },
//   plugins: [],
//   // tailwind.config.ts (add inside theme.extend)
//   typography: {
//     DEFAULT: {
//       css: {
//         /* Base text colors */
//         "--tw-prose-body": "var(--color-foreground)",
//         "--tw-prose-headings": "var(--color-foreground)",
//         "--tw-prose-links": "var(--color-foreground)",
//         "--tw-prose-bold": "var(--color-foreground)",
//         "--tw-prose-counters": "var(--color-muted)",
//         "--tw-prose-bullets": "var(--color-muted)",
//         "--tw-prose-hr": "var(--color-border)",
//         "--tw-prose-quotes": "var(--color-foreground)",
//         "--tw-prose-quote-borders": "var(--color-border)",
//         "--tw-prose-captions": "var(--color-muted)",
//         "--tw-prose-code": "var(--color-foreground)",
//         "--tw-prose-pre-code": "var(--color-foreground)",
//         "--tw-prose-th-borders": "var(--color-border)",
//         "--tw-prose-td-borders": "var(--color-border)",

//         /* Link / code tweaks */
//         "a": {
//           "textDecoration": "underline",
//           "textUnderlineOffset": "4px",
//           "textDecorationThickness": "1px",
//         },
//         "code": {
//           "fontWeight": "600",
//         },
//         "pre": {
//           "backgroundColor": "transparent",
//           "border": "1px solid var(--color-border)",
//           "borderRadius": "0.75rem",
//         },
//         "hr": {
//           "borderColor": "var(--color-border)",
//         },
//       },
//     },
//   },
//   invert: {
//     css: {
//       "--tw-prose-body": "var(--color-foreground)",
//       "--tw-prose-headings": "var(--color-foreground)",
//       "--tw-prose-links": "var(--color-foreground)",
//       "--tw-prose-bold": "var(--color-foreground)",
//       "--tw-prose-counters": "var(--color-muted)",
//       "--tw-prose-bullets": "var(--color-muted)",
//       "--tw-prose-hr": "var(--color-border)",
//       "--tw-prose-quotes": "var(--color-foreground)",
//       "--tw-prose-quote-borders": "var(--color-border)",
//       "--tw-prose-captions": "var(--color-muted)",
//       "--tw-prose-code": "var(--color-foreground)",
//       "--tw-prose-pre-code": "var(--color-foreground)",
//       "--tw-prose-th-borders": "var(--color-border)",
//       "--tw-prose-td-borders": "var(--color-border)",
//     },
//   },
//   module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         "beige-light": "#FAF7F0",        // Anthropics-light warm background
//         "purple-600": "#7E5AFF",         // Accent link
//         "purple-400": "#A590FF",         // Underline decoration accent
//         "slate-800": "#262626",          // Header text
//         "slate-700": "#444444",          // Body paragraph text
//         "slate-900": "#1A1A1A",          // Headlines
//       },
//     },
//   },
// },
// };

// export default config;

export default {};