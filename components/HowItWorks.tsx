import { CheckCircleIcon, FileTextIcon, MessageIcon, SignatureIcon, TruckIcon } from '@/components/icons'

export default function HowItWorks() {
  const steps = [
    {
      icon: FileTextIcon,
      title: 'Оставляете заявку',
      text: 'Передаёте информацию о технике и компании любым удобным способом — онлайн или по телефону.'
    },
    {
      icon: MessageIcon,
      title: 'Консультация',
      text: 'Связываемся, уточняем задачи, собираем документы и договариваемся о приоритетных программах.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Одобрение',
      text: 'В течение 24 часов получаете предварительное решение с расчётом платежей и рекомендациями.'
    },
    {
      icon: SignatureIcon,
      title: 'Документы',
      text: 'Готовим договор, проверяем страхование и спецификации, согласовываем график платежей.'
    },
    {
      icon: TruckIcon,
      title: 'Выдача техники',
      text: 'Организуем приёмку, доставку и финальный контроль, чтобы техника вышла на линию в срок.'
    }
  ]

  return (
<section id="how" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute left-1/3 top-16 hidden h-[480px] w-px bg-gradient-to-b from-white/60 via-accent/40 to-transparent md:block" />
        <div className="pointer-events-none absolute right-1/3 top-32 hidden h-[520px] w-px bg-gradient-to-b from-white/60 via-accent/30 to-transparent lg:block" />
        <div className="floating-orb left-[10%] bottom-[-3rem] hidden h-[260px] w-[260px] bg-white/35 md:block" />
        <div className="floating-orb right-[6%] top-[8rem] hidden h-[320px] w-[320px] bg-accent/20 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Как мы работаем</span>
          <h2 className="mt-4 text-3xl font-bold text-dark md:text-4xl">Таймлайн сделки от заявки до выдачи техники</h2>
          <p className="mt-4 text-lg text-dark/65">
            Мы сопровождаем каждый шаг: держим связь, контролируем документы и согласовываем условия с партнёрами.
          </p>
        </div>

        <ol className="relative mt-14 space-y-8 pl-6 before:absolute before:left-[1.45rem] before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-accent/10 before:to-transparent sm:pl-8 md:pl-12">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="relative pl-8 sm:pl-10 md:pl-12 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-3xl border border-accent/30 bg-white text-accent shadow-sm">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <div className="relative rounded-4xl border border-white/60 bg-white/85 p-6 shadow-glow backdrop-blur-2xl">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/45">Шаг 0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-dark">{title}</h3>
                <p className="mt-3 text-sm text-dark/70">{text}</p>
                <div className="card-glow" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <a
            href="#lead-form"
            className="group inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent/40 bg-white/40 px-8 py-3 text-sm font-semibold text-accent backdrop-blur-md transition hover:border-accent hover:bg-white/70 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
          >
            <MessageIcon aria-hidden="true" className="h-5 w-5" />
            Получить расчёт
          </a>
        </div>

        <div className="mt-10 grid gap-4 rounded-[2.2rem] border border-white/60 bg-white/85 p-6 text-sm text-dark/70 shadow-glow backdrop-blur-xl md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/45">Мониторинг</p>
            <p>Фиксируем ключевые этапы в CRM и обновляем статус сделки в общем чате.</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/45">Юридический блок</p>
            <p>Проверяем договоры, страхование и спецификации до подписания.</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dark/45">Финальный контроль</p>
            <p>Организуем выдачу техники в нужном регионе и помогаем с передачей.</p>
          </div>
        </div>
      </div>
    </section>
  )
}