'use client'

import Image from 'next/image'

import { openLeadForm } from '@/lib/openLeadForm'

export default function ManagerIntro() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/15 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_55%)] sm:block" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/85 shadow-glow backdrop-blur">
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
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">
                Почему мы этим занимаемся
              </span>
              <div className="space-y-4 text-base leading-relaxed text-dark/70 md:text-lg lg:max-w-2xl">
                <h2 className="text-3xl font-bold text-dark md:text-4xl">Эксперт по финансовым решениям</h2>
                <p>Здравствуйте, меня зовут Денис.</p>
                <p>
                  Более 10 лет я работал в сфере корпоративных продаж,b2b,b2c и финансов. Я видел сотни предпринимателей, которые
                  были вынуждены брать дорогие кредиты, замораживать оборотные средства и мириться с банковской
                  бюрократией, чтобы получить нужную технику или транспорт. Меня это не устраивало.
                </p>
                <p>
                  Я задался целью найти более умное и выгодное решение. Изучив рынок изнутри, я понял: лизинг — это тот
                  самый инструмент, который в текущих реалиях позволяет бизнесу расти, а частным лицам — получать
                  желаемое, не попадая в кредитную кабалу.
                </p>
                <p>
                  Моя миссия — быть вашим проводником в мире лизинга. Я не просто продаю услугу. Я разбираюсь в вашей
                  задаче и нахожу для вас тот самый вариант, который будет работать на вас. Без скрытых платежей, мелкого
                  шрифта и недельных ожиданий.
                </p>
                <p>
                  Давайте обсудим вашу цель? Опишите, что вам необходимо, и я предложу четкий и прозрачный план действий.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => openLeadForm()}
                  className="inline-flex items-center justify-center rounded-full bg-dark px-8 py-3 text-sm font-semibold text-white shadow-[0_15px_30px_rgba(34,44,56,0.25)] transition hover:bg-dark/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark"
                >
                  Получить бесплатную консультацию
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
