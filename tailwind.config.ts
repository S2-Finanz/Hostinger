import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#0E1211",
        graphit: "#232A29",
        nebel: "#8E9997",
        gold: "#C8A265",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: [
          "Helvetica Neue",
          "Arial",
          "var(--font-inter)",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.3333%)" },
        },
      },
      animation: {
        "scroll-x": "scroll-x 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
