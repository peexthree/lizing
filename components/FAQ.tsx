import RevealOnScroll from '@/components/ui/RevealOnScroll'

export const faq = [
  {
    q: 'Какие документы нужны?',
    a: 'Подготовим чек-лист: учредительные документы, бухгалтерскую отчётность и данные по технике. Поможем собрать пакет под конкретную сумму.',
  },
  {
    q: 'Можно ли физлицу?',
    a: 'Да, есть программы для самозанятых и ИП. Подберём лизинговую компанию, которая работает с физлицами, и упростим подтверждение дохода.',
  },
  {
    q: 'Как быстро одобрение?',
    a: 'От двух часов до двух дней — зависит от суммы и комплекта документов. Мы заранее уточняем требования и отправляем заявки параллельно в несколько лизинговых компаний.',
  },
  {
    q: 'Можно ли без аванса?',
    a: 'Да. Первый платёж часто идёт вместо аванса, а остаточный платёж помогает снизить ежемесячную нагрузку.',
  },
  {
    q: 'Что такое возвратный лизинг?',
    a: 'Вы продаёте технику лизинговой компании и берёте её обратно в пользование. Получаете деньги на развитие и продолжаете работать на своей технике.',
  },
] as const

const FAQ = () => {
  return (
    <section id="faq" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="floating-orb left-[20%] top-[10rem] hidden h-[240px] w-[240px] bg-white/35 md:block" />
        <div className="floating-orb right-[18%] bottom-[-4rem] hidden h-[300px] w-[300px] bg-accent/25 lg:block" />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <RevealOnScroll className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Частые вопросы</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Ответы, которые экономят время на созвоне</h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 space-y-4">
          {faq.map((item, index) => (
            <RevealOnScroll
              key={item.q}
              as="details"
              delay={index * 0.08 + 0.12}
              className="group relative overflow-hidden rounded-4xl border border-white/60 bg-white/85 p-6 shadow-glow backdrop-blur-xl transition focus-visible:outline-none"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-dark">
                <span className="flex items-center gap-3">
                  <span className="hidden h-8 w-8 items-center justify-center rounded-full border border-accent/30 text-xs font-semibold uppercase tracking-[0.3em] text-accent/70 md:flex">
                    FAQ
                  </span>
                  {item.q}
                </span>
                <span className="text-sm font-medium text-accent transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-dark/70">{item.a}</p>
              <div className="card-glow" aria-hidden="true" />
            </RevealOnScroll>
          ))}
        </RevealOnScroll>

        <RevealOnScroll className="mt-10 rounded-[2rem] border border-white/60 bg-white/85 p-6 text-center text-sm text-dark/70 shadow-glow backdrop-blur-xl">
          <p>
            Не нашли ответ? Напишите нам в мессенджер или оставьте заявку — менеджер подключится и подберёт оптимальный формат финансирования.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default FAQ