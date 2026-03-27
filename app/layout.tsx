
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../components/Hyperspeed.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hyperspeed from '@/components/Hyperspeed'
import CustomCursor from '@/components/CustomCursor'
import { Metrika } from '@/components/Metrika'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Лизинг и точка — выгодный лизинг для вашего бизнеса',
  description: 'Подбор лучших лизинговых программ в Краснодаре и по всей России. Автолизинг, лизинг спецтехники, оборудования и недвижимости. Рассчитайте ваш ежемесячный платеж онлайн.',
  metadataBase: new URL('https://lizing.peex.threee')
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
       <body className={`${inter.className} bg-black text-gray-300`}>
        <Metrika />

        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108276915', 'ym');

            ym(108276915, 'init', {
                defer: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
          `}
        </Script>
        <noscript><div><img src="https://mc.yandex.ru/watch/108276915" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>
        {/* /Yandex.Metrika counter */}

        <Hyperspeed />
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
