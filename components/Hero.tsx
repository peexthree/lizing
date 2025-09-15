'use client'

import Image from 'next/image'
import { CheckCircle2, GaugeCircle, ShieldCheck, Sparkles, Timer } from 'lucide-react'

const features = [
  'Аванс от 0% и гибкий график платежей',
  '50+ банков и лизинговых компаний в одном окне',
  'Оформление дистанционно и по всей России',
  'Подберём технику и застрахуем в день сделки'
]

export default function Hero() {
  function scrollToForm() {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220]/80 via-[#101b32]/70 to-[#0b1220]/30" />
      <div className="absolute inset-0 bg-hero-grid opacity-70" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-8rem] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/40 blur-3xl opacity-70 animate-pulse-glow" />
        <div className="absolute -left-40 top-40 h-[460px] w-[140%] -rotate-6 opacity-40">
          <div className="h-full w-full rounded-[5rem] bg-track-lines blur-[1px]" />
        </div>
        <div className="absolute right-[-6rem] bottom-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-[-10rem] h-[18rem] bg-gradient-to-t from-[#0b1220]/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_minmax(0,1fr)]">
          <div className="space-y-8 text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 backdrop-blur-md animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Новый уровень лизинга
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl animate-fade-up" style={{ animationDelay: '0.05s' }}>
              <span className="block text-white/80">Подберите технику</span>
              <span className="bg-gradient-to-r from-white via-white to-[#b5cdff] bg-clip-text text-transparent">
                и закройте сделку за 1 день
              </span>
            </h1>
            <p className="max-w-xl text-lg text-white/75 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              Команда «Лизинг и точка» ведёт ваш проект от заявки до получения ключей. Мы сопоставляем десятки предложений, ускоряем одобрение и оставляем фонды на развитие бизнеса.
            </p>
            <ul className="grid gap-3 text-sm text-white/80 sm:grid-cols-2 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              {features.map(feature => (
                <li
                  key={feature}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md transition hover:bg-white/20"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <button
                onClick={scrollToForm}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-3 text-base font-semibold text-white shadow-glow transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
              >
                <span className="relative z-[1] flex items-center gap-2">
                  <Timer className="h-5 w-5" aria-hidden="true" />
                  Получить расчёт
                </span>
                <span className="absolute inset-0 translate-x-[-70%] bg-gradient-to-r from-white/30 via-white/60 to-transparent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </button>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-white/60 hover:bg-white/20"
              >
                <GaugeCircle className="h-5 w-5" aria-hidden="true" />
                Рассчитать платеж
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/60 animate-fade-up" style={{ animationDelay: '0.45s' }}>
              <div>
                <span className="text-white/40">8 800 444-45-84</span>
                <p className="font-medium text-white">Консультация бесплатно</p>
              </div>
              <div>
                <span className="text-white/40">Срок сделки</span>
                <p className="font-medium text-white">от 24 часов</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 blur-3xl">
              <div className="mx-auto h-64 w-64 rounded-full bg-accent/35 opacity-70" />
            </div>
            <div
              className="relative w-full max-w-lg animate-fade-up"
              style={{ animationDelay: '0.45s' }}
            >
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-70 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.8rem] border border-white/25 bg-white/10 p-4 backdrop-blur-2xl shadow-hero">
                <div className="relative h-full overflow-hidden rounded-[2.2rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1280&q=80"
                    alt="Элегантный автомобиль на дороге"
                    width={960}
                    height={640}
                    priority
                    className="h-[420px] w-full object-cover transition-transform duration-[6000ms] ease-out will-change-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/80 px-4 py-2 text-xs font-semibold text-dark shadow-lg backdrop-blur">
                  <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
                  12 000+ км сопровождения
                </div>
                <div className="absolute right-8 top-[45%] flex min-w-[180px] max-w-xs flex-col gap-1 rounded-2xl bg-dark/80 px-4 py-3 text-white shadow-lg backdrop-blur-md animate-float-slow">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                    Гарантии сделки
                  </div>
                  <p className="text-xs text-white/70">
                    Контроль договора и страхования, персональный менеджер до выдачи техники.
                  </p>
                </div>
                <div className="absolute left-1/2 bottom-[-2.5rem] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/30 bg-white/85 px-5 py-3 text-sm font-semibold text-dark shadow-lg backdrop-blur-lg animate-float-late">
                  <Timer className="h-5 w-5 text-accent" aria-hidden="true" />
                  Одобрение за 1 день
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}