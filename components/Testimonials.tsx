import Image from 'next/image'

import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ирина Палеозавровна, г. Юркинбург',
      avatar: '/den1.webp',
      quote:
        'Должность: Руководитель отдела ископаемых активов в банке “ДоисторКредит”
🗯️ “Когда клиент врёт — я это чувствую... носом. Я 65 миллионов лет в продаже.”'
    },
    {
      name: 'Отец Семён “Договорняк” Суровый, г. Протеченск',
      avatar: '/den2.webp',
      quote:
        'Должность: Преподобный налоговый оптимизатор, отставной лизинговый шаман
🗯️ “Я благословляю любую технику, особенно с НДС...”'
    },
    {
      name: 'Жанна Константиновна Рыдая, г. Коневодово',
      avatar: '/den3.webp',
      quote: 'Должность: Личный психотерапевт племенных жеребцов, KFH “Слезы табуна”
🗯️ “Я не продаю технику. Я просто плачу рядом, и техника сама приезжает.”'
    }
  ]

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(234,179,8,0.12),transparent_58%),radial-gradient(circle_at_80%_18%,rgba(212,175,55,0.12),transparent_60%),linear-gradient(160deg,rgba(7,7,12,0.9),rgba(12,12,20,0.82))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl opacity-80" />
        <div className="floating-orb left-[18%] bottom-[-3rem] hidden h-[260px] w-[260px] bg-white/10 blur-3xl md:block" />
        <div className="floating-orb right-[12%] top-[10rem] hidden h-[320px] w-[320px] bg-accent/25 blur-3xl lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4 text-slate-200">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Отзывы</span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Отзывы клиентов</h2>
          <p className="mt-4 text-lg text-slate-300/80">
            Делимся несколькими короткими отзывами от клиентов, которые оформили лизинг с нашей помощью и уже обновили свой автопарк.
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map(({ name, quote, avatar }, index) => (
            <RevealOnScroll
              key={name}
              as="figure"
              delay={index * 0.12}
              className="group relative h-full overflow-hidden rounded-4xl border border-white/10 bg-surface/80 p-7 text-left text-slate-200 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/25 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <blockquote className="relative text-sm leading-relaxed text-slate-300/80">
                <span className="block text-lg font-semibold text-white">&ldquo;{quote}&rdquo;</span>
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-4 text-sm font-semibold text-slate-200">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10">
                  <Image
                    src={avatar}
                    alt={name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span>{name}</span>
              </figcaption>
            </RevealOnScroll>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}

