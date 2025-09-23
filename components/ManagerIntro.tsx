'use client'

import Image from 'next/image'

import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { openLeadForm } from '@/lib/openLeadForm'

const ManagerIntro = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/15 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_55%)] sm:block" />

      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/85 shadow-glow backdrop-blur">
          <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="relative mx-auto h-64 w-64 max-w-full shrink-0 sm:h-72 sm:w-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-white to-white shadow-[0_25px_60px_rgba(33,66,77,0.25)]" />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/60">
                <Image
                  src="/den.webp"
                  alt="Денис Палёнов"
                  fill
                  priority
                  sizes="(max-width: 1024px) 288px, 360px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 text-dark lg:ml-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Почему мы этим занимаемся</span>
              <div className="space-y-4 text-base leading-relaxed text-dark/70 md:text-lg lg:max-w-2xl">
                <h2 className="text-3xl font-bold text-dark md:text-4xl">Эксперт по финансовым решениям</h2>
                <p>Здравствуйте! Меня зовут Денис.</p>
                <p>
                  Более десяти лет я работал в корпоративных продажах (B2B и B2C) и финансах. За это время видел десятки команд,
                  которые брали дорогие кредиты, замораживали оборотные средства и мирились с бюрократией, чтобы получить технику или транспорт.
                </p>
                <p>
                  Я решил найти более гибкий вариант. Изучив рынок изнутри, понял: лизинг помогает бизнесу расти, а частным клиентам — покупать нужную технику без кредитной кабалы.
                </p>
                <p>
                  Моя задача — быть вашим проводником в лизинге. Вместо шаблонной продажи я разбираюсь в вашей задаче и подбираю решение без скрытых платежей и мелкого шрифта.
                </p>
                <p>
                  Давайте обсудим, что вам нужно. Опишите цель — и я предложу чёткий, прозрачный план действий.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => openLeadForm?.()}
                  className="inline-flex items-center justify-center rounded-full bg-dark px-8 py-3 text-sm font-semibold text-white shadow-[0_15px_30px_rgba(34,44,56,0.25)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark"
                >
                  Получить бесплатную консультацию
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default ManagerIntro