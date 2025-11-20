
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Лизинг и точка — выгодный лизинг для вашего бизнеса',
  description: 'Подбор лучших лизинговых программ в Краснодаре и по всей России. Автолизинг, лизинг спецтехники, оборудования и недвижимости. Рассчитайте ваш ежемесячный платеж онлайн.',
  metadataBase: new URL('https://lizing.peex.threee')
}

export const viewport: Viewport = {
  themeColor: '#0D1117',
}

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
       <body className={`${inter.className} bg-[#022c22] bg-gradient-to-b from-[#011a15] via-[#047857] to-[#022c22] text-gray-300`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
