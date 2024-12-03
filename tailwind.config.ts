import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.25s ease-in-out',
        pulseBorderShadow: 'pulseBorderShadow 2s linear infinite'
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(7.5deg)' },
          '50%': { transform: 'rotate(-7.5deg)' },
          '75%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseBorderShadow: {
          '0%': {
            borderWidth: '8px',
            borderColor: 'orange',
            scale: "0.75"
          },
          '100%': {
            borderWidth: '8px',
            scale: "0.75",
            borderColor: 'yellow'
          },
        }
    },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          fire: 'hsl(var(--accent-fire))',
          cold: 'hsl(var(--accent-cold))',
          lightning: 'hsl(var(--accent-lightning))',
          physical: 'hsl(var(--accent-physical))',
          chaos: 'hsl(var(--accent-chaos))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;