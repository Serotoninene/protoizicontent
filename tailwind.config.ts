import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          "950": "#131313",
        },
        secondary: {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a5b4fc",
          "400": "#818cf8",
          "500": "#6366f1",
          "600": "#4f46e5",
          "700": "#4338ca",
          "800": "#3730a3",
          "900": "#312e81",
          "950": "#1e1b4b",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
