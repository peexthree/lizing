import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Лизинг и точка — лизинг без лишних слов',
  description: 'Низкий аванс, быстрое одобрение, работаем с юр. и физ. лицами.',
  openGraph: {
    title: 'Лизинг и точка — лизинг без лишних слов',
    description: 'Низкий аванс, быстрое одобрение, работаем с юр. и физ. лицами.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Лизинг и точка' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Лизинг и точка — лизинг без лишних слов',
    description: 'Низкий аванс, быстрое одобрение, работаем с юр. и физ. лицами.',
    images: ['/og.jpg']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}