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
    },
  },
  plugins: [],
};

export default config;
