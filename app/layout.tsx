import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Лизинг и точка — возвратный лизинг, минимальный аванс, 50+ лизингодателей',
  description: 'Возвратный лизинг под свою технику. Минимальный аванс или первый платёж. Сравним условия у 50+ компаний и снизим стоимость. Получите расчёт.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
