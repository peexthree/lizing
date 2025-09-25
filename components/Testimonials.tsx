'use client'

import Image from 'next/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ирина Палеозавровна, г. Юркинбург',
      avatar: '/den1.webp',
      // ИСПРАВЛЕНО: Использованы шаблонные литералы (обратные кавычки `) для многострочной строки
      quote: `Должность: Руководитель отдела ископаемых активов в банке “ДоисторКредит”
🗯️ “Когда клиент врёт — я это чувствую... носом. Я 65 миллионов лет в продаже.”`,
    },
    {
      name: 'Отец Артур “Договорняк” Суровый, г. Протеченск',
      avatar: '/den2.webp',
      quote: `Должность: Преподобный налоговый оптимизатор, отставной лизинговый шаман
🗯️ “Я благословляю любую технику, особенно с НДС...”`,
    },
    {
      name: 'Жанна Константиновна Рыдая, г. Коневодово',
      avatar: '/den3.webp',
      quote: `Должность: Личный психотерапевт племенных жеребцов, KFH “Слезы табуна”
🗯️ “Я не продаю технику. Я просто плачу рядом, и техника сама приезжает.”`,
    },
  ]

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* УЛУЧШЕНИЕ: Более чистый и современный фон */}
      <div className="absolute inset-0 -z-10">
        {/* Декоративный Градиент (акцентный и темный) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(234,179,8,0.08),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(212,175,55,0.08),transparent_50%),linear-gradient(160deg,rgba(7,7,12,1),rgba(12,12,20,0.95))] opacity-90" />

        {/* Размытые "Орбиты" для динамики */}
        <div className="floating-orb left-[10%] top-[5rem] h-64 w-64 rounded-full bg-accent/20 blur-[100px] opacity-30" />
        <div className="floating-orb right-[8%] bottom-[8rem] h-80 w-80 rounded-full bg-white/5 blur-[120px] opacity-20" />

        {/* Мягкая тень сверху */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 text-slate-200">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          {/* УЛУЧШЕНИЕ: Более современный трекинг и цвет */}
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent-400 md:text-xs">
            Отзывы довольных клиентов
          </span>
          {/* УЛУЧШЕНИЕ: Больше контраста и жирности */}
            <h2 className="glass-title mt-4 text-3xl font-bold text-white md:text-4xl">
            Что говорят наши партнёры
          </h2>
          <p className="mt-4 text-base text-slate-400 md:text-lg">
            Делимся краткими впечатлениями от тех, кто уже развивает свой бизнес с помощью нашего лизинга.
          </p>
        </RevealOnScroll>

        {/* УЛУЧШЕНИЕ: Карточки с Glassmorphism-эффектом */}
        <RevealOnScroll className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map(({ name, quote, avatar }, index) => {
            const [rawRole, rawMessage] = quote.split('🗯️')
            const role = rawRole?.trim()
            const message = rawMessage?.replace(/^“|”$/g, '').trim() ?? quote

            return (
              <RevealOnScroll
                key={name}
                as="figure"
                delay={index * 0.15} // Немного увеличена задержка для лучшего эффекта
                className="group relative h-full overflow-hidden rounded-3xl border border-white/15 bg-black/30 p-7 text-left text-slate-200 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-[1.02] hover:border-accent-400/40 hover:shadow-[0_20px_60px_rgba(234,179,8,0.15)] md:p-8"
              >
                {/* Декоративный элемент внутри карточки */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <blockquote className="relative space-y-4 text-balance">
                  {role && (
                    <p className="text-sm font-medium leading-relaxed text-slate-400 md:text-[0.95rem]">
                      {role}
                    </p>
                  )}
                  <p className="text-lg font-medium leading-8 text-white/90 md:text-xl">
                    <span className="mr-1 text-2xl leading-none text-accent-300">«</span>
                    {message}
                    <span className="ml-1 text-2xl leading-none text-accent-300">»</span>
                  </p>
                </blockquote>

                <figcaption className="relative mt-8 flex items-center gap-4 text-sm font-semibold md:text-base">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent-400/30 bg-white/10 md:h-14 md:w-14">
                    <Image
                      src={avatar}
                      alt={name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-white md:text-base">{name.split(',')[0]}</span>
                    <span className="text-xs font-normal text-slate-400 md:text-sm">
                      {name.split(',')[1]?.trim()}
                    </span>
                  </span>
                </figcaption>
              </RevealOnScroll>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}