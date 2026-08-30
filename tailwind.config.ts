import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#020204",
        panel: "#08080d",
      },
      fontFamily: {
        sans: ["'Geist Pixel'", "monospace", "sans-serif"],
        display: ["'Geist Pixel'", "monospace", "sans-serif"],
        body: ["'Geist Pixel'", "monospace", "sans-serif"],
        mono: ["'Geist Pixel'", "monospace", "sans-serif"],
        pixel: ["'Geist Pixel'", "monospace", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
