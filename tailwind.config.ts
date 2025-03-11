import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

function createOpacityValue(variable: string) {
  return ({ opacityValue }: { opacityValue?: number }) =>
    opacityValue !== undefined
      ? `rgb(var(${variable}) / ${opacityValue})`
      : `rgb(var(${variable}))`;
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        foreground: {
          DEFAULT: 'rgb(15, 23, 42)',
          '90': 'rgb(15, 23, 42, 0.9)',
          '80': 'rgb(15, 23, 42, 0.8)',
          '70': 'rgb(15, 23, 42, 0.7)',
          '60': 'rgb(15, 23, 42, 0.6)',
          '50': 'rgb(15, 23, 42, 0.5)',
          '40': 'rgb(15, 23, 42, 0.4)',
          '30': 'rgb(15, 23, 42, 0.3)',
          '20': 'rgb(15, 23, 42, 0.2)',
          '10': 'rgb(15, 23, 42, 0.1)',
        },
        background: 'rgb(255, 255, 255)',
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '5.625rem', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-xl': ['3.75rem', { lineHeight: '4.5rem', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-lg': ['3rem', { lineHeight: '3.75rem', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-md': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em', fontWeight: '300' }],
        'display-sm': ['1.875rem', { lineHeight: '2.375rem', fontWeight: '300' }],
        'display-xs': ['1.5rem', { lineHeight: '2rem', fontWeight: '300' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'body-md': ['1rem', { lineHeight: '1.5rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'body-xs': ['0.75rem', { lineHeight: '1.125rem' }],
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        serif: ['EB Garamond', 'Noto Serif SC', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'fade-in-right': 'fadeInRight 0.5s ease-out',
        'fade-in-left': 'fadeInLeft 0.5s ease-out',
        'bounce-slow': 'bounceSlow 5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'soft-sm': '0 2px 10px -3px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 4px 20px -5px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 30px -6px rgba(0, 0, 0, 0.1)',
        'soft-xl': '0 12px 40px -8px rgba(0, 0, 0, 0.12)',
        'inner-soft': 'inset 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
