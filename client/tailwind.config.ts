import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Poppins"', "sans-serif"],
        doto: ['var(--font-doto)', "sans-serif"],
        tagesschrift: ['var(--font-tagesschrift-regular)', "sans-serif"],
      },
      colors: {
        brand: {
          main: "#FF4500",
        },
        border: "hsl(var(--border, 240 5.9% 90%))",
        ring: "hsl(var(--ring, 240 5.9% 90%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 0 0% 0%))",
        
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 98%))",
          foreground: "hsl(var(--card-foreground, 0 0% 10%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 0 0% 10%))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary, 240 100% 50%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 240 4.8% 95.9%))",
          foreground: "hsl(var(--secondary-foreground, 0 0% 10%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 240 4.8% 95%))",
          foreground: "hsl(var(--muted-foreground, 240 3.8% 46.1%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 240 4.8% 95%))",
          foreground: "hsl(var(--accent-foreground, 240 5.9% 10%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 100% 50%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        input: "hsl(var(--input, 240 5.9% 90%))",
        chart: {
          "1": "hsl(var(--chart-1, 220 90% 55%))",
          "2": "hsl(var(--chart-2, 290 70% 50%))",
          "3": "hsl(var(--chart-3, 170 70% 50%))",
          "4": "hsl(var(--chart-4, 40 90% 60%))",
          "5": "hsl(var(--chart-5, 0 90% 60%))",
        },
      },
      keyframes: {
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-in-left": "fadeInLeft 2.5s ease-out forwards",
      },
    },
  },
  plugins: [animate],
};

export default config;
