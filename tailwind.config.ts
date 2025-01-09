import type { Config } from "tailwindcss";
import { colors } from "./src/config/tailwind/colors";
import { spacing } from "./src/config/tailwind/spacing";
import { typography } from "./src/config/tailwind/typography";
import { keyframes, animations } from "./src/config/tailwind/animations";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "100%",
      },
    },
    extend: {
      maxWidth: {
        'lg': '25rem',
      },
      ...typography,
      spacing,
      keyframes,
      animation: animations,
      colors,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;