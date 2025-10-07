import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Inter, Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import GlobalBackground from '@/components/GlobalBackground'
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

const metadataTitle =
  'Лизинг и точка — лизинг авто и спецтехники: одобрение за 1 день, аванс от 0%'
const metadataDescription =
  'Лизинг авто и спецтехники по всей России. Быстрое одобрение, индивидуальные условия и сопровождение на каждом этапе сделки.'

const metadataBase = (() => {
  const fallbackUrl = 'http://localhost:3000'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!baseUrl) {
    return new URL(fallbackUrl)
  }

  try {
    return new URL(baseUrl)
  } catch (initialError) {
    try {
      return new URL(`https://${baseUrl}`)
    } catch (normalizedError) {
      console.warn(
        '[metadata] Failed to parse NEXT_PUBLIC_SITE_URL, falling back to localhost:',
        { initialError, normalizedError },
      )
      return new URL(fallbackUrl)
    }
  }
})()

export const metadata: Metadata = {
  metadataBase,
  title: metadataTitle,
  description: metadataDescription,
  keywords: [
    'лизинг',
    'лизинг авто',
    'лизинг грузовиков',
    'лизинг спецтехники',
    'лизинг для бизнеса',
    'лизинговая компания',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    title: metadataTitle,
    description: metadataDescription,
    siteName: 'Лизинг и точка',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: metadataTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: metadataTitle,
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
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} ${ibmPlexMono.variable}`}>
      <body className={`${inter.className} relative min-h-screen bg-[#050506] text-slate-100 antialiased`}>
        <GlobalBackground />
        <SplashScreen />
        <ScrollEffects />
        <Header />
        {children}
      </body>
    </html>
  )
}

export default RootLayout