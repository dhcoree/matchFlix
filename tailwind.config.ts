import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080E0A',
        surface: '#0F1810',
        'surface-hover': '#172012',
        border: '#243320',
        foreground: '#F2F5EE',
        muted: '#8FAF8C',
        primary: {
          DEFAULT: '#52B788',
          foreground: '#080E0A',
        },
        secondary: {
          DEFAULT: '#2D6A4F',
          foreground: '#F2F5EE',
        },
        accent: {
          DEFAULT: '#74C69D',
          foreground: '#080E0A',
        },
        success: '#95D5B2',
        warning: '#F4A261',
        danger: '#E76F51',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glass':
          'linear-gradient(135deg, rgba(82,183,136,0.06) 0%, rgba(45,106,79,0.03) 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0,0,0,0.5)',
        glow: '0 0 24px rgba(82,183,136,0.25)',
        'glow-sm': '0 0 12px rgba(82,183,136,0.15)',
        'glow-accent': '0 0 24px rgba(116,198,157,0.2)',
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'card-enter': 'cardEnter 0.3s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        cardEnter: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config
