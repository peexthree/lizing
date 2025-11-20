import { BadgePercentIcon, HandshakeIcon, MedalIcon, TimerIcon } from '@/components/icons'

export default function Advantages() {
  const highlights = [
    {
      icon: MedalIcon,
      value: '13 лет',
      label: 'на рынке',
      description: '13 лет помогаем клиентам оформлять лизинг без переплат и бюрократии.'
    },
    {
      icon: HandshakeIcon,
      value: '5000+',
      label: 'договоров',
      description: 'Более 5000 договоров закрыли для бизнеса и частных клиентов по всей стране.'
    },
    {
      icon: TimerIcon,
      value: '50+',
      label: 'партнёров',
      description: 'Сотрудничаем с 50+ банками и лизинговыми компаниями, чтобы подобрать лучшие условия.'
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
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Преимущества</span>
              <h2 className="glass-title glass-title--light mt-4 text-3xl font-bold text-white md:text-4xl">Цифры, подтверждающие наш опыт</h2>
          <p className="mt-4 text-lg text-white/70" style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
            Команда, которая ведёт переговоры с лизинговыми компаниями, контролирует договоры и помогает быстро выходить на технику без переплат.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, value, label, description }, index) => (
            <div
              key={value}
              className="group relative flex h-full flex-col gap-5 rounded-4xl border border-white/10 bg-white/5 p-7 text-left shadow-glow backdrop-blur-2xl transition hover:-translate-y-1 hover:border-white/20 animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-white">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <div className="relative space-y-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl font-mono font-bold text-white md:text-4xl">{value}</span>
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">{label}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70" style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 text-left shadow-glow backdrop-blur-2xl md:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div className="space-y-2 text-sm text-white/70">
            <h3 className="text-lg font-semibold text-white" style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>Сфокусированы на выгоде клиента</h3>
            <p style={{ textShadow: '0 0 8px rgba(175, 238, 238, 0.3)' }}>
              Анализируем рынок, проверяем условия у партнёров и сопровождаем сделку на каждом этапе, чтобы вы получили оптимальную ставку и защитили инвестиции.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white">Анализ предложения</span>
            <span className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-white/70">Переговоры с ЛК</span>
            <span className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-white/70">Контроль договоров</span>
          </div>
        </div>
      </div>
      </section>
    )
  }