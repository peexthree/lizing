import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from '@/components/Header'
import ScrollEffects from '@/components/ScrollEffects'

const inter = localFont({
  src: [
    { path: '../public/fonts/inter-cyrillic-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter-cyrillic-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/inter-cyrillic-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/inter-cyrillic-700-normal.woff2', weight: '700', style: 'normal' }
  ],
  display: 'swap'
})
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Лизинг и точка — лизинг авто и спецтехники: одобрение за 1 день, аванс от 0%',
  description:
    'Лизинг для юрлиц, ИП и самозанятых. Быстрое одобрение, гибкие условия, выкуп. Работает по всей РФ. Оставьте заявку — посчитаем платёж и согласуем условия.',
  openGraph: {
    title: 'Лизинг и точка — лизинг авто и спецтехники: одобрение за 1 день, аванс от 0%',
    description:
      'Лизинг для юрлиц, ИП и самозанятых. Быстрое одобрение, гибкие условия, выкуп. Работает по всей РФ. Оставьте заявку — посчитаем платёж и согласуем условия.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Лизинг и точка' }]
  },
  twitter: {
    card: 'summary_large_image',

    description:
      'Лизинг для юрлиц, ИП и самозанятых. Быстрое одобрение, гибкие условия, выкуп. Работает по всей РФ. Оставьте заявку — посчитаем платёж и согласуем условия.',
    images: ['/og.jpg']
  },
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ]
  },
  manifest: '/site.webmanifest',
}

export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
       <div className="global-background" aria-hidden="true">
          <div className="global-background__overlay" />
        </div>
 <ScrollEffects />
        <Header />
        {children}
      </body>
    </html>
  )
}