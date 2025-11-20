
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        background: '#050505',      // Абсолютно черный фон
        text: '#F5F5F5',             // Очень светло-серый (почти белый) для основного текста
        muted: '#737373',            // Приглушенный серый для вторичного текста
        surface: '#1B1B1B',          // Темно-серый для поверхностей (карточек, плашек)
        'surface-muted': '#272727',   // Чуть более светлый серый для акцентов на поверхностях
        accent: '#00A651',           // Фирменный зеленый, как на логотипе
        'accent-alt': '#008C43',      // Более темный оттенок зеленого для ховеров
        primary: '#FFFFFF',         // Белый как основной для кнопок и контрастных элементов
        dark: '#FFFFFF'              // Белый, для соответствия темной теме
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
        '3xl': '1.5rem'
      },
      boxShadow: {
        'soft-sm': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.07)',
        'soft-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
        glow: '0 8px 40px -15px rgba(0, 166, 81, 0.45)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 20% 20%, rgba(0, 166, 81, 0.1), transparent 45%), radial-gradient(circle at 80% 90%, rgba(255, 255, 255, 0.03), transparent 55%)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 16px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards'
      }
    }
  },
  plugins: []
} satisfies Config
