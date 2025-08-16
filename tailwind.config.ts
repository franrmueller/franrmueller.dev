import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}", // your articles/reading content
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#CC785C", // terra cotta
          hover: "#B8644B",
          alt: "#DA7756",
          ring: "#CC785C66",
        },
        neutral: {
          light: "#F8F7FF",  // off-white background
          gray: "#828179",   // warm gray (muted text)
          dark: "#111111",   // near-black text
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
