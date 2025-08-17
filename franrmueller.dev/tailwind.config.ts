// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // safe include if you ever move things under src/
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#CC785C",
          hover: "#B8644B",
          alt: "#DA7756",
          ring: "#CC785C66",
        },
        neutral: {
          light: "#F8F7FF",
          gray: "#828179",
          dark: "#111111",
        },
      },
    },
  },
  plugins: [],
};

export default config;