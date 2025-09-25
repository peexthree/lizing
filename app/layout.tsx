import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { IBM_Plex_Mono, Inter, Manrope } from 'next/font/google'

import Header from '@/components/Header'
import ScrollEffects from '@/components/ScrollEffects'
import SplashScreen from '@/components/SplashScreen'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-mono',
})

const metadataBase = (() => {
  const fallbackUrl = 'http://localhost:3000'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl

  try {
    return new URL(siteUrl)
  } catch {
    return new URL(fallbackUrl)
  }
})()

const metadataDescription =
  'Лизинг для юрлиц, ИП и самозанятых. Быстрое одобрение, гибкие условия, выкуп. Работает по всей РФ. Оставьте заявку — посчитаем платёж и согласуем условия.'

export const metadata: Metadata = {
  metadataBase,
  title: 'Лизинг и точка — лизинг авто и спецтехники: одобрение за 1 день, аванс от 0%',
  description: metadataDescription,
  openGraph: {
    title: 'Лизинг и точка — лизинг авто и спецтехники: одобрение за 1 день, аванс от 0%',
    description: metadataDescription,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Лизинг и точка' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Лизинг и точка — лизинг авто и спецтехники: одобрение за 1 день, аванс от 0%',
    description: metadataDescription,
    images: ['/og.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} ${ibmPlexMono.variable}`}>

      <body className={`${inter.className} relative min-h-screen bg-[#050505] text-slate-100 antialiased`}>
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#0b0b13]/85 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(234,179,8,0.18),transparent_55%),radial-gradient(circle_at_82%_15%,rgba(212,175,55,0.16),transparent_60%),radial-gradient(circle_at_52%_78%,rgba(234,179,8,0.12),transparent_62%)] mix-blend-screen opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.12),transparent_65%)]" />
        </div>
            <SplashScreen />
        <ScrollEffects />
        <Header />
        {children}
      </body>
    </html>
  )
}

export default RootLayout