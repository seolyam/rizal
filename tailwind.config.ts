import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./data/**/*.{ts,tsx,json}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "#3b8070",
          foreground: "#f6f0e8",
        },
        highlight: "#7a2e3b",
        sand: "#f2e5c6",
        sepia: "#f9f2e7",
        charcoal: "#231f20",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-fraunces)", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-cousin)", ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        "grain-light": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.07'/%3E%3C/svg%3E\")",
        parchment: "radial-gradient(circle at 15% 20%, rgba(122, 46, 59, 0.14), transparent 55%), radial-gradient(circle at 80% 15%, rgba(59, 128, 112, 0.12), transparent 60%), linear-gradient(120deg, rgba(248, 236, 209, 0.9), rgba(239, 211, 162, 0.75))",
        vignette: "radial-gradient(circle at center, rgba(35, 31, 32, 0.02) 0%, rgba(35, 31, 32, 0.55) 100%)",
      },
      boxShadow: {
        soft: "0 10px 40px rgba(35, 31, 32, 0.12)",
      },
      borderRadius: {
        lg: "24px",
        md: "16px",
        sm: "12px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ink-reveal": {
          "0%": { clipPath: "inset(100% 0 0 0)", opacity: "0" },
          "60%": { clipPath: "inset(0 0 0 0)", opacity: "1" },
          "100%": { clipPath: "inset(0 0 0 0)", opacity: "1" },
        },
        "page-turn": {
          "0%": { transform: "rotateX(12deg) translateY(8px)", opacity: "0" },
          "50%": { transform: "rotateX(-3deg) translateY(-2px)", opacity: "0.95" },
          "100%": { transform: "rotateX(0) translateY(0)", opacity: "1" },
        },
        "dust-float": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0.45" },
          "50%": { transform: "translateY(-6px) translateX(3px)", opacity: "0.65" },
          "100%": { transform: "translateY(0) translateX(0)", opacity: "0.45" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        shimmer: "shimmer 2.4s linear infinite",
        "ink-reveal": "ink-reveal 0.9s ease-out forwards",
        "page-turn": "page-turn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "dust-float": "dust-float 10s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("supports-hover", "@media (hover: hover)");
      addVariant("supports-no-hover", "@media (hover: none)");
    }),
  ],
};

export default config;
