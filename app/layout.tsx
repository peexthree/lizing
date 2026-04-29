
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../components/Hyperspeed.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hyperspeed from '@/components/Hyperspeed'
import { Metrika } from '@/components/Metrika'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Лизинг и точка — выгодный лизинг для вашего бизнеса',
  description: 'Подбор лучших лизинговых программ в Краснодаре и по всей России. Автолизинг, лизинг спецтехники, оборудования и недвижимости. Рассчитайте ваш ежемесячный платеж онлайн.',
  metadataBase: new URL('https://lizing-i-tochka.ru'),
  openGraph: {
    title: 'Лизинг и точка — выгодный лизинг для вашего бизнеса',
    description: 'Подбор лучших лизинговых программ в Краснодаре и по всей России. Автолизинг, лизинг спецтехники, оборудования и недвижимости.',
    url: 'https://lizing-i-tochka.ru',
    siteName: 'Лизинг и точка',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Лизинг и точка',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Лизинг и точка — выгодный лизинг для вашего бизнеса',
    description: 'Подбор лучших лизинговых программ в Краснодаре и по всей России.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-48x48.png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head />
       <body className={`${inter.className} bg-black text-gray-300`}>
        <Metrika />

        <Hyperspeed />
        <Header />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
