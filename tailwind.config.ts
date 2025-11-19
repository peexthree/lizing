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
        // Новая палитра по Этапу 2
        primary: '#0C1D36', // Базовый тёмно-синий
        background: '#F7FAFF', // Светлая подложка
        accent: '#3B82F6', // Акцент: голубой (для CTA)
        success: '#10B981', // Акцент: зелёный (успех)
        text: '#0F172A', // Основной текст
        muted: '#64748B', // Вторичный текст

        // Старые цвета пока оставим для обратной совместимости, но будем их заменять
        'accent-alt': '#00A3A6',
        dark: '#050505',
        surface: '#111827',
        'surface-muted': '#1A1B25',
        bgsoft: '#0F0F16'
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
        '2xl': '1rem', // 16px
        '3xl': '1.5rem' // 24px
      },
      boxShadow: {
        'soft-sm': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.07)',
        'soft-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
        glow: '0 8px 40px -15px rgba(59, 130, 246, 0.45)' // Новый glow для голубого акцента
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(247, 250, 255, 0.08), transparent 55%)' // Обновленный грид
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
