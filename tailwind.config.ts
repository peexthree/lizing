import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        indigoBrand: '#0B3D91',
        accent: '#0EA5E9',
        dark: '#111827',
        bgsoft: '#F5F7FB'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
} satisfies Config