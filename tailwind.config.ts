import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        accent: '#1E66FF',
        dark: '#1A1F2B',
        bgsoft: '#E6F2FF'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem'
      },
      boxShadow: {
        glow: '0 30px 120px -50px rgba(30, 102, 255, 0.55)',
        hero: '0 45px 140px -70px rgba(15, 23, 42, 0.75)'
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 20% 20%, rgba(30, 102, 255, 0.2), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.15), transparent 55%)',
        'track-lines':
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 12px, transparent 12px, transparent 32px)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '40%': { opacity: '0.6', transform: 'scale(1.05)' },
          '70%': { opacity: '0.45', transform: 'scale(0.98)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out infinite 0.6s',
        'float-late': 'float 12s ease-in-out infinite 1.4s',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config