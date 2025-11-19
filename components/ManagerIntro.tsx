'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { openLeadForm } from '@/lib/openLeadForm'
import { WhatsAppLineIcon, TelegramLineIcon, PhoneIcon } from '@/components/icons' // Импортируем новые иконки

const ManagerIntro = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_18%,rgba(0,206,209,0.12),transparent_60%),radial-gradient(circle_at_78%_16%,rgba(0,163,166,0.14),transparent_58%),linear-gradient(140deg,rgba(7,7,12,0.92),rgba(10,10,18,0.82))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-4">
        <RevealOnScroll className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/85 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="relative mx-auto h-64 w-64 max-w-full shrink-0 sm:h-72 sm:w-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/25 via-white/30 to-transparent shadow-[0_25px_60px_rgba(10,10,15,0.55)]" />
              <div
                className="premium-gold-frame relative flex h-full w-full rounded-full"
                style={{ '--premium-frame-padding': '0.9rem' } as CSSProperties}
              >
                <div className="premium-gold-frame__inner">
                  <Image
                    src="/den.webp"
                    alt="Денис Палёнов"
                    fill
                    priority
                    sizes="(max-width: 1024px) 288px, 360px"
                    className="premium-gold-frame__image object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 text-slate-200 lg:ml-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70">Почему мы этим занимаемся</span>
              <div className="space-y-4 text-base leading-relaxed text-slate-300/80 md:text-lg lg:max-w-2xl">
                <h2 className="glass-title text-3xl font-bold text-white md:text-4xl">Эксперт по финансовым решениям</h2>
                <p>Здравствуйте! Меня зовут Денис.</p>
                <p>
                  Уже 13 лет я работаю в корпоративных продажах (B2B и B2C) и финансах. За это время видел десятки команд,
                  которые брали дорогие кредиты, замораживали оборотные средства и мирились с бюрократией, чтобы получить технику или транспорт.
                </p>
                <p>
                  Я решил найти более гибкий вариант. Изучив рынок изнутри, понял: лизинг помогает бизнесу расти, а частным клиентам — покупать нужную технику без кредитной кабалы.
                </p>
                <p>
                  Моя задача — быть вашим проводником в лизинге. Вместо шаблонной продажи я разбираюсь в вашей задаче и подбираю решение без скрытых платежей и мелкого шрифта.
                </p>
                <p>
                  Давайте обсудим, что вам нужно. Опишите цель — и я предложу чёткий, прозрачный план действий. Свяжитесь со мной напрямую в WhatsApp или Telegram!
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => openLeadForm?.()}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent via-accent-alt to-accent px-8 py-3 text-sm font-semibold text-black shadow-glow transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Получить бесплатную консультацию
                </button>
                <a
                  href="https://wa.me/79677728299"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                >
                  <WhatsAppLineIcon className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
                <a
                  href="https://t.me/dpvlen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                >
                  <TelegramLineIcon className="h-5 w-5 mr-2" />
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default ManagerIntro