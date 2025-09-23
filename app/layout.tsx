import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { IBM_Plex_Mono, Inter, Manrope } from 'next/font/google'

import Header from '@/components/Header'
import ScrollEffects from '@/components/ScrollEffects'

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
  themeColor: '#ffffff',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable} ${ibmPlexMono.variable}`}>

      {/* Carbon fiber-inspired base background applied via Tailwind utilities */}
      <body
        className={`${inter.className} antialiased relative min-h-screen bg-slate-950 text-slate-100 [background-image:linear-gradient(135deg,rgba(9,13,24,0.92)_25%,transparent_25%),linear-gradient(135deg,transparent_75%,rgba(9,13,24,0.92)_75%),linear-gradient(135deg,rgba(11,17,30,0.78)_25%,transparent_25%),linear-gradient(135deg,transparent_75%,rgba(11,17,30,0.78)_75%)] [background-size:28px_28px] [background-position:0px_0px,0px_0px,14px_14px,14px_14px] [background-color:#05070d]`}
      >
        {/* Subtle golden glow overlay sitting behind all content */}
        <div
          className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(212,175,55,0.16),transparent_55%),radial-gradient(circle_at_78%_18%,rgba(255,214,142,0.12),transparent_60%),radial-gradient(circle_at_50%_82%,rgba(212,175,55,0.1),transparent_65%)] mix-blend-soft-light opacity-80" />

        </div>
        <ScrollEffects />
        <Header />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
