export const faq = [
  {
    id: 'docs',
    q: 'Какие документы нужны?',
    a: 'Подготовим чек-лист: учредительные документы, бухгалтерскую отчётность и данные по технике. Поможем собрать пакет под конкретную сумму.',
  },
  {
    id: 'person',
    q: 'Можно ли физлицу?',
    a: 'Да, есть программы для самозанятых и ИП. Подберём лизинговую компанию, которая работает с физлицами, и упростим подтверждение дохода.',
  },
  {
    id: 'speed',
    q: 'Как быстро одобрение?',
    a: 'От двух часов до двух дней — зависит от суммы и комплекта документов. Мы заранее уточняем требования и отправляем заявки параллельно в несколько лизинговых компаний.',
  },
  {
    id: 'advance',
    q: 'Можно ли без аванса?',
    a: 'Да. Первый платёж часто идёт вместо аванса, а остаточный платёж помогает снизить ежемесячную нагрузку.',
  },
  {
    id: 'sale-leaseback',
    q: 'Что такое возвратный лизинг?',
    a: 'Вы продаёте технику лизинговой компании и берёте её обратно в пользование. Получаете деньги на развитие и продолжаете работать на своей технике.',
  },
] as const

const translations = {
  ru: {
    sectionLabel: 'Частые вопросы',
    heading: 'Ответы, которые экономят время на созвоне',
    items: faq,
    notFound: 'Не нашли ответ? Напишите нам в мессенджер или оставьте заявку — менеджер подключится и подберёт оптимальный формат финансирования.',
  },
  // fallback English (minimal)
  en: {
    sectionLabel: 'FAQ',
    heading: 'Answers that save call time',
    items: faq,
    notFound: 'Didn\'t find an answer? Message us or leave a request — our manager will help.',
  },
} as const

import { useState, useRef, useEffect } from 'react'

const FAQ = ({ locale = 'ru' }: { locale?: 'ru' | 'en' } = {}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const summaryRefs = useRef<(HTMLElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const [heights, setHeights] = useState<number[]>([])
  const strings = translations[locale]

  useEffect(() => {
    // compute heights for animation
    const hs = contentRefs.current.map((el) => (el ? el.scrollHeight : 0))
    setHeights(hs)

    const onResize = () => {
      const hs2 = contentRefs.current.map((el) => (el ? el.scrollHeight : 0))
      setHeights(hs2)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [locale])

  return (
    <section id="faq" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/35 to-transparent" />
        <div className="floating-orb left-[20%] top-[10rem] hidden h-[240px] w-[240px] bg-white/35 md:block" />
        <div className="floating-orb right-[18%] bottom-[-4rem] hidden h-[300px] w-[300px] bg-accent/25 lg:block" />
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Частые вопросы</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Ответы, которые экономят время на созвоне</h2>
        </div>

        <div className="mt-12 space-y-4">
          {strings.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <details
                key={item.id}
                className="group relative overflow-hidden rounded-4xl border border-white/60 bg-white/85 p-6 shadow-glow backdrop-blur-xl transition focus-visible:outline-none animate-fade-up"
                style={{ animationDelay: `${index * 0.08 + 0.1}s` }}
                open={isOpen}
                onClick={(e) => {
                  // Prevent native toggle from conflicting with React state
                  e.preventDefault()
                  setOpenIndex(isOpen ? null : index)
                }}
              >
                <summary
                  ref={(el) => { summaryRefs.current[index] = el }}
                  className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-dark"
                  id={`summary-${item.id}`}
                  aria-controls={`answer-${item.id}`}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    const len = strings.items.length
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenIndex(isOpen ? null : index)
                    } else if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      const next = (index + 1) % len
                      summaryRefs.current[next]?.focus()
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      const prev = (index - 1 + len) % len
                      summaryRefs.current[prev]?.focus()
                    } else if (e.key === 'Home') {
                      e.preventDefault()
                      summaryRefs.current[0]?.focus()
                    } else if (e.key === 'End') {
                      e.preventDefault()
                      summaryRefs.current[len - 1]?.focus()
                    }
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="hidden h-8 w-8 items-center justify-center rounded-full border border-accent/30 text-xs font-semibold uppercase tracking-[0.3em] text-accent/70 md:flex">
                      FAQ
                    </span>
                    {item.q}
                  </span>
                  <span className="text-sm font-medium text-accent transition" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </summary>
                <div
                  id={`answer-${item.id}`}
                  role="region"
                  aria-labelledby={`summary-${item.id}`}
                  className="mt-3 text-sm leading-relaxed text-dark/70"
                  ref={(el) => { contentRefs.current[index] = el }}
                  style={{
                    maxHeight: isOpen ? `${heights[index] || 0}px` : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 320ms ease',
                  }}
                >
                  <div className="py-1">{item.a}</div>
                </div>
                <div className="card-glow" aria-hidden="true" />
              </details>
            )
          })}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/60 bg-white/85 p-6 text-center text-sm text-dark/70 shadow-glow backdrop-blur-xl">
          <p>{strings.notFound}</p>
        </div>
      </div>
    </section>
  )
}

export default FAQ