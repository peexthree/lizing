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
        accent: '#EAB308',
        'accent-alt': '#D4AF37',
        dark: '#E4E4EC',
        primary: '#0A0A0F',
        surface: '#121218',
        'surface-muted': '#1A1B25',
        bgsoft: '#0F0F16',
        text: '#E4E4EC',
        ink: '#050505',
        muted: '#9CA3AF'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-manrope)', 'Manrope', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: [
          'var(--font-plex-mono)',
          'IBM Plex Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ]
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.75rem',
        '4xl': '2.5rem'
      },
      boxShadow: {
        glow: '0 35px 120px -45px rgba(234, 179, 8, 0.45)',
        hero: '0 55px 160px -70px rgba(10, 10, 15, 0.85)',
        'inner-gold': 'inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(234, 179, 8, 0.2)'
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 20% 20%, rgba(234,179,8,0.22), transparent 45%), radial-gradient(circle at 80% 0%, rgba(250,250,255,0.05), transparent 55%)',
        'track-lines':
          'repeating-linear-gradient(90deg, rgba(148,163,184,0.08) 0, rgba(148,163,184,0.08) 12px, transparent 12px, transparent 32px)',
        'golden-beam':
          'radial-gradient(circle at 15% 20%, rgba(234,179,8,0.18), transparent 55%), radial-gradient(circle at 82% 12%, rgba(136,84,16,0.22), transparent 65%), linear-gradient(135deg, rgba(8,8,12,0.9), rgba(8,8,10,0.75))'
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
