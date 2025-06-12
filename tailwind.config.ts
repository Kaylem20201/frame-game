import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{html,js,tsx,ts}",
    "./node_modules/@heroui/theme/dist/components/*.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
