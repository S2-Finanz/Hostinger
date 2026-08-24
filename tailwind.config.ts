import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: "#0E1211",
        graphit: "#171B1D",
        anthrazit: "#232729",
        nebel: "#AEB6B3",
        gold: "#C6A265",
        creme: "#F4EFE5",
        hellcreme: "#FBF8F1",
        stein: "#D8D1C5",
        steingrau: "#626B68",
        "testimonial-bg": "#EADBC5",
        "testimonial-card": "#F8F0E4",
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
        "scroll-x": "scroll-x 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
