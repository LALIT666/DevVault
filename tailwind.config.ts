import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 📌 Gumroad-inspired color palette
      colors: {
        // Primary (Gumroad pink)
        primary: {
          50: "#FFF5FC",
          100: "#FFE5F8",
          200: "#FFD6F3",
          300: "#FFC2ED",
          400: "#FFADE7",
          500: "#FF90E8", // Main Gumroad pink
          600: "#E066CC",
          700: "#C044B0",
          800: "#A02794",
          900: "#801578",
        },
        // Neutral grays
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      // 📌 Typography (like Gumroad)
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      // 📌 Border radius (Gumroad style)
      borderRadius: {
        gumroad: "12px",
      },
      // 📌 Spacing scale
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
    },
  },
  plugins: [],
};

export default config;
