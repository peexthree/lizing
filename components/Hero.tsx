'use client'

import { Button } from '@/components/ui/Button'
import { openLeadForm } from '@/lib/openLeadForm'

export default function Hero() {
  return (
    <section className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden text-center text-white sm:h-screen sm:min-h-[700px]">
      <video
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-70"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/herobg2.webm" type="video/webm" />
        <source src="/herobg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 mx-auto max-w-3xl animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
          Лизинг авто и спецтехники для вашего бизнеса
        </h1>
        <p className="mt-6 text-lg text-text/90 sm:text-xl">
          Подберём лучшие условия от 50+ лизинговых компаний. Одобрение в течение дня. Работаем по всей России.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="glow" size="lg" onClick={() => openLeadForm({ fields: { title: 'Заявка с главного экрана' } })}>
            Получить лучшие условия
          </Button>
        </div>
      </div>
    </section>
  )
}
