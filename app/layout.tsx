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

      <body className={`${inter.className} relative min-h-screen bg-[#040405] text-slate-100 antialiased`}>
        <div
          className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden transition-opacity duration-1000"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[url('/backgrounds/serpentine-gold.svg')] bg-cover bg-center opacity-70 mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/backgrounds/hex-marble.svg')] bg-cover bg-center opacity-55 mix-blend-lighten" />
        </div>
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#090912]/80 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(234,179,8,0.2),transparent_55%),radial-gradient(circle_at_82%_18%,rgba(255,220,160,0.16),transparent_58%),radial-gradient(circle_at_52%_78%,rgba(212,175,55,0.12),transparent_64%)] mix-blend-screen opacity-85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.14),transparent_68%),radial-gradient(circle_at_10%_110%,rgba(212,175,55,0.12),transparent_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(253,230,167,0.16),transparent_58%)] mix-blend-lighten opacity-60" />
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