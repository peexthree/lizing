import { BadgePercentIcon, HandshakeIcon, MedalIcon, TimerIcon } from '@/components/icons'

export default function Advantages() {
  const highlights = [
    {
      icon: MedalIcon,
      value: '15 лет',
      label: 'опыта',
      description: 'С 2009 года сопровождаем сделки по лизингу и знаем требования банков изнутри.'
    },
    {
      icon: HandshakeIcon,
      value: '120+',
      label: 'партнёров',
      description: 'Работаем с банками, лизинговыми компаниями и страховыми, чтобы подобрать лучшее решение.'
    },
    {
      icon: TimerIcon,
      value: '1 день',
      label: 'до одобрения',
      description: 'Предварительное решение с расчётом платежей получаете в течение 24 часов.'
    },
    {
      icon: BadgePercentIcon,
      value: 'от 0%',
      label: 'переплата',
      description: 'Подбираем программы с минимальной ставкой и комфортным графиком платежей.'
    }
  ]

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl opacity-70" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="floating-orb left-[8%] top-0 hidden h-[280px] w-[280px] bg-white/30 md:block" />
        <div className="floating-orb right-[12%] bottom-[-4rem] hidden h-[340px] w-[340px] bg-accent/25 lg:block" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-dark/50">Преимущества</span>
              <h2 className="glass-title glass-title--light mt-4 text-3xl font-bold text-dark md:text-4xl">Цифры, подтверждающие наш опыт</h2>
          <p className="mt-4 text-lg text-dark/70">
            Команда, которая ведёт переговоры с лизинговыми компаниями, контролирует договоры и помогает быстро выходить на технику без переплат.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, value, label, description }, index) => (
            <div
              key={value}
              className="group relative flex h-full flex-col gap-5 rounded-4xl border border-white/60 bg-white/80 p-7 text-left shadow-glow backdrop-blur-2xl transition hover:-translate-y-1 hover:border-white animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <div className="relative space-y-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-mono font-bold text-accent md:text-4xl">{value}</span>
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-dark/50">{label}</span>
                </div>
                <p className="text-sm leading-relaxed text-dark/70">{description}</p>
              </div>
              <div className="card-glow" aria-hidden="true" />
              <div className="shine-overlay" aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 rounded-[2.5rem] border border-white/60 bg-white/80 p-8 text-left shadow-glow backdrop-blur-2xl md:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div className="space-y-2 text-sm text-dark/70">
            <h3 className="text-lg font-semibold text-dark">Сфокусированы на выгоде клиента</h3>
            <p>
              Анализируем рынок, проверяем условия у партнёров и сопровождаем сделку на каждом этапе, чтобы вы получили оптимальную ставку и защитили инвестиции.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-dark/50">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-accent">Анализ предложения</span>
            <span className="rounded-full border border-dark/10 bg-white px-4 py-2 text-dark/70">Переговоры с ЛК</span>
            <span className="rounded-full border border-dark/10 bg-white px-4 py-2 text-dark/70">Контроль договоров</span>
          </div>
        </div>
      </div>
      </section>
    )
  }