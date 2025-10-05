import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        text: "#1f2937",
        light: "#f3f4f6",
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
      animation: {
        run: "run 1s steps(8) infinite",
      },
      keyframes: {
        run: {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "-256px 0px" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

